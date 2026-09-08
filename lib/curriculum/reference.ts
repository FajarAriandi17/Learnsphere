import type { EducationLevel } from "@/types";

/**
 * Curriculum reference data.
 *
 * PRD §6 requires this to be versioned, configurable data rather than values
 * baked into components — so the UI reads everything here through the helpers
 * below. When the backend curriculum tables land, only this module is replaced;
 * no component changes.
 */

export const curricula = [
  { id: "merdeka", name: "Kurikulum Merdeka", version: "2024" },
  { id: "k13", name: "Kurikulum 2013", version: "rev. 2018" },
] as const;

export const academicYears = ["2026/2027", "2025/2026", "2024/2025"] as const;

export const levels: EducationLevel[] = ["SD", "SMP", "SMA", "SMK"];

export const gradesByLevel: Record<EducationLevel, string[]> = {
  SD: ["1", "2", "3", "4", "5", "6"],
  SMP: ["7", "8", "9"],
  SMA: ["10", "11", "12"],
  SMK: ["10", "11", "12"],
};

export const subjectsByLevel: Record<EducationLevel, string[]> = {
  SD: [
    "Bahasa Indonesia",
    "Matematika",
    "Ilmu Pengetahuan Alam dan Sosial",
    "Pendidikan Pancasila",
    "Pendidikan Agama",
    "Seni Budaya",
    "Pendidikan Jasmani",
  ],
  SMP: [
    "Matematika",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Ilmu Pengetahuan Alam",
    "Ilmu Pengetahuan Sosial",
    "Pendidikan Pancasila",
    "Informatika",
    "Seni Budaya",
    "Pendidikan Jasmani",
  ],
  SMA: [
    "Matematika",
    "Fisika",
    "Kimia",
    "Biologi",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Ekonomi",
    "Geografi",
    "Sejarah",
    "Sosiologi",
    "Informatika",
  ],
  SMK: [
    "Matematika",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Projek Ilmu Pengetahuan Alam dan Sosial",
    "Dasar Program Keahlian",
    "Konsentrasi Keahlian",
    "Projek Kreatif dan Kewirausahaan",
  ],
};

type TopicKey = `${string}|${string}`;

/** topic list keyed by `subject|grade`, with a per-subject fallback. */
const topics: Record<TopicKey | string, string[]> = {
  "Matematika|7": [
    "Bilangan bulat dan pecahan",
    "Rasio dan perbandingan",
    "Aljabar: bentuk dan operasi",
    "Persamaan linear satu variabel",
    "Perbandingan senilai dan berbalik nilai",
  ],
  "Matematika|8": [
    "Teorema Pythagoras",
    "Sistem persamaan linear dua variabel",
    "Relasi dan fungsi",
    "Bangun ruang sisi datar",
    "Statistika: mean, median, modus",
    "Peluang sederhana",
  ],
  "Matematika|9": [
    "Bilangan berpangkat dan bentuk akar",
    "Persamaan kuadrat",
    "Fungsi kuadrat",
    "Kesebangunan dan kekongruenan",
    "Bangun ruang sisi lengkung",
  ],
  "Ilmu Pengetahuan Alam|8": [
    "Gerak dan gaya",
    "Sistem pencernaan manusia",
    "Tekanan zat",
    "Getaran, gelombang, dan bunyi",
    "Cahaya dan alat optik",
  ],
  "Bahasa Indonesia|8": [
    "Teks berita",
    "Teks eksposisi",
    "Teks persuasi",
    "Teks eksplanasi",
    "Puisi",
  ],
  "Bahasa Inggris|8": [
    "Descriptive text",
    "Recount text",
    "Simple past tense",
    "Asking and giving opinion",
  ],
  Matematika: [
    "Bilangan",
    "Aljabar",
    "Geometri dan pengukuran",
    "Analisis data dan peluang",
  ],
  "Ilmu Pengetahuan Alam": [
    "Makhluk hidup dan lingkungannya",
    "Zat dan perubahannya",
    "Energi dan perubahannya",
    "Bumi dan antariksa",
  ],
  "Bahasa Indonesia": [
    "Menyimak dan memahami teks",
    "Menulis teks",
    "Berbicara dan mempresentasikan",
    "Sastra",
  ],
};

export function topicsFor(subject: string, grade: string): string[] {
  return topics[`${subject}|${grade}`] ?? topics[subject] ?? [];
}

/** A short competency line for the kisi-kisi field, per PRD §9. */
export function competencyFor(subject: string, topic: string) {
  return `Peserta didik mampu menerapkan konsep ${topic.toLowerCase()} dalam menyelesaikan masalah ${subject.toLowerCase()} kontekstual.`;
}
