import { questionTypeLabel, difficultyLabel } from "@/lib/format";
import type { GenerationContext } from "@/types";

/**
 * The header an Indonesian exam paper actually carries — mata pelajaran, kelas,
 * kurikulum, materi — so a teacher can check the soal were built against the
 * right context before reading a single item.
 */
export function SoalKop({
  context,
  count,
}: {
  context: GenerationContext;
  count: number;
}) {
  const rows = [
    ["Mata pelajaran", context.subject],
    ["Kelas", `${context.className || "—"} (${context.level} kelas ${context.grade})`],
    ["Kurikulum", context.curriculum],
    ["Semester", `${context.semester}, tahun ajaran ${context.academicYear}`],
    ["Materi", context.topic || "Belum dipilih"],
    [
      "Susunan",
      `${count} soal ${context.types
        .map((t) => questionTypeLabel[t].toLowerCase())
        .join(" dan ")}, tingkat ${difficultyLabel[context.difficulty].toLowerCase()}`,
    ],
  ];

  return (
    <dl className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-2 text-[12.5px] leading-snug">
          <dt className="w-24 shrink-0 text-faint">{label}</dt>
          <dd className="min-w-0 text-ink-soft">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
