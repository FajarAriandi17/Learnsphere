"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

/**
 * Two or three mutually exclusive views of the same data — student/teacher copy
 * of an exam, monthly/yearly price. A radiogroup rather than tabs: the content
 * below is one thing seen two ways, not two different panels.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: ReadonlyArray<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex rounded-[var(--radius-control)] border border-rule bg-sheet p-0.5",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-[calc(var(--radius-control)-2px)] px-3 py-1 text-[12.5px] leading-6 font-medium transition-colors",
              active
                ? "bg-primary text-white"
                : "text-muted hover:bg-rule-soft hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
