import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

// Display — closest free match to the reference's Canela/Ogg-like editorial serif.
// Playfair keeps the high contrast and refined oldstyle curves without Bodoni's rigidity.
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fellwind — Brand systems with motion and memory",
  description:
    "Fellwind is an editorial creative studio for identity, digital products, and launch systems with a point of view.",
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={display.variable}
    >
      <body>{children}</body>
    </html>
  );
}
