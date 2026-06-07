# Edge Function Deploy Instructions

Three functions need to be deployed to Supabase.

## Prerequisites
Install Supabase CLI: https://supabase.com/docs/guides/cli

## First-Time Setup

1. Login to Supabase CLI:
```
supabase login
```
(Opens browser — log in with your Supabase account)

2. Link this repo to your project:
```
supabase link --project-ref wgdcfgknnentriqlajqe
```

3. Secrets (already configured — only needed if resetting):
   - SERVICE_KEY — Supabase Dashboard → Settings → API Keys → Secret key
   - RESEND_API_KEY — from resend.com dashboard

## Deploy All Functions

**CRITICAL: Always use `--no-verify-jwt` flag.** Without it, the anon key auth fails (401 errors).

```
git pull
supabase functions deploy handle-access-request --project-ref wgdcfgknnentriqlajqe --no-verify-jwt
supabase functions deploy send-email --project-ref wgdcfgknnentriqlajqe --no-verify-jwt
supabase functions deploy approve-paid-user --project-ref wgdcfgknnentriqlajqe --no-verify-jwt
```

Always `git pull` first to get the latest code from GitHub.

## What Each Function Does
- **handle-access-request** — processes signup form: free tier auto-invites + notifies Julian; paid tier creates pending request + emails Julian with approve link
- **send-email** — sends emails via Resend API (signup notifications, paid request notifications)
- **approve-paid-user** — 1-click approve link for paid tier requests; creates user + sends invite

## SQL Migration
Already run. Table `access_requests` exists with 15 columns. No action needed unless resetting.

## Done
- Free users: auto-invited on request, invite email sent immediately, Julian notified via email
- Paid users: Julian gets email at julian.magata@gbsinsiderclub.com with 1-click approve link
