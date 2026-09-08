import type { ClassGroup, Student } from "@/types";

/**
 * SAMPLE ROSTER — frontend only.
 *
 * Stands in for `classes` and `students` from PRD §29 so the roster, raport,
 * absensi and portofolio screens can be built against a realistic class size.
 * Replace the two exports with reads from the backend; the helpers below keep
 * the same signatures.
 */

const ACADEMIC_YEAR = "2026/2027";

export const classGroups: ClassGroup[] = [
  { id: "vii-b", name: "VII-B", grade: "7", studentCount: 36, homeroomTeacher: "Sri Wahyuni, S.Pd.", taught: false, level: "SMP", academicYear: ACADEMIC_YEAR, semester: "1" },
  { id: "vii-c", name: "VII-C", grade: "7", studentCount: 35, homeroomTeacher: "Dedi Kurniawan, S.Pd.", taught: false, level: "SMP", academicYear: ACADEMIC_YEAR, semester: "1" },
  { id: "viii-a", name: "VIII-A", grade: "8", studentCount: 32, homeroomTeacher: "Rahma Nuraini, S.Pd.", taught: true, level: "SMP", academicYear: ACADEMIC_YEAR, semester: "1" },
  { id: "viii-b", name: "VIII-B", grade: "8", studentCount: 34, homeroomTeacher: "Yuni Astuti, S.Pd.", taught: true, level: "SMP", academicYear: ACADEMIC_YEAR, semester: "1" },
  { id: "viii-c", name: "VIII-C", grade: "8", studentCount: 36, homeroomTeacher: "Agus Salim, S.Pd.", taught: true, level: "SMP", academicYear: ACADEMIC_YEAR, semester: "1" },
  { id: "ix-a", name: "IX-A", grade: "9", studentCount: 35, homeroomTeacher: "Ratna Dewi, M.Pd.", taught: true, level: "SMP", academicYear: ACADEMIC_YEAR, semester: "1" },
  { id: "ix-b", name: "IX-B", grade: "9", studentCount: 34, homeroomTeacher: "Bayu Firmansyah, S.Pd.", taught: false, level: "SMP", academicYear: ACADEMIC_YEAR, semester: "1" },
];

/** The homeroom class is written out; the rest are composed from the pools. */
const homeroom: Array<[string, "L" | "P"]> = [
  ["Adinda Kirana", "P"], ["Ahmad Fauzan", "L"], ["Aisyah Ramadhani", "P"],
  ["Alif Pratama", "L"], ["Anindya Putri", "P"], ["Bagas Setiawan", "L"],
  ["Bunga Lestari", "P"], ["Cahaya Amelia", "P"], ["Dimas Ardiansyah", "L"],
  ["Elang Nugraha", "L"], ["Fadhil Ramadhan", "L"], ["Fitri Handayani", "P"],
  ["Galih Prasetyo", "L"], ["Hana Salsabila", "P"], ["Ilham Maulana", "L"],
  ["Intan Permata", "P"], ["Joko Purnomo", "L"], ["Kayla Azzahra", "P"],
  ["Luthfi Hakim", "L"], ["Maharani Dewi", "P"], ["Nadia Safira", "P"],
  ["Naufal Arif", "L"], ["Oktavian Yusuf", "L"], ["Putri Ayu Wulandari", "P"],
  ["Rafi Alfarizi", "L"], ["Rania Kusuma", "P"], ["Satria Wibowo", "L"],
  ["Shafira Nabila", "P"], ["Tegar Prabowo", "L"], ["Vania Aprilia", "P"],
  ["Wahyu Setiadi", "L"], ["Zahra Nurhaliza", "P"],
];

// 24 given names against 13 family names: the cycle is long enough that no
// class of 36 repeats a name.
const givenNames: Array<[string, "L" | "P"]> = [
  ["Arif", "L"], ["Bella", "P"], ["Candra", "L"], ["Dinda", "P"],
  ["Eka", "P"], ["Fajar", "L"], ["Gita", "P"], ["Hendra", "L"],
  ["Indah", "P"], ["Jihan", "P"], ["Krisna", "L"], ["Lintang", "P"],
  ["Mahesa", "L"], ["Nabil", "L"], ["Oktaria", "P"], ["Panji", "L"],
  ["Qonita", "P"], ["Reza", "L"], ["Sari", "P"], ["Taufik", "L"],
  ["Ulfa", "P"], ["Vino", "L"], ["Wulan", "P"], ["Yoga", "L"],
];

const familyNames = [
  "Anggraini", "Budiman", "Cahyani", "Dharmawan", "Erlangga", "Firdaus",
  "Gunawan", "Halim", "Iskandar", "Jayanti", "Kusumo", "Laksana", "Mahendra",
];

function rosterFor(group: ClassGroup, order: number): Student[] {
  const names: Array<[string, "L" | "P"]> =
    group.id === "viii-a"
      ? homeroom
      : Array.from({ length: group.studentCount }, (_, i) => {
          const [given, gender] = givenNames[(i + order * 7) % givenNames.length];
          const family = familyNames[(i + order * 5) % familyNames.length];
          return [`${given} ${family}`, gender];
        });

  return names.slice(0, group.studentCount).map(([name, gender], i) => ({
    id: `${group.id}-${i + 1}`,
    nis: `2026${order + 1}${String(i + 1).padStart(3, "0")}`,
    name,
    gender,
    birthDate: `${2026 - Number(group.grade) - 5}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 27) + 1).padStart(2, "0")}`,
    classId: group.id,
    status: "aktif",
  }));
}

export const students: Student[] = classGroups.flatMap(rosterFor);

export const totalStudents = students.length;

export function classById(id: string) {
  return classGroups.find((group) => group.id === id);
}

export function classNameOf(id: string) {
  return classById(id)?.name ?? "—";
}

export function studentsInClass(classId: string) {
  return students.filter((student) => student.classId === classId);
}

export function studentById(id: string) {
  return students.find((student) => student.id === id);
}

/** Classes the signed-in teacher teaches, homeroom first. */
export const taughtClasses = classGroups
  .filter((group) => group.taught)
  .sort((a, b) => Number(b.homeroomTeacher.startsWith("Rahma")) - Number(a.homeroomTeacher.startsWith("Rahma")));

const romanByGrade: Record<string, string> = { "7": "VII", "8": "VIII", "9": "IX" };

/**
 * Class history is derived from the current grade — one row per year back —
 * because the sample roster has no history table. The `students` history in
 * PRD §29 will supply this directly, with the same shape.
 */
export function classHistory(student: Student) {
  const group = classById(student.classId);
  if (!group) return [];

  const grade = Number(group.grade);
  const suffix = group.name.split("-")[1] ?? "A";
  const startYear = Number(group.academicYear.slice(0, 4));

  return Array.from({ length: grade - 6 }, (_, i) => {
    const level = grade - i;
    const start = startYear - i;
    return {
      className: `${romanByGrade[String(level)] ?? level}-${suffix}`,
      grade: String(level),
      academicYear: `${start}/${start + 1}`,
      current: i === 0,
    };
  });
}

