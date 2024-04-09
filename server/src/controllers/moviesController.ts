import { Request, Response } from 'express';
import Movie from '../models/movieModel';
import { supabase } from '../supabase';

export const addWatchRecord = async (req: Request, res: Response) => {
    // 視聴記録追加処理
    try {
        const { user_id, title, watched_date, review } = req.body;
        const newRecord = new Movie({ user_id, title, watched_date, review });
        await newRecord.save();
        res.status(201).json({ message: "視聴記録を追加しました" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "視聴記録の追加に失敗しました" });
    }
};

export const editRecord = async (req: Request, res: Response) => {
    // 視聴記録編集処理
    try {
        const { id } = req.params;
        const { title, watched_date, review } = req.body;
        const updatedRecord = await Movie.findByIdAndUpdate(id, { title, watched_date, review });
        res.status(200).json({ message: "視聴記録を更新しました", updatedRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "視聴記録の更新に失敗しました" });
    }
};

export const deleteRecord = async (req: Request, res: Response) => {
    // 視聴記録削除処理
    try {
        const { id } = req.params;
        await Movie.findByIdAndDelete(id);
        res.status(200).json({ message: "視聴記録を削除しました" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "視聴記録の削除に失敗しました" });
    }
};