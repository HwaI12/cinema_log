// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: '認証が必要です' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded as { id: number }; // 型変換
    next();
  } catch (error) {
    res.status(401).json({ message: '認証に失敗しました' });
  }
};

export default authMiddleware;