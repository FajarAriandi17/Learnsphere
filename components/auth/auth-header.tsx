import Link from "next/link";

import { Icon } from "@/components/ui/icon";

const CHROME_LINKS = [
  { label: "Pusat Bantuan Guru", href: "/help", compact: true },
  { label: "Sudah Punya Akun? Masuk", href: "/login", compact: true },
];

/**
 * Auth chrome header. Deliberately lighter than the marketing header: the
 * logo, two accreditation chips, an escape hatch back to the login page,
 * and nothing else that could pull a teacher out of the sign-in flow.
 */
export function AuthHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-surface-card/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-deep text-on-primary shadow-[0_2px_6px_rgba(0,104,95,0.25)]">
              <Icon name="public" className="text-[20px]" />
            </span>
            <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-primary">
              Learn<span className="text-primary-deep">sphere</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <span className="inline-flex items-center rounded-lg bg-surface-container-high px-2 py-1 font-label-sm text-label-sm font-medium text-kurikulum-merdeka">
              Kurikulum Merdeka 2025/2026
            </span>
            <span className="inline-flex items-center rounded-lg bg-surface-container px-2 py-1 font-label-sm text-label-sm font-medium text-kurikulum-k13">
              Kemendikdasmen Terstandar
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-3 sm:gap-4">
            {CHROME_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface ${
                  link.compact ? "" : "hidden sm:inline"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-[0_1px_3px_0_rgb(15_23_42/0.05)]">
            <Icon name="person" className="text-[18px] text-on-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
