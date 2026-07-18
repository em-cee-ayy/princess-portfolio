"use client";

import { useState } from "react";

type IconProps = {
  label: string;
  art: React.ReactNode;
  onOpen: () => void;
  style?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent) => void;
  dragging?: boolean;
  /** Mobile: open on a single tap instead of double-click. */
  singleTap?: boolean;
};

export default function DesktopIcon({
  label,
  art,
  onOpen,
  style,
  onMouseDown,
  dragging,
  singleTap,
}: IconProps) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`desktop-icon ${selected ? "selected" : ""}`}
      style={{ cursor: dragging ? "grabbing" : "grab", ...style }}
      onMouseDown={onMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
        if (singleTap) onOpen();
      }}
      onDoubleClick={singleTap ? undefined : onOpen}
      onBlur={() => setSelected(false)}
      tabIndex={0}
    >
      <div className="icon-art">{art}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
}
