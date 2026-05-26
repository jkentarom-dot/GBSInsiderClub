import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://wgdcfgknnentriqlajqe.supabase.co'
const SERVICE_KEY  = Deno.env.get('SERVICE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, first_name, last_name, company } = await req.json()

    if (!email || !first_name || !last_name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const sb = createClient(SUPABASE_URL, SERVICE_KEY)

    // Check duplicate
    const { data: existing } = await sb
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existing) {
      return new Response(JSON.stringify({
        success: true,
        message: "You're already on the list. We'll be in touch."
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Insert into waitlist
    const { error: insertError } = await sb
      .from('waitlist')
      .insert({ email, first_name, last_name, company: company || null })

    if (insertError) throw insertError

    // Send confirmation + notification emails
    await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SERVICE_KEY}` },
      body: JSON.stringify({
        type: 'waitlist_confirmation',
        to: email,
        first_name, last_name, company,
      }),
    })

    return new Response(JSON.stringify({
      success: true,
      message: "You're on the list. We'll reach out when the next pillar is ready."
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
