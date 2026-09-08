import { Paperclip } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Sheet } from "@/components/ui/sheet";
import { formatShortDate } from "@/lib/format";
import type { PortfolioItem } from "@/types";

/**
 * Portfolio entries as they read on a printed portfolio: what was done, then
 * the teacher's note under a rule. Shared by /portfolios and the profile.
 */
export function PortfolioEntries({
  items,
  emptyTitle = "Belum ada catatan portofolio",
  emptyDescription = "Catat projek, kegiatan, lomba, atau prestasi agar rekam jejak siswa tidak hilang di akhir semester.",
}: {
  items: PortfolioItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  if (items.length === 0) {
    return (
      <Sheet>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </Sheet>
    );
  }

  return (
    <Sheet className="overflow-hidden">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="border-t border-rule-soft px-4 py-3.5 first:border-t-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <Badge tone="ink">{item.kind}</Badge>
              <h3 className="font-serif text-[15px] leading-snug font-medium text-ink">
                {item.title}
              </h3>
              <span className="figures ms-auto text-[12px] whitespace-nowrap text-faint">
                {formatShortDate(item.date, true)}
              </span>
            </div>

            <p className="mt-1.5 max-w-[72ch] text-[13px] leading-relaxed text-ink-soft">
              {item.description}
            </p>

            <p className="mt-2 max-w-[72ch] border-l-2 border-rule pl-2.5 text-[12.5px] leading-relaxed text-muted">
              <span className="text-faint">Catatan guru. </span>
              {item.teacherNote}
            </p>

            {item.evidence ? (
              <p className="mt-2 flex items-center gap-1.5 text-[12px] text-faint">
                <Paperclip aria-hidden className="size-3.5" />
                {item.evidence}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Sheet>
  );
}
