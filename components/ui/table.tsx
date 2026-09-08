import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * PRD §19 asks for rounded rows rather than a hard grid. So: a tinted head
 * band, the lightest possible rule between rows, and a warm fill on hover.
 * `numeric` puts a cell in the tabular figures column so digits line up the
 * way they do in a paper register.
 */

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={cn("w-full border-collapse text-left", className)}
      {...props}
    />
  );
}

export function THead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("bg-paper-deep/45 text-muted", className)}
      {...props}
    />
  );
}

export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TR({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-t border-rule-soft transition-colors hover:bg-paper/60",
        className,
      )}
      {...props}
    />
  );
}

interface CellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}

export function TH({ className, numeric, ...props }: CellProps) {
  return (
    <th
      scope="col"
      className={cn(
        "px-4 py-2.5 text-[11.5px] font-medium whitespace-nowrap text-muted",
        numeric && "text-right",
        className,
      )}
      {...props}
    />
  );
}

export function TD({ className, numeric, ...props }: CellProps) {
  return (
    <td
      className={cn(
        "px-4 py-3 align-middle text-[13.5px] text-ink-soft",
        numeric && "figures text-right",
        className,
      )}
      {...props}
    />
  );
}

/** Wraps a table that is wider than a phone, so only the table scrolls. */
export function TableScroll({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("overflow-x-auto", className)} {...props} />;
}
