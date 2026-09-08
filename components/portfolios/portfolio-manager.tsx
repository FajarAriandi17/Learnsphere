"use client";

import * as React from "react";
import Link from "next/link";
import { Award, Download, Paperclip, Plus, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput, Select } from "@/components/ui/field";
import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Toolbar } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { formatShortDate } from "@/lib/format";
import { portfolioItems } from "@/lib/mock/administration";
import { students } from "@/lib/mock/students";
import type { ClassGroup, PortfolioItem, PortfolioKind } from "@/types";

const kinds: Array<PortfolioKind | "Semua"> = [
  "Semua",
  "Projek",
  "Kegiatan",
  "Prestasi",
  "Lomba",
  "Sertifikat",
];

export function PortfolioManager({
  classes,
  initialClassId = "viii-a",
}: {
  classes: ClassGroup[];
  initialClassId?: string;
}) {
  const [selectedClassId, setSelectedClassId] = React.useState(initialClassId);
  const [selectedKind, setSelectedKind] = React.useState<PortfolioKind | "Semua">("Semua");
  const [query, setQuery] = React.useState("");
  const [aiSummary, setAiSummary] = React.useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = React.useState(false);

  const studentMap = React.useMemo(() => {
    return new Map(students.map((s) => [s.id, s]));
  }, []);

  const items = React.useMemo(() => {
    return portfolioItems.filter((item) => {
      const student = studentMap.get(item.studentId);
      if (!student) return false;
      if (selectedClassId !== "semua" && student.classId !== selectedClassId) {
        return false;
      }
      if (selectedKind !== "Semua" && item.kind !== selectedKind) {
        return false;
      }
      const q = query.trim().toLowerCase();
      if (q) {
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          student.name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedClassId, selectedKind, query, studentMap]);

  const handleGenerateAiSummary = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setAiSummary(
        `Ringkasan Portofolio Semester 1 (Kelas VIII-A): Siswa menunjukkan antusiasme tinggi dalam projek numerasi terapan, khususnya pada topik pengolahan data jajanan dan model geometri kardus. Sebanyak 8 siswa telah mencatatkan portofolio terverifikasi meliputi keikutsertaan olimpiade kota, kepanitiaan pekan numerasi, dan pelatihan daring. Secara keseluruhan, integrasi konsep kontekstual tercapai dengan predikat Sangat Baik.`,
      );
      setIsGeneratingAi(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* AI Narrative Assistant Banner */}
      <Sheet className="border-mark/25 bg-mark-tint/30 p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden className="size-4 text-mark" />
              <h3 className="font-serif text-[15px] font-medium text-ink">
                AI Asisten Portofolio
              </h3>
            </div>
            <p className="max-w-[70ch] text-[12.5px] leading-relaxed text-ink-soft">
              Otomasi penyusunan narasi portofolio siswa menjadi paragraf deskripsi
              utuh untuk lampiran raport Kurikulum Merdeka.
            </p>
          </div>

          <Button
            type="button"
            variant="solid"
            size="sm"
            onClick={handleGenerateAiSummary}
            disabled={isGeneratingAi}
          >
            <Sparkles aria-hidden />
            {isGeneratingAi ? "Menyusun ringkasan..." : "Susun Narasi Lampiran"}
          </Button>
        </div>

        {aiSummary ? (
          <div className="mt-3 rounded-[var(--radius-control)] border border-mark/20 bg-sheet p-3 text-[13px] leading-relaxed text-ink">
            <span className="font-semibold text-mark">Draf Narasi: </span>
            {aiSummary}
          </div>
        ) : null}
      </Sheet>

      <Toolbar>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            aria-label="Pilih kelas"
            className="w-auto font-medium"
          >
            <option value="semua">Semua kelas</option>
            {classes.map((group) => (
              <option key={group.id} value={group.id}>
                Kelas {group.name}
              </option>
            ))}
          </Select>

          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari siswa atau judul..."
            aria-label="Cari portofolio"
            className="w-full sm:w-56"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <PlannedAction
            variant="solid"
            size="sm"
            reason="Formulir tambah portofolio belum tersambung"
          >
            <Plus aria-hidden />
            Tambah Catatan
          </PlannedAction>

          <PlannedAction
            size="sm"
            reason="Ekspor portofolio PDF belum tersambung"
          >
            <Download aria-hidden />
            Cetak Lampiran PDF
          </PlannedAction>
        </div>
      </Toolbar>

      {/* Category Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {kinds.map((k) => (
          <Chip
            key={k}
            selected={selectedKind === k}
            onClick={() => setSelectedKind(k)}
          >
            {k}
          </Chip>
        ))}
        <span className="figures ms-auto text-[12px] text-muted">
          {items.length} catatan ditemukan
        </span>
      </div>

      {/* Portfolio Items List */}
      {items.length === 0 ? (
        <Sheet>
          <EmptyState
            title="Tidak ada catatan portofolio"
            description="Belum ada catatan kegiatan atau projek yang cocok dengan filter yang dipilih."
          />
        </Sheet>
      ) : (
        <Sheet className="overflow-hidden">
          <ul>
            {items.map((item) => {
              const student = studentMap.get(item.studentId);
              return (
                <li
                  key={item.id}
                  className="border-t border-rule-soft px-4 py-4 first:border-t-0 hover:bg-paper/30 transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="ink">{item.kind}</Badge>
                      <h3 className="font-serif text-[16px] font-medium text-ink">
                        {item.title}
                      </h3>
                    </div>
                    <span className="figures text-[12px] text-faint">
                      {formatShortDate(item.date, true)}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-[12.5px] text-muted">
                    <span>
                      Siswa:{" "}
                      {student ? (
                        <Link
                          href={`/students/${student.id}`}
                          className="font-medium text-ink hover:underline"
                        >
                          {student.name} ({student.nis})
                        </Link>
                      ) : (
                        "—"
                      )}
                    </span>
                    <span>·</span>
                    <span>Mata pelajaran: {item.subject}</span>
                  </div>

                  <p className="mt-2 max-w-[76ch] text-[13px] leading-relaxed text-ink-soft">
                    {item.description}
                  </p>

                  <div className="mt-2.5 max-w-[76ch] border-l-2 border-rule pl-3 text-[12.5px] leading-relaxed text-muted">
                    <span className="font-medium text-ink">Catatan guru: </span>
                    {item.teacherNote}
                  </div>

                  {item.evidence ? (
                    <div className="mt-2.5 flex items-center gap-1.5 text-[12px] text-faint">
                      <Paperclip aria-hidden className="size-3.5" />
                      <span>Bukti karya: {item.evidence}</span>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Sheet>
      )}

      <PlannedNote>
        Pengunggahan berkas bukti (PDF/foto karya siswa) dan sinkronisasi
        langsung dengan rapor P5 (Projek Penguatan Profil Pelajar Pancasila)
        akan aktif saat backend penyimpanan berkas siap.
      </PlannedNote>
    </div>
  );
}
