"use client";

import * as React from "react";
import { CircleAlert } from "lucide-react";

import { Segmented } from "@/components/ui/segmented";
import { answerText, cognitiveLabel, difficultyLabel } from "@/lib/format";
import { school } from "@/lib/mock/teacher-data";
import { cn } from "@/lib/utils";
import type { ExamSummary, Question } from "@/types";

/**
 * A saved package as it will be printed. PRD §11 keeps two views apart: the
 * student copy carries the identity block and the items only, the teacher copy
 * adds key, explanation, difficulty and competency. Nothing here is editable —
 * changes belong to the generation screen, so no control pretends to save.
 */

const views = [
  { value: "siswa", label: "Tampilan siswa" },
  { value: "guru", label: "Tampilan guru" },
] as const;

type View = (typeof views)[number]["value"];

export function ExamPaper({
  exam,
  questions,
}: {
  exam: ExamSummary;
  questions: Question[];
}) {
  const [view, setView] = React.useState<View>("siswa");
  const teacherView = view === "guru";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Tampilan naskah"
          options={views}
          value={view}
          onChange={setView}
        />
        <p className="text-[12px] text-faint">
          {teacherView
            ? "Kunci, pembahasan, dan kompetensi ikut tercetak."
            : "Kunci jawaban disembunyikan seperti pada naskah siswa."}
        </p>
      </div>

      <article className="rounded-[var(--radius-sheet)] border border-rule bg-sheet">
        <ExamKop exam={exam} teacherView={teacherView} />

        <ol>
          {questions.map((question) => (
            <QuestionRow
              key={question.id}
              question={question}
              teacherView={teacherView}
            />
          ))}
        </ol>

        <p className="flex gap-2 border-t border-rule bg-paper/50 px-4 py-3 text-[12.5px] leading-relaxed text-ink-soft">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-mark" />
          Soal dibuat oleh AI. Harap periksa kembali sebelum digunakan dalam ujian
          resmi.
        </p>
      </article>
    </div>
  );
}

/** The kop an Indonesian exam paper carries, and the blanks a student fills. */
function ExamKop({
  exam,
  teacherView,
}: {
  exam: ExamSummary;
  teacherView: boolean;
}) {
  const meta: Array<[string, string]> = [
    ["Mata pelajaran", exam.subject],
    ["Kelas", exam.className],
    ["Materi", exam.topic],
    ["Alokasi waktu", `${Math.max(30, exam.questionCount * 3)} menit`],
  ];

  return (
    <header className="px-4 pt-5 pb-4 sm:px-6">
      <div className="border-b-[3px] border-double border-ink/70 pb-3 text-center">
        <p className="text-[13px] tracking-wide text-ink-soft">{school.name}</p>
        <p className="text-[11.5px] text-faint">
          {school.address}, {school.city}, {school.province}
        </p>
        <h2 className="mt-2 font-serif text-[17px] font-medium text-ink sm:text-[19px]">
          {exam.template}
        </h2>
        <p className="text-[12.5px] text-muted">{exam.title}</p>
      </div>

      <dl className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
        {meta.map(([label, value]) => (
          <div key={label} className="flex gap-2 text-[12.5px] leading-snug">
            <dt className="w-24 shrink-0 text-faint">{label}</dt>
            <dd className="min-w-0 text-ink-soft">{value}</dd>
          </div>
        ))}
      </dl>

      {teacherView ? (
        <p className="mt-3 border-t border-rule-soft pt-3 text-[12.5px] leading-relaxed text-muted">
          Pedoman penskoran: soal pilihan ganda dan benar/salah bernilai 1 poin.
          Soal jawaban singkat dan uraian dinilai dengan rubrik pada tiap butir.
        </p>
      ) : (
        <>
          <p className="mt-3 border-t border-rule-soft pt-3 text-[12.5px] leading-relaxed text-ink-soft">
            Tulis nama dan kelas pada tempat yang disediakan. Kerjakan soal yang
            Anda anggap mudah terlebih dahulu.
          </p>
          <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-[1.6fr_1fr_1fr]">
            {[
              ["Nama", "nama-siswa"],
              ["Kelas", "kelas-siswa"],
              ["Tanggal", "tanggal-ujian"],
            ].map(([label, id]) => (
              <div key={id} className="flex items-baseline gap-2">
                <label htmlFor={id} className="text-[12.5px] text-faint">
                  {label}
                </label>
                <input
                  id={id}
                  className="min-w-0 flex-1 border-b border-dotted border-rule bg-transparent pb-0.5 text-[13px] text-ink outline-none focus:border-solid focus:border-ink"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </header>
  );
}

function QuestionRow({
  question,
  teacherView,
}: {
  question: Question;
  teacherView: boolean;
}) {
  return (
    <li className="flex gap-3 border-t border-rule px-4 py-3.5 sm:px-6">
      <span className="figures w-5 shrink-0 pt-0.5 text-[13px] font-semibold text-muted">
        {question.number}.
      </span>

      <div className="min-w-0 flex-1">
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
                    correct ? "font-medium text-ink" : "text-ink-soft",
                  )}
                >
                  <span className="figures shrink-0 text-faint">
                    {option.label}.
                  </span>
                  <span>{option.text}</span>
                </li>
              );
            })}
          </ol>
        ) : (
          !teacherView && (
            <div
              aria-hidden
              className="mt-2 space-y-3.5 pt-1 pb-1"
            >
              {Array.from({
                length: question.type === "essay" ? 4 : 2,
              }).map((_, line) => (
                <span
                  key={line}
                  className="block border-b border-dotted border-rule"
                />
              ))}
            </div>
          )
        )}

        {teacherView ? (
          <div className="mt-2.5 border-l-2 border-mark/35 bg-mark-tint/45 px-2.5 py-2">
            <p className="text-[13px] leading-relaxed text-ink">
              <span className="font-semibold">Kunci: </span>
              {answerText(question)}
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
              {question.explanation}
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-faint">
              {difficultyLabel[question.difficulty]} ·{" "}
              {cognitiveLabel[question.cognitiveLevel]}
            </p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-faint">
              {question.competency}
            </p>
          </div>
        ) : null}
      </div>
    </li>
  );
}
