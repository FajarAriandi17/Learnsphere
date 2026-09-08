import { FileDown, FileText } from "lucide-react";

import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Sheet } from "@/components/ui/sheet";

/** PRD §13 export options, in the two formats a school actually hands out. */
const formats = [
  {
    id: "docx",
    name: "Microsoft Word (.docx)",
    icon: FileText,
    note: "Bisa disunting lagi sebelum dicetak.",
    options: [
      "Versi siswa",
      "Versi guru",
      "Soal + kunci jawaban",
      "Soal saja",
    ],
  },
  {
    id: "pdf",
    name: "PDF siap cetak",
    icon: FileDown,
    note: "Tata letak A4 terkunci, aman untuk fotokopi.",
    options: [
      "Versi siswa",
      "Versi guru",
      "Kunci jawaban",
      "Lembar jawaban terpisah",
    ],
  },
] as const;

export function ExportPanel() {
  return (
    <Sheet className="overflow-hidden">
      {formats.map(({ id, name, icon: Icon, note, options }) => (
        <div key={id} className="border-t border-rule px-4 py-3.5 first:border-t-0">
          <div className="flex items-baseline gap-2">
            <Icon aria-hidden className="size-4 shrink-0 translate-y-0.5 text-muted" />
            <h3 className="text-[13.5px] font-medium text-ink">{name}</h3>
            <span className="text-[12px] text-faint">{note}</span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {options.map((option) => (
              <PlannedAction
                key={option}
                size="sm"
                reason="Layanan dokumen belum tersambung"
              >
                {option}
              </PlannedAction>
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-rule bg-paper/50 px-4 py-3">
        <PlannedNote>
          Berkas dibuat oleh layanan dokumen (DOCX, PDF, XLSX) yang belum
          tersambung pada versi ini. Tombolnya dibiarkan mati agar tidak ada
          unduhan kosong; profil sekolah, kop, dan tanda tangan sudah disiapkan
          untuk dipakai begitu layanan itu aktif.
        </PlannedNote>
      </div>
    </Sheet>
  );
}
