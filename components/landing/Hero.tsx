import * as React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mark/10 text-mark text-[12px] font-medium mb-6">
            <Star className="size-3.5 fill-current" />
            <span>Dipercaya oleh 500+ Guru di Indonesia</span>
          </div>
          <h1 className="font-serif text-[48px] md:text-[64px] font-bold text-ink leading-[1.1] mb-6 tracking-tight">
            Buat Soal Ujian Berkualitas dalam Hitungan Detik
          </h1>
          <p className="text-[18px] text-muted mb-10 max-w-2xl leading-relaxed">
            Hentikan pengerjaan soal manual yang memakan waktu. Biarkan AI membantu Anda menyusun naskah ujian yang kredibel, terstruktur, dan sesuai kurikulum.
          </p>
          <div className="flex gap-4">
            <Button asChild variant="solid" className="px-8 h-12 text-[15px]">
              <Link href="/login">
                Mulai Sekarang <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-8 h-12 text-[15px]">
              <Link href="/login">
                Lihat Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mark/5 via-transparent to-transparent -z-0" />
    </section>
  );
}
