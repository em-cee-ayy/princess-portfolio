import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Princess.exe — Portfolio",
  description:
    "Princess (Mariah) Anderson — Sr. Product Engineer building toward AI Technical Product Leadership. Psych-powered, AI-native, brain-friendly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
