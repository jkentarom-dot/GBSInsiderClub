#!/usr/bin/env python3
"""Insert mini SVG diagrams from the career arc into each pack step."""

import sys

# ── SVG mini-maps per pack ──
# Same visual language as the main career arc: rounded rects, JetBrains Mono,
# teal/sky/gold strokes, dark fills. Vertical layout, centered.

def make_svg(phase_label, phase_sub, pillars, stroke_color, label_fill):
    """Build a compact vertical SVG with a phase header + pillar boxes."""
    w = 280
    hdr_h = 50
    pill_h = 32
    gap_hdr = 10
    gap_pill = 6
    pad_top = 6
    
    total_h = pad_top + hdr_h + gap_hdr + len(pillars) * pill_h + (len(pillars) - 1) * gap_pill + 8
    
    lines = []
    lines.append(f'<svg viewBox="0 0 {w} {total_h}" xmlns="http://www.w3.org/2000/svg" '
                 f'class="sp-mini" style="display:block;max-width:{w}px;width:100%;height:auto;margin:0 0 14px;">')
    
    # Phase header box
    y = pad_top
    lines.append(f'  <rect x="0" y="{y}" width="{w}" height="{hdr_h}" rx="9" fill="#0f1a2e" stroke="{stroke_color}" stroke-width="1.5"/>')
    lines.append(f'  <text x="{w//2}" y="{y+20}" text-anchor="middle" fill="{label_fill}" '
                 f'font-family="JetBrains Mono,monospace" font-size="10.5" font-weight="600" letter-spacing="0.06em">{phase_label}</text>')
    lines.append(f'  <text x="{w//2}" y="{y+38}" text-anchor="middle" fill="#c2ccda" '
                 f'font-family="Inter,sans-serif" font-size="10.5">{phase_sub}</text>')
    
    # Pillar boxes
    y += hdr_h + gap_hdr
    for num, name in pillars:
        lines.append(f'  <rect x="14" y="{y}" width="{w-28}" height="{pill_h}" rx="6" fill="#141922" stroke="{stroke_color}" stroke-width="1"/>')
        lines.append(f'  <text x="28" y="{y+20}" fill="#e8b800" font-family="JetBrains Mono,monospace" font-size="10.5" font-weight="600">{num}</text>'
                     f'<text x="50" y="{y+20}" fill="#e3e8f0" font-family="Inter,sans-serif" font-size="12">{name}</text>')
        y += pill_h + gap_pill
    
    lines.append('</svg>')
    return '\n'.join(lines)


PACK_SVGS = [
    make_svg('UNDERSTAND THE PLACE', 'How does GBS actually work?',
             [('01', 'Fundamentals')],
             '#1d6aff', '#9fc0ff'),
    
    make_svg('DELIVER AND IMPROVE', 'How do I deliver and improve?',
             [('02', 'Operational Excellence'), ('03', 'Digital &amp; Technology')],
             '#1d6aff', '#9fc0ff'),
    
    make_svg('COMMUNICATE AND LEAD', 'How do I get heard and lead?',
             [('04', 'Stakeholder &amp; Comms'), ('07', 'Leadership &amp; People')],
             '#38bdf8', '#7dd3fc'),
    
    make_svg('GET AHEAD', 'How do I grow and get paid fairly?',
             [('05', 'Career &amp; Performance'), ('06', 'Total Rewards')],
             '#38bdf8', '#7dd3fc'),
    
    make_svg('DRIVE CHANGE', 'How do I lead transformation?',
             [('08', 'Projects &amp; Transformation'), ('09', 'Compliance &amp; Risk'), ('10', 'GBS Transitions')],
             '#e8b800', '#e8b800'),
]

# ── Insert SVGs into knowledgebase.html ──
with open('knowledgebase.html', 'r') as f:
    html = f.read()

# Each pack step has: <div class="sp-dot">N</div>\n        <div class="sp-name">...
# Insert the SVG between the dot and the name.
PACK_NAMES = ['Start Here', 'Deliver and Improve', 'Communicate and Lead', 'Get Ahead', 'Drive Change']

for i, (name, svg) in enumerate(zip(PACK_NAMES, PACK_SVGS)):
    old = f'        <div class="sp-dot">{i+1}</div>\n        <div class="sp-name">{name}</div>'
    new = f'        <div class="sp-dot">{i+1}</div>\n        {svg}\n        <div class="sp-name">{name}</div>'
    
    if old in html:
        html = html.replace(old, new)
        print(f"  Pack {i+1} ({name}): SVG inserted")
    else:
        print(f"  Pack {i+1} ({name}): WARNING - anchor not found")
        sys.exit(1)

with open('knowledgebase.html', 'w') as f:
    f.write(html)

print("DONE")
