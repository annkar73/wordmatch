import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or Key is missing!");
  } else {
    console.log("Supabase URL and Key are set:", supabaseUrl, supabaseKey)
  }

// Skapa klienten
const supabase = createClient(supabaseUrl, supabaseKey);

// Exponera supabase som default export
export default supabase;
