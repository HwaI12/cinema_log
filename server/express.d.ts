// express.d.ts
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: { id: number }; // ここでユーザー情報の型を定義
  }
}
