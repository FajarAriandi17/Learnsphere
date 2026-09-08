import { getStudents, getClasses } from "@/app/actions/students";
import { FileUp, UserPlus } from "lucide-react";

import { StudentTable } from "@/components/students/student-table";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { formatNumber } from "@/lib/format";
import { activePeriod } from "@/lib/mock/teacher-data";

export const metadata = {
  title: "Siswa",
  description: "Data siswa per kelas dan tahun ajaran.",
};

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ q }, students, classes] = await Promise.all([
    searchParams,
    getStudents(),
    getClasses(),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow={`Tahun ajaran ${activePeriod.academicYear} · semester ${activePeriod.semester}`}
        title="Siswa"
        description={`${formatNumber(students.length)} siswa tercatat di ${classes.length} kelas. Data ini dipakai ulang oleh raport, absensi, dan portofolio, jadi cukup dirapikan satu kali.`}
        action={
          <>
            <Button variant="solid">
              <UserPlus aria-hidden />
              Tambah siswa
            </Button>
            <Button variant="outline">
              <FileUp aria-hidden />
              Impor Excel
            </Button>
          </>
        }
      />

      <div className="space-y-9">
        <Section id="roster" title="Daftar siswa">
          <StudentTable
            students={students}
            classes={classes}
            initialQuery={q ?? ""}
          />
        </Section>
      </div>
    </div>
  );
}
