#!/usr/bin/env python3
"""Add 5 pack pages to Door 4 in desktop sidebar and mobile Navigate sheet."""

import sys

PACK_SUBS = """        <a class="l2s-sub" href="knowledgebase.html#study-path"><span class="l2s-dot"></span>Study path</a>
        <a class="l2s-sub" href="pack-1-start-here.html"><span class="l2s-dot"></span>1 &middot; Start Here</a>
        <a class="l2s-sub" href="pack-2-deliver-and-improve.html"><span class="l2s-dot"></span>2 &middot; Deliver and Improve</a>
        <a class="l2s-sub" href="pack-3-communicate-and-lead.html"><span class="l2s-dot"></span>3 &middot; Communicate and Lead</a>
        <a class="l2s-sub" href="pack-4-get-ahead.html"><span class="l2s-dot"></span>4 &middot; Get Ahead</a>
        <a class="l2s-sub" href="pack-5-drive-change.html"><span class="l2s-dot"></span>5 &middot; Drive Change</a>
        <a class="l2s-sub" href="knowledgebase.html#inside"><span class="l2s-dot"></span>Ten pillars</a>"""

# ── 1. Update desktop sidebar on all 4 L2 pages ──
l2_pages = [
    'who-is-this-for.html',
    'where-are-you-now.html',
    'do-this-from-monday.html',
    'knowledgebase.html',
]

# These pages have two different versions of the Door 4 sub-items:
# - knowledgebase.html has "Study path" + "Ten pillars" (from earlier edit)
# - the other 3 have only "Ten pillars"

OLD_SUBS_KB = """        <a class="l2s-sub" href="#study-path"><span class="l2s-dot"></span>Study path</a>
        <a class="l2s-sub" href="#inside"><span class="l2s-dot"></span>Ten pillars</a>"""

OLD_SUBS_OTHER = """        <a class="l2s-sub" href="knowledgebase.html#inside"><span class="l2s-dot"></span>Ten pillars</a>"""

# For knowledgebase.html, use # anchors for study-path and inside
PACK_SUBS_KB = """        <a class="l2s-sub" href="#study-path"><span class="l2s-dot"></span>Study path</a>
        <a class="l2s-sub" href="pack-1-start-here.html"><span class="l2s-dot"></span>1 &middot; Start Here</a>
        <a class="l2s-sub" href="pack-2-deliver-and-improve.html"><span class="l2s-dot"></span>2 &middot; Deliver and Improve</a>
        <a class="l2s-sub" href="pack-3-communicate-and-lead.html"><span class="l2s-dot"></span>3 &middot; Communicate and Lead</a>
        <a class="l2s-sub" href="pack-4-get-ahead.html"><span class="l2s-dot"></span>4 &middot; Get Ahead</a>
        <a class="l2s-sub" href="pack-5-drive-change.html"><span class="l2s-dot"></span>5 &middot; Drive Change</a>
        <a class="l2s-sub" href="#inside"><span class="l2s-dot"></span>Ten pillars</a>"""

# Also need to increase max-height for the expanded subs (7 items instead of 2-3)
# Current: .l2s-group.l2s-open .l2s-subs { max-height: 140px; }
# Need: at least 7 * ~20px = 140px... actually let's check

for page in l2_pages:
    with open(page, 'r') as f:
        html = f.read()
    
    if page == 'knowledgebase.html':
        if OLD_SUBS_KB in html:
            html = html.replace(OLD_SUBS_KB, PACK_SUBS_KB)
            print(f"  {page}: updated (knowledgebase variant)")
        else:
            print(f"  {page}: WARNING - anchor not found")
    else:
        if OLD_SUBS_OTHER in html:
            html = html.replace(OLD_SUBS_OTHER, PACK_SUBS)
            print(f"  {page}: updated")
        else:
            print(f"  {page}: WARNING - anchor not found")
    
    # Increase max-height for l2s-subs to accommodate 7 items
    # 7 items * ~22px each = ~154px, round up to 200px
    if 'l2s-group.l2s-open .l2s-subs { max-height: 140px; }' in html:
        html = html.replace(
            'l2s-group.l2s-open .l2s-subs { max-height: 140px; }',
            'l2s-group.l2s-open .l2s-subs { max-height: 220px; }'
        )
        print(f"    max-height bumped to 220px")
    
    with open(page, 'w') as f:
        f.write(html)


# ── 2. Update mobile.js Navigate sheet ──
with open('assets/mobile.js', 'r') as f:
    mjs = f.read()

OLD_DOOR4 = """{href:"knowledgebase.html",label:"Your own learning path",ico:"4",subs:[
          {href:"knowledgebase.html#inside",label:"Ten pillars"}
        ]}"""

NEW_DOOR4 = """{href:"knowledgebase.html",label:"Your own learning path",ico:"4",subs:[
          {href:"knowledgebase.html#study-path",label:"Study path"},
          {href:"pack-1-start-here.html",label:"1 \\u00b7 Start Here"},
          {href:"pack-2-deliver-and-improve.html",label:"2 \\u00b7 Deliver and Improve"},
          {href:"pack-3-communicate-and-lead.html",label:"3 \\u00b7 Communicate and Lead"},
          {href:"pack-4-get-ahead.html",label:"4 \\u00b7 Get Ahead"},
          {href:"pack-5-drive-change.html",label:"5 \\u00b7 Drive Change"},
          {href:"knowledgebase.html#inside",label:"Ten pillars"}
        ]}"""

if OLD_DOOR4 in mjs:
    mjs = mjs.replace(OLD_DOOR4, NEW_DOOR4)
    print("  mobile.js: Door 4 updated")
else:
    print("  mobile.js: WARNING - anchor not found")
    sys.exit(1)

with open('assets/mobile.js', 'w') as f:
    f.write(mjs)


# ── 3. Verify JS syntax ──
import subprocess
r = subprocess.run(['node', '--check', 'assets/mobile.js'], capture_output=True, text=True)
if r.returncode == 0:
    print("  mobile.js: syntax OK")
else:
    print(f"  mobile.js: SYNTAX ERROR: {r.stderr}")
    sys.exit(1)

print("DONE")
