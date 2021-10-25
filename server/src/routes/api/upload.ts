import express, { Request } from 'express';
import createError from 'http-errors';
import fetch from 'node-fetch';
import csv from 'csv-parser';
import youtubedl from 'youtube-dl';
import { promisify } from 'util';
import { Readable } from 'stream';
import { fetchVine, fetchCreator } from '../../services/upload';

import { Creator, ICreator } from '../../models/Creator';
import { Vine, IVine } from '../../models/Vine';

const router = express.Router();
const vineArchive = 'https://archive.vine.co';
const getYoutubeInfo = promisify(youtubedl.getInfo);

interface CreatorJson {
  username: string;
  shareUrl: string;
}

interface VineData {
  url: string;
  author_url: string;
  title: string;
  description: string;
  file?: string;
}

const generateId = (length: number) => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < length; i += 1) {
    id += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return id;
};

const createOrFindCreator = async (
  creatorId: string
): Promise<ICreator | null> => {
  let creator: ICreator | null = null;

  if (creatorId) {
    const resp = await fetch(`${vineArchive}/profiles/_/${creatorId}.json`);

    if (!resp.ok) {
      throw new Error("Could not fetch creator info from Vine's archive");
    }

    const creatorJson: CreatorJson = await resp.json();
    fetchCreator(creatorId, creatorJson);

    creator = await Creator.findOne({ creatorId });

    if (!creator) {
      creator = await Creator.create({
        creatorId,
        username: creatorJson.username,
        url: creatorJson.shareUrl,
      });

      await creator.save();
    }
  }

  return creator;
};

interface VineJson {
  userIdStr: string;
  videoUrl: string;
}

const uploadVine = async (data: VineData) => {
  if (!data.url.match(/https:\/\/vine.co/g)) {
    throw new Error('Vine url is not valid');
  }

  const vineId = data.url.replace('https://vine.co/v/', '').replace('/', '');

  if (await Vine.findOne({ videoId: vineId }).exec()) {
    throw new Error('Could not add vine, vine ID already taken');
  }

  const resp = await fetch(`${vineArchive}/posts/${vineId}.json`);

  if (!resp.ok) {
    throw new Error("Could not fetch vine info from Vine's archive");
  }

  const vineJson: VineJson = await resp.json();

  let creatorId = data.author_url
    ? data.author_url.replace('https://vine.co/u/', '')
    : '';
  creatorId = creatorId || vineJson.userIdStr;

  const creator = await createOrFindCreator(creatorId);

  await fetchVine(vineId, vineJson.videoUrl, vineJson, 'vine');

  const vine = new Vine({
    videoId: vineId,
    title: data.title,
    description: data.description,
    url: data.url,
    creator: creator?._id,
  });

  await vine.save();
};

const uploadYoutube = async (data: VineData) => {
  if (!data.url.match(/youtube.com/g)) {
    throw new Error('Youtube url is not valid');
  }

  const youtubeJson: youtubedl.Info = await getYoutubeInfo(data.url);

  const fakeId = '';

  const videoId = fakeId;
  const videoUrl = `https://youtube.com/watch?v=${fakeId}`;

  if (await Vine.findOne({ videoId }).exec()) {
    throw new Error('Could not add vine, vine ID already taken');
  }

  const creatorId = data.author_url
    ? data.author_url.replace('https://vine.co/u/', '')
    : '';
  const creator: ICreator | null = await createOrFindCreator(creatorId);

  await fetchVine(videoId, videoUrl, youtubeJson, 'youtube');

  const vine: IVine = await Vine.create({
    videoId,
    title: data.title,
    description: data.description,
    url: data.url,
  });

  if (creator && creator._id) {
    vine.creator = creator._id;
  }

  await vine.save();
};

const uploadVideo = async (data: VineData) => {
  let videoId = '';

  if (data.url.match(/https:\/\/vine.co/g)) {
    videoId = data.url.replace('https://vine.co/v/', '').replace('/', '');
  }

  // if (data.url.match(/youtube.com/)) {
  //   const youtubeJson = await getYoutubeInfo(data.url);
  //   videoId = youtubeJson.id;
  // }

  if (!videoId) {
    videoId = generateId(11);
  }

  if (!data.file) {
    return;
  }

  const creatorId = data.author_url
    ? data.author_url.replace('https://vine.co/u/', '')
    : '';

  const creator: ICreator | null = await createOrFindCreator(creatorId);

  await fetchVine(videoId, data.file, {} as IVine, 'video');

  const vine = new Vine({
    videoId,
    title: data.title,
    description: data.description,
    url: data.url,
  });

  if (creator && creator._id) {
    vine.creator = creator._id;
  }

  await vine.save();
};

router.post('/upload/vine', async (req: Request<void, { message: string; }, VineData>, res, next) => {
  try {
    await uploadVine(req.body);

    res.json({
      message: 'Vine successfully created',
    });
  } catch (e) {
    const ex = e as Error;

    next(createError(500, `${ex.name}: ${ex.message}`));
  }
});

router.post('/upload/youtube', async (req: Request<void, { message: string; }, VineData>, res, next) => {
  try {
    await uploadYoutube(req.body);

    res.json({
      message: 'Vine sucessfully created',
    });
  } catch (e) {
    const ex = e as Error;

    next(createError(500, `${ex.name}: ${ex.message}`));
  }
});

router.post('/upload/video', async (req: Request<void, { message: string; }, VineData>, res, next) => {
  try {
    await uploadVideo(req.body);

    res.json({
      message: 'Vine created successfully',
    });
  } catch (e) {
    const ex = e as Error;

    next(createError(500, `${ex.name}: ${ex.message}`));
  }
});

router.post('/upload/csv', (req: Request<void, { message: string }, { file: string }>, res) => {
  const rawCSV = decodeURIComponent(
    escape(Buffer.from(req.body.file, 'base64').toString('binary'))
  );
  const results: Array<VineData> = [];

  Readable.from([rawCSV])
    .pipe(csv(['title', 'description', 'url', 'author_url']))
    .on('data', (data: VineData) => results.push(data))
    .on('end', () => {
      results.forEach(async (row) => {
        if (row.url.match(/https:\/\/vine.co/g)) {
          try {
            await uploadVine(row);
          } catch (e) {
            // eslint-disable-next-line
            console.log(e);
          }
        }
      });
    });

  res.json({
    message: 'CSV imported successfully',
  });
});

export default router;
