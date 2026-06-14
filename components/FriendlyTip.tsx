"use client";

type Props = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export default function FriendlyTip({ open, onOk, onCancel }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed"
      style={{
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    >
      <div className="dialog-box">
        <div
          className="xp-titlebar"
          style={{ cursor: "default", height: 22 }}
        >
          <span>Friendly Tip</span>
          <button className="xp-titlebar-btn" onClick={onCancel}>
            x
          </button>
        </div>
        <div className="p-4 flex gap-3 items-center" style={{ background: "#ece9d8" }}>
          <div style={{ fontSize: 36 }}>💾</div>
          <div style={{ fontSize: 12, maxWidth: 280 }}>
            Psst! Check out{" "}
            <button
              onClick={onOk}
              className="xp-link"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#0a3cc4", textDecoration: "underline" }}
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
