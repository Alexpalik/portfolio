import { NextRequest, NextResponse } from 'next/server'
import { sendDiscordNotification } from '../../../lib/discord'

export async function POST(request: NextRequest) {
  try {
    const contact = await request.json()
    
    console.log('Received contact data:', contact)
    
    // Send Discord notification
    await sendDiscordNotification(contact)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    )
  }
} 