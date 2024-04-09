import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const auth = supabase.auth;

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

const userModel = {
    // 新規ユーザの登録
    async registerUser(username: string, email: string, password: string): Promise<User | null> {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('Supabase sign up error:', error.message);
            return null;
        }
        return { id: data?.user?.id ? parseInt(data.user.id.toString(), 10) : 0, username, email, password };
    },

    async loginUser(email: string, password: string): Promise<User | null> {
        const { user, error } = await supabase.auth.signIn({ email, password });
        if (error) {
            console.error('Supabase sign in error:', error.message);
            return null;
        }
        return { id: user?.id || '', username: '', email, password };
    },

    async logoutUser(): Promise<void> {
        await supabase.auth.signOut();
    }
};

export default userModel;