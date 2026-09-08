"use client";

import * as React from "react";

import { Chip } from "@/components/ui/chip";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import {
  academicYears,
  curricula,
  gradesByLevel,
  levels,
  subjectsByLevel,
  topicsFor,
} from "@/lib/curriculum/reference";
import { difficultyLabel, questionTypeLabel } from "@/lib/format";
import type {
  CognitiveLevel,
  Difficulty,
  EducationLevel,
  GenerationContext,
  Language,
  QuestionType,
} from "@/types";

const countPresets = [5, 10, 20, 25, 30, 40, 50];
const formOptions: QuestionType[] = [
  "multiple_choice",
  "true_false",
  "short_answer",
  "essay",
];
const difficulties: Difficulty[] = ["mudah", "sedang", "sulit"];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-rule px-4 py-3.5 first:border-t-0">
      <div className="ledger-heading mb-3">
        <h3 className="text-[12px] font-semibold text-ink">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function ContextPanel({
  value,
  onChange,
}: {
  value: GenerationContext;
  onChange: (next: GenerationContext) => void;
}) {
  const set = (patch: Partial<GenerationContext>) =>
    onChange({ ...value, ...patch });

  const topics = topicsFor(value.subject, value.grade);
  const customTopic = topics.length === 0 || !topics.includes(value.topic);

  const changeLevel = (level: EducationLevel) => {
    const grade = gradesByLevel[level][0];
    const subject = subjectsByLevel[level][0];
    set({ level, grade, subject, topic: topicsFor(subject, grade)[0] ?? "" });
  };

  const toggleForm = (type: QuestionType) => {
    const next = value.types.includes(type)
      ? value.types.filter((t) => t !== type)
      : [...value.types, type];
    set({ types: next.length ? next : [type] });
  };

  return (
    <div>
      <Group title="Kelas">
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Jenjang">
            <Select
              value={value.level}
              onChange={(e) => changeLevel(e.target.value as EducationLevel)}
            >
              {levels.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </Select>
          </Field>
          <Field label="Kelas">
            <Select
              value={value.grade}
              onChange={(e) => set({ grade: e.target.value })}
            >
              {gradesByLevel[value.level].map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Rombel" hint="Muncul di kop soal saat diekspor.">
          <Input
            value={value.className}
            onChange={(e) => set({ className: e.target.value })}
            placeholder="VIII-A"
          />
        </Field>
      </Group>

      <Group title="Instruksi Khusus (PRD §15)">
        <Field label="Tujuan Pembelajaran">
          <Input
            value={value.objective ?? ""}
            onChange={(e) => set({ objective: e.target.value })}
            placeholder="Misal: Memahami konsep..."
          />
        </Field>
        <Field label="Kompetensi">
          <Input
            value={value.competency ?? ""}
            onChange={(e) => set({ competency: e.target.value })}
            placeholder="Misal: Menganalisis..."
          />
        </Field>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Bahasa">
            <Select
              value={value.language ?? "id"}
              onChange={(e) => set({ language: e.target.value as "id" | "en" })}
            >
              <option value="id">Indonesia</option>
              <option value="en">Inggris</option>
            </Select>
          </Field>
        </div>
        <Field label="Instruksi Tambahan">
          <Textarea
            value={value.instructions ?? ""}
            onChange={(e) => set({ instructions: e.target.value })}
            placeholder="Instruksi khusus untuk AI..."
          />
        </Field>
      </Group>

      <Group title="Kurikulum">
        <Field label="Kurikulum">
          <Select
            value={value.curriculum}
            onChange={(e) => set({ curriculum: e.target.value })}
          >
            {curricula.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Tahun ajaran">
            <Select
              value={value.academicYear}
              onChange={(e) => set({ academicYear: e.target.value })}
            >
              {academicYears.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </Select>
          </Field>
          <Field label="Semester">
            <Select
              value={value.semester}
              onChange={(e) => set({ semester: e.target.value as "1" | "2" })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </Select>
          </Field>
        </div>
        <Field label="Mata pelajaran">
          <Select
            value={value.subject}
            onChange={(e) => {
              const subject = e.target.value;
              set({ subject, topic: topicsFor(subject, value.grade)[0] ?? "" });
            }}
          >
            {subjectsByLevel[value.level].map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </Select>
        </Field>
        <Field
          label="Materi"
          hint="Soal disusun mengikuti materi ini, bukan menebak isi kurikulum."
        >
          {topics.length > 0 ? (
            <Select
              value={customTopic ? "__custom" : value.topic}
              onChange={(e) =>
                set({ topic: e.target.value === "__custom" ? "" : e.target.value })
              }
            >
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
              <option value="__custom">Materi lain…</option>
            </Select>
          ) : null}
        </Field>
        {customTopic ? (
          <Input
            value={value.topic}
            onChange={(e) => set({ topic: e.target.value })}
            placeholder="Tulis materi, misal: Teorema Pythagoras"
            aria-label="Materi lain"
          />
        ) : null}
      </Group>

      <Group title="Soal">
        <div>
          <p className="mb-1.5 text-[12.5px] font-medium text-muted">Jumlah</p>
          <div className="flex flex-wrap gap-1.5">
            {countPresets.map((count) => (
              <Chip
                key={count}
                selected={value.count === count}
                onClick={() => set({ count })}
              >
                {count}
              </Chip>
            ))}
            <Input
              type="number"
              min={1}
              max={50}
              value={value.count}
              onChange={(e) =>
                set({ count: Math.max(1, Number(e.target.value) || 1) })
              }
              aria-label="Jumlah soal lain"
              className="h-7 w-16 px-2 text-[12.5px]"
            />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[12.5px] font-medium text-muted">Bentuk</p>
          <div className="flex flex-wrap gap-1.5">
            {formOptions.map((type) => (
              <Chip
                key={type}
                selected={value.types.includes(type)}
                onClick={() => toggleForm(type)}
              >
                {questionTypeLabel[type]}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[12.5px] font-medium text-muted">
            Tingkat kesulitan
          </p>
          <div className="flex flex-wrap gap-1.5">
            {difficulties.map((level) => (
              <Chip
                key={level}
                selected={value.difficulty === level}
                onClick={() => set({ difficulty: level })}
              >
                {difficultyLabel[level]}
              </Chip>
            ))}
          </div>
        </div>
      </Group>
    </div>
  );
}
