import * as React from "react";
import { ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Native select and inputs on purpose: they behave correctly on the low-end
 * Android browsers a lot of teachers work from, and the OS picker beats a
 * custom listbox on a phone.
 */

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const id = React.useId();
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="block text-[12.5px] font-medium text-muted"
      >
        {label}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ id?: string }>, {
            id,
          })
        : children}
      {hint ? <p className="text-[11.5px] text-faint">{hint}</p> : null}
    </div>
  );
}

const control =
  "h-10 w-full rounded-[var(--radius-control)] border border-rule bg-sheet px-3 text-[13.5px] text-ink transition-colors hover:border-outline focus:border-primary/40 focus:bg-sheet";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(control, "appearance-none pr-8", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-faint"
      />
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        control,
        "h-auto min-h-20 resize-y py-2 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

/** Search reads as search: the magnifier sits inside the control. */
export function SearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-faint"
      />
      <input type="search" className={cn(control, "pl-9", className)} {...props} />
    </div>
  );
}

