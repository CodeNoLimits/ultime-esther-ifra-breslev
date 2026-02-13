import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://bxnhuwfabturyayohpht.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bmh1d2ZhYnR1cnlheW9ocGh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MDI5NTMsImV4cCI6MjA3OTE3ODk1M30._X0SKEFU05l-JJUjC_JSBKcB_64KbG2Xdr8l1TnqBPg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
