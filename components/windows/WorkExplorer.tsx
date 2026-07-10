"use client";

import { useEffect, useState } from "react";
import { caseStudies } from "@/lib/caseStudies";
import SystemLoopStrip from "@/components/SystemLoopStrip";

export default function WorkExplorer({
  focusId,
  onOpenApp,
}: {
  focusId?: string;
  onOpenApp?: (id: string) => void;
}) {
  const [activeId, setActiveId] = useState(caseStudies[0].id);
  const active = caseStudies.find((c) => c.id === activeId)!;

  // System Map (or any external caller) can focus a specific case study.
  useEffect(() => {
    if (focusId && caseStudies.some((c) => c.id === focusId)) {
      setActiveId(focusId);
    }
  }, [focusId]);

  return (
    <div className="-m-3">
      <div className="xp-addressbar">
        <span style={{ color: "#666" }}>Address</span>
        <input value={`C:\\Users\\Mariah\\Portfolio\\${active.id}`} readOnly />
      </div>
      <div className="xp-tabs">
        {caseStudies.map((c) => (
          <button
            key={c.id}
            className={`xp-tab ${c.id === activeId ? "active" : ""}`}
            onClick={() => setActiveId(c.id)}
          >
            <span>{c.emoji}</span>
            <span>{c.role}</span>
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#999] p-4" style={{ minHeight: 380 }}>
        <SystemLoopStrip activeId={activeId} onSelect={setActiveId} />

        <div className="serif" style={{ fontSize: 22, lineHeight: 1.15 }}>
          {active.emoji} {active.title}
        </div>
        <div className="mt-1 text-[11px] italic text-[#666]">
          Role target: <strong>{active.role}</strong> &nbsp;·&nbsp; Status:{" "}
          <strong>{active.status}</strong>
        </div>

        <div className="mt-4 p-3 bg-[#fff8e1] border border-[#e0c878]" style={{ fontSize: 12 }}>
          <strong>The elevator pitch.</strong>
          <p className="mt-1">{active.pitch}</p>
        </div>

        {active.id === "phantomprd" && onOpenApp && (
          <div
            className="mt-3 p-3 text-[12px]"
            style={{ background: "#eef7f5", borderLeft: "4px solid #1B998B" }}
          >
            <strong>Companion artifact.</strong> The publishable governance
            deliverable behind this piece — a full applied framework for shipping
            AI features in a healthtech SaaS.{" "}
            <button
              onClick={() => onOpenApp("governance")}
              className="xp-link"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#0a3cc4",
                textDecoration: "underline",
                fontSize: 12,
              }}
            >
              open the AI Governance Framework →
            </button>
          </div>
        )}

        <Section label="The problem" body={active.problem} />
        <Section label="The insight" body={active.insight} />

        <SectionList label="Key build decisions" items={active.buildDecisions} />
        <SectionList label="Feature set" items={active.features} />

        <div className="mt-4">
          <div className="font-bold serif" style={{ fontSize: 14 }}>
            Tech stack
          </div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {active.stack.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 border border-[#7f9db9] bg-[#e6f0f7] text-[11px] rounded-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <SectionList label="Outcomes + lineage" items={active.outcomes} />

        <div className="mt-4 p-3 border border-dashed border-[#aca899] bg-[#fafafa]" style={{ fontSize: 12 }}>
          <strong>ABRC content angle.</strong>
          <div className="mt-1 italic">{active.contentAngle}</div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-4">
      <div className="font-bold serif" style={{ fontSize: 14 }}>
        {label}
      </div>
      <p className="mt-1 text-[12px] leading-relaxed">{body}</p>
    </div>
  );
}

function SectionList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-4">
      <div className="font-bold serif" style={{ fontSize: 14 }}>
        {label}
      </div>
      <ul className="mt-1 list-disc pl-5 text-[12px] leading-relaxed space-y-1">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
