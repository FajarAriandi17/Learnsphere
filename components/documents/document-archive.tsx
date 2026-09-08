"use client";

import * as React from "react";
import { Download, FileUp, Filter } from "lucide-react";

import { DocumentTable } from "@/components/documents/document-table";
import { Chip } from "@/components/ui/chip";
import { SearchInput, Select } from "@/components/ui/field";
import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Toolbar } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { documents as allDocuments } from "@/lib/mock/administration";
import type { DocumentFormat, DocumentStatus, GeneratedDocument } from "@/types";

const kinds = [
  "Semua jenis",
  "Ujian",
  "Kunci jawaban",
  "Raport",
  "Absensi",
  "Portofolio",
];

const formats: Array<DocumentFormat | "Semua format"> = [
  "Semua format",
  "PDF",
  "DOCX",
  "XLSX",
];

export function DocumentArchive({
  initialContext,
}: {
  initialContext?: string;
}) {
  const [query, setQuery] = React.useState(initialContext || "");
  const [selectedKind, setSelectedKind] = React.useState("Semua jenis");
  const [selectedFormat, setSelectedFormat] = React.useState<
    DocumentFormat | "Semua format"
  >("Semua format");
  const [selectedStatus, setSelectedStatus] = React.useState<
    DocumentStatus | "semua"
  >("semua");

  const filtered = React.useMemo(() => {
    return allDocuments.filter((doc) => {
      if (selectedKind !== "Semua jenis" && doc.kind !== selectedKind) {
        return false;
      }
      if (selectedFormat !== "Semua format" && doc.format !== selectedFormat) {
        return false;
      }
      if (selectedStatus !== "semua" && doc.status !== selectedStatus) {
        return false;
      }
      const q = query.trim().toLowerCase();
      if (q) {
        return (
          doc.name.toLowerCase().includes(q) ||
          doc.context.toLowerCase().includes(q) ||
          doc.kind.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, selectedKind, selectedFormat, selectedStatus]);

  return (
    <div className="space-y-6">
      <Toolbar>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama dokumen atau kelas..."
            aria-label="Cari dokumen"
            className="w-full sm:w-64"
          />

          <Select
            value={selectedKind}
            onChange={(e) => setSelectedKind(e.target.value)}
            aria-label="Filter jenis dokumen"
            className="w-auto"
          >
            {kinds.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </Select>

          <Select
            value={selectedFormat}
            onChange={(e) =>
              setSelectedFormat(e.target.value as DocumentFormat | "Semua format")
            }
            aria-label="Filter format berkas"
            className="w-auto"
          >
            {formats.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>

          <Select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as DocumentStatus | "semua")
            }
            aria-label="Filter status ekspor"
            className="w-auto"
          >
            <option value="semua">Semua status</option>
            <option value="siap">Siap diunduh</option>
            <option value="diproses">Sedang diproses</option>
            <option value="gagal">Gagal / Perlu ulang</option>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <PlannedAction reason="Unggah berkas arsip belum tersambung">
            <FileUp aria-hidden />
            Unggah Berkas
          </PlannedAction>
        </div>
      </Toolbar>

      <Sheet className="overflow-hidden">
        <DocumentTable
          documents={filtered}
          emptyTitle="Tidak ada dokumen yang sesuai"
          emptyDescription="Coba ubah kata kunci pencarian atau bersihkan filter jenis dan format berkas."
        />
      </Sheet>

      <div className="flex items-center justify-between px-1 text-[12px] text-muted">
        <p className="figures">
          Menampilkan {filtered.length} dari {allDocuments.length} total dokumen
          terarsip.
        </p>
        <p className="text-faint">
          * Berkas PDF dan DOCX disimpan di cloud storage terenkripsi.
        </p>
      </div>

      <PlannedNote>
        Pengunduhan berkas fisik, penyimpanan cloud permanen, dan tautan unduh
        berjangka waktu untuk wali murid akan aktif saat modul storage backend
        terpasang.
      </PlannedNote>
    </div>
  );
}
