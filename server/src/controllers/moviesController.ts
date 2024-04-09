// controllers/moviesController.ts
import { Request, Response } from 'express';
import MovieModel from '../models/movieModel';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

// ユーザが登録した映画記録一覧を取得
export const getMovieList = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const movies = await MovieModel.findAll(req.user.id);
    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch movies' });
  }
};

// ユーザが映画記録を追加
export const addMovieRecord = async (req: AuthenticatedRequest, res: Response) => {
  const { title, watched_date, review } = req.body;
  try {
    await MovieModel.create({
      user_id: req.user.id,
      title,
      watched_date,
      review,
    });
    return res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to add movie' });
  }
};

// ユーザが登録した映画記録を更新
export const editMovieRecord = async (req: Request & { params: { id: string } }, res: Response) => {
    const { id } = req.params;
    const { title, watched_date, review } = req.body;

    try {
        await MovieModel.update(parseInt(id), {
            title,
            watched_date,
            review,
        });

        return res.status(200).json({ message: 'Movie updated successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Failed to update movie' });
    }
};

// ユーザが登録した映画記録を削除
export const deleteMovieRecord = async (req: Request & { params: { id: string } }, res: Response) => {
    const { id } = req.params;

    try {
        await MovieModel.delete(parseInt(id));
        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Failed to delete movie' });
    }
};
