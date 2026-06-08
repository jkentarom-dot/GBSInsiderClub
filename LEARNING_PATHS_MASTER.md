# GBS Insider Club — Learning Paths: Master Governance Document

**Created:** 2026-06-05
**Updated:** 2026-06-08
**Owner:** Julian (product decisions) + Claude (build execution)
**Status:** ARCHITECTURE CONFIRMED — paid tier will be a separate experience

---

## 0. Architecture Decision (confirmed 2026-06-08)

### Paid tier = separate experience, NOT baked into free tier structure

**Decision:** The paid tier learning paths will have their own landing page and navigation, distinct from the free tier 10-pillar structure. Paid content links back to free tier theory pages as reference material, but the experience is separate.

**Rationale (Julian):**
- If paid content is mixed into the 38 cluster pages, users will get lost
- Paid tier should feel like a new, guided experience — not hidden features inside existing pages
- The free tier already works well as a browseable knowledge base; the paid tier is a structured program with sequencing
- Users need a clear "this is what you get" moment when they upgrade

**Implementation direction:**
- New paid tier landing page — visually aligned to the 10 pillars brand language
- 13 role-based learning paths accessible from the paid landing page
- Each path has its own page with weekly modules, exercises, templates
- Each module links to relevant free tier cluster pages for theory context
- Free tier users see the paid landing page as a preview (locked content with descriptions visible)

**What this means for build:**
1. New HTML template for learning path pages (different from cluster page template)
2. New paid tier landing page (different from index.html)
3. Supabase tier gating extended to learning path pages
4. Template/tool files hosted as static downloads or Supabase storage
5. Free tier cluster pages remain unchanged — they serve as the theory layer

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Role Architecture](#2-role-architecture)
3. [Learning Path Definitions](#3-learning-path-definitions)
4. [Curriculum Mapping](#4-curriculum-mapping)
5. [AI Integration Framework](#5-ai-integration-framework)
6. [Assessment & Homework System](#6-assessment--homework-system)
7. [Persona Research](#7-persona-research)
8. [Build Tracker](#8-build-tracker)
9. [Open Questions](#9-open-questions)
10. [Interview Log](#10-interview-log)
11. [Research Log](#11-research-log)
12. [Decisions Log](#12-decisions-log)

---

## 1. Product Vision

### What this is

Role-based, sequenced learning programs for GBS professionals — not a content library you browse, but a guided path you follow. Each path tells you what to learn, in what order, for how long, with practical AI-powered exercises that produce real work deliverables.

### Why it matters (the pitch)

- SSON/Inixia charges $9,880 for GBS certification — corporate budget only
- Hackett offers tiered certification aligned to career stages — also enterprise-funded
- Zero affordable, practitioner-led, role-specific learning exists for individual GBS professionals
- GBS Insider Club fills the gap: $29-39/month, self-paced, AI-native, built by someone who lived it

### Free vs Paid distinction

| | Free Tier | Paid Tier |
|---|---|---|
| **Metaphor** | "Learn the game" | "Win the game" |
| **Content** | Theory: frameworks, models, vocabulary, concept diagrams | Everything free PLUS role-based learning paths |
| **Structure** | Browse by pillar (pick and choose) | Guided weekly path with sequencing |
| **Tools** | None | Templates, checklists, worksheets per role |
| **AI** | AI Field Guide (37 chapters, theoretical) | AI exercises every week — practical, role-specific |
| **Assessment** | None | Scenario quizzes, homework with rubrics, capstone |
| **Julian** | YouTube videos | Julian's Take blocks, live Q&A replays, capstone review |
| **Career** | Career map (roles overview) | First 90 Days playbooks, interview prep, negotiation scripts |

### Pricing (pending Julian confirmation)

- Target: $29/month or $249/year
- Founding member rate: $19/month locked
- Geography consideration: audience includes India, Philippines, Poland — price must be accessible

---

## 2. Role Architecture

### Career Map Roles (live on landing page)

| Tier | Role | Data-role (HTML) | Career Map Level |
|---|---|---|---|
| Entry | Associate / Analyst | `associate` | Entry |
| Entry+ | Senior Associate | `sr-associate` | Entry+ |
| Operational | Team Lead / Supervisor | `team-lead` | Operational |
| Operational | Process Analyst / SME | `process-analyst` | Operational |
| Lateral/Project | Project Coordinator | `project-coord` | Lateral - Project |
| Managerial | Manager / Senior Manager | `manager` | Managerial |
| Managerial | Process Manager / GPO | `gpo` | Managerial |
| Expert | Domain Expert / CoE Lead | `expert` | Expert Track |
| Strategic | Director / Senior Director | `director` | Strategic |
| Strategic | Head of GBS / VP | `head-gbs` | Strategic |

### Learning Paths (13 total)

Organized into 3 categories: Core Paths (career progression), Project Paths (lateral/specialist), Add-On Paths (growth opportunities).

#### A. Core Paths (7 paths — career ladder)

| # | Path | Target Person | Duration | Paid Tier |
|---|---|---|---|---|
| C1 | **New Associate** | First 90 days in GBS, first corporate job | 12 weeks | Yes |
| C2 | **Senior Associate** | 1-2 yrs exp, transitioning from task execution to process ownership | 8 weeks | Yes |
| C3 | **New Team Lead** | Just promoted to manage people for the first time | 8 weeks | Yes |
| C4 | **Experienced Team Lead** | 1-2 yrs as TL, ready for broader scope, strategic thinking, next promotion | 8 weeks | Yes |
| C5 | **GBS Manager** | Owns a function/large team, manages budgets, runs the operation as a business | 10 weeks | Yes |
| C6 | **Process Manager / GPO** | Owns E2E process globally, sets standards, drives transformation | 8 weeks | Yes |
| C7 | **Domain Expert / CoE Lead** | Deep specialist (Tax, Treasury, FPA, Compliance) building a center of excellence | 8 weeks | Yes |

#### B. Project Paths (3 paths — lateral/specialist)

| # | Path | Target Person | Duration | Paid Tier |
|---|---|---|---|---|
| P1 | **Project SME** | Pulled onto a project while keeping BAU, first exposure to project work | 6 weeks | Yes |
| P2 | **Project Lead I** | Owns smaller initiatives: Kaizen events, LSS Yellow/Green Belt projects, CI sprints | 8 weeks | Yes |
| P3 | **Project Lead II** | Owns complex projects: migrations, system implementations, large-scale transformations, Green/Black Belt | 10 weeks | Yes |

#### C. Add-On Paths (3 paths — growth opportunities)

These are roles people can propose to their managers as "additional responsibility" roles — career growth without a title change. The learning path includes a pitch template for the manager conversation.

| # | Path | Target Person | Duration | Paid Tier |
|---|---|---|---|---|
| A1 | **Training Coordinator** | Takes ownership of team/function training programs, onboarding, skill development | 6 weeks | Yes |
| A2 | **Controls & Audit Champion** | Becomes the go-to person for internal controls, audit prep, compliance readiness | 6 weeks | Yes |
| A3 | **Knowledge Management Lead** | Owns documentation standards, SOPs, process maps, knowledge transfer quality | 6 weeks | Yes |

### Why Add-On Paths are a differentiator

Most GBS professionals wait for a promotion. Add-on roles let them:
- Demonstrate leadership before getting the title
- Build a visible portfolio of impact
- Create their own role expansion (intrapreneurship)
- Have a concrete conversation with their manager (pitch template included)

Each add-on path includes:
- A "Pitch to Your Manager" template (email + 1-pager)
- A 90-day implementation plan for the add-on role
- Metrics to track and report on
- How to position the add-on role on LinkedIn and in performance reviews

---

## 3. Learning Path Definitions

### Path C1: New Associate (12 weeks)

**Tagline:** "Your first 90 days in GBS — everything your manager should teach you but probably won't."

**Who this is for:**
- Week 1-12 at a GBS/SSC
- First corporate job or first shared services role
- Overwhelmed by acronyms, systems, and unwritten rules
- Doesn't know what questions to ask

**What they want answered:**
- What is this organization and how does it work?
- What does success look like in my role?
- How do I not look stupid in meetings?
- How do I use all these tools (ServiceNow, SAP, Excel)?
- When is my first performance review and how do I prepare?
- How much should I be earning?
- What is the career path out of this role?

**What they don't know they need:**
- How to track wins from day 1 (the Brag Sheet concept)
- That their first improvement idea matters more than perfect execution
- How to use AI as a daily work tool, not just ChatGPT for fun
- That their manager's quality directly impacts their career trajectory
- How compensation works (variable pay, total package)
- That documentation skills are a career accelerator

**Weekly Structure:**

| Wk | Theme | Curriculum Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | What is this place? | GBS vs SS vs COE; Captive/BPO/Hybrid; Internal vs External Stakeholders | "Explain my org to me" — prompt AI, then critique using P1 theory | Draw your org structure. Mark what you don't understand. |
| 2 | How success is measured | GBS Scorecard (SLA/KPI/TAT/FTE); Cost Center vs Value Creator | Build a personal KPI tracker — AI suggests, you validate | List 5 KPIs that apply to your actual role |
| 3 | How work flows | Four-Eyes Principle; Ticketing (ServiceNow/Zendesk); Workflow tools | Have AI generate an SOP for one of your daily tasks. Fix the gaps. | Write one real SOP for your most common task |
| 4 | Tame the inbox | Email Mgmt & Zero Inbox; Time Blocking; Virtual Presence | Set up AI email triage — categorize and draft responses for 10 samples | Implement one productivity technique for 5 days. Log results. |
| 5 | Excel is your weapon | Essential Formulas (VLOOKUP/XLOOKUP/Pivot); Cloud Basics | AI-assisted data challenge: clean a provided messy dataset | Complete the data cleaning exercise with annotated formulas |
| 6 | Get noticed | Virtual Presence; Receiving Feedback; Setting SMART Goals | Use AI to write your first self-assessment. Then rewrite it yourself. | Draft 3 SMART goals for your next review period |
| 7 | Know the rules | Phishing Awareness; Four-Eyes Principle; Error Tracking basics | AI red team: generate 5 GBS-targeted phishing emails. Identify the tells. | Create a "controls checklist" for your daily work |
| 8 | Your first improvement idea | The 8 Wastes (Muda); Process Documentation (SOPs) | Identify one waste in your process. AI drafts improvement proposal. | Submit improvement proposal using provided template |
| 9 | Communicate like a pro | Working Across Time Zones; Async Work; Cultural Communication | AI rewrites the same message for 3 audiences (team, manager, client) | Write one real stakeholder update email using the principles |
| 10 | Money talk | Variable Pay & Bonus; Understanding Total Package | AI analyzes a sample compensation package. Draft questions for HR. | Complete the compensation comparison worksheet |
| 11 | Own your career | The Brag Sheet; LinkedIn Strategy; Personal Value Proposition | AI builds your career development plan. You edit based on reality. | Update your LinkedIn headline and summary using templates |
| 12 | Capstone | Integration exercise | Use AI to create a "State of My Role" 1-page briefing | Final deliverable: your personal GBS operating manual |

**Templates/Tools included:**
- Personal KPI tracker (xlsx)
- SOP template (docx)
- SMART goals worksheet (xlsx)
- Improvement proposal template (docx)
- Compensation comparison worksheet (xlsx)
- Career development plan (xlsx)
- LinkedIn profile optimizer checklist
- "State of My Role" 1-pager template

---

### Path C2: Senior Associate (8 weeks)

**Tagline:** "Stop doing tasks. Start owning processes."

**Who this is for:**
- 1-2 years in GBS, solid execution skills
- Handles exceptions, trains new joiners informally
- Ready for more but unsure what "more" looks like
- Might be eyeing Team Lead or Process Analyst roles

**What they want answered:**
- How do I get promoted? What's the gap between me and the next level?
- How do I stand out when everyone does the same work?
- Should I go deep (specialist) or broad (generalist)?
- How do I handle escalations without always going to my TL?
- How do I get onto project work?

**What they don't know they need:**
- Process documentation is a career differentiator, not busy work
- Knowledge management skills make you indispensable
- Managing up is a skill, not sucking up
- Their next role might not be Team Lead — Process Analyst or Project work could be faster
- AI skills will separate them from peers within 12 months

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | Own your process | Process Documentation (SOPs/DTPs); Knowledge Mgmt: Single Source of Truth | AI drafts SOP for your process. You audit it for accuracy. | Improve one real SOP in your team |
| 2 | See the whole picture | E2E Process Ownership; Service Catalog; Process Mapping tools | Map your E2E process — AI scaffolds, you complete | Deliver one process map to your team lead |
| 3 | Spot the waste | 8 Wastes; SIPOC Diagrams; CI Culture (Kaizen mindset) | Build a SIPOC for your process using AI | Identify 3 wastes in your current process, propose fixes |
| 4 | Level up with data | Power Query basics; Data Visualization; Essential Formulas (advanced) | Use AI to write a Power Query transformation for real data | Create one dashboard or report improvement |
| 5 | Automation mindset | RPA Overview; GenAI for GBS Tasks; No-Code Tools | Assess 3 tasks for automation suitability. AI helps score. | Build one no-code automation (Power Automate, Zapier, etc.) |
| 6 | Handle pressure | Escalation Handling; SLA Breaches; Audit Readiness | Have AI generate escalation playbook for your area | Document your personal escalation decision tree |
| 7 | Navigate people | Managing Up; Saying "No" Diplomatically; Async Communication | Draft 3 difficult messages with AI (push back, escalation, update) | Send one real stakeholder communication using principles |
| 8 | Plan your move | T-Shaped Skills; Internal Mobility; Career Paths (TL vs Analyst vs Projects) | AI maps your skills vs 3 target roles. Gap analysis. | Create your 12-month career plan with specific milestones |

**Templates/Tools included:**
- SOP audit checklist
- SIPOC template (xlsx)
- Process mapping guide (with tool recommendations)
- Automation suitability scorecard (xlsx)
- Escalation decision tree template
- Skills gap analysis matrix (xlsx)
- 12-month career plan template

---

### Path C3: New Team Lead (8 weeks)

**Tagline:** "Yesterday you were one of them. Today you're the boss. Here's what changes."

**Who this is for:**
- Just promoted or about to be promoted
- First time managing people
- Nervous about the peer-to-boss transition
- Doesn't know what "good management" looks like from the other side

**What they want answered:**
- How do I lead people who were my peers yesterday?
- What do I do in my first week, month, 90 days?
- How do I delegate without micromanaging?
- How do I handle someone who isn't performing?
- How do I run a team meeting that isn't a waste of time?
- How do I manage up to my own manager now?

**What they don't know they need:**
- The first 90 days define their leadership brand permanently
- Delegation is not about dumping tasks — it's about developing people
- They need to understand budgets and capacity even at TL level
- Psychological safety determines whether their team will flag problems early
- Calibration sessions can be politically navigated — or politically survived
- Their own career development doesn't stop because they got promoted

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | The transition | Peer-to-Boss; First 90 Days; Self-Awareness & EQ | Use AI to create your 90-day leadership plan. Template provided. | Write your "leadership introduction" message to your team |
| 2 | Delegation & capacity | Delegation; Resource Capacity Planning; Demand Forecasting | Build a team capacity model with AI. Scenario provided. | Map your team's current workload and identify one delegation opportunity |
| 3 | Hiring right | Behavioral Interviewing; DEI in Hiring; Onboarding & Ramp-up | AI generates behavioral interview questions. Score sample answers. | Create an onboarding checklist for your next new joiner |
| 4 | Hard conversations | Coaching vs Managing; SBI Feedback Model; PIP Process | AI role-play: deliver difficult feedback. Three scenarios. | Prepare and deliver one real feedback conversation this week |
| 5 | Team culture | Remote Culture Building; Psychological Safety; Visual Mgmt (Huddle) | Design your team's standup/huddle format. AI proposes, you adapt. | Run your first structured team huddle. Log what worked. |
| 6 | Quality ownership | Quality Mgmt; Error Tracking; Escalation Handling; Incident Mgmt | Build an escalation playbook using AI. Template provided. | Implement one quality tracking improvement |
| 7 | Cross-cultural communication | High-Context vs Low-Context; Conflict in Matrix Orgs; Change Comms | AI translates same message into high-context and low-context versions | Write one team communication using cultural awareness principles |
| 8 | Think bigger | Budgeting (Capex/Opex); Understanding P&L; Org Design basics | AI helps build a headcount business case. Worked example provided. | Draft a 1-page "State of My Team" brief for your manager |

**Templates/Tools included:**
- 90-day leadership plan template
- Team capacity model (xlsx)
- Behavioral interview question bank
- Onboarding checklist template
- SBI feedback preparation sheet
- Huddle board / standup format template
- Escalation playbook template
- Headcount business case template
- "State of My Team" 1-pager

---

### Path C4: Experienced Team Lead (8 weeks)

**Tagline:** "You can run a team. Now learn to run a function."

**Who this is for:**
- 1-3 years as Team Lead
- Stable team operations, solid reputation
- Wants the next promotion but doesn't know what managers actually do differently
- May be asked to take on broader scope (multiple teams, cross-functional work)

**What they want answered:**
- What's the gap between me and Manager?
- How do I go from managing one team to managing multiple?
- How do I get exposure to strategic work?
- How do I build a case for my own promotion?
- Should I move to projects or stay in operations?

**What they don't know they need:**
- Managers think in P&L, not just SLA
- Succession planning (removing yourself as SPOF) is required before promotion
- They need to understand service management (ITIL/XLAs), not just team management
- Calibration is a political skill, not just a fairness exercise
- Their reputation outside their team matters more than inside it
- Negotiation skills (with stakeholders, not salary) are a promotion accelerator

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | Service management lens | ITIL/COBIT Fundamentals; XLAs vs SLAs; CX Metrics | Draft an XLA proposal for your team's services using AI | Identify one SLA that should become an XLA |
| 2 | Process excellence | Value Stream Mapping; A3 Problem Solving; Root Cause Analysis | Run a VSM on one of your processes with AI assistance | Complete one A3 problem-solving exercise |
| 3 | Succession & resilience | Succession Planning; SPOF; Onboarding & Ramp-up (as designer) | AI helps identify SPOFs in your team. Build mitigation plan. | Document one critical process only one person knows |
| 4 | Advanced performance | Calibration Sessions; Coaching vs Managing; Performance Loop | AI coaches you through a mock calibration preparation | Prepare your actual calibration documentation |
| 5 | Financial literacy | Budgeting (Capex/Opex); P&L for Non-Finance; Cost-to-Serve | AI builds a sample function budget. You validate assumptions. | Understand your team's cost-to-serve. Ask your manager for numbers. |
| 6 | Stakeholder influence | Managing Difficult Stakeholders; Negotiation; Presenting to Leadership | AI helps draft a business case for a team initiative | Present one proposal to your manager using Minto Pyramid |
| 7 | Innovation & visibility | Innovation Mgmt (Hackathons/Idea Funnels); Personal Branding; LinkedIn | Design an innovation initiative for your team using AI | Update your LinkedIn to reflect leadership scope |
| 8 | Promotion readiness | Org Design basics; Career Strategy; From Ops to Projects pivot | AI assesses your promotion readiness against Manager competencies | Create your promotion case document |

**Templates/Tools included:**
- XLA template
- VSM template (current vs future state)
- A3 problem-solving template
- SPOF analysis matrix
- Calibration prep worksheet
- Function budget template (xlsx)
- Business case template
- Promotion readiness self-assessment
- Promotion case document template

---

### Path C5: GBS Manager (10 weeks)

**Tagline:** "You run the function. Now run it like a business."

**Who this is for:**
- Manages a function or large team (20-80 people)
- Owns budgets, headcount, stakeholder relationships
- Reports to Director/VP level
- Making strategic decisions about technology, location, operating model

**What they want answered:**
- How do I articulate the value of my function to leadership?
- How do I manage costs without cutting quality?
- How do I build a technology roadmap?
- How do I retain and develop my best people?
- How do I position myself for Director?

**What they don't know they need:**
- Data monetization is a real strategic play, not theoretical
- Location strategy and hub economics directly impact their P&L
- Process mining and hyperautomation are not IT topics — they're ops strategy
- Their org design (span of control, layering) signals their maturity to leadership
- BCP/risk management is their job now, not just Compliance's
- Their public visibility (thought leadership) impacts their career more than operations alone

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | GBS as a business | Hub Strategy; TCO vs Cost-to-Serve; Data Monetization | Build a location comparison model for 3 hubs using AI | Analyze your function's cost-to-serve |
| 2 | Service strategy | XLAs; Service Blueprinting; Design Thinking | Draft a service strategy (Where to Play, How to Win) with AI | Map your service catalog with value and cost data |
| 3 | Advanced CI | DMAIC full cycle; Validating Savings (Hard vs Soft); Innovation vs CI | Run a DMAIC simulation with AI as Black Belt advisor | Quantify one improvement initiative in hard savings |
| 4 | Technology strategy | Hyperautomation; Process Mining; Zero Trust; Ethical AI | Assess your function's automation maturity. Scorecard provided. | Build a 12-month technology roadmap |
| 5 | Financial management | Budgeting deep dive; P&L mastery; Salary Benchmarking across hubs | Build a full function budget using AI. Realistic scenario. | Review your actual budget vs the model. Identify gaps. |
| 6 | Talent strategy | Succession Planning; Org Design (Span/Layering); Global Mobility | Model 3 org design scenarios for your team using AI | Present one org design recommendation to your director |
| 7 | Risk ownership | BCP; Third/Fourth-Party Risk; ESG for GBS; Shadow IT | Run a BCP tabletop exercise with AI | Document your function's top 5 risks and mitigations |
| 8 | Executive communication | Executive Summaries; Minto Pyramid; Presenting to Leadership | AI coaches you through a board-level presentation. Iterative. | Deliver one executive summary using the templates |
| 9 | Career at scale | GBS to Corporate Exit; Thought Leadership; Public Speaking | AI builds a LinkedIn thought leadership plan | Publish one LinkedIn post about your area of expertise |
| 10 | Capstone | Full integration | Build a "State of My Function" strategic brief with AI | Final deliverable: your function's operating plan |

---

### Path C6: Process Manager / GPO (8 weeks)

**Tagline:** "Own the process globally. Not just in your hub."

**Who this is for:**
- Owns an E2E process across multiple locations/hubs
- Sets global standards, drives harmonization
- Works with multiple Team Leads/Managers across geographies
- Needs to balance standardization with local needs

**What they want answered:**
- How do I enforce standards without alienating local teams?
- How do I measure process health across hubs?
- How do I drive transformation when I don't have direct authority?
- How do I handle "but we do it differently here" pushback?

**What they don't know they need:**
- Service blueprinting is their most powerful tool
- Leading without authority is the core skill, not process knowledge
- Their role is inherently political — they need influence maps
- Process mining can replace subjective process assessments
- XLAs matter more than SLAs for their stakeholders
- They should be building a community of practice, not a command structure

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | E2E ownership | E2E Process Ownership; Service Blueprinting; Process Mapping tools | Map your global process with AI. Identify regional variants. | Document one "same process, different execution" gap |
| 2 | Global standards | KPI Design (Leading vs Lagging); Dashboarding for Executives; MDM | Build a global process dashboard template with AI | Define 5 globally consistent KPIs for your process |
| 3 | Driving change | Leading Without Authority; Cultural Resistance; Change Communication | Create an influence map for your process stakeholders using AI | Hold one alignment conversation with a resistant stakeholder |
| 4 | Continuous improvement at scale | VSM (global); DMAIC; Innovation Mgmt | Run a global VSM exercise with AI — identify hub-specific waste | Propose one global improvement initiative |
| 5 | Technology enablement | Process Mining; RPA; Hyperautomation | Use AI to build an automation roadmap for your process | Identify 3 automation candidates in your E2E process |
| 6 | Governance & controls | SoD; Audit Readiness; Quality Management | Design a process governance framework using AI | Document your process control matrix |
| 7 | Stakeholder management | Managing Difficult Stakeholders; Negotiation; Executive Summaries | Draft a steering committee update with AI | Present your process performance to leadership |
| 8 | Building the practice | Succession (for process); KT Model; Community of Practice design | Design a Community of Practice for your process area | Launch one CoP initiative (even a Teams/Slack channel) |

---

### Path C7: Domain Expert / CoE Lead (8 weeks)

**Tagline:** "Go deep. Build the center of excellence."

**Who this is for:**
- Tax, Treasury, FPA, Compliance, or other domain specialist
- May lead a small expert team or be a sole expert
- Valued for depth but needs breadth to build a CoE
- Often pulled between advisory work and operational delivery

**What they want answered:**
- How do I scale my expertise beyond myself?
- How do I build a business case for a formal CoE?
- How do I stay current in my domain while also managing?
- How do I get recognition beyond my hub?

**What they don't know they need:**
- A CoE is a business — it needs a service catalog, SLAs, and a value proposition
- Knowledge management is existential for domain experts (bus factor = 1)
- They need to teach, not just do — training design skills matter
- Their domain expertise has external market value they may not be capturing
- AI is coming for the routine parts of their work — they need to move up the value chain

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | CoE as a business | Service Catalog; Pricing Services; Value Creator mindset | Draft a CoE service catalog with AI | Define your CoE's top 5 services |
| 2 | Knowledge scaling | KM: Single Source of Truth; Process Documentation; KT Model | Build a knowledge base structure for your domain using AI | Document one critical process only you know |
| 3 | Training design | Onboarding design; Ramp-up planning; Skill development | Design a domain training program using AI | Create training materials for one core topic |
| 4 | Quality & controls | Domain-specific compliance; Audit readiness; SoD | Build a domain-specific control testing framework with AI | Complete one control self-assessment |
| 5 | Technology in your domain | Domain-specific automation; AI impact on your specialty | Assess AI's impact on your domain — what gets automated, what doesn't | Build a "future of my domain" brief |
| 6 | Stakeholder influence | Executive Summaries; Presenting; Thought Leadership | Draft a domain insight report for leadership using AI | Present one domain insight to your leadership team |
| 7 | Building the team | Hiring for expertise; Succession; GPO interface | Design an ideal CoE team structure using AI | Create a hiring brief for your next team member |
| 8 | External visibility | Personal Branding; LinkedIn; Public Speaking | Build a thought leadership plan for your domain | Publish one domain insight on LinkedIn |

---

### Path P1: Project SME (6 weeks)

**Tagline:** "You just got pulled onto a project. Here's how to survive — and shine."

**Who this is for:**
- Still does BAU full-time but assigned to a project part-time
- First exposure to project work (UAT, KT, requirements gathering)
- Doesn't understand project terminology or cadence
- Wants to do well but doesn't know the rules of the game

**What they want answered:**
- What does the project team actually expect from me?
- How do I balance BAU and project work without burning out?
- What is UAT and how do I do it properly?
- How do I raise issues without looking negative?
- Will this project experience help my career?

**What they don't know they need:**
- Their subject matter expertise is the most valuable asset on the project — they have leverage
- Documentation quality during KT directly determines post-go-live pain
- They can use project participation as a career pivot opportunity
- RAID logs exist and they should contribute to them
- They will be asked to sign off on things — they need to know what that means

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | Project basics | Project vs BAU; Project Lifecycle; Balancing BAU + Project | Use AI to draft your "project participation agreement" with your manager | Agree on protected time allocation with your TL |
| 2 | Requirements & KT | KT Model (4-Phase); Service Acceptance Criteria | Use AI to create a KT checklist for your process area | Document the critical knowledge for your handover |
| 3 | Testing | UAT Best Practices; Quality Management | Have AI generate test cases for your process. Validate and improve. | Create a UAT test script for one process |
| 4 | Communication | RAID Logs; Scope boundaries; Escalation within projects | AI helps you write your first RAID log entry and status update | Submit one project status update |
| 5 | Go-live survival | Hypercare; Baselining Performance; Error Tracking | Build a hypercare checklist for your area using AI | Prepare your area's go-live readiness assessment |
| 6 | Career leverage | From SME to Project Lead; Brag Sheet; Internal Mobility | Use AI to position your project experience for career advancement | Update your Brag Sheet and career plan with project contributions |

---

### Path P2: Project Lead I — CI & Small Projects (8 weeks)

**Tagline:** "Lead your first improvement project. Get the belt. Make the impact."

**Who this is for:**
- Running Kaizen events, small CI projects
- Pursuing or holding LSS Yellow Belt or Green Belt
- Manages a project team of 2-5 people part-time
- First taste of "leading without authority"

**What they want answered:**
- How do I scope a CI project so it actually delivers?
- How do I get people to participate when it's not "their job"?
- How do I present results that leadership cares about?
- How do I validate savings so Finance agrees?
- Is project work a career path or a side gig?

**What they don't know they need:**
- Scoping is where 80% of CI projects fail — too big or too vague
- Soft savings don't count on the P&L — they need to learn the difference
- Their project sponsor's engagement determines success, not their effort
- Structured problem-solving (A3, DMAIC) is more impressive than just "we fixed it"
- These projects are audition material for larger transformation roles

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | Scoping right | SIPOC; Scope Management; Project Charter basics | Build a project charter for a real CI initiative using AI | Get your charter reviewed and approved by your sponsor |
| 2 | Problem analysis | 8 Wastes; Root Cause (5 Whys, Fishbone); Data collection | Run a root cause analysis on your project problem with AI | Complete and document your root cause analysis |
| 3 | Solution design | A3 Problem Solving; DMAIC (Define-Measure-Analyze phases) | Have AI help design 3 solution options with pros/cons | Present solution options to your project team |
| 4 | Implementation | WBS; RACI for small teams; Change Communication | Build a WBS and RACI for your solution implementation | Execute one implementation milestone |
| 5 | Sustain & control | DMAIC (Improve-Control); Visual Management; Standard Work | Design control mechanisms with AI to prevent regression | Implement one sustainability measure |
| 6 | Savings validation | Hard vs Soft Savings; Benefits Realization basics | Use AI to build your savings validation documentation | Get Finance to validate your claimed savings |
| 7 | Storytelling | Dashboarding; Executive Summaries; Presenting Results | AI helps create your project closure presentation | Present project results to leadership |
| 8 | What's next | From CI to Complex Projects; Green to Black Belt path; Career positioning | Use AI to assess readiness for Project Lead II | Create your project portfolio and career next-steps plan |

---

### Path P3: Project Lead II — Complex Projects (10 weeks)

**Tagline:** "Migrations. System rollouts. Global transformations. You're leading them now."

**Who this is for:**
- Owns complex, multi-workstream projects (migrations, implementations, large transformations)
- Green Belt moving to Black Belt, or experienced project manager
- Manages project teams of 10-30 across locations
- Needs to manage sponsors, steering committees, and organizational politics

**What they want answered:**
- How do I manage a project with multiple workstreams and dependencies?
- How do I handle a steering committee that doesn't steer?
- How do I manage scope creep from powerful stakeholders?
- How do I land a migration without destroying service quality?
- How do I recover a project that's going off the rails?

**What they don't know they need:**
- Benefits realization tracking starts at project charter, not at go-live
- Governance (gate reviews, decision rights) prevents 90% of project derailment
- They need to manage their sponsor — the sponsor doesn't manage themselves
- SAFe and Agile have GBS-specific limitations they need to navigate
- Transition methodology (Lift & Shift vs Transform) determines the entire project trajectory
- Their project portfolio is their career currency for Manager/Director roles

**Weekly Structure:**

| Wk | Theme | Key Topics | AI Exercise | Homework |
|---|---|---|---|---|
| 1 | Complex scoping | Due Diligence & Scope Validation; Transition Governance; Gate Reviews | Use AI to design a governance framework for a complex project | Define your project's governance structure and gate criteria |
| 2 | Methodology selection | Lift & Shift vs Transform; Waterfall vs Agile; SAFe Basics | AI helps assess which methodology fits your project. Decision matrix. | Document your methodology choice with rationale |
| 3 | Planning at scale | WBS for large projects; RAID Logs; Dependency management | Build a comprehensive RAID log with AI for a multi-workstream project | Create your project's master plan |
| 4 | KT & migration | KT Model (4-Phase at scale); Service Acceptance Criteria; Cultural Resistance | Design a KT program for a multi-process migration using AI | Build your KT tracker and schedule |
| 5 | Stakeholder management | Managing Sponsors; Steering Committees; Leading Without Authority | AI role-play: handle a difficult steering committee meeting | Prepare and deliver one steering committee update |
| 6 | Change management | Change Communication at scale; Cultural Resistance; Influence Maps | Build a comprehensive change management plan using AI | Execute one change communication initiative |
| 7 | Go-live mastery | Hypercare at scale; Exit Criteria; Operational Resilience | Design a hypercare operating model using AI | Build your go-live readiness dashboard |
| 8 | Value tracking | Benefits Realization; ROI post-project; Savings validation at scale | Build a benefits realization tracker for your project using AI | Complete one benefits validation with Finance |
| 9 | Risk & recovery | BCP implications; Third/Fourth-Party Risk; Project recovery techniques | AI helps you build a project risk recovery playbook | Identify your project's top 3 risks and mitigation plans |
| 10 | Strategic positioning | From Projects to Management; Thought Leadership; Public Speaking | Use AI to build your project portfolio document | Create your "transformation portfolio" for career progression |

---

### Path A1: Training Coordinator (Add-On, 6 weeks)

**Tagline:** "Build the training program your team actually needs. Then own it."

**Pitch to Manager included:** "I'd like to take ownership of our team's training and onboarding programs. Here's what I'd deliver in 90 days..."

**Who this is for:**
- Anyone at Senior Associate level or above
- Informal trainer already (shows new joiners the ropes)
- Wants to formalize the role and build a program
- Looking for visibility and leadership experience without a title change

**What they want answered:**
- How do I design training that people actually remember?
- How do I measure if training is working?
- How do I get time allocated for training when everyone is busy?
- What tools should I use?

**What they don't know they need:**
- Adult learning principles (people learn by doing, not by watching)
- Training needs assessment before training design
- Kirkpatrick's 4 levels of evaluation
- AI can generate quizzes, scenarios, and practice exercises at scale
- A training calendar signals organizational maturity to leadership
- This role is a direct path to L&D, HR, or management

**Weekly Structure:**

| Wk | Theme | AI Exercise | Homework |
|---|---|---|---|
| 1 | Needs assessment | Use AI to build a training needs survey for your team | Deploy the survey and analyze results |
| 2 | Curriculum design | AI helps map skills to training topics. Build a training matrix. | Create your team's 6-month training plan |
| 3 | Content creation | Use AI to generate training materials for one topic (slides + quiz + exercises) | Deliver one training session |
| 4 | Onboarding redesign | AI builds an onboarding program from your process docs | Create the new joiner onboarding checklist and 30-60-90 plan |
| 5 | Measurement | Design training effectiveness metrics with AI (Kirkpatrick model) | Implement one measurement for a recent training |
| 6 | Pitch & sustain | AI drafts your "Training Program Proposal" for your manager | Present the proposal. Get formal recognition of the role. |

---

### Path A2: Controls & Audit Champion (Add-On, 6 weeks)

**Tagline:** "Be the person who makes audit season painless. Everyone will thank you."

**Pitch to Manager included:** "I'd like to own our team's controls documentation and audit readiness. Here's my 90-day plan..."

**Who this is for:**
- Anyone at Pro level or above
- Works in a regulated process area (Finance, Procurement, HR)
- Tired of scrambling during audit season
- Wants to build compliance as a skill set

**What they want answered:**
- What do auditors actually look for?
- How do I make my team "audit-ready" every day?
- What's the minimum documentation we need?
- How do I handle audit findings without panic?

**What they don't know they need:**
- SoD (Segregation of Duties) is testable and fixable before auditors find it
- "Audit-ready every day" is a culture, not a checklist
- SOX, GDPR, and AML have specific, learnable frameworks
- Controls testing can be partially automated
- This role is a direct path to Internal Audit, Compliance, or Risk Management

**Weekly Structure:**

| Wk | Theme | AI Exercise | Homework |
|---|---|---|---|
| 1 | Controls basics | AI generates a controls inventory for your process area | Document your team's existing controls |
| 2 | SoD & risk | Use AI to identify potential SoD conflicts in your process | Create a SoD matrix for your area |
| 3 | Audit preparation | AI builds an audit readiness checklist for your area | Run a self-assessment against the checklist |
| 4 | Compliance frameworks | AI explains SOX/GDPR/AML requirements for your specific process | Document which regulations apply to your area and how |
| 5 | Documentation standards | Use AI to create control documentation templates | Complete documentation for one critical control |
| 6 | Pitch & sustain | AI drafts your "Controls Champion Proposal" for management | Present the proposal. Establish regular controls review cadence. |

---

### Path A3: Knowledge Management Lead (Add-On, 6 weeks)

**Tagline:** "If it's not documented, it doesn't exist. Fix that."

**Pitch to Manager included:** "I'd like to own our team's knowledge management — SOPs, process maps, and documentation quality. Here's what I'd deliver..."

**Who this is for:**
- Anyone at Pro level or above
- Frustrated by outdated SOPs, tribal knowledge, and "ask Raj, he knows"
- Wants to build a system, not just fix documents
- Looking for a portfolio-building opportunity

**What they want answered:**
- Where do I start when everything is outdated?
- What's the right level of documentation?
- How do I get people to actually update documents?
- What tools work best?

**What they don't know they need:**
- Knowledge management is a career differentiator in GBS (most orgs are terrible at it)
- AI can do 80% of the heavy lifting (draft SOPs from process descriptions, maintain version control prompts)
- A knowledge base audit reveals more about process health than any KPI dashboard
- This role directly enables transitions, audits, and new joiner ramp-up
- KM leads often get pulled into transformation projects (because they understand the processes)

**Weekly Structure:**

| Wk | Theme | AI Exercise | Homework |
|---|---|---|---|
| 1 | Knowledge audit | AI helps inventory all existing documentation and identify gaps | Complete a knowledge base audit for your area |
| 2 | SOP standards | Use AI to create your SOP template and writing guidelines | Rewrite one SOP using the new standard |
| 3 | Process mapping | AI scaffolds process maps from your SOP descriptions | Create one complete E2E process map |
| 4 | Version control & governance | Design a documentation review cycle with AI | Implement a review schedule for your top 10 documents |
| 5 | AI-powered maintenance | Build AI prompts that generate and update SOPs from process descriptions | Demonstrate the AI workflow to your team |
| 6 | Pitch & sustain | AI drafts your "KM Lead Proposal" for management | Present the proposal. Launch the documentation governance model. |

---

## 4. Curriculum Mapping

### Topic Distribution by Level (from master curriculum)

| Level | Topics | Primary Paths |
|---|---|---|
| Rookie (21) | Entry-level fundamentals | C1, C2, P1 |
| Pro (49) | Individual contributor depth | C2, P1, P2, A1-A3 |
| Team Lead (33) | People management + operational breadth | C3, C4, P2 |
| Project Mgr (42) | Strategic + transformation | C5, C6, P3 |

### Topic-to-Path Cross-Reference

Note: Topics appear in multiple paths. A topic covered in Path C1 (theory) may reappear in Path P2 (applied in project context). This is intentional — spaced repetition with increasing complexity.

**STATUS:** Cross-reference matrix to be built after Julian confirms path lineup.

---

## 5. AI Integration Framework

### Core Principle

**AI as co-pilot, never autopilot.** Every exercise follows this loop:

```
AI DRAFTS --> Student VALIDATES --> Student EDITS --> Student REFLECTS
```

### Progressive AI Skill Development

| Stage | Weeks | AI Skill | Technique |
|---|---|---|---|
| Foundation | 1-3 | Clear prompting | Direct instructions with context ("Write an SOP for...") |
| Intermediate | 4-6 | Meta-prompting | Ask AI to write the prompt first ("What should I ask you to get a great SOP?") |
| Advanced | 7-8 | Chain-of-thought | Multi-step reasoning ("Analyze, then propose, then estimate") |
| Expert | 9-10 | AI as reviewer | Use AI to QC your own work ("What would a senior PM challenge here?") |
| Strategic | 11-12 | AI as advisor | Scenario modeling and decision support |

### Prompt Templates per Exercise

Every AI exercise ships with 3 prompt versions:
1. **Starter prompt** — decent, gets a usable output
2. **Pro prompt** — what an experienced user would write (more context, constraints, format)
3. **Meta prompt** — asks AI to design the prompt itself, then the student feeds it information

Example for a SIPOC exercise:
- **Starter:** "Create a SIPOC diagram for an accounts payable process in a shared services center."
- **Pro:** "You are a Lean Six Sigma Black Belt coaching a GBS team. Create a SIPOC for the P2P process from invoice receipt to payment execution. Include: 3 suppliers, 5 key inputs, 8 process steps, 5 outputs, 3 customers. Format as a table. Flag where handoff risks exist."
- **Meta:** "I need to create a SIPOC for my process area. Before I give you details, what 10 questions should you ask me to produce the most useful SIPOC possible?"

---

## 6. Assessment & Homework System

### Assessment Types

| Type | Format | Frequency | Effort | Scored? |
|---|---|---|---|---|
| Topic reading | Self-paced on site + concept diagram | 2x/week | 20-30 min each | Completion tracked |
| Mini-quiz | 5 scenario-based questions per topic | After each topic | 5-10 min | Auto-scored |
| AI Exercise | Practical deliverable using AI | 1x/week | 30-45 min | Self-assessed with rubric |
| Weekly homework | Real work deliverable | 1x/week | 60-90 min | Rubric + optional peer review |
| Capstone | Integration project | End of path | 3-4 hours | Julian review (premium) |

### Quiz Philosophy

NO trivia questions. Every question is a scenario.

Bad: "What does SLA stand for?"
Good: "Your team's SLA is at 94% against a 95% target for the third consecutive month. Your manager asks for a recovery plan by Friday. What's your first action?"

A) Pull the last 90 days of ticket data and identify the root cause pattern
B) Ask the team to work overtime this week to hit 95%
C) Propose lowering the SLA target to 93%
D) Escalate to your manager that the SLA is unrealistic

Answer: A — with explanation of why root cause analysis precedes action.

### AI-Powered Quiz Engine (stretch goal)

Build a React component that calls Claude API to generate unique scenario questions per topic. Benefits:
- Students can't memorize answers and share them
- Questions get harder based on path progression
- Immediate feedback with reasoning
- Low maintenance — content updates automatically

**STATUS:** Technical feasibility confirmed (Claude API in artifacts). Build after Phase 2.

---

## 7. Persona Research

### What each role owner expects, needs, and doesn't know

This section captures research findings, Julian's field experience, and interview insights. Updated continuously.

#### C1: New Associate

| Category | Detail |
|---|---|
| **Demographics** | 21-26 years old, first corporate job or first GBS job, likely in India/Philippines/Poland/LATAM |
| **Emotional state** | Overwhelmed, uncertain, wants to prove themselves, afraid of looking stupid |
| **What they Google** | "What is shared services" / "GBS analyst job description" / "how to survive first week at work" |
| **What they ask peers** | "Is this normal?" / "How do I use ServiceNow?" / "When is payday?" |
| **What they ask us** | "What should I learn first?" / "How do I get promoted?" / "Is my salary fair?" |
| **What they need but won't ask** | How to track achievements from day 1 / How compensation actually works / That their manager quality varies wildly / How to use AI as a daily work tool |
| **Success metric** | Feels competent by week 6, gets positive first review, has a career plan by week 12 |
| **Willingness to pay** | Low personally ($10-19/month), but may ask employer to sponsor |

#### C2: Senior Associate

| Category | Detail |
|---|---|
| **Demographics** | 23-28, 1-2 years in, competent at tasks, bored or frustrated |
| **Emotional state** | "I'm good at this but going nowhere" / Wants recognition, unsure how to get it |
| **What they Google** | "How to get promoted in shared services" / "GBS career path" / "process improvement certification" |
| **What they ask us** | "What skills do I need for the next level?" / "Should I do Six Sigma?" |
| **What they need but won't ask** | That documentation and KM skills are career accelerators / That managing up is a skill / That project work is a faster path than waiting for TL |
| **Success metric** | Clear career plan, visible improvement initiative, first project exposure |
| **Willingness to pay** | Moderate ($19-29/month) — invested in career but still early |

#### C3: New Team Lead

| Category | Detail |
|---|---|
| **Demographics** | 25-32, just promoted, nervous, still thinking like an individual contributor |
| **Emotional state** | Imposter syndrome, excited but scared, miss being "one of the team" |
| **What they Google** | "First time manager tips" / "How to lead former peers" / "How to delegate" |
| **What they ask us** | "How do I handle someone not performing?" / "What do I do in my first week?" |
| **What they need but won't ask** | That the first 90 days define their leadership brand / That calibration is political / That they need to understand budgets now / That psychological safety determines team output |
| **Success metric** | Smooth transition, first successful delegation, one hard conversation handled well |
| **Willingness to pay** | HIGH ($29-39/month) — emotional urgency, clear need, willing to invest |

#### C4: Experienced Team Lead

| Category | Detail |
|---|---|
| **Demographics** | 27-35, 1-3 years as TL, comfortable with team, wants more |
| **Emotional state** | Plateau — good at the job but not growing. Frustrated by lack of promotion clarity. |
| **What they Google** | "How to become a manager" / "Team lead vs manager difference" / "What managers do that team leads don't" |
| **What they ask us** | "What's the gap between me and Manager?" / "How do I get strategic exposure?" |
| **What they need but won't ask** | Managers think in P&L / Succession planning of themselves is required / Financial literacy separates them from peers / External visibility matters more than internal at this stage |
| **Success metric** | Clear promotion timeline, financial literacy, one strategic initiative |
| **Willingness to pay** | HIGH ($29-39/month) — promotion urgency |

#### C5: GBS Manager

| Category | Detail |
|---|---|
| **Demographics** | 30-40, manages 20-80 people, owns budgets, reports to Director/VP |
| **Emotional state** | Competent but isolated — fewer peers to learn from, higher stakes |
| **What they Google** | "GBS operating model best practices" / "How to present to C-suite" / "GBS cost optimization" |
| **What they ask us** | "How do I articulate value to leadership?" / "How do I build a technology roadmap?" |
| **What they need but won't ask** | Data monetization is real / Location economics are their responsibility / Org design signals maturity / BCP is their job now / Thought leadership impacts career more than operations |
| **Success metric** | Articulates function value, builds technology roadmap, positioned for Director |
| **Willingness to pay** | Moderate-High ($29-49/month) — has budget, values efficiency |

#### P1: Project SME

| Category | Detail |
|---|---|
| **Demographics** | Any level, suddenly assigned to a project on top of BAU |
| **Emotional state** | Confused, stressed about BAU impact, doesn't know project rules |
| **What they ask us** | "What do they expect from me?" / "How do I balance both?" |
| **What they need but won't ask** | Their SME knowledge is their leverage / Documentation quality during KT determines everything / This is a career pivot opportunity |
| **Willingness to pay** | Low-moderate — need is urgent but temporary |

#### P2: Project Lead I

| Category | Detail |
|---|---|
| **Demographics** | 24-30, running first CI projects, Yellow/Green Belt level |
| **Emotional state** | Excited about improvement work, uncertain about methodology rigor |
| **What they ask us** | "How do I scope this?" / "How do I present results?" / "How do I get people to participate?" |
| **What they need but won't ask** | Scoping is where 80% of projects fail / Soft savings don't count on P&L / Structured method (A3, DMAIC) impresses more than "we fixed it" / These projects are auditions for bigger roles |
| **Willingness to pay** | Moderate ($19-29/month) — career investment |

#### P3: Project Lead II

| Category | Detail |
|---|---|
| **Demographics** | 28-38, running migrations/implementations, Green/Black Belt |
| **Emotional state** | High pressure, high visibility, high stakes |
| **What they ask us** | "How do I manage scope creep from powerful stakeholders?" / "How do I recover a derailed project?" |
| **What they need but won't ask** | Benefits realization starts at charter / Governance prevents 90% of derailment / Sponsor management is their job / Project portfolio is career currency for Director roles |
| **Willingness to pay** | High ($29-49/month) — career-critical, high ROI on time invested |

#### A1-A3: Add-On Roles

| Category | Detail |
|---|---|
| **Demographics** | Senior Associate to Team Lead level, looking for differentiation |
| **Emotional state** | Ambitious, proactive, looking for a way to stand out without waiting |
| **What they ask us** | "How do I pitch this to my manager?" / "What should I deliver?" |
| **What they need but won't ask** | Add-on roles are the fastest path to leadership without a title change / The pitch template makes the ask easy / Metrics and reporting make the role visible / These are direct paths to specialized career tracks (L&D, Internal Audit, Process Excellence) |
| **Willingness to pay** | Moderate ($19-29/month) — investment in differentiation |

---

## 8. Build Tracker

### Phase 0: Architecture (current)

| Task | Owner | Status | Target |
|---|---|---|---|
| Define all learning paths | Claude proposes, Julian reviews | DRAFT COMPLETE | Jun 2026 |
| Confirm role lineup (13 paths) | Julian | PENDING REVIEW | -- |
| Confirm tier boundaries (free vs paid) | Julian | PENDING | -- |
| Confirm pricing ($29/month target) | Julian | PENDING | -- |
| Confirm first 2 paths to build | Julian | PENDING | -- |
| Design learning path page template (HTML) | Claude | NOT STARTED | -- |
| Design quiz format and AI exercise template | Claude | NOT STARTED | -- |

### Phase 1: First Path Build (target: 2-3 weeks after approval)

| Task | Owner | Status | Target |
|---|---|---|---|
| Julian records takes for Path [TBD] | Julian | NOT STARTED | -- |
| Claude builds AI exercises + prompts | Claude | NOT STARTED | -- |
| Claude drafts scenario quizzes | Claude | NOT STARTED | -- |
| Claude builds weekly homework + rubrics | Claude | NOT STARTED | -- |
| Claude builds learning path page (HTML) | Claude | NOT STARTED | -- |
| Julian reviews and edits | Julian | NOT STARTED | -- |
| Template/tool builds (xlsx/pptx/docx) | Claude builds, Julian reviews | NOT STARTED | -- |

### Phase 2: Second Path Build

| Task | Owner | Status | Target |
|---|---|---|---|
| All tasks TBD pending Phase 0 decisions | -- | NOT STARTED | -- |

### Phase 3: Remaining Paths

Sequencing TBD. Recommended priority order based on willingness-to-pay and emotional urgency:
1. C3 New Team Lead (highest urgency)
2. C1 New Associate (broadest appeal)
3. C4 Experienced Team Lead (promotion urgency)
4. P2 Project Lead I (career pivot)
5. C2 Senior Associate
6. P3 Project Lead II
7. C5 GBS Manager
8. A1-A3 Add-On Paths (quick builds, 6 weeks each)
9. C6 Process Manager / GPO
10. C7 Domain Expert / CoE Lead

### Phase 4: AI Quiz Engine

| Task | Owner | Status | Target |
|---|---|---|---|
| Technical design (React + Claude API) | Claude | NOT STARTED | -- |
| Prototype for one path | Claude | NOT STARTED | -- |
| Julian reviews quiz quality | Julian | NOT STARTED | -- |
| Deploy across all paths | Claude | NOT STARTED | -- |

---

## 9. Open Questions

### Product Questions (need Julian decision)

| # | Question | Options | Decision | Date |
|---|---|---|---|---|
| Q1 | Confirm 13 paths lineup — add, remove, or rename? | As proposed / Modify | PENDING | -- |
| Q2 | Which 2 paths to build first? | C3 + C1 recommended | PENDING | -- |
| Q3 | Price point? | $19 founding / $29 launch / $39 premium | PENDING | -- |
| Q4 | Julian's Take format? | Voice memos / Typed notes / Live interview | PENDING | -- |
| Q5 | Capstone review by Julian — scalable? | Yes for first 20 members / No, self-assess only | PENDING | -- |
| Q6 | Add-on role pitch templates — how detailed? | 1-page / Full proposal package | PENDING | -- |
| Q7 | Director/VP paths — in scope or out of scope? | Out for launch / Build later | PENDING | -- |
| Q8 | Community element (Discord/Slack) — launch or defer? | Defer to post-50 members / Include at launch | PENDING | -- |
| Q9 | Should paths be linear-only or allow "pick your week"? | Linear (recommended) / Flexible | PENDING | -- |
| Q10 | Certificate of completion? | Yes / No / Maybe later | PENDING | -- |
| Q11 | Do paths share templates or each gets unique? | Shared library / Path-specific only | PENDING | -- |

### Technical Questions

| # | Question | Status |
|---|---|---|
| T1 | Supabase tier gating — can we gate specific HTML sections by subscription status? | Assumed yes — needs verification |
| T2 | Progress tracking — cookie-based or Supabase user record? | Needs decision |
| T3 | AI quiz engine — Claude API in React artifact or server-side? | Needs design |
| T4 | Template downloads — hosted as static files or Supabase storage? | Needs decision |
| T5 | Learning path pages — new HTML template or extension of cluster page template? | Needs design |

### Research Questions

| # | Question | Status | Findings |
|---|---|---|---|
| R1 | What do SSON/Hackett certifications actually cover? | RESEARCHED | See Research Log |
| R2 | What price point works for India/Philippines/Poland audiences? | PARTIALLY RESEARCHED | $29/month is premium in India (~2400 INR). Consider PPP pricing. |
| R3 | What completion rates do self-paced programs see? | NOT RESEARCHED | -- |
| R4 | What quiz formats have highest engagement? | NOT RESEARCHED | -- |
| R5 | Are there GBS-specific template libraries that compete? | NOT RESEARCHED | -- |

---

## 10. Interview Log

Format: Date | Path | Interviewee/Source | Key Insights

| Date | Path | Source | Insights |
|---|---|---|---|
| -- | -- | -- | No interviews conducted yet. Julian's field experience is primary input. |

### Interview Templates (for Julian's Takes)

**Standard questions for each path (adapt per role):**

1. What did you get wrong when you first started in this role?
2. What's the one thing you wish someone had told you?
3. What separates the top 10% in this role from everyone else?
4. What's the most common mistake you see people make?
5. What's the fastest way to get promoted out of this role?
6. Give me a real example of [topic] going wrong — and what should have happened.
7. If you had 30 minutes with someone starting this role, what would you tell them?

---

## 11. Research Log

### Competitive Landscape (researched 2026-06-05)

**SSON/Inixia Professional GBS Certification**
- Price: $9,880 per person
- Format: 100% online, live instructor-led
- Curriculum: 5 areas (Foundations, Service Mgmt, Ops Mgmt, Transformation Mgmt, Leadership + Digital/AI new for 2026)
- Audience: Leaders and practitioners (corporate-funded)
- Community: 6,000+ certified practitioners globally
- Gap: No role-based paths, no AI exercises, no templates/tools, no career acceleration content

**Hackett Institute Certified GBS Professionals (CGBSP)**
- Price: Enterprise pricing (not published, estimated $3,000-8,000 per level)
- Format: Online, dynamic learning (self-paced + instructor)
- Curriculum: 3 tiers — Certificate (10 courses, entry-level), Diploma (managers), Advanced Diploma (leaders)
- Credential: CGBS designation + 18 CPE credits
- Gap: Enterprise-only, no individual access, no AI integration, no practical tools/templates

**GBS Insider Club Positioning:**
- Price: $29-39/month (accessible to individuals)
- Unique: Role-based paths, AI-native exercises, practical templates, career acceleration
- Audience: 0-8 yrs experience, individual-pay, global (India/Philippines/Poland/LATAM)
- No competition at this price point and format

### Membership Pricing Research (researched 2026-06-05)

- Professional development communities: $47-97/month typical
- Content-heavy niche communities: $29-49/month sweet spot
- Most common band: $25-50/month (average ~$48)
- Founding member pricing: $15-97/month range, typically 30-50% below target
- Retention: Hybrid models (courses + community + live) see 76% retention vs 62% single-format
- 200 engaged members outperform 2,000 passive ones

---

## 12. Decisions Log

| Date | Decision | Rationale | Decided By |
|---|---|---|---|
| 2026-06-08 | Paid tier = separate experience with own landing page and navigation | Users would get lost if paid content mixed into 38 cluster pages; paid tier is structured guided program, not browseable library | Julian |
| 2026-06-08 | Free tier cluster pages unchanged — serve as theory layer for paid paths | Avoids rework; paid paths link back to cluster pages for theory context | Julian + Claude |
| 2026-06-05 | 13 learning paths proposed (7 core + 3 project + 3 add-on) | Maps to career map roles + adds project track + add-on innovation | Julian + Claude |
| 2026-06-05 | AI exercises follow Draft-Validate-Edit-Reflect pattern | Builds domain expertise + AI fluency simultaneously | Claude (pending Julian) |
| 2026-06-05 | Add-on paths include "Pitch to Manager" templates | Differentiator — helps people create their own growth opportunities | Julian concept, Claude design |
| 2026-06-05 | Progressive AI skill development across path duration | Students shouldn't learn prompting separately — integrated into every exercise | Julian concept ("AI heavy from day 1") |

---

## Appendix: Time Commitment Summary

All paths assume a working professional with a full-time job.

| Path | Duration | Weekly Hours | Total Hours | Topics | Templates |
|---|---|---|---|---|---|
| C1 New Associate | 12 weeks | 3-4 hrs | ~42 hrs | ~20 | 8 |
| C2 Senior Associate | 8 weeks | 3-4 hrs | ~28 hrs | ~18 | 7 |
| C3 New Team Lead | 8 weeks | 3-4 hrs | ~28 hrs | ~20 | 9 |
| C4 Experienced TL | 8 weeks | 3-4 hrs | ~28 hrs | ~18 | 9 |
| C5 GBS Manager | 10 weeks | 4-5 hrs | ~45 hrs | ~25 | 10 |
| C6 Process Manager/GPO | 8 weeks | 3-4 hrs | ~28 hrs | ~18 | 8 |
| C7 Domain Expert/CoE | 8 weeks | 3-4 hrs | ~28 hrs | ~16 | 7 |
| P1 Project SME | 6 weeks | 2-3 hrs | ~15 hrs | ~12 | 5 |
| P2 Project Lead I | 8 weeks | 3-4 hrs | ~28 hrs | ~18 | 8 |
| P3 Project Lead II | 10 weeks | 4-5 hrs | ~45 hrs | ~22 | 10 |
| A1 Training Coordinator | 6 weeks | 2-3 hrs | ~15 hrs | ~10 | 6 |
| A2 Controls & Audit | 6 weeks | 2-3 hrs | ~15 hrs | ~10 | 6 |
| A3 Knowledge Mgmt | 6 weeks | 2-3 hrs | ~15 hrs | ~10 | 5 |
| **TOTAL** | | | **~380 hrs** | **~145+** | **~98** |
