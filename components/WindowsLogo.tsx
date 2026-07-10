"use client";

/**
 * The classic 4-pane Windows "flag in the wind" logo, as inline SVG so we
 * don't depend on an image asset. Colors are the classic 4-color set; the
 * slight upward tilt to the right gives the waving-flag feel.
 */
export default function WindowsLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path fill="#F65314" d="M4 8.5 L22 6.5 L22 22.5 L4 23.5 Z" />
      <path fill="#7CBB00" d="M26 6 L45 4 L45 21 L26 22 Z" />
      <path fill="#00A1F1" d="M4 25.5 L22 24.5 L22 41 L4 43 Z" />
      <path fill="#FFBB00" d="M26 24 L45 23 L45 41 L26 42 Z" />
    </svg>
  );
}
