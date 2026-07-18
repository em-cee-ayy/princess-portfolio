"use client";

import { useState } from "react";
import { trivia } from "@/lib/trivia";

export default function SpillTheBeans() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = trivia[idx];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (idx + 1 >= trivia.length) {
      setDone(true);
      return;
    }
    setIdx(idx + 1);
    setPicked(null);
  }

  function restart() {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((score / trivia.length) * 100);
    const verdict =
      pct === 100
        ? "🪩 you're basically my best friend. iconic behavior."
        : pct >= 75
          ? "✨ you've been paying attention. respect."
          : pct >= 50
            ? "🌱 not bad! but go scroll my LinkedIn friend."
            : "🫠 we are strangers. let's fix that. hit me up!";

    return (
      <div className="text-center p-6">
        <div className="serif" style={{ fontSize: 28 }}>
          🫘 results are in!
        </div>
        <div className="mt-3 serif" style={{ fontSize: 48 }}>
          {score} / {trivia.length}
        </div>
        <div className="mt-2 text-[14px]">{pct}%</div>
        <div className="mt-4 text-[13px] italic">{verdict}</div>
        <button className="xp-btn mt-6" onClick={restart}>
          play again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="serif" style={{ fontSize: 18 }}>
        🫘 Spill the Beans!
      </div>
      <div className="text-[11px] text-[#666] mt-1">
        question {idx + 1} of {trivia.length} · score {score}
      </div>

      <div
        className="mt-5 serif"
        style={{ fontSize: 20, lineHeight: 1.2, padding: "0 12px" }}
      >
        {q.q}
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 px-4">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.answer;
          let style: React.CSSProperties = {};
          if (picked !== null) {
            if (isCorrect)
              style = { background: "#d4f4d4", borderColor: "#4ca44c" };
            else if (isPicked)
              style = { background: "#f7d4d4", borderColor: "#a44c4c" };
          }
          return (
            <button
              key={i}
              className="xp-btn"
              style={{ padding: "12px 8px", ...style }}
              onClick={() => pick(i)}
              disabled={picked !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-5 mx-4 p-3 border border-[#aca899] bg-[#fff8e1] text-[12px] text-left">
          <strong>
            {picked === q.answer ? "✅ correct!" : "❌ not quite."}
          </strong>
          <div className="mt-1">{q.reveal}</div>
          <div className="text-right mt-2">
            <button className="xp-btn" onClick={next}>
              {idx + 1 >= trivia.length ? "see results →" : "next →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
