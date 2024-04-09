// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel, { User } from '../models/userModel';
import { supabase } from '../supabase';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'このメールアドレスは既に登録されています' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: Omit<User, 'id' | 'created_at' | 'updated_at'> = { username, email, password: hashedPassword };
    await supabase.from('users').insert([newUser]);

    res.status(201).json({ message: 'ユーザー登録が完了しました' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ユーザー登録に失敗しました' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'ログインに成功しました', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ログインに失敗しました' });
  }
};
