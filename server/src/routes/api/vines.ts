import express, { Request } from 'express';
import createError from 'http-errors';
import { Vine, IVine } from '../../models/Vine';

const router = express.Router();

router.get('/vines', async (req, res, next) => {
  try {
    const vines = await Vine
      .find()
      .sort({ createdAt: -1 })
      .limit(30)
      .exec();

    res.json({ data: vines });
  } catch (err) {
    console.log(err);
    next(createError(500, 'An error occurred fetching vines'));
  }
});

router.post('/vines', async (req: Request<void, { data: null; }, IVine>, res) => {
  try {
    const vine = new Vine(req.body);

    await vine.save();
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }

  res.send({ data: null });
});

router.put('/vines', (req, res) => {
  res.json(req.body);

  // try {
  //   const vine = new Vine({
  //     videoId: req.params.videoId,
  //     title: req.params.title,
  //     description: req.params.description,
  //     url: req.params.url,
  //     creator: req.params.creator,
  //   });

  //   vine.save();
  // } catch (err) {
  //   console.log(err);
  //   next(createError(500, 'An error occurred fetching vines'));
  // }
});

export default router;
