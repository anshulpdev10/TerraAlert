/**
 * Supabase Client Configuration
 * 
 * Sets up Supabase for authentication and database access.
 */

import {createClient} from '@supabase/supabase-js';
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env';

const supabaseUrl = SUPABASE_URL || 'https://lwurspqlazvnaqcyzdwg.supabase.co';
const supabaseAnonKey =
  SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dXJzcHFsYXp2bmFxY3l6ZHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NjgzMjUsImV4cCI6MjA5MjE0NDMyNX0.q1iubZPUFhSTpPFd64TWav8Elmp7wIor7sSs7s88G2Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: undefined, // Will use AsyncStorage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
