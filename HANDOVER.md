# GBS Insider Club — Session Handover

**Date:** 2026-06-16
**Status:** Free tier live. Paid tier live with hard gating (templates + gated text). 4 career paths + 3 cross-path topics shipped. Site-wide AI data-safety disclaimer in place. Stripe go-live blocked on one Julian task (see §6).

---

## 1. Current site state

### Free tier (LIVE)
- ~55 HTML files, auto-deployed via Cloudflare Pages from GitHub on push to `main` (~2 min).
- 10 pillar pages, 38 cluster pages (concept SVGs, Julian's Take blocks, self-checks, glossaries).
- `guide.html` — AI Field Guide, 37 chapters behind auth gate; tier-gated chapter visibility. Approved accent colour `#ff6b35` (orange) is intentional here.
- `landing.html` DELETED this session (orphan page; was the only file with a real emoji).

### Paid tier (LIVE)
- **4 career paths:** Associate Accelerator (11 modules), Team Lead Playbook (16), Project SME (8), Project Leadership (11).
- **3 cross-path gated topics** (shared, linked from all 4 paths):
  - `path-social-media.html` — Personal Brand / visibility (5 modules, key `path-social-media`)
  - `path-promotion-plateau.html` — IC→leader inflection (4 modules, key `path-promotion-plateau`)
  - `path-sap.html` — SAP system literacy (5 modules, key `path-sap`) **[new this session]**
- **Manager Track:** still flagged as a possible separate premium product — decision pending.

### Gating (LIVE — hard gating deployed)
- **Text content:** `gated_content` table (cols: `page` PK, `html`, `updated_at`), 15 gated pages. Served by `get-gated-content` edge function (validates user JWT + `user_tiers.tier='full_access'`). Public pages contain only the gate panel; no gated text leaks (verified).
- **Templates:** private Supabase bucket `templates` (17 files). `download-template` edge function (verify_jwt=false) validates JWT + tier → returns 120s signed URL. Download cards wired across path pages via shared script using `closest(".tpl-gated")` + `data-file`. Public `templates/*.xlsx` removed from repo (leak closed).
- **17 templates:** 8 PM/SME (Project Charter, RAID Log, Stakeholder Map, A3, Status Report, SME Participation Agreement, KT Checklist, UAT Script, Go-Live Readiness, SME-to-Career Sheet) + Brag Sheet, Career Chessboard, 90-Day Roadmap (Associate), 90-Day Leadership Plan (TL), Team Capacity Model, SBI Feedback Prep + `Status_Report.pptx`.

### AI data-safety disclaimer (LIVE — site-wide)
- Standard gold-accented block in **every** AI exercise: 34 gated blocks + 6 public free-preview blocks + the 3 cross-path topics.
- Message: neutralise data first — strip company/people/client/product names, use find-and-replace to swap for `[Company]`/`[Client]`/`[Name]` before pasting into a public AI model.
- Reusable string lives in build scripts (`DISC`); injected via `<div class="ai-block">…</div>` regex sweep.

### SVG legibility (improved this session)
- Path/gated diagrams use `.minifig` (`viewBox 0 0 640 210`, scales to container).
- Fix: `.minifig` max-width 680→840; SVG max-width cap removed (fills container); `.callout-right:has(.minifig)` now breaks out to full width (the screenshotted "JD → Action Plan" diagram was trapped at half-width in a side callout).
- Grey sublabels lifted `#7a8799`→`#a3aec0` in path diagrams (gated + public) for contrast.
- Cluster-page diagrams already render full content-width (inline-styled wrapper, no `.minifig`) — lower priority. A full font-bump QA pass across all ~107 SVGs remains optional.

---

## 2. Architecture & infra

| Component | Service | Notes |
|-----------|---------|-------|
| Hosting | Cloudflare Pages | Auto-deploy on push to `main` |
| Repo | GitHub `jkentarom-dot/GBSInsiderClub` | Branch `main` |
| Auth/backend | Supabase, ref `wgdcfgknnentriqlajqe` | Edge functions, storage, gated content, JWT tier gating |
| Email | Resend | Domain verified gbsinsiderclub.com |
| PAT | `/mnt/project/PAT_for_github` | `https://x-access-token:${PAT}@github.com/...` |
| Supabase mgmt token (sbp_) | `/mnt/project/Supabase_Claude_token` | Use `api.supabase.com` (CLI fails in container) |
| Supabase service role key | `/mnt/project/Supabase_service_role_key` | REST + storage admin |
| Curriculum | `/mnt/project/GBS_Curriculum_Final_2026_01_28_v01.xlsx` | sheet `FInal` |
| Brand skill | `/mnt/skills/user/brand/SKILL.md` | Single source of truth (read at session start) |

### Git session setup
```bash
cd /home/claude && git clone https://github.com/jkentarom-dot/GBSInsiderClub.git && cd GBSInsiderClub
PAT=$(cat /mnt/project/PAT_for_github)
git remote set-url origin "https://x-access-token:${PAT}@github.com/jkentarom-dot/GBSInsiderClub.git"
git config user.email "claude@gbsinsiderclub.com"; git config user.name "Claude"
```
Never embed the PAT in repo file content (secret scanner blocks pushes).

### Edge function deploy (CLI unavailable → Management API)
```bash
curl -X POST "https://api.supabase.com/v1/projects/$REF/functions/deploy?slug=NAME" \
 -H "Authorization: Bearer $MGMT" \
 -F 'metadata={"entrypoint_path":"index.ts","name":"NAME","verify_jwt":false};type=application/json' \
 -F 'file=@index.ts;type=application/typescript'
```
File MUST be named `index.ts`. **Always deploy with `verify_jwt=false`** (else 401 on unauth requests).

---

## 3. Repeatable patterns

### New gated cross-path topic
1. `cp path-sme.html path-NAME.html`; replace title, canonical, hero block, and the content region between `<!-- ====== MODEL RECAP NAV ====== -->` and the wrapper close with an intro `<section>` + `<div id="gmount">` gate panel.
2. Replace `PAGE="path-sme"`→`PAGE="path-NAME"` and `'gbs-progress-sme'`→`'gbs-progress-NAME'`.
3. Module HTML → upsert to `gated_content` (curl POST to `/rest/v1/gated_content`, headers `apikey`+`Authorization` service role + `Prefer: resolution=merge-duplicates`).
4. Add a `toolkit-card` link in all 4 path toolkits; add sitemap entry.
5. Verify: paid-user fetch via `get-gated-content` returns modules; leak-check gated text NOT in public page; tag balance; secret scan = 0.

### Module HTML
`<details class="module"><summary><span class="mod-code">X.Y</span><span class="mod-title">…</span><span class="mod-arrow">▾</span></summary><div class="mod-body">…</div></details>` with `<p>`, `<span class="mod-label">`, `<table class="data-table">`, `<div class="callout-right">`, `<div class="jt-block">`, and `<div class="ai-block">` (always append the AI disclaimer block inside ai-block).

### Disposable test user (verification)
Create via `POST /auth/v1/admin/users` (service role, `email_confirm:true`) → insert `user_tiers` tier `full_access` → sign in `POST /auth/v1/token?grant_type=password` (anon key) for access token → test → DELETE `user_tiers` row + DELETE user. (urllib gets CF 1010-blocked on api.supabase.com — use `curl --data @file.json`.)

---

## 4. Voice / brand guardrails
- Punchy practitioner tone, short declarative sentences, no filler. Body text white/bright (`#dde3ec`), not grey.
- **Banned tone:** negation-contrast ("is not X. It is Y" / "not X, but Y"), colon-reveal ("[noun]: reveal"), exclamations, emojis anywhere, "probably won't", cynical framing of managers/orgs.
- **Banned words:** leverage, unlock, enable, drive, facilitate, streamline, robust, seamless, crucial, comprehensive, foster, etc.
- Abbreviations spelled on first use in HTML (ERP, R2R/P2P/O2C, t-code). No "cheat-code" framing — deliver real capability. Free = theory; paid = actionable.

---

## 5. Decisions logged this session
- **Currency = USD $99** (checkout hardcodes `currency:"usd"`, `unit_amount:9900`; Stripe account is EUR — conversion risk accepted, no change).
- `guide.html` orange `#ff6b35` = approved accent.
- `landing.html` deleted.
- Career-map roles: sr-associate folds into Associate; GPO + Domain Expert/CoE Lead tabled; director/head-gbs deferred (reframe as leader-facing content); Manager Track pending.
- Promotion Plateau reframed: "hero / individual contributor" instead of the game analogy; PR.3 centres on finding/developing/challenging talent and building high-performing teams (softened the "friction/hard conversations" framing).

---

## 6. Julian's open tasks (NOT Claude's)
- **STRIPE WEBHOOK BUG (blocks go-live):** `stripe-webhook` function reads secret `STRIPE_WEBHOOK_SECRET`, which is **missing** (only `WEBHOOK_SECRET` exists). Webhook returns 503 → grants access to nobody. Fix:
  1. Stripe Dashboard (Live mode) → Webhooks → add endpoint `https://wgdcfgknnentriqlajqe.supabase.co/functions/v1/stripe-webhook`, event `checkout.session.completed` → copy the `whsec_…` signing secret.
  2. Supabase → Edge Functions secrets: set `STRIPE_SECRET_KEY=sk_live_…` and **add** `STRIPE_WEBHOOK_SECRET=whsec_…`.
  - `create-checkout-session` is correct (one-time payment, `mode=payment`, sets `client_reference_id`). It is NOT a subscription — ignore Stripe's recurring/billing wizard. Optional: swap cosmetic `pk_live_` in `paid-tier.html` (~line 562).
- **UX confirm:** log in as a `full_access` user → open the 3 cross-path topics (modules render) and download one template (signed URL works).

---

## 7. On the horizon
- Manager Track: separate premium product or part of the £99/$99 offering — decide.
- Julian's Take interview blocks across cluster pages (blocked on Julian's raw answers; high priority).
- Landing page redesign — current paid section undersells; needs a free-vs-paid comparison concept + brand unification.
- **SAP positioning:** currently gated. Could be repositioned to FREE tier as a funnel/SEO/YouTube magnet (foundational literacy) if desired — flag for decision.
- Optional full SVG font-bump QA pass across all ~107 diagrams (needs visual QA to avoid overflow).
- YouTube/HeyGen batch recording (scripts banked first); "agentic-AI gap" script done, #3+ queued.
- P2C3 Continuous Improvement and other performance-impact clusters: deeper treatment (work examples, tips, downloadable guides — PDFs co-designed with Julian first).
