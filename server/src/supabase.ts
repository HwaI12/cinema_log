import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://jrmszenoehvadlmtfrel.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
    throw new Error('SUPABASE_KEY is not set in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);