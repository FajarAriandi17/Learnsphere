import type { Metadata } from "next";

import { ActivityChart } from "@/components/dashboard/activity-chart";
import { AgendaCalendar } from "@/components/dashboard/agenda-calendar";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RosterSplit } from "@/components/dashboard/roster-split";
import type { RosterRow } from "@/components/dashboard/roster-split";
import { StatCards } from "@/components/dashboard/stat-cards";
import { jakartaNow } from "@/lib/format";
import { classNameOf, studentById } from "@/lib/mock/students";
import { rosterHighlights, teacher } from "@/lib/mock/teacher-data";

export const metadata: Metadata = { title: "Dasbor" };

/** "Adinda Kirana" → "AK". Two letters is all a 36px avatar can hold. */
function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * The rows are resolved here rather than in the client component so the 242-row
 * sample roster never travels to the browser.
 */
function rosterRows(): RosterRow[] {
  return rosterHighlights.flatMap((highlight) => {
    const student = studentById(highlight.studentId);
    if (!student) return [];

    return [
      {
        id: student.id,
        name: student.name,
        initials: initialsOf(student.name),
        nis: student.nis,
        className: classNameOf(student.classId),
        kind: highlight.kind,
        activity: highlight.activity,
        at: highlight.at,
        status: highlight.status,
        average: highlight.average,
        attendance: highlight.attendance,
        note: highlight.note,
      },
    ];
  });
}

export default function DashboardPage() {
  const { greeting, dateLabel } = jakartaNow();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-2 pb-14 sm:px-6">
      <header className="mb-6">
        <p className="text-[12.5px] text-faint">{dateLabel}</p>
        <h1 className="mt-1.5 text-[26px] leading-tight font-bold tracking-[-0.02em] text-ink sm:text-[31px]">
          {greeting}, {teacher.title} {teacher.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-muted">
          Semua kebutuhan mengajar dan administrasi sekolah ada di satu tempat.
        </p>
      </header>

      <div className="space-y-4">
        <StatCards />

        <div className="grid items-start gap-4 lg:grid-cols-[1.55fr_1fr]">
          <div className="space-y-4">
            <ActivityChart />
            <RosterSplit rows={rosterRows()} />
          </div>

          <div className="space-y-4">
            <AgendaCalendar />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
