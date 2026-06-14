"use client";

import { soci } from "@/lib/soci";

export default function SOCiHighlights() {
  return (
    <div className="-m-3">
      <div className="xp-addressbar">
        <span style={{ color: "#666" }}>Address</span>
        <input value="C:\Users\Princess\SOCi\highlights.log" readOnly />
      </div>

      <div className="bg-white border border-[#999] p-4">
        <div className="serif" style={{ fontSize: 22 }}>
          🚀 SOCi - beyond the Sr. Product Engineer job description
        </div>
        <p className="mt-2 text-[12px] leading-relaxed">
          Outside of day-to-day product engineering work, here's the extra
          surface area I've been quietly building inside SOCi - the work that's
          pulling me toward an AI-native Product Manager / Technical Product
          Leader role.
        </p>

        <div className="mt-4 space-y-3">
          {soci.map((h) => (
            <div
              key={h.title}
              className="border border-[#aca899] bg-[#f6f3e8] p-3"
              style={{ fontSize: 12 }}
            >
              <div className="font-bold" style={{ fontSize: 13 }}>
                {h.title}
              </div>
              <div className="italic text-[#555] text-[11px]">{h.subtitle}</div>
              <p className="mt-2 leading-relaxed">{h.body}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {h.tags.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 bg-[#fffde6] border border-[#d0c060] text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 border-l-4 border-[#0a3cc4] bg-[#eef3fb] text-[12px]">
          <strong>The thesis I'm building toward:</strong> AI doesn't replace
          product intuition, it amplifies it. The product leaders who win the
          next decade will be fluent in psychology, AI, AND engineering. I'm
          building proof in three places at once: SOCi (in-org leverage), my
          portfolio (external proof), and ABRC (public thought leadership).
        </div>
      </div>
    </div>
  );
}
