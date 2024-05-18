import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eaqujcidtcqnulirebbz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcXVqY2lkdGNxbnVsaXJlYmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MjIwNDYsImV4cCI6MjAyODQ5ODA0Nn0.g6zhcT-Z6wRQLikDPusEP1O33J6i6RmJVfsQjmU_1ho';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
