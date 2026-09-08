"use client";

import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-24 text-center">
      <h1 className="font-serif text-[22px] font-medium text-ink">
        Dasbor tidak bisa dimuat
      </h1>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
        Data ringkasan gagal diambil. Data Anda tidak berubah — muat ulang untuk
        mencoba lagi. Jika masih gagal, periksa koneksi internet Anda.
      </p>
      <Button variant="solid" onClick={reset} className="mt-5">
        <RotateCw aria-hidden />
        Muat ulang dasbor
      </Button>
    </div>
  );
}
