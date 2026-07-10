"use client";

import { useState } from "react";

type Tab = "scorer" | "checkin";

type ScorerResult = {
  brainRotScore: number;
  brainGrowthScore: number;
  cognitiveLoad: string;
  sensoryOverwhelmFlags: string[];
  emotionalValence: string;
  verdict: string;
  rewriteSuggestion: string;
};

type StateResult = {
  state: string;
  confidence: number;
  reasoning: string;
  recommendedActivities: string[];
  avoidActivities: string[];
  ambient: { vibe: string; color: string };
};

export default function BrainLab() {
  const [tab, setTab] = useState<Tab>("scorer");

  return (
    <div className="-m-3">
      <div className="xp-addressbar">
        <span style={{ color: "#666" }}>Address</span>
        <input value="C:\Users\Mariah\ABRC\brain-lab" readOnly />
      </div>
      <div className="xp-tabs">
        <button
          className={`xp-tab ${tab === "scorer" ? "active" : ""}`}
          onClick={() => setTab("scorer")}
        >
          🪞 Cognitive Load Scorer
        </button>
        <button
          className={`xp-tab ${tab === "checkin" ? "active" : ""}`}
          onClick={() => setTab("checkin")}
        >
          🧭 Brain State Check-in
        </button>
      </div>
      <div
        className="bg-white border border-[#999] p-4"
        style={{ minHeight: 380 }}
      >
        {tab === "scorer" ? <Scorer /> : <CheckIn />}
      </div>
    </div>
  );
}

/* -------------------------------- Scorer -------------------------------- */

function Scorer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScorerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch("/api/cognitive-load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "request failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="serif" style={{ fontSize: 20 }}>
        🪞 cognitive load scorer
      </div>
      <p className="text-[12px] text-[#444] mt-1">
        paste anything — an article, social post, ad, your own draft — and
        Claude scores it through ABRC's neuro-design lens. brain rot vs. brain
        growth.
      </p>

      <textarea
        className="mt-3 w-full xp-inset"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="paste content here..."
        style={{ fontFamily: "inherit", fontSize: 12 }}
      />
      <div className="mt-2 flex gap-2 items-center">
        <button
          className="xp-btn"
          onClick={analyze}
          disabled={!text.trim() || loading}
        >
          {loading ? "scoring..." : "score it →"}
        </button>
        {error && (
          <span className="text-[11px] text-[#a44]" style={{ maxWidth: 380 }}>
            {error}
          </span>
        )}
      </div>

      {result && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Gauge
              label="🧠💀 brain rot"
              value={result.brainRotScore}
              color="#D94F3D"
            />
            <Gauge
              label="🌱 brain growth"
              value={result.brainGrowthScore}
              color="#4ca44c"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <KV label="cognitive load" value={result.cognitiveLoad} />
            <KV label="emotional valence" value={result.emotionalValence} />
          </div>

          {result.sensoryOverwhelmFlags?.length > 0 && (
            <div className="text-[12px]">
              <div className="font-bold">overwhelm flags</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {result.sensoryOverwhelmFlags.map((f) => (
                  <span
                    key={f}
                    className="px-1.5 py-0.5 bg-[#fff0e8] border border-[#D94F3D] text-[10px]"
                  >
                    🚩 {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-[#fff8e1] border border-[#e0c878] text-[12px]">
            <strong>verdict.</strong>
            <p className="mt-1">{result.verdict}</p>
          </div>

          <div className="p-3 bg-[#eef9ee] border border-[#9ec99e] text-[12px]">
            <strong>rewrite, ABRC-mode.</strong>
            <p className="mt-1 italic">{result.rewriteSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Gauge({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="border border-[#aca899] p-2 bg-[#f6f3e8]">
      <div className="text-[11px] font-bold">{label}</div>
      <div className="mt-1 h-3 bg-white border border-[#888] relative overflow-hidden">
        <div
          style={{
            width: `${value}%`,
            background: color,
            height: "100%",
            transition: "width 600ms ease",
          }}
        />
      </div>
      <div className="text-right text-[11px] mt-0.5">{value}/100</div>
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#aca899] p-2 bg-[#f6f3e8]">
      <div className="text-[10px] uppercase tracking-wide text-[#666]">
        {label}
      </div>
      <div className="font-bold mt-0.5">{value}</div>
    </div>
  );
}

/* ------------------------------- Check-in ------------------------------- */

function Slider({
  label,
  value,
  onChange,
  low,
  high,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  low: string;
  high: string;
}) {
  return (
    <div>
      <div className="text-[12px] font-bold">{label}</div>
      <input
        type="range"
        min={1}
        max={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-[#666]">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}

function CheckIn() {
  const [energy, setEnergy] = useState(3);
  const [valence, setValence] = useState(3);
  const [focus, setFocus] = useState(3);
  const [stress, setStress] = useState(3);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const timeOfDay = new Date().toLocaleTimeString([], {
        hour: "numeric",
        hour12: true,
      });
      const r = await fetch("/api/classify-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          energy,
          valence,
          focus,
          stress,
          timeOfDay,
          notes,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "request failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="serif" style={{ fontSize: 20 }}>
        🧭 90-second brain state check-in
      </div>
      <p className="text-[12px] text-[#444] mt-1">
        this is the same classifier that powers BrainMode. four sliders, one
        open note, Claude routes you to one of 6 cognitive states.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
        <Slider
          label="energy"
          value={energy}
          onChange={setEnergy}
          low="depleted"
          high="wired"
        />
        <Slider
          label="valence"
          value={valence}
          onChange={setValence}
          low="rough"
          high="great"
        />
        <Slider
          label="focus"
          value={focus}
          onChange={setFocus}
          low="scattered"
          high="locked in"
        />
        <Slider
          label="stress"
          value={stress}
          onChange={setStress}
          low="calm"
          high="overwhelmed"
        />
      </div>

      <div className="mt-4">
        <div className="text-[12px] font-bold">anything else? (optional)</div>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="xp-inset w-full mt-1"
          style={{ fontSize: 12, fontFamily: "inherit" }}
          placeholder="e.g. 'wrapped up a 2hr deep work block, brain feels foggy but happy'"
        />
      </div>

      <div className="mt-3 flex gap-2 items-center">
        <button className="xp-btn" onClick={submit} disabled={loading}>
          {loading ? "classifying..." : "route my brain →"}
        </button>
        {error && <span className="text-[11px] text-[#a44]">{error}</span>}
      </div>

      {result && (
        <div
          className="mt-4 p-4"
          style={{
            background: result.ambient.color + "22",
            border: `2px solid ${result.ambient.color}`,
          }}
        >
          <div className="text-[11px] uppercase tracking-widest text-[#555]">
            you're in...
          </div>
          <div
            className="serif"
            style={{ fontSize: 32, color: result.ambient.color }}
          >
            {result.state}
          </div>
          <div className="text-[11px] italic text-[#444]">
            confidence: {Math.round(result.confidence * 100)}% · vibe:{" "}
            {result.ambient.vibe}
          </div>
          <p className="mt-2 text-[12px]">{result.reasoning}</p>

          <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
            <div>
              <div className="font-bold">do these →</div>
              <ul className="list-disc pl-4 mt-1 space-y-0.5">
                {result.recommendedActivities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-bold">skip these ✗</div>
              <ul className="list-disc pl-4 mt-1 space-y-0.5">
                {result.avoidActivities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
