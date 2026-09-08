"use client";

import * as React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { EmptyRow } from "@/components/ui/empty-state";
import { SearchInput, Select } from "@/components/ui/field";
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
import { difficultyLabel, formatShortDate, questionTypeLabel } from "@/lib/format";
import { examTemplates } from "@/lib/mock/exams";
import type { ExamStatus, ExamSummary } from "@/types";

const statusTone = {
  draf: "neutral",
  siap: "tuntas",
  diekspor: "ink",
} as const;

const statusLabel: Record<ExamStatus, string> = {
  draf: "Draf",
  siap: "Siap",
  diekspor: "Sudah diekspor",
};

/** PRD §39: search plus the filters a teacher actually narrows by. */
export function ExamList({ exams }: { exams: ExamSummary[] }) {
  const [query, setQuery] = React.useState("");
  const [className, setClassName] = React.useState("semua");
  const [template, setTemplate] = React.useState("semua");
  const [status, setStatus] = React.useState("semua");

  const classNames = React.useMemo(
    () => Array.from(new Set(exams.map((exam) => exam.className))).sort(),
    [exams],
  );

  const shown = exams.filter((exam) => {
    const needle = query.trim().toLowerCase();
    const matchesQuery =
      !needle ||
      exam.title.toLowerCase().includes(needle) ||
      exam.topic.toLowerCase().includes(needle);
    return (
      matchesQuery &&
      (className === "semua" || exam.className === className) &&
      (template === "semua" || exam.template === template) &&
      (status === "semua" || exam.status === status)
    );
  });

  return (
    <>
      <Toolbar>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul atau materi"
            aria-label="Cari paket ujian"
            className="w-full sm:w-64"
          />
          <Select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            aria-label="Saring menurut kelas"
            className="w-auto"
          >
            <option value="semua">Semua kelas</option>
            {classNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <Select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            aria-label="Saring menurut template"
            className="w-auto"
          >
            <option value="semua">Semua template</option>
            {examTemplates.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Saring menurut status"
            className="w-auto"
          >
            <option value="semua">Semua status</option>
            {(Object.keys(statusLabel) as ExamStatus[]).map((key) => (
              <option key={key} value={key}>
                {statusLabel[key]}
              </option>
            ))}
          </Select>
        </div>
        <p className="figures text-[12.5px] text-muted" aria-live="polite">
          {shown.length} dari {exams.length} paket
        </p>
      </Toolbar>

      <Sheet className="overflow-hidden">
        <TableScroll>
          <Table>
            <THead>
              <tr>
                <TH>Paket</TH>
                <TH>Kelas</TH>
                <TH numeric>Soal</TH>
                <TH>Bentuk</TH>
                <TH>Kesulitan</TH>
                <TH>Status</TH>
                <TH numeric>Dibuat</TH>
              </tr>
            </THead>
            <TBody>
              {shown.length === 0 ? (
                <EmptyRow
                  span={7}
                  title="Tidak ada paket yang cocok"
                  description="Ubah kata kunci atau lepaskan salah satu saringan."
                />
              ) : (
                shown.map((exam) => (
                  <TR key={exam.id}>
                    <TD className="min-w-64">
                      <Link
                        href={`/exams/${exam.id}`}
                        className="font-serif text-[14.5px] font-medium text-ink hover:underline"
                      >
                        {exam.title}
                      </Link>
                      <span className="mt-0.5 block text-[12px] text-faint">
                        {exam.template} · {exam.topic}
                      </span>
                    </TD>
                    <TD className="whitespace-nowrap">{exam.className}</TD>
                    <TD numeric>{exam.questionCount}</TD>
                    <TD className="min-w-40 text-[12.5px]">
                      {exam.types
                        .map((type) => questionTypeLabel[type])
                        .join(", ")}
                    </TD>
                    <TD>{difficultyLabel[exam.difficulty]}</TD>
                    <TD>
                      <Badge tone={statusTone[exam.status]}>
                        {statusLabel[exam.status]}
                      </Badge>
                    </TD>
                    <TD numeric className="whitespace-nowrap">
                      {formatShortDate(exam.createdAt, true)}
                    </TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </TableScroll>
      </Sheet>
    </>
  );
}
