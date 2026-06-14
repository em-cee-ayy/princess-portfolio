# princess.exe — a 100% vibe-coded portfolio

A Windows-XP-inspired desktop portfolio for Princess (Mariah) Anderson — Sr. Product Engineer at SOCi, building toward AI Technical Product Leadership.

Four portfolio pieces. Four roles. One thesis: **technology should work WITH the human brain, not against it.**

---

## what's in here

- **work.explorer** — the 4 case studies (BrainMode, Happy Trails AI, ABRC, The Phantom PRD), each in a tabbed window
- **SOCi Highlights** — the extra-credit work inside SOCi (Claude webinars, LMS, governance, CTO recognition)
- **AIM (chat with me)** 🏃 — classic AOL Buddy List → double-click Mariah to start an IM with `mariahtheoptimist`. Claude-powered, knows your resume + portfolio, can deep-link to other windows. Plays the AIM sign-on chime on open.
- **what's.new** 📓 — scrapbook feed of recent travel, projects, and life moments. Curated via `lib/updates.ts`.
- **Spill the Beans** — multiple-choice trivia mini-game about Mariah
- **Brain Lab** — two live Claude-powered tools:
  - 🪞 **Cognitive Load Scorer** — paste any text, get a brain rot vs. brain growth score
  - 🧭 **Brain State Check-in** — 90-second sliders → Claude routes you to 1 of 6 cognitive states
- **Resume** — typed-out resume + a Download Resume.pdf button (PDF lives at `/public/Mariah-Anderson-resume.pdf`)
- **Contact** — email, LinkedIn, GitHub, Substack, TikTok
- Friendly XP-style popup, draggable + maximizable windows, start menu, working taskbar with clock

---

## quick start

```bash
# 1. install
npm install

# 2. add your Anthropic key (only needed for Brain Lab)
cp .env.local.example .env.local
# then open .env.local and paste your key from https://console.anthropic.com/

# 3. run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the desktop boots with the Welcome window + Friendly Tip popup.

---

## env vars

| key                  | required?                              | notes                                            |
| -------------------- | -------------------------------------- | ------------------------------------------------ |
| `ANTHROPIC_API_KEY`  | for Brain Lab + AIM chat (recommended) | Both surfaces fall back to a friendly error if missing — the rest of the site works without it. |

---

## file map

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # mounts <Desktop />
│   ├── globals.css               # all XP styling lives here
│   └── api/
│       ├── aim-chat/route.ts         # Claude → AIM-style Q&A about Mariah
│       ├── classify-state/route.ts   # Claude → BrainMode 6-state classifier
│       └── cognitive-load/route.ts   # Claude → ABRC brain rot / growth scorer
├── components/
│   ├── Desktop.tsx               # the whole desktop orchestrator
│   ├── Window.tsx                # draggable, maximizable XP window
│   ├── DesktopIcon.tsx
│   ├── Taskbar.tsx
│   ├── StartMenu.tsx
│   ├── FriendlyTip.tsx
│   └── windows/
│       ├── Welcome.tsx
│       ├── WorkExplorer.tsx      # 4 case studies, tabbed
│       ├── SOCiHighlights.tsx
│       ├── SpillTheBeans.tsx
│       ├── BrainLab.tsx          # both Claude tools live here
│       ├── AIMBuddyList.tsx      # AIM "Mariah is online" buddy list
│       ├── AIMChat.tsx           # Claude-powered IM window
│       ├── WhatsNew.tsx          # scrapbook feed
│       ├── Contact.tsx
│       └── Resume.tsx
├── lib/
│   ├── caseStudies.ts            # ← edit your 4 case studies here
│   ├── soci.ts                   # ← edit your SOCi highlights here
│   ├── trivia.ts                 # ← edit Spill the Beans questions here
│   ├── updates.ts                # ← what's.new feed entries
│   ├── aimContext.ts             # what the AIM chat "knows" about Mariah
│   └── aimSounds.ts              # programmatic AIM sign-on / message chimes
└── public/
    ├── Mariah-Anderson-resume.pdf   # the downloadable PDF (already included)
    └── updates/                     # drop your photos for what's.new here
```

---

## customizing

### swap in your real content

- **`lib/caseStudies.ts`** — edit pitch / problem / insight / decisions / features / stack / outcomes / status for each piece. Pure data, no JSX, fast to update.
- **`lib/soci.ts`** — edit SOCi highlights (titles, subtitles, tags).
- **`lib/trivia.ts`** — swap in real personal trivia. The scoring + verdicts adapt automatically.
- **`lib/updates.ts`** — add entries for the **what's.new** scrapbook feed. Each entry has `title`, `date`, `caption`, optional `image`, optional `emoji`, `tags`, and an optional `link`.
- **`lib/aimContext.ts`** — single source of truth for what the AIM chat knows. It auto-imports from `caseStudies.ts` and `soci.ts`, plus a static resume string. Update the resume string here when your resume changes so the AIM chat stays accurate.

### adding photos to what's.new

1. Drop your image in `/public/updates/` (e.g. `/public/updates/iceland-2026.jpg`)
2. Add an entry to `lib/updates.ts`:
   ```ts
   {
     id: "iceland-trip",
     title: "iceland reset 🧊",
     date: "March 2026",
     caption: "field-tested ART theory on a glacier walk. fascination ✅ being-away ✅",
     image: "/updates/iceland-2026.jpg",
     tags: ["travel", "abrc"],
   }
   ```
3. External URLs (Imgur, Cloudinary, S3, etc.) also work — just put the full URL in the `image` field.

### swapping the resume PDF

Replace `/public/Mariah-Anderson-resume.pdf` with your latest export. The Download button in the Resume window auto-points at this path — no code changes needed.

### links + socials

- **`components/windows/Contact.tsx`** — drop in your real GitHub, Substack, TikTok handles.
- **`components/windows/Resume.tsx`** — update job rows, education, stack.

### colors / vibes

- Window chrome, taskbar, and Bliss-style background live in **`app/globals.css`**.
- ABRC + XP palettes are also in `tailwind.config.js` (`theme.extend.colors.abrc.*` and `xp.*`) if you want to lean more retro-cream or fully ABRC-branded later.

### add a new window

1. Create `components/windows/MyApp.tsx` and export a default React component.
2. Add an `AppId` + meta entry in `components/Desktop.tsx` (`APP_META` and `renderApp`).
3. Optional: add to the `ICONS` array (right-side desktop) and `StartMenu.tsx`'s `APPS` list.

---

## deploy

Deploy in 2 minutes on Vercel:

```bash
# install vercel CLI once
npm i -g vercel

# from this directory
vercel
```

Set `ANTHROPIC_API_KEY` in the Vercel dashboard → Project → Settings → Environment Variables.

---

## tech stack

`Next.js 14 (App Router)` · `React 18` · `TypeScript` · `Tailwind CSS` · `Framer Motion` (installed, ready for animation upgrades) · `Anthropic SDK`

---

## why this design

This portfolio is itself a small case study. Three deliberate choices:

1. **Retro shell, serious content.** The XP-style desktop is delight + nostalgia (low-arousal positive affect → users explore more). The content inside the windows is full case studies — same rigor as a Notion doc, more memorable container.
2. **Interactivity over scrolling.** Each window is its own "tab" of you. Recruiters and PMs can opt in to depth instead of being drowned in a long scroll.
3. **AI as a working demo, not a sticker.** Brain Lab actually runs Claude in production. The cognitive load scorer is also a tiny preview of what ABRC v1 will ship with — so the portfolio doubles as a proof-of-concept for one of its own case studies.

---

stop rotting, start living 🧠✨
