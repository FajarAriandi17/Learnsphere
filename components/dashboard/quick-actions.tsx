import Link from "next/link";
import {
  CalendarCheck,
  ChevronRight,
  FolderOpen,
  Sparkles,
  SquarePen,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Sheet, SheetHeading } from "@/components/ui/sheet";

interface Action {
  label: string;
  href: string;
  icon: LucideIcon;
  tint: string;
}

/** PRD §12, in the order a teacher's week actually runs. */
const actions: Action[] = [
  { label: "Input raport", href: "/report-cards", icon: SquarePen, tint: "bg-mint text-mint-ink" },
  { label: "Buat absensi", href: "/attendance", icon: CalendarCheck, tint: "bg-sky text-sky-ink" },
  { label: "Tambah siswa", href: "/students", icon: UserPlus, tint: "bg-lemon text-lemon-ink" },
  { label: "Buat portofolio", href: "/portfolios", icon: FolderOpen, tint: "bg-lilac text-lilac-ink" },
];

/**
 * The AI action is a filled primary row and the rest are quiet: PRD §51 asks
 * that generating soal stay visibly the primary product action, so it gets the
 * only piece of weight in this card.
 */
export function QuickActions() {
  return (
    <Sheet className="overflow-hidden">
      <SheetHeading title="Aksi cepat" />

      <div className="px-4 pb-4">
        <Link
          href="/ai"
          className="flex items-center gap-3 rounded-[var(--radius-control)] bg-primary px-3.5 py-3 text-white transition-colors hover:bg-primary-deep active:translate-y-px"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white/15 text-white">
            <Sparkles aria-hidden className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13.5px] font-semibold text-white">
              Buat soal dengan AI
            </span>
            <span className="mt-0.5 block text-[11.5px] text-white/50">
              Sesuai jenjang, kurikulum, dan materi
            </span>
          </span>
          <ChevronRight aria-hidden className="size-4 shrink-0 text-white/45" />
        </Link>

        <ul className="mt-1.5 space-y-0.5">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <li key={action.href}>
                <Link
                  href={action.href}
                  className="flex items-center gap-3 rounded-[var(--radius-control)] px-3.5 py-2.5 transition-colors hover:bg-paper"
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-[10px] ${action.tint}`}
                  >
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <span className="flex-1 text-[13.5px] font-medium text-ink">
                    {action.label}
                  </span>
                  <ChevronRight
                    aria-hidden
                    className="size-4 shrink-0 text-faint"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Sheet>
  );
}
