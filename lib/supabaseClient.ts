import { createClient } from "@supabase/supabase-js";

// We access the environment variables we set up earlier
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This "client" is what we will use to ask the database for data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
