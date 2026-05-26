const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM_EMAIL     = 'GBS Insider Club <julian.magata@gbsinsiderclub.com>'
const JULIAN_EMAIL   = 'julian.magata@gbsinsiderclub.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function sendViaResend(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(data))
  return data
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { type, to, first_name, last_name, email, company, approve_url } = await req.json()

    if (type === 'waitlist_confirmation') {
      // Confirmation to signup
      await sendViaResend(
        to,
        "You're on the list — GBS Insider Club",
        `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#05080f;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080f;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#0d1117;border:1px solid #1e2530;border-radius:10px;overflow:hidden;">
        <tr><td style="height:3px;background:linear-gradient(90deg,#b89438,rgba(184,148,56,0.2),transparent);"></td></tr>
        <tr><td style="padding:40px;">
          <p style="color:#b89438;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px;">GBS INSIDER CLUB</p>
          <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0 0 16px;">You're on the list.</h1>
          <p style="color:#8a94a8;font-size:15px;line-height:1.7;margin:0 0 24px;">Hi ${first_name || 'there'},<br><br>
          You'll be the first to know when new content drops — AI strategy, GBS transformation playbooks, and more.</p>
          <p style="color:#55606e;font-size:13px;line-height:1.7;margin:0;">Want access to the AI Field Guide now?<br>
          <a href="https://gbsinsiderclub.com/index.html" style="color:#b89438;text-decoration:none;">Request access here →</a></p>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #1e2530;">
          <p style="color:#2a3040;font-size:11px;margin:0;">© 2026 GBS INSIDER CLUB</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
      )

      // Notification to Julian
      await sendViaResend(
        JULIAN_EMAIL,
        `[GBS] New waitlist signup — ${first_name} ${last_name} <${to}>`,
        `<p style="font-family:sans-serif;font-size:14px;color:#333;">New waitlist signup:</p>
<table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse;">
  <tr><td style="padding:4px 20px 4px 0;color:#888;">Name</td><td><strong>${first_name} ${last_name}</strong></td></tr>
  <tr><td style="padding:4px 20px 4px 0;color:#888;">Email</td><td>${to}</td></tr>
  <tr><td style="padding:4px 20px 4px 0;color:#888;">Company</td><td>${company || '—'}</td></tr>
  <tr><td style="padding:4px 20px 4px 0;color:#888;">Time</td><td>${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Warsaw' })}</td></tr>
</table>`
      )
    }

    else if (type === 'paid_request_notification') {
      await sendViaResend(
        JULIAN_EMAIL,
        `[GBS] Paid access request — ${first_name} ${last_name}`,
        `<!DOCTYPE html><html><body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f5f5f5;padding:40px 20px;">
  <table width="100%" style="max-width:520px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
    <tr><td style="height:3px;background:linear-gradient(90deg,#b89438,#d4a843);"></td></tr>
    <tr><td style="padding:32px;">
      <p style="color:#b89438;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 16px;">GBS INSIDER CLUB</p>
      <h2 style="color:#111;font-size:20px;margin:0 0 20px;">New paid access request</h2>
      <table style="font-size:14px;color:#333;border-collapse:collapse;width:100%;margin-bottom:28px;">
        <tr><td style="padding:6px 20px 6px 0;color:#888;width:80px;">Name</td><td><strong>${first_name} ${last_name}</strong></td></tr>
        <tr><td style="padding:6px 20px 6px 0;color:#888;">Email</td><td>${email}</td></tr>
        <tr><td style="padding:6px 20px 6px 0;color:#888;">Company</td><td>${company || '—'}</td></tr>
        <tr><td style="padding:6px 20px 6px 0;color:#888;">Time</td><td>${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Warsaw' })}</td></tr>
      </table>
      <a href="${approve_url}" style="display:inline-block;background:linear-gradient(135deg,#b89438,#d4a843);color:#05080f;font-weight:700;font-size:14px;padding:14px 28px;border-radius:6px;text-decoration:none;">✓ Approve & Send Invite →</a>
      <p style="color:#aaa;font-size:12px;margin-top:20px;">Single-use link. Grants immediate access and sends invite email.</p>
    </td></tr>
  </table>
</body></html>`
      )
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('send-email error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
