"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { updates, TAG_COLORS } from "@/lib/updates";

const ALL_TAGS = ["all", "project", "travel", "event", "abrc", "soci", "life"];

export default function WhatsNew() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? updates
        : updates.filter((u) => u.tags.includes(filter)),
    [filter],
  );

  return (
    <div className="-m-3">
      <div className="xp-addressbar">
        <span style={{ color: "#666" }}>Address</span>
        <input value="C:\Users\Mariah\whats-new\" readOnly />
      </div>

      {/* Filter bar */}
      <div
        className="px-3 py-2 flex flex-wrap items-center gap-2"
        style={{ background: "#ece9d8", borderBottom: "1px solid #aca899" }}
      >
        <span className="text-[11px] font-bold">filter:</span>
        {ALL_TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="px-2 py-0.5 text-[11px] border"
            style={{
              background: filter === t ? "#0a4ec3" : "#fff",
              color: filter === t ? "#fff" : "#000",
              borderColor: filter === t ? "#0a3068" : "#aca899",
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="bg-white border border-[#999] p-4">
        <div className="serif" style={{ fontSize: 22 }}>
          📓 what i&apos;ve been up to
        </div>
        <p className="text-[12px] text-[#444] mt-1">
          a low-stakes scrapbook of recent travel, projects, events, and small life
          moments. updated as i go.
        </p>

        <div className="mt-4 space-y-4">
          {filtered.map((u) => (
            <article
              key={u.id}
              className="border border-[#aca899] bg-[#fafafa] flex flex-col sm:flex-row gap-3 p-3"
              style={{ fontSize: 12 }}
            >
              <div
                className="flex-shrink-0"
                style={{
                  width: 120,
                  height: 120,
                  border: "1px solid #888",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "2px 2px 0 #ddd",
                }}
              >
                {u.images && u.images.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: u.images.length === 1 ? "1fr" : "1fr 1fr",
                      gap: 2,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {u.images.map((src, i) => (
                      <div
                        key={src}
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          // a 3rd image spans the full bottom row
                          gridColumn:
                            u.images!.length === 3 && i === 2 ? "1 / -1" : undefined,
                        }}
                      >
                        <Image
                          src={src}
                          alt={`${u.title} (${i + 1})`}
                          fill
                          sizes="120px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                ) : u.image ? (
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image
                      src={u.image}
                      alt={u.title}
                      fill
                      sizes="120px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div style={{ fontSize: 48 }}>{u.emoji || "📷"}</div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <strong style={{ fontSize: 13 }}>{u.title}</strong>
                  <span className="text-[10px] italic text-[#666]">{u.date}</span>
                </div>
                <p className="mt-1 leading-relaxed">{u.caption}</p>

                <div className="mt-2 flex flex-wrap gap-1">
                  {u.tags.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 text-[10px] border"
                      style={{
                        background: (TAG_COLORS[t] || "#ddd") + "33",
                        borderColor: TAG_COLORS[t] || "#aca899",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {u.link && (
                  <a
                    href={u.link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="xp-link text-[11px] inline-block mt-2"
                  >
                    → {u.link.label}
                  </a>
                )}
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="text-[12px] italic text-[#666] py-6 text-center">
              nothing tagged &quot;{filter}&quot; yet - check back soon 💛
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
