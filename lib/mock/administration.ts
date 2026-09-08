import type {
  AttendanceStatus,
  GeneratedDocument,
  PortfolioItem,
  ReportRow,
} from "@/types";
import { studentsInClass } from "@/lib/mock/students";

/**
 * SAMPLE ADMINISTRATION DATA — frontend only.
 *
 * Attendance, report card scores and portfolio entries are derived from the
 * roster with a fixed hash rather than random numbers, so server and client
 * render the same grid and nothing shifts on hydration.
 */

function seed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 1000;
}

/* ------------------------------------------------------------- attendance */

/** The month the sample data centres on, so every screen agrees on "now". */
export const currentMonth = { year: 2026, month: 8 } as const;

export const attendanceLabels: Record<AttendanceStatus, string> = {
  H: "Hadir",
  S: "Sakit",
  I: "Izin",
  A: "Alfa",
};

/** Weekday dates in a month — Indonesian schools run Monday to Friday. */
export function schoolDays(year: number, month: number): number[] {
  const days: number[] = [];
  const total = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= total; day += 1) {
    const weekday = new Date(year, month, day).getDay();
    if (weekday !== 0 && weekday !== 6) days.push(day);
  }
  return days;
}

export function defaultMark(studentId: string, day: number): AttendanceStatus {
  const value = seed(`${studentId}-hari-${day}`) % 100;
  if (value < 4) return "S";
  if (value < 7) return "I";
  if (value < 9) return "A";
  return "H";
}

export function buildAttendance(
  classId: string,
  year: number,
  month: number,
): Record<string, AttendanceStatus[]> {
  const days = schoolDays(year, month);
  const grid: Record<string, AttendanceStatus[]> = {};
  for (const student of studentsInClass(classId)) {
    grid[student.id] = days.map((day) => defaultMark(student.id, day));
  }
  return grid;
}

export function countMarks(marks: AttendanceStatus[]) {
  const totals: Record<AttendanceStatus, number> = { H: 0, S: 0, I: 0, A: 0 };
  for (const mark of marks) totals[mark] += 1;
  const percent = marks.length ? (totals.H / marks.length) * 100 : 0;
  return { ...totals, percent };
}

/* ------------------------------------------------------------ report card */

const teacherNotes = [
  "Menunjukkan kemajuan baik dalam menyelesaikan soal cerita. Tingkatkan ketelitian pada langkah akhir.",
  "Aktif berdiskusi dalam kelompok. Perlu latihan tambahan pada materi aljabar.",
  "Sangat teliti dan konsisten. Pertahankan kebiasaan memeriksa ulang pekerjaan.",
  "Sudah memahami konsep dasar. Perbanyak latihan soal penerapan agar lebih lancar.",
  "Perlu pendampingan pada materi pengukuran. Kehadiran perlu ditingkatkan.",
  "Percaya diri saat mempresentasikan hasil kerja. Lanjutkan dengan soal tingkat lanjut.",
];

export function reportRowsFor(classId: string): ReportRow[] {
  return studentsInClass(classId).map((student) => ({
    studentId: student.id,
    knowledge: 68 + (seed(`${student.id}-pengetahuan`) % 30),
    skills: 70 + (seed(`${student.id}-keterampilan`) % 28),
    note: teacherNotes[seed(`${student.id}-catatan`) % teacherNotes.length],
  }));
}

/** Predicate letters as they are printed on an Indonesian raport. */
export function predicateFor(score: number) {
  if (score >= 90) return { letter: "A", label: "Sangat baik" };
  if (score >= 80) return { letter: "B", label: "Baik" };
  if (score >= 70) return { letter: "C", label: "Cukup" };
  return { letter: "D", label: "Perlu bimbingan" };
}

/** Knowledge 60%, skills 40% — a common weighting, editable per school. */
export function finalScore(knowledge: number, skills: number) {
  return Math.round(knowledge * 0.6 + skills * 0.4);
}

/** The passing mark. Schools set their own; 75 is the usual default. */
export const kkm = 75;

/** Class-level roll-ups that the class list and class detail both print. */
export function classSummary(
  classId: string,
  year = currentMonth.year,
  month = currentMonth.month,
) {
  const rows = reportRowsFor(classId);
  const scores = rows.map((row) => finalScore(row.knowledge, row.skills));
  const grid = buildAttendance(classId, year, month);
  const percents = Object.values(grid).map((marks) => countMarks(marks).percent);
  const mean = (list: number[]) =>
    list.length ? list.reduce((sum, value) => sum + value, 0) / list.length : 0;

  return {
    students: rows.length,
    average: Math.round(mean(scores)),
    attendance: mean(percents),
    tuntas: scores.filter((score) => score >= kkm).length,
  };
}

/* -------------------------------------------------------------- portfolio */

export const portfolioItems: PortfolioItem[] = [
  {
    id: "pf-01",
    studentId: "viii-a-1",
    kind: "Projek",
    title: "Survei jajanan sekolah",
    subject: "Matematika",
    description:
      "Mengumpulkan data pilihan jajanan 60 siswa, menyajikannya dalam tabel dan diagram batang, lalu menghitung mean, median, dan modus.",
    teacherNote:
      "Penyajian data rapi dan kesimpulan sesuai perhitungan. Tambahkan pembahasan pencilan pada laporan berikutnya.",
    date: "2026-09-01T10:15:00+07:00",
    evidence: "laporan-survei-jajanan.pdf",
  },
  {
    id: "pf-02",
    studentId: "viii-a-1",
    kind: "Lomba",
    title: "Olimpiade Matematika tingkat kota",
    subject: "Matematika",
    description: "Mewakili sekolah pada babak penyisihan tingkat Kota Bandung.",
    teacherNote: "Masuk 20 besar. Fokuskan latihan pada materi geometri.",
    date: "2026-08-23T08:00:00+07:00",
    evidence: "sertifikat-olimpiade.jpg",
  },
  {
    id: "pf-03",
    studentId: "viii-a-5",
    kind: "Projek",
    title: "Model bangun ruang dari kardus",
    subject: "Matematika",
    description:
      "Membuat model prisma dan limas dari kardus bekas, lalu menghitung luas permukaan serta volumenya.",
    teacherNote:
      "Perhitungan volume tepat. Rapikan pengukuran sisi agar hasilnya konsisten.",
    date: "2026-08-19T13:30:00+07:00",
  },
  {
    id: "pf-04",
    studentId: "viii-a-9",
    kind: "Kegiatan",
    title: "Tutor sebaya materi Pythagoras",
    subject: "Matematika",
    description:
      "Mendampingi empat teman satu kelompok selama dua pertemuan remedial.",
    teacherNote:
      "Cara menjelaskan mudah diikuti. Sangat membantu kelompoknya.",
    date: "2026-08-15T09:45:00+07:00",
  },
  {
    id: "pf-05",
    studentId: "viii-a-14",
    kind: "Prestasi",
    title: "Nilai tertinggi Penilaian Tengah Semester",
    subject: "Matematika",
    description: "Memperoleh nilai 96 pada PTS semester 1.",
    teacherNote: "Konsisten sejak awal semester. Lanjutkan ke soal pengayaan.",
    date: "2026-08-12T11:00:00+07:00",
  },
  {
    id: "pf-06",
    studentId: "viii-a-20",
    kind: "Sertifikat",
    title: "Pelatihan literasi numerasi daring",
    subject: "Matematika",
    description: "Menyelesaikan pelatihan numerasi 8 jam dari platform mitra.",
    teacherNote: "Sertifikat sudah diverifikasi wali kelas.",
    date: "2026-08-06T16:20:00+07:00",
    evidence: "sertifikat-numerasi.pdf",
  },
  {
    id: "pf-07",
    studentId: "viii-a-26",
    kind: "Projek",
    title: "Poster tripel Pythagoras",
    subject: "Matematika",
    description:
      "Menyusun poster berisi sepuluh tripel Pythagoras beserta pembuktian singkatnya.",
    teacherNote: "Isi benar dan mudah dibaca. Dipasang di dinding kelas.",
    date: "2026-07-30T14:10:00+07:00",
  },
  {
    id: "pf-08",
    studentId: "viii-a-31",
    kind: "Kegiatan",
    title: "Panitia pekan numerasi sekolah",
    subject: "Matematika",
    description: "Menyiapkan pos permainan peluang untuk kelas VII.",
    teacherNote: "Inisiatif baik. Dokumentasi kegiatan perlu dilengkapi.",
    date: "2026-07-24T10:00:00+07:00",
  },
];

export function portfolioFor(studentId: string) {
  return portfolioItems.filter((item) => item.studentId === studentId);
}

/* --------------------------------------------------------------- documents */

export const documents: GeneratedDocument[] = [
  { id: "doc-411", name: "PTS Matematika VIII-A — versi siswa", kind: "Ujian", format: "PDF", size: "184 KB", context: "VIII-A · Semester 1", status: "siap", createdAt: "2026-09-04T07:45:00+07:00" },
  { id: "doc-410", name: "PTS Matematika VIII-A — kunci jawaban", kind: "Kunci jawaban", format: "DOCX", size: "96 KB", context: "VIII-A · Semester 1", status: "siap", createdAt: "2026-09-04T07:45:00+07:00" },
  { id: "doc-409", name: "Raport VIII-A semester 1", kind: "Raport", format: "PDF", size: "1,2 MB", context: "12 siswa", status: "siap", createdAt: "2026-09-03T15:10:00+07:00" },
  { id: "doc-408", name: "Rekap nilai VIII-A", kind: "Raport", format: "XLSX", size: "48 KB", context: "32 siswa · Semester 1", status: "siap", createdAt: "2026-09-03T15:08:00+07:00" },
  { id: "doc-407", name: "Absensi VIII-A Agustus 2026", kind: "Absensi", format: "XLSX", size: "64 KB", context: "21 hari sekolah", status: "siap", createdAt: "2026-09-03T09:07:00+07:00" },
  { id: "doc-406", name: "Absensi VIII-A Agustus 2026", kind: "Absensi", format: "PDF", size: "212 KB", context: "21 hari sekolah", status: "diproses", createdAt: "2026-09-03T09:06:00+07:00" },
  { id: "doc-405", name: "Portofolio Adinda Kirana", kind: "Portofolio", format: "DOCX", size: "320 KB", context: "2 catatan · Semester 1", status: "siap", createdAt: "2026-09-01T10:20:00+07:00" },
  { id: "doc-404", name: "Latihan Soal Pythagoras — versi guru", kind: "Kunci jawaban", format: "DOCX", size: "88 KB", context: "VIII-A · 10 soal", status: "siap", createdAt: "2026-08-31T16:50:00+07:00" },
  { id: "doc-403", name: "Ujian Harian SPLDV VIII-B", kind: "Ujian", format: "DOCX", size: "132 KB", context: "VIII-B · 15 soal", status: "gagal", createdAt: "2026-08-28T10:12:00+07:00" },
  { id: "doc-402", name: "Rekap absensi semester 1 VIII-A", kind: "Absensi", format: "PDF", size: "268 KB", context: "Juli–Agustus 2026", status: "siap", createdAt: "2026-08-26T08:15:00+07:00" },
  { id: "doc-401", name: "PAS Matematika IX-A — versi siswa", kind: "Ujian", format: "PDF", size: "244 KB", context: "IX-A · 40 soal", status: "siap", createdAt: "2026-08-14T08:40:00+07:00" },
];
