import { createClient } from "@supabase/supabase-js";

// We access the environment variables we set up earlier
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Global singleton instance of the Supabase Client.
 * Configured using public environment variables to securely query the database from the client.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
