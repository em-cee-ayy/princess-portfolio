import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

/**
 * One shared abuse guard for every Claude route, mirroring how lib/claude.ts
 * centralizes the client. Three checks, in order:
 *
 *   1. per-IP burst:  10 requests/minute per route
 *   2. per-IP daily:  40 requests/day per route
 *   3. global budget: 500 Claude calls/day across the whole site
 *
 * Without the Upstash env vars (local dev) the guard is a no-op so
 * `npm run dev` needs zero new setup. On Redis errors we fail OPEN —
 * a rate-limiter blip should never take down Brain Lab or AIM; the
 * Anthropic console spend limit is the hard backstop.
 */

const GLOBAL_DAILY_BUDGET = 500;

type GuardResult =
  | { blocked: false }
  | { blocked: true; reason: "rate_limit" | "budget" };

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

let warned = false;
function warnOnce() {
  if (!warned) {
    warned = true;
    console.warn(
      "[ratelimit] rate limiting disabled — Upstash env vars not set (fine for local dev)",
    );
  }
}

const redis = hasUpstash ? Redis.fromEnv() : null;

const perMinute = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      prefix: "rl:min",
    })
  : null;

const perDay = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(40, "1 d"),
      prefix: "rl:day",
    })
  : null;

/** Global counter: one key per UTC day, expired after 48h to self-clean. */
async function overGlobalBudget(): Promise<boolean> {
  if (!redis) return false;
  const key = `rl:global:${new Date().toISOString().slice(0, 10)}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60 * 60 * 48);
  return count > GLOBAL_DAILY_BUDGET;
}

function ipOf(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

/** Run all three checks for a route. */
export async function checkLimits(req: Request, route: string): Promise<GuardResult> {
  if (!redis) {
    warnOnce();
    return { blocked: false };
  }
  try {
    const ip = ipOf(req);
    const id = `${route}:${ip}`;
    const minute = await perMinute!.limit(id);
    if (!minute.success) return { blocked: true, reason: "rate_limit" };
    const day = await perDay!.limit(id);
    if (!day.success) return { blocked: true, reason: "rate_limit" };
    if (await overGlobalBudget()) return { blocked: true, reason: "budget" };
    return { blocked: false };
  } catch (err) {
    console.error("[ratelimit] check failed, allowing request:", err);
    return { blocked: false };
  }
}

/** Guard a route: returns a ready-to-send 429 when blocked, else null. */
export async function guardRoute(req: Request, route: string): Promise<NextResponse | null> {
  const result = await checkLimits(req, route);
  if (!result.blocked) return null;
  const message =
    result.reason === "budget"
      ? "the lab is closed for today — come back tomorrow!"
      : "whoa, slow down there, partner 🤠 give it a minute and try again.";
  return NextResponse.json(
    { error: message, reason: result.reason },
    { status: 429 },
  );
}
