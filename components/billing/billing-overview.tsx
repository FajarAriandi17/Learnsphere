"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  CreditCard,
  Download,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlannedAction, PlannedNote } from "@/components/ui/planned";
import { Segmented } from "@/components/ui/segmented";
import { Sheet } from "@/components/ui/sheet";
import {
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableScroll,
} from "@/components/ui/table";
import { formatNumber, formatRupiah, formatShortDate } from "@/lib/format";
import {
  creditUsage,
  invoices,
  paymentChannels,
  paymentProviders,
  plans,
} from "@/lib/mock/plans";
import { credits } from "@/lib/mock/teacher-data";

const invoiceStatusTone = {
  lunas: "tuntas",
  menunggu: "amber",
  gagal: "mark",
} as const;

const invoiceStatusLabel = {
  lunas: "Lunas",
  menunggu: "Menunggu",
  gagal: "Gagal",
} as const;

export function BillingOverview({
  selectedPlanId = "basic",
}: {
  selectedPlanId?: string;
}) {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">(
    "monthly",
  );
  const [targetPlan, setTargetPlan] = React.useState(selectedPlanId);

  const usedCredits = credits.total - credits.remaining;
  const usedPercent = Math.round((usedCredits / credits.total) * 100);

  return (
    <div className="space-y-8">
      {/* Current Subscription Card */}
      <Sheet className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge tone="ink">Paket Aktif</Badge>
              <h3 className="font-serif text-[20px] font-medium text-ink">
                {credits.plan}
              </h3>
            </div>
            <p className="mt-1 text-[13px] text-muted">
              Perpanjangan otomatis pada{" "}
              <strong className="text-ink">
                {formatShortDate(credits.renewsOn, true)}
              </strong>{" "}
              (Rp35.000 / bulan).
            </p>
          </div>

          <div className="text-right">
            <span className="figures text-[24px] font-semibold text-ink">
              {credits.remaining}
            </span>
            <span className="text-[13px] text-faint"> / {credits.total} kredit</span>
            <p className="text-[11.5px] text-muted">Kredit AI tersisa bulan ini</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-paper">
            <div
              className="h-full bg-ink transition-all"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[12px] text-muted">
            <span>{usedCredits} kredit terpakai ({usedPercent}%)</span>
            <span>{credits.remaining} kredit tersedia</span>
          </div>
        </div>

        {/* Credit breakdown by feature */}
        <div className="mt-5 border-t border-rule-soft pt-4">
          <h4 className="text-[12px] font-medium text-faint">
            Rincian pemakaian kredit semester ini
          </h4>
          <div className="mt-2.5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {creditUsage.map((u) => (
              <div key={u.label} className="rounded-[var(--radius-control)] bg-paper/60 p-2.5">
                <span className="block text-[11.5px] text-muted">{u.label}</span>
                <span className="figures mt-0.5 block text-[16px] font-semibold text-ink">
                  {u.value}{" "}
                  <span className="text-[11px] font-normal text-faint">kredit</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* Upgrade Options */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-[18px] font-medium text-ink">
              Pilihan Paket Langganan
            </h3>
            <p className="text-[13px] text-muted">
              Tingkatkan kuota kredit dan fitur administrasi sesuai kebutuhan Anda.
            </p>
          </div>

          <Segmented
            value={billingCycle}
            onChange={setBillingCycle}
            label="Periode tagihan"
            options={[
              { value: "monthly", label: "Bulanan" },
              { value: "yearly", label: "Tahunan (Hemat ~20%)" },
            ]}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => {
            const isCurrent = p.id === "basic";
            const price =
              billingCycle === "monthly" ? p.monthly : p.yearly;

            return (
              <Sheet
                key={p.id}
                className="flex flex-col justify-between p-5 transition-colors hover:border-ink/30"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[17px] font-medium text-ink">
                      {p.name}
                    </span>
                    {isCurrent ? (
                      <Badge tone="ink">Aktif</Badge>
                    ) : p.featured ? (
                      <Badge tone="tuntas">Paling Populer</Badge>
                    ) : null}
                  </div>

                  <p className="mt-1 text-[12px] text-muted min-h-8">
                    {p.tagline}
                  </p>

                  <div className="mt-4 border-t border-rule-soft pt-3">
                    {price === null ? (
                      <p className="font-serif text-[22px] font-semibold text-ink">
                        Kustom
                      </p>
                    ) : price === 0 ? (
                      <p className="font-serif text-[22px] font-semibold text-ink">
                        Rp0
                      </p>
                    ) : (
                      <p className="font-serif text-[22px] font-semibold text-ink">
                        {formatRupiah(price)}
                        <span className="font-sans text-[12px] font-normal text-faint">
                          {" "}
                          / bln
                        </span>
                      </p>
                    )}
                    <span className="text-[11.5px] text-faint">
                      {billingCycle === "yearly" && price
                        ? "Ditagih tahunan"
                        : "Ditagih per bulan"}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 border-t border-rule-soft pt-3 text-[12.5px] text-ink-soft">
                    <li className="flex items-center gap-2">
                      <Check aria-hidden className="size-3.5 text-tuntas" />
                      <span>{p.credits}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check aria-hidden className="size-3.5 text-tuntas" />
                      <span>Maks. {p.students}</span>
                    </li>
                    <li className="flex items-center gap-2 text-[12px] text-muted">
                      <span>{p.note}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  {isCurrent ? (
                    <Button variant="outline" disabled className="w-full">
                      Paket Saat Ini
                    </Button>
                  ) : (
                    <PlannedAction
                      variant={p.featured ? "solid" : "outline"}
                      className="w-full"
                      reason="Integrasi gerbang pembayaran belum tersambung"
                    >
                      {p.cta}
                    </PlannedAction>
                  )}
                </div>
              </Sheet>
            );
          })}
        </div>
      </div>

      {/* Payment Channels Section */}
      <div>
        <h3 className="font-serif text-[18px] font-medium text-ink">
          Metode Pembayaran Resmi
        </h3>
        <p className="mt-0.5 text-[13px] text-muted">
          Dukungan multi-channel yang aman melalui payment gateway terverifikasi (
          {paymentProviders.join(" & ")}).
        </p>

        <div className="mt-3.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paymentChannels.map((ch) => (
            <Sheet key={ch.id} className="p-3.5">
              <span className="font-medium text-[14px] text-ink">
                {ch.name}
              </span>
              <p className="mt-1 text-[12px] text-muted leading-relaxed">
                {ch.detail}
              </p>
            </Sheet>
          ))}
        </div>
      </div>

      {/* Invoice History */}
      <div>
        <h3 className="font-serif text-[18px] font-medium text-ink">
          Riwayat Tagihan & Faktur
        </h3>
        <p className="mt-0.5 text-[13px] text-muted">
          Bukti pembayaran resmi untuk keperluan administrasi dan pelaporan BOS.
        </p>

        <Sheet className="mt-3.5 overflow-hidden">
          <TableScroll>
            <Table>
              <THead>
                <tr>
                  <TH>Nomor Faktur</TH>
                  <TH>Periode Tagihan</TH>
                  <TH numeric>Jumlah</TH>
                  <TH>Metode Pembayaran</TH>
                  <TH>Status</TH>
                  <TH numeric>Tanggal Terbit</TH>
                  <TH className="text-right">Aksi</TH>
                </tr>
              </THead>
              <TBody>
                {invoices.map((inv) => (
                  <TR key={inv.id}>
                    <TD className="font-medium text-ink figures">
                      {inv.number}
                    </TD>
                    <TD>{inv.period}</TD>
                    <TD numeric className="figures font-medium">
                      {formatRupiah(inv.amount)}
                    </TD>
                    <TD>{inv.method}</TD>
                    <TD>
                      <Badge tone={invoiceStatusTone[inv.status]}>
                        {invoiceStatusLabel[inv.status]}
                      </Badge>
                    </TD>
                    <TD numeric className="whitespace-nowrap">
                      {formatShortDate(inv.issuedAt, true)}
                    </TD>
                    <TD className="text-right">
                      {inv.status === "lunas" ? (
                        <PlannedAction
                          size="sm"
                          variant="quiet"
                          reason="Unduh faktur PDF belum tersambung"
                        >
                          <Download aria-hidden className="size-3.5" />
                          Unduh PDF
                        </PlannedAction>
                      ) : inv.status === "menunggu" ? (
                        <PlannedAction
                          size="sm"
                          variant="solid"
                          reason="Gerbang pembayaran belum tersambung"
                        >
                          Bayar Sekarang
                        </PlannedAction>
                      ) : (
                        <span className="text-[12px] text-faint">—</span>
                      )}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </TableScroll>
        </Sheet>
      </div>

      <PlannedNote>
        Pembayaran instan QRIS, Virtual Account bank nasional, dan faktur pajak
        otomatis siap diintegrasikan melalui adaptor Midtrans/Xendit tanpa
        mengubah struktur data frontend.
      </PlannedNote>
    </div>
  );
}
