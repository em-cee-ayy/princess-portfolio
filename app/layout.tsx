import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mariah.exe — Portfolio",
  description:
    "Mariah Anderson — Sr. Product Engineer building toward AI Technical Product Leadership. I build products that treat cognitive state as a first-class input.",
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
