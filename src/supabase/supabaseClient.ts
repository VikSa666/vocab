import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;

let supabase: SupabaseClient;

// Check if both environment variables are defined before creating the Supabase client
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.error("Supabase URL or key is undefined.");
}

export { supabase };
