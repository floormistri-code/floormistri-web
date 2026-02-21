import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create client with explicit options for CORS/Auth handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Keep PKCE flow for security
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

// Export the Inquiry interface for TypeScript
export interface Inquiry {
  id: number
  created_at: string
  name: string
  email: string
  phone: string
  area_sqft: number
  flooring_type: string
  estimated_price: number
  message?: string
}

// Optional: Type for the database schema (for better type safety)
export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: Inquiry
        Insert: Omit<Inquiry, 'id' | 'created_at'>
        Update: Partial<Omit<Inquiry, 'id' | 'created_at'>>
      }
    }
  }
}