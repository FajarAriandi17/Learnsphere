import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { formatNumber, formatPercent } from "@/lib/format";
import { classSummary } from "@/lib/mock/administration";
import { classGroups, taughtClasses } from "@/lib/mock/students";
import { activePeriod, school, teacher } from "@/lib/mock/teacher-data";

export const metadata: Metadata = {
  title: "Kelas",
  description: "Daftar rombongan belajar dan kelas binaan.",
};

export default function ClassesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow={`Tahun ajaran ${activePeriod.academicYear} · semester ${activePeriod.semester}`}
        title="Kelas"
        description={`${classGroups.length} kelas terdaftar di ${school.name}. Anda mengajar ${taughtClasses.length} kelas dan menjadi wali kelas di ${teacher.homeroom}.`}
        action={
          <PlannedAction variant="solid" reason="Formulir kelas belum tersambung">
            <Plus aria-hidden />
            Tambah kelas
          </PlannedAction>
        }
      />

      <div className="space-y-9">
        <Section
          id="taught"
          title="Kelas yang Anda ajar"
          note="Ringkasan kehadiran dan rata-rata nilai mata pelajaran Anda pada semester aktif."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {taughtClasses.map((group) => {
              const summary = classSummary(group.id);
              const isHomeroom = group.name === teacher.homeroom;

              return (
                <Sheet
                  key={group.id}
                  className="flex flex-col justify-between p-4 transition-colors hover:border-ink/30"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/classes/${group.id}`}
                        className="font-serif text-[18px] font-medium text-ink hover:underline"
                      >
                        {group.name}
                      </Link>
                      {isHomeroom ? (
                        <Badge tone="ink">Wali kelas</Badge>
                      ) : (
                        <span className="text-[12px] text-faint">
                          {group.level} {group.grade}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[12.5px] text-muted">
                      Wali: {group.homeroomTeacher}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-rule-soft pt-3 text-[12.5px]">
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-faint">Jumlah siswa</span>
                      <span className="figures font-medium text-ink">
                        {summary.students}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-faint">Rata-rata {teacher.subject}</span>
                      <span className="figures font-medium text-ink">
                        {summary.average}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-faint">Kehadiran</span>
                      <span className="figures font-medium text-tuntas">
                        {formatPercent(summary.attendance)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2">
                    <Link
                      href={`/classes/${group.id}`}
                      className="inline-flex items-center gap-1 text-[12.5px] font-medium text-ink hover:underline"
                    >
                      Buka rincian kelas
                    </Link>
                  </div>
                </Sheet>
              );
            })}
          </div>
        </Section>

        <Section
          id="all-classes"
          title="Semua kelas"
          note="Seluruh rombongan belajar yang terdata untuk tahun ajaran aktif."
        >
          <Sheet className="overflow-hidden">
            <TableScroll>
              <Table>
                <THead>
                  <tr>
                    <TH numeric className="w-12">
                      No
                    </TH>
                    <TH>Kelas</TH>
                    <TH>Tingkat</TH>
                    <TH>Wali kelas</TH>
                    <TH numeric>Jumlah siswa</TH>
                    <TH>Status pengajar</TH>
                    <TH className="text-right">Aksi</TH>
                  </tr>
                </THead>
                <TBody>
                  {classGroups.map((group, idx) => (
                    <TR key={group.id}>
                      <TD numeric className="text-faint">
                        {idx + 1}
                      </TD>
                      <TD>
                        <Link
                          href={`/classes/${group.id}`}
                          className="font-medium text-ink hover:underline"
                        >
                          {group.name}
                        </Link>
                      </TD>
                      <TD>
                        {group.level} kelas {group.grade}
                      </TD>
                      <TD>{group.homeroomTeacher}</TD>
                      <TD numeric>{formatNumber(group.studentCount)} siswa</TD>
                      <TD>
                        {group.name === teacher.homeroom ? (
                          <Badge tone="ink">Wali kelas</Badge>
                        ) : group.taught ? (
                          <Badge tone="neutral">Guru mapel</Badge>
                        ) : (
                          <span className="text-[12.5px] text-faint">
                            Tidak mengajar
                          </span>
                        )}
                      </TD>
                      <TD className="text-right">
                        <Link
                          href={`/classes/${group.id}`}
                          className="text-[13px] text-muted hover:text-ink hover:underline"
                        >
                          Lihat
                        </Link>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </TableScroll>
          </Sheet>
        </Section>

        <PlannedNote>
          Pengaturan rombel, pembagian wali kelas, dan kenaikan kelas massal
          akan tersedia setelah modul manajemen sekolah terhubung.
        </PlannedNote>
      </div>
    </div>
  );
}
