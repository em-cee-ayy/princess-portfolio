"use client";

import { useEffect, useRef, useState } from "react";
import { playMessage, playSent } from "@/lib/aimSounds";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

const APP_LABEL: Record<string, string> = {
  work: "work.explorer",
  soci: "SOCi Highlights",
  brainlab: "Brain Lab",
  spill: "Spill the Beans",
  resume: "Resume",
  contact: "Contact",
  whatsnew: "What's New",
  welcome: "Welcome",
};

const STARTERS = [
  "what was mariah's last role?",
  "tell me about Happy Trails AI",
  "what's her github?",
  "show me her resume",
  "what does ABRC stand for?",
];

type Props = {
  onOpenApp: (id: string) => void;
};

export default function AIMChat({ onOpenApp }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "hiii welcome to my AIM-style chat :)\nask me anything about mariah - i can show you her work, projects, the case studies, or how to navigate this site!",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    const next: Msg[] = [
      ...messages,
      { role: "user", content: text, ts: Date.now() },
    ];
    setMessages(next);
    playSent();
    setLoading(true);
    try {
      const r = await fetch("/api/aim-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "request failed");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text, ts: Date.now() },
      ]);
      playMessage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="-m-3 flex flex-col" style={{ height: 500 }}>
      {/* Title-bar-style header inside the AIM window */}
      <div
        className="px-2 py-1 flex items-center justify-between text-[11px]"
        style={{
          background: "linear-gradient(180deg, #FFD84D 0%, #F5B800 100%)",
          borderBottom: "1px solid #c79200",
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 14 }}>🏃</span>
          <strong>IM with mariahtheoptimist</strong>
        </div>
        <span className="text-[10px] italic">🟢 online</span>
      </div>

      {/* Chat history */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-3 space-y-2"
        style={{ background: "#fffef5", fontSize: 12, lineHeight: 1.4 }}
      >
        {messages.map((m, i) => (
          <Bubble key={i} msg={m} onOpenApp={onOpenApp} />
        ))}
        {loading && (
          <div className="text-[11px] italic text-[#888] pl-2">
            mariahtheoptimist is typing<span className="dots">...</span>
          </div>
        )}
        {error && (
          <div className="text-[11px] text-[#a44] p-2 border border-[#a44] bg-[#fff0f0]">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Starter chips */}
      {messages.length <= 1 && (
        <div
          className="px-2 py-2 flex flex-wrap gap-1"
          style={{ background: "#fffaeb", borderTop: "1px solid #c79200" }}
        >
          <span className="text-[10px] text-[#888] mr-1 self-center">try:</span>
          {STARTERS.map((s) => (
            <button
              key={s}
              className="px-2 py-0.5 text-[10px] bg-white border border-[#c79200] rounded-full hover:bg-[#fff3b3]"
              onClick={() => send(s)}
              disabled={loading}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div
        className="p-2 flex gap-2"
        style={{
          background: "#fff",
          borderTop: "2px solid #c79200",
        }}
      >
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          className="xp-inset flex-1"
          placeholder="type a message and hit enter..."
          style={{ fontFamily: "inherit", fontSize: 12, resize: "none" }}
        />
        <button
          className="xp-btn"
          onClick={() => send()}
          disabled={!input.trim() || loading}
          style={{ alignSelf: "stretch", paddingLeft: 16, paddingRight: 16 }}
        >
          Send
        </button>
      </div>

      <style>{`
        @keyframes blink-dots { 0%,20%{opacity:0}50%{opacity:1}100%{opacity:0} }
        .dots { animation: blink-dots 1s infinite; }
      `}</style>
    </div>
  );
}

function Bubble({
  msg,
  onOpenApp,
}: {
  msg: Msg;
  onOpenApp: (id: string) => void;
}) {
  // Extract [open:foo] tokens into clickable buttons
  const openMatches = Array.from(
    msg.content.matchAll(/\[open:([a-z]+)\]/gi),
  ).map((m) => m[1]);
  const cleaned = msg.content.replace(/\[open:[a-z]+\]/gi, "").trim();
  const isMe = msg.role === "user";
  const name = isMe ? "you" : "mariahtheoptimist";
  const color = isMe ? "#a52a8c" : "#0a4ec3"; // hot pink vs AIM blue

  return (
    <div>
      <div className="text-[11px]" style={{ color }}>
        <strong>{name}:</strong>{" "}
        <span style={{ color: "#000" }} className="whitespace-pre-wrap">
          {cleaned}
        </span>
      </div>
      {openMatches.length > 0 && (
        <div className="mt-1 pl-3 flex flex-wrap gap-1">
          {openMatches.map((id) => (
            <button
              key={id}
              className="xp-btn text-[11px]"
              onClick={() => onOpenApp(id)}
              style={{ padding: "2px 8px" }}
            >
              → open {APP_LABEL[id] || id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
