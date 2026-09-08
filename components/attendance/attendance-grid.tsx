"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCheck, Download, FileSpreadsheet } from "lucide-react";

import {
  attendanceLabels,
  buildAttendance,
  countMarks,
  currentMonth,
  schoolDays,
} from "@/lib/mock/administration";
import { markOrder, markTone } from "@/components/attendance/marks";
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
import { formatMonth, formatNumber, formatPercent } from "@/lib/format";
import { studentsInClass } from "@/lib/mock/students";
import { cn } from "@/lib/utils";
import type { AttendanceStatus, ClassGroup } from "@/types";

const months = [
  { year: 2026, month: 6, label: "Juli 2026" },
  { year: 2026, month: 7, label: "Agustus 2026" },
  { year: 2026, month: 8, label: "September 2026" },
  { year: 2026, month: 9, label: "Oktober 2026" },
];

const nextStatus: Record<AttendanceStatus, AttendanceStatus> = {
  H: "S",
  S: "I",
  I: "A",
  A: "H",
};

export function AttendanceGrid({
  classes,
  initialClassId = "viii-a",
}: {
  classes: ClassGroup[];
  initialClassId?: string;
}) {
  const [selectedClassId, setSelectedClassId] = React.useState(initialClassId);
  const [selectedMonthIdx, setSelectedMonthIdx] = React.useState(2); // September 2026
  const [query, setQuery] = React.useState("");

  const activeM = months[selectedMonthIdx] || months[2];
  const days = React.useMemo(() => {
    return schoolDays(activeM.year, activeM.month);
  }, [activeM.year, activeM.month]);

  const [grid, setGrid] = React.useState<Record<string, AttendanceStatus[]>>({});

  // Reset grid when class or month changes
  React.useEffect(() => {
    const initialGrid = buildAttendance(
      selectedClassId,
      activeM.year,
      activeM.month,
    );
    setGrid(initialGrid);
  }, [selectedClassId, activeM.year, activeM.month]);

  const students = React.useMemo(() => {
    return studentsInClass(selectedClassId);
  }, [selectedClassId]);

  const filteredStudents = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.nis.includes(q),
    );
  }, [students, query]);

  const handleCycleMark = (studentId: string, dayIndex: number) => {
    setGrid((prev) => {
      const currentMarks = prev[studentId] || days.map(() => "H");
      const currentMark = currentMarks[dayIndex] || "H";
      const next = nextStatus[currentMark];
      const updatedMarks = [...currentMarks];
      updatedMarks[dayIndex] = next;
      return {
        ...prev,
        [studentId]: updatedMarks,
      };
    });
  };

  const handleMarkAllPresent = () => {
    setGrid((prev) => {
      const next: Record<string, AttendanceStatus[]> = {};
      for (const s of students) {
        next[s.id] = days.map(() => "H");
      }
      return next;
    });
  };

  // Class overview calculations
  const overview = React.useMemo(() => {
    let totalH = 0;
    let totalS = 0;
    let totalI = 0;
    let totalA = 0;
    let totalMarks = 0;
    let belowThreshold = 0;

    for (const s of students) {
      const marks = grid[s.id] || [];
      const stats = countMarks(marks);
      totalH += stats.H;
      totalS += stats.S;
      totalI += stats.I;
      totalA += stats.A;
      totalMarks += marks.length;
      if (stats.percent < 85) {
        belowThreshold += 1;
      }
    }

    const avgPercent = totalMarks ? (totalH / totalMarks) * 100 : 100;
    return {
      avgPercent,
      totalH,
      totalS,
      totalI,
      totalA,
      effectiveDays: days.length,
      belowThreshold,
      studentCount: students.length,
    };
  }, [students, grid, days.length]);

  return (
    <div className="space-y-6">
      {/* Stat Tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Sheet className="p-3.5">
          <span className="text-[12px] text-faint">Rata-rata kehadiran</span>
          <p className="figures mt-1 text-[22px] font-semibold text-tuntas">
            {formatPercent(overview.avgPercent)}
          </p>
          <span className="text-[11.5px] text-muted">
            Bulan {activeM.label}
          </span>
        </Sheet>

        <Sheet className="p-3.5">
          <span className="text-[12px] text-faint">Hari efektif belajar</span>
          <p className="figures mt-1 text-[22px] font-semibold text-ink">
            {overview.effectiveDays} hari
          </p>
          <span className="text-[11.5px] text-muted">Senin s.d. Jumat</span>
        </Sheet>

        <Sheet className="p-3.5">
          <span className="text-[12px] text-faint">Perlu perhatian (&lt;85%)</span>
          <p
            className={cn(
              "figures mt-1 text-[22px] font-semibold",
              overview.belowThreshold > 0 ? "text-amber" : "text-muted",
            )}
          >
            {overview.belowThreshold} siswa
          </p>
          <span className="text-[11.5px] text-muted">
            Kehadiran di bawah batas minimum
          </span>
        </Sheet>

        <Sheet className="p-3.5">
          <span className="text-[12px] text-faint">Rekap absen kelas</span>
          <p className="figures mt-1 text-[16px] font-medium text-ink">
            S: {overview.totalS} · I: {overview.totalI} · A: {overview.totalA}
          </p>
          <span className="text-[11.5px] text-muted">
            Total ketidakhadiran bulan ini
          </span>
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
                Kelas {group.name}
              </option>
            ))}
          </Select>

          <Select
            value={selectedMonthIdx}
            onChange={(e) => setSelectedMonthIdx(Number(e.target.value))}
            aria-label="Pilih bulan"
            className="w-auto"
          >
            {months.map((m, idx) => (
              <option key={m.label} value={idx}>
                {m.label}
              </option>
            ))}
          </Select>

          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari siswa..."
            aria-label="Cari siswa"
            className="w-full sm:w-48"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMarkAllPresent}
            title="Tandai semua siswa hadir untuk seluruh hari"
          >
            <CheckCheck aria-hidden />
            Semua Hadir
          </Button>
          <PlannedAction
            size="sm"
            reason="Ekspor absensi PDF belum tersambung"
          >
            <Download aria-hidden />
            Cetak Rekap PDF
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

      {/* Interactive Grid Sheet */}
      <Sheet className="overflow-hidden">
        <TableScroll>
          <Table>
            <THead>
              <tr>
                <TH numeric className="w-10 sticky left-0 z-10 bg-paper/90">
                  No
                </TH>
                <TH className="min-w-44 sticky left-10 z-10 bg-paper/90 border-r border-rule">
                  Nama Siswa
                </TH>
                {days.map((day) => (
                  <TH key={day} numeric className="w-8 px-1 text-center font-normal">
                    {day}
                  </TH>
                ))}
                <TH numeric className="w-10 border-l border-rule">
                  H
                </TH>
                <TH numeric className="w-10">
                  S
                </TH>
                <TH numeric className="w-10">
                  I
                </TH>
                <TH numeric className="w-10">
                  A
                </TH>
                <TH numeric className="w-16">
                  %
                </TH>
              </tr>
            </THead>
            <TBody>
              {filteredStudents.length === 0 ? (
                <EmptyRow
                  span={days.length + 7}
                  title="Tidak ada data siswa"
                  description="Periksa kata kunci pencarian atau pilih kelas lain."
                />
              ) : (
                filteredStudents.map((student, i) => {
                  const marks = grid[student.id] || days.map(() => "H");
                  const stats = countMarks(marks);

                  return (
                    <TR key={student.id}>
                      <TD numeric className="text-faint sticky left-0 z-10 bg-sheet">
                        {i + 1}
                      </TD>
                      <TD className="min-w-44 sticky left-10 z-10 bg-sheet border-r border-rule">
                        <Link
                          href={`/students/${student.id}`}
                          className="font-medium text-ink hover:underline"
                        >
                          {student.name}
                        </Link>
                      </TD>
                      {days.map((day, dIdx) => {
                        const mark = marks[dIdx] || "H";
                        return (
                          <TD key={day} className="p-0.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleCycleMark(student.id, dIdx)}
                              title={`Tgl ${day}: ${student.name} (${attendanceLabels[mark]}). Klik untuk ubah.`}
                              aria-label={`Tgl ${day}: ${attendanceLabels[mark]}`}
                              className={cn(
                                "flex size-7 items-center justify-center rounded-[3px] text-[11.5px] font-semibold transition-colors mx-auto",
                                markTone[mark],
                                "hover:ring-1 hover:ring-ink/30 cursor-pointer",
                              )}
                            >
                              {mark}
                            </button>
                          </TD>
                        );
                      })}
                      <TD numeric className="figures font-medium border-l border-rule">
                        {stats.H}
                      </TD>
                      <TD numeric className="figures text-amber font-medium">
                        {stats.S}
                      </TD>
                      <TD numeric className="figures text-ink-soft">
                        {stats.I}
                      </TD>
                      <TD numeric className="figures text-mark font-medium">
                        {stats.A}
                      </TD>
                      <TD
                        numeric
                        className={cn(
                          "figures font-semibold",
                          stats.percent < 85 ? "text-mark" : "text-tuntas",
                        )}
                      >
                        {formatPercent(stats.percent, 0)}
                      </TD>
                    </TR>
                  );
                })
              )}
            </TBody>
          </Table>
        </TableScroll>
      </Sheet>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-1 text-[12px] text-muted">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          {markOrder.map((mark) => (
            <li key={mark} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className={cn(
                  "flex size-5 items-center justify-center rounded-[3px] text-[11px] font-medium",
                  markTone[mark],
                )}
              >
                {mark}
              </span>
              <span>
                <strong className="font-semibold">{mark}</strong> ={" "}
                {attendanceLabels[mark]}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-faint">
          * Klik pada kotak huruf untuk mengganti status kehadiran siswa.
        </p>
      </div>

      <PlannedNote>
        Presensi harian dapat diintegrasikan dengan mesin absensi biometrik atau
        aplikasi absensi siswa mandiri ketika server sekolah terhubung.
      </PlannedNote>
    </div>
  );
}
