import { NextResponse } from "next/server";
import { askClaudeJSON, requireKey } from "@/lib/claude";

export const runtime = "nodejs";

const SYSTEM = `You are the BrainMode classifier - a cognitive state router built by Mariah Anderson. Given a user's 90-second check-in (energy, valence, focus, stress, context), classify them into ONE of these 6 brain states and explain why.

The 6 states + tone:
- "flow"     - deep, focused, energized + positive
- "creative" - playful, exploratory, novelty-seeking
- "recovery" - low energy, depleted, needs gentle restoration
- "admin"   - structured, low-arousal, methodical
- "social"  - warm energy, conversational drive
- "rest"    - barely there, sleep-adjacent, do less

Return STRICT JSON with this exact shape:

{
  "state": "flow" | "creative" | "recovery" | "admin" | "social" | "rest",
  "confidence": number (0-1),
  "reasoning": string (1-2 sentences citing the user's signals - neuroscience-aware, ABRC voice),
  "recommendedActivities": string[] (3 short suggestions matched to this state),
  "avoidActivities": string[] (2 short activities to skip right now),
  "ambient": {
    "vibe": string (5-8 word phrase describing the visual/audio vibe of this state),
    "color": string (hex code that matches the state)
  }
}

Voice: lowercase casual, hype + nurturing, confident. No corporate energy.`;

/** Validate the check-in at the system boundary before we interpolate it. */
function validateCheckin(body: unknown): { ok: true; value: Checkin } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "check-in body required" };
  }
  const b = body as Record<string, unknown>;
  const scale = (v: unknown, name: string) => {
    const n = Number(v);
    if (!Number.isFinite(n) || n < 1 || n > 5) {
      throw new Error(`${name} must be a number 1-5`);
    }
    return n;
  };
  try {
    return {
      ok: true,
      value: {
        energy: scale(b.energy, "energy"),
        valence: scale(b.valence, "valence"),
        focus: scale(b.focus, "focus"),
        stress: scale(b.stress, "stress"),
        timeOfDay: typeof b.timeOfDay === "string" ? b.timeOfDay : "unspecified",
        notes: typeof b.notes === "string" ? b.notes : "",
      },
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "invalid check-in" };
  }
}

type Checkin = {
  energy: number;
  valence: number;
  focus: number;
  stress: number;
  timeOfDay: string;
  notes: string;
};

function buildCheckinPrompt(c: Checkin): string {
  return `Here is the user's 90-second check-in (1-5 scales unless noted):

- Energy (1=depleted, 5=wired): ${c.energy}
- Valence (1=negative mood, 5=positive mood): ${c.valence}
- Focus (1=scattered, 5=locked in): ${c.focus}
- Stress (1=calm, 5=overwhelmed): ${c.stress}
- Time of day: ${c.timeOfDay}
- Notes from user (free text): "${c.notes.slice(0, 400)}"

Classify and respond with JSON only.`;
}

export async function POST(req: Request) {
  try {
    const keyErr = requireKey();
    if (keyErr) return keyErr;

    const parsed = validateCheckin(await req.json());
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { data, raw, error } = await askClaudeJSON({
      system: SYSTEM,
      user: buildCheckinPrompt(parsed.value),
    });
    if (error) return NextResponse.json({ error, raw }, { status: 502 });
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
