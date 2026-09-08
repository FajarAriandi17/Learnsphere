import {
  CalendarCheck,
  CreditCard,
  Files,
  FolderOpen,
  LayoutGrid,
  LayoutTemplate,
  Library,
  School,
  Settings,
  Sparkles,
  SquarePen,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** False until the section is built, so the sidebar never links to a 404. */
  ready: boolean;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

/**
 * PRD §6. Three groups, in the order a teacher's day runs: the work itself,
 * then the administration it feeds, then the account behind both. Headings are
 * Indonesian per §42 — "Tools" reads as jargon in a staff room.
 */
export const navGroups: NavGroup[] = [
  {
    heading: "Umum",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutGrid, ready: true },
      { label: "AI Buat Soal", href: "/ai", icon: Sparkles, ready: true },
      { label: "Bank Soal", href: "/exams", icon: Library, ready: true },
      { label: "Siswa", href: "/students", icon: Users, ready: true },
      { label: "Kelas", href: "/classes", icon: School, ready: true },
    ],
  },
  {
    heading: "Akademik",
    items: [
      { label: "Raport", href: "/report-cards", icon: SquarePen, ready: true },
      { label: "Absensi", href: "/attendance", icon: CalendarCheck, ready: true },
      { label: "Portofolio", href: "/portfolios", icon: FolderOpen, ready: true },
      { label: "Dokumen", href: "/documents", icon: Files, ready: true },
    ],
  },
  {
    heading: "Alat & Akun",
    items: [
      { label: "Template", href: "/templates", icon: LayoutTemplate, ready: true },
      { label: "Kredit AI", href: "/credits", icon: Zap, ready: true },
      { label: "Langganan", href: "/billing", icon: CreditCard, ready: true },
      { label: "Pengaturan", href: "/settings", icon: Settings, ready: true },
    ],
  },
];

/**
 * PRD §33 — the five modules that earn a slot in the phone's bottom bar.
 * Anything else on a phone is reached from the drawer.
 */
export const mobileNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid, ready: true },
  { label: "AI Soal", href: "/ai", icon: Sparkles, ready: true },
  { label: "Siswa", href: "/students", icon: Users, ready: true },
  { label: "Raport", href: "/report-cards", icon: SquarePen, ready: true },
  { label: "Absensi", href: "/attendance", icon: CalendarCheck, ready: true },
];
