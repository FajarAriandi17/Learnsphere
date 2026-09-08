"use client";

import { ArrowDown, ArrowUp, Check, Pencil, RefreshCw, Trash2 } from "lucide-react";

import { SoalEditor } from "@/components/ai/soal-editor";
import { Button } from "@/components/ui/button";
import { answerText, cognitiveLabel, difficultyLabel } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

export interface SoalItemProps {
  question: Question;
  teacherView: boolean;
  editing: boolean;
  busy: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (next: Question) => void;
  onRegenerate: () => void;
  onDelete: () => void;
  onMove: (direction: -1 | 1) => void;
}

export function SoalItem({
  question,
  teacherView,
  editing,
  busy,
  canMoveUp,
  canMoveDown,
  onEdit,
  onCancelEdit,
  onSave,
  onRegenerate,
  onDelete,
  onMove,
}: SoalItemProps) {
  if (editing) {
    return (
      <li className="border-t border-rule-soft first:border-t-0">
        <SoalEditor question={question} onSave={onSave} onCancel={onCancelEdit} />
      </li>
    );
  }

  return (
    <li className="soal-in flex gap-3 border-t border-rule-soft px-4 py-3.5 first:border-t-0">
      <span className="figures w-5 shrink-0 pt-0.5 text-[13px] font-semibold text-muted">
        {question.number}.
      </span>

      <div className={cn("min-w-0 flex-1", busy && "opacity-45")}>
        <p className="font-serif text-[14.5px] leading-relaxed text-ink">
          {question.question}
        </p>

        {question.options ? (
          <ol className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {question.options.map((option) => {
              const correct = teacherView && option.label === question.answer;
              return (
                <li
                  key={option.label}
                  className={cn(
                    "flex gap-1.5 font-serif text-[14px] leading-relaxed",
                    correct ? "text-ink" : "text-ink-soft",
                  )}
                >
                  <span className="figures shrink-0 text-faint">
                    {option.label}.
                  </span>
                  <span>{option.text}</span>
                  {correct ? (
                    <Check aria-label="kunci" className="mt-1 size-3.5 shrink-0 text-tuntas" />
                  ) : null}
                </li>
              );
            })}
          </ol>
        ) : null}

        {teacherView ? (
          <div className="mt-2.5 border-l-2 border-mark/35 bg-mark-tint/45 px-2.5 py-2">
            <p className="text-[13px] leading-relaxed text-ink">
              <span className="font-semibold">Kunci: </span>
              {answerText(question)}
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
              {question.explanation}
            </p>
            <p className="mt-1.5 text-[11.5px] text-faint">
              {difficultyLabel[question.difficulty]} ·{" "}
              {cognitiveLabel[question.cognitiveLevel]} · {question.topic}
            </p>
          </div>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-0.5">
          {busy ? (
            <span className="px-1 text-[12.5px] text-muted">Menyusun ulang…</span>
          ) : (
            <>
              <Button variant="quiet" size="sm" onClick={onEdit}>
                <Pencil aria-hidden />
                Ubah
              </Button>
              <Button variant="quiet" size="sm" onClick={onRegenerate}>
                <RefreshCw aria-hidden />
                Buat ulang
              </Button>
              <Button variant="quiet" size="sm" onClick={onDelete}>
                <Trash2 aria-hidden />
                Hapus
              </Button>
              <span aria-hidden className="mx-1 h-4 w-px bg-rule" />
              <Button
                variant="quiet"
                size="icon"
                className="size-7"
                disabled={!canMoveUp}
                onClick={() => onMove(-1)}
              >
                <ArrowUp aria-hidden />
                <span className="sr-only">Naikkan soal {question.number}</span>
              </Button>
              <Button
                variant="quiet"
                size="icon"
                className="size-7"
                disabled={!canMoveDown}
                onClick={() => onMove(1)}
              >
                <ArrowDown aria-hidden />
                <span className="sr-only">Turunkan soal {question.number}</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
