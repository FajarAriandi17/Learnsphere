"use client";

import * as React from "react";
import Link from "next/link";

import { EmptyRow } from "@/components/ui/empty-state";
import { SearchInput, Select } from "@/components/ui/field";
import { Toolbar } from "@/components/ui/section";
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
import { formatShortDate } from "@/lib/format";
import type { ClassGroup, Student } from "@/types";

const genderLabel = { L: "Laki-laki", P: "Perempuan" } as const;

const statusLabel = {
  aktif: "Aktif",
  pindah: "Pindah",
  lulus: "Lulus",
} as const;

/** PRD §19 search: by name or NIS, narrowed to one class when needed. */
export function StudentTable({
  students,
  classes,
  initialQuery = "",
}: {
  students: Student[];
  classes: ClassGroup[];
  /** Seeded by the topbar search (`/students?q=…`) so the two are one field. */
  initialQuery?: string;
}) {
  const [query, setQuery] = React.useState(initialQuery);
  const [classId, setClassId] = React.useState("semua");

  const nameOf = React.useMemo(() => {
    const map = new Map(classes.map((group) => [group.id, group.name]));
    return (id: string) => map.get(id) ?? "—";
  }, [classes]);

  const shown = students.filter((student) => {
    const needle = query.trim().toLowerCase();
    return (
      (!needle ||
        student.name.toLowerCase().includes(needle) ||
        student.nis.includes(needle)) &&
      (classId === "semua" || student.classId === classId)
    );
  });

  return (
    <>
      <Toolbar>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau NIS"
            aria-label="Cari siswa"
            className="w-full sm:w-64"
          />
          <Select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            aria-label="Saring menurut kelas"
            className="w-auto"
          >
            <option value="semua">Semua kelas</option>
            {classes.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Select>
        </div>
        <p className="figures text-[12.5px] text-muted" aria-live="polite">
          {shown.length} dari {students.length} siswa
        </p>
      </Toolbar>

      <Sheet className="overflow-hidden">
        <TableScroll>
          <Table>
            <THead>
              <tr>
                <TH numeric className="w-12">
                  No
                </TH>
                <TH>Nama</TH>
                <TH numeric>NIS</TH>
                <TH>Kelas</TH>
                <TH>Jenis kelamin</TH>
                <TH numeric>Tanggal lahir</TH>
                <TH>Status</TH>
              </tr>
            </THead>
            <TBody>
              {shown.length === 0 ? (
                <EmptyRow
                  span={7}
                  title="Tidak ada siswa yang cocok"
                  description="Periksa ejaan nama, atau pilih kelas lain."
                />
              ) : (
                shown.map((student, i) => (
                  <TR key={student.id}>
                    <TD numeric className="text-faint">
                      {i + 1}
                    </TD>
                    <TD className="min-w-48">
                      <Link
                        href={`/students/${student.id}`}
                        className="font-medium text-ink hover:underline"
                      >
                        {student.name}
                      </Link>
                    </TD>
                    <TD numeric>{student.nis}</TD>
                    <TD className="whitespace-nowrap">
                      {nameOf(student.classId)}
                    </TD>
                    <TD>{genderLabel[student.gender]}</TD>
                    <TD numeric className="whitespace-nowrap">
                      {formatShortDate(student.birthDate, true)}
                    </TD>
                    <TD>{statusLabel[student.status]}</TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </TableScroll>
      </Sheet>
    </>
  );
}
