# GBS Insider Club — Session Handover Document

**Date:** 2026-06-08 (extended session)
**Status:** Free tier site complete. AI Field Guide overhauled. Auth system operational. Next priority: paid tier architecture and content build.

---

## 1. Current Site State — What Exists

### Free Tier (LIVE)
- **54 HTML files** auto-deployed via Cloudflare Pages from GitHub
- **10 pillar landing pages** — Julian's Take blocks, restyled curriculum toggles, cluster counts on tiles
- **38 cluster pages** — concept SVGs, inline sub-diagram SVGs, Julian's Take blocks, 2× Self-Check blocks, numbered topic headings (156 topics) with teal accent, glossaries
- **1 AI Field Guide** (guide.html) — 37 chapters behind auth gate:
  - 853 keyword highlights (gold)
  - 21 section breaker images (people photos + AI-generated)
  - 34 inline SVG diagrams
  - 36 self-check question blocks (109 questions)
  - Advanced RAG strategies section (GraphRAG, Agentic RAG, Adaptive RAG with decision matrix)
  - Tier gating (free/paid chapter visibility)
- **1 landing page** (index.html) — pillar explanation with cluster counts, career map, audience cards, hooks grid, CTA section

### Auth System (OPERATIONAL)
- 5 edge functions deployed with `--no-verify-jwt`
- Free tier: auto-invite + Julian notification via Resend
- Paid tier: Julian gets email with 1-click approve link
- Invite emails redirect to guide.html (where auth processing happens)
- Users: Anna Zaborowicz, Maciej Kuczko, djschmechel, michaelpenndorf, jkentarom, julian.magata@gmx.de

### What Does NOT Exist Yet
- Paid tier content (learning paths, templates, exercises)
- Paid tier landing page / experience
- Payment processing
- Cluster page keyword highlighting (guide has it, cluster pages don't)

---

## 2. Architecture Reference

### Infrastructure
| Component | Service | Notes |
|-----------|---------|-------|
| Hosting | Cloudflare Pages | Auto-deploy on push to main |
| Repo | GitHub: jkentarom-dot/GBSInsiderClub | Branch: main |
| Auth | Supabase | Edge functions, user management |
| Email | Resend | Domain verified: gbsinsiderclub.com |
| Domain | Namecheap | DNS via Cloudflare |
| PAT | /mnt/project/PAT_for_github | |
| Supabase token | /mnt/project/Supabase_Claude_token | sbp_... format |
| Curriculum | /mnt/project/GBS_Curriculum_Final_2026_01_28_v01.xlsx | |
| Learning paths | /mnt/project/LEARNING_PATHS_MASTER.md | Architecture doc |
| Brand | /mnt/skills/user/brand/SKILL.md | Single source of truth |

### Git Session Setup (every new session)
```bash
cd /home/claude
git clone https://github.com/jkentarom-dot/GBSInsiderClub.git
cd GBSInsiderClub
PAT=$(cat /mnt/project/PAT_for_github)
git remote set-url origin "https://x-access-token:${PAT}@github.com/jkentarom-dot/GBSInsiderClub.git"
git config user.email "claude@gbsinsiderclub.com"
git config user.name "GBS Content Bot"
```

### Supabase Edge Function Deploy
```bash
cd GBSInsiderClub && git pull
supabase functions deploy handle-access-request --project-ref wgdcfgknnentriqlajqe --no-verify-jwt
supabase functions deploy send-email --project-ref wgdcfgknnentriqlajqe --no-verify-jwt
supabase functions deploy approve-paid-user --project-ref wgdcfgknnentriqlajqe --no-verify-jwt
```
**CRITICAL:** Always use `--no-verify-jwt`. Always `git pull` first. Claude can deploy if `api.supabase.com` is in domain allowlist.

---

## 3. Next Priority: Paid Tier Build

### Architecture Decision (confirmed 2026-06-08)
**Separate experience, not baked into existing structure.**

Rationale: Users will get lost if paid content is mixed into the 38 cluster pages. The paid tier should be a distinct, guided experience with its own landing page, learning paths, and progression — while linking back to free tier theory as reference material.

**Structure:**
- New paid tier landing page (aligned to 10 pillars visual language)
- 13 role-based learning paths (7 Core, 3 Project, 3 Add-On)
- Each path: weekly modules with AI exercises, homework, templates, quizzes
- Links back to free tier cluster pages for theory foundations
- Full architecture in LEARNING_PATHS_MASTER.md

### Open Questions Requiring Julian Decision
See LEARNING_PATHS_MASTER.md Section 9 for full list. Top 5:
1. **Q1:** Confirm 13 paths lineup — add, remove, or rename?
2. **Q2:** Which 2 paths to build first? (Recommended: C3 New Team Lead + C1 New Associate)
3. **Q3:** Price point — $19 founding / $29 launch / $39 premium?
4. **Q9:** Linear-only or allow "pick your week"?
5. **Q10:** Certificate of completion?

### Build Sequence (proposed)
1. Julian reviews LEARNING_PATHS_MASTER.md, answers Q1-Q11
2. Design learning path page template (HTML)
3. Build first 2 paths (content + exercises + templates)
4. Add payment/gating (Stripe or manual approval)
5. Build paid tier landing page

---

## 4. Remaining Action List

### HIGH PRIORITY
1. **Paid tier architecture review** — Julian reviews LEARNING_PATHS_MASTER.md, confirms path lineup, pricing, first 2 paths
2. **Keyword highlighting on 38 cluster pages** — same treatment as guide (853 terms). Large task, full session.
3. **Landing page paid tier value prop** — needs compelling free-vs-paid comparison. Blocked on paid tier decisions.
4. **Edge function redeployment** — invite redirect fix (index.html → guide.html) needs deploying

### MEDIUM PRIORITY
5. **Deeper cluster treatment** — work examples, practical tips, PDF templates for performance-critical clusters
6. **Visual-first layout** across cluster pages
7. **Landing page design unification** to current brand system

### LOWER PRIORITY
8. YouTube production
9. Sidebar font fix (grey→white, mobile)
10. One people photo gap (solo early-career at laptop)

### OPEN SECURITY/OPS
- Namecheap mailbox password change + SMTP_PASS update in Supabase
- Supabase 2FA enable

---

## 5. Key Learnings & Principles

### Technical
- Supabase edge functions MUST deploy with `--no-verify-jwt` — anon key auth returns 401 without it
- Always `git pull` before `supabase functions deploy`
- Always grep exact alt text before SVG replacement scripts
- Always re-fetch SHA before GitHub PUT; stale SHAs cause 409
- Python urllib.request more reliable than curl for large file pushes
- Keyword highlighting: always verify no highlights leaked into SVGs, headings, or code blocks
- Invite emails must redirect to guide.html (not index.html) — index.html has no Supabase auth code

### Layout & Design Rules
- **No dead space.** Text sections must use available width (min 960px max-width). Add visuals or restructure to fill.
- Section breaker photos: 100% width, 200-220px height, object-fit:cover, filter:brightness(0.85), gradient overlay
- Topic numbering: "Topic 01 · Label" in teal 14px with 3px left border accent
- Keyword highlighting: gold `var(--yellow)` or `#e8b800`, first occurrence per chapter/section
- Three visual rhythm elements per cluster page: content (blue) > Take (gold) > Self-Check (sky blue)

### Product
- Paid tier = separate experience with own landing page, not mixed into free tier structure
- Julian's voice: punchy, practitioner-direct, un-textbook
- Self-Check tone: challenging but encouraging, scenario-based, no trivia
- Paid tier bridge: natural "next step" positioning, not "buy now"

### Working Style
- Single handover doc — older versions deleted, not accumulated
- Handover fully self-contained
- Speed-first with explicit handoffs when scope exceeds session

---

## 6. Commit History (2026-06-08 full session)

| # | SHA | Description |
|---|-----|-------------|
| 1 | 9ff3766 | Free tier signup notification to Julian via Resend |
| 2 | 662f6f2 | DEPLOY.md + HANDOVER with --no-verify-jwt docs |
| 3 | 89a9ef3 | Action list update |
| 4 | f4410a4 | Guide keyword highlighting — 296 terms |
| 5 | b35e545 | Guide people photos — 6 section breakers |
| 6 | 2d919c1 | Landing page pillar explanation + 156 cluster topic numbers |
| 7 | 496a00d | 8 generated images + landing page text width fix |
| 8 | c97ed40 | Handover rewrite |
| 9 | c027dc3 | Self-check questions — 109 across 36 guide chapters |
| 10 | ac4ba0f | Expand keyword highlighting — 853 total |
| 11 | 6024e21 | Fix ch15 LLM label + 7 new guide images (batch 2) |
| 12 | 2244a41 | Advanced RAG strategies — GraphRAG, Agentic RAG, Adaptive RAG |
| 13 | ae31c19 | Fix guide topbar line-breaking |
| 14 | 755408a | Handover update |
| 15 | 35e6e33 | Fix "See what's inside" link + invite redirect |
