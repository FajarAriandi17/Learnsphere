import {
  Award,
  CalendarCheck,
  Download,
  FileText,
  Sparkles,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { ActivityKind } from "@/types";

/**
 * One icon, one Indonesian noun, one pastel and one destination per activity
 * kind — shared by the dashboard feed, the notification panel and the activity
 * detail card so the same event never wears two different faces.
 */
export const activityIcons: Record<ActivityKind, LucideIcon> = {
  exam: Sparkles,
  report: FileText,
  attendance: CalendarCheck,
  portfolio: Award,
  student: UserPlus,
  export: Download,
};

export const activityLabel: Record<ActivityKind, string> = {
  exam: "Soal",
  report: "Raport",
  attendance: "Absensi",
  portfolio: "Portofolio",
  student: "Siswa",
  export: "Dokumen",
};

/**
 * PRD §5 — pastel is for visual grouping only. The icon and the label carry the
 * meaning, so a teacher who cannot separate mint from sky loses nothing (§43).
 */
export const activityTint: Record<ActivityKind, string> = {
  exam: "bg-blush text-blush-ink",
  report: "bg-mint text-mint-ink",
  attendance: "bg-sky text-sky-ink",
  portfolio: "bg-lilac text-lilac-ink",
  student: "bg-lemon text-lemon-ink",
  export: "bg-paper-deep text-ink-soft",
};

export const activityHref: Record<ActivityKind, string> = {
  exam: "/exams",
  report: "/report-cards",
  attendance: "/attendance",
  portfolio: "/portfolios",
  student: "/students",
  export: "/documents",
};
