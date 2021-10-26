import express from 'express';
import vineRouter from './vines';
import uploadRouter from './upload';
import creatorRouter from './creators';

export interface PaginationParams {
    limit?: number;
    offset?: number;
}

export interface ApiData<T> {
    data: T;
}

const router = express.Router();

router.use(vineRouter);
router.use(uploadRouter);
router.use(creatorRouter);

export default router;
