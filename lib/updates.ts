/**
 * "What I've been up to" — a curated feed of recent updates,
 * travel snaps, build-in-public moments, etc.
 *
 * HOW TO ADD AN UPDATE:
 *  1. Drop your image in `/public/updates/your-image.jpg`
 *     (or use any URL — `image` accepts external URLs too)
 *  2. Add an entry to the array below.
 *  3. Save. The Updates window will reflect it instantly.
 *
 * Tags: "travel" | "project" | "event" | "abrc" | "soci" | "life"
 *  — used to color the chip; add new tags freely (default color is gray).
 */

export type Update = {
  id: string;
  title: string;
  date: string;          // freeform, e.g. "June 2026" — displayed as-is
  caption: string;       // 1–4 sentences
  image?: string;        // /public path OR external URL — optional
  emoji?: string;        // shown if no image
  tags: string[];
  link?: { label: string; url: string };
};

export const updates: Update[] = [
  {
    id: "abrc-launch",
    title: "ABRC v1 site lands soon 🧠",
    date: "June 2026",
    caption:
      "deep in the design decisions doc — every color + spacing choice on the ABRC site gets a neuro citation. building in public on Substack alongside it.",
    emoji: "🧠",
    tags: ["abrc", "project"],
  },
  {
    id: "brainmode-build",
    title: "BrainMode v1 in build",
    date: "June 2026",
    caption:
      "evolving Flux into BrainMode. 90-second cognitive check-in → Claude routes you to tasks that match your brain state. shipping with 3 of the 6 states first.",
    emoji: "🛠️",
    tags: ["project"],
  },
  {
    id: "soci-webinar",
    title: "Claude training webinar @ SOCi",
    date: "Spring 2026",
    caption:
      "ran another company-wide session with the VPs + CTO. theme this round: 'AI-native, not AI-veneer.' got to demo the LMS + workflows live.",
    emoji: "🚀",
    tags: ["soci", "event"],
  },
  {
    id: "travel-placeholder",
    title: "weekend reset trip 🌲",
    date: "May 2026",
    caption:
      "research field trip more than vacation — testing Attention Restoration Theory on myself before Happy Trails AI ships. canopy cover does what they said it does.",
    emoji: "🌲",
    tags: ["travel", "life"],
  },
  // 👇 add new entries above this line — replace this placeholder with real ones
  {
    id: "placeholder-photo",
    title: "drop a photo here",
    date: "whenever",
    caption:
      "add a real image at /public/updates/your-image.jpg and reference it via the `image` field. supports external URLs too.",
    emoji: "📸",
    tags: ["life"],
  },
];

export const TAG_COLORS: Record<string, string> = {
  travel: "#8BBEE8",      // sky
  project: "#F5D547",     // yellow
  event: "#D94F3D",       // terracotta
  abrc: "#B8D96E",        // lime
  soci: "#2D1B33",        // plum
  life: "#FFB3D9",        // pink
};
