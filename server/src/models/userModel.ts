// userModel.ts
import { supabase } from '../supabase';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

class UserModel {
  async getUserById(userId: number): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .limit(1);

    if (error) {
      console.error('ユーザーの取得エラー:', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      return null; // ユーザーが見つからない場合は null を返す
    }

    // 型キャストを追加
    return data[0] as User;
  }

  async findOne(query: { email: string }): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .like('email', query.email)
      .limit(1);
  
    if (error) {
      console.error('ユーザーの取得エラー:', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      return null; // ユーザーが見つからない場合は null を返す
    }
  
    return data[0] as User;
  }  
}

export default new UserModel();