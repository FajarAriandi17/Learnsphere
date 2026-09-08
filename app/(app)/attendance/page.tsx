import type { Metadata } from "next";

import { AttendanceGrid } from "@/components/attendance/attendance-grid";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { currentMonth } from "@/lib/mock/administration";
import { taughtClasses } from "@/lib/mock/students";
import { activePeriod } from "@/lib/mock/teacher-data";

export const metadata: Metadata = {
  title: "Absensi",
  description: "Pencatatan presensi harian dan rekap kehadiran siswa.",
};

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ kelas?: string }>;
}) {
  const { kelas } = await searchParams;
  const initialClassId = kelas || taughtClasses[0]?.id || "viii-a";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow={`Tahun ajaran ${activePeriod.academicYear} · semester ${activePeriod.semester}`}
        title="Absensi & Kehadiran"
        description="Rekap presensi bulanan siswa. Hari efektif otomatis disaring pada hari kerja (Senin–Jumat) dan persentase kehadiran dihitung secara langsung."
      />

      <div className="space-y-9">
        <Section
          id="attendance-grid"
          title="Lembar Presensi Kelas"
          note="Klik pada sel kehadiran untuk mengubah tanda secara langsung (Hadir → Sakit → Izin → Alfa)."
        >
          <AttendanceGrid
            classes={taughtClasses}
            initialClassId={initialClassId}
          />
        </Section>
      </div>
    </div>
  );
}
