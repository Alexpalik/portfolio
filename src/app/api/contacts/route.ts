import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      
    if (error) {
      throw new Error('Failed to get contacts')
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error getting contacts:', error)
    return NextResponse.json({ error: 'Failed to get contacts' }, { status: 500 })
  }
}