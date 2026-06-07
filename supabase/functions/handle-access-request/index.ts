import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from 'https://deno.land/std@0.177.0/crypto/mod.ts'

const SUPABASE_URL = 'https://wgdcfgknnentriqlajqe.supabase.co'
const SERVICE_KEY  = Deno.env.get('SERVICE_KEY')!
const SITE_URL     = 'https://gbsinsiderclub.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function sendEmail(payload: object) {
  return fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SERVICE_KEY}` },
    body: JSON.stringify(payload),
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, first_name, last_name, company, tier_requested, source } = await req.json()

    if (!email || !first_name || !last_name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const tier = tier_requested || 'free'
    const sb   = createClient(SUPABASE_URL, SERVICE_KEY)

    // Check for duplicate
    const { data: existing } = await sb
      .from('access_requests')
      .select('id, status')
      .eq('email', email)
      .order('requested_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existing && (existing.status === 'approved' || existing.status === 'pending')) {
      return new Response(JSON.stringify({
        success: true,
        message: existing.status === 'approved'
          ? 'You already have access. Check your email for the invite link.'
          : 'Your request is already pending. We will be in touch soon.'
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Generate approval token for paid tier
    const approval_token = tier === 'paid'
      ? Array.from(crypto.getRandomValues(new Uint8Array(24)))
          .map(b => b.toString(16).padStart(2, '0')).join('')
      : null

    // Insert record
    const { data: record, error: insertError } = await sb
      .from('access_requests')
      .insert({
        email, first_name, last_name, company: company || null,
        tier_requested: tier,
        status:      tier === 'free' ? 'approved' : 'pending',
        approved_by: tier === 'free' ? 'auto' : null,
        source:      source || 'guide',
        approval_token,
        approved_at: tier === 'free' ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (insertError) throw insertError

    if (tier === 'free') {
      // Auto-invite
      const { error: inviteError } = await sb.auth.admin.inviteUserByEmail(email, {
        data: { tier: 'free', first_name, last_name },
        redirectTo: `${SITE_URL}/index.html`,
      })
      if (inviteError) throw inviteError

      await sb.from('access_requests')
        .update({ invite_sent_at: new Date().toISOString(), tier_granted: 'free' })
        .eq('id', record.id)

      // Notify Julian about new free signup
      await sendEmail({
        type: 'free_signup_notification',
        first_name, last_name, email, company,
      })

      return new Response(JSON.stringify({
        success: true,
        message: 'Access granted! Check your email for your invite link to set up your password.'
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    } else {
      // Paid — send notification email to Julian with 1-click approve
      const approve_url = `${SUPABASE_URL}/functions/v1/approve-paid-user?token=${approval_token}`

      await sendEmail({
        type: 'paid_request_notification',
        first_name, last_name, email, company,
        approve_url,
      })

      return new Response(JSON.stringify({
        success: true,
        message: 'Request received. We will review and be in touch within 24 hours.'
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
