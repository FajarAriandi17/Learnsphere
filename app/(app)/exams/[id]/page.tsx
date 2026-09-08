import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ExamPaper } from "@/components/exams/exam-paper";
import { ExportPanel } from "@/components/exams/export-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { difficultyLabel, formatShortDate, questionTypeLabel } from "@/lib/format";
import { contextFor, examById, examPackages } from "@/lib/mock/exams";
import { generateQuestions } from "@/lib/mock/soal-generator";

export function generateStaticParams() {
  return examPackages.map((exam) => ({ id: exam.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const exam = examById(id);
  return { title: exam ? exam.title : "Paket tidak ditemukan" };
}

const statusLabel = {
  draf: "Draf",
  siap: "Siap",
  diekspor: "Sudah diekspor",
} as const;

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exam = examById(id);
  if (!exam) notFound();

  const context = contextFor(exam);
  const questions = generateQuestions(context);

  const facts: Array<[string, string]> = [
    ["Template", exam.template],
    ["Mata pelajaran", exam.subject],
    ["Kelas", `${exam.className} (SMP kelas ${exam.grade})`],
    ["Materi", exam.topic],
    ["Jumlah soal", `${exam.questionCount} butir`],
    ["Bentuk soal", exam.types.map((type) => questionTypeLabel[type]).join(", ")],
    ["Tingkat kesulitan", difficultyLabel[exam.difficulty]],
    ["Dibuat", formatShortDate(exam.createdAt, true)],
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow={
          <Link
            href="/exams"
            className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            Bank Soal
          </Link>
        }
        title={exam.title}
        description={
          <span className="inline-flex flex-wrap items-center gap-2">
            <Badge tone={exam.status === "draf" ? "neutral" : "tuntas"}>
              {statusLabel[exam.status]}
            </Badge>
            <span>
              {exam.questionCount} butir, dibuat{" "}
              {formatShortDate(exam.createdAt, true)}.
            </span>
          </span>
        }
        action={
          <Button asChild>
            <Link href="/ai">Buat paket serupa</Link>
          </Button>
        }
      />

      <div className="space-y-9">
        <Section id="identity" title="Keterangan paket">
          <Sheet>
            <dl className="grid gap-x-8 gap-y-2 px-4 py-3.5 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div key={label} className="flex gap-2 text-[13px] leading-snug">
                  <dt className="w-32 shrink-0 text-faint">{label}</dt>
                  <dd className="min-w-0 text-ink-soft">{value}</dd>
                </div>
              ))}
            </dl>
          </Sheet>
        </Section>

        <Section id="paper" title="Naskah">
          <ExamPaper exam={exam} questions={questions} />
        </Section>

        <Section
          id="export"
          title="Ekspor"
          note="Pilih siapa yang akan menerima berkasnya — naskah siswa tidak pernah memuat kunci jawaban."
        >
          <ExportPanel />
        </Section>
      </div>
    </div>
  );
}
