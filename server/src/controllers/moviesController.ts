import { Request, Response } from 'express';
import MovieModel from '../models/movieModel';
import jwt from 'jsonwebtoken';

// ユーザー認証用ミドルウェア
const authenticateUser = async (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization?.split(' ')[1]; // Authorization ヘッダーからトークンを取得

  if (!token) {
    return res.status(401).json({ message: '認証が必要です' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secret') as { userId: number }; // トークンを検証
    req.user = { id: decodedToken.userId }; // リクエストオブジェクトにユーザー情報をセット
    next(); // 次のミドルウェアへ移行
  } catch (error) {
    console.error('認証エラー:', error);
    res.status(401).json({ message: '認証が無効です' });
  }
};

// ユーザが登録した映画記録の一覧表示
export const getMovieList = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id; // ユーザーIDは認証済みユーザーのものとする
    const movies = await MovieModel.findAll(userId);
    res.status(200).json({ movies });
  } catch (error) {
    console.error('映画一覧取得エラー:', error);
    res.status(500).json({ message: '映画一覧の取得に失敗しました' });
  }
};

// ユーザが映画記録を追加する
export const addMovieRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id; // ユーザーIDは認証済みユーザーのものとする
    const movieData = req.body;
    const movie = { ...movieData, user_id: userId };
    await MovieModel.create(movie);
    res.status(201).json({ message: '映画記録追加成功' });
  } catch (error) {
    console.error('映画記録追加エラー:', error);
    res.status(400).json({ message: '映画記録追加失敗' });
  }
};

// ユーザが登録した映画記録を更新する
export const editMovieRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieId = parseInt(req.params.id, 10);
    const movieData = req.body;
    await MovieModel.update(movieId, movieData);
    res.status(200).json({ message: '映画記録更新成功' });
  } catch (error) {
    console.error('映画記録更新エラー:', error);
    res.status(400).json({ message: '映画記録更新失敗' });
  }
};

// ユーザが登録した映画記録を削除する
export const deleteMovieRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieId = parseInt(req.params.id, 10);
    await MovieModel.delete(movieId);
    res.status(200).json({ message: '映画記録削除成功' });
  } catch (error) {
    console.error('映画記録削除エラー:', error);
    res.status(400).json({ message: '映画記録削除失敗' });
  }
};