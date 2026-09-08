import type { Metadata } from "next";

import { DocumentArchive } from "@/components/documents/document-archive";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Dokumen",
  description: "Arsip berkas ujian, raport, absensi, dan portofolio.",
};

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ kelas?: string }>;
}) {
  const { kelas } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow="Arsip & Penyimpanan Berkas"
        title="Dokumen Terbitan"
        description="Pusat penyimpanan seluruh berkas PDF, Word (.docx), dan Excel (.xlsx) yang dihasilkan dari modul AI Buat Soal, Raport, Absensi, dan Portofolio."
      />

      <div className="space-y-9">
        <Section
          id="archive"
          title="Daftar Dokumen Tersimpan"
          note="Gunakan filter format dan jenis berkas untuk mempercepat pencarian arsip semester ini."
        >
          <DocumentArchive initialContext={kelas} />
        </Section>
      </div>
    </div>
  );
}
