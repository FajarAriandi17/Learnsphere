import { Sheet } from "@/components/ui/sheet";
import { formatNumber } from "@/lib/format";
import { weeklyActivity } from "@/lib/mock/teacher-data";

/**
 * Colour tells the series apart at a glance; the dash pattern tells them apart
 * without colour, which is what PRD §43 asks for. Solid is the headline series.
 */
const look: Record<string, { color: string; dash?: string }> = {
  soal: { color: "var(--color-mark)" },
  ekspor: { color: "var(--color-tuntas)", dash: "1.5 4" },
  kredit: { color: "var(--color-sky-ink)", dash: "6 4" },
};

const W = 720;
const H = 210;
const PAD = { left: 30, right: 10, top: 16, bottom: 26 };

export function ActivityChart() {
  const { days, series } = weeklyActivity;
  const raw = Math.max(...series.flatMap((line) => [...line.values]));
  const max = Math.max(10, Math.ceil(raw / 10) * 10);

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (i * plotW) / (days.length - 1);
  const y = (value: number) => PAD.top + (1 - value / max) * plotH;

  const ticks = [0, max / 2, max];

  return (
    <Sheet className="overflow-hidden">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 pt-4">
        <h2 className="text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink">
          Aktivitas pembuatan soal
        </h2>
        <p className="text-[12px] text-muted">Tujuh hari terakhir</p>
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 px-5 pt-2.5">
        {series.map((line) => {
          const total = [...line.values].reduce<number>((sum, v) => sum + v, 0);
          return (
            <li
              key={line.key}
              className="flex items-center gap-1.5 text-[11.5px] text-muted"
            >
              <svg
                aria-hidden
                viewBox="0 0 18 8"
                className="h-2 w-[18px] shrink-0"
              >
                <line
                  x1="0"
                  y1="4"
                  x2="18"
                  y2="4"
                  stroke={look[line.key]?.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={look[line.key]?.dash}
                />
              </svg>
              {line.label}
              <span className="figures font-semibold text-ink">
                {formatNumber(total)}
              </span>
            </li>
          );
        })}
      </ul>

      <figure className="mt-1 px-2 pb-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Grafik garis aktivitas per hari"
          className="h-[190px] w-full"
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD.left}
                y1={y(tick)}
                x2={W - PAD.right}
                y2={y(tick)}
                stroke="var(--color-rule-soft)"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 8}
                y={y(tick) + 3.5}
                textAnchor="end"
                fill="var(--color-faint)"
                fontSize="10"
              >
                {tick}
              </text>
            </g>
          ))}

          {days.map((day, i) => (
            <text
              key={day}
              x={x(i)}
              y={H - 8}
              textAnchor="middle"
              fill="var(--color-faint)"
              fontSize="10.5"
            >
              {day}
            </text>
          ))}

          {series.map((line) => {
            const points = [...line.values].map(
              (value, i) => `${x(i)},${y(value)}`,
            );
            return (
              <g key={line.key}>
                <polyline
                  points={points.join(" ")}
                  fill="none"
                  stroke={look[line.key]?.color}
                  strokeWidth={line.key === "soal" ? 2.25 : 1.75}
                  strokeDasharray={look[line.key]?.dash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[...line.values].map((value, i) => (
                  <circle
                    key={i}
                    cx={x(i)}
                    cy={y(value)}
                    r="2.75"
                    fill="var(--color-sheet)"
                    stroke={look[line.key]?.color}
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            );
          })}
        </svg>

        <figcaption className="sr-only">
          {series.map((line) => (
            <span key={line.key}>
              {line.label}:{" "}
              {[...line.values]
                .map((value, i) => `${days[i]} ${value}`)
                .join(", ")}
              .{" "}
            </span>
          ))}
        </figcaption>
      </figure>
    </Sheet>
  );
}
