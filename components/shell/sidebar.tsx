import Link from "next/link";
import { BadgeCheck, LogOut, Zap } from "lucide-react";

import { signOutAndRedirect } from "@/app/actions/auth";
import { NavList } from "@/components/shell/nav-list";
import { formatNumber } from "@/lib/format";
import {
  activePeriod,
  credits,
  school,
  teacher,
} from "@/lib/mock/teacher-data";
import { cn } from "@/lib/utils";

/**
 * The wordmark, typographic and nothing else. "AI" is set smaller and in the
 * primary so the name reads as one word rather than two.
 */
export function Brand({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/dashboard"
      className={cn("inline-flex items-baseline gap-1", className)}
    >
      <span
        className={cn(
          "text-[19px] leading-none font-bold tracking-[-0.03em]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        Learn
      </span>
      <span
        className={cn(
          "text-[13px] leading-none font-semibold",
          tone === "light" ? "text-sky" : "text-primary",
        )}
      >
        sphere
      </span>
    </Link>
  );
}

/**
 * The AI quota, as a card rather than a number. A teacher decides whether to
 * generate now or trim the request before pressing anything, so the balance
 * sits at the bottom of the rail where it is always in view.
 */
export function QuotaCard() {
  const used = credits.total - credits.remaining;
  const pct = Math.round((used / credits.total) * 100);

  return (
    <div className="rounded-[var(--radius-sheet)] bg-canvas-high p-3">
      <div className="flex items-center gap-2">
        <Zap aria-hidden className="size-4 shrink-0 text-primary-ink" />
        <span className="text-[12.5px] font-semibold text-ink">
          Paket {credits.plan}
        </span>
        <span className="ml-auto rounded-full bg-lemon px-2 py-0.5 text-[10.5px] font-semibold text-lemon-ink">
          Aktif
        </span>
      </div>

      <p className="mt-3 flex items-baseline justify-between text-[11.5px] text-muted">
        Kuota AI bulan ini
        <span className="figures font-semibold text-ink">
          {formatNumber(used)} / {formatNumber(credits.total)}
        </span>
      </p>

      <span
        role="meter"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={credits.total}
        aria-label="Kuota AI terpakai bulan ini"
        className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white"
      >
        <span
          className="block h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </span>

      <Link
        href="/billing"
        className="mt-3 flex h-9 items-center justify-center rounded-[var(--radius-control)] bg-primary text-[12.5px] font-semibold text-white transition-colors hover:bg-primary-deep"
      >
        Upgrade ke Pro
      </Link>
    </div>
  );
}

/**
 * The rail: a white panel on the slate canvas, separated by shadow rather than
 * a border. It carries the teacher's context at the top (which school, which
 * term), the modules in the middle, and the two things they act on without
 * navigating — quota and their own account — at the bottom.
 */
export function Sidebar() {
  return (
    <div className="rail flex h-full flex-col overflow-hidden rounded-[var(--radius-rail)] shadow-rail">
      <div className="px-4 pt-5 pb-4">
        <Brand />

        <div className="mt-4 rounded-[var(--radius-control)] bg-paper-deep px-3 py-2.5">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
            <span className="truncate">{school.name}</span>
            <BadgeCheck
              aria-hidden
              className="size-3.5 shrink-0 text-primary"
            />
          </p>
          <p className="mt-0.5 text-[11px] text-muted">
            T.A. {activePeriod.academicYear} · Sem {activePeriod.semester}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2.5 pb-4">
        <NavList />
      </div>

      <div className="border-t border-rule px-3 py-3">
        <QuotaCard />

        <div className="mt-2 flex items-center gap-2.5 rounded-[var(--radius-control)] px-1 py-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[12px] font-semibold text-primary-ink">
            {teacher.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium text-ink">
              {teacher.name}
            </span>
            <span className="block truncate text-[11.5px] text-muted">
              {teacher.role} {teacher.subject}
            </span>
          </span>
          <form action={signOutAndRedirect}>
            <button
              type="submit"
              title="Keluar"
              className="flex size-8 items-center justify-center rounded-[var(--radius-control)] text-faint transition-colors hover:bg-paper-deep hover:text-ink"
            >
              <LogOut aria-hidden className="size-4" />
              <span className="sr-only">Keluar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
