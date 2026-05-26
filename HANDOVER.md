# GBS Insider Club — Session Handover
**Last updated:** May 26, 2026

---

## ⚠️ CRITICAL FILE RULES — READ BEFORE TOUCHING ANY FILE

```
DO NOT overwrite index.html or landing.html with the AI guide.
DO NOT push guide.html content to any other filename.
DO NOT create a new index.html — it already exists and is the landing page.

The AI guide lives ONLY at: guide.html
The landing page lives ONLY at: index.html (= landing.html, identical files)
```

Any Claude session that edits or creates HTML files must check this document first.

---

## Site Structure

| File | URL | What it is | Touch? |
|---|---|---|---|
| `index.html` | gbsinsiderclub.com | Landing page (public, no auth) | Only for landing page edits |
| `landing.html` | gbsinsiderclub.com/landing.html | Same as index.html — kept in sync | Only for landing page edits |
| `guide.html` | gbsinsiderclub.com/guide.html | AI Field Guide (auth-gated) | Only for AI guide edits |
| `pillar-*.html` | gbsinsiderclub.com/pillar-*.html | GBS curriculum pillars (auth-gated) | Content development sessions |

**Rule:** If you are editing the AI guide, push to `guide.html` only. If you are editing the landing page, push to both `index.html` AND `landing.html`.

---

## Tech Stack

```
Namecheap (domain registration)
  → Cloudflare (DNS, CDN, HTTPS) — nameservers: coco/lennon.ns.cloudflare.com
    → GitHub repo: jkentarom-dot/GBSInsiderClub (main branch)
      → Cloudflare Pages (auto-deploy on push, ~60s)

Supabase project: wgdcfgknnentriqlajqe
  → Auth (invitation-only, free/paid tiers)
  → Tables: waitlist, access_requests
  → Edge Functions: handle-access-request, approve-paid-user, send-email, handle-waitlist
  → SMTP: Namecheap private email (for auth invite emails)

Resend (transactional email for notifications)
  → Domain verified: gbsinsiderclub.com
  → From: julian.magata@gbsinsiderclub.com
```

---

## Credentials & Keys

| Item | Value |
|---|---|
| Supabase project ID | wgdcfgknnentriqlajqe |
| Supabase URL | https://wgdcfgknnentriqlajqe.supabase.co |
| Supabase anon key | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZGNmZ2tubmVudHJpcWxhanFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NzQ0MzgsImV4cCI6MjA5NDM1MDQzOH0.kc1VHPV_CXUREYW5txiAJmZHWLFjH-2wZiEZBBbpsXo |
| GitHub repo | github.com/jkentarom-dot/GBSInsiderClub |
| GitHub PAT | ghp_xxxx_REDACTED_see_Julian |
| Namecheap SMTP host | mail.privateemail.com (port 465) |
| Namecheap SMTP user | julian.magata@gbsinsiderclub.com |
| Resend API key | re_xxxx_REDACTED_see_Julian |

> **Always inject** Supabase anon key when editing index.html, landing.html, or guide.html.
> Replace: `YOUR_SUPABASE_ANON_KEY` / `YOUR_SUPABASE_KEY` / `YOUR_SUPABASE_URL`

---

## Supabase Edge Functions

| Function | Trigger | What it does |
|---|---|---|
| `handle-access-request` | Called from guide.html request form | Free: auto-invites user. Paid: logs request, emails Julian |
| `approve-paid-user` | Julian clicks link in email | Upgrades user tier, sends invite if new user |
| `send-email` | Called by other functions | Sends transactional emails via Resend API |
| `handle-waitlist` | Called from landing page form | Inserts to waitlist, sends confirmation + notifies Julian |

**Deploy command:**
```bash
cd GBSInsiderClub
git pull
supabase functions deploy {function-name} --use-api --no-verify-jwt
```

**Secrets set in Supabase:**
- `SERVICE_KEY` — Supabase service role key
- `RESEND_API_KEY` — Resend API key
- `SMTP_PASS` — Namecheap email password

---

## Database Tables

### `waitlist`
Captures email notification signups from landing page.
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| email | text | |
| first_name | text | Added May 2026 |
| last_name | text | Added May 2026 |
| created_at | timestamptz | |

### `access_requests`
Full audit log of all access requests to guide.html.
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| email | text | |
| first_name | text | Mandatory |
| last_name | text | Mandatory |
| company | text | Optional |
| tier_requested | text | free / paid |
| tier_granted | text | |
| status | text | pending / approved / rejected |
| approved_by | text | auto / julian |
| source | text | guide / landing |
| approval_token | text | One-time token for paid approval link |
| requested_at | timestamptz | |
| approved_at | timestamptz | |
| invite_sent_at | timestamptz | |

---

## Auth & User Flows

**Free access request:**
1. User fills form on guide.html → Request Access tab
2. `handle-access-request` runs → auto-invites via Supabase Auth
3. User receives invite email → clicks link → password setup screen → enters guide

**Paid access request:**
1. User selects Full Access on guide.html form
2. `handle-access-request` logs request → emails Julian with 1-click approve link
3. Julian clicks approve → `approve-paid-user` runs → upgrades tier or sends invite

**Password reset:**
User clicks "Forgot your password?" on sign in tab → enters email → Supabase sends reset link

**Upgrade existing user to paid (manual SQL):**
```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"tier": "paid"}'::jsonb
WHERE email = 'theiremail@domain.com';
```

---

## Auth Tiers (guide.html)

| Tier | Access | How granted |
|---|---|---|
| `free` | Beginner chapters only | Auto on request |
| `paid` | All chapters | Julian approves via email link |

---

## Email Flows

| Trigger | To | Via | Status |
|---|---|---|---|
| Free access request | User (invite link) | Supabase Auth SMTP | ✅ Working |
| Paid access request | Julian (approve link) | Resend | ✅ Working |
| Julian approves paid | User (invite or tier upgrade) | Supabase Auth SMTP | ✅ Working |
| Waitlist signup | User (confirmation) | Resend | ✅ Built, pending test |
| Waitlist signup | Julian (notification) | Resend | ✅ Built, pending test |
| Password reset | User | Supabase Auth SMTP | ✅ Working |

---

## Current Users

| Email | Tier | Status |
|---|---|---|
| jkentarom@gmail.com | paid | Active |
| julian.magata@outlook.com | free | Active |
| djschmechel@gmail.com | — | Waiting for verification |
| michaelpenndorf@web.de | — | Waiting for verification |

---

## Full File List (GitHub repo root)

```
index.html                            ← LANDING PAGE (public) — DO NOT overwrite with guide
landing.html                          ← LANDING PAGE (same as index.html, kept in sync)
guide.html                            ← AI FIELD GUIDE (auth-gated) — only AI guide content here
pillar-1-gbs-fundamentals.html        ← GBS curriculum pillar
pillar-2-operational-excellence.html  ← GBS curriculum pillar
pillar-3-digital-technology.html      ← GBS curriculum pillar
pillar-4-stakeholder-communication.html
pillar-5-career-performance.html
pillar-6-total-rewards.html
pillar-7-leadership-people.html
pillar-8-projects-transformation.html
pillar-9-compliance-risk.html
pillar-10-gbs-transition.html
hero-office.png                       ← Landing page hero image
section-who.png                       ← Landing page image
section-inside.png                    ← Landing page image
supabase/
  functions/
    handle-access-request/index.ts    ← Edge Function
    approve-paid-user/index.ts        ← Edge Function
    send-email/index.ts               ← Edge Function (Resend)
    handle-waitlist/index.ts          ← Edge Function
  migrations/
    create_access_requests.sql        ← Run once in Supabase SQL editor
  DEPLOY.md                           ← Edge Function deploy instructions
_routes.json                          ← Cloudflare routing config
wrangler.jsonc                        ← Cloudflare Pages config
index.ts                              ← Legacy Cloudflare Worker (not in use)
```

---

## GBS Curriculum Structure

| # | Pillar | Sections | Topics |
|---|---|---|---|
| 01 | GBS Fundamentals | 4 | 15 |
| 02 | Operational Excellence | 5 | 28 |
| 03 | Digital & Technology Skills | 4 | 18 |
| 04 | Stakeholder & Communication | 3 | 11 |
| 05 | Career & Performance | 3 | 13 |
| 06 | Total Rewards (Comp & Ben) | 3 | 8 |
| 07 | Leadership & People Mgmt | 4 | 17 |
| 08 | Projects & Transformation | 5 | 14 |
| 09 | Compliance & Risk | 3 | 12 |
| 10 | GBS Transition (Migration) | 3 | 9 |
| + | AI Field Guide | — | 36+ chapters (live at guide.html) |
| **Total** | | **37** | **145+** |

---

## Content Development Method

### Session flow per topic
1. Claude selects next L3 topic (Rookie level first, working up)
2. Claude asks 4–5 focused questions
3. Julian answers in plain language
4. Claude drafts: content + science backing + Julian's Take + visual prompt
5. 2–3 review iterations → approved
6. Claude outputs updated pillar HTML using `/gbs-doc` skill
7. Video flag raised if topic meets 2 of 3 criteria

### Video filter — becomes a video when 2 of 3 apply
- Has a **transformation** (before/after, wrong/right)
- Can be **demonstrated visually** (diagram, framework, comparison)
- Has a **personal story** angle

### Skills in this project
| Skill | Trigger | Use for |
|---|---|---|
| `/gbs-doc` | field guide, HTML document | Pillar page HTML output |
| `/content` | youtube, short, carousel, pdf | Video scripts, carousels |
| `/voice` | rewrite, make it sound like me | Prose in Julian's voice |
| `/linkedin` | LinkedIn post | Post repurposing |
| `/frontend-design` | web component, landing page | UI/design work |

---

## Open Actions

- [ ] **P1** — Test waitlist confirmation email (landing page signup)
- [ ] **P2** — Re-invite djschmechel@gmail.com and michaelpenndorf@web.de
- [ ] **P3** — Change Namecheap mailbox password (was exposed in terminal) → update Supabase SMTP secret
- [ ] **P4** — Enable 2FA on Supabase (Profile → Security → TOTP)
- [ ] **P5** — Start content: Pillar 1, topic 1 (interview session)

---

*Updated: May 26, 2026 · GBS Insider Club*
