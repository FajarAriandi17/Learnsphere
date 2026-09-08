"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A toggle chip for the small closed sets in the generation context: question
 * count, question form, difficulty. Cheaper to hit than a select when the whole
 * set fits on screen.
 */
export function Chip({
  selected,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-3 py-1 text-[12.5px] leading-5 transition-colors",
        selected
          ? "border-primary bg-primary text-white"
          : "border-rule bg-sheet text-ink-soft hover:border-outline hover:text-ink",
        className,
      )}
      {...props}
    />
  );
}
