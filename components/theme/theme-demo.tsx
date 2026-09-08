"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeDemo() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <section id="tema" className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <span className="rounded-full bg-kurikulum-k13/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-kurikulum-k13">
          Tema
        </span>
        <h2 className="mt-3 font-headline-lg text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
          Pilih Tema yang Nyaman untuk Mata Anda
        </h2>
        <p className="mt-2 font-body-lg text-sm text-on-surface-variant sm:text-base">
          Beralih antara mode terang dan gelap sesuai preferensi atau kondisi pencahayaan ruangan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <button
          onClick={() => setMode("light")}
          className={`relative overflow-hidden rounded-3xl border-2 p-8 text-left shadow-lift transition-all hover:scale-[1.01] ${
            mode === "light" ? "border-kurikulum-k13 ring-2 ring-kurikulum-k13/20" : "border-border-subtle"
          } bg-surface-card text-on-surface`}
        >
          <div className="mb-4 flex items-center gap-2 text-credit-amber">
            <Sun className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-wider">Light Theme</span>
          </div>
          <h3 className="mb-2 text-xl font-extrabold">Learnsphere — Light</h3>
          <p className="text-sm text-on-surface-variant">Kanvas kebiruan muda dengan kartu putih bersih dan aksen emerald.</p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-bold text-on-surface">#F8F9FF</span>
            <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-bold text-on-surface">#E5EEFF</span>
          </div>
        </button>

        <button
          onClick={() => setMode("dark")}
          className={`relative overflow-hidden rounded-3xl border-2 p-8 text-left shadow-lift transition-all hover:scale-[1.01] ${
            mode === "dark" ? "border-kurikulum-k13 ring-2 ring-kurikulum-k13/20" : "border-border-subtle"
          } bg-surface-card-dark text-on-surface-dark dark:bg-surface-card-dark dark:text-on-surface-dark`}
        >
          <div className="mb-4 flex items-center gap-2 text-kurikulum-merdeka">
            <Moon className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-wider">Dark Theme</span>
          </div>
          <h3 className="mb-2 text-xl font-extrabold">Learnsphere — Dark</h3>
          <p className="text-sm text-on-surface-variant-dark">Kanvas tua dengan permukaan tinggi dan teks terang untuk kenyamanan malam.</p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-surface-container-lowest px-3 py-1 text-xs font-bold text-on-surface-dark">#1A2E44</span>
            <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-bold text-on-surface-dark">#233852</span>
          </div>
        </button>
      </div>

      <div className="mt-10 rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-2xs dark:border-border-subtle dark:bg-surface-card-dark">
        <div className="flex items-center gap-3 mb-3">
          <div className={`h-3 w-3 rounded-full ${mode === "light" ? "bg-credit-amber" : "bg-kurikulum-merdeka"}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Active</span>
          <span className="text-sm font-bold text-on-surface dark:text-on-surface-dark">{mode === "light" ? "Light Theme" : "Dark Theme"}</span>
        </div>
        <p className="text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
          Preview ini tidak mengubah tema global. Gunakan tombol di header untuk menerapkan tema ke seluruh aplikasi.
        </p>
      </div>
    </section>
  );
}