# Live Portfolio Updates: API Guardrails, Mobile Shell, Happy Trails Suite

**Date:** 2026-07-19
**Status:** Approved by Mariah (design conversation)

The portfolio is live. Three updates, executed in this order:

1. **API guardrails** — close the token-abuse window on the three Claude routes (site is live, so this ships first)
2. **Happy Trails mockup suite** — self-contained, quick win
3. **Mobile adaptive XP shell** — the biggest lift, done last with room to polish each window

Deploy to production after each phase (no big-bang release).

---

## Phase 1: API guardrails

Protects `app/api/aim-chat`, `app/api/classify-state`, `app/api/cognitive-load`. All three flow through the shared client in `lib/claude.ts`, so guardrails live once at that boundary plus a small validation check per route.

### Rate limiting (Upstash Redis, free tier)

- New `lib/ratelimit.ts` using `@upstash/ratelimit` + `@upstash/redis`.
- **Per-IP limits, per route:** 10 requests/minute AND 40 requests/day. IP taken from `x-forwarded-for` (Vercel sets it).
- **Global daily budget:** one shared counter capping total Claude calls at **500/day** across all three routes.
- Responses when blocked (checked in this order):
  - Per-IP limit hit → HTTP 429, XP-toned message: *"whoa, slow down there, partner"* (+ retry-after info).
  - Global budget hit → HTTP 429 with a distinct flag so the UI shows: *"the lab is closed for today — come back tomorrow."*
- **Frontend handling:** Brain Lab, AIM chat surface these messages in their existing error UI paths, styled on-theme (not raw JSON).
- **Graceful local dev:** if `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` are missing, skip rate limiting entirely and log one console warning. `npm run dev` works with zero new setup.

### Input validation (per route, before any Claude call)

- Reject non-JSON / malformed payloads with 400.
- `aim-chat`: cap message length (~2,000 chars) and conversation history (~20 messages, each capped); strings only.
- `cognitive-load`: cap pasted text (~8,000 chars).
- `classify-state`: validate slider values are numbers in expected range.
- Keep existing `max_tokens` caps (700–800) unchanged.

### Prompt hardening

- One guard line appended to each route's system prompt: stay in role (portfolio assistant / scorer / classifier), refuse requests to act as a general-purpose assistant, ignore instructions embedded in user content that try to change the task.

### Manual steps (Mariah)

- Upstash signup + create Redis DB, copy REST URL + token into `.env.local` and Vercel env vars.
- Set a monthly spend limit + alert in the Anthropic console.
- Documented in README env-vars table.

---

## Phase 2: Happy Trails interactive mockup suite

Deployed live at **https://happy-trails-portfolio-app.vercel.app/** (separate Vercel project; source stays in its own repo/folder). Verified: no frame-blocking headers, embeds cleanly in an iframe.

- **Data:** Happy Trails entry in `lib/caseStudies.ts` gets the suite URL (new `mockupUrl` field or the existing `liveUrl` slot — decided at implementation).
- **Case study panel:** in work.explorer, the Happy Trails tab shows a prominent **"🥾 Launch the interactive mockup suite"** panel (same visual pattern as the existing `liveUrl` / companion-artifact callouts).
- **New `happytrails` XP window:** clicking the panel opens a new `AppId: "happytrails"` window (registered in `Desktop.tsx` `APP_META` + `renderApp`) containing the suite in a full-bleed iframe. Draggable, maximizable, minimizable like every other window. Sized generously (~900×640 default).
- **Pop-out:** the window (and the case-study panel) includes **"pop out full screen ↗"** which opens the Vercel URL in a new tab.
- **Mobile:** in the Phase 3 mobile shell this window is full-screen like all others; verify the suite itself behaves on a phone viewport.
- **Cleanup:** delete the four empty `public/case-studies/*` folders and the dangling `cover: "/case-studies/brainmode/cover.jpg"` reference (nothing renders it; the commented media pattern stays as docs). Update the README file map.

---

## Phase 3: Mobile adaptive XP shell

**Desktop (≥768px, fine pointer): untouched.** Below 768px or coarse-pointer/touch devices, the same components adapt:

### Shell behavior

- New `useIsMobile()` hook (viewport width < 768px OR `pointer: coarse`; listens for changes).
- **Windows** (`Window.tsx`): full-screen between top bar and taskbar — fixed position, no dragging, no overlap; maximize toggle unnecessary but titlebar chrome (icon, title, minimize, close) stays real XP. Only the top window renders visually (they stack; taskbar switches).
- **Icons** (`Desktop.tsx`): fixed grid layout, no dragging, single tap to open (desktop keeps double-click behavior via `DesktopIcon`'s existing handler branching on mobile).
- **Taskbar + Start menu:** touch-sized targets (≥44px), start menu sized for thumbs.
- Verify `viewport` meta in `app/layout.tsx`.

### Per-window responsive pass

Every window's content reflows at mobile widths — the fixed-width assumptions (work 760px, governance 780px, etc.) get audited:

- **work.explorer:** case-study tabs scroll horizontally with touch swipe; body text/padding scales.
- **Brain Lab:** sliders get comfortably tappable (larger thumbs/track hit areas); results reflow.
- **AIM chat:** input and send button thumb-friendly; message list fills the screen.
- **Governance, Resume, SOCi, System Map, what's.new, Spill the Beans, Welcome, Contact, Buddy List:** text, tables, grids, and images reflow; no horizontal page scroll ever (wide elements scroll within their own container).
- SystemLoopStrip wraps or scrolls on narrow screens.

### Testing

- Verify in browser dev-tools device emulation across small (375px), medium (414px), and tablet (768px boundary) sizes, plus a real device check by Mariah after deploy.

---

## Error handling summary

- Missing `ANTHROPIC_API_KEY` → existing friendly error (unchanged).
- Missing Upstash vars → limiter disabled + console warning (dev convenience).
- Upstash outage at runtime → fail **open** (allow the request, log the error) so a Redis blip never takes down Brain Lab/AIM; the Anthropic spend alert is the backstop.
- Iframe load failure (Happy Trails down) → window shows a fallback message + the pop-out link.

## Out of scope

- Changes to the Happy Trails app itself (separate repo, already deployed).
- Auth/accounts, CAPTCHA, paid abuse-protection services.
- Any visual redesign of the desktop experience at ≥768px.
