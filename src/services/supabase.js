import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ptlkicteoasvoqvuwcgz.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bGtpY3Rlb2Fzdm9xdnV3Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMTE0MDEsImV4cCI6MjA0MDc4NzQwMX0.UlZ8Xzhj1XXoImN3xjwkMdzGQGP9GAZstv5B7VywXsg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
