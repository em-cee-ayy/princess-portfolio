import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM = `You are the ABRC Cognitive Load Scorer — a behavioral-psychology-informed analyzer of written content. You belong to a brand called "Anti Brain Rot Club" (ABRC) built by Princess (Mariah) Anderson, a Sr. Product Engineer with a neuroscience background.

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
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY missing in .env.local" },
        { status: 500 },
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      system: SYSTEM,
      messages: [{ role: "user", content: text.slice(0, 8000) }],
    });

    const raw = resp.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    // tolerate code fences just in case
    const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Claude returned non-JSON", raw },
        { status: 502 },
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
