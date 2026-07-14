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
  status: string;
  liveUrl?: string;      // external link to a live/published version of this project
};

export const caseStudies: CaseStudy[] = [
  {
    id: "brainmode",
    role: "Product Engineer",
    emoji: "🛠️",
    title: "BrainMode - a cognitive state router (not a task manager)",
    cover: "/case-studies/brainmode/cover.jpg",         // ← card thumbnail
    // videos: [
    // {
    //   src: "/case-studies/brainmode/demo.mp4",
    //   caption: "cognitive state router - full walkthrough",
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
    //   caption: "flow state UI - density drops, motion slows",
    //   alt: "BrainMode UI in flow cognitive mode",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-wallpaper.jpg",
    //   caption: "AI-generated cognitive wallpaper for this session",
    //   alt: "Replicate-generated session wallpaper",
    // },
    // ],
    pitch:
      "The interface layer of my core thesis: your brain is a variable, so your tools should be too. A full-stack productivity app that asks how your brain is doing first - 8 screens, 3 viewports, 6 cognitive states - then reshapes one adaptive design system around the state you're actually in, instead of routing you to tasks you're not equipped to handle right now.",
    problem:
      "Every task manager assumes the human is a constant. They aren't. A burned-out engineer at 4pm and a wired one at 9am have different cognitive capacities - but the same Notion view. One static layout forces the user to translate between their state and the tool's assumptions, and that translation cost is attention residue that compounds.",
    insight:
      "The interface is a mirror, not a container. Same tasks, different presentation per brain state. Second-order effect: when the interface adapts to you, check-in honesty goes up, which makes every future classification better. The loop feeds itself.",
    buildDecisions: [
      "Decision 01 - the interface is a mirror, not a container: same tasks, different presentation per brain state, so users never pay the attention-residue cost of translating between their state and the tool's assumptions",
      "Decision 02 - empty and error states are part of the system, not afterthoughts: day 1 says 'you started, that's the hardest part'; errors preserve work ('your check-in data is saved - no need to redo the sliders') because losing 90 seconds of introspection costs more trust than losing 90 seconds of typing",
      "Decision 03 - the classifier is a contract, not a vibe: Claude classifies 4 signals into 1 of 6 states and returns strict JSON (state, confidence, reasoning, recommendations, ambient spec) - designing the schema IS designing the product, because everything the UI can adapt is something the contract must carry",
      "One adaptive design system: 3 viewports, 6 state themes, every empty and error state designed before launch - consistency here is what lets the interface change state without changing language, so adaptation never reads as instability",
      "90-second check-in uses validated affect-grid + arousal/valence sliders - not cheesy emoji moods",
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
      "Evolved from my existing Flux project - reused sentiment analysis + reasoning-transparency primitives",
      "Companion ABRC content: 'i built an app where the UI changes based on your cognitive state'",
      "Ships as v1 with 3 brain states; full 6-state library lands post-launch",
    ],
    status: "MVP complete (mid-July) · full app in progress",
  },
  {
    id: "happytrails",
    role: "AI Engineer",
    emoji: "🤖",
    title: "Happy Trails AI - trail recommendations for your nervous system",
    // videos: [
    // {
    //   src: "/case-studies/brainmode/demo.mp4",
    //   caption: "cognitive state router - full walkthrough",
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
    //   caption: "flow state UI - density drops, motion slows",
    //   alt: "BrainMode UI in flow cognitive mode",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-wallpaper.jpg",
    //   caption: "AI-generated cognitive wallpaper for this session",
    //   alt: "Replicate-generated session wallpaper",
    // },
    // ],
    pitch:
      "The environment layer of the same sense → classify → adapt → learn loop, pointed outdoors: match trails to your nervous system, not just your legs. Built on Attention Restoration Theory (Kaplan & Kaplan), a RAG pipeline (Claude · Pinecone · ART embeddings), and a scoring system I derived from the research - because 'difficulty: moderate' tells you nothing about what a trail does to your attention.",
    problem:
      "AllTrails ranks trails by stars and difficulty. None of that tells you whether this trail will restore your attention, regulate your nervous system, or unblock creative thought.",
    insight:
      "The ART score isn't a rating - it's a model. I decomposed Kaplan & Kaplan's restoration theory into 4 measurable dimensions (fascination, extent, being away, compatibility), embedded every trail against them, and let the match explain itself: 'high fascination, low cognitive clutter - ideal for your depleted-to-restore state.' When a system can show its reasoning, users calibrate trust instead of just extending it.",
    buildDecisions: [
      "ART score as a model, not a rating: every trail embedded against 4 measurable restoration dimensions (fascination, extent, being away, compatibility) in a Pinecone vector DB",
      "PsychSignal layer analyzes AllTrails reviews for emotional tone, restoration language, sensory richness",
      "Claude interprets user cognitive state + intent → ranks trails by neurological fit, not stars, and explains the reasoning so users can calibrate trust",
      "The closed loop: post-hike reflection isn't a feedback form - it's the training signal. Restoration, clarity, and energy-shift scores feed the pattern engine, so by hike 12 the app can say 'you regulate 3.2× better on morning trails with high tree cover.' That's personalization about you, not a filter over users-in-general",
      "Honest constraints: when a wired + process-anxiety state has nothing within 30 miles that truly fits, the app returns a partial match labeled as one - not a confident wrong answer. Systems earn trust at their boundaries, not their happy paths",
    ],
    features: [
      "Cognitive/nervous system state check-in at trip start",
      "Trail recommendations ranked by psychological fit + ART score",
      "Attention Restoration Score on every trail",
      "Waze-style dynamic routing (trail conditions, safety, time-of-day)",
      "AI-generated mood imagery + ambient video preview",
      "Longitudinal pattern tracking - which environments serve which brain states",
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
      "v1 ships without ambient video - added in v2 once Weavy iteration budget is set",
    ],
    status: "MVP complete (mid-July) · full app in progress",
  },
  {
    id: "abrc",
    role: "Design Engineer",
    emoji: "🎨",
    title: "ABRC - Anti Brain Rot Club, a live neuro-informed design case study",
    // videos: [
    // {
    //   src: "/case-studies/brainmode/demo.mp4",
    //   caption: "cognitive state router - full walkthrough",
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
    //   caption: "flow state UI - density drops, motion slows",
    //   alt: "BrainMode UI in flow cognitive mode",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-wallpaper.jpg",
    //   caption: "AI-generated cognitive wallpaper for this session",
    //   alt: "Replicate-generated session wallpaper",
    // },
    // ],
    pitch:
      "ABRC is a live neuro-informed design case study - a personal brand website where every design decision is explicitly grounded in cognitive science and published with citations. It's not just a portfolio piece. It's proof that evidence-based design creates experiences that feel different because they're built differently.",
    problem:
      "Most design systems document what was built. Almost none document why every pixel serves the human brain - and most personal brand sites are visual moodboards with no underlying thesis.",
    insight:
      "If you build a brand around 'intentional tech use,' the site itself has to BE the argument. Every color, spacing decision, motion curve, and toast timing needs a citation.",
    buildDecisions: [
      "Cream #F5EFE0 base reduces visual cortex strain vs. pure white (lower arousal baseline)",
      "Yellow #F5D547 CTAs trigger dopamine-associated approach motivation",
      "Terracotta #D94F3D for alerts uses threat-detection pathway - attention without anxiety spiral",
      "Spacing rhythm follows Miller's Law (7±2 chunking) to match working memory capacity",
      "Animation easing uses biological motion curves so the brain predicts and relaxes",
      "Reading line length capped at 60-75 chars for optimal comprehension load",
      "Section pacing maps to ultradian rhythm - content blocks for natural 90-min focus cycles",
    ],
    features: [
      "Landing page (brand mission, retro brain mascot, emotional hook)",
      "Content hub (rot swaps, brainy tech, brain rest logs, learning in public)",
      "Brain Lab: cognitive load scorer + brain environment generator + rot swap suggester",
      "Design Decisions doc - every choice with research citation (the portfolio artifact)",
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
      "Absorbs the original NeuroMotion design system concept - ABRC is where it lives in the real world",
      "Cognitive load scorer absorbs PsychSignal - paste content → see brain rot vs. brain growth score",
      "Living product: v1 ships with landing + hub + design doc; Brain Lab features add continuously",
    ],
    status: "scoped · target Sept–mid Oct",
    liveUrl: "https://good-biscuits-571024.framer.app/",
  },
  {
    id: "phantomprd",
    role: "AI Product Manager",
    emoji: "📋",
    title: "The Phantom PRD - an unsolicited AI PM strategy for Character.AI",
    // videos: [
    // {
    //   src: "/case-studies/brainmode/demo.mp4",
    //   caption: "cognitive state router - full walkthrough",
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
    //   caption: "flow state UI - density drops, motion slows",
    //   alt: "BrainMode UI in flow cognitive mode",
    // },
    // {
    //   src: "/case-studies/brainmode/screenshot-wallpaper.jpg",
    //   caption: "AI-generated cognitive wallpaper for this session",
    //   alt: "Replicate-generated session wallpaper",
    // },
    // ],
    pitch:
      "This is the governance layer of a larger thesis: I build products that treat cognitive state as a first-class input - and this document is about what builders owe users once they do it at scale. The Phantom PRD analyzes Character.AI through the lens of behavioral psychology, identifies 3 critical gaps in how it serves - and sometimes undermines - human cognition, and reimagines the product with a neuroscience-informed lens, including a speculative product vision film.",
    problem:
      "Character.AI is one of the most psychologically rich AI products on the market, and one of the most ethically loaded. Parasocial relationship design, dark-pattern engagement loops, and identity-loss risk aren't bugs - they're product strategy questions nobody is publicly answering.",
    insight:
      "An AI PM portfolio shouldn't just be your own builds. It should prove you can think strategically about products you didn't build - especially ones where behavioral psych is the whole game.",
    buildDecisions: [
      "Written as if hired as Character.AI's AI PM - full deliverable stack, not a teardown blog",
      "Psychological user models (not personas) - 3 cognitive/emotional archetypes with research citations",
      "1 flagship feature spec'd end-to-end with ethical AI considerations as first-class section",
      "'What we won't ship & why' no-list - because product leadership is mostly deciding what not to build; the section names the leadership behavior it demonstrates",
      "12-month roadmap with sequencing rationale + behavioral health metrics (not just engagement)",
      "Speculative 90-second product vision film via Claude + Weavy + Descript",
      "Emotionally mapped user journey - horizontal scroll, AI-generated state imagery at each touchpoint",
    ],
    features: [
      "Strategy doc (Notion or Next.js site): teardown → opportunity framing → flagship spec → roadmap",
      "AI ethics section: manipulation risk, dark patterns, parasocial design, responsible AI",
      "Speculative product film (90s) - Claude voiceover + Weavy generated scenes",
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
      "Demonstrates strategic range beyond my own builds - most important signal for AI PM hiring",
      "Substack series: 'i wrote an unsolicited PM strategy for Character.AI'",
      "Companion content for LinkedIn - designed to land in front of AI PM hiring managers",
    ],
    status: "planned · target Oct–mid Nov",
  },
];
