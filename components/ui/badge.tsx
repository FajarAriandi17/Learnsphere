import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium leading-5",
  {
    variants: {
      tone: {
        neutral: "bg-paper-deep/70 text-muted",
        ink: "bg-ink/[0.07] text-ink",
        mark: "bg-mark-tint text-mark",
        tuntas: "bg-tuntas-tint text-tuntas",
        amber: "bg-amber-tint text-amber",
        /* PRD §17 — the pastels used to tag a soal: difficulty, level, subject. */
        lemon: "bg-lemon text-lemon-ink",
        blush: "bg-blush text-blush-ink",
        mint: "bg-mint text-mint-ink",
        sky: "bg-sky text-sky-ink",
        lilac: "bg-lilac text-lilac-ink",
        /* DESIGN.md §2 — curriculum and Bloom taxonomy chips, each a fill/ink pair. */
        merdeka: "bg-sky text-sky-ink",
        k13: "bg-paper-deep text-ink-soft",
        hots: "bg-lilac text-lilac-ink",
        lots: "bg-sky text-sky-ink",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
