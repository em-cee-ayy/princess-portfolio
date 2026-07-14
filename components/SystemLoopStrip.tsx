"use client";

/**
 * One component, reused on every project tab with per-context tokens.
 * The structure is the argument: a reviewer on ANY project sees it belongs
 * to one system (sense → classify → adapt → learn) and can jump to the
 * other layers. Only `activeStep`, the accent token, and the label change.
 */

type LayerConfig = {
  /** which loop step this project is the star of (1-4) */
  activeStep: 1 | 2 | 3 | 4;
  /** short layer name shown in the cross-link row */
  layer: string;
  /** CSS color (or var) used as the accent for this project */
  accent: string;
};

// keyed by case-study id - the single source of "which layer is which"
export const LAYERS: Record<string, LayerConfig> = {
  brainmode: { activeStep: 3, layer: "interface layer", accent: "var(--layer-interface)" },
  happytrails: { activeStep: 2, layer: "environment layer", accent: "var(--layer-environment)" },
  abrc: { activeStep: 1, layer: "design layer", accent: "var(--abrc-yellow)" },
  phantomprd: { activeStep: 4, layer: "governance layer", accent: "var(--layer-governance)" },
};

const STEPS = [
  { n: 1, key: "sense", desc: "a 90-sec state check-in" },
  { n: 2, key: "classify", desc: "claude routes signals → state" },
  { n: 3, key: "adapt", desc: "the experience reshapes" },
  { n: 4, key: "learn", desc: "outcomes feed the next pass" },
];

// the order layers are listed in the cross-link row
const ORDER = ["brainmode", "happytrails", "abrc", "phantomprd"];
const NAMES: Record<string, string> = {
  brainmode: "brainmode",
  happytrails: "happy trails",
  abrc: "abrc",
  phantomprd: "phantom prd",
};

export default function SystemLoopStrip({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const cfg = LAYERS[activeId];
  if (!cfg) return null;

  return (
    <section
      className="sys-loop"
      aria-label="the system behind this project"
      style={{ ["--sys-accent" as string]: cfg.accent }}
    >
      <p className="sys-loop-kicker">every project here runs the same loop</p>
      <ol className="sys-track">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="sys-node"
            data-active={s.n === cfg.activeStep ? "true" : undefined}
          >
            <span className="sys-step">0{s.n}</span>
            <strong>{s.key}</strong>
            <span className="sys-desc">{s.desc}</span>
          </li>
        ))}
      </ol>
      <p className="sys-layers">
        <span>this project = the <strong>{cfg.layer}</strong>. same loop, other layers:</span>
        {ORDER.map((id) => (
          <button
            key={id}
            className={`sys-layer-chip ${id === activeId ? "current" : ""}`}
            style={id === activeId ? { ["--sys-accent" as string]: cfg.accent } : undefined}
            onClick={() => id !== activeId && onSelect(id)}
            disabled={id === activeId}
          >
            {NAMES[id]} · {LAYERS[id].layer.replace(" layer", "")}
          </button>
        ))}
      </p>
    </section>
  );
}
