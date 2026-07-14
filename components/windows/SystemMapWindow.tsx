"use client";

/**
 * System Map.exe - a desktop window that maps the portfolio itself.
 * The XP metaphor makes the relationship literal: an actual window whose
 * job is to show that every project on the desktop runs one loop.
 * Clicking a project opens work.explorer focused on that case study.
 */

const LAYERS = [
  {
    id: "brainmode",
    layer: "interface layer",
    name: "BrainMode",
    claim: "the loop applied to your tools",
    color: "var(--layer-interface)",
  },
  {
    id: "happytrails",
    layer: "environment layer",
    name: "Happy Trails AI",
    claim: "the loop applied to where you go",
    color: "var(--layer-environment)",
  },
  {
    id: "abrc",
    layer: "design layer",
    name: "ABRC",
    claim: "the loop applied to the brand's own surface",
    color: "var(--abrc-yellow)",
  },
  {
    id: "phantomprd",
    layer: "governance layer",
    name: "The Phantom PRD",
    claim: "what we owe users when it runs at scale",
    color: "var(--layer-governance)",
  },
];

export default function SystemMapWindow({
  onOpen,
}: {
  onOpen: (projectId: string) => void;
}) {
  return (
    <div className="xp-content" style={{ width: "100%" }}>
      <p style={{ marginBottom: 8 }}>
        <b>every project on this desktop runs one loop:</b>
      </p>
      <div
        className="xp-inset"
        style={{ textAlign: "center", padding: 10, marginBottom: 12, fontWeight: "bold" }}
      >
        sense → classify → adapt → learn
      </div>
      {LAYERS.map((p) => (
        <button
          key={p.id}
          className="xp-btn"
          onClick={() => onOpen(p.id)}
          style={{
            display: "flex",
            width: "100%",
            gap: 8,
            alignItems: "center",
            marginBottom: 6,
            textAlign: "left",
            borderLeft: `4px solid ${p.color}`,
          }}
        >
          <span style={{ minWidth: 130, fontWeight: "bold" }}>{p.name}</span>
          <span style={{ fontSize: 11 }}>
            {p.layer} - {p.claim}
          </span>
        </button>
      ))}
      <p style={{ marginTop: 10, fontSize: 11, color: "#555" }}>
        four projects, one thesis: cognitive state is a first-class input.
      </p>
    </div>
  );
}
