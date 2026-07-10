/**
 * Programmatic AIM-style sound effects using Web Audio API.
 * No external audio files needed — synthesized on the fly so we don't
 * have to ship copyrighted .wav clips. Returns void if AudioContext unavailable.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  return ctx;
}

function tone(freq: number, dur: number, startOffset = 0, type: OscillatorType = "sine", gain = 0.18) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + startOffset;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

// Boot chime: a warm ascending "power-on" fanfare — an homage to the Windows
// startup sound, synthesized (no copyrighted clip shipped).
export function playStartup() {
  // low warm pad underneath
  tone(261.63, 1.6, 0.0, "sine", 0.10); // C4
  tone(392.0, 1.6, 0.0, "sine", 0.09); // G4
  // ascending shimmer on top
  tone(523.25, 1.2, 0.12, "triangle", 0.12); // C5
  tone(659.25, 1.1, 0.34, "triangle", 0.12); // E5
  tone(783.99, 1.3, 0.56, "triangle", 0.13); // G5
  tone(1046.5, 1.6, 0.78, "sine", 0.12); // C6
}

// AIM sign-on: classic "doot-doot-doot-DOOT" ascending chime
export function playSignOn() {
  tone(523.25, 0.12, 0.0, "triangle"); // C5
  tone(659.25, 0.12, 0.12, "triangle"); // E5
  tone(783.99, 0.12, 0.24, "triangle"); // G5
  tone(1046.5, 0.3, 0.36, "triangle", 0.22); // C6
}

// IM received: short "boop"
export function playMessage() {
  tone(880, 0.08, 0.0, "sine", 0.15);
  tone(1318.5, 0.08, 0.06, "sine", 0.12);
}

// IM sent: lighter "tap"
export function playSent() {
  tone(660, 0.04, 0, "sine", 0.08);
}

// Door close / sign-off: descending
export function playSignOff() {
  tone(880, 0.1, 0, "triangle");
  tone(659.25, 0.1, 0.1, "triangle");
  tone(440, 0.2, 0.2, "triangle");
}
