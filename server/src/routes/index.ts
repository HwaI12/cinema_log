import express from 'express';
import moviesRouter from './movies';

const router = express.Router();

// /api/movies へのリクエストは moviesRouter で処理する
router.use('/movies', moviesRouter);

export default router;