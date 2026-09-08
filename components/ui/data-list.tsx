import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The fact block used by every detail page: label left, value beside it, two
 * columns once there is room. It carries no border of its own — put it inside
 * a Sheet so the panel's hairline does that job.
 */
export function DataList({
  items,
  columns = 2,
  className,
}: {
  items: Array<[string, React.ReactNode]>;
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-2.5 px-5 py-4",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
    >
      {items.map(([label, value]) => (
        <div key={label} className="flex gap-2 text-[13px] leading-snug">
          <dt className="w-32 shrink-0 text-faint">{label}</dt>
          <dd className="min-w-0 text-ink-soft">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
