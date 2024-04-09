import { supabase } from '../supabase';

interface Movie {
  id: number;
  user_id: number;
  title: string;
  watched_date: Date;
  review?: string;
  created_at: Date;
  updated_at: Date;
}

class MovieModel {
  async findAll(userId: number): Promise<Movie[]> {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("user_id", userId);
  
    if (error) {
      throw error;
    }
  
    return data as Movie[];
  }

  async create(movie: Partial<Movie>): Promise<void> {
    const { error } = await supabase
    .from("movies")
    .insert([movie]);

    if (error) {
      throw error;
    }
  }

  async update(movieId: number, movie: Partial<Movie>): Promise<void> {
    const { error } = await supabase
      .from("movies")
      .update(movie)
      .eq("id", movieId);

    if (error) {
      throw error;
    }
  }

  async delete(movieId: number): Promise<void> {
    const { error } = await supabase
      .from("movies")
      .delete()
      .eq("id", movieId);
  
    if (error) {
      throw error;
    }
  }
}

export default new MovieModel();