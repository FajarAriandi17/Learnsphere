import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * PRD §57 forbids fake buttons: anything waiting on a backend is shown in its
 * real place, disabled, and said out loud — never as a control that pretends to
 * succeed. These two components are the only way an unfinished action is drawn.
 */

export function PlannedAction({
  children,
  reason = "Belum tersedia",
  className,
  ...props
}: Omit<ButtonProps, "disabled" | "asChild"> & { reason?: string }) {
  return (
    <Button
      type="button"
      disabled
      title={reason}
      className={cn(className)}
      {...props}
    >
      {children}
      <span className="sr-only"> — {reason}</span>
    </Button>
  );
}

/**
 * The sentence that explains what a disabled control is waiting for. Marked by
 * a rule rather than a tinted box, so it reads as a margin note.
 */
export function PlannedNote({
  label = "Rencana integrasi",
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "border-l-2 border-amber py-0.5 pl-3 text-[12.5px] leading-relaxed text-ink-soft",
        className,
      )}
    >
      <span className="font-medium text-amber">{label}. </span>
      {children}
    </p>
  );
}
