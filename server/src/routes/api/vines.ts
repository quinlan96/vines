import express, { Request } from 'express';
import createError from 'http-errors';
import { Vine, IVine } from '../../models/Vine';
import { ApiData, PaginationParams } from './index';

const router = express.Router();

/**
 * @swagger
 * /api/v1/vines:
 *   get:
 *     summary: Get vines
 *     tags:
 *       - Vines
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/limit'
 *       - $ref: '#/parameters/offset'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Vine'
 */
router.get('/vines', async (req: Request<void, ApiData<IVine[]>, void, PaginationParams>, res, next) => {
  const limit = Number(req.query.limit) || 18;
  const offset = Number(req.query.offset) || 0;

  try {
    const vines = await Vine
      .find()
      .select('id videoId title description vineUrl thumbnailUrl createdAt updatedAt')
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
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
