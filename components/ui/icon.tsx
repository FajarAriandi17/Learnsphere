import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Material Symbols Outlined glyph, matching the reference design's icon set.
 * `filled` flips the FILL axis to 1 (used for rating stars and solid marks).
 * Always decorative here — labels carry the meaning, so aria-hidden.
 */
export function Icon({
  name,
  className,
  filled = false,
  style,
  title,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  style?: React.CSSProperties;
  title?: string;
}) {
  return (
    <span
      aria-hidden="true"
      title={title}
      className={cn("material-symbols-outlined leading-none", className)}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
