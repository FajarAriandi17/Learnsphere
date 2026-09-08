import * as React from "react";
import { Zap, BookOpenText, Target, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Buat Soal Instan",
    description: "Hasilkan naskah soal lengkap dengan kunci dan pembahasan dalam hitungan menit menggunakan AI."
  },
  {
    icon: BookOpenText,
    title: "Sesuai Kurikulum",
    description: "Soal disusun berdasarkan capaian kompetensi kurikulum yang berlaku di Indonesia."
  },
  {
    icon: Target,
    title: "Analisis Kemampuan",
    description: "Pahami titik lemah siswa dengan cepat melalui analisis hasil ujian yang mendalam."
  },
  {
    icon: Users,
    title: "Manajemen Kelas",
    description: "Administrasi siswa, absensi, dan raport yang terintegrasi dalam satu platform."
  }
];

export function Features() {
  return (
    <section className="py-24 bg-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-serif text-[24px] font-semibold text-ink text-center mb-16">
          Dirancang untuk Membantu Guru Indonesia
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="p-6 border border-rule bg-sheet">
              <f.icon className="size-8 text-mark mb-4" />
              <h3 className="text-[16px] font-medium text-ink mb-2">{f.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
