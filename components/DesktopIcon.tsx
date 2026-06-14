"use client";

import { useState } from "react";

type IconProps = {
  label: string;
  art: React.ReactNode;
  onOpen: () => void;
};

export default function DesktopIcon({ label, art, onOpen }: IconProps) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`desktop-icon ${selected ? "selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
      onDoubleClick={onOpen}
      onBlur={() => setSelected(false)}
      tabIndex={0}
    >
      <div className="icon-art">{art}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
}
