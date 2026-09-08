"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Sheet } from "@/components/ui/sheet";
import { activityIcons, activityLabel, activityTint } from "@/lib/activity";
import { formatPercent, formatRelative } from "@/lib/format";
import type { HighlightStatus } from "@/lib/mock/teacher-data";
import type { ActivityKind } from "@/types";
import { cn } from "@/lib/utils";

export interface RosterRow {
  id: string;
  name: string;
  initials: string;
  nis: string;
  className: string;
  kind: ActivityKind;
  activity: string;
  at: string;
  status: HighlightStatus;
  average: number;
  attendance: number;
  note: string;
}

const statusLook: Record<
  HighlightStatus,
  { label: string; tone: "tuntas" | "sky" | "amber" }
> = {
  tuntas: { label: "Tuntas", tone: "tuntas" },
  proses: { label: "Proses", tone: "sky" },
  perhatian: { label: "Perhatian", tone: "amber" },
};

/**
 * PRD §13 — the roster on the left, the detail of whatever is selected on the
 * right. Selection is local state because nothing here is a navigation: the
 * teacher is scanning, and a full page load per row would break that.
 */
export function RosterSplit({ rows }: { rows: RosterRow[] }) {
  const [selectedId, setSelectedId] = React.useState(rows[0]?.id ?? "");
  const selected = rows.find((row) => row.id === selectedId) ?? rows[0];

  return (
    <div className="grid gap-3 xl:grid-cols-[1.3fr_1fr]">
      <Sheet className="overflow-hidden">
        <div className="flex items-baseline gap-3 px-5 pt-4 pb-3">
          <h2 className="text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink">
            Daftar siswa
          </h2>
          <Link
            href="/students"
            className="ml-auto inline-flex items-center gap-1 text-[12.5px] font-medium text-muted hover:text-ink"
          >
            Semua siswa
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </div>

        <ul>
          {rows.map((row) => {
            const Icon = activityIcons[row.kind];
            const active = row.id === selected?.id;

            return (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(row.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full items-center gap-3 border-t border-rule-soft px-5 py-2.5 text-left transition-colors",
                    active ? "bg-paper" : "hover:bg-paper/60",
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-paper-deep text-[12px] font-semibold text-ink-soft">
                    {row.initials}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-[13.5px] font-medium text-ink">
                        {row.name}
                      </span>
                      <span className="figures shrink-0 text-[11.5px] text-faint">
                        {row.className}
                      </span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5">
                      <span
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-[5px]",
                          activityTint[row.kind],
                        )}
                      >
                        <Icon aria-hidden className="size-[11px]" />
                      </span>
                      <span className="truncate text-[12px] text-muted">
                        {row.activity}
                      </span>
                    </span>
                  </span>

                  <Badge tone={statusLook[row.status].tone} className="shrink-0">
                    {statusLook[row.status].label}
                  </Badge>
                </button>
              </li>
            );
          })}
        </ul>
      </Sheet>

      {selected ? (
        <Sheet className="overflow-hidden">
          <div className="px-5 pt-4 pb-3">
            <h2 className="text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink">
              Detail aktivitas
            </h2>
          </div>

          <div className="border-t border-rule-soft px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-[14px] font-semibold text-white">
                {selected.initials}
              </span>
              <div className="min-w-0">
                <Link
                  href={`/students/${selected.id}`}
                  className="block truncate text-[15px] font-semibold text-ink hover:underline"
                >
                  {selected.name}
                </Link>
                <p className="figures mt-0.5 text-[12px] text-muted">
                  NIS {selected.nis} · {selected.className}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-[12px] bg-mint px-3 py-2.5">
                <dt className="text-[11px] font-medium text-mint-ink">
                  Rata-rata nilai
                </dt>
                <dd className="figures mt-1 text-[19px] leading-none font-bold text-ink">
                  {selected.average}
                </dd>
              </div>
              <div className="rounded-[12px] bg-sky px-3 py-2.5">
                <dt className="text-[11px] font-medium text-sky-ink">
                  Kehadiran
                </dt>
                <dd className="figures mt-1 text-[19px] leading-none font-bold text-ink">
                  {formatPercent(selected.attendance)}
                </dd>
              </div>
            </dl>

            <div className="mt-4">
              <p className="text-[11px] font-semibold text-muted">
                {activityLabel[selected.kind]} · {formatRelative(selected.at)}
              </p>
              <p className="mt-1 text-[13.5px] font-medium text-ink">
                {selected.activity}
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                {selected.note}
              </p>
            </div>

            <Link
              href={`/students/${selected.id}`}
              className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-control)] border border-rule bg-sheet px-3 text-[13px] font-medium text-ink transition-colors hover:border-ink/25 hover:bg-paper"
            >
              Buka profil siswa
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </div>
        </Sheet>
      ) : null}
    </div>
  );
}
