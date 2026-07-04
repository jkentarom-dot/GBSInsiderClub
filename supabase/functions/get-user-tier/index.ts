import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Deploy with: supabase functions deploy get-user-tier --project-ref wgdcfgknnentriqlajqe --no-verify-jwt
// (platform JWT verification OFF — this function verifies the caller's JWT itself, below)

const SUPABASE_URL = 'https://wgdcfgknnentriqlajqe.supabase.co'
const SERVICE_KEY  = Deno.env.get('SERVICE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  // The caller must pass their Supabase auth JWT as a Bearer token.
  const authHeader = req.headers.get('Authorization') || ''
  const jwt = authHeader.replace(/^Bearer\s+/i, '').trim()
  if (!jwt) return json({ tier: 'free', reason: 'no_token' }, 401)

  const sb = createClient(SUPABASE_URL, SERVICE_KEY)

  // Resolve the user from their JWT (service role, server-side — no RLS exposure).
  const { data: { user }, error: userErr } = await sb.auth.getUser(jwt)
  if (userErr || !user) return json({ tier: 'free', reason: 'invalid_token' }, 401)

  // Canonical source of truth: the user_tiers table (Stripe checkout -> webhook writes here).
  const { data: row } = await sb
    .from('user_tiers')
    .select('tier')
    .eq('user_id', user.id)
    .maybeSingle()

  // Legacy fallback: manually-approved users carry their tier in user_metadata.
  const metaTier = (user.user_metadata as Record<string, unknown> | null)?.tier as string | undefined

  let tier = 'free'
  if (row?.tier) tier = row.tier                         // e.g. 'full_access' (Stripe path)
  else if (metaTier && metaTier !== 'free') tier = metaTier // legacy approve-paid-user path

  return json({ tier, source: row?.tier ? 'user_tiers' : (metaTier ? 'metadata' : 'none') })
})
