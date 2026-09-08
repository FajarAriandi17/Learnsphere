import type { Metadata } from "next";

import { PortfolioManager } from "@/components/portfolios/portfolio-manager";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { taughtClasses } from "@/lib/mock/students";
import { activePeriod } from "@/lib/mock/teacher-data";

export const metadata: Metadata = {
  title: "Portofolio",
  description: "Rekam jejak kegiatan, projek, dan prestasi siswa.",
};

export default async function PortfoliosPage({
  searchParams,
}: {
  searchParams: Promise<{ kelas?: string }>;
}) {
  const { kelas } = await searchParams;
  const initialClassId = kelas || "viii-a";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow={`Tahun ajaran ${activePeriod.academicYear} · semester ${activePeriod.semester}`}
        title="Portofolio Siswa"
        description="Dokumentasi karya, projek numerasi, dan capaian prestasi siswa. Terhubung langsung dengan narasi pelaporan hasil belajar."
      />

      <div className="space-y-9">
        <Section
          id="portfolio-list"
          title="Daftar Portofolio & Projek"
          note="Saring menurut kelas atau kategori. Buat narasi otomatis untuk lampiran raport menggunakan bantuan asisten AI."
        >
          <PortfolioManager
            classes={taughtClasses}
            initialClassId={initialClassId}
          />
        </Section>
      </div>
    </div>
  );
}
