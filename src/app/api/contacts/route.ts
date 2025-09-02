import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
    try{
        const { data, error } = await supabase
        .from('contacts' )
        .select('*')
        
        if (error) {
            throw new Error('Failed to get contacts')
        }
        return NextResponse.json(data)
    }
    catch (error) {
        console.error('Error getting contacts:', error)
        return NextResponse.json({ error: 'Failed to get contacts' }, { status: 500 })
    }
}