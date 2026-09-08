import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

import "./globals.css";

/**
 * Plus Jakarta Sans carries the interface — an Indonesian typeface drawn for
 * Jakarta's city identity, so the product sounds local before it says a word.
 * Inter handles labels, tabular data, AI audit badges, and the exam-mono slot,
 * where vertical alignment and zero-ambiguity glyphs matter most.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Learnsphere",
    template: "%s · Learnsphere",
  },
  description:
    "Buat soal ujian, raport, absensi, dan portofolio siswa dalam hitungan menit. Dibuat untuk guru Indonesia.",
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${inter.variable} bg-surface text-on-surface dark`}>
      <head>
        {/* No-flash: apply the saved/system theme before the first paint.
          Dark is the default; only switch to light if the user explicitly saved it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=s==="dark"||(s!=="light"&&d);document.documentElement.classList.toggle("dark",dark)}catch(e){}})();`,
          }}
        />
        {/* Material Symbols Outlined — the reference design's icon set. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
