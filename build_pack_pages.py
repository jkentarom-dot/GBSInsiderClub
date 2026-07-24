#!/usr/bin/env python3
"""Generate 5 pack landing pages and update knowledgebase.html study path links."""

import html as html_mod

# ── Pack data ──
PACKS = [
    {
        'num': 1,
        'name': 'Start Here',
        'slug': 'pack-1-start-here',
        'accent': 'teal',
        'why': 'Before you improve anything, understand how GBS works. What a shared service center does, who it serves, and where you fit. Most new hires spend months figuring this out by accident. This pack gives you the structural picture so you can perform instead of guessing.',
        'pillars': [
            {
                'num': 1, 'name': 'GBS Fundamentals',
                'file': 'pillar-1-gbs-fundamentals.html',
                'desc': 'Understand how the center works, so you can perform instead of guessing.',
                'order_note': 'Start with Cluster 1 (Operating Models) and work through in order. Each cluster builds on the one before.',
                'clusters': [
                    ('1', 'GBS Operating Models', 'pillar-1-gbs-operating-models.html'),
                    ('2', 'Value Creation and Commercial Logic', 'pillar-1-cluster-2-value-creation.html'),
                    ('3', 'Organizational Structure', 'pillar-1-cluster-3-org-structure.html'),
                    ('4', 'Contracts and SLAs', 'pillar-1-cluster-4-contracts-sla.html'),
                    ('5', 'Performance Measurement', 'pillar-1-cluster-5-performance.html'),
                    ('6', 'Location Strategy', 'pillar-1-cluster-6-location-strategy.html'),
                ],
            },
        ],
    },
    {
        'num': 2,
        'name': 'Deliver and Improve',
        'slug': 'pack-2-deliver-and-improve',
        'accent': 'teal',
        'why': 'This is what you are paid for. Run your daily work to standard, then improve it. Pack 2 covers the methods and the technology that separate someone who handles tasks from someone who owns a process.',
        'pillars': [
            {
                'num': 2, 'name': 'Operational Excellence',
                'file': 'pillar-2-operational-excellence.html',
                'desc': 'Run your daily work to standard and improve it.',
                'order_note': 'Start with Process Knowledge, then Service Management. Continuous Improvement builds on both.',
                'clusters': [
                    ('1', 'Process Knowledge', 'pillar-2-cluster-1-process-knowledge.html'),
                    ('2', 'Service Management', 'pillar-2-cluster-2-service-management.html'),
                    ('3', 'Continuous Improvement', 'pillar-2-cluster-3-continuous-improvement.html'),
                    ('4', 'Operational Controls', 'pillar-2-cluster-4-operational-controls.html'),
                    ('5', 'Personal Productivity', 'pillar-2-cluster-5-personal-productivity.html'),
                    ('6', 'Skills and Self-Development', 'pillar-2-cluster-6-skills-development.html'),
                ],
            },
            {
                'num': 3, 'name': 'Digital and Technology',
                'file': 'pillar-3-digital-technology.html',
                'desc': 'Use the tools that handle repetitive work, so your time goes to higher-value tasks.',
                'order_note': 'Data and Analytics first (you need to read the data before you automate it), then the Enterprise Stack, then Automation and AI.',
                'bridge': 'Once you understand how to run and improve your processes, learn the technology that accelerates them.',
                'clusters': [
                    ('1', 'Data Strategy and Analytics', 'pillar-3-cluster-1-data-analytics.html'),
                    ('2', 'Enterprise Stack', 'pillar-3-cluster-2-enterprise-stack.html'),
                    ('3', 'Automation and AI', 'pillar-3-cluster-3-automation-ai.html'),
                    ('4', 'Tech Governance', 'pillar-3-cluster-4-tech-governance.html'),
                ],
            },
        ],
    },
    {
        'num': 3,
        'name': 'Communicate and Lead',
        'slug': 'pack-3-communicate-and-lead',
        'accent': 'teal',
        'why': 'Strong work is invisible if no one knows about it. This pack covers two things most GBS professionals underestimate: making your work visible across cultures and time zones, and leading a team when it is your turn.',
        'pillars': [
            {
                'num': 4, 'name': 'Stakeholder Communication',
                'file': 'pillar-4-stakeholder-communication.html',
                'desc': 'Make your work visible and your message clear across regions and cultures.',
                'order_note': 'Core Communication first (the foundation), then Relationship Management, then Negotiation.',
                'clusters': [
                    ('1', 'Core Communication', 'pillar-4-cluster-1-core-communication.html'),
                    ('2', 'Relationship Management', 'pillar-4-cluster-2-relationship-mgmt.html'),
                    ('3', 'Negotiation and Influence', 'pillar-4-cluster-3-negotiation-influence.html'),
                ],
            },
            {
                'num': 7, 'name': 'Leadership and People',
                'file': 'pillar-7-leadership-people.html',
                'desc': 'Lead a team well when it is your turn. The hardest transition many people make.',
                'bridge': 'Communication is the foundation. Leadership is what happens when you apply it to a team.',
                'order_note': 'New Manager first (if you are about to lead or just started). Then Team Operations for the daily rhythm, Performance Management for reviews, and Strategic Leadership when you are ready to think bigger.',
                'clusters': [
                    ('1', 'New Manager', 'pillar-7-cluster-1-new-manager.html'),
                    ('2', 'Team Operations', 'pillar-7-cluster-2-team-operations.html'),
                    ('3', 'Performance Management', 'pillar-7-cluster-3-performance-mgmt.html'),
                    ('4', 'Strategic Leadership', 'pillar-7-cluster-4-strategic-leadership.html'),
                ],
            },
        ],
    },
    {
        'num': 4,
        'name': 'Get Ahead',
        'slug': 'pack-4-get-ahead',
        'accent': 'gold',
        'why': 'Your career does not manage itself. This pack covers the two things that determine where you end up: how well you navigate performance reviews and promotions, and how well you understand your compensation.',
        'pillars': [
            {
                'num': 5, 'name': 'Career and Performance',
                'file': 'pillar-5-career-performance.html',
                'desc': 'Manage your own growth on purpose, because no one else will do it for you.',
                'order_note': 'Start with the Performance Loop (how reviews actually work), then Career Strategy, then Personal Branding. The two "Move" clusters are for when you are ready to act.',
                'clusters': [
                    ('1', 'Performance Loop', 'pillar-5-cluster-1-performance-loop.html'),
                    ('2', 'Career Strategy', 'pillar-5-cluster-2-career-strategy.html'),
                    ('3', 'Personal Branding', 'pillar-5-cluster-3-personal-branding.html'),
                    ('4', 'The External Move', 'pillar-5-cluster-4-external-move.html'),
                    ('5', 'The Internal Move', 'pillar-5-cluster-5-internal-move.html'),
                ],
            },
            {
                'num': 6, 'name': 'Total Rewards',
                'file': 'pillar-6-total-rewards.html',
                'desc': 'Understand your full pay and how to discuss it, so you are paid fairly.',
                'bridge': 'Understand how performance reviews work first. Then learn how compensation connects to them.',
                'order_note': 'Compensation Structure first (understand what you are actually paid), then Market Intelligence (know your worth), then Mobility and Tax (if relocation is on the table).',
                'clusters': [
                    ('1', 'Compensation Structure', 'pillar-6-cluster-1-compensation-structure.html'),
                    ('2', 'Market Intelligence', 'pillar-6-cluster-2-market-intelligence.html'),
                    ('3', 'Mobility and Tax', 'pillar-6-cluster-3-mobility-tax.html'),
                ],
            },
        ],
    },
    {
        'num': 5,
        'name': 'Drive Change',
        'slug': 'pack-5-drive-change',
        'accent': 'gold',
        'why': 'The strategic layer. Run projects, manage risk, and lead transitions. This is where team leads and managers operate, and where your career moves from execution to leadership.',
        'pillars': [
            {
                'num': 8, 'name': 'Projects and Transformation',
                'file': 'pillar-8-projects-transformation.html',
                'desc': 'Drive change, not only run the daily work. Project work builds a visible record of impact.',
                'order_note': 'PM Fundamentals first, then Execution Methodologies. SME Participation is useful at any stage if you are pulled onto a project.',
                'clusters': [
                    ('1', 'PM Fundamentals', 'pillar-8-cluster-1-pm-fundamentals.html'),
                    ('2', 'Execution Methodologies', 'pillar-8-cluster-2-execution-methods.html'),
                    ('3', 'Stakeholder and Value', 'pillar-8-cluster-3-stakeholder-value.html'),
                    ('4', 'Change Management', 'pillar-8-cluster-4-change-management.html'),
                    ('5', 'SME Participation', 'pillar-8-cluster-5-sme-participation.html'),
                ],
            },
            {
                'num': 9, 'name': 'Compliance and Risk',
                'file': 'pillar-9-compliance-risk.html',
                'desc': 'Keep the operation safe. One control failure can damage a reputation built over years.',
                'bridge': 'Projects are how change happens. Compliance keeps it safe.',
                'order_note': 'Risk Management first (the framework), then Regulatory and Internal Controls (the specifics), then Emerging Risk.',
                'clusters': [
                    ('1', 'Risk Management', 'pillar-9-cluster-1-risk-management.html'),
                    ('2', 'Regulatory and Internal Controls', 'pillar-9-cluster-2-regulatory-controls.html'),
                    ('3', 'Emerging Risk', 'pillar-9-cluster-3-emerging-risk.html'),
                ],
            },
            {
                'num': 10, 'name': 'GBS Transitions',
                'file': 'pillar-10-gbs-transition.html',
                'desc': 'Move work into the center and run it well. A strong proof point for a senior role.',
                'bridge': 'Transitions are the largest projects of all. This pillar applies everything from Pillars 8 and 9 at scale.',
                'order_note': 'Follow in order: Strategy, then KT Execution, then Stabilization. They are sequential phases of a real transition.',
                'clusters': [
                    ('1', 'Transition Strategy', 'pillar-10-cluster-1-transition-strategy.html'),
                    ('2', 'KT Execution', 'pillar-10-cluster-2-kt-execution.html'),
                    ('3', 'Stabilization', 'pillar-10-cluster-3-stabilization.html'),
                ],
            },
        ],
    },
]


def build_page(pack):
    """Generate the full HTML for a pack landing page."""
    pnum = pack['num']
    total_clusters = sum(len(p['clusters']) for p in pack['pillars'])
    total_pillars = len(pack['pillars'])
    accent = pack['accent']
    accent_color = '#1d6aff' if accent == 'teal' else '#e8b800'

    prev_pack = PACKS[pnum - 2] if pnum > 1 else None
    next_pack = PACKS[pnum] if pnum < 5 else None

    # Build pillar sections
    pillar_sections = []
    for i, pil in enumerate(pack['pillars']):
        bridge_html = ''
        if i > 0 and 'bridge' in pil:
            bridge_html = f'''
    <div class="pk-bridge">
      <svg width="1" height="32" style="display:block;margin:0 auto;"><line x1="0.5" y1="0" x2="0.5" y2="32" stroke="{accent_color}" stroke-width="1" opacity="0.25"/></svg>
      <div class="pk-bridge-text">{html_mod.escape(pil['bridge'])}</div>
      <svg width="1" height="16" style="display:block;margin:0 auto;"><line x1="0.5" y1="0" x2="0.5" y2="16" stroke="{accent_color}" stroke-width="1" opacity="0.25"/></svg>
    </div>'''

        cluster_cards = '\n'.join(
            f'          <a class="pk-cc" href="{href}">'
            f'<span class="pk-cc-num">{num}</span>'
            f'<span class="pk-cc-name">{html_mod.escape(name)}</span></a>'
            for num, name, href in pil['clusters']
        )

        pillar_sections.append(f'''{bridge_html}
    <div class="pk-pillar">
      <div class="pk-pillar-head">
        <span class="pk-pnum">Pillar {pil['num']:02d}</span>
        <h2 class="pk-pname"><a href="{pil['file']}">{html_mod.escape(pil['name'])}</a></h2>
        <p class="pk-pdesc">{html_mod.escape(pil['desc'])}</p>
      </div>
      <div class="pk-order">{html_mod.escape(pil['order_note'])}</div>
      <div class="pk-clusters">
        <div class="pk-cc-grid">
{cluster_cards}
        </div>
      </div>
      <a class="pk-pillar-link" href="{pil['file']}">Open full pillar page &#8594;</a>
    </div>''')

    pillar_html = '\n'.join(pillar_sections)

    # Build prev/next nav
    nav_items = []
    if prev_pack:
        nav_items.append(f'<a class="pk-nav-link" href="{prev_pack["slug"]}.html"><span class="pk-nav-dir">&#8592; Previous</span><span class="pk-nav-name">Pack {prev_pack["num"]}: {html_mod.escape(prev_pack["name"])}</span></a>')
    else:
        nav_items.append('<div></div>')
    if next_pack:
        nav_items.append(f'<a class="pk-nav-link pk-nav-next" href="{next_pack["slug"]}.html"><span class="pk-nav-dir">Next &#8594;</span><span class="pk-nav-name">Pack {next_pack["num"]}: {html_mod.escape(next_pack["name"])}</span></a>')
    else:
        nav_items.append(f'<a class="pk-nav-link pk-nav-next" href="knowledgebase.html#study-path"><span class="pk-nav-dir">Back &#8594;</span><span class="pk-nav-name">Study Path Overview</span></a>')

    nav_html = '\n      '.join(nav_items)

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Pack {pnum}: {pack['name']} — guided self-study path for GBS professionals. {total_pillars} pillar{'s' if total_pillars > 1 else ''}, {total_clusters} clusters.">
<link rel="canonical" href="https://gbsinsiderclub.com/{pack['slug']}.html">
<title>Pack {pnum}: {pack['name']} — GBS Insider Club</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  :root {{
    --void: #080b10; --surface: #0e1219; --surface-2: #141922; --surface-3: #1b2130;
    --border: #1e2535; --border-2: #252e40;
    --teal: #1d6aff; --teal-deep: #0050e6; --teal-soft: #5090ff; --teal-glow: rgba(29,106,255,0.14);
    --gold: #e8b800; --gold-soft: #f0cc30; --gold-bg: rgba(232,184,0,0.12);
    --text: #ffffff; --text-2: #c8d0de; --text-3: #8a95a6;
  }}
  *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
  html {{ scroll-behavior: smooth; }}
  body {{ font-family: 'Inter', sans-serif; font-weight: 300; background: var(--void); color: var(--text-2); font-size: 16px; line-height: 1.75; overflow-x: hidden; }}

  /* ── Topbar ── */
  .topbar {{ position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 56px; background: rgba(8,11,16,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 32px; }}
  .topbar-brand {{ display: flex; align-items: center; gap: 10px; text-decoration: none; margin-right: auto; }}
  .topbar-brand svg {{ width: 30px; height: 30px; }}
  .topbar-brand span {{ font-size: 13px; font-weight: 600; color: #fff; }}
  .topbar-nav {{ display: flex; align-items: center; gap: 20px; }}
  .topbar-nav a {{ color: var(--text-3); text-decoration: none; font-size: 13px; transition: color 0.2s; }}
  .topbar-nav a:hover {{ color: var(--teal); }}

  /* ── Page ── */
  .page {{ max-width: 820px; margin: 0 auto; padding: 80px 32px 64px; }}

  /* ── Breadcrumb ── */
  .breadcrumb {{ font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.08em; color: var(--text-3); margin-bottom: 28px; }}
  .breadcrumb a {{ color: var(--text-3); text-decoration: none; }}
  .breadcrumb a:hover {{ color: var(--teal); }}
  .breadcrumb .sep {{ margin: 0 8px; opacity: 0.4; }}

  /* ── Hero ── */
  .pk-hero {{ margin-bottom: 48px; }}
  .pk-eb {{ font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; color: {accent_color}; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; gap: 12px; }}
  .pk-eb::before {{ content: ''; width: 24px; height: 1px; background: {accent_color}; }}
  .pk-h1 {{ font-size: clamp(36px, 5vw, 52px); font-weight: 600; letter-spacing: -1.8px; line-height: 1.02; color: #fff; margin-bottom: 18px; }}
  .pk-lead {{ font-size: 17px; color: var(--text-2); line-height: 1.7; max-width: 700px; }}
  .pk-stats {{ display: flex; gap: 28px; margin-top: 22px; }}
  .pk-stat {{ font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: var(--text-3); }}
  .pk-stat b {{ color: {accent_color}; font-weight: 600; margin-right: 5px; }}

  /* ── Pillar section ── */
  .pk-pillar {{ background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 30px 32px; margin-bottom: 24px; }}
  .pk-pillar-head {{ margin-bottom: 18px; }}
  .pk-pnum {{ font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; color: {accent_color}; letter-spacing: 0.12em; text-transform: uppercase; }}
  .pk-pname {{ font-size: 24px; font-weight: 500; color: #fff; letter-spacing: -0.4px; margin: 6px 0 8px; }}
  .pk-pname a {{ color: inherit; text-decoration: none; }}
  .pk-pname a:hover {{ color: var(--teal); }}
  .pk-pdesc {{ font-size: 15px; color: var(--text-2); line-height: 1.6; }}
  .pk-order {{ font-size: 13px; color: var(--text-3); line-height: 1.55; margin-bottom: 18px; padding: 12px 16px; background: var(--surface-2); border-radius: 8px; border-left: 2px solid {accent_color}; }}
  .pk-cc-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px; }}
  .pk-cc {{ display: flex; align-items: center; gap: 10px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; text-decoration: none; transition: border-color 0.15s, background 0.15s; }}
  .pk-cc:hover {{ border-color: var(--teal); background: var(--surface-3); }}
  .pk-cc-num {{ font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; color: var(--gold); min-width: 16px; }}
  .pk-cc-name {{ font-size: 13px; color: var(--text); }}
  .pk-pillar-link {{ display: inline-block; margin-top: 16px; font-size: 13px; color: var(--teal); text-decoration: none; font-weight: 500; }}
  .pk-pillar-link:hover {{ text-decoration: underline; }}

  /* ── Bridge ── */
  .pk-bridge {{ text-align: center; margin: 8px 0; }}
  .pk-bridge-text {{ font-size: 14px; color: var(--text-3); font-style: italic; max-width: 500px; margin: 8px auto; line-height: 1.55; }}

  /* ── Bottom nav ── */
  .pk-nav {{ display: flex; justify-content: space-between; gap: 16px; margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border); }}
  .pk-nav-link {{ display: block; text-decoration: none; padding: 14px 18px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; transition: border-color 0.15s; min-width: 180px; }}
  .pk-nav-link:hover {{ border-color: var(--teal); }}
  .pk-nav-next {{ text-align: right; }}
  .pk-nav-dir {{ font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); display: block; margin-bottom: 4px; }}
  .pk-nav-name {{ font-size: 14px; color: var(--text); font-weight: 500; }}
  .pk-back {{ display: block; text-align: center; margin-top: 20px; font-size: 13px; color: var(--text-3); text-decoration: none; }}
  .pk-back:hover {{ color: var(--teal); }}

  /* ── Light mode ── */
  html[data-theme="light"] .pk-pillar {{ background: rgba(255,255,255,0.8); border-color: rgba(0,0,0,0.08); }}
  html[data-theme="light"] .pk-cc {{ background: rgba(255,255,255,0.85); border-color: rgba(0,0,0,0.1); }}
  html[data-theme="light"] .pk-cc:hover {{ background: #fff; border-color: var(--teal); }}
  html[data-theme="light"] .pk-order {{ background: rgba(255,255,255,0.6); }}
  html[data-theme="light"] .pk-nav-link {{ background: rgba(255,255,255,0.8); border-color: rgba(0,0,0,0.08); }}

  @media (max-width: 640px) {{
    .page {{ padding: 72px 20px 48px; }}
    .pk-pillar {{ padding: 22px 20px; }}
    .pk-cc-grid {{ grid-template-columns: 1fr; }}
    .pk-nav {{ flex-direction: column; }}
    .pk-nav-link {{ min-width: 0; }}
    .pk-nav-next {{ text-align: left; }}
    .pk-stats {{ flex-wrap: wrap; gap: 16px; }}
  }}
</style>
  <link rel="stylesheet" href="/assets/readability.css">
  <link rel="stylesheet" href="/assets/site.css">
  <link rel="stylesheet" href="/assets/mobile.css?v=26">
</head>
<body>
<nav class="topbar">
  <a href="index.html" class="topbar-brand">
    <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="34" height="34" rx="6" fill="#0e1219"/><path d="M7 6 L3.5 6 L3.5 28 L7 28" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 6 L30.5 6 L30.5 28 L27 28" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="8,9 26,17 8,25 13,17" fill="#e8b800"/><polygon points="13,15 22,17 13,21 16,17" fill="white"/></svg>
    <span>GBS Insider Club</span>
  </a>
  <div class="topbar-nav">
    <a href="knowledgebase.html#study-path">Study Path</a>
    <a href="knowledgebase.html#inside">All Pillars</a>
    <a href="guide.html">Field Guide</a>
  </div>
</nav>
<div class="page">
  <div class="breadcrumb"><a href="index.html">GBS Insider Club</a><span class="sep">/</span><a href="knowledgebase.html#study-path">Study Path</a><span class="sep">/</span><span style="color:{accent_color};">Pack {pnum}</span></div>

  <div class="pk-hero">
    <div class="pk-eb">Pack {pnum} of 5</div>
    <h1 class="pk-h1">{html_mod.escape(pack['name'])}</h1>
    <p class="pk-lead">{html_mod.escape(pack['why'])}</p>
    <div class="pk-stats">
      <div class="pk-stat"><b>{total_pillars}</b>pillar{'s' if total_pillars > 1 else ''}</div>
      <div class="pk-stat"><b>{total_clusters}</b>clusters</div>
    </div>
  </div>

{pillar_html}

  <div class="pk-nav">
      {nav_html}
  </div>
  <a class="pk-back" href="knowledgebase.html#study-path">&#8592; Back to study path overview</a>
</div>

<script defer src="/assets/site.js"></script>
<script src="/assets/mobile.js?v=26" defer></script>
</body>
</html>'''


# ── Generate all 5 pages ──
for pack in PACKS:
    fname = f"{pack['slug']}.html"
    content = build_page(pack)
    with open(fname, 'w') as f:
        f.write(content)
    print(f"  Created {fname}")


# ── Update knowledgebase.html: study path pills now link to pack pages ──
with open('knowledgebase.html', 'r') as f:
    kb = f.read()

# Update each step's pill links to point to the pack page instead of pillar pages
# Pack 1: single pill -> pack page
old_p1 = '''          <a class="sp-pill" href="pillar-1-gbs-fundamentals.html">
            <span class="sp-pill-num">01</span>
            <span class="sp-pill-name">GBS Fundamentals</span>
            <span class="sp-pill-desc">&#183; 6 clusters, 16 topics</span>
          </a>'''
new_p1 = '''          <a class="sp-pill" href="pack-1-start-here.html">
            <span class="sp-pill-num">01</span>
            <span class="sp-pill-name">GBS Fundamentals</span>
            <span class="sp-pill-desc">&#183; 6 clusters</span>
          </a>'''
kb = kb.replace(old_p1, new_p1)

# Pack 2
old_p2a = '''          <a class="sp-pill" href="pillar-2-operational-excellence.html">
            <span class="sp-pill-num">02</span>
            <span class="sp-pill-name">Operational Excellence</span>
            <span class="sp-pill-desc">&#183; 5 clusters, 28 topics</span>
          </a>
          <a class="sp-pill" href="pillar-3-digital-technology.html">
            <span class="sp-pill-num">03</span>
            <span class="sp-pill-name">Digital and Technology</span>
            <span class="sp-pill-desc">&#183; 4 clusters, 18 topics</span>
          </a>'''
new_p2a = '''          <a class="sp-pill" href="pack-2-deliver-and-improve.html">
            <span class="sp-pill-num">02</span>
            <span class="sp-pill-name">Operational Excellence</span>
            <span class="sp-pill-desc">&#183; 6 clusters</span>
          </a>
          <a class="sp-pill" href="pack-2-deliver-and-improve.html">
            <span class="sp-pill-num">03</span>
            <span class="sp-pill-name">Digital and Technology</span>
            <span class="sp-pill-desc">&#183; 4 clusters</span>
          </a>'''
kb = kb.replace(old_p2a, new_p2a)

# Pack 3
old_p3 = '''          <a class="sp-pill" href="pillar-4-stakeholder-communication.html">
            <span class="sp-pill-num">04</span>
            <span class="sp-pill-name">Stakeholder Communication</span>
            <span class="sp-pill-desc">&#183; 3 clusters, 11 topics</span>
          </a>
          <a class="sp-pill" href="pillar-7-leadership-people.html">
            <span class="sp-pill-num">07</span>
            <span class="sp-pill-name">Leadership and People</span>
            <span class="sp-pill-desc">&#183; 4 clusters, 17 topics</span>
          </a>'''
new_p3 = '''          <a class="sp-pill" href="pack-3-communicate-and-lead.html">
            <span class="sp-pill-num">04</span>
            <span class="sp-pill-name">Stakeholder Communication</span>
            <span class="sp-pill-desc">&#183; 3 clusters</span>
          </a>
          <a class="sp-pill" href="pack-3-communicate-and-lead.html">
            <span class="sp-pill-num">07</span>
            <span class="sp-pill-name">Leadership and People</span>
            <span class="sp-pill-desc">&#183; 4 clusters</span>
          </a>'''
kb = kb.replace(old_p3, new_p3)

# Pack 4
old_p4 = '''          <a class="sp-pill" href="pillar-5-career-performance.html">
            <span class="sp-pill-num">05</span>
            <span class="sp-pill-name">Career and Performance</span>
            <span class="sp-pill-desc">&#183; 3 clusters, 13 topics</span>
          </a>
          <a class="sp-pill" href="pillar-6-total-rewards.html">
            <span class="sp-pill-num">06</span>
            <span class="sp-pill-name">Total Rewards</span>
            <span class="sp-pill-desc">&#183; 3 clusters, 8 topics</span>
          </a>'''
new_p4 = '''          <a class="sp-pill" href="pack-4-get-ahead.html">
            <span class="sp-pill-num">05</span>
            <span class="sp-pill-name">Career and Performance</span>
            <span class="sp-pill-desc">&#183; 5 clusters</span>
          </a>
          <a class="sp-pill" href="pack-4-get-ahead.html">
            <span class="sp-pill-num">06</span>
            <span class="sp-pill-name">Total Rewards</span>
            <span class="sp-pill-desc">&#183; 3 clusters</span>
          </a>'''
kb = kb.replace(old_p4, new_p4)

# Pack 5
old_p5 = '''          <a class="sp-pill" href="pillar-8-projects-transformation.html">
            <span class="sp-pill-num">08</span>
            <span class="sp-pill-name">Projects and Transformation</span>
            <span class="sp-pill-desc">&#183; 5 clusters, 14 topics</span>
          </a>
          <a class="sp-pill" href="pillar-9-compliance-risk.html">
            <span class="sp-pill-num">09</span>
            <span class="sp-pill-name">Compliance and Risk</span>
            <span class="sp-pill-desc">&#183; 3 clusters, 12 topics</span>
          </a>
          <a class="sp-pill" href="pillar-10-gbs-transition.html">
            <span class="sp-pill-num">10</span>
            <span class="sp-pill-name">GBS Transitions</span>
            <span class="sp-pill-desc">&#183; 3 clusters, 9 topics</span>
          </a>'''
new_p5 = '''          <a class="sp-pill" href="pack-5-drive-change.html">
            <span class="sp-pill-num">08</span>
            <span class="sp-pill-name">Projects and Transformation</span>
            <span class="sp-pill-desc">&#183; 5 clusters</span>
          </a>
          <a class="sp-pill" href="pack-5-drive-change.html">
            <span class="sp-pill-num">09</span>
            <span class="sp-pill-name">Compliance and Risk</span>
            <span class="sp-pill-desc">&#183; 3 clusters</span>
          </a>
          <a class="sp-pill" href="pack-5-drive-change.html">
            <span class="sp-pill-num">10</span>
            <span class="sp-pill-name">GBS Transitions</span>
            <span class="sp-pill-desc">&#183; 3 clusters</span>
          </a>'''
kb = kb.replace(old_p5, new_p5)

with open('knowledgebase.html', 'w') as f:
    f.write(kb)

print("  Updated knowledgebase.html links")
print("DONE")
