"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, Sparkles, Zap } from "lucide-react";

import { MobileNav } from "@/components/shell/mobile-nav";
import { Notifications } from "@/components/shell/notifications";
import { Brand } from "@/components/shell/sidebar";
import { formatNumber } from "@/lib/format";
import { activity, credits, school, teacher } from "@/lib/mock/teacher-data";

/**
 * PRD §8 — search, notifications, profile, and the two numbers a teacher
 * wants before pressing anything. It rides on the canvas instead of a bar of
 * its own: the rail is the only hard edge in the shell, which is what keeps
 * the workspace from reading as an admin console.
 */
export function Topbar() {
  const router = useRouter();
  const pct = Math.round((credits.remaining / credits.total) * 100);
  const low = pct <= 20;

  return (
    <header className="sticky top-0 z-30 bg-sheet/92 backdrop-blur-xl shadow-[0_1px_8px_rgb(11_28_48_/_0.06)]">
      <div className="flex w-full items-center gap-2 px-4 py-3 sm:px-6">
        <MobileNav footer={<p className="text-[12px] text-muted">{school.name}</p>} />

        <div className="lg:hidden">
          <Brand />
        </div>

        <div className="hidden max-w-[18rem] flex-1 items-center gap-2 overflow-hidden text-faint lg:flex">
          <span className="text-[12.5px] text-muted">Learnsphere / Panel Guru</span>
        </div>

        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const query = String(
              new FormData(event.currentTarget).get("q") ?? "",
            ).trim();
            router.push(
              query ? `/students?q=${encodeURIComponent(query)}` : "/students",
            );
          }}
          className="relative hidden w-full max-w-sm sm:block"
        >
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint"
          />
          <input
            type="search"
            name="q"
            placeholder="Cari bank soal, nama siswa, atau dokumen…"
            aria-label="Cari"
            // React attaches this attribute when it wires the form's onSubmit
            // listener during hydration, so the SSR markup must already carry
            // it — otherwise the server HTML and the hydrated DOM disagree.
            data-has-listeners="true"
            className="h-10 w-full rounded-[var(--radius-control)] border border-rule bg-paper-deep pl-9 pr-3 text-[13.5px] text-ink transition-colors hover:bg-sheet focus:border-primary/40 focus:bg-sheet"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-sky px-2.5 py-1 text-[11.5px] font-semibold text-sky-ink sm:inline-flex">
            Kurikulum Merdeka 2026 Aktif
          </span>

          <Link
            href="/ai"
            title="Buat soal dengan AI"
            className="hidden items-center gap-2 rounded-[var(--radius-control)] bg-primary px-3 py-1.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-primary-deep sm:inline-flex"
          >
            <Sparkles aria-hidden className="size-4" />
            Buat Soal Baru
          </Link>

          <Link
            href="/credits"
            title="Kredit AI"
            className="hidden items-center gap-2 rounded-full border border-rule bg-paper-deep py-1.5 pr-3 pl-2 transition-colors hover:bg-sheet sm:flex"
          >
            <Zap
              aria-hidden
              className={low ? "size-4 text-amber" : "size-4 text-primary"}
            />
            <span className="figures text-[12.5px] font-medium text-ink">
              {formatNumber(credits.remaining)}
              <span className="font-normal text-muted">
                {" "}
                / {formatNumber(credits.total)}
              </span>
            </span>
            <span className="text-[12.5px] text-muted">kredit</span>
          </Link>

          <Notifications entries={activity} />

          <Link
            href="/settings"
            title={`${teacher.name} · ${teacher.role} ${teacher.subject}`}
            className="flex items-center gap-2.5 rounded-full border border-rule bg-paper-deep py-1 pr-3.5 pl-1 transition-colors hover:bg-sheet"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11.5px] font-semibold text-primary-ink">
              {teacher.initials}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[12.5px] font-medium text-ink">
                {teacher.name}
              </span>
              <span className="block text-[11px] text-muted">
                {teacher.role} {teacher.subject}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}