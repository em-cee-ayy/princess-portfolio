"use client";

import { useEffect, useState } from "react";

/**
 * The one switch for the adaptive XP shell: below 768px or on touch-first
 * devices the desktop keeps its chrome but drops the desktop-only physics
 * (dragging, overlap, double-click). SSR renders desktop (false) and the
 * client corrects after mount - same pattern the desktop uses for the clock.
 */
const QUERY = "(max-width: 767px), (pointer: coarse)";

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
