import type { Metadata } from "next";

import { PublicPricing } from "@/components/pricing/public-pricing";

export const metadata: Metadata = {
  title: "Pilihan Paket Langganan & Harga",
  description:
    "Pilihan paket langganan Learnsphere untuk guru mata pelajaran, wali kelas, dan sekolah.",
};

export default function PricingPage() {
  return <PublicPricing />;
}
