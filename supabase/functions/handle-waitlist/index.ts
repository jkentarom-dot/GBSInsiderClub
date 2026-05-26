import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://wgdcfgknnentriqlajqe.supabase.co'
const SERVICE_KEY  = Deno.env.get('SERVICE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  console.log('handle-waitlist invoked', req.method)

  if (req.method === 'OPTIONS') {
    console.log('CORS preflight')
    return new Response('ok', { headers: corsHeaders })
  }

  let body: any = {}
  try {
    const text = await req.text()
    console.log('Raw body:', text)
    body = JSON.parse(text)
    console.log('Parsed body:', JSON.stringify(body))
  } catch (e) {
    console.error('Body parse error:', e.message)
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  const { email, first_name, last_name, company } = body

  if (!email || !first_name || !last_name) {
    console.error('Missing fields:', { email, first_name, last_name })
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    const sb = createClient(SUPABASE_URL, SERVICE_KEY)

    // Check duplicate
    const { data: existing, error: lookupErr } = await sb
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (lookupErr) console.error('Lookup error:', lookupErr.message)

    if (existing) {
      console.log('Duplicate email:', email)
      return new Response(JSON.stringify({
        success: true,
        message: "You're already on the list. We'll be in touch."
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Insert
    const { error: insertError } = await sb
      .from('waitlist')
      .insert({ email, first_name, last_name, company: company || null })

    if (insertError) {
      console.error('Insert error:', insertError.message)
      throw insertError
    }

    console.log('Inserted waitlist entry for:', email)

    // Send emails via send-email function
    const emailRes = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({
        type: 'waitlist_confirmation',
        to: email,
        first_name, last_name, company,
      }),
    })

    const emailData = await emailRes.json()
    console.log('send-email response:', JSON.stringify(emailData))

    return new Response(JSON.stringify({
      success: true,
      message: "You're on the list. We'll reach out when the next pillar is ready."
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error('Unhandled error:', err.message)
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
