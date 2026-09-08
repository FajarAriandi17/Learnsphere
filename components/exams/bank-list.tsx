"use client";

import * as React from "react";

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
import { cognitiveLabel, difficultyLabel, questionTypeLabel } from "@/lib/format";
import type { BankItem, QuestionType } from "@/types";

/**
 * PRD §54 "AI Question Bank": items kept apart from the package they came from,
 * so a teacher can pull one back into a new paper.
 */
export function BankList({ items }: { items: BankItem[] }) {
  const [query, setQuery] = React.useState("");
  const [topic, setTopic] = React.useState("semua");
  const [type, setType] = React.useState("semua");

  const topics = React.useMemo(
    () => Array.from(new Set(items.map((item) => item.topic))).sort(),
    [items],
  );

  const shown = items.filter((item) => {
    const needle = query.trim().toLowerCase();
    return (
      (!needle || item.question.toLowerCase().includes(needle)) &&
      (topic === "semua" || item.topic === topic) &&
      (type === "semua" || item.type === type)
    );
  });

  return (
    <>
      <Toolbar>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari isi soal"
            aria-label="Cari soal"
            className="w-full sm:w-64"
          />
          <Select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="Saring menurut materi"
            className="w-auto"
          >
            <option value="semua">Semua materi</option>
            {topics.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Saring menurut bentuk soal"
            className="w-auto"
          >
            <option value="semua">Semua bentuk</option>
            {(Object.keys(questionTypeLabel) as QuestionType[]).map((key) => (
              <option key={key} value={key}>
                {questionTypeLabel[key]}
              </option>
            ))}
          </Select>
        </div>
        <p className="figures text-[12.5px] text-muted" aria-live="polite">
          {shown.length} dari {items.length} soal
        </p>
      </Toolbar>

      <Sheet className="overflow-hidden">
        <TableScroll>
          <Table>
            <THead>
              <tr>
                <TH>Soal</TH>
                <TH>Bentuk</TH>
                <TH>Kesulitan</TH>
                <TH>Ranah</TH>
                <TH>Sumber</TH>
                <TH numeric>Dipakai</TH>
              </tr>
            </THead>
            <TBody>
              {shown.length === 0 ? (
                <EmptyRow
                  span={6}
                  title="Belum ada soal yang cocok"
                  description="Soal yang Anda simpan dari halaman AI Buat Soal akan muncul di sini."
                />
              ) : (
                shown.map((item) => (
                  <TR key={item.id}>
                    <TD className="min-w-80 max-w-[46ch] font-serif text-[14px] leading-relaxed text-ink">
                      {item.question}
                      <span className="mt-0.5 block font-sans text-[12px] text-faint">
                        {item.topic} · kelas {item.grade}
                      </span>
                    </TD>
                    <TD className="whitespace-nowrap text-[12.5px]">
                      {questionTypeLabel[item.type]}
                    </TD>
                    <TD className="whitespace-nowrap">
                      {difficultyLabel[item.difficulty]}
                    </TD>
                    <TD className="whitespace-nowrap text-[12.5px]">
                      {cognitiveLabel[item.cognitiveLevel]}
                    </TD>
                    <TD>
                      <Badge tone={item.source === "AI" ? "mark" : "neutral"}>
                        {item.source === "AI" ? "Dibuat AI" : "Ditulis guru"}
                      </Badge>
                    </TD>
                    <TD numeric>{item.usedCount}×</TD>
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
