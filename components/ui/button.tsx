import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] active:translate-y-px disabled:pointer-events-none disabled:opacity-45 disabled:active:translate-y-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-primary text-white hover:bg-primary-deep",
        outline:
          "border border-rule bg-sheet text-ink hover:border-outline hover:bg-paper-deep",
        quiet: "text-muted hover:bg-rule-soft hover:text-ink",
        mark: "bg-primary text-white hover:bg-primary-deep",
        /* For a control sitting on a slate or cream panel, not on a card. */
        ghost: "border border-rule bg-sheet/70 text-ink hover:bg-sheet",
      },
      size: {
        sm: "h-8 px-3 text-[13px] [&_svg]:size-3.5",
        md: "h-10 px-4 text-sm [&_svg]:size-4",
        lg: "h-11 px-5 text-[15px] [&_svg]:size-4",
        icon: "size-10 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
