"use client";

import { useState } from "react";

/**
 * The Happy Trails interactive mockup suite, embedded from its own Vercel
 * deployment. The suite is a separate Vite/React app - iframing the live
 * URL keeps the two stacks (React 19/Tailwind 4 vs 18/3) fully decoupled.
 */

const SUITE_URL = "https://happy-trails-portfolio-app.vercel.app/";

export default function HappyTrails() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="-m-3 flex flex-col" style={{ height: "calc(100% + 24px)" }}>
      <div
        className="flex items-center justify-between px-2 py-1 text-[11px]"
        style={{ background: "#ece9d8", borderBottom: "1px solid #999" }}
      >
        <span>🥾 Happy Trails AI - interactive mockup suite (live)</span>
        <a
          href={SUITE_URL}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#0a3cc4", textDecoration: "underline" }}
        >
          pop out full screen ↗
        </a>
      </div>
      {failed ? (
        <div className="flex-1 flex items-center justify-center p-6 text-center text-[12px]">
          <p>
            hmm, the suite didn&apos;t load in here.{" "}
            <a
              href={SUITE_URL}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#0a3cc4", textDecoration: "underline" }}
            >
              open it in a new tab instead ↗
            </a>
          </p>
        </div>
      ) : (
        <iframe
          src={SUITE_URL}
          title="Happy Trails AI interactive mockup suite"
          className="flex-1 w-full"
          style={{ border: "none", minHeight: 0 }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
