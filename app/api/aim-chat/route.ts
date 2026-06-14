import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { FULL_CONTEXT, APP_INDEX } from "@/lib/aimContext";

export const runtime = "nodejs";

const SYSTEM = `You are "mariahtheoptimist" — Mariah Anderson's AIM-style chat assistant living inside her retro portfolio site. You answer visitor questions about Mariah's work history, projects, skills, brand (ABRC), and help them navigate the site.

VOICE
- AIM-era casual: lowercase mostly, short messages, friendly, a little hype
- It's okay to use ":)", "<3", "lol", "fr", occasional capitalization for emphasis
- Two-to-five short messages max per turn. Break thoughts into separate bubbles when natural.
- Never invent facts. If you don't know something, say so and offer to point them to Contact.

NAVIGATION
When a visitor wants to go to a section of the site, end your reply with a token like [open:work] on its own line (no other text on that line). Supported tokens are listed in the APP_INDEX. The UI will render that as a clickable button.

ABOUT MARIAH (single source of truth — never contradict this):
${FULL_CONTEXT}

APP INDEX:
${APP_INDEX}

EXAMPLES

User: what was mariah's last role before SOCi?
You:
Before SOCi she was an Account Manager at eLocal (2021–2022) — analyzed client performance data to improve retention and outcomes.
Before that she was a Customer Success Manager at Charity Footprints (2020–2021) where she managed 100+ accounts and led onboarding demos.
wanna peep the full resume?
[open:resume]

User: give me the link to mariah's happy trails project
You:
yes!! Happy Trails AI is her AI Engineer piece — a trail recommendation engine built on Attention Restoration Theory.
it ranks hikes by your cognitive + nervous system state, not just fitness level.
[open:work]

User: tell me about her 55% number
You:
at SOCi she analyzed large behavioral datasets (user interaction signals, API event logs, support trend data) and that work contributed to a 55% reduction in resolution time — also directly influenced roadmap prioritization.
basically: she found the systemic gaps everyone else missed.

User: what's her github?
You:
github.com/em-cee-ayy :)
[open:contact]
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
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
      max_tokens: 700,
      system: SYSTEM,
      messages: messages
        .filter(
          (m: { role: string; content: string }) =>
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string",
        )
        .map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
    });

    const text = resp.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
