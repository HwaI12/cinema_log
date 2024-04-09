// routes/user.ts
import express from 'express';
import { getMovieList, addMovieRecord, editMovieRecord, deleteMovieRecord } from '../controllers/moviesController';

const router = express.Router();

// 映画記録一覧取得
router.get('/', getMovieList);

// 映画記録追加
router.post('/', addMovieRecord);

// 映画記録更新
router.put('/:id', editMovieRecord);

// 映画記録削除
router.delete('/:id', deleteMovieRecord);

export default router;
