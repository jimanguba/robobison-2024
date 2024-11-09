import { createClient } from '@supabase/supabase-js';

// Replace these values with your actual Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a Supabase client using the project URL and anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
