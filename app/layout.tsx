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
  metadataBase: new URL("https://fellwind.example.com"),
  title: "Fellwind — Launches the market can't ignore",
  description:
    "Fellwind is an editorial creative studio building identity systems and launch worlds that turn sharp products into the thing everyone's talking about. Book a free 30-minute call.",
  openGraph: {
    title: "Fellwind — Launches the market can't ignore",
    description:
      "Identity systems and launch worlds for sharp products. Book a free 30-minute call.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
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
