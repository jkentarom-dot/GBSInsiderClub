# Edge Function Deploy Instructions

Two functions need to be deployed to Supabase. One-time setup, ~5 minutes.

## Prerequisites
Install Supabase CLI: https://supabase.com/docs/guides/cli

## Steps

1. Login to Supabase CLI:
```
supabase login
```
(Opens browser — log in with your Supabase account)

2. Link this repo to your project:
```
supabase link --project-ref wgdcfgknnentriqlajqe
```

3. Set the service key secret (get from Supabase Dashboard → Settings → API Keys → Secret key):
```
supabase secrets set SUPABASE_SERVICE_KEY=<your-secret-key>
```

4. Deploy both functions:
```
supabase functions deploy handle-access-request --use-api
supabase functions deploy approve-paid-user --use-api
```

## Also run the SQL
Paste contents of `supabase/migrations/create_access_requests.sql` into:
Supabase Dashboard → SQL Editor → New query → Run

## Done
- Free users: auto-invited on request, invite email sent immediately
- Paid users: you get an email at julian.magata@gbsinsiderclub.com with 1-click approve link
