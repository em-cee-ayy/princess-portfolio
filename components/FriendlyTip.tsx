"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export default function FriendlyTip({ open, onOk, onCancel }: Props) {
  // null = not yet positioned; falls back to the centered default until dragged
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPos({
        x: Math.max(0, dragRef.current.origX + dx),
        y: Math.max(22, dragRef.current.origY + dy),
      });
    }
    function handleUp() {
      if (dragRef.current) {
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        setDragging(false);
      }
      dragRef.current = null;
    }
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  function startDrag(e: React.MouseEvent) {
    const rect = boxRef.current?.getBoundingClientRect();
    const origX = pos?.x ?? rect?.left ?? 0;
    const origY = pos?.y ?? rect?.top ?? 0;
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    setDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX, origY };
  }

  if (!open) return null;

  // Before the first drag, keep the original centered placement.
  const style: React.CSSProperties = pos
    ? { top: pos.y, left: pos.x, zIndex: 9999 }
    : { bottom: 100, left: "50%", transform: "translateX(-50%)", zIndex: 9999 };

  return (
    <div ref={boxRef} className="fixed" style={style}>
      <div className="dialog-box">
        <div
          className="xp-titlebar"
          style={{ cursor: dragging ? "grabbing" : "grab" }}
          onMouseDown={startDrag}
        >
          <span>Friendly Tip</span>
          <button
            className="xp-titlebar-btn"
            onClick={onCancel}
            onMouseDown={(e) => e.stopPropagation()}
          >
            x
          </button>
        </div>
        <div className="p-4 flex gap-3 items-center" style={{ background: "#ece9d8" }}>
          <div style={{ fontSize: 36 }}>💾</div>
          <div style={{ fontSize: 13, maxWidth: 280 }}>
            Psst! Check out{" "}
            <button
              onClick={onOk}
              className="xp-link"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--xp-link)", textDecoration: "underline" }}
            >
              work.explorer
            </button>{" "}
            for a more traditional portfolio view.
          </div>
        </div>
        <div
          className="flex justify-end gap-2 p-2"
          style={{ borderTop: "1px solid #aca899", background: "#ece9d8" }}
        >
          <button className="xp-btn" onClick={onOk}>
            OK
          </button>
          <button className="xp-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
