import { NextRequest, NextResponse } from 'next/server'
import { sendDiscordNotification } from '@/lib/discord'

export async function POST(request: NextRequest) {
  try {
    const contact = await request.json()
    
    console.log('Received contact data:', contact)
    
    // Check if Discord webhook is configured
    if (process.env.DISCORD_WEBHOOK_URL) {
      await sendDiscordNotification(contact)
    } else {
      console.log('Discord webhook not configured, skipping notification')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json({ success: true }) // Don't fail if Discord fails
  }
} 