import { Icon } from "./icon";
import { DemoSimulator } from "./demo-simulator";
import Link from "next/link";

const TRUST_BADGES = [
  { icon: "verified", label: "Dukungan Akun belajar.id" },
  { icon: "check_circle", label: "Tanpa Kartu Kredit" },
  { icon: "school", label: "Kurikulum Merdeka (Fase A-F) & K13" },
  { icon: "print", label: "Format Kop Resmi Sekolah" },
];

export function Hero() {
  return (
    <section
      id="solusi-guru"
      className="relative mx-auto max-w-[1280px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-16"
    >
      {/* Glow gradients */}
      <div className="pointer-events-none absolute -left-20 -top-12 -z-10 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/4 -z-10 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="mx-auto mb-12 max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-soft bg-primary-soft px-4 py-1.5 text-xs font-semibold text-kurikulum-k13 shadow-2xs dark:border-teal-400/20 dark:text-teal-300 sm:text-sm">
          <Icon name="auto_awesome" className="text-[18px] text-kurikulum-k13 dark:text-teal-300" />
          <span>Terverifikasi Standar BSKAP Kemendikdasmen</span>
        </div>

        <h1 className="mx-auto mb-6 max-w-4xl font-display-hero text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-br from-[#0ea5e9] via-[#6366f1] to-[#9333ea] bg-clip-text text-transparent">
            Buat Soal Ujian, Kisi-kisi &amp; Raport
          </span>
          <br className="hidden sm:block" />
          <span className="text-on-surface"> Siap Cetak dalam Hitungan Menit</span>
        </h1>

        <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-on-surface-variant sm:text-xl">
          Pangkas beban administrasi mengajar dari berjam-jam menjadi hanya{" "}
          <span className="font-bold text-kurikulum-k13">3 menit</span>.
        </p>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-on-surface-variant/80 sm:text-lg">
          Generator soal otomatis lengkap dengan kunci jawaban, kisi-kisi dinas, rekap absensi, dan modul raport terintegrasi.
        </p>

        <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-kurikulum-k13 to-teal-700 px-7 py-3.5 text-base font-bold text-on-primary shadow-md transition-all hover:scale-[1.02] hover:from-teal-700 hover:to-teal-800 hover:shadow-lg sm:w-auto"
          >
            <Icon name="rocket_launch" className="text-[22px]" />
            <span>Coba Gratis 50 Kredit AI</span>
          </Link>
          <a
            href="#preview-template"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-card px-6 py-3.5 text-base font-semibold text-on-surface shadow-2xs transition-colors hover:bg-surface-paper sm:w-auto"
          >
            <Icon name="description" className="text-[22px] text-kurikulum-merdeka" />
            <span>Lihat Contoh Dokumen Word/PDF</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-on-surface-variant sm:text-sm">
          {TRUST_BADGES.map((badge) => (
            <span key={badge.label} className="inline-flex items-center gap-1.5">
              <Icon name={badge.icon} className="text-[18px] text-state-success" />
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      <DemoSimulator />
    </section>
  );
}
