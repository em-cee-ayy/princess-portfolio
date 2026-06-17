export type CaseStudy = {
  id: string;
  role: string;
  emoji: string;
  title: string;
  cover?: string;                    // main card/hero image
  screenshots?: {
    src: string;                     // image path or URL
    caption?: string;                // "90-second check-in UI"
    alt?: string;                    // accessibility
  }[];
  videos?: {
    src: string;          // path or external URL
    caption?: string;
    poster?: string;      // thumbnail shown before video plays (optional but recommended)
  }[];
  pitch: string;
  problem: string;
  insight: string;
  buildDecisions: string[];
  features: string[];
  stack: string[];
  outcomes: string[];
  contentAngle: string;
  status: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "brainmode",
    role: "Product Engineer",
    emoji: "🛠️",
    title: "BrainMode — a cognitive state router (not a task manager)",
    cover: "/case-studies/brainmode/cover.jpg",         // ← card thumbnail
    // videos: [
    // {
    //   src: "/case-studies/brainmode/demo.mp4",
    //   caption: "cognitive state router — full walkthrough",
    //   poster: "/case-studies/brainmode/demo-thumbnail.jpg",  // shows while video loads
    // }
    // ],
    // screenshots: [
    // {
    //   src: "/case-studies/brainmode/screenshot-checkin.jpg",
    //   caption: "90-second neuroscience-backed check-in",
    //   alt: "BrainMode check-in screen with arousal/valence sliders",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-flow.jpg",
    //   caption: "flow state UI — density drops, motion slows",
    //   alt: "BrainMode UI in flow cognitive mode",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-wallpaper.jpg",
    //   caption: "AI-generated cognitive wallpaper for this session",
    //   alt: "Replicate-generated session wallpaper",
    // },
    // ],
    pitch:
      "A full-stack productivity app built on cognitive neuroscience. Instead of showing you everything on your to-do list, it asks how your brain is doing first — then routes you to the tasks you're actually equipped to handle right now.",
    problem:
      "Every task manager assumes the human is a constant. They aren't. A burned-out engineer at 4pm and a wired one at 9am have different cognitive capacities — but the same Notion view.",
    insight:
      "The interface isn't a container for tasks. It's a reflection of your current cognitive reality. The app should treat the brain as a variable and respond accordingly.",
    buildDecisions: [
      "90-second check-in uses validated affect-grid + arousal/valence sliders — not cheesy emoji moods",
      "Claude classifies 6 brain states: Flow, Creative, Recovery, Admin, Social, Rest",
      "UI tokens (color, motion easing, density) swap per state — not a 'theme switcher,' a cognitive mirror",
      "Replicate generates a unique session 'cognitive wallpaper' so every check-in feels embodied, not abstract",
      "Dopamine-aware notifications: zero interruptions during detected flow windows",
    ],
    features: [
      "90-second neuroscience-backed check-in (sliders, not emojis)",
      "AI brain state classification (6 cognitive modes)",
      "Task recommendation engine matched to current cognitive profile",
      "Streak + insight system ('you're in flow 73% of mornings before 10am')",
      "Adaptive emotional UI (color, motion, density shift per state)",
      "AI-generated session cognitive wallpaper",
    ],
    stack: [
      "Next.js",
      "Supabase",
      "Anthropic API",
      "Tailwind",
      "Framer Motion",
      "Replicate",
      "Weavy",
    ],
    outcomes: [
      "Evolved from my existing Flux project — reused sentiment analysis + reasoning-transparency primitives",
      "Companion ABRC content: 'i built an app where the UI changes based on your cognitive state'",
      "Ships as v1 with 3 brain states; full 6-state library lands post-launch",
    ],
    contentAngle:
      "TikTok/ABRC: 'i built an app where the UI changes based on your cognitive state — here's what flow looks like'",
    status: "in build · target June–mid July",
  },
  {
    id: "happytrails",
    role: "AI Engineer",
    emoji: "🤖",
    title: "Happy Trails AI — trail recommendations for your nervous system",
    // videos: [
    // {
    //   src: "/case-studies/brainmode/demo.mp4",
    //   caption: "cognitive state router — full walkthrough",
    //   poster: "/case-studies/brainmode/demo-thumbnail.jpg",  // shows while video loads
    // }
    // ],
    // screenshots: [
    // {
    //   src: "/case-studies/brainmode/screenshot-checkin.jpg",
    //   caption: "90-second neuroscience-backed check-in",
    //   alt: "BrainMode check-in screen with arousal/valence sliders",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-flow.jpg",
    //   caption: "flow state UI — density drops, motion slows",
    //   alt: "BrainMode UI in flow cognitive mode",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-wallpaper.jpg",
    //   caption: "AI-generated cognitive wallpaper for this session",
    //   alt: "Replicate-generated session wallpaper",
    // },
    // ],
    pitch:
      "An AI-powered trail recommendation engine built on Attention Restoration Theory. Instead of matching hikes to fitness levels, it matches them to cognitive states — because the right environment for a burned-out engineer and a creatively blocked designer are neurologically different.",
    problem:
      "AllTrails ranks trails by stars and difficulty. None of that tells you whether this trail will restore your attention, regulate your nervous system, or unblock creative thought.",
    insight:
      "Every trail has a psychological fingerprint. Canopy cover, water presence, elevation, crowd density, sensory complexity — all map to validated research on cognitive restoration and arousal regulation.",
    buildDecisions: [
      "Pinecone vector DB with trail embeddings scored on ART dimensions (fascination, extent, being-away, compatibility)",
      "PsychSignal layer analyzes AllTrails reviews for emotional tone, restoration language, sensory richness",
      "Claude interprets user cognitive state + intent → ranks trails by neurological fit, not stars",
      "Replicate generates 'trail mood imagery'; Weavy generates ambient environment preview",
      "Post-hike insight capture closes the loop — actual nervous system response feeds personalization",
    ],
    features: [
      "Cognitive/nervous system state check-in at trip start",
      "Trail recommendations ranked by psychological fit + ART score",
      "Attention Restoration Score on every trail",
      "Waze-style dynamic routing (trail conditions, safety, time-of-day)",
      "AI-generated mood imagery + ambient video preview",
      "Longitudinal pattern tracking — which environments serve which brain states",
    ],
    stack: [
      "Next.js",
      "FastAPI",
      "Anthropic API",
      "Pinecone",
      "Replicate",
      "Weavy",
      "Mapbox",
      "Supabase",
      "AllTrails data",
    ],
    outcomes: [
      "Absorbs the original PsychSignal API concept into the review-analysis layer",
      "Substack companion: 'the neuroscience of why the wrong hike makes you worse'",
      "v1 ships without ambient video — added in v2 once Weavy iteration budget is set",
    ],
    contentAngle:
      "'i built a hiking app that recommends trails based on your nervous system state — here's the neuroscience' (Substack + TikTok)",
    status: "planned · target late July–early Sept",
  },
  {
    id: "abrc",
    role: "Design Engineer",
    emoji: "🎨",
    title: "ABRC — Anti Brain Rot Club, a live neuro-informed design case study",
    // videos: [
    // {
    //   src: "/case-studies/brainmode/demo.mp4",
    //   caption: "cognitive state router — full walkthrough",
    //   poster: "/case-studies/brainmode/demo-thumbnail.jpg",  // shows while video loads
    // }
    // ],
    // screenshots: [
    // {
    //   src: "/case-studies/brainmode/screenshot-checkin.jpg",
    //   caption: "90-second neuroscience-backed check-in",
    //   alt: "BrainMode check-in screen with arousal/valence sliders",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-flow.jpg",
    //   caption: "flow state UI — density drops, motion slows",
    //   alt: "BrainMode UI in flow cognitive mode",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-wallpaper.jpg",
    //   caption: "AI-generated cognitive wallpaper for this session",
    //   alt: "Replicate-generated session wallpaper",
    // },
    // ],
    pitch:
      "ABRC is a live neuro-informed design case study — a personal brand website where every design decision is explicitly grounded in cognitive science and published with citations. It's not just a portfolio piece. It's proof that evidence-based design creates experiences that feel different because they're built differently.",
    problem:
      "Most design systems document what was built. Almost none document why every pixel serves the human brain — and most personal brand sites are visual moodboards with no underlying thesis.",
    insight:
      "If you build a brand around 'intentional tech use,' the site itself has to BE the argument. Every color, spacing decision, motion curve, and toast timing needs a citation.",
    buildDecisions: [
      "Cream #F5EFE0 base reduces visual cortex strain vs. pure white (lower arousal baseline)",
      "Yellow #F5D547 CTAs trigger dopamine-associated approach motivation",
      "Terracotta #D94F3D for alerts uses threat-detection pathway — attention without anxiety spiral",
      "Spacing rhythm follows Miller's Law (7±2 chunking) to match working memory capacity",
      "Animation easing uses biological motion curves so the brain predicts and relaxes",
      "Reading line length capped at 60-75 chars for optimal comprehension load",
      "Section pacing maps to ultradian rhythm — content blocks for natural 90-min focus cycles",
    ],
    features: [
      "Landing page (brand mission, retro brain mascot, emotional hook)",
      "Content hub (rot swaps, brainy tech, brain rest logs, learning in public)",
      "Brain Lab: cognitive load scorer + brain environment generator + rot swap suggester",
      "Design Decisions doc — every choice with research citation (the portfolio artifact)",
      "Generative theme engine: describe a mental state → get a downloadable 'brain environment' pack",
    ],
    stack: [
      "Next.js",
      "Tailwind",
      "Framer Motion",
      "Anthropic API",
      "Replicate",
      "Weavy",
      "Supabase",
    ],
    outcomes: [
      "Absorbs the original NeuroMotion design system concept — ABRC is where it lives in the real world",
      "Cognitive load scorer absorbs PsychSignal — paste content → see brain rot vs. brain growth score",
      "Living product: v1 ships with landing + hub + design doc; Brain Lab features add continuously",
    ],
    contentAngle:
      "LinkedIn deep-dive + Substack: 'i redesigned my personal brand site using neuroscience — here's every decision and the research behind it'",
    status: "scoped · target Sept–mid Oct",
  },
  {
    id: "phantomprd",
    role: "AI Product Manager",
    emoji: "📋",
    title: "The Phantom PRD — an unsolicited AI PM strategy for Character.AI",
    // videos: [
    // {
    //   src: "/case-studies/brainmode/demo.mp4",
    //   caption: "cognitive state router — full walkthrough",
    //   poster: "/case-studies/brainmode/demo-thumbnail.jpg",  // shows while video loads
    // }
    // ],
    // screenshots: [
    // {
    //   src: "/case-studies/brainmode/screenshot-checkin.jpg",
    //   caption: "90-second neuroscience-backed check-in",
    //   alt: "BrainMode check-in screen with arousal/valence sliders",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-flow.jpg",
    //   caption: "flow state UI — density drops, motion slows",
    //   alt: "BrainMode UI in flow cognitive mode",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-wallpaper.jpg",
    //   caption: "AI-generated cognitive wallpaper for this session",
    //   alt: "Replicate-generated session wallpaper",
    // },
    // ],
    pitch:
      "The Phantom PRD analyzes Character.AI through the lens of behavioral psychology, identifies 3 critical gaps in how it serves — and sometimes undermines — human cognition, and reimagines the product with a neuroscience-informed lens, including a speculative product vision film.",
    problem:
      "Character.AI is one of the most psychologically rich AI products on the market, and one of the most ethically loaded. Parasocial relationship design, dark-pattern engagement loops, and identity-loss risk aren't bugs — they're product strategy questions nobody is publicly answering.",
    insight:
      "An AI PM portfolio shouldn't just be your own builds. It should prove you can think strategically about products you didn't build — especially ones where behavioral psych is the whole game.",
    buildDecisions: [
      "Written as if hired as Character.AI's AI PM — full deliverable stack, not a teardown blog",
      "Psychological user models (not personas) — 3 cognitive/emotional archetypes with research citations",
      "1 flagship feature spec'd end-to-end with ethical AI considerations as first-class section",
      "12-month roadmap with sequencing rationale + behavioral health metrics (not just engagement)",
      "Speculative 90-second product vision film via Claude + Weavy + Descript",
      "Emotionally mapped user journey — horizontal scroll, AI-generated state imagery at each touchpoint",
    ],
    features: [
      "Strategy doc (Notion or Next.js site): teardown → opportunity framing → flagship spec → roadmap",
      "AI ethics section: manipulation risk, dark patterns, parasocial design, responsible AI",
      "Speculative product film (90s) — Claude voiceover + Weavy generated scenes",
      "Emotionally mapped user journey with AI-generated interface concept mockups",
      "Behavioral health metrics framework (not just DAU/MAU)",
    ],
    stack: [
      "Weavy",
      "Replicate / Midjourney",
      "Anthropic API",
      "CapCut or Descript",
      "Framer or Notion",
      "Substack",
    ],
    outcomes: [
      "Demonstrates strategic range beyond my own builds — most important signal for AI PM hiring",
      "Substack series: 'i wrote an unsolicited PM strategy for Character.AI'",
      "Companion content for LinkedIn — designed to land in front of AI PM hiring managers",
    ],
    contentAngle:
      "Substack series + LinkedIn: 'here's what behavioral psychology says Character.AI is getting dangerously wrong'",
    status: "planned · target Oct–mid Nov",
  },
];
