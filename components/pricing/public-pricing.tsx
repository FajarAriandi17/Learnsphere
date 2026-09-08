"use client";

import * as React from "react";
import Link from "next/link";
import { Check, HelpCircle, Minus, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { formatRupiah } from "@/lib/format";
import { featureGroups, planFeatures, plans } from "@/lib/mock/plans";

const faqs = [
  {
    q: "Apakah langganan Learnsphere dapat dibiayai menggunakan dana Bantuan Operasional Sekolah (BOS)?",
    a: "Ya. Setiap transaksi langganan paket Guru Pro dan Sekolah kami lengkapi dengan faktur resmi (invoice), kuitansi berstempel digital, dan rincian peruntukan komponen administrasi pembelajaran sesuai pedoman teknis penggunaan dana BOS.",
  },
  {
    q: "Bagaimana cara kerja kredit AI bulanan?",
    a: "1 kredit digunakan untuk menghasilkan 1 soal ujian lengkap (termasuk opsi jawaban, kunci, dan pembahasan) atau 1 narasi capaian kompetensi raport siswa. Kredit direset otomatis pada tanggal 1 setiap bulannya.",
  },
  {
    q: "Apakah data nilai siswa dan absensi aman dari pihak ketiga?",
    a: "Sangat aman. Kami menerapkan prinsip perlindungan data anak & pendidik (PRD §30). Data siswa dianonimisasi sebelum diproses oleh model AI, tidak disimpan secara permanen di server kecerdasan buatan, dan dienkripsi saat transit maupun saat disimpan.",
  },
  {
    q: "Apakah naskah ujian yang diunduh dapat diedit kembali di Microsoft Word?",
    a: "Tentu saja. Anda dapat mengunduh naskah soal dalam format Microsoft Word (.docx) dengan tata letak kop surat, dua kolom A4, dan tabel titik-titik yang siap diedit atau langsung dicetak ke mesin fotokopi sekolah.",
  },
  {
    q: "Apakah ada diskon khusus untuk kelompok kerja guru (MGMP / KKG) atau satu sekolah?",
    a: "Ya, kami menyediakan paket Sekolah dengan kuota kredit bersama dan harga khusus per guru yang sangat terjangkau untuk pengadaan kolektif sekolah maupun MGMP kabupaten/kota.",
  },
];

export function PublicPricing() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div className="space-y-16 py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <Badge tone="ink" className="mb-3">
          Investasi Waktu Guru
        </Badge>
        <h1 className="font-serif text-[32px] sm:text-[40px] font-semibold tracking-tight text-ink leading-tight">
          Hemat Ratusan Jam Administrasi, Fokus Penuh pada Mengajar
        </h1>
        <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-muted">
          Pilih paket langganan yang fleksibel untuk guru mata pelajaran, wali kelas, maupun pengadaan resmi sekolah. Mulai gratis tanpa kartu kredit.
        </p>

        <div className="mt-8 flex justify-center">
          <Segmented
            value={billingCycle}
            onChange={setBillingCycle}
            label="Periode penagihan"
            options={[
              { value: "monthly", label: "Bulanan" },
              { value: "yearly", label: "Tahunan (Hemat ~20%)" },
            ]}
          />
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => {
            const price = billingCycle === "monthly" ? p.monthly : p.yearly;

            return (
              <Sheet
                key={p.id}
                className={`flex flex-col justify-between p-6 transition-all ${
                  p.featured
                    ? "border-ink shadow-sm ring-1 ring-ink/20"
                    : "hover:border-ink/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[18px] font-semibold text-ink">
                      {p.name}
                    </span>
                    {p.featured ? (
                      <Badge tone="tuntas">Paling Populer</Badge>
                    ) : null}
                  </div>

                  <p className="mt-2 text-[12.5px] text-muted min-h-10">
                    {p.tagline}
                  </p>

                  <div className="mt-5 border-t border-rule-soft pt-4">
                    {price === null ? (
                      <p className="font-serif text-[26px] font-semibold text-ink">
                        Kustom
                      </p>
                    ) : price === 0 ? (
                      <p className="font-serif text-[26px] font-semibold text-ink">
                        Rp0
                      </p>
                    ) : (
                      <p className="font-serif text-[26px] font-semibold text-ink">
                        {formatRupiah(price)}
                        <span className="font-sans text-[13px] font-normal text-faint">
                          {" "}
                          / bln
                        </span>
                      </p>
                    )}
                    <span className="text-[12px] text-faint">
                      {billingCycle === "yearly" && price
                        ? "Ditagih tahunan"
                        : price === 0
                        ? "Selamanya gratis"
                        : "Ditagih per bulan"}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5 border-t border-rule-soft pt-4 text-[13px] text-ink-soft">
                    <li className="flex items-center gap-2">
                      <Check aria-hidden className="size-4 text-tuntas shrink-0" />
                      <span className="font-medium text-ink">{p.credits}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check aria-hidden className="size-4 text-tuntas shrink-0" />
                      <span>Maks. {p.students}</span>
                    </li>
                    <li className="flex items-center gap-2 text-[12px] text-muted">
                      <span>{p.note}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    asChild
                    variant={p.featured ? "solid" : "outline"}
                    className="w-full"
                  >
                    <Link href={p.id === "free" ? "/register" : `/register?plan=${p.id}`}>
                      {p.cta}
                    </Link>
                  </Button>
                </div>
              </Sheet>
            );
          })}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="font-serif text-[24px] font-semibold text-ink">
            Matriks Perbandingan Fitur Lengkap
          </h2>
          <p className="mt-1 text-[13.5px] text-muted">
            Transparansi penuh tanpa biaya tersembunyi.
          </p>
        </div>

        <Sheet className="overflow-hidden">
          <TableScroll>
            <Table>
              <THead>
                <tr>
                  <TH className="w-2/5">Fitur & Kemampuan</TH>
                  <TH className="text-center">Gratis</TH>
                  <TH className="text-center">Guru Basic</TH>
                  <TH className="text-center">Guru Pro</TH>
                  <TH className="text-center">Sekolah</TH>
                </tr>
              </THead>
              <TBody>
                {featureGroups.map((group) => {
                  const rows = planFeatures.filter((r) => r.group === group);
                  return (
                    <React.Fragment key={group}>
                      <TR className="bg-paper/80 font-medium">
                        <TD colSpan={5} className="text-[12px] font-semibold uppercase tracking-wider text-muted py-2">
                          {group}
                        </TD>
                      </TR>
                      {rows.map((row) => (
                        <TR key={row.label}>
                          <TD className="text-[13px] text-ink">{row.label}</TD>
                          <TD className="text-center text-[12.5px]">
                            {renderVal(row.values.free)}
                          </TD>
                          <TD className="text-center text-[12.5px]">
                            {renderVal(row.values.basic)}
                          </TD>
                          <TD className="text-center text-[12.5px]">
                            {renderVal(row.values.pro)}
                          </TD>
                          <TD className="text-center text-[12.5px]">
                            {renderVal(row.values.school)}
                          </TD>
                        </TR>
                      ))}
                    </React.Fragment>
                  );
                })}
              </TBody>
            </Table>
          </TableScroll>
        </Sheet>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="font-serif text-[24px] font-semibold text-ink">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-1 text-[13.5px] text-muted">
            Hal-hal yang sering ditanyakan bapak/ibu guru dan kepala sekolah.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Sheet key={idx} className="p-5">
              <h3 className="font-serif text-[16px] font-medium text-ink flex items-start gap-2">
                <HelpCircle className="size-4.5 text-muted shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft pl-6.5">
                {faq.a}
              </p>
            </Sheet>
          ))}
        </div>
      </div>

      {/* School consultation CTA */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="rounded-[var(--radius-sheet)] border border-rule bg-paper/60 p-8 sm:p-10">
          <Sparkles className="size-6 text-mark mx-auto mb-3" />
          <h3 className="font-serif text-[22px] font-semibold text-ink">
            Daftarkan Seluruh Guru di Sekolah Anda
          </h3>
          <p className="mt-2 text-[13.5px] text-muted max-w-xl mx-auto">
            Dapatkan presentasi demo kurikulum, instalasi template resmi sekolah, pelatihan guru secara daring, dan surat penawaran resmi untuk dana BOS.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild variant="solid">
              <Link href="mailto:sekolah@learnsphere.id">Konsultasi Paket Sekolah</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderVal(val: string | boolean) {
  if (val === true) {
    return <Check aria-label="Ya" className="size-4 text-tuntas inline-block" />;
  }
  if (val === false) {
    return <Minus aria-label="Tidak" className="size-4 text-faint inline-block" />;
  }
  return <span className="text-ink">{val}</span>;
}
