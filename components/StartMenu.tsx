"use client";

type StartMenuProps = {
  open: boolean;
  onClose: () => void;
  onOpenApp: (id: string) => void;
};

const APPS: { id: string; label: string; icon: string }[] = [
  { id: "systemmap", label: "System Map", icon: "🗺️" },
  { id: "work", label: "work.explorer", icon: "💼" },
  { id: "governance", label: "governance.msc", icon: "🛡️" },
  { id: "soci", label: "SOCi Highlights", icon: "🚀" },
  { id: "brainlab", label: "Brain Lab", icon: "🧠" },
  { id: "aim-buddy", label: "AIM (chat with me)", icon: "🏃" },
  { id: "whatsnew", label: "what's.new", icon: "📓" },
  { id: "spill", label: "Spill the Beans", icon: "🫘" },
  { id: "welcome", label: "Welcome", icon: "👋" },
  { id: "contact", label: "Contact", icon: "📧" },
  { id: "resume", label: "Resume", icon: "📄" },
];

export default function StartMenu({ open, onClose, onOpenApp }: StartMenuProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0"
        style={{ zIndex: 9997 }}
        onClick={onClose}
      />
      <div
        className="fixed xp-startmenu"
        style={{
          left: 0,
          bottom: "var(--taskbar-h, 30px)",
          width: "min(320px, calc(100vw - 16px))",
          zIndex: 9998,
          border: "1px solid #0831d9",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
          background: "#ece9d8",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, #1f5fcc 0%, #245edc 50%, #1941a5 100%)",
            color: "#fff",
            padding: "10px 12px",
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: 14,
            textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
          }}
        >
          mariah
          <div style={{ fontSize: 10, fontStyle: "normal", opacity: 0.85 }}>
            sr. product engineer · soci · abrc
          </div>
        </div>
        <div className="p-1.5">
          {APPS.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                onOpenApp(a.id);
                onClose();
              }}
              className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-[#0a4ec3] hover:text-white rounded-sm"
              style={{ fontSize: 12 }}
            >
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              <span>{a.label}</span>
            </button>
          ))}
          <div className="border-t border-[#aca899] my-1" />
          <button
            onClick={onClose}
            className="w-full text-left px-3 py-1.5 hover:bg-[#0a4ec3] hover:text-white rounded-sm"
            style={{ fontSize: 12 }}
          >
            <span style={{ fontSize: 18 }}>⎋</span>  close menu
          </button>
        </div>
      </div>
    </>
  );
}
