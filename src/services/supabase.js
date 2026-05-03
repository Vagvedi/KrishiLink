import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project-id.supabase.co') {
  console.error('❌ Supabase: Missing or invalid environment variables')
  console.error('📝 Please configure your .env.local file with valid Supabase credentials')
  console.error('🔗 Get credentials from: https://supabase.com/dashboard -> Your Project -> Settings -> API')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
