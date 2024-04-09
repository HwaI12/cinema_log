import { Request, Response } from 'express';
import User from '../models/userModel';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        // ユーザーの新規登録処理
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'ユーザーを登録しました' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ユーザーの登録に失敗しました' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // ユーザーのログイン処理
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            throw new Error('ログインに失敗しました');
        }
        res.status(200).json({ message: 'ログインしました', user });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'ログインに失敗しました' });
    }
};