import type { Metadata } from "next";

import { BillingOverview } from "@/components/billing/billing-overview";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Langganan & Kredit",
  description: "Kelola paket langganan, kuota kredit AI, dan riwayat tagihan.",
};

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow="Langganan & Kuota AI"
        title="Paket & Pembayaran"
        description="Kelola paket aktif Anda, pantau pemakaian kredit AI pembuatan soal dan narasi raport, serta unduh faktur resmi untuk pelaporan BOS."
      />

      <div className="space-y-9">
        <Section
          id="billing"
          title="Status Akun & Kuota"
          note="Kredit direset setiap tanggal 1 setiap bulannya sesuai paket langganan."
        >
          <BillingOverview selectedPlanId={plan} />
        </Section>
      </div>
    </div>
  );
}
