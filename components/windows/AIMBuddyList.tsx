"use client";

import { useEffect } from "react";
import { playSignOn } from "@/lib/aimSounds";

type Props = {
  onOpenChat: () => void;
};

export default function AIMBuddyList({ onOpenChat }: Props) {
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
              available · "stop rotting, start living"
            </div>
          </div>
        </div>
      </div>

      {/* Buddy List proper */}
      <div className="p-2" style={{ background: "#fff8d6", minHeight: 220 }}>
        <div
          className="px-2 py-1 text-[11px] font-bold flex items-center justify-between"
          style={{ background: "#FFE680", borderBottom: "1px solid #c79200" }}
        >
          <span>▼ Buddies (1/1)</span>
          <span className="text-[10px] italic">online</span>
        </div>

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
      </div>

      {/* Bottom IM button bar */}
      <div
        className="p-2 flex justify-center gap-2"
        style={{ background: "#FFCC33", borderTop: "1px solid #c79200" }}
      >
        <button className="xp-btn" onClick={onOpenChat}>
          💬 IM
        </button>
        <button className="xp-btn" onClick={onOpenChat}>
          ℹ️ Info
        </button>
      </div>
    </div>
  );
}
