import Link from "next/link";
import { ArrowUpRight, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Sheet, SheetHeading } from "@/components/ui/sheet";
import {
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableScroll,
} from "@/components/ui/table";
import { formatNumber, formatShortDate, formatTime } from "@/lib/format";
import { credits, creditUsage } from "@/lib/mock/teacher-data";

export const metadata = {
  title: "Kredit AI",
  description: "Sisa kredit, pemakaian, dan riwayat penggunaan AI.",
};

export default function CreditsPage() {
  const used = credits.total - credits.remaining;
  const pct = Math.round((credits.remaining / credits.total) * 100);
  const low = pct <= 20;

  const tiles = [
    {
      label: "Kuota paket",
      value: credits.total,
      note: `Paket ${credits.plan}`,
      surface: "bg-lilac",
      ink: "text-lilac-ink",
    },
    {
      label: "Terpakai",
      value: used,
      note: `${creditUsage.length} kali pemakaian`,
      surface: "bg-blush",
      ink: "text-blush-ink",
    },
    {
      label: "Tersisa",
      value: credits.remaining,
      note: `${pct}% dari kuota`,
      surface: "bg-mint",
      ink: "text-mint-ink",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-2 pb-14 sm:px-6">
      <PageHeader
        eyebrow={`Terisi kembali ${formatShortDate(credits.renewsOn, true)}`}
        title="Kredit AI"
        description="Satu soal yang dibuat AI memakai satu kredit. Mengubah, menyusun ulang, dan mengekspor soal tidak memakai kredit."
        action={
          <>
            <Button asChild variant="solid">
              <Link href="/ai">
                <Sparkles aria-hidden />
                Buat soal
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/billing">Tingkatkan paket</Link>
            </Button>
          </>
        }
      />

      <div className="space-y-4">
        <Sheet className="p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[12.5px] font-semibold text-muted">
                <Zap
                  aria-hidden
                  className={low ? "size-4 text-amber" : "size-4 text-mark"}
                />
                Sisa kredit bulan ini
              </p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="figures text-[38px] leading-none font-bold tracking-[-0.02em] text-ink">
                  {formatNumber(credits.remaining)}
                </span>
                <span className="text-[14px] text-muted">
                  dari {formatNumber(credits.total)} kredit
                </span>
              </p>
            </div>

            {low ? (
              <Badge tone="amber">Kredit hampir habis</Badge>
            ) : (
              <Badge tone="tuntas">Kredit mencukupi</Badge>
            )}
          </div>

          <div
            role="meter"
            aria-valuenow={credits.remaining}
            aria-valuemin={0}
            aria-valuemax={credits.total}
            aria-label="Kredit AI tersisa"
            className="mt-4 h-2 overflow-hidden rounded-full bg-paper-deep"
          >
            <div
              className={low ? "h-full rounded-full bg-amber" : "h-full rounded-full bg-mark"}
              style={{ width: `${pct}%` }}
            />
          </div>

          <p className="mt-2.5 text-[12.5px] text-muted">
            {formatNumber(used)} kredit terpakai · {formatNumber(credits.remaining)}{" "}
            tersisa · kuota terisi kembali{" "}
            {formatShortDate(credits.renewsOn, true)}.
          </p>
        </Sheet>

        <div className="grid gap-3 sm:grid-cols-3">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className={`relative overflow-hidden rounded-[var(--radius-sheet)] ${tile.surface} p-4`}
            >
              <span aria-hidden className="stat-disc" />
              <p className={`relative text-[12.5px] font-semibold ${tile.ink}`}>
                {tile.label}
              </p>
              <p className="figures relative mt-3 text-[26px] leading-none font-bold tracking-[-0.02em] text-ink">
                {formatNumber(tile.value)}
              </p>
              <p className="relative mt-2 text-[11.5px] text-ink-soft">
                {tile.note}
              </p>
            </div>
          ))}
        </div>

        <Sheet className="overflow-hidden">
          <SheetHeading
            title="Riwayat penggunaan"
            action={
              <Link
                href="/billing"
                className="inline-flex items-center gap-1 text-[12.5px] font-medium text-muted hover:text-ink"
              >
                Lihat paket
                <ArrowUpRight aria-hidden className="size-3.5" />
              </Link>
            }
          />

          <TableScroll>
            <Table>
              <THead>
                <tr>
                  <TH numeric className="w-28">
                    Tanggal
                  </TH>
                  <TH>Aktivitas</TH>
                  <TH>Keterangan</TH>
                  <TH numeric className="w-24">
                    Kredit
                  </TH>
                </tr>
              </THead>
              <TBody>
                {creditUsage.map((entry) => (
                  <TR key={entry.id}>
                    <TD numeric className="whitespace-nowrap text-faint">
                      {formatShortDate(entry.at)} · {formatTime(entry.at)}
                    </TD>
                    <TD className="min-w-56 font-medium text-ink">
                      {entry.label}
                    </TD>
                    <TD className="min-w-48">{entry.detail}</TD>
                    <TD numeric className="font-semibold text-ink">
                      −{formatNumber(entry.amount)}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </TableScroll>
        </Sheet>
      </div>
    </div>
  );
}
