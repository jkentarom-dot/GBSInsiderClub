#!/usr/bin/env python3
"""Add vertical Study Path walkthrough to knowledgebase.html.

Changes:
1. Insert CSS for the study path stream
2. Update sidebar Door 4 to have two sub-items (Study path + Ten pillars)
3. Insert the vertical study path HTML between the SVG diagram and the pillar grid
4. Add a "Quick access" header above the pillar grid
"""

import sys

with open('knowledgebase.html', 'r') as f:
    html = f.read()

# ── 1. Insert CSS before the rec section styles ──
CSS_ANCHOR = '  /* ═══ Recommendation / conclusion ═══ */'

STUDY_PATH_CSS = """  /* ═══ Study Path — vertical guided stream ═══ */
  #study-path { margin-top: 56px; }
  .sp-intro-text { font-size: 16px; color: var(--text-2); line-height: 1.7; max-width: 760px; margin-bottom: 36px; }
  .sp-stream {
    position: relative;
    max-width: 820px;
    padding-left: 44px;
    margin: 0 0 64px;
  }
  .sp-stream::before {
    content: '';
    position: absolute; left: 15px; top: 28px; bottom: 28px;
    width: 1px;
    background: linear-gradient(180deg, var(--teal) 0%, var(--gold) 100%);
    opacity: 0.3;
  }
  .sp-step {
    position: relative;
    margin-bottom: 20px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 26px 28px;
    transition: border-color 0.18s, transform 0.18s;
  }
  .sp-step:last-child { margin-bottom: 0; }
  .sp-step:hover { border-color: rgba(255,255,255,0.18); transform: translateX(3px); }
  .sp-dot {
    position: absolute; left: -36px; top: 26px;
    width: 22px; height: 22px; border-radius: 50%;
    background: var(--surface-2);
    border: 2px solid var(--teal);
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 600; color: var(--teal);
    z-index: 1;
  }
  .sp-step:nth-child(4) .sp-dot,
  .sp-step:nth-child(5) .sp-dot { border-color: var(--gold); color: var(--gold); }
  .sp-name {
    font-size: 20px; font-weight: 500; color: #fff;
    letter-spacing: -0.3px; line-height: 1.25;
    margin-bottom: 8px;
  }
  .sp-why {
    font-size: 15px; color: var(--text-2); line-height: 1.65;
    margin-bottom: 16px; max-width: 700px;
  }
  .sp-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .sp-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 9px 14px;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
  }
  .sp-pill:hover { border-color: var(--teal); background: var(--surface-3); }
  .sp-pill-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 600; color: var(--gold);
  }
  .sp-pill-name { font-size: 13px; color: var(--text); font-weight: 400; }
  .sp-pill-desc { font-size: 11px; color: var(--text-3); margin-left: 2px; }
  @media (max-width: 640px) {
    .sp-stream { padding-left: 34px; }
    .sp-stream::before { left: 11px; }
    .sp-dot { left: -28px; width: 18px; height: 18px; font-size: 8px; }
    .sp-step { padding: 22px 20px; }
    .sp-name { font-size: 18px; }
    .sp-pill-desc { display: none; }
  }
  html[data-theme="light"] .sp-step {
    background: rgba(255,255,255,0.72);
    border-color: rgba(0,0,0,0.08);
  }
  html[data-theme="light"] .sp-step:hover { border-color: rgba(0,0,0,0.18); }
  html[data-theme="light"] .sp-dot { background: #fff; }
  html[data-theme="light"] .sp-pill {
    background: rgba(255,255,255,0.85);
    border-color: rgba(0,0,0,0.1);
  }
  html[data-theme="light"] .sp-pill:hover {
    background: rgba(255,255,255,1);
    border-color: var(--teal);
  }
  html[data-theme="light"] .sp-stream::before { opacity: 0.25; }
  .sp-qa-head { font-size: 22px; font-weight: 400; color: var(--text-2); margin-bottom: 28px; letter-spacing: -0.3px; }

"""

if CSS_ANCHOR not in html:
    print("ERROR: CSS anchor not found"); sys.exit(1)

html = html.replace(CSS_ANCHOR, STUDY_PATH_CSS + CSS_ANCHOR)
print("  CSS inserted")


# ── 2. Update sidebar Door 4 sub-items ──
OLD_SIDEBAR = """      <div class="l2s-subs">
        <a class="l2s-sub" href="#inside"><span class="l2s-dot"></span>Ten pillars</a>
      </div>
    </div>
    <div class="l2s-divider"></div>"""

NEW_SIDEBAR = """      <div class="l2s-subs">
        <a class="l2s-sub" href="#study-path"><span class="l2s-dot"></span>Study path</a>
        <a class="l2s-sub" href="#inside"><span class="l2s-dot"></span>Ten pillars</a>
      </div>
    </div>
    <div class="l2s-divider"></div>"""

if OLD_SIDEBAR not in html:
    print("ERROR: Sidebar anchor not found"); sys.exit(1)

html = html.replace(OLD_SIDEBAR, NEW_SIDEBAR)
print("  Sidebar updated")


# ── 3. Insert study path HTML after the SVG caption, before pillar grid ──
SVG_CAPTION = """      <div style="font-family:'JetBrains Mono',monospace; font-size:11px; color:#8da2c0; text-transform:uppercase; letter-spacing:0.12em; text-align:center; margin-top:14px;">Each pillar tells you why it matters and what you will be able to do</div>
      </div>

  <div class="pillars-grid">"""

STUDY_PATH_HTML = """      <div style="font-family:'JetBrains Mono',monospace; font-size:11px; color:#8da2c0; text-transform:uppercase; letter-spacing:0.12em; text-align:center; margin-top:14px;">Each pillar tells you why it matters and what you will be able to do</div>
      </div>

  <div id="study-path">
    <div class="section-eyebrow">Your study path</div>
    <h2 class="section-h2" style="font-size:clamp(28px,3.4vw,40px);">Five packs. <span class="accent">One journey.</span></h2>
    <p class="sp-intro-text">The ten pillars follow a career arc. Start with understanding the machine, then learn to deliver, then grow yourself, and finally lead change. Follow the packs in order, or jump to where you are right now.</p>

    <div class="sp-stream">
      <div class="sp-step">
        <div class="sp-dot">1</div>
        <div class="sp-name">Start Here</div>
        <div class="sp-why">Before you improve anything, understand how GBS works. What a shared service center does, who it serves, and where you fit. Most new hires spend months figuring this out by accident.</div>
        <div class="sp-pills">
          <a class="sp-pill" href="pillar-1-gbs-fundamentals.html">
            <span class="sp-pill-num">01</span>
            <span class="sp-pill-name">GBS Fundamentals</span>
            <span class="sp-pill-desc">&#183; 6 clusters, 16 topics</span>
          </a>
        </div>
      </div>

      <div class="sp-step">
        <div class="sp-dot">2</div>
        <div class="sp-name">Deliver and Improve</div>
        <div class="sp-why">This is what you are paid for. Run your daily work to standard, then improve it. The methods and the technology that separate someone who handles tasks from someone who owns a process.</div>
        <div class="sp-pills">
          <a class="sp-pill" href="pillar-2-operational-excellence.html">
            <span class="sp-pill-num">02</span>
            <span class="sp-pill-name">Operational Excellence</span>
            <span class="sp-pill-desc">&#183; 5 clusters, 28 topics</span>
          </a>
          <a class="sp-pill" href="pillar-3-digital-technology.html">
            <span class="sp-pill-num">03</span>
            <span class="sp-pill-name">Digital and Technology</span>
            <span class="sp-pill-desc">&#183; 4 clusters, 18 topics</span>
          </a>
        </div>
      </div>

      <div class="sp-step">
        <div class="sp-dot">3</div>
        <div class="sp-name">Communicate and Lead</div>
        <div class="sp-why">Strong work is invisible if no one knows about it. Make your work visible, communicate across cultures and time zones, and lead a team when it is your turn.</div>
        <div class="sp-pills">
          <a class="sp-pill" href="pillar-4-stakeholder-communication.html">
            <span class="sp-pill-num">04</span>
            <span class="sp-pill-name">Stakeholder Communication</span>
            <span class="sp-pill-desc">&#183; 3 clusters, 11 topics</span>
          </a>
          <a class="sp-pill" href="pillar-7-leadership-people.html">
            <span class="sp-pill-num">07</span>
            <span class="sp-pill-name">Leadership and People</span>
            <span class="sp-pill-desc">&#183; 4 clusters, 17 topics</span>
          </a>
        </div>
      </div>

      <div class="sp-step">
        <div class="sp-dot">4</div>
        <div class="sp-name">Get Ahead</div>
        <div class="sp-why">Your career does not manage itself. Understand how performance reviews really work, how to track and present your achievements, and how to have the salary conversation.</div>
        <div class="sp-pills">
          <a class="sp-pill" href="pillar-5-career-performance.html">
            <span class="sp-pill-num">05</span>
            <span class="sp-pill-name">Career and Performance</span>
            <span class="sp-pill-desc">&#183; 3 clusters, 13 topics</span>
          </a>
          <a class="sp-pill" href="pillar-6-total-rewards.html">
            <span class="sp-pill-num">06</span>
            <span class="sp-pill-name">Total Rewards</span>
            <span class="sp-pill-desc">&#183; 3 clusters, 8 topics</span>
          </a>
        </div>
      </div>

      <div class="sp-step">
        <div class="sp-dot">5</div>
        <div class="sp-name">Drive Change</div>
        <div class="sp-why">The strategic layer. Run projects, manage risk, and lead transitions. This is where team leads and managers operate, and where your career moves from execution to leadership.</div>
        <div class="sp-pills">
          <a class="sp-pill" href="pillar-8-projects-transformation.html">
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
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="section-eyebrow" style="margin-top:8px;">Quick access</div>
  <h3 class="sp-qa-head">All ten pillars and the AI Field Guide</h3>
  <div class="pillars-grid">"""

if SVG_CAPTION not in html:
    print("ERROR: SVG caption anchor not found"); sys.exit(1)

html = html.replace(SVG_CAPTION, STUDY_PATH_HTML)
print("  Study path HTML inserted")


# ── Write ──
with open('knowledgebase.html', 'w') as f:
    f.write(html)

print("DONE — knowledgebase.html updated")
