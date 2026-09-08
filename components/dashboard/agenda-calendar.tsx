import { Sheet } from "@/components/ui/sheet";
import { formatMonth, formatShortDate, jakartaToday } from "@/lib/format";
import { agenda } from "@/lib/mock/teacher-data";
import type { AgendaKind } from "@/lib/mock/teacher-data";
import { cn } from "@/lib/utils";

/** Each kind gets a pastel and a word, never a pastel alone (PRD §43). */
const tint: Record<AgendaKind, { chip: string; dot: string; label: string }> = {
  exam: { chip: "bg-blush text-blush-ink", dot: "bg-blush-ink", label: "Ujian" },
  task: { chip: "bg-lemon text-lemon-ink", dot: "bg-lemon-ink", label: "Tugas" },
  report: { chip: "bg-mint text-mint-ink", dot: "bg-mint-ink", label: "Raport" },
  attendance: {
    chip: "bg-sky text-sky-ink",
    dot: "bg-sky-ink",
    label: "Absensi",
  },
};

const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

/**
 * PRD §11 — a compact month with the teacher's own agenda under it. The month
 * grid answers "when am I busy"; the list answers "what is next". Anything more
 * belongs on the Absensi screen, which has room for it.
 */
export function AgendaCalendar() {
  const today = jakartaToday();
  const first = new Date(today.year, today.month, 1);
  const leading = (first.getDay() + 6) % 7; // Monday-first, as Indonesia reads it
  const daysInMonth = new Date(today.year, today.month + 1, 0).getDate();

  const monthPrefix = `${today.year}-${String(today.month + 1).padStart(2, "0")}`;
  const byDay = new Map<number, typeof agenda>();
  for (const event of agenda) {
    if (!event.date.startsWith(monthPrefix)) continue;
    const day = Number(event.date.slice(8, 10));
    byDay.set(day, [...(byDay.get(day) ?? []), event]);
  }

  const upcoming = agenda
    .filter((event) => event.date >= today.iso)
    .slice(0, 4);

  return (
    <Sheet className="overflow-hidden">
      <div className="flex items-baseline gap-2 px-5 pt-4 pb-3">
        <h2 className="text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink">
          {formatMonth(today.year, today.month)}
        </h2>
        <p className="ml-auto text-[12px] text-muted">
          {agenda.filter((e) => e.date.startsWith(monthPrefix)).length} agenda
        </p>
      </div>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-7 gap-y-0.5">
          {weekdays.map((day) => (
            <div
              key={day}
              className="pb-1 text-center text-[10.5px] font-medium text-faint"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: leading }, (_, i) => (
            <div key={`lead-${i}`} aria-hidden />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const events = byDay.get(day) ?? [];
            const isToday = day === today.day;

            return (
              <div
                key={day}
                title={events.map((event) => event.title).join(" · ")}
                className="relative flex h-9 items-center justify-center"
              >
                <span
                  className={cn(
                    "figures flex size-7 items-center justify-center rounded-full text-[12.5px]",
                    isToday
                      ? "bg-primary font-semibold text-white"
                      : events.length > 0
                        ? "font-semibold text-ink"
                        : "text-muted",
                  )}
                >
                  {day}
                </span>
                {events.length > 0 ? (
                  <span
                    aria-hidden
                    className="absolute bottom-0.5 flex gap-[3px]"
                  >
                    {events.slice(0, 3).map((event) => (
                      <span
                        key={event.id}
                        className={cn(
                          "size-[4px] rounded-full",
                          isToday ? "bg-charcoal/35" : tint[event.kind].dot,
                        )}
                      />
                    ))}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-rule-soft px-5 py-3.5">
        <h3 className="text-[12px] font-semibold text-muted">Agenda terdekat</h3>

        {upcoming.length === 0 ? (
          <p className="mt-2 text-[13px] text-muted">
            Belum ada agenda bulan ini.
          </p>
        ) : (
          <ul className="mt-2.5 space-y-2.5">
            {upcoming.map((event) => (
              <li key={event.id} className="flex gap-3">
                <span
                  className={cn(
                    "flex h-9 w-11 shrink-0 flex-col items-center justify-center rounded-[10px] leading-none",
                    tint[event.kind].chip,
                  )}
                >
                  <span className="figures text-[13px] font-bold">
                    {Number(event.date.slice(8, 10))}
                  </span>
                  <span className="mt-0.5 text-[9.5px] font-medium opacity-80">
                    {formatShortDate(event.date).split(" ")[1]}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-snug font-medium text-ink">
                    {event.title}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">
                    {tint[event.kind].label} · {event.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Sheet>
  );
}
