import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://wgdcfgknnentriqlajqe.supabase.co'
const SERVICE_KEY  = Deno.env.get('SERVICE_KEY')!
const SITE_URL     = 'https://gbsinsiderclub.com'

Deno.serve(async (req) => {
  const url   = new URL(req.url)
  const token = url.searchParams.get('token')

  const html = (title: string, msg: string, color: string) => new Response(`
    <!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${title} — GBS Insider Club</title>
    <style>
      body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;
           background:#05080f;font-family:'IBM Plex Sans',system-ui,sans-serif;color:#ced4e0;}
      .card{background:#0d1117;border:1px solid #1e2530;border-radius:10px;padding:48px 40px;
            max-width:460px;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.6);}
      .bar{height:2px;background:linear-gradient(90deg,${color},transparent);margin-bottom:28px;border-radius:2px;}
      h2{color:#fff;font-size:20px;margin-bottom:12px;}
      p{color:#8a94a8;font-size:14px;line-height:1.7;}
    </style></head><body>
    <div class="card">
      <div class="bar"></div>
      <h2>${title}</h2><p>${msg}</p>
    </div></body></html>
  `, { headers: { 'Content-Type': 'text/html' } })

  if (!token) return html('Invalid Link', 'This approval link is invalid or missing a token.', '#ff4d6a')

  const sb = createClient(SUPABASE_URL, SERVICE_KEY)

  // Look up the request by token
  const { data: record, error: lookupError } = await sb
    .from('access_requests')
    .select('*')
    .eq('approval_token', token)
    .single()

  if (lookupError || !record) {
    return html('Link Not Found', 'This approval link is invalid or has already been used.', '#ff4d6a')
  }

  if (record.status === 'approved') {
    return html('Already Approved', `${record.first_name} ${record.last_name} already has access.`, '#b89438')
  }

  // Check if user already exists
  const { data: { users } } = await sb.auth.admin.listUsers()
  const existingUser = users?.find(u => u.email === record.email)

  if (existingUser) {
    // Already registered — just upgrade tier, no invite needed
    await sb.auth.admin.updateUserById(existingUser.id, {
      user_metadata: { ...existingUser.user_metadata, tier: 'paid' }
    })
  } else {
    // New user — send invite
    const { error: inviteError } = await sb.auth.admin.inviteUserByEmail(record.email, {
      data: { tier: 'paid', first_name: record.first_name, last_name: record.last_name },
      redirectTo: `${SITE_URL}/index.html`,
    })
    if (inviteError) {
      return html('Invite Failed', `Could not send invite to ${record.email}. Error: ${inviteError.message}`, '#ff4d6a')
    }
  }

  // Update record
  await sb.from('access_requests').update({
    status:         'approved',
    tier_granted:   'paid',
    approved_by:    'julian',
    approved_at:    new Date().toISOString(),
    invite_sent_at: existingUser ? null : new Date().toISOString(),
    approval_token: null,
  }).eq('id', record.id)

  const msg = existingUser
    ? `${record.first_name} ${record.last_name} already had an account — their tier has been upgraded to paid. They can sign in now.`
    : `Invite sent to <strong style="color:#fff">${record.email}</strong>.<br><br>${record.first_name} ${record.last_name} will receive an email to set their password.`

  return html('✓ Access Granted', msg, '#00d68f')
})
