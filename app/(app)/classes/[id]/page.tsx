import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck,
  Files,
  Plus,
  Sparkles,
  SquarePen,
} from "lucide-react";

import { DocumentTable } from "@/components/documents/document-table";
import { ExamList } from "@/components/exams/exam-list";
import { StudentTable } from "@/components/students/student-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataList } from "@/components/ui/data-list";
import { PageHeader } from "@/components/ui/page-header";
import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Section } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { formatNumber, formatPercent } from "@/lib/format";
import {
  classSummary,
  currentMonth,
  documents,
  kkm,
} from "@/lib/mock/administration";
import { examPackages } from "@/lib/mock/exams";
import {
  classById,
  classGroups,
  studentsInClass,
} from "@/lib/mock/students";
import { teacher } from "@/lib/mock/teacher-data";

export function generateStaticParams() {
  return classGroups.map((group) => ({ id: group.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const group = classById(id);
  return { title: group ? `Kelas ${group.name}` : "Kelas tidak ditemukan" };
}

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const group = classById(id);
  if (!group) notFound();

  const students = studentsInClass(group.id);
  const summary = classSummary(group.id);
  const isHomeroom = group.name === teacher.homeroom;

  const classExams = examPackages.filter(
    (exam) => exam.className === group.name,
  );

  const classDocs = documents.filter(
    (doc) =>
      doc.context.includes(group.name) ||
      doc.name.includes(group.name) ||
      students.some((s) => doc.name.includes(s.name)),
  );

  const facts: Array<[string, React.ReactNode]> = [
    ["Tingkat & Jenjang", `${group.level} kelas ${group.grade}`],
    ["Wali kelas", group.homeroomTeacher],
    ["Tahun ajaran", group.academicYear],
    ["Semester", `Semester ${group.semester}`],
    ["Jumlah siswa", <span className="figures">{students.length} siswa</span>],
    [
      `Rata-rata ${teacher.subject}`,
      <span className="figures font-medium">{summary.average}</span>,
    ],
    [
      "Ketuntasan (KKM ≥ 75)",
      <span className="figures">
        {summary.tuntas} dari {students.length} siswa (
        {formatPercent((summary.tuntas / (students.length || 1)) * 100, 0)})
      </span>,
    ],
    [
      "Kehadiran bulan ini",
      <span className="figures font-medium text-tuntas">
        {formatPercent(summary.attendance)}
      </span>,
    ],
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow={
          <Link
            href="/classes"
            className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            Semua Kelas
          </Link>
        }
        title={`Kelas ${group.name}`}
        description={
          <span className="inline-flex flex-wrap items-center gap-2">
            {isHomeroom ? (
              <Badge tone="ink">Wali kelas</Badge>
            ) : group.taught ? (
              <Badge tone="neutral">Guru mapel {teacher.subject}</Badge>
            ) : (
              <Badge tone="neutral">Kelas luar</Badge>
            )}
            <span>
              {group.level} kelas {group.grade} · {group.studentCount} siswa ·
              Wali: {group.homeroomTeacher}
            </span>
          </span>
        }
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="solid">
              <Link href="/ai">
                <Sparkles aria-hidden />
                Buat Soal
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/report-cards?kelas=${group.id}`}>
                <SquarePen aria-hidden />
                Raport
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/attendance?kelas=${group.id}`}>
                <CalendarCheck aria-hidden />
                Absensi
              </Link>
            </Button>
          </div>
        }
      />

      <div className="space-y-9">
        <Section id="info" title="Informasi dan performa kelas">
          <Sheet>
            <DataList items={facts} />
          </Sheet>
        </Section>

        <Section
          id="roster"
          title={`Daftar siswa (${students.length})`}
          note="Siswa aktif yang terdaftar dalam rombel ini."
        >
          <StudentTable students={students} classes={[group]} />
        </Section>

        <Section
          id="exams"
          title="Paket soal kelas ini"
          note={`Daftar bank soal dan ujian yang ditargetkan untuk kelas ${group.name}.`}
        >
          <ExamList exams={classExams} />
        </Section>

        <Section
          id="docs"
          title="Dokumen & arsip kelas"
          note="Arsip raport, rekap nilai, dan lembar absensi yang sudah digenerate."
        >
          <Sheet className="overflow-hidden">
            <DocumentTable
              documents={classDocs}
              emptyTitle={`Belum ada dokumen untuk ${group.name}`}
              emptyDescription="Dokumen ujian, raport, dan absensi yang dicetak akan terarsip di sini."
            />
          </Sheet>
        </Section>

        <PlannedNote>
          Integrasi dengan Dapodik / sistem informasi sekolah untuk sinkronisasi
          otomatis mutasi siswa dan presensi harian sedang dalam rencana pengembangan.
        </PlannedNote>
      </div>
    </div>
  );
}
