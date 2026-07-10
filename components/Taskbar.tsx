"use client";

import { useEffect, useState } from "react";

type TaskbarProps = {
  items: {
    id: string;
    title: string;
    icon?: React.ReactNode;
    isActive: boolean;
    isMinimized: boolean;
  }[];
  onItemClick: (id: string) => void;
  onStartClick: () => void;
};

export default function Taskbar({ items, onItemClick, onStartClick }: TaskbarProps) {
  // Start null so the server render and the first client render agree (empty),
  // then fill the clock in after mount — otherwise a minute rolling over
  // between SSR and hydration triggers a hydration mismatch.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const time = now
    ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "";

  return (
    <div className="xp-taskbar">
      <button className="xp-start-btn" onClick={onStartClick}>
        <span style={{ fontSize: 14 }}>🪟</span> start
      </button>
      <div className="flex-1 flex items-center overflow-x-auto px-1">
        {items.map((it) => (
          <button
            key={it.id}
            className={`xp-taskbar-item ${it.isActive && !it.isMinimized ? "active" : ""}`}
            onClick={() => onItemClick(it.id)}
            title={it.title}
          >
            {it.icon && <span>{it.icon}</span>}
            <span className="truncate">{it.title}</span>
          </button>
        ))}
      </div>
      <div className="xp-clock">🔊 {time}</div>
    </div>
  );
}
