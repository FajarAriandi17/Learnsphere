"use client";

import * as React from "react";
import Link from "next/link";
import { Download, FileSpreadsheet, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyRow } from "@/components/ui/empty-state";
import { SearchInput, Select } from "@/components/ui/field";
import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Toolbar } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import {
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableScroll,
} from "@/components/ui/table";
import { formatNumber, formatPercent } from "@/lib/format";
import {
  finalScore,
  kkm,
  predicateFor,
  reportRowsFor,
} from "@/lib/mock/administration";
import { studentsInClass } from "@/lib/mock/students";
import { teacher } from "@/lib/mock/teacher-data";
import type { ClassGroup, ReportRow } from "@/types";

const aiNoteTemplates = [
  "Menunjukkan penguasaan sangat baik pada konsep utama. Mampu menyelesaikan soal kontekstual secara mandiri dan sistematis.",
  "Memahami materi dengan baik. Perlu meningkatkan ketelitian dalam perhitungan langkah akhir.",
  "Aktif berdiskusi dan menunjukkan perkembangan positif. Disarankan memperbanyak latihan soal penalaran tingkat lanjut.",
  "Mencapai kriteria ketuntasan dengan pendampingan. Perlu penguatan konsep dasar melalui remedial terstruktur.",
  "Sangat kreatif dalam memilih strategi penyelesaian masalah. Pertahankan konsistensi belajar.",
];

export function ReportTable({
  classes,
  initialClassId = "viii-a",
}: {
  classes: ClassGroup[];
  initialClassId?: string;
}) {
  const [selectedClassId, setSelectedClassId] = React.useState(initialClassId);
  const [query, setQuery] = React.useState("");
  const [rows, setRows] = React.useState<Record<string, ReportRow>>({});

  // Initialize/reset rows when class changes
  React.useEffect(() => {
    const defaultRows = reportRowsFor(selectedClassId);
    const map: Record<string, ReportRow> = {};
    for (const r of defaultRows) {
      map[r.studentId] = r;
    }
    setRows(map);
  }, [selectedClassId]);

  const classStudents = React.useMemo(() => {
    return studentsInClass(selectedClassId);
  }, [selectedClassId]);

  const filteredStudents = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return classStudents;
    return classStudents.filter(
      (s) => s.name.toLowerCase().includes(q) || s.nis.includes(q),
    );
  }, [classStudents, query]);

  const handleScoreChange = (
    studentId: string,
    field: "knowledge" | "skills",
    value: string,
  ) => {
    const num = Math.min(100, Math.max(0, parseInt(value) || 0));
    setRows((prev) => {
      const current = prev[studentId] || {
        studentId,
        knowledge: 75,
        skills: 75,
        note: "",
      };
      return {
        ...prev,
        [studentId]: {
          ...current,
          [field]: num,
        },
      };
    });
  };

  const handleGenerateAiNote = (studentId: string, studentName: string) => {
    const current = rows[studentId] || {
      studentId,
      knowledge: 75,
      skills: 75,
      note: "",
    };
    const final = finalScore(current.knowledge, current.skills);
    let note = aiNoteTemplates[2];
    if (final >= 90) note = aiNoteTemplates[0];
    else if (final >= 80) note = aiNoteTemplates[1];
    else if (final >= 75) note = aiNoteTemplates[2];
    else note = aiNoteTemplates[3];

    setRows((prev) => ({
      ...prev,
      [studentId]: {
        ...current,
        note: `${studentName}: ${note}`,
      },
    }));
  };

  const handleBatchGenerateAi = () => {
    setRows((prev) => {
      const next = { ...prev };
      for (const s of classStudents) {
        const current = next[s.id] || {
          studentId: s.id,
          knowledge: 75,
          skills: 75,
          note: "",
        };
        const final = finalScore(current.knowledge, current.skills);
        let note = aiNoteTemplates[2];
        if (final >= 90) note = aiNoteTemplates[0];
        else if (final >= 80) note = aiNoteTemplates[1];
        else if (final >= 75) note = aiNoteTemplates[2];
        else note = aiNoteTemplates[3];

        next[s.id] = {
          ...current,
          note: `${s.name}: ${note}`,
        };
      }
      return next;
    });
  };

  // Summary statistics
  const stats = React.useMemo(() => {
    const allFinals = classStudents.map((s) => {
      const r = rows[s.id];
      return r ? finalScore(r.knowledge, r.skills) : 0;
    });

    if (allFinals.length === 0) {
      return { avg: 0, max: 0, min: 0, tuntas: 0, count: 0 };
    }

    const sum = allFinals.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / allFinals.length);
    const max = Math.max(...allFinals);
    const min = Math.min(...allFinals);
    const tuntas = allFinals.filter((score) => score >= kkm).length;

    return { avg, max, min, tuntas, count: allFinals.length };
  }, [classStudents, rows]);

  const predicateTone = {
    A: "tuntas",
    B: "tuntas",
    C: "amber",
    D: "mark",
  } as const;

  const currentGroup = classes.find((c) => c.id === selectedClassId);

  return (
    <div className="space-y-6">
      {/* Summary Stat Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Sheet className="p-3.5">
          <span className="text-[12px] text-faint">Rata-rata kelas</span>
          <p className="figures mt-1 text-[22px] font-semibold text-ink">
            {stats.avg}
          </p>
          <span className="text-[11.5px] text-muted">
            Mata pelajaran {teacher.subject}
          </span>
        </Sheet>

        <Sheet className="p-3.5">
          <span className="text-[12px] text-faint">Nilai tertinggi / terendah</span>
          <p className="figures mt-1 text-[22px] font-semibold text-ink">
            {stats.max}{" "}
            <span className="text-[14px] font-normal text-faint">/ {stats.min}</span>
          </p>
          <span className="text-[11.5px] text-muted">Rentang nilai siswa</span>
        </Sheet>

        <Sheet className="p-3.5">
          <span className="text-[12px] text-faint">Tingkat ketuntasan</span>
          <p className="figures mt-1 text-[22px] font-semibold text-tuntas">
            {formatPercent((stats.tuntas / (stats.count || 1)) * 100, 0)}
          </p>
          <span className="text-[11.5px] text-muted">
            {stats.tuntas} dari {stats.count} siswa ≥ {kkm}
          </span>
        </Sheet>

        <Sheet className="p-3.5">
          <span className="text-[12px] text-faint">Bobot penilaian</span>
          <p className="figures mt-1 text-[18px] font-medium text-ink">
            60% <span className="text-[13px] text-faint">Pengetahuan</span>
          </p>
          <span className="text-[11.5px] text-muted">40% Keterampilan</span>
        </Sheet>
      </div>

      <Toolbar>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            aria-label="Pilih kelas"
            className="w-auto font-medium"
          >
            {classes.map((group) => (
              <option key={group.id} value={group.id}>
                Kelas {group.name} ({group.studentCount} siswa)
              </option>
            ))}
          </Select>

          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari siswa..."
            aria-label="Cari siswa dalam kelas"
            className="w-full sm:w-56"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBatchGenerateAi}
            title="Generate deskripsi capaian otomatis untuk semua siswa"
          >
            <Sparkles aria-hidden />
            Buat Catatan AI Otomatis
          </Button>
          <PlannedAction
            size="sm"
            reason="Ekspor raport PDF belum tersambung"
          >
            <Download aria-hidden />
            Cetak Raport PDF
          </PlannedAction>
          <PlannedAction
            size="sm"
            reason="Ekspor Excel belum tersambung"
          >
            <FileSpreadsheet aria-hidden />
            Ekspor XLSX
          </PlannedAction>
        </div>
      </Toolbar>

      <Sheet className="overflow-hidden">
        <TableScroll>
          <Table>
            <THead>
              <tr>
                <TH numeric className="w-12">
                  No
                </TH>
                <TH>Nama Siswa</TH>
                <TH numeric className="w-24">
                  Pengetahuan (60%)
                </TH>
                <TH numeric className="w-24">
                  Keterampilan (40%)
                </TH>
                <TH numeric className="w-20">
                  Nilai Akhir
                </TH>
                <TH className="w-28">Predikat</TH>
                <TH>Catatan Capaian Kompetensi / Guru</TH>
                <TH className="w-20 text-right">Aksi AI</TH>
              </tr>
            </THead>
            <TBody>
              {filteredStudents.length === 0 ? (
                <EmptyRow
                  span={8}
                  title="Tidak ada siswa"
                  description="Tidak ada siswa yang sesuai pencarian dalam kelas ini."
                />
              ) : (
                filteredStudents.map((student, i) => {
                  const row = rows[student.id] || {
                    studentId: student.id,
                    knowledge: 75,
                    skills: 75,
                    note: "",
                  };
                  const final = finalScore(row.knowledge, row.skills);
                  const pred = predicateFor(final);

                  return (
                    <TR key={student.id}>
                      <TD numeric className="text-faint">
                        {i + 1}
                      </TD>
                      <TD className="min-w-44">
                        <Link
                          href={`/students/${student.id}`}
                          className="font-medium text-ink hover:underline"
                        >
                          {student.name}
                        </Link>
                        <span className="figures block text-[11.5px] text-faint">
                          NIS {student.nis}
                        </span>
                      </TD>
                      <TD numeric>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={row.knowledge}
                          onChange={(e) =>
                            handleScoreChange(
                              student.id,
                              "knowledge",
                              e.target.value,
                            )
                          }
                          aria-label={`Nilai pengetahuan ${student.name}`}
                          className="figures w-16 rounded-[var(--radius-control)] border border-rule bg-sheet px-2 py-1 text-right text-[13.5px] font-medium text-ink focus:border-ink focus:outline-none"
                        />
                      </TD>
                      <TD numeric>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={row.skills}
                          onChange={(e) =>
                            handleScoreChange(
                              student.id,
                              "skills",
                              e.target.value,
                            )
                          }
                          aria-label={`Nilai keterampilan ${student.name}`}
                          className="figures w-16 rounded-[var(--radius-control)] border border-rule bg-sheet px-2 py-1 text-right text-[13.5px] font-medium text-ink focus:border-ink focus:outline-none"
                        />
                      </TD>
                      <TD numeric>
                        <span className="figures text-[14.5px] font-semibold text-ink">
                          {final}
                        </span>
                      </TD>
                      <TD>
                        <Badge
                          tone={
                            predicateTone[pred.letter as "A" | "B" | "C" | "D"]
                          }
                        >
                          {pred.letter} · {pred.label}
                        </Badge>
                      </TD>
                      <TD className="min-w-64">
                        <input
                          type="text"
                          value={row.note}
                          onChange={(e) => {
                            const val = e.target.value;
                            setRows((prev) => ({
                              ...prev,
                              [student.id]: {
                                ...(prev[student.id] || row),
                                note: val,
                              },
                            }));
                          }}
                          placeholder="Tulis catatan atau gunakan tombol AI..."
                          aria-label={`Catatan capaian ${student.name}`}
                          className="w-full rounded-[var(--radius-control)] border border-rule bg-sheet px-2.5 py-1 text-[12.5px] text-ink-soft placeholder:text-faint focus:border-ink focus:outline-none"
                        />
                      </TD>
                      <TD className="text-right">
                        <Button
                          type="button"
                          variant="quiet"
                          size="sm"
                          onClick={() =>
                            handleGenerateAiNote(student.id, student.name)
                          }
                          title="Generate deskripsi dengan AI"
                        >
                          <Sparkles aria-hidden className="size-3.5 text-mark" />
                          <span className="sr-only">AI Note</span>
                        </Button>
                      </TD>
                    </TR>
                  );
                })
              )}
            </TBody>
          </Table>
        </TableScroll>
      </Sheet>

      <PlannedNote>
        Perubahan nilai tersimpan langsung di memori tampilan lokal. Penyimpanan
        otomatis ke pangkalan data sekolah dan tanda tangan digital raport akan
        aktif saat integrasi backend selesai.
      </PlannedNote>
    </div>
  );
}
