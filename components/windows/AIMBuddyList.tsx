"use client";

import { useEffect, useState } from "react";
import { playSignOn } from "@/lib/aimSounds";

type Props = {
  onOpenChat: () => void;
};

export default function AIMBuddyList({ onOpenChat }: Props) {
  const [buddiesOpen, setBuddiesOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // sign-on chime when buddy list appears (user gesture from icon click already happened)
    playSignOn();
  }, []);

  return (
    <div className="-m-3" style={{ background: "#FFCC33", minHeight: 360 }}>
      {/* AIM header strip */}
      <div
        className="px-2 py-1 flex items-center gap-1 text-[11px]"
        style={{
          background: "linear-gradient(180deg, #FFD84D 0%, #F5B800 100%)",
          borderBottom: "1px solid #c79200",
          color: "#000",
        }}
      >
        <span>My AIM</span>
        <span className="opacity-50">·</span>
        <span>People</span>
        <span className="opacity-50">·</span>
        <span>Help</span>
      </div>

      {/* Screen name / status bar */}
      <div
        className="p-3"
        style={{
          background: "#FFCC33",
          borderBottom: "1px solid #c79200",
        }}
      >
        <div className="flex items-center gap-2">
          {/* Yellow running man */}
          <div
            style={{
              width: 40,
              height: 40,
              fontSize: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFE680",
              border: "2px solid #c79200",
              borderRadius: 4,
            }}
          >
            🏃
          </div>
          <div>
            <div className="text-[12px] font-bold">mariahtheoptimist</div>
            <div className="text-[10px] italic text-[#5a3a00]">
              available · &quot;stop rotting, start living&quot;
            </div>
          </div>
        </div>
      </div>

      {/* Body — either the buddy list or the "about this bot" info panel */}
      {showInfo ? (
        <InfoPanel onBack={() => setShowInfo(false)} onOpenChat={onOpenChat} />
      ) : (
        <div className="p-2" style={{ background: "#fff8d6", minHeight: 220 }}>
          <button
            className="w-full px-2 py-1 text-[11px] font-bold flex items-center justify-between"
            style={{ background: "#FFE680", borderBottom: "1px solid #c79200", cursor: "pointer" }}
            onClick={() => setBuddiesOpen((o) => !o)}
            aria-expanded={buddiesOpen}
          >
            <span>
              {buddiesOpen ? "▼" : "▶"} Buddies (1/1)
            </span>
            <span className="text-[10px] italic">online</span>
          </button>

          {buddiesOpen && (
            <>
              <div
                className="mt-1 px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#FFE680] rounded-sm"
                onDoubleClick={onOpenChat}
                onClick={onOpenChat}
                title="double-click to IM Mariah"
              >
                <span style={{ fontSize: 14 }}>🟢</span>
                <span className="font-bold text-[12px]">Mariah</span>
                <span className="text-[10px] text-[#5a3a00] italic">
                  (mariahtheoptimist)
                </span>
              </div>

              <div className="mt-3 text-[10px] text-[#5a3a00] italic px-3">
                double-click Mariah to start an IM →
              </div>
            </>
          )}
        </div>
      )}

      {/* Bottom IM button bar */}
      <div
        className="p-2 flex justify-center gap-2"
        style={{ background: "#FFCC33", borderTop: "1px solid #c79200" }}
      >
        <button className="xp-btn" onClick={onOpenChat}>
          💬 IM
        </button>
        <button
          className="xp-btn"
          onClick={() => setShowInfo((s) => !s)}
          aria-pressed={showInfo}
        >
          ℹ️ Info
        </button>
      </div>
    </div>
  );
}

function InfoPanel({
  onBack,
  onOpenChat,
}: {
  onBack: () => void;
  onOpenChat: () => void;
}) {
  return (
    <div className="p-3" style={{ background: "#fffef5", minHeight: 220 }}>
      <button
        className="text-[11px] xp-link mb-2"
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        onClick={onBack}
      >
        ← back to buddy list
      </button>

      <div className="text-[13px] font-bold mb-1">under the hood</div>
      <p className="text-[12px] mb-2">
        The IM window isn&apos;t canned replies — it&apos;s a live Claude agent
        that actually knows my resume and projects. Here&apos;s how it&apos;s
        built:
      </p>

      <ul className="text-[12px] space-y-1.5 list-disc pl-5">
        <li>
          <strong>Model:</strong> Anthropic Claude (<code>claude-sonnet-4-6</code>),
          called from a Next.js route handler at{" "}
          <code>/api/aim-chat</code>.
        </li>
        <li>
          <strong>Context, not vector RAG:</strong> my whole resume + all four
          case studies + SOCi highlights fit in the prompt, so they&apos;re
          injected straight into the system prompt from one source of truth
          (<code>lib/aimContext.ts</code>) — no embeddings needed at this size.
        </li>
        <li>
          <strong>Deep links:</strong> the model can emit an{" "}
          <code>[open:work]</code>-style token; the UI turns it into a button
          that opens that window — so the chat can actually navigate the desktop.
        </li>
        <li>
          <strong>Voice + guardrails:</strong> a system prompt pins the AIM-era
          tone and a &quot;never invent facts&quot; rule, pointing you to Contact
          when it doesn&apos;t know.
        </li>
        <li>
          <strong>Sounds:</strong> the sign-on / message chimes are synthesized
          live with the Web Audio API — no copyrighted clips shipped.
        </li>
      </ul>

      <button className="xp-btn mt-3 text-[12px]" onClick={onOpenChat}>
        💬 ok, open the IM
      </button>
    </div>
  );
}
