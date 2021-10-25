import fs from 'fs';
import fetch from 'node-fetch';
import youtubedl from 'youtube-dl';
import { exec } from 'child_process';
import { promisify } from 'util';
import config from 'config';

const execPromise = promisify(exec);

const autoScale = async (path: string) => {
  const ratioCmd = await execPromise(
    `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${path}`
  );

  const [height, width] = ratioCmd.stdout.trim().split('x');

  const ratio: number = parseFloat(height) / parseFloat(width);

  if (ratio !== 1) {
    const cropCmd = await execPromise(
      `ffmpeg -i ${path} -t 1 -vf cropdetect -f null - 2>&1 | awk '/crop/ { print $NF }' | tail -1`
    );

    const crop = cropCmd.stdout.trim();

    const tmp = `${path.slice(0, -15)}tmp.mp4`;

    await execPromise(`ffmpeg -i ${path} -vf ${crop} -y ${tmp}`);

    fs.renameSync(tmp, path);
  }
};

// eslint-disable-next-line
const fetchCreator = (creatorId: string, creatorJson: any) => {
  const dataDir: string = config.get('dataDir');
  const creatorDir = `${dataDir}/creators/${creatorId}`;

  if (!fs.existsSync(creatorDir)) {
    fs.mkdirSync(creatorDir);
  }

  if (!fs.existsSync(`${creatorDir}/${creatorId}.json`)) {
    fs.writeFileSync(
      `${creatorDir}/${creatorId}.json`,
      JSON.stringify(creatorJson, null, 4)
    );
  }
};

const downloadVine = async (url: string, path: string) => {
  const res = await fetch(url);

  await new Promise<void>((resolve, reject) => {
    const fileStream = fs.createWriteStream(path);

    res.body.pipe(fileStream);
    res.body.on('error', (err) => {
      reject(err);
    });

    fileStream.on('finish', () => {
      resolve();
    });
  });
};

const downloadYoutube = async (url: string, path: string) => {
  const video = youtubedl(url, ['--format=best'], {});

  await new Promise((resolve) => {
    video.on('end', () => {
      resolve('Video finished downloading');
    });

    video.pipe(fs.createWriteStream(path));
  });

  await autoScale(path);
};

const downloadVideo = async (file: string, path: string) => {
  const rawVideo = decodeURIComponent(
    escape(Buffer.from(file, 'base64').toString('binary'))
  );

  fs.writeFileSync(path, rawVideo, 'binary');

  await autoScale(path);
};

const download = async (vine: string, path: string, type: string) => {
  switch (type) {
    case 'vine':
      await downloadVine(vine, path);
      break;
    case 'youtube':
      await downloadYoutube(vine, path);
      break;
    case 'video':
      await downloadVideo(vine, path);
      break;
    default:
      break;
  }
};

const fetchVine = async (
  vineId: string,
  videoUrl: string,
  vineJson: object,
  type: string = 'vine'
) => {
  const dataDir: string = config.get('dataDir');

  const vineDir = `${dataDir}/vines/${vineId}`;

  if (!fs.existsSync(vineDir)) {
    fs.mkdirSync(vineDir);
  }

  if (vineJson) {
    if (!fs.existsSync(`${vineDir}/${vineId}.json`)) {
      fs.writeFileSync(
        `${vineDir}/${vineId}.json`,
        JSON.stringify(vineJson, null, 4)
      );
    }
  }

  if (!fs.existsSync(`${vineDir}/${vineId}.mp4`)) {
    await download(videoUrl, `${vineDir}/${vineId}.mp4`, type);
  }

  if (!fs.existsSync(`${vineDir}/${vineId}.png`)) {
    await execPromise(
      `ffmpeg -i ${vineDir}/${vineId}.mp4 -ss 0 -s 500x500 -vframes 1 ${vineDir}/${vineId}.png`
    );
  }

  if (!fs.existsSync(`${vineDir}/${vineId}.jpg`)) {
    await execPromise(
      `convert ${vineDir}/${vineId}.png -quality 90 ${vineDir}/${vineId}.jpg`
    );
  }
};

export { fetchVine, fetchCreator };
