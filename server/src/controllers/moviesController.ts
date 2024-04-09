// controllers/moviesController.ts
import { Request, Response } from 'express';
import MovieModel from '../models/movieModel';

export const getMovieList = async (req: Request & { user: { id: number } }, res: Response) => {
    try {
        const movies = await MovieModel.findAll(req.user.id);
        return res.status(200).json({ movies });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch movies' });
    }
};

export const addMovieRecord = async (req: Request & { user: { id: number } }, res: Response) => {
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

export const editMovieRecord = async (req: Request, res: Response) => {
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

export const deleteMovieRecord = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await MovieModel.delete(parseInt(id));
        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Failed to delete movie' });
    }
};
