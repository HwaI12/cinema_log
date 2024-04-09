// src/routes/authRoutes.ts

import express from 'express';
import { signUp, login, deleteAccount } from '../controllers/authController';

const router = express.Router();

// ユーザー登録
router.post('/signup', signUp);

// ログイン
router.post('/login', login);

// アカウント削除
router.delete('/delete', deleteAccount);

export default router;
