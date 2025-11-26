import { createClient } from '@supabase/supabase-js'

// Fallback to dummy values during build if env vars are missing
// This prevents the "supabaseUrl is required" error during static generation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
