export async function sendDiscordNotification(contact: any) {
    try {
      const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [{
            title: '📧 New Contact Form Submission',
            color: 0x00ff00, // Green color
            fields: [
              { 
                name: '👤 Name', 
                value: contact.name, 
                inline: true 
              },
              { 
                name: '📧 Email', 
                value: contact.email, 
                inline: true 
              },
              { 
                name: '📝 Subject', 
                value: contact.subject || 'No subject',
                inline: false
              },
              { 
                name: '💬 Message', 
                value: contact.message.length > 500 
                  ? contact.message.substring(0, 500) + '...' 
                  : contact.message,
                inline: false
              }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'Portfolio Contact Form'
            }
          }]
        })
      });
  
      if (!response.ok) {
        throw new Error(`Discord webhook failed: ${response.status}`);
      }
  
      console.log('Discord notification sent successfully');
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
    }
  }