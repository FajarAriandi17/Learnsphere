import type { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MarkLegend, MarkStrip, MarkTotals } from "@/components/attendance/marks";
import { DocumentTable } from "@/components/documents/document-table";
import { PortfolioEntries } from "@/components/portfolios/portfolio-entries";
import { Badge } from "@/components/ui/badge";
import { DataList } from "@/components/ui/data-list";
import { PageHeader } from "@/components/ui/page-header";
import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Section } from "@/components/ui/section";
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
import { subjectsByLevel } from "@/lib/curriculum/reference";
import { formatMonth, formatShortDate } from "@/lib/format";
import {
  buildAttendance,
  countMarks,
  currentMonth,
  documents,
  finalScore,
  portfolioFor,
  predicateFor,
  reportRowsFor,
  schoolDays,
} from "@/lib/mock/administration";
import { classById, classHistory, studentById } from "@/lib/mock/students";
import { activePeriod, teacher } from "@/lib/mock/teacher-data";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const student = studentById(id);
  return { title: student ? student.name : "Siswa tidak ditemukan" };
}

const genderLabel = { L: "Laki-laki", P: "Perempuan" } as const;

const statusLabel = {
  aktif: "Aktif",
  pindah: "Pindah",
  lulus: "Lulus",
} as const;

const statusTone = { aktif: "tuntas", pindah: "amber", lulus: "ink" } as const;

const predicateTone: Record<string, "tuntas" | "amber" | "mark"> = {
  A: "tuntas",
  B: "tuntas",
  C: "amber",
  D: "mark",
};

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = studentById(id);
  if (!student) notFound();

  const group = classById(student.classId);
  const report = reportRowsFor(student.classId).find(
    (row) => row.studentId === student.id,
  );

  const days = schoolDays(currentMonth.year, currentMonth.month);
  const marks =
    buildAttendance(student.classId, currentMonth.year, currentMonth.month)[
      student.id
    ] ?? [];
  const totals = countMarks(marks);

  const portfolio = portfolioFor(student.id);
  const files = documents.filter(
    (doc) =>
      doc.name.includes(student.name) ||
      (group ? `${doc.name} ${doc.context}`.includes(group.name) : false),
  );
  const history = classHistory(student);
  const subjects = group ? subjectsByLevel[group.level] : [];

  const identity: Array<[string, React.ReactNode]> = [
    ["NIS", <span className="figures">{student.nis}</span>],
    ["Nama lengkap", student.name],
    ["Jenis kelamin", genderLabel[student.gender]],
    [
      "Tanggal lahir",
      <span className="figures">{formatShortDate(student.birthDate, true)}</span>,
    ],
    ["Kelas", group ? `${group.name} (${group.level} kelas ${group.grade})` : "—"],
    ["Wali kelas", group?.homeroomTeacher ?? "—"],
    ["Tahun ajaran", group ? `${group.academicYear}` : "—"],
    ["Semester", group ? group.semester : "—"],
  ];

  const scoreRows: Array<[string, number]> = report
    ? [
        ["Pengetahuan", report.knowledge],
        ["Keterampilan", report.skills],
      ]
    : [];
  const final = report ? finalScore(report.knowledge, report.skills) : 0;
  const predicate = predicateFor(final);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow={
          <Link
            href="/students"
            className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            Siswa
          </Link>
        }
        title={student.name}
        description={
          <span className="inline-flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[student.status]}>
              {statusLabel[student.status]}
            </Badge>
            <span>
              NIS <span className="figures">{student.nis}</span>, kelas{" "}
              {group?.name ?? "—"}.
            </span>
          </span>
        }
        action={
          <>
            <PlannedAction reason="Formulir siswa belum tersambung">
              Ubah data
            </PlannedAction>
            <PlannedAction reason="Layanan dokumen belum tersambung">
              Cetak profil
            </PlannedAction>
          </>
        }
      />

      <div className="space-y-9">
        <Section id="identity" title="Identitas">
          <Sheet>
            <DataList items={identity} />
          </Sheet>
        </Section>

        <Section
          id="scores"
          title={`Nilai ${teacher.subject}`}
          note={`Semester ${group?.semester ?? activePeriod.semester} — pengetahuan berbobot 60% dan keterampilan 40%, sesuai pengaturan sekolah.`}
        >
          <Sheet className="overflow-hidden">
            <ul>
              {scoreRows.map(([label, value]) => (
                <li
                  key={label}
                  className="flex items-baseline gap-3 border-t border-rule-soft px-4 py-2.5 first:border-t-0"
                >
                  <span className="text-[13.5px] text-ink-soft">{label}</span>
                  <span
                    aria-hidden
                    className="mb-[5px] flex-1 border-b border-dotted border-rule"
                  />
                  <span className="figures w-14 text-right text-[15px] font-medium text-ink">
                    {value}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-3 border-t border-rule bg-paper/60 px-4 py-3">
              <span className="text-[13.5px] font-medium text-ink">
                Nilai akhir
              </span>
              <span
                aria-hidden
                className="mb-[5px] flex-1 border-b border-dotted border-rule"
              />
              <Badge tone={predicateTone[predicate.letter]}>
                {predicate.letter} {predicate.label}
              </Badge>
              <span className="figures w-14 text-right text-[19px] leading-6 font-semibold text-ink">
                {final}
              </span>
            </div>

            <div className="border-t border-rule px-4 py-3">
              <p className="text-[11.5px] text-faint">Catatan guru mata pelajaran</p>
              <p className="mt-1 max-w-[72ch] text-[13.5px] leading-relaxed text-ink-soft">
                {report?.note ?? "Belum ada catatan."}
              </p>
            </div>
          </Sheet>
        </Section>

        <Section
          id="subjects"
          title="Mata pelajaran"
          note={`Anda mengisi nilai ${teacher.subject}. Mata pelajaran lain diisi oleh guru pengampunya masing-masing.`}
        >
          <ul className="flex flex-wrap gap-1.5">
            {subjects.map((subject) => (
              <li
                key={subject}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[12.5px] leading-5",
                  subject === teacher.subject
                    ? "border-ink/25 bg-ink/[0.06] font-medium text-ink"
                    : "border-rule bg-sheet text-muted",
                )}
              >
                {subject}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="history"
          title="Riwayat kelas"
          note="Disusun dari tingkat kelas saat ini. Riwayat sebenarnya dibaca dari basis data setelah tersambung."
        >
          <Sheet className="overflow-hidden">
            <TableScroll>
              <Table>
                <THead>
                  <tr>
                    <TH numeric>Tahun ajaran</TH>
                    <TH>Kelas</TH>
                    <TH numeric>Tingkat</TH>
                    <TH>Keterangan</TH>
                  </tr>
                </THead>
                <TBody>
                  {history.map((row) => (
                    <TR key={row.academicYear}>
                      <TD numeric className="whitespace-nowrap">
                        {row.academicYear}
                      </TD>
                      <TD className="font-medium text-ink">{row.className}</TD>
                      <TD numeric>{row.grade}</TD>
                      <TD>
                        {row.current ? (
                          <Badge tone="ink">Sedang berjalan</Badge>
                        ) : (
                          <span className="text-muted">Naik kelas</span>
                        )}
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </TableScroll>
          </Sheet>
        </Section>

        <Section
          id="attendance"
          title={`Kehadiran ${formatMonth(currentMonth.year, currentMonth.month)}`}
          action={
            <Link
              href="/attendance"
              className="text-[12.5px] text-muted hover:text-ink"
            >
              Buka absensi
            </Link>
          }
        >
          <Sheet className="overflow-hidden">
            <TableScroll>
              <MarkStrip days={days} marks={marks} />
            </TableScroll>
            <MarkTotals totals={totals} className="border-t border-rule bg-paper/60" />
          </Sheet>
          <MarkLegend className="mt-2.5 px-1" />
        </Section>

        <Section
          id="portfolio"
          title="Portofolio"
          note="Catatan projek, kegiatan, dan prestasi yang ikut tercetak pada lampiran raport."
        >
          <PortfolioEntries
            items={portfolio}
            emptyDescription={`Belum ada catatan untuk ${student.name}. Tambahkan dari halaman Portofolio setelah basis data tersambung.`}
          />
        </Section>

        <Section
          id="documents"
          title="Dokumen terkait"
          note="Berkas yang menyebut siswa ini atau kelasnya."
        >
          <Sheet className="overflow-hidden">
            <DocumentTable
              documents={files}
              emptyTitle="Belum ada dokumen untuk kelas ini"
              emptyDescription="Ekspor raport, absensi, atau portofolio akan muncul di sini beserta ukuran berkasnya."
            />
          </Sheet>
        </Section>

        <PlannedNote>
          Profil ini menyusun ulang data yang sudah ada di kelas, raport, absensi,
          dan portofolio. Menyunting identitas, mengunggah foto, dan mencetak
          profil menunggu basis data.
        </PlannedNote>
      </div>
    </div>
  );
}

