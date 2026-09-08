import { ThemeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";

import { Icon } from "./icon";

const NAV_LINKS = [
  { label: "Solusi Guru", href: "#solusi-guru" },
  { label: "Bank & Kisi-Kisi", href: "#fitur-utama" },
  { label: "Raport & Absensi", href: "#demo-simulator" },
  { label: "Biaya Langganan", href: "#harga" },
  { label: "FAQ", href: "#faq" },
];

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kurikulum-k13 to-kurikulum-k13-dark text-on-primary shadow-sm transition-transform group-hover:scale-105">
        <Icon name="public" className="text-[22px]" />
      </span>
      <span
        className={`text-xl font-extrabold tracking-tight ${inverted ? "text-on-surface" : "text-on-surface"}`}
      >
        Learn<span className="text-kurikulum-k13">sphere</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-[37px] z-40 w-full border-b border-border-subtle bg-surface-card/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav className="hidden items-center gap-6 text-sm font-semibold text-on-surface-variant xl:flex">
          {NAV_LINKS.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-kurikulum-k13"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kurikulum-sync"
            className="flex items-center gap-1 transition-colors hover:text-kurikulum-k13"
          >
            <span>Kurikulum Merdeka &amp; K13</span>
            <span className="rounded bg-surface-container-low px-1.5 py-0.5 text-[10px] font-bold text-kurikulum-merdeka">
              Fase A-F
            </span>
          </a>
          {NAV_LINKS.slice(3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-kurikulum-k13"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden px-3 py-2 text-sm font-semibold text-on-surface transition-colors hover:text-kurikulum-k13 sm:inline-flex"
          >
            Masuk Akun
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-xl bg-kurikulum-k13 px-4 py-2.5 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-kurikulum-k13-dark hover:shadow sm:px-5"
          >
            <Icon name="bolt" className="text-[18px]" />
            <span>Coba Gratis 50 Token</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
