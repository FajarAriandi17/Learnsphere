"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, Eye, FileCode2, LayoutTemplate, Plus, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Sheet } from "@/components/ui/sheet";
import { examTemplates } from "@/lib/mock/exams";
import { school } from "@/lib/mock/teacher-data";

interface TemplateItem {
  id: string;
  name: string;
  category: "Ujian" | "Kop Surat" | "Raport" | "Absensi";
  description: string;
  layout: string;
  badge: string;
  recommendedFor: string;
}

const allTemplates: TemplateItem[] = [
  {
    id: "tpl-1",
    name: "Penilaian Tengah Semester (PTS)",
    category: "Ujian",
    description:
      "Naskah resmi 2 kolom A4 dengan kop ganda, tabel identitas siswa titik-titik, dan petunjuk umum terstandar.",
    layout: "2 Kolom · Font Serif 11pt · Header Dinas & Sekolah",
    badge: "Populer",
    recommendedFor: "PTS Semester 1 & 2",
  },
  {
    id: "tpl-2",
    name: "Penilaian Akhir Semester (PAS / SAS)",
    category: "Ujian",
    description:
      "Naskah ujian lengkap dengan lembar jawaban komputer/terpisah, kisi-kisi terlampir, dan petunjuk khusus.",
    layout: "2 Kolom · Lembar Jawaban Terpisah · Kunci & Pedoman Penskoran",
    badge: "Resmi",
    recommendedFor: "Sumatif Akhir Semester",
  },
  {
    id: "tpl-3",
    name: "Ujian Harian & Quiz Cepat",
    category: "Ujian",
    description:
      "Format hemat kertas 1 lembar A4 bolak-balik untuk ulangan reguler 10–15 soal.",
    layout: "1 atau 2 Kolom · Kop Ringkas · Lembar Jawaban Langsung",
    badge: "Hemat Kertas",
    recommendedFor: "Ulangan per Bab",
  },
  {
    id: "tpl-4",
    name: "Remedial & Pengayaan",
    category: "Ujian",
    description:
      "Format terarah dengan kolom analisis kesalahan siswa dan soal setara bertingkat.",
    layout: "1 Kolom · Kolom Refleksi Siswa · Target Indikator",
    badge: "Diferensiasi",
    recommendedFor: "Tindak Lanjut Asesmen",
  },
  {
    id: "tpl-5",
    name: "Kop Surat Resmi Dinas & Sekolah",
    category: "Kop Surat",
    description:
      `Header standar dengan logo Pemda/Dinas, nama sekolah (${school.name}), alamat lengkap, NPSN, dan garis ganda tebal tipis.`,
    layout: "Tengah · Garis Ganda 3pt · Logo Kiri Kanan",
    badge: "Standar Nasional",
    recommendedFor: "Semua Naskah Ujian Resmi",
  },
  {
    id: "tpl-6",
    name: "Kop Sederhana Guru Mata Pelajaran",
    category: "Kop Surat",
    description:
      "Header ringkas tanpa logo formal, fokus pada nama mata pelajaran, kelas, alokasi waktu, dan tanggal pelaksanaan.",
    layout: "Tabel Ramping · Garis Tunggal Hairline",
    badge: "Ringkas",
    recommendedFor: "Latihan & PR",
  },
  {
    id: "tpl-7",
    name: "Raport Kurikulum Merdeka",
    category: "Raport",
    description:
      "Format laporan capaian kompetensi dengan deskripsi naratif AI, rekap nilai TP (Tujuan Pembelajaran), dan portofolio P5.",
    layout: "A4 Portrait · Tabel Deskripsi Kompetensi · Tanda Tangan Wali & Kepsek",
    badge: "Kurikulum 2024",
    recommendedFor: "Raport Semester",
  },
  {
    id: "tpl-8",
    name: "Rekap Presensi Bulanan A4 Landscape",
    category: "Absensi",
    description:
      "Grid tanggal 1–31 untuk seluruh siswa dalam 1 lembar lebar dengan formula persentase otomatis.",
    layout: "A4 Landscape · 36 Siswa · Kolom H/S/I/A & Persentase",
    badge: "Arsip Fisik",
    recommendedFor: "Laporan Bulanan",
  },
];

const categories = ["Semua", "Ujian", "Kop Surat", "Raport", "Absensi"] as const;

export function TemplateGallery() {
  const [selectedCat, setSelectedCat] = React.useState<
    (typeof categories)[number]
  >("Semua");

  const filtered = React.useMemo(() => {
    if (selectedCat === "Semua") return allTemplates;
    return allTemplates.filter((t) => t.category === selectedCat);
  }, [selectedCat]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <Chip
              key={cat}
              selected={selectedCat === cat}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </Chip>
          ))}
        </div>

        <PlannedAction
          variant="solid"
          size="sm"
          reason="Editor template belum tersambung"
        >
          <Plus aria-hidden />
          Buat Template Kustom
        </PlannedAction>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tpl) => (
          <Sheet
            key={tpl.id}
            className="flex flex-col justify-between p-5 hover:border-ink/30 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <Badge tone="ink">{tpl.category}</Badge>
                <span className="text-[11.5px] font-medium text-muted">
                  {tpl.badge}
                </span>
              </div>

              <h3 className="mt-2.5 font-serif text-[17px] font-medium text-ink">
                {tpl.name}
              </h3>

              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                {tpl.description}
              </p>
            </div>

            <div className="mt-4 border-t border-rule-soft pt-3">
              <div className="text-[12px] text-faint">
                <span className="block text-muted font-medium">Spesifikasi:</span>
                <span className="block mt-0.5">{tpl.layout}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[12px] text-muted">
                  Untuk: {tpl.recommendedFor}
                </span>

                <Button asChild variant="quiet" size="sm">
                  <Link href="/ai">
                    <Sparkles aria-hidden className="size-3.5 text-mark" />
                    Gunakan
                  </Link>
                </Button>
              </div>
            </div>
          </Sheet>
        ))}
      </div>

      <PlannedNote>
        Kustomisasi logo sekolah, pengaturan tata letak margin naskah, dan
        ekspor template kustom (.dotx) akan tersedia pada paket langganan
        Sekolah.
      </PlannedNote>
    </div>
  );
}
