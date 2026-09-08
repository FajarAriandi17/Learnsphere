function Bar({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={`block rounded-full bg-rule-soft ${className ?? ""}`}
    />
  );
}

/** The skeleton mirrors the dashboard's own shape, so nothing shifts on arrival. */
export default function DashboardLoading() {
  return (
    <div
      aria-busy
      aria-label="Memuat dasbor"
      className="mx-auto w-full max-w-6xl animate-pulse px-4 pt-2 pb-14 sm:px-6"
    >
      <Bar className="h-3 w-40" />
      <Bar className="mt-3 h-7 w-72" />
      <Bar className="mt-3 h-3.5 w-full max-w-md" />

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {["bg-lemon", "bg-blush", "bg-mint", "bg-sky"].map((tone) => (
          <div
            key={tone}
            className={`h-[118px] rounded-[var(--radius-sheet)] ${tone} opacity-60`}
          />
        ))}
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1.55fr_1fr]">
        <div className="space-y-4">
          <div className="sheet p-5">
            <Bar className="h-3.5 w-48" />
            <Bar className="mt-4 h-[190px] w-full" />
          </div>
          <div className="grid gap-3 xl:grid-cols-[1.3fr_1fr]">
            <div className="sheet overflow-hidden">
              <div className="px-5 py-4">
                <Bar className="h-3.5 w-28" />
              </div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-t border-rule-soft px-5 py-3"
                >
                  <Bar className="size-9 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Bar className="h-3 w-2/3" />
                    <Bar className="h-2.5 w-1/2" />
                  </div>
                  <Bar className="h-5 w-14" />
                </div>
              ))}
            </div>
            <div className="sheet space-y-3 p-5">
              <Bar className="h-3.5 w-28" />
              <Bar className="h-11 w-full" />
              <Bar className="h-14 w-full" />
              <Bar className="h-3 w-full" />
              <Bar className="h-3 w-3/4" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="sheet space-y-3 p-5">
            <Bar className="h-3.5 w-32" />
            <Bar className="h-[236px] w-full" />
          </div>
          <div className="sheet space-y-2 p-5">
            <Bar className="h-3.5 w-24" />
            <Bar className="h-12 w-full" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Bar key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
