import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Empty is a state, not an accident: say what would be here and what to do
 * next. PRD §57 asks every feature to cover loading, empty, error and success.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-4 py-12 text-center", className)}>
      <p className="text-[15px] font-semibold text-ink">{title}</p>
      {description ? (
        <p className="mx-auto mt-1.5 max-w-[46ch] text-[13px] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
      {action ? (
        <div className="mt-4 flex justify-center gap-2">{action}</div>
      ) : null}
    </div>
  );
}

/** The same idea inside a table, spanning every column. */
export function EmptyRow({
  span,
  title,
  description,
}: {
  span: number;
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <tr>
      <td colSpan={span} className="p-0">
        <EmptyState title={title} description={description} />
      </td>
    </tr>
  );
}
