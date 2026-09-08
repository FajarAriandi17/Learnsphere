import type { Metadata } from "next";

import { ReportTable } from "@/components/report-cards/report-table";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { taughtClasses } from "@/lib/mock/students";
import { activePeriod, teacher } from "@/lib/mock/teacher-data";

export const metadata: Metadata = {
  title: "Raport",
  description: "Pengisian nilai dan catatan capaian kompetensi siswa.",
};

export default async function ReportCardsPage({
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
        title="Raport & Penilaian"
        description={`Kelola nilai ${teacher.subject} siswa per kelas. Bobot 60% pengetahuan dan 40% keterampilan dihitung otomatis beserta predikat dan narasi capaian AI.`}
      />

      <div className="space-y-9">
        <Section
          id="report-table"
          title="Buku Nilai Mata Pelajaran"
          note="Nilai langsung dihitung predikatnya sesuai KKM 75. Klik ikon AI pada kolom kanan untuk membuat kalimat deskripsi capaian berdasarkan pencapaian siswa."
        >
          <ReportTable
            classes={taughtClasses}
            initialClassId={initialClassId}
          />
        </Section>
      </div>
    </div>
  );
}
