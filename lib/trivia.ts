export type TriviaQ = {
  q: string;
  options: string[];
  answer: number; // index
  reveal: string;
};

// Mariah — feel free to swap any of these with real personal trivia
export const trivia: TriviaQ[] = [
  {
    q: "What's Mariah's professional 'origin story' undergrad in?",
    options: ["Computer Science", "Marketing", "Psychology / Neuroscience", "Design"],
    answer: 2,
    reveal:
      "Psych/neuro 🧠 — which is the through-line of literally every portfolio piece.",
  },
  {
    q: "What's the personal brand Mariah is building?",
    options: ["Brain Cafe", "ABRC (Anti Brain Rot Club)", "Mind Garden", "Vibe Engineer"],
    answer: 1,
    reveal:
      "ABRC — Anti Brain Rot Club. Tagline: 'stop rotting, start living.'",
  },
  {
    q: "How many cognitive states does BrainMode classify the user into?",
    options: ["3", "4", "6", "8"],
    answer: 2,
    reveal:
      "6: Flow, Creative, Recovery, Admin, Social, Rest. The UI changes per state.",
  },
  {
    q: "What theory powers Happy Trails AI's recommendation engine?",
    options: [
      "Maslow's Hierarchy",
      "Attention Restoration Theory (Kaplan & Kaplan)",
      "Operant Conditioning",
      "Big Five Personality",
    ],
    answer: 1,
    reveal:
      "Attention Restoration Theory — trails scored on fascination, extent, being-away, compatibility.",
  },
  {
    q: "What company does Mariah currently work at?",
    options: ["Anthropic", "SOCi", "Notion", "Pinterest"],
    answer: 1,
    reveal:
      "SOCi — Sr. Product Engineer. Also designs + leads SOCi's company-wide AI training program alongside VPs + CTO, and shipped SOCi Sage (internal Slack-native AI assistant).",
  },
  {
    q: "Which product does the Phantom PRD target?",
    options: ["Notion AI", "Character.AI", "Replika", "Pi"],
    answer: 1,
    reveal:
      "Character.AI — most psychologically rich + ethically loaded target, most impressive to an AI PM evaluator.",
  },
  {
    q: "What's Mariah's long-game career target?",
    options: [
      "Staff engineer at a FAANG",
      "AI Technical Product Leader → CPO",
      "Indie founder",
      "Design lead",
    ],
    answer: 1,
    reveal: "AI-native product LEADER → eventually CPO. The portfolio is the proof.",
  },
  {
    q: "Which ABRC color is for CTAs (dopamine-associated approach motivation)?",
    options: ["Terracotta #D94F3D", "Lime #B8D96E", "Yellow #F5D547", "Plum #2D1B33"],
    answer: 2,
    reveal:
      "Yellow #F5D547 — dopamine-associated, triggers approach motivation. Every ABRC color has a citation.",
  },
];
