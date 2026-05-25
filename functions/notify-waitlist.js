/**
 * Cloudflare Pages Function
 * Route: /functions/notify-waitlist.js
 * Triggered by: Supabase Database Webhook on waitlist INSERT
 * Sends an email notification to julian.magata@gbsinsiderclub.com
 *
 * Environment variables to set in Cloudflare Pages → Settings → Environment Variables:
 *   SMTP_HOST     = mail.privateemail.com
 *   SMTP_PORT     = 465
 *   SMTP_USER     = julian.magata@gbsinsiderclub.com
 *   SMTP_PASS     = (your Namecheap mailbox password)
 *   NOTIFY_EMAIL  = julian.magata@gbsinsiderclub.com
 *   WEBHOOK_SECRET = (a random string you set in Supabase webhook header)
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // ── Verify webhook secret ──────────────────────────
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== env.WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  // ── Parse Supabase webhook payload ────────────────
  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const record = payload?.record;
  const email  = record?.email || 'unknown';
  const time   = record?.created_at
    ? new Date(record.created_at).toLocaleString('en-GB', { timeZone: 'Europe/Warsaw' })
    : new Date().toLocaleString('en-GB', { timeZone: 'Europe/Warsaw' });

  // ── Send email via Namecheap SMTP (using fetch to mailchannels or direct SMTP) ──
  // Cloudflare Workers can't open raw TCP sockets, so we use MailChannels (free for CF Pages)
  const emailPayload = {
    personalizations: [{
      to: [{ email: env.NOTIFY_EMAIL }],
    }],
    from: {
      email: env.SMTP_USER,
      name: 'GBS Insider Club'
    },
    subject: '🔔 New Waitlist Signup — GBS Insider Club',
    content: [{
      type: 'text/html',
      value: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
          <div style="background: #05080f; padding: 20px 24px; border-radius: 6px 6px 0 0; border-bottom: 2px solid #b89438;">
            <span style="color: #b89438; font-weight: 700; font-size: 16px; letter-spacing: 0.05em;">GBS INSIDER CLUB</span>
          </div>
          <div style="background: #ffffff; padding: 28px 24px; border-radius: 0 0 6px 6px; border: 1px solid #e0e0e0; border-top: none;">
            <h2 style="color: #1a1a2e; font-size: 20px; margin: 0 0 16px;">New Waitlist Signup</h2>
            <p style="color: #444; font-size: 15px; margin: 0 0 8px;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="color: #444; font-size: 15px; margin: 0 0 24px;">
              <strong>Time:</strong> ${time}
            </p>
            <a href="https://supabase.com/dashboard/project/wgdcfgknnentriqlajqe/editor"
              style="display: inline-block; background: #b89438; color: #05080f; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 4px; text-decoration: none; letter-spacing: 0.05em;">
              View in Supabase →
            </a>
          </div>
        </div>
      `
    }]
  };

  // MailChannels API — free for Cloudflare Pages Functions
  const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailPayload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('MailChannels error:', err);
    return new Response('Email failed', { status: 500 });
  }

  return new Response('OK', { status: 200 });
}
