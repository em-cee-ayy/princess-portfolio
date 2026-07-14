"use client";

import { useEffect, useRef, useState } from "react";

type WindowProps = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number | string;
  height?: number | string;
  isActive: boolean;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize?: () => void;
  children: React.ReactNode;
};

export default function Window({
  id,
  title,
  icon,
  initialX = 80,
  initialY = 60,
  width = 640,
  height,
  isActive,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  children,
}: WindowProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [maximized, setMaximized] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

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
    if (maximized) return;
    onFocus();
    // Keep the "grabbing" hand for the whole drag, even when the pointer
    // strays off the 22px titlebar onto the window body or desktop.
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    };
  }

  const style: React.CSSProperties = maximized
    ? {
        top: 22,
        left: 0,
        right: 0,
        bottom: 30,
        width: "auto",
        height: "auto",
        position: "fixed",
        zIndex,
      }
    : {
        top: pos.y,
        left: pos.x,
        width,
        height,
        position: "fixed",
        zIndex,
      };

  return (
    <div
      className="xp-window flex flex-col"
      style={style}
      onMouseDown={onFocus}
      data-window-id={id}
    >
      <div
        className={`xp-titlebar ${isActive ? "" : "inactive"}`}
        onMouseDown={startDrag}
        onDoubleClick={() => setMaximized((m) => !m)}
      >
        <div className="flex items-center gap-1.5 truncate">
          {icon && <span className="text-base leading-none">{icon}</span>}
          <span className="truncate">{title}</span>
        </div>
        <div className="flex">
          {onMinimize && (
            <button
              className="xp-titlebar-btn min"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              aria-label="Minimize"
            >
              _
            </button>
          )}
          <button
            className="xp-titlebar-btn max"
            onClick={(e) => {
              e.stopPropagation();
              setMaximized((m) => !m);
            }}
            aria-label="Maximize"
          >
            □
          </button>
          <button
            className="xp-titlebar-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto xp-content" style={{ minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}
