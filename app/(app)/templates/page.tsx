import type { Metadata } from "next";

import { TemplateGallery } from "@/components/templates/template-gallery";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Template",
  description: "Standar tata letak soal, kop surat, raport, dan absensi.",
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow="Standar Tata Letak & Dokumen"
        title="Template Naskah & Dokumen"
        description="Pilih template tata letak terstandar untuk ujian, kop surat sekolah resmi, buku nilai raport, dan lembar presensi agar dokumen yang dicetak rapi dan konsisten."
      />

      <div className="space-y-9">
        <Section
          id="gallery"
          title="Pilihan Template Siap Pakai"
          note="Setiap template sudah disesuaikan dengan standar format administrasi sekolah di Indonesia."
        >
          <TemplateGallery />
        </Section>
      </div>
    </div>
  );
}
