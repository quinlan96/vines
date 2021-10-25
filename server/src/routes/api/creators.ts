import express from 'express';
import { Creator, ICreator } from '../../models/Creator';

const router = express.Router();

router.get('/creators', async (req, res) => {
  try {
    const result: Array<ICreator> = await Creator.aggregate([
      {
        $lookup: {
          from: 'vines',
          localField: '_id',
          foreignField: 'creator',
          as: 'vinesCount',
        },
      },
      {
        $addFields: { vinesCount: { $size: '$vinesCount' } },
      },
      {
        $sort: { vinesCount: -1 },
      },
    ]).exec();

    const creators = await Promise.all(
      result.map(({ _id }) => Creator.findOne({ _id }))
    );

    res.json({ data: creators });
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    res.status(500).json({ error: 'An error occurred fetching creators' });
  }
});

router.get('/creator/:id', async (req, res) => {
  try {
    const creator = await Creator.findOne({ creatorId: req.params.id })
      .populate('vines')
      .exec();

    res.json(creator);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    res.status(500).json({ error: 'An error occurred fetching creators' });
  }
});

export default router;
