import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { formatNumber } from "@/lib/format";
import { taughtClasses, totalStudents } from "@/lib/mock/students";
import { credits, metrics } from "@/lib/mock/teacher-data";

const metric = (key: string) => metrics.find((entry) => entry.key === key);

interface StatCard {
  key: string;
  label: string;
  value: number;
  unit: string;
  note: string;
  delta?: number;
  deltaLabel?: string;
  meter?: { value: number; max: number; label: string };
  href: string;
  icon: LucideIcon;
  /** The tinted icon tile, kept small so it never competes with the figure. */
  tile: string;
}

/**
 * PRD §9 — four cards, one per pillar of the product. Colour lives in the
 * icon tile and the delta chip; the card itself is white, so the reading is
 * carried by the number and the label. A pastel card can be mistaken for a
 * state — this one cannot.
 */
const cards: StatCard[] = [
  {
    key: "students",
    label: "Siswa",
    value: totalStudents,
    unit: "siswa",
    note: `${taughtClasses.length} kelas diampu`,
    delta: metric("students")?.delta,
    deltaLabel: "siswa baru bulan ini",
    href: "/students",
    icon: Users,
    tile: "bg-sky text-sky-ink",
  },
  {
    key: "questions",
    label: "Soal dibuat",
    value: metric("questions")?.value ?? 0,
    unit: "soal",
    note: `${formatNumber(metric("exams")?.value ?? 0)} ujian tersusun`,
    delta: metric("questions")?.delta,
    deltaLabel: "soal baru bulan ini",
    href: "/exams",
    icon: Sparkles,
    tile: "bg-lilac text-lilac-ink",
  },
  {
    key: "reports",
    label: "Raport",
    value: metric("reports")?.value ?? 0,
    unit: "raport",
    note: "Semester 1 berjalan",
    delta: metric("reports")?.delta,
    deltaLabel: "raport baru bulan ini",
    href: "/report-cards",
    icon: FileText,
    tile: "bg-mint text-mint-ink",
  },
  {
    key: "credits",
    label: "Kredit AI",
    value: credits.remaining,
    unit: `dari ${formatNumber(credits.total)}`,
    note: `Paket ${credits.plan}`,
    meter: {
      value: credits.remaining,
      max: credits.total,
      label: "Kredit AI tersisa",
    },
    href: "/credits",
    icon: Zap,
    tile: "bg-lemon text-lemon-ink",
  },
];

export function StatCards() {
  return (
    <section aria-labelledby="ringkasan">
      <h2 id="ringkasan" className="sr-only">
        Ringkasan
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.key}
              href={card.href}
              className="group relative overflow-hidden rounded-[var(--radius-sheet)] border border-rule bg-sheet p-4 shadow-card transition-shadow hover:shadow-lift active:translate-y-px"
            >
              <span className="relative flex items-center gap-2">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-control)] ${card.tile}`}
                >
                  <Icon aria-hidden className="size-4" />
                </span>
                <span className="text-[12.5px] font-semibold text-ink">
                  {card.label}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="ml-auto size-4 text-faint opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>

              <span className="relative mt-4 flex items-baseline gap-1.5">
                <span className="figures text-[30px] leading-none font-bold tracking-[-0.02em] text-ink">
                  {formatNumber(card.value)}
                </span>
                <span className="text-[12px] text-muted">{card.unit}</span>
              </span>

              {card.meter ? (
                <span className="relative mt-3.5 block">
                  <span
                    role="meter"
                    aria-valuenow={card.meter.value}
                    aria-valuemin={0}
                    aria-valuemax={card.meter.max}
                    aria-label={card.meter.label}
                    className="block h-1.5 overflow-hidden rounded-full bg-paper-deep"
                  >
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${Math.round((card.meter.value / card.meter.max) * 100)}%` }}
                    />
                  </span>
                  <span className="mt-2 block text-[11.5px] text-muted">
                    {card.note}
                  </span>
                </span>
              ) : (
                <span className="relative mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px]">
                  {card.delta ? (
                    <span
                      title={`+${formatNumber(card.delta)} ${card.deltaLabel}`}
                      className="inline-flex items-center gap-1 rounded-full bg-paper-deep px-1.5 py-0.5 font-semibold text-tuntas"
                    >
                      <TrendingUp aria-hidden className="size-3" />+
                      {formatNumber(card.delta)}
                      <span className="sr-only"> {card.deltaLabel}</span>
                    </span>
                  ) : null}
                  <span className="text-muted">{card.note}</span>
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}