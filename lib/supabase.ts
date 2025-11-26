import { createClient } from '@supabase/supabase-js'

// Fallback to dummy values during build if env vars are missing
// This prevents the "supabaseUrl is required" error during static generation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoxOTgwMjU2ODM0fQ.placeholder_key_for_build'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
