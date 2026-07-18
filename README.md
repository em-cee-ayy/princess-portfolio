# The Most Nostalgic Portfolio 

Hola! This is the source for my Windows-XP-inspired desktop portfolio. I'm Mariah Anderson - Sr. Product Engineer at SOCi, AI Enablement & Governance Lead, Psych Graduate turned Engineer, currently building toward AI Product Leadership.

The whole site runs on one idea: **technology should work WITH the human brain, not against it.** Every project on the desktop is that idea at a different layer - 1 loop (sense → classify → adapt → learn), 4 layers: interface, environment, design system, governance.

Also it looks like Windows XP, because the early internet raised me, and I miss when computers were fun.

## What's on the desktop

- **work.explorer** 💼 - The 4 case studies (BrainMode, Happy Trails AI, ABRC, The Phantom PRD), tabbed like it's 2003
- **governance.msc** 🛡️ - The AI governance side of my work: SOCi Sage (an internal RAG assistant governed from day one), the company-wide AI enablement program, and an applied healthtech governance framework - risk tables and all. yes, the `.msc` extension is a management-console joke. No, I will not apologize
- **System Map** 🗺️ - A window that maps how everything here connects
- **SOCi Highlights** 🚀 - What I've built inside SOCi beyond the job description: Claude training webinars run with our VPs + CTO, the ISO 42001-aligned LMS, the recognition that followed
- **AIM (chat with me)** 🏃 - A real AOL-style buddy list. Double-click me to open an IM with mariahtheoptimist (it's Claude under the hood, it knows my resume and projects, and it can deep-link you to any window on the desktop). Sign-on chime included, obviously
- **Brain Lab** 🧠 - 2 live Claude tools you can actually use:
  - 🪞 cognitive load scorer - paste anything and get a brain rot vs. brain growth score
  - 🧭 brain state check-in - 90 seconds of sliders → Claude routes you to 1 of 6 cognitive states (the same classifier that powers BrainMode)
- **what's.new** 📓 - A low-stakes scrapbook of travel, projects, and life lately
- **Spill the Beans** 🫘 - Trivia about me. Get a low score and it will gently roast you
- **Resume** 📄 - The full resume in-window, plus a Download PDF button
- **Contact** 📧 - Email, LinkedIn, GitHub, Substack, TikTok

Plus the little things that make it feel like a real desktop: draggable + maximizable windows, a working taskbar with a clock, a start menu, and a Friendly Tip popup that behaves exactly like you remember.

## Quick Start

```bash
# 1. install
npm install

# 2. add your Anthropic key (powers Brain Lab + AIM chat)
cp .env.local.example .env.local
# paste your key from https://console.anthropic.com/

# 3. run
npm run dev
```

open [http://localhost:3000](http://localhost:3000) - the desktop boots with the Welcome window and the Friendly Tip.

### env vars

| key | required? | notes |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | for Brain Lab + AIM chat | both fall back to a friendly error if it's missing - everything else works without it |
| `UPSTASH_REDIS_REST_URL` | in production | rate limiting for the Claude routes (10/min + 40/day per IP, 500/day sitewide). skipped with a console warning when missing - local dev needs zero setup |
| `UPSTASH_REDIS_REST_TOKEN` | in production | pairs with the URL above - both from the REST API section of a free [Upstash](https://console.upstash.com/) Redis DB |

## File Map

```text
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # mounts <Desktop />
│   ├── globals.css               # all the XP chrome + design tokens
│   └── api/
│       ├── aim-chat/route.ts         # Claude → AIM-style Q&A about me
│       ├── classify-state/route.ts   # Claude → the 6-state BrainMode classifier
│       └── cognitive-load/route.ts   # Claude → ABRC brain rot / growth scorer
├── components/
│   ├── Desktop.tsx               # the desktop orchestrator
│   ├── Window.tsx                # draggable, maximizable XP window
│   ├── SystemLoopStrip.tsx       # the sense → classify → adapt → learn strip
│   ├── DesktopIcon.tsx
│   ├── Taskbar.tsx
│   ├── StartMenu.tsx
│   ├── FriendlyTip.tsx
│   ├── WindowsLogo.tsx           # the 4-color Windows flag (Start button)
│   └── windows/
│       ├── Welcome.tsx
│       ├── WorkExplorer.tsx      # the 4 case studies, tabbed
│       ├── GovernanceFramework.tsx  # governance.msc - sage, enablement, healthtech framework
│       ├── SystemMapWindow.tsx   # how everything connects
│       ├── SOCiHighlights.tsx
│       ├── BrainLab.tsx          # both live Claude tools
│       ├── AIMBuddyList.tsx
│       ├── AIMChat.tsx
│       ├── WhatsNew.tsx
│       ├── HappyTrails.tsx       # the live mockup suite, iframed from its own Vercel deploy
│       ├── SpillTheBeans.tsx
│       ├── Contact.tsx
│       └── Resume.tsx
├── lib/
│   ├── claude.ts                 # shared Anthropic client + strict-JSON helper (one client, three routes)
│   ├── ratelimit.ts              # Upstash rate limits + global daily budget guarding all 3 routes
│   ├── caseStudies.ts            # ← the 4 case studies live here (pure data)
│   ├── soci.ts                   # ← SOCi highlights
│   ├── aimContext.ts             # single source of truth for what the AIM chat knows
│   ├── trivia.ts                 # Spill the Beans questions
│   ├── updates.ts                # what's.new feed entries
│   └── aimSounds.ts              # programmatic AIM chimes
├── public/
│   ├── Mariah-Anderson-resume.pdf
│   └── updates/                  # photos for what's.new
├── tailwind.config.js            # ABRC + XP palettes live in theme.extend.colors
├── next.config.js
├── package.json
├── tsconfig.json
├── postcss.config.js
└── .env.local.example            # copy to .env.local, then add your ANTHROPIC_API_KEY
```

## Customizing (mostly notes to future me)

### content lives in `lib/`, not in JSX

- `lib/caseStudies.ts` - pitch / problem / insight / decisions / stack / status for each of the 4 pieces
- `lib/soci.ts` - the SOCi highlight cards
- `lib/aimContext.ts` - everything the AIM chat knows. it auto-imports from `caseStudies.ts` and `soci.ts` plus a static resume string - when the resume changes, update the string here too, or the chatbot starts telling people old stories
- `lib/trivia.ts` - swap questions freely; scoring + verdicts adapt
- `lib/updates.ts` - what's.new entries. drop photos in `/public/updates/` and reference like `/updates/your-pic.jpg` (external URLs work too)

### swapping the resume PDF

replace `/public/Mariah-Anderson-resume.pdf` with the latest export - the Download button auto-points at that path. keep the in-window resume, the PDF, and `aimContext.ts` saying the same thing. (three surfaces, one story. i learned this the hard way.)

### adding a new window

1. create `components/windows/MyThing.tsx`
2. add an `AppId` + `APP_META` entry + `renderApp` case in `Desktop.tsx`
3. optional: add it to `ICONS` and the `StartMenu.tsx` `APPS` list

### colors / vibes

XP chrome + Bliss background + design tokens are in `app/globals.css`; the ABRC and XP palettes are also in `tailwind.config.js` if i ever want to go full retro-cream.

## Deploy

```bash
npm i -g vercel   # once
vercel            # from this directory
```

set `ANTHROPIC_API_KEY` in Vercel → Project → Settings → Environment Variables.

## Tech Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Anthropic SDK

## Why It's Built Like This

Honestly? Because a PDF portfolio can't prove anything about how you think, but this can:

1. **retro shell, serious content.** the XP desktop is nostalgia doing real work - delight lowers guardedness, and people explore more when they're having fun. the windows themselves hold full case studies with the same rigor as any strategy doc. memorable container, no compromise on substance.
2. **the structure is the argument.** the System Map window, the loop strip on every project, the shared `lib/claude.ts` behind all 3 API routes - the site doesn't just say i think in systems, it's assembled like one. if you view source, that's on purpose. hi. 👋
3. **AI as a working demo, not a sticker.** Brain Lab runs Claude in production, the AIM chat is a live agent with my actual context, and the governance window shows the guardrails i'd put around all of it. building AI products and governing them responsibly are the same skill - this repo tries to be evidence of both.
