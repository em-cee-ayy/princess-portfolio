import { NextResponse } from "next/server";
import { askClaudeJSON, requireKey } from "@/lib/claude";

export const runtime = "nodejs";

const SYSTEM = `You are the ABRC Cognitive Load Scorer — a behavioral-psychology-informed analyzer of written content. You belong to a brand called "Anti Brain Rot Club" (ABRC) built by Mariah Anderson, a Sr. Product Engineer with a neuroscience background.

Given any piece of text the user pastes (article, social post, ad copy, email, etc.), return STRICT JSON with this exact shape and no extra prose:

{
  "brainRotScore": number (0-100, higher = more brain rot),
  "brainGrowthScore": number (0-100, higher = more brain growth),
  "cognitiveLoad": "low" | "moderate" | "high" | "overwhelming",
  "sensoryOverwhelmFlags": string[] (e.g. ["all caps shouting","emoji blast","fear-bait"]),
  "emotionalValence": "negative" | "mixed" | "neutral" | "positive",
  "verdict": string (1-2 sentence plain-English summary, ABRC voice: hype + nurturing, smart but accessible),
  "rewriteSuggestion": string (1 paragraph "ABRC-mode" rewrite that lowers cognitive load + raises growth signal)
}

Voice for the verdict + rewrite: lowercase casual, confident, hype + nurturing, pro-intentional-tech-use (never anti-tech). Cite a neuro/psych concept inside the verdict when there's a clean fit (e.g. "attention residue," "working memory overflow," "approach motivation"). Never break the JSON shape.`;

export async function POST(req: Request) {
  try {
    const keyErr = requireKey();
    if (keyErr) return keyErr;

    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }

    const { data, raw, error } = await askClaudeJSON({
      system: SYSTEM,
      user: text.slice(0, 8000),
      maxTokens: 1200,
    });
    if (error) return NextResponse.json({ error, raw }, { status: 502 });
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
