import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A card. PRD §37: the surface contrast and the soft border do the work, and
 * the shadow is only a hint that the card sits above the cream canvas.
 */
export function Sheet({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-sheet)] border border-rule bg-sheet shadow-card",
        className,
      )}
      {...props}
    />
  );
}

interface SheetHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  action?: React.ReactNode;
}

export function SheetHeading({
  title,
  action,
  className,
  ...props
}: SheetHeadingProps) {
  return (
    <div
      className={cn("flex items-center gap-3 px-5 pt-4 pb-3", className)}
      {...props}
    >
      <h2 className="text-[15px] leading-6 font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      {action ? <span className="ml-auto">{action}</span> : null}
    </div>
  );
}
