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

export const getMoviesByUserId = async (userId: number): Promise<Movie[]> => {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching movies:', error.message);
    return [];
  }

  return data;
};

export const addMovie = async (movie: Movie): Promise<void> => {
  const { error } = await supabase.from('movies').insert(movie);

  if (error) {
    console.error('Error adding movie:', error.message);
  }
};

export default Movie;