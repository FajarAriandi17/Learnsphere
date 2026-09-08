"use client";

import * as React from "react";
import { CircleAlert, FileDown, FileText, Library } from "lucide-react";

import { SoalItem } from "@/components/ai/soal-item";
import { SoalKop } from "@/components/ai/soal-kop";
import { ReviewToolbar } from "@/components/ai/review-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { regenerateQuestion } from "@/lib/mock/soal-generator";
import type { GenerationContext, Question } from "@/types";

const renumber = (list: Question[]) =>
  list.map((question, i) => ({ ...question, number: i + 1 }));

export function SoalSheet({
  questions,
  context,
  visible,
  onChange,
}: {
  questions: Question[];
  context: GenerationContext;
  /** How many items to show while the assistant is still writing. */
  visible?: number;
  onChange?: (next: Question[]) => void;
}) {
  const [teacherView, setTeacherView] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const attempts = React.useRef(new Map<string, number>());

  const shown = visible === undefined ? questions : questions.slice(0, visible);
  const editable = Boolean(onChange);

  const regenerate = (question: Question) => {
    setBusyId(question.id);
    const attempt = (attempts.current.get(question.id) ?? 0) + 1;
    attempts.current.set(question.id, attempt);
    // Stands in for the generation request; see lib/mock/soal-generator.
    window.setTimeout(() => {
      onChange?.(
        questions.map((q) =>
          q.id === question.id
            ? { ...regenerateQuestion(context, question.number, attempt), id: q.id }
            : q,
        ),
      );
      setBusyId(null);
    }, 650);
  };

  return (
    <div className="overflow-hidden rounded-[var(--radius-sheet)] border border-rule bg-sheet">
      <div className="border-b border-rule px-4 py-3.5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-[16px] font-medium text-ink">
            {questions.length} soal siap diperiksa
          </h3>
          <Badge tone="mark">Dibuat AI</Badge>
          <div
            role="group"
            aria-label="Tampilan soal"
            className="ml-auto flex gap-1.5"
          >
            <Chip selected={!teacherView} onClick={() => setTeacherView(false)}>
              Tampilan siswa
            </Chip>
            <Chip selected={teacherView} onClick={() => setTeacherView(true)}>
              Tampilan guru
            </Chip>
          </div>
        </div>
        <SoalKop context={context} count={questions.length} />
      </div>

      <ol>
        {shown.map((question, i) => (
          <SoalItem
            key={question.id}
            question={question}
            teacherView={teacherView}
            editing={editingId === question.id}
            busy={busyId === question.id}
            canMoveUp={editable && i > 0}
            canMoveDown={editable && i < shown.length - 1}
            onEdit={() => setEditingId(question.id)}
            onCancelEdit={() => setEditingId(null)}
            onSave={(next) => {
              onChange?.(questions.map((q) => (q.id === next.id ? next : q)));
              setEditingId(null);
            }}
            onRegenerate={() => regenerate(question)}
            onDelete={() =>
              onChange?.(renumber(questions.filter((q) => q.id !== question.id)))
            }
            onMove={(direction) => {
              const next = [...questions];
              const target = i + direction;
              if (target < 0 || target >= next.length) return;
              [next[i], next[target]] = [next[target], next[i]];
              onChange?.(renumber(next));
            }}
          />
        ))}
      </ol>

      <ReviewToolbar
        questionCount={questions.length}
        onSaveToBank={() => console.log("Simpan ke Bank Soal")}
        onDownload={() => console.log("Unduh")}
      />
    </div>
  );
}
