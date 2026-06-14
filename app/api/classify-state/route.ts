import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM = `You are the BrainMode classifier — a cognitive state router built by Princess Anderson. Given a user's 90-second check-in (energy, valence, focus, stress, context), classify them into ONE of these 6 brain states and explain why.

The 6 states + tone:
- "flow"     — deep, focused, energized + positive
- "creative" — playful, exploratory, novelty-seeking
- "recovery" — low energy, depleted, needs gentle restoration
- "admin"   — structured, low-arousal, methodical
- "social"  — warm energy, conversational drive
- "rest"    — barely there, sleep-adjacent, do less

Return STRICT JSON with this exact shape:

{
  "state": "flow" | "creative" | "recovery" | "admin" | "social" | "rest",
  "confidence": number (0-1),
  "reasoning": string (1-2 sentences citing the user's signals — neuroscience-aware, ABRC voice),
  "recommendedActivities": string[] (3 short suggestions matched to this state),
  "avoidActivities": string[] (2 short activities to skip right now),
  "ambient": {
    "vibe": string (5-8 word phrase describing the visual/audio vibe of this state),
    "color": string (hex code that matches the state)
  }
}

Voice: lowercase casual, hype + nurturing, confident. No corporate energy.`;

export async function POST(req: Request) {
  try {
    const checkin = await req.json();
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY missing in .env.local" },
        { status: 500 },
      );
    }
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const userMsg = `Here is the user's 90-second check-in (1-5 scales unless noted):

- Energy (1=depleted, 5=wired): ${checkin.energy}
- Valence (1=negative mood, 5=positive mood): ${checkin.valence}
- Focus (1=scattered, 5=locked in): ${checkin.focus}
- Stress (1=calm, 5=overwhelmed): ${checkin.stress}
- Time of day: ${checkin.timeOfDay}
- Notes from user (free text): "${(checkin.notes || "").slice(0, 400)}"

Classify and respond with JSON only.`;

    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      system: SYSTEM,
      messages: [{ role: "user", content: userMsg }],
    });

    const raw = resp.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

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
