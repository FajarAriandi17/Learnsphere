import { classGroups, totalStudents } from "@/lib/mock/students";
import type { ActivityEntry, ActivityKind, DashboardMetric } from "@/types";

/**
 * SAMPLE DATA — frontend only.
 *
 * Nothing here is persisted or fetched. Each export marks the exact seam
 * where a backend read replaces it, so the swap is mechanical.
 */

export const teacher = {
  name: "Rahma Nuraini",
  /** Salutation as stored on the profile (PRD §31), never guessed from a name. */
  title: "Bu",
  initials: "RN",
  nip: "19880412 201203 2 004",
  subject: "Matematika",
  homeroom: "VIII-A",
  email: "rahma.nuraini@smpn12bdg.sch.id",
  phone: "0812-2004-1188",
  role: "Guru" as const,
};

export const school = {
  name: "SMP Negeri 12 Bandung",
  npsn: "20219411",
  address: "Jl. Setiabudi No. 195",
  city: "Kota Bandung",
  province: "Jawa Barat",
  postalCode: "40153",
  phone: "(022) 2011234",
  email: "humas@smpn12bdg.sch.id",
  principal: "Drs. Bambang Suryana, M.Pd.",
  principalNip: "19700118 199403 1 006",
};


export const activePeriod = {
  academicYear: "2026/2027",
  semester: "1" as const,
};

export const credits = {
  plan: "Guru Basic",
  remaining: 182,
  total: 500,
  renewsOn: "2026-10-01T00:00:00+07:00",
};

/** PRD §22 overview cards. Counts a page can contradict are derived, not typed. */
export const metrics: DashboardMetric[] = [
  { key: "students", label: "Siswa terdaftar", value: totalStudents, delta: 12, href: "/students" },
  { key: "classes", label: "Kelas aktif", value: classGroups.length, href: "/classes" },
  { key: "exams", label: "Ujian dibuat", value: 38, delta: 6, href: "/exams" },
  { key: "questions", label: "Soal tersimpan", value: 1240, delta: 180, href: "/exams" },
  { key: "reports", label: "Raport dibuat", value: 96, delta: 30, href: "/report-cards" },
  { key: "attendance", label: "Rekap absensi", value: 412, delta: 41, href: "/attendance" },
  { key: "portfolios", label: "Catatan portofolio", value: 63, delta: 9, href: "/portfolios" },
];

export const activity: ActivityEntry[] = [
  {
    id: "a1",
    kind: "exam",
    text: "Penilaian Tengah Semester Matematika VIII-A",
    detail: "20 soal pilihan ganda, kunci jawaban siap",
    at: "2026-09-04T07:42:00+07:00",
  },
  {
    id: "a2",
    kind: "export",
    text: "12 raport diekspor ke PDF",
    detail: "Kelas VIII-A, semester 1",
    at: "2026-09-03T15:10:00+07:00",
  },
  {
    id: "a3",
    kind: "attendance",
    text: "Absensi VIII-A diperbarui",
    detail: "Agustus 2026, kehadiran 96,4%",
    at: "2026-09-03T09:05:00+07:00",
  },
  {
    id: "a4",
    kind: "student",
    text: "31 siswa diimpor dari Excel",
    detail: "Kelas VII-C, 2 baris diperbaiki",
    at: "2026-09-02T13:28:00+07:00",
  },
  {
    id: "a5",
    kind: "portfolio",
    text: "Portofolio Adinda Kirana ditambahkan",
    detail: "Projek statistika: survei jajanan sekolah",
    at: "2026-09-01T10:15:00+07:00",
  },
  {
    id: "a6",
    kind: "exam",
    text: "Latihan Soal Teorema Pythagoras",
    detail: "10 soal uraian, tingkat sulit",
    at: "2026-08-31T16:47:00+07:00",
  },
];

/**
 * PRD §10 — one teaching week, Monday to Sunday. Credits run above soal because
 * a regenerated question spends a credit without adding a question.
 */
export const weeklyActivity = {
  days: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
  series: [
    { key: "soal", label: "Soal dibuat", values: [24, 18, 32, 12, 40, 8, 0] },
    { key: "ekspor", label: "Dokumen diekspor", values: [4, 3, 6, 2, 9, 1, 0] },
    { key: "kredit", label: "Kredit AI terpakai", values: [31, 22, 38, 15, 47, 11, 0] },
  ],
} as const;

export type AgendaKind = "exam" | "task" | "report" | "attendance";

export interface AgendaEvent {
  id: string;
  /** Local date, no time — an agenda entry belongs to a day, not a moment. */
  date: string;
  title: string;
  detail: string;
  kind: AgendaKind;
}

/** PRD §11 — the four things that actually land in a teacher's month. */
export const agenda: AgendaEvent[] = [
  {
    id: "e1",
    date: "2026-09-05",
    title: "Rekap absensi Agustus",
    detail: "VIII-A · tenggat hari ini",
    kind: "attendance",
  },
  {
    id: "e2",
    date: "2026-09-08",
    title: "Ujian Matematika",
    detail: "VIII-A · 07.30 · 20 soal",
    kind: "exam",
  },
  {
    id: "e3",
    date: "2026-09-10",
    title: "Pengumpulan tugas statistika",
    detail: "VIII-B · projek survei",
    kind: "task",
  },
  {
    id: "e4",
    date: "2026-09-15",
    title: "Input raport tengah semester",
    detail: "4 kelas diampu",
    kind: "report",
  },
  {
    id: "e5",
    date: "2026-09-22",
    title: "Ujian Matematika",
    detail: "IX-A · 09.15 · 25 soal",
    kind: "exam",
  },
  {
    id: "e6",
    date: "2026-09-26",
    title: "Rekap absensi September",
    detail: "VIII-A, VIII-B, VIII-C",
    kind: "attendance",
  },
];

export interface CreditEntry {
  id: string;
  at: string;
  label: string;
  detail: string;
  /** Credits spent. Editing or exporting a soal costs nothing. */
  amount: number;
}

/**
 * PRD §30 usage history. The entries add up to `credits.total -
 * credits.remaining`, so the page never contradicts the topbar.
 */
export const creditUsage: CreditEntry[] = [
  { id: "c1", at: "2026-09-04T07:42:00+07:00", label: "Generate 20 soal PTS Matematika", detail: "VIII-A · Kurikulum Merdeka", amount: 20 },
  { id: "c2", at: "2026-09-04T08:10:00+07:00", label: "Regenerate 6 soal", detail: "VIII-A · penyesuaian tingkat kesulitan", amount: 6 },
  { id: "c3", at: "2026-09-03T10:25:00+07:00", label: "Generate 25 soal ulangan harian", detail: "IX-A · Kurikulum Merdeka", amount: 25 },
  { id: "c4", at: "2026-09-02T13:05:00+07:00", label: "Generate 40 soal latihan Pythagoras", detail: "VIII-B · latihan mandiri", amount: 40 },
  { id: "c5", at: "2026-09-01T09:30:00+07:00", label: "Generate 32 soal ulangan harian", detail: "VIII-B · Kurikulum Merdeka", amount: 32 },
  { id: "c6", at: "2026-08-29T15:48:00+07:00", label: "Generate 60 soal bank soal statistika", detail: "VIII-A, VIII-B, VIII-C", amount: 60 },
  { id: "c7", at: "2026-08-27T11:12:00+07:00", label: "Generate 45 soal HOTS aljabar", detail: "IX-A · level C4–C5", amount: 45 },
  { id: "c8", at: "2026-08-24T14:02:00+07:00", label: "Generate 50 soal remedial", detail: "VIII-C · tingkat mudah", amount: 50 },
  { id: "c9", at: "2026-08-20T08:55:00+07:00", label: "Generate 40 soal PTS", detail: "IX-A · Kurikulum 2013", amount: 40 },
];

export type HighlightStatus = "tuntas" | "proses" | "perhatian";

export interface RosterHighlight {
  studentId: string;
  kind: ActivityKind;
  activity: string;
  at: string;
  status: HighlightStatus;
  /** Rounded average across the subject's assessments this semester. */
  average: number;
  attendance: number;
  note: string;
}

/**
 * PRD §13 — the roster rows the dashboard shows, each with enough detail for the
 * panel beside it. Ids point into the sample homeroom in `students.ts`.
 */
export const rosterHighlights: RosterHighlight[] = [
  {
    studentId: "viii-a-1",
    kind: "portfolio",
    activity: "Portofolio statistika dinilai",
    at: "2026-09-04T14:20:00+07:00",
    status: "tuntas",
    average: 88,
    attendance: 97.5,
    note: "Survei jajanan sekolah rapi; diagramnya bisa dipakai sebagai contoh di kelas.",
  },
  {
    studentId: "viii-a-4",
    kind: "exam",
    activity: "PTS Matematika dikerjakan",
    at: "2026-09-04T09:05:00+07:00",
    status: "proses",
    average: 74,
    attendance: 92.3,
    note: "Kuat di aljabar, masih tertinggal pada soal cerita. Perlu latihan tambahan C3.",
  },
  {
    studentId: "viii-a-8",
    kind: "report",
    activity: "Nilai raport disimpan",
    at: "2026-09-03T16:40:00+07:00",
    status: "tuntas",
    average: 91,
    attendance: 98.8,
    note: "Konsisten di atas rata-rata kelas sejak semester lalu.",
  },
  {
    studentId: "viii-a-15",
    kind: "attendance",
    activity: "Izin 2 hari dicatat",
    at: "2026-09-03T07:15:00+07:00",
    status: "perhatian",
    average: 68,
    attendance: 84.1,
    note: "Kehadiran turun sejak Agustus. Hubungi wali murid sebelum PTS.",
  },
  {
    studentId: "viii-a-20",
    kind: "exam",
    activity: "Remedial Pythagoras",
    at: "2026-09-02T13:00:00+07:00",
    status: "proses",
    average: 71,
    attendance: 95.0,
    note: "Sudah mengulang satu kali; naik 9 poin dari nilai awal.",
  },
  {
    studentId: "viii-a-28",
    kind: "student",
    activity: "Data induk diperbarui",
    at: "2026-09-01T10:30:00+07:00",
    status: "tuntas",
    average: 85,
    attendance: 96.2,
    note: "NIS dan tanggal lahir dikoreksi dari berkas pendaftaran.",
  },
];

