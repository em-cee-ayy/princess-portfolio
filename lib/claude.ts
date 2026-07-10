import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

/**
 * One shared Claude client + response-handling system for every API route.
 * The three routes used to re-declare the client, the text-block flattening,
 * the code-fence stripping, and the error envelope. Naming it once makes the
 * repetition a decision instead of copy-paste.
 */

const MODEL = "claude-sonnet-4-6";

const client = () => new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

/** Guard the system boundary: bail early if the key is missing. */
export function requireKey(): NextResponse | null {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY missing in .env.local" },
      { status: 500 },
    );
  }
  return null;
}

/** Flatten the text blocks out of a messages.create response. */
export function textOf(resp: Anthropic.Message): string {
  return resp.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

/** Call Claude expecting strict JSON; tolerates code fences. */
export async function askClaudeJSON<T>(opts: {
  system: string;
  user: string;
  maxTokens?: number;
}): Promise<{ data?: T; raw?: string; error?: string }> {
  const resp = await client().messages.create({
    model: MODEL,
    max_tokens: opts.maxTokens ?? 800,
    system: opts.system,
    messages: [{ role: "user", content: opts.user }],
  });
  const raw = textOf(resp);
  const cleaned = raw
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  try {
    return { data: JSON.parse(cleaned) as T };
  } catch {
    return { error: "Claude returned non-JSON", raw };
  }
}

/** Call Claude for a free-form text reply over a conversation. */
export async function askClaudeText(opts: {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
  maxTokens?: number;
}): Promise<string> {
  const resp = await client().messages.create({
    model: MODEL,
    max_tokens: opts.maxTokens ?? 700,
    system: opts.system,
    messages: opts.messages,
  });
  return textOf(resp);
}
