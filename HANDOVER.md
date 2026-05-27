# GBS Insider Club — Project Handover & Change Log
**Last updated:** 2026-05-27 · 09:30 UTC
**Updated by:** Claude (GBSInsiderClub project chat)

---

## ⚠️ CRITICAL — READ BEFORE TOUCHING ANY FILE

```
1. ONE PROJECT ONLY — all Claude work happens in the GBSInsiderClub project chat.
   No other Claude projects or chats should touch this repo.

2. FILE OWNERSHIP — every file has one owner. Wrong chat = wrong file = data loss.

3. HANDOVER.md FIRST — before any session ends, update the Change Log below.

4. NEVER replace a file wholesale — always extract, patch, verify, push.

5. ALWAYS fetch current SHA from GitHub before pushing — never assume file state.
```

---

## File Ownership & Rules

| File | Owned by | Rule |
|---|---|---|
| `guide.html` | AI Guide work | Chapter content + auth gate only. Never push a full replacement without diffing first. |
| `index.html` | Landing page work | Public landing page. Always push `landing.html` in the same commit. |
| `landing.html` | Landing page work | Must always be identical to `index.html`. Sync every time. |
| `pillar-*.html` | Content work | GBS curriculum content. Standalone per pillar. |
| `supabase/functions/*` | Infrastructure work | Edge functions. Deploy separately via Supabase CLI. |
| `HANDOVER.md` | All sessions | Update the Change Log before every session end. |

---

## Pre-Flight Checklist — Run at the START of every session

```
□ 1. Read this file top to bottom
□ 2. Check Open Actions table — anything blocking?
□ 3. Fetch current SHA + size for any file you plan to edit:
       curl -s -H "Authorization: token TOKEN" \
         https://api.github.com/repos/jkentarom-dot/GBSInsiderClub/contents/FILE \
         | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['sha'][:8], d['size'])"
□ 4. Verify the file you fetched contains expected content before editing
□ 5. Never push a file that removes existing working functionality
```

---

## Site Structure

| File | URL | What it is |
|---|---|---|
| `index.html` | gbsinsiderclub.com | Landing page (public) |
| `landing.html` | gbsinsiderclub.com/landing.html | Landing page (identical to index.html) |
| `guide.html` | gbsinsiderclub.com/guide.html | AI Field Guide (auth-gated, 37 chapters) |
| `pillar-[1-10]-*.html` | gbsinsiderclub.com/pillar-*.html | GBS curriculum pillar pages |

**Current file sizes (as of last update):**

| File | Size | Lines | SHA (short) |
|---|---|---|---|
| `guide.html` | 794,505 chars | 9,215 | `9788bd4e` |
| `index.html` | 55,992 chars | ~680 | `f96c6a07` |
| `landing.html` | 55,992 chars | ~680 | `5f1b1577` |

> **Tip:** If the file you fetched is dramatically different in size from the table above, stop and investigate before editing.

---

## Tech Stack

```
Namecheap (domain: gbsinsiderclub.com)
  → Cloudflare DNS/CDN/HTTPS (nameservers: coco/lennon.ns.cloudflare.com)
    → GitHub repo: jkentarom-dot/GBSInsiderClub (main branch)
      → Cloudflare Pages (auto-deploy on push to main, ~60s)

Supabase (project: wgdcfgknnentriqlajqe)
  → Auth: invitation-only, free/paid tiers
  → Tables: waitlist, access_requests
  → Edge Functions: handle-access-request, approve-paid-user, send-email, handle-waitlist
  → Secrets: SERVICE_KEY, RESEND_API_KEY, SMTP_PASS

Resend (transactional email)
  → Domain verified: gbsinsiderclub.com
  → From address: julian.magata@gbsinsiderclub.com
```

---

## Credentials & Keys

| Item | Value |
|---|---|
| Supabase URL | https://wgdcfgknnentriqlajqe.supabase.co |
| Supabase anon key | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZGNmZ2tubmVudHJpcWxhanFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NzQ0MzgsImV4cCI6MjA5NDM1MDQzOH0.kc1VHPV_CXUREYW5txiAJmZHWLFjH-2wZiEZBBbpsXo |
| GitHub repo | github.com/jkentarom-dot/GBSInsiderClub |
| GitHub PAT | **ask Julian** — stored securely, not in this file |

> When editing `guide.html`, check for placeholder strings:
> `grep "YOUR_SUPABASE" guide.html` — should return nothing.

---

## Supabase Edge Functions

| Function | Called from | What it does |
|---|---|---|
| `handle-access-request` | guide.html request form | Free: auto-invites user. Paid: logs request, emails Julian with approve link |
| `approve-paid-user` | Julian's approval email | Upgrades tier or sends invite for new user. Returns confirmation HTML page |
| `send-email` | Other functions | Resend API wrapper. Types: `paid_request_notification`, `waitlist_confirmation` |
| `handle-waitlist` | (landing page — now removed) | Still deployed, not called. Can ignore |

**Deploy a function:**
```bash
supabase functions deploy {function-name} --use-api --no-verify-jwt
```

---

## Auth & Access Flows

**Free request:** guide.html form → `handle-access-request` → Supabase auto-invite → user sets password → access granted

**Paid request:** guide.html form → `handle-access-request` → email to Julian → Julian clicks approve link → `approve-paid-user` → invite sent or tier upgraded

**Password reset:** Sign In tab → "Forgot password?" → enter email → Supabase sends reset link

**Manual paid upgrade (SQL):**
```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"tier": "paid"}'::jsonb
WHERE email = 'email@domain.com';
```

---

## Current Users

| Email | Tier | Status |
|---|---|---|
| jkentarom@gmail.com | paid | Active |
| julian.magata@outlook.com | free | Active |
| djschmechel@gmail.com | — | Pending re-invite |
| michaelpenndorf@web.de | — | Pending re-invite |

---

## Open Actions

| Priority | Item | Owner | Status |
|---|---|---|---|
| P1 | Re-invite djschmechel@gmail.com and michaelpenndorf@web.de | Julian | Open |
| P2 | Test full free access flow end-to-end (request → invite email → password setup → guide access) | Julian + Claude | Open |
| P3 | Test paid access flow end-to-end (request → Julian email → approve → invite) | Julian + Claude | Open |
| P4 | Change Namecheap mailbox password (was exposed in terminal) → update `SMTP_PASS` secret in Supabase | Julian | Open |
| P5 | Enable 2FA on Supabase account (Profile → Security → TOTP) | Julian | Open |
| P6 | Start GBS content: Pillar 1 Topic 1 interview session | Julian + Claude | Open |
| P7 | Verify `callout-green` CSS class exists in guide.html (used in ch38 Fix 6) | Claude | Open |

---

## Change Log

> Full diffs at: https://github.com/jkentarom-dot/GBSInsiderClub/commits/main
> Link each entry to its commit for exact diff.

| Date | Time (UTC) | File(s) | What changed | Commit |
|---|---|---|---|---|
| 2026-05-27 | 09:25 | `guide.html` | Added Chapter 37 — Running AI Locally (llama.cpp, Ollama, vLLM, MLX, GGUF). Sidebar entry added. 4 QC fixes applied (DPA def, Open WebUI def, vLLM claim softened, GGUF source callout). | [9788bd4e](https://github.com/jkentarom-dot/GBSInsiderClub/commit/9788bd4ef16ba6b83a22ffb9de6a3d7da0f93c44) |
| 2026-05-27 | 08:28 | `guide.html` | Fixed payload field name: `tier` → `tier_requested` in request form fetch call. Added `source: 'guide'` to payload. | [2ef50957](https://github.com/jkentarom-dot/GBSInsiderClub/commit/2ef5095722f7c4b0f928db209a958f4323fee3f3) |
| 2026-05-26 | 21:54 | `index.html` `landing.html` | Removed waitlist capture section entirely (form, CSS, JS, Supabase SDK). Access path is now guide.html only. Nav + hero CTA updated to point to guide.html. | [f96c6a07](https://github.com/jkentarom-dot/GBSInsiderClub/commit/f96c6a078affeaa689bd147a123c80bf4a4ccf54) |
| 2026-05-26 | 21:50 | `index.html` `landing.html` | Restored full May 25 landing page design (62KB). Previous session had replaced it with an older 29KB stripped version. Waitlist form upgraded to handle-waitlist edge function with first/last name + company fields. | [239f44f0](https://github.com/jkentarom-dot/GBSInsiderClub/commit/239f44f04ceaa9ce060caa049429a8f55c5a3723) |
| 2026-05-26 | 21:46 | `guide.html` | Auth gate upgrades: forgot password link, full request form (first name, last name, company, tier selector), handle-access-request edge function wired up, error handling (already registered, already pending, connection error). | [4a9eca2e](https://github.com/jkentarom-dot/GBSInsiderClub/commit/4a9eca2e1da5fd2762c6f9670da10e02ea0d5b62) |
| 2026-05-26 | 21:11 | `supabase/functions/handle-waitlist` | Added full request/response logging for debugging. | [9687e6ca](https://github.com/jkentarom-dot/GBSInsiderClub/commit/9687e6caefd5682db65ed65252b04bd857f00ed9) |
| 2026-05-26 | 21:01 | `HANDOVER.md` | Full rewrite — site structure, tech stack, auth flows, DB schema, email flows, open actions. | [f742d481](https://github.com/jkentarom-dot/GBSInsiderClub/commit/f742d481f9554103718f86800e35546cbeb6efed) |
| 2026-05-26 | 20:56 | `guide.html` | Added ← GBS Insider Club back-link in guide topbar. | [08bc291b](https://github.com/jkentarom-dot/GBSInsiderClub/commit/08bc291b65cbd3b7bb731959cc18f7f8c3d730be) |
| 2026-05-26 | 20:50 | `supabase/functions/approve-paid-user` | Handle already-registered users gracefully (upgrade tier instead of re-inviting). | [523d3d4f](https://github.com/jkentarom-dot/GBSInsiderClub/commit/523d3d4f2f44962bc3a9ce103cb1bc03c4505079) |
| 2026-05-26 | 20:47 | `supabase/functions/send-email` | Migrated from denomailer to Resend API. Both paid notification and waitlist confirmation emails working. | [8835891a](https://github.com/jkentarom-dot/GBSInsiderClub/commit/8835891abe230c50b60e4e888c8555d8d554802a) |
| 2026-05-25 | 14:56 | `guide.html` `index.html` | Major landing page redesign (62KB full version). Guide updated. | [e1fa90a6](https://github.com/jkentarom-dot/GBSInsiderClub/commit/e1fa90a681) |
| 2026-05-15 | 20:39 | `guide.html` | Guide content updates. | [b1712ad1](https://github.com/jkentarom-dot/GBSInsiderClub/commit/b1712ad12d) |
| 2026-05-15 | 16:02 | `index.html` | Supabase key injection. | [76ef7d45](https://github.com/jkentarom-dot/GBSInsiderClub/commit/76ef7d4586) |

---

## Session Protocol — How to end a session

Before closing any Claude chat that touched the repo:

```
1. Add a row to the Change Log above (date, time, file, what, commit SHA + link)
2. Update Open Actions — mark done, add new items
3. Update "Current file sizes" table if any file changed significantly
4. Push this updated HANDOVER.md as the last commit of the session
```

Commit message format: `docs: update HANDOVER.md — [one line summary]`

---

## GBS Content Structure

| # | Pillar | Topics | Status |
|---|---|---|---|
| 01 | GBS Fundamentals | 15 | Pillar page built, video scripts Ep 1–5 done |
| 02 | Operational Excellence | 28 | Pillar page built |
| 03 | Digital & Technology Skills | 18 | Pillar page built |
| 04 | Stakeholder & Communication | 11 | Pillar page built |
| 05 | Career & Performance | 13 | Pillar page built |
| 06 | Total Rewards (Comp & Ben) | 8 | Pillar page built |
| 07 | Leadership & People Mgmt | 17 | Pillar page built |
| 08 | Projects & Transformation | 14 | Pillar page built |
| 09 | Compliance & Risk | 12 | Pillar page built |
| 10 | GBS Transition (Migration) | 9 | Pillar page built |
| AI | AI Field Guide | 37 chapters | Live at guide.html |

---

*GBS Insider Club · gbsinsiderclub.com · Updated 2026-05-27*
