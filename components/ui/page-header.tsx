import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The top of every page: the period it belongs to, the name of the job, one
 * sentence of orientation, and — when the page has one — the primary action.
 * Kept identical across sections so a teacher moving between them never has to
 * re-find where they are.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-4",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[12.5px] text-faint">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1.5 text-[26px] leading-tight font-bold tracking-[-0.02em] text-ink sm:text-[31px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </header>
  );
}
