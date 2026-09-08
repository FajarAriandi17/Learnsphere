import { attendanceLabels } from "@/lib/mock/administration";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AttendanceStatus } from "@/types";

/**
 * Hadir is drawn quietly and the three exceptions carry the colour: on a month
 * of attendance the only thing a teacher scans for is who was missing.
 */
export const markTone: Record<AttendanceStatus, string> = {
  H: "text-faint",
  S: "bg-amber-tint text-amber",
  I: "bg-ink/[0.07] text-ink",
  A: "bg-mark-tint text-mark",
};

export const markOrder: AttendanceStatus[] = ["H", "S", "I", "A"];

/** One month of marks for a single student, day numbers above the letters. */
export function MarkStrip({
  days,
  marks,
}: {
  days: number[];
  marks: AttendanceStatus[];
}) {
  return (
    <div className="flex gap-1 px-4 py-3">
      {days.map((day, i) => (
        <div key={day} className="w-7 shrink-0 text-center">
          <span className="figures block text-[10.5px] leading-4 text-faint">
            {day}
          </span>
          <span
            className={cn(
              "mt-0.5 flex h-6 items-center justify-center rounded-[3px] text-[11.5px] font-medium",
              markTone[marks[i]],
            )}
            title={`${day} — ${attendanceLabels[marks[i]]}`}
          >
            {marks[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MarkLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5", className)}>
      {markOrder.map((mark) => (
        <li key={mark} className="flex items-center gap-1.5 text-[12px] text-muted">
          <span
            aria-hidden
            className={cn(
              "flex size-5 items-center justify-center rounded-[3px] text-[11px] font-medium",
              markTone[mark],
            )}
          >
            {mark}
          </span>
          {attendanceLabels[mark]}
        </li>
      ))}
    </ul>
  );
}

/** The four counts plus the percentage, as they are copied onto a raport. */
export function MarkTotals({
  totals,
  className,
}: {
  totals: Record<AttendanceStatus, number> & { percent: number };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-6 gap-y-2 px-4 py-3",
        className,
      )}
    >
      {markOrder.map((mark) => (
        <p key={mark} className="text-[12.5px] text-muted">
          {attendanceLabels[mark]}{" "}
          <span className="figures text-[14px] font-semibold text-ink">
            {totals[mark]}
          </span>
        </p>
      ))}
      <p className="figures ms-auto text-[13px] font-medium text-tuntas">
        {formatPercent(totals.percent)} hadir
      </p>
    </div>
  );
}
