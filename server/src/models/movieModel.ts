// movieModel.ts

import { supabase } from '../supabase';

interface Movie {
  id: number;
  user_id: number;
  title: string;
  watched_date: string;
  review?: string;
  created_at: string;
  updated_at: string;
}

export const Movie = {
  getMoviesByUserId: async (userId: number): Promise<Movie[]> => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching movies:', error.message);
      return [];
    }

    return data ?? [];
  },

  addMovie: async (movie: Movie): Promise<void> => {
    const { error } = await supabase.from('movies').insert([movie]);

    if (error) {
      console.error('Error adding movie:', error.message);
    }
  },

  // 他のメソッドも追加できます

};

export default Movie;