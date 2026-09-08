import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A block of a page: a bold label, whatever acts on the block at the far end,
 * and an optional line of orientation under it. No box and no rule — the gap
 * between blocks is what separates them. PRD §37.
 */
export function Section({
  id,
  title,
  action,
  note,
  children,
  className,
}: {
  id: string;
  title: string;
  /** Sits at the right end of the heading row. */
  action?: React.ReactNode;
  /** One line under the heading, for a caveat or a count. */
  note?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={className}>
      <div className="ledger-heading mb-3.5">
        <h2
          id={id}
          className="text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink"
        >
          {title}
        </h2>
        {action ? <span className="ml-auto">{action}</span> : null}
      </div>
      {note ? (
        <p className="mb-3.5 max-w-[70ch] text-[12.5px] leading-relaxed text-muted">
          {note}
        </p>
      ) : null}
      {children}
    </section>
  );
}

/** A row of controls above a table: filters on the left, actions on the right. */
export function Toolbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-3",
        className,
      )}
      {...props}
    />
  );
}
