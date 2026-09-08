"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

import { NavList } from "@/components/shell/nav-list";
import { QuotaCard } from "@/components/shell/sidebar";

/**
 * The rail, borrowed for small screens. It is the same white panel as the
 * desktop sidebar — a drawer that switched surface would make the same menu
 * look like two different products — over the slate scrim of an L4 overlay.
 */
export function MobileNav({ footer }: { footer?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-rule bg-sheet text-ink-soft transition-colors hover:border-faint hover:bg-paper-deep lg:hidden"
        >
          <Menu aria-hidden className="size-[18px]" />
          <span className="sr-only">Buka menu</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[4px] lg:hidden" />
        <Dialog.Content className="rail fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col shadow-modal focus:outline-none lg:hidden">
          <div className="flex items-start justify-between px-4 pt-5 pb-4">
            <div>
              <Dialog.Title className="inline-flex items-baseline gap-1">
                <span className="text-[19px] leading-none font-bold tracking-[-0.03em] text-ink">
                  Learn
                </span>
                <span className="text-[13px] leading-none font-semibold text-primary">
                  sphere
                </span>
              </Dialog.Title>
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-muted">
                Semua kebutuhan mengajar
                <br />
                dalam satu tempat.
              </p>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-[var(--radius-control)] text-faint transition-colors hover:bg-paper-deep hover:text-ink"
              >
                <X aria-hidden className="size-[18px]" />
                <span className="sr-only">Tutup menu</span>
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-2.5 pb-4">
            <NavList onNavigate={() => setOpen(false)} />
          </div>

          <div className="border-t border-rule px-3 py-3">
            <QuotaCard />
            {footer ? <div className="mt-2 px-1">{footer}</div> : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
