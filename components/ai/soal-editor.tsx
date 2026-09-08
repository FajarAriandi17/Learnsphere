"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Field, Select } from "@/components/ui/field";
import { difficultyLabel } from "@/lib/format";
import type { Difficulty, Question } from "@/types";

/** Teacher edit per PRD §10: wording, options, key, and difficulty. */
export function SoalEditor({
  question,
  onSave,
  onCancel,
}: {
  question: Question;
  onSave: (next: Question) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = React.useState<Question>(question);
  const editableOptions =
    draft.type === "multiple_choice" && Boolean(draft.options);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.question.trim()) return;
    onSave(draft);
  };

  return (
    <form onSubmit={submit} className="space-y-3 bg-paper/60 p-3.5">
      <Field label="Pertanyaan">
        <textarea
          value={draft.question}
          onChange={(e) => setDraft({ ...draft, question: e.target.value })}
          rows={3}
          required
          className="w-full rounded-[var(--radius-control)] border border-rule bg-sheet px-2.5 py-2 font-serif text-[14.5px] leading-relaxed text-ink"
        />
      </Field>

      {editableOptions ? (
        <fieldset className="space-y-1.5">
          <legend className="mb-1.5 text-[12.5px] font-medium text-muted">
            Pilihan jawaban
          </legend>
          {draft.options!.map((option, i) => (
            <div key={option.label} className="flex items-center gap-2">
              <span className="figures w-4 text-[12.5px] text-faint">
                {option.label}
              </span>
              <input
                value={option.text}
                aria-label={`Pilihan ${option.label}`}
                onChange={(e) => {
                  const options = [...draft.options!];
                  options[i] = { ...option, text: e.target.value };
                  setDraft({ ...draft, options });
                }}
                className="h-8 flex-1 rounded-[var(--radius-control)] border border-rule bg-sheet px-2.5 font-serif text-[14px] text-ink"
              />
            </div>
          ))}
        </fieldset>
      ) : null}

      <div className="grid grid-cols-2 gap-2.5">
        {draft.options ? (
          <Field label="Kunci">
            <Select
              value={draft.answer}
              onChange={(e) => setDraft({ ...draft, answer: e.target.value })}
            >
              {draft.options.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>
        ) : (
          <Field label="Kunci" className="col-span-2">
            <textarea
              value={draft.answer}
              onChange={(e) => setDraft({ ...draft, answer: e.target.value })}
              rows={2}
              className="w-full rounded-[var(--radius-control)] border border-rule bg-sheet px-2.5 py-2 text-[13.5px] leading-relaxed text-ink"
            />
          </Field>
        )}
        <Field label="Kesulitan">
          <Select
            value={draft.difficulty}
            onChange={(e) =>
              setDraft({ ...draft, difficulty: e.target.value as Difficulty })
            }
          >
            {(["mudah", "sedang", "sulit"] as Difficulty[]).map((level) => (
              <option key={level} value={level}>
                {difficultyLabel[level]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="flex gap-2 pt-0.5">
        <Button type="submit" variant="solid" size="sm">
          Simpan perubahan
        </Button>
        <Button type="button" variant="quiet" size="sm" onClick={onCancel}>
          Batal
        </Button>
      </div>
    </form>
  );
}
