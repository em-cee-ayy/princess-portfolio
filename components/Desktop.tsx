"use client";

import { useEffect, useState } from "react";
import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import FriendlyTip from "./FriendlyTip";

import Welcome from "./windows/Welcome";
import WorkExplorer from "./windows/WorkExplorer";
import SystemMapWindow from "./windows/SystemMapWindow";
import GovernanceFramework from "./windows/GovernanceFramework";
import SOCiHighlights from "./windows/SOCiHighlights";
import SpillTheBeans from "./windows/SpillTheBeans";
import BrainLab from "./windows/BrainLab";
import Contact from "./windows/Contact";
import Resume from "./windows/Resume";
import AIMBuddyList from "./windows/AIMBuddyList";
import AIMChat from "./windows/AIMChat";
import WhatsNew from "./windows/WhatsNew";

type AppId =
  | "welcome"
  | "work"
  | "systemmap"
  | "governance"
  | "soci"
  | "spill"
  | "brainlab"
  | "contact"
  | "resume"
  | "aim-buddy"
  | "aim-chat"
  | "whatsnew";

type OpenWin = {
  id: AppId;
  zIndex: number;
  minimized: boolean;
};

const APP_META: Record<
  AppId,
  { title: string; icon: string; width?: number; height?: number; x?: number; y?: number }
> = {
  welcome: { title: "welcome", icon: "👋", width: 500, x: 80, y: 70 },
  work: { title: "work.explorer — Mariah's Portfolio", icon: "💼", width: 760, height: 560, x: 180, y: 80 },
  systemmap: { title: "System Map.exe", icon: "🗺️", width: 440, height: 380, x: 140, y: 90 },
  governance: { title: "governance.msc", icon: "🛡️", width: 780, height: 620, x: 160, y: 60 },
  soci: { title: "SOCi Highlights", icon: "🚀", width: 640, height: 540, x: 220, y: 100 },
  spill: { title: "Spill the Beans!", icon: "🫘", width: 520, height: 480, x: 260, y: 90 },
  brainlab: { title: "Brain Lab — ABRC", icon: "🧠", width: 700, height: 600, x: 200, y: 70 },
  contact: { title: "Contact", icon: "📧", width: 520, height: 380, x: 240, y: 110 },
  resume: { title: "Resume", icon: "📄", width: 720, height: 620, x: 220, y: 60 },
  "aim-buddy": { title: "AIM — Buddy List", icon: "🏃", width: 280, height: 420, x: 60, y: 80 },
  "aim-chat": { title: "IM with mariahtheoptimist", icon: "💬", width: 520, height: 560, x: 360, y: 90 },
  whatsnew: { title: "what's.new — Mariah's scrapbook", icon: "📓", width: 680, height: 580, x: 200, y: 80 },
};

const ICONS: { id: AppId; label: string; art: React.ReactNode }[] = [
  // portfolio cluster — the map sits next to the case studies it maps
  { id: "systemmap", label: "System.Map", art: <span>🗺️</span> },
  { id: "work", label: "work.explorer", art: <span>💼</span> },
  { id: "governance", label: "governance.msc", art: <span>🛡️</span> },
  { id: "soci", label: "SOCi.highlights", art: <span>🚀</span> },
  { id: "brainlab", label: "Brain.Lab", art: <span>🧠</span> },
  { id: "aim-buddy", label: "AIM.exe", art: <span>🏃</span> },
  { id: "whatsnew", label: "whats.new", art: <span>📓</span> },
  { id: "spill", label: "Spill.the.beans", art: <span>🫘</span> },
  { id: "resume", label: "Resume.doc", art: <span>📄</span> },
  { id: "contact", label: "Contact", art: <span>📧</span> },
  { id: "welcome", label: "READ.me", art: <span>📝</span> },
];

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWin[]>([
    { id: "welcome", zIndex: 10, minimized: false },
  ]);
  const [topZ, setTopZ] = useState(10);
  const [startOpen, setStartOpen] = useState(false);
  const [tipOpen, setTipOpen] = useState(true);
  const [workFocus, setWorkFocus] = useState<string | undefined>(undefined);
  // Render the date only after mount so SSR (server timezone) and client
  // (visitor timezone) can't disagree and trip a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Open work.explorer focused on a specific case study (used by System Map).
  function openProject(projectId: string) {
    setWorkFocus(projectId);
    open("work");
  }

  function open(id: AppId) {
    setOpenWindows((prev) => {
      const z = topZ + 1;
      setTopZ(z);
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: z, minimized: false } : w,
        );
      }
      return [...prev, { id, zIndex: z, minimized: false }];
    });
  }

  function close(id: AppId) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }

  function focus(id: AppId) {
    setOpenWindows((prev) => {
      const z = topZ + 1;
      setTopZ(z);
      return prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w));
    });
  }

  function minimize(id: AppId) {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
  }

  function taskbarClick(id: string) {
    const w = openWindows.find((x) => x.id === id);
    if (!w) return;
    if (w.minimized) {
      open(id as AppId);
    } else if (w.zIndex === topZ) {
      minimize(id as AppId);
    } else {
      focus(id as AppId);
    }
  }

  const activeId = [...openWindows]
    .filter((w) => !w.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

  return (
    <>
      <div className="bliss-bg" />

      {/* Top menu bar — Contact / Resume shortcuts like the reference */}
      <div className="xp-topbar">
        <span style={{ marginRight: 12 }}>🖥️</span>
        <button onClick={() => open("contact")}>Contact</button>
        <button onClick={() => open("resume")}>Resume</button>
        <div style={{ marginLeft: "auto", fontWeight: "normal", fontSize: 11 }}>
          🎨 ▼ &nbsp; {mounted ? new Date().toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) : ""}
        </div>
      </div>

      {/* Desktop icon grid (right side, like reference) */}
      <div
        className="fixed flex flex-col gap-1"
        style={{ right: 20, top: 40, zIndex: 1 }}
      >
        {ICONS.map((ic, i) => (
          <DesktopIcon
            key={i}
            label={ic.label}
            art={ic.art}
            onOpen={() => open(ic.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((w) => {
        if (w.minimized) return null;
        const meta = APP_META[w.id];
        return (
          <Window
            key={w.id}
            id={w.id}
            title={meta.title}
            icon={meta.icon}
            initialX={meta.x}
            initialY={meta.y}
            width={meta.width}
            height={meta.height}
            isActive={w.id === activeId}
            zIndex={w.zIndex}
            onFocus={() => focus(w.id)}
            onClose={() => close(w.id)}
            onMinimize={() => minimize(w.id)}
          >
            {renderApp(w.id, open, openProject, workFocus)}
          </Window>
        );
      })}

      {/* Friendly tip popup */}
      <FriendlyTip
        open={tipOpen}
        onOk={() => {
          setTipOpen(false);
          open("work");
        }}
        onCancel={() => setTipOpen(false)}
      />

      {/* Start menu */}
      <StartMenu
        open={startOpen}
        onClose={() => setStartOpen(false)}
        onOpenApp={(id) => open(id as AppId)}
      />

      {/* Taskbar */}
      <Taskbar
        items={openWindows.map((w) => ({
          id: w.id,
          title: APP_META[w.id].title,
          icon: APP_META[w.id].icon,
          isActive: w.id === activeId,
          isMinimized: w.minimized,
        }))}
        onItemClick={taskbarClick}
        onStartClick={() => setStartOpen((s) => !s)}
      />
    </>
  );
}

function renderApp(
  id: AppId,
  open: (id: AppId) => void,
  openProject: (projectId: string) => void,
  workFocus?: string,
) {
  switch (id) {
    case "welcome":
      return <Welcome onOpenWork={() => open("work")} />;
    case "work":
      return (
        <WorkExplorer
          focusId={workFocus}
          onOpenApp={(id) => open(id as AppId)}
        />
      );
    case "systemmap":
      return <SystemMapWindow onOpen={openProject} />;
    case "governance":
      return <GovernanceFramework onOpenApp={() => openProject("phantomprd")} />;
    case "soci":
      return <SOCiHighlights />;
    case "spill":
      return <SpillTheBeans />;
    case "brainlab":
      return <BrainLab />;
    case "contact":
      return <Contact />;
    case "resume":
      return <Resume />;
    case "aim-buddy":
      return <AIMBuddyList onOpenChat={() => open("aim-chat")} />;
    case "aim-chat":
      return <AIMChat onOpenApp={(appId) => open(appId as AppId)} />;
    case "whatsnew":
      return <WhatsNew />;
  }
}
