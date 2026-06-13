import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_TOKEN = '8965824497:AAHgUX5KxetqZxUGpi8iy4zKLKeuuHF5V9w';
const TELEGRAM_CHAT_ID = '243359306';

export async function POST(req: NextRequest) {
  const { name, whatsapp, countryCode, email, telegram, message } = await req.json();

  if (!name || !whatsapp) {
    return NextResponse.json({ error: 'Name and WhatsApp are required' }, { status: 400 });
  }

  const text = `
🔔 *New lead from drasiiavinograd.com*

👤 *Name:* ${name}
📱 *WhatsApp:* ${countryCode}${whatsapp}${email ? `\n📧 *Email:* ${email}` : ''}${telegram ? `\n✈️ *Telegram:* ${telegram}` : ''}${message ? `\n💬 *Message:* ${message}` : ''}

⏰ ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })} (Phuket time)
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
