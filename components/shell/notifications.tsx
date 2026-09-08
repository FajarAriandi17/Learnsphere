"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Bell, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  activityHref,
  activityIcons,
  activityLabel,
  activityTint,
} from "@/lib/activity";
import { formatRelative } from "@/lib/format";
import type { ActivityEntry } from "@/types";

/**
 * PRD §8 — the notification affordance in the topbar. There is no read/unread
 * state in the data model yet, so this is honest about what it is: a shortcut to
 * what the workspace recorded most recently. The dot appears when there is
 * anything to look at, never as a manufactured badge count.
 */
export function Notifications({ entries }: { entries: ActivityEntry[] }) {
  const [open, setOpen] = React.useState(false);
  const shown = entries.slice(0, 6);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          title="Aktivitas terbaru"
          className="relative flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-rule bg-sheet/80 text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
        >
          <Bell aria-hidden className="size-[18px]" />
          {shown.length > 0 ? (
            <span
              aria-hidden
              className="absolute top-2 right-2.5 size-[7px] rounded-full bg-mark ring-2 ring-sheet"
            />
          ) : null}
          <span className="sr-only">
            Aktivitas terbaru{shown.length > 0 ? `, ${shown.length} catatan` : ""}
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/30" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[23rem] flex-col border-l border-rule bg-paper shadow-lift focus:outline-none">
          <div className="flex items-center gap-2 px-5 pt-5 pb-3">
            <Dialog.Title className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
              Aktivitas terbaru
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="quiet" size="icon" className="ml-auto">
                <X aria-hidden />
                <span className="sr-only">Tutup</span>
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {shown.length === 0 ? (
              <p className="px-1 py-8 text-center text-[13px] leading-relaxed text-muted">
                Belum ada data.
                <br />
                Aktivitas Anda akan muncul di sini.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {shown.map((entry) => {
                  const Icon = activityIcons[entry.kind];
                  return (
                    <li key={entry.id}>
                      <Link
                        href={activityHref[entry.kind]}
                        onClick={() => setOpen(false)}
                        className="flex gap-3 rounded-[var(--radius-control)] border border-transparent px-3 py-2.5 transition-colors hover:border-rule hover:bg-sheet"
                      >
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-[10px] ${activityTint[entry.kind]}`}
                        >
                          <Icon aria-hidden className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] leading-snug font-medium text-ink">
                            {entry.text}
                          </span>
                          <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                            {activityLabel[entry.kind]} ·{" "}
                            {formatRelative(entry.at)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="border-t border-rule px-5 py-3">
            <Link
              href="/documents"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:underline"
            >
              Lihat semua dokumen
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
