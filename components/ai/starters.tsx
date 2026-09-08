"use client";

import { CornerDownLeft, Sparkles, FileText, LayoutList } from "lucide-react";

const templates = [
  {
    id: "a",
    title: "Latihan Harian",
    description: "Cepat & praktis untuk kuis dadakan di kelas.",
    icon: Sparkles,
    prompt: "Buat 10 soal pilihan ganda [Materi] tingkat sedang untuk latihan harian.",
    tone: "bg-sky text-sky-ink",
  },
  {
    id: "b",
    title: "Sumatif Tengah Semester",
    description: "Cakupan materi lebih luas dengan variasi soal.",
    icon: LayoutList,
    prompt: "Buat 30 soal (20 pilgan, 10 uraian) untuk Sumatif Tengah Semester materi [Materi].",
    tone: "bg-lilac text-lilac-ink",
  },
  {
    id: "c",
    title: "Ujian Akhir Semester",
    description: "Komprehensif, HOTS, dan siap cetak sesuai kurikulum.",
    icon: FileText,
    prompt: "Buat 40 soal komprehensif tingkat sulit/HOTS untuk Ujian Akhir Semester materi [Materi].",
    tone: "bg-mint text-mint-ink",
  },
];

export function Starters({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="py-6">
      <h2 className="text-[24px] leading-tight font-bold tracking-tight text-ink sm:text-[28px]">
        Mau buat soal apa hari ini?
      </h2>
      <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-muted">
        Pilih template di bawah atau tulis permintaan Anda sendiri. Soal akan otomatis mengikuti kurikulum dan jenjang yang Anda tentukan.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onPick(tpl.prompt)}
              className="group flex flex-col text-left transition-transform active:scale-[0.98]"
            >
              <div className="flex flex-1 flex-col rounded-[var(--radius-sheet)] border border-rule bg-sheet p-4 shadow-card transition-colors group-hover:border-primary/30 group-hover:bg-paper">
                <span className={`flex size-10 items-center justify-center rounded-[12px] ${tpl.tone}`}>
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-bold text-ink">
                  {tpl.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                  {tpl.description}
                </p>
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary">
                    Gunakan template
                    <CornerDownLeft className="size-3" />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
