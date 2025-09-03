import { createClient } from '@supabase/supabase-js'

// Create Supabase client with error handling
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Export a default client for convenience (only use in client components)
let supabaseInstance: any = null

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = getSupabaseClient()
  }
  return supabaseInstance
}

// Individual functions for common operations
export const supabaseAuth = {
  signIn: async (email: string, password: string) => {
    const supabase = getSupabaseClient()
    return await supabase.auth.signInWithPassword({ email, password })
  },
  
  signOut: async () => {
    const supabase = getSupabaseClient()
    return await supabase.auth.signOut()
  },
  
  getUser: async () => {
    const supabase = getSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}

// Database operations
export const supabaseDB = {
  // Insert contact form data
  insertContact: async (contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) => {
    const supabase = getSupabaseClient()
    return await supabase.from('contacts').insert(contactData)
  },
  
  // Get all contacts
  getAllContacts: async () => {
    const supabase = getSupabaseClient()
    return await supabase.from('contacts').select('*')
  }
} 