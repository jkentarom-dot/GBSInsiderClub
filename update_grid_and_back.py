#!/usr/bin/env python3
"""
1. Regroup pillar tiles grid into 5-pack structure on knowledgebase.html
2. Add Back button to mobile bottom bar in mobile.js
"""
import sys

# ── 1. Regroup pillar tiles grid by pack ──
with open('knowledgebase.html', 'r') as f:
    html = f.read()

OLD_GRID_HEADER = """  <div class="section-eyebrow" style="margin-top:8px;">Quick access</div>
  <h3 class="sp-qa-head">All ten pillars and the AI Field Guide</h3>
  <div class="pillars-grid">
    <a href="pillar-1-gbs-fundamentals.html" class="pillar-tile">
      <div class="pillar-num">01</div>
      <img class="pillar-icon" src="icons/icon-gbs-fundamentals.png" alt="GBS Fundamentals icon" onerror="this.style.display='none'">
      <div class="pillar-name">GBS Fundamentals</div>
      <div class="pillar-topics">Understand how the center works, so you can perform instead of guessing.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">6 clusters · 16 topics</span></div>
    </a>
    <a href="pillar-2-operational-excellence.html" class="pillar-tile">
      <div class="pillar-num">02</div>
      <img class="pillar-icon" src="icons/icon-operational-excellence.png" alt="Operational Excellence icon" onerror="this.style.display='none'">
      <div class="pillar-name">Operational Excellence</div>
      <div class="pillar-topics">Run your daily work to standard and improve it — this is what you are paid for.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">5 clusters · 28 topics</span></div>
    </a>
    <a href="pillar-3-digital-technology.html" class="pillar-tile">
      <div class="pillar-num">03</div>
      <img class="pillar-icon" src="icons/icon-digital-technology.png" alt="Digital and Technology icon" onerror="this.style.display='none'">
      <div class="pillar-name">Digital and Technology</div>
      <div class="pillar-topics">Use the tools that handle repetitive work, so your time goes to higher-value tasks.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">4 clusters · 18 topics</span></div>
    </a>
    <a href="pillar-4-stakeholder-communication.html" class="pillar-tile">
      <div class="pillar-num">04</div>
      <img class="pillar-icon" src="icons/icon-stakeholder-comm.png" alt="Stakeholder Communication icon" onerror="this.style.display='none'">
      <div class="pillar-name">Stakeholder Communication</div>
      <div class="pillar-topics">Make your work visible and your message clear across regions and cultures.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters · 11 topics</span></div>
    </a>
    <a href="pillar-5-career-performance.html" class="pillar-tile">
      <div class="pillar-num">05</div>
      <img class="pillar-icon" src="icons/icon-career-performance.png" alt="Career and Performance icon" onerror="this.style.display='none'">
      <div class="pillar-name">Career and Performance</div>
      <div class="pillar-topics">Manage your own growth on purpose, because no one else will do it for you.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters · 13 topics</span></div>
    </a>
    <a href="pillar-6-total-rewards.html" class="pillar-tile">
      <div class="pillar-num">06</div>
      <img class="pillar-icon" src="icons/icon-total-rewards.png" alt="Total Rewards icon" onerror="this.style.display='none'">
      <div class="pillar-name">Total Rewards</div>
      <div class="pillar-topics">Understand your full pay and how to discuss it, so you are paid fairly.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters · 8 topics</span></div>
    </a>
    <a href="pillar-7-leadership-people.html" class="pillar-tile">
      <div class="pillar-num">07</div>
      <img class="pillar-icon" src="icons/icon-leadership-people.png" alt="Leadership and People icon" onerror="this.style.display='none'">
      <div class="pillar-name">Leadership and People</div>
      <div class="pillar-topics">Lead a team well when it is your turn — the hardest change many people make.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">4 clusters · 17 topics</span></div>
    </a>
    <a href="pillar-8-projects-transformation.html" class="pillar-tile">
      <div class="pillar-num">08</div>
      <img class="pillar-icon" src="icons/icon-projects-transformation.png" alt="Projects and Transformation icon" onerror="this.style.display='none'">
      <div class="pillar-name">Projects and Transformation</div>
      <div class="pillar-topics">Drive change, not only run the daily work. Project work builds a visible record of impact.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">5 clusters · 14 topics</span></div>
    </a>
    <a href="pillar-9-compliance-risk.html" class="pillar-tile">
      <div class="pillar-num">09</div>
      <img class="pillar-icon" src="icons/icon-compliance-risk.png" alt="Compliance and Risk icon" onerror="this.style.display='none'">
      <div class="pillar-name">Compliance and Risk</div>
      <div class="pillar-topics">Keep the operation safe. One control failure can damage a reputation built over years.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters · 12 topics</span></div>
    </a>
    <a href="pillar-10-gbs-transition.html" class="pillar-tile">
      <div class="pillar-num">10</div>
      <img class="pillar-icon" src="icons/icon-gbs-transitions.png" alt="GBS Transitions icon" onerror="this.style.display='none'">
      <div class="pillar-name">GBS Transitions</div>
      <div class="pillar-topics">Move work into the center and run it well — a strong proof point for a senior role.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters · 9 topics</span></div>
    </a>"""

NEW_GRID = """  <div class="section-eyebrow" style="margin-top:8px;">Quick access</div>
  <h3 class="sp-qa-head">All ten pillars, grouped by pack</h3>

  <div class="pk-grid-group">
    <div class="pk-grid-label"><a href="pack-1-start-here.html"><span class="pk-grid-num">1</span>Start Here</a></div>
    <div class="pillars-grid pillars-grid--pack">
      <a href="pillar-1-gbs-fundamentals.html" class="pillar-tile">
        <div class="pillar-num">01</div>
        <img class="pillar-icon" src="icons/icon-gbs-fundamentals.png" alt="GBS Fundamentals icon" onerror="this.style.display='none'">
        <div class="pillar-name">GBS Fundamentals</div>
        <div class="pillar-topics">Understand how the center works, so you can perform instead of guessing.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">6 clusters</span></div>
      </a>
    </div>
  </div>

  <div class="pk-grid-group">
    <div class="pk-grid-label"><a href="pack-2-deliver-and-improve.html"><span class="pk-grid-num">2</span>Deliver and Improve</a></div>
    <div class="pillars-grid pillars-grid--pack">
      <a href="pillar-2-operational-excellence.html" class="pillar-tile">
        <div class="pillar-num">02</div>
        <img class="pillar-icon" src="icons/icon-operational-excellence.png" alt="Operational Excellence icon" onerror="this.style.display='none'">
        <div class="pillar-name">Operational Excellence</div>
        <div class="pillar-topics">Run your daily work to standard and improve it.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">6 clusters</span></div>
      </a>
      <a href="pillar-3-digital-technology.html" class="pillar-tile">
        <div class="pillar-num">03</div>
        <img class="pillar-icon" src="icons/icon-digital-technology.png" alt="Digital and Technology icon" onerror="this.style.display='none'">
        <div class="pillar-name">Digital and Technology</div>
        <div class="pillar-topics">Use the tools that handle repetitive work.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">4 clusters</span></div>
      </a>
    </div>
  </div>

  <div class="pk-grid-group">
    <div class="pk-grid-label"><a href="pack-3-communicate-and-lead.html"><span class="pk-grid-num">3</span>Communicate and Lead</a></div>
    <div class="pillars-grid pillars-grid--pack">
      <a href="pillar-4-stakeholder-communication.html" class="pillar-tile">
        <div class="pillar-num">04</div>
        <img class="pillar-icon" src="icons/icon-stakeholder-comm.png" alt="Stakeholder Communication icon" onerror="this.style.display='none'">
        <div class="pillar-name">Stakeholder Communication</div>
        <div class="pillar-topics">Make your work visible and your message clear.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters</span></div>
      </a>
      <a href="pillar-7-leadership-people.html" class="pillar-tile">
        <div class="pillar-num">07</div>
        <img class="pillar-icon" src="icons/icon-leadership-people.png" alt="Leadership and People icon" onerror="this.style.display='none'">
        <div class="pillar-name">Leadership and People</div>
        <div class="pillar-topics">Lead a team well when it is your turn.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">4 clusters</span></div>
      </a>
    </div>
  </div>

  <div class="pk-grid-group">
    <div class="pk-grid-label"><a href="pack-4-get-ahead.html"><span class="pk-grid-num">4</span>Get Ahead</a></div>
    <div class="pillars-grid pillars-grid--pack">
      <a href="pillar-5-career-performance.html" class="pillar-tile">
        <div class="pillar-num">05</div>
        <img class="pillar-icon" src="icons/icon-career-performance.png" alt="Career and Performance icon" onerror="this.style.display='none'">
        <div class="pillar-name">Career and Performance</div>
        <div class="pillar-topics">Manage your own growth on purpose.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">5 clusters</span></div>
      </a>
      <a href="pillar-6-total-rewards.html" class="pillar-tile">
        <div class="pillar-num">06</div>
        <img class="pillar-icon" src="icons/icon-total-rewards.png" alt="Total Rewards icon" onerror="this.style.display='none'">
        <div class="pillar-name">Total Rewards</div>
        <div class="pillar-topics">Understand your full pay and how to discuss it.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters</span></div>
      </a>
    </div>
  </div>

  <div class="pk-grid-group">
    <div class="pk-grid-label"><a href="pack-5-drive-change.html"><span class="pk-grid-num">5</span>Drive Change</a></div>
    <div class="pillars-grid pillars-grid--pack">
      <a href="pillar-8-projects-transformation.html" class="pillar-tile">
        <div class="pillar-num">08</div>
        <img class="pillar-icon" src="icons/icon-projects-transformation.png" alt="Projects and Transformation icon" onerror="this.style.display='none'">
        <div class="pillar-name">Projects and Transformation</div>
        <div class="pillar-topics">Drive change, not only run the daily work.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">5 clusters</span></div>
      </a>
      <a href="pillar-9-compliance-risk.html" class="pillar-tile">
        <div class="pillar-num">09</div>
        <img class="pillar-icon" src="icons/icon-compliance-risk.png" alt="Compliance and Risk icon" onerror="this.style.display='none'">
        <div class="pillar-name">Compliance and Risk</div>
        <div class="pillar-topics">Keep the operation safe.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters</span></div>
      </a>
      <a href="pillar-10-gbs-transition.html" class="pillar-tile">
        <div class="pillar-num">10</div>
        <img class="pillar-icon" src="icons/icon-gbs-transitions.png" alt="GBS Transitions icon" onerror="this.style.display='none'">
        <div class="pillar-name">GBS Transitions</div>
        <div class="pillar-topics">Move work into the center and run it well.<br><span style="opacity:.55;font-size:.85em;letter-spacing:.02em;">3 clusters</span></div>
      </a>
    </div>
  </div>"""

if OLD_GRID_HEADER not in html:
    print("ERROR: pillar grid anchor not found")
    sys.exit(1)

html = html.replace(OLD_GRID_HEADER, NEW_GRID)
print("  Pillar grid regrouped by pack")

# Add CSS for pack grid groups
PACK_GRID_CSS = """  /* ═══ Pack-grouped pillar grid ═══ */
  .pk-grid-group { margin-bottom: 28px; }
  .pk-grid-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
    color: var(--text-3); margin-bottom: 10px;
    display: flex; align-items: center; gap: 8px;
  }
  .pk-grid-label a { color: inherit; text-decoration: none; display: flex; align-items: center; gap: 8px; }
  .pk-grid-label a:hover { color: var(--teal); }
  .pk-grid-num {
    display: inline-flex; align-items: center; justify-content: center;
    width: 20px; height: 20px; border-radius: 50%;
    border: 1.5px solid var(--teal); color: var(--teal);
    font-size: 10px; font-weight: 600;
  }
  .pk-grid-group:nth-child(4) .pk-grid-num,
  .pk-grid-group:nth-child(5) .pk-grid-num { border-color: var(--gold); color: var(--gold); }
  .pillars-grid--pack { margin-bottom: 0; }
  html[data-theme="light"] .pk-grid-num { background: #fff; }

"""

CSS_ANCHOR = '  /* ═══ Study Path'
if CSS_ANCHOR in html:
    html = html.replace(CSS_ANCHOR, PACK_GRID_CSS + CSS_ANCHOR)
    print("  Pack grid CSS inserted")

with open('knowledgebase.html', 'w') as f:
    f.write(html)


# ── 2. Add Back button to mobile bottom bar ──
with open('assets/mobile.js', 'r') as f:
    mjs = f.read()

# Add back icon and button
OLD_BAR = """    var icNav = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    bar.innerHTML =
      '<button class="gbs-bb-item cur" data-act="onpage">'+icContents+'Contents</button>' +
      (hasClusters ? '<button class="gbs-bb-item" data-act="clusters">'+icGrid+(/(cluster|pillar)/i.test(groupLabel())?'Clusters':'Sections')+'</button>' : '') +
      '<button class="gbs-bb-item" data-act="navigate">'+icNav+'Navigate</button>' +
      '<button class="gbs-bb-item" data-act="search">'+icSearch+'Search</button>' +
      '<button class="gbs-bb-item" data-act="top">'+icTop+'Top</button>';"""

NEW_BAR = """    var icNav = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    var icBack = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    bar.innerHTML =
      '<button class="gbs-bb-item" data-act="back">'+icBack+'Back</button>' +
      '<button class="gbs-bb-item cur" data-act="onpage">'+icContents+'Contents</button>' +
      (hasClusters ? '<button class="gbs-bb-item" data-act="clusters">'+icGrid+(/(cluster|pillar)/i.test(groupLabel())?'Clusters':'Sections')+'</button>' : '') +
      '<button class="gbs-bb-item" data-act="navigate">'+icNav+'Navigate</button>' +
      '<button class="gbs-bb-item" data-act="search">'+icSearch+'Search</button>' +
      '<button class="gbs-bb-item" data-act="top">'+icTop+'Top</button>';"""

if OLD_BAR not in mjs:
    print("ERROR: mobile.js bar anchor not found")
    sys.exit(1)

mjs = mjs.replace(OLD_BAR, NEW_BAR)

# Add back button handler
OLD_HANDLER = """        if (act === "top") { window.scrollTo({top:0, behavior:"smooth"}); return; }"""
NEW_HANDLER = """        if (act === "back") { history.back(); return; }
        if (act === "top") { window.scrollTo({top:0, behavior:"smooth"}); return; }"""

mjs = mjs.replace(OLD_HANDLER, NEW_HANDLER)

with open('assets/mobile.js', 'w') as f:
    f.write(mjs)
print("  Back button added to mobile bar")

# ── 3. Cache bust mobile.js to v=27 ──
import glob
for f in glob.glob('*.html'):
    with open(f, 'r') as fh:
        content = fh.read()
    if 'mobile.js?v=26' in content:
        content = content.replace('mobile.js?v=26', 'mobile.js?v=27')
        with open(f, 'w') as fh:
            fh.write(content)

# Also bump mobile.css if referenced with v=26
for f in glob.glob('*.html'):
    with open(f, 'r') as fh:
        content = fh.read()
    if 'mobile.css?v=26' in content:
        content = content.replace('mobile.css?v=26', 'mobile.css?v=27')
        with open(f, 'w') as fh:
            fh.write(content)

print("  Cache bust: v=26 -> v=27")

# Verify JS
import subprocess
r = subprocess.run(['node', '--check', 'assets/mobile.js'], capture_output=True, text=True)
if r.returncode != 0:
    print(f"  JS ERROR: {r.stderr}")
    sys.exit(1)
print("  mobile.js syntax OK")
print("DONE")
