import * as React from "react";
import { ArrowRight, Mail } from "lucide-react";

export function LeadForm() {
  return (
    <section className="py-24 bg-ink text-sheet">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-[32px] font-semibold mb-4">Siap Menghemat Waktu Anda?</h2>
          <p className="text-[16px] text-sheet/70 max-w-xl mx-auto">
            Daftarkan email Anda untuk mendapatkan akses awal ke fitur terbaru dan panduan penyusunan soal berbasis AI.
          </p>
        </div>
        <form className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-sheet/40" />
            <input
              type="email"
              placeholder="contoh@guru.sch.id"
              className="w-full pl-10 pr-4 py-3 bg-sheet/5 border border-sheet/20 rounded-md text-[15px] focus:outline-none focus:border-sheet/50 placeholder:text-sheet/30"
            />
          </div>
          <button className="px-6 py-3 bg-mark text-ink rounded-md font-medium text-[15px] hover:bg-mark/90 transition-colors">
            Daftar
          </button>
        </form>
      </div>
    </section>
  );
}
