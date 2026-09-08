import { Icon } from "./icon";

export function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-r from-kurikulum-k13 via-teal-700 to-sky-800 p-8 text-center text-on-primary shadow-xl sm:p-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-surface-card/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-teal-400/20 blur-2xl" />

        <span className="mb-4 rounded-full bg-surface-card/20 px-4 py-1 text-xs font-bold backdrop-blur-sm">
          Bergabung Bersama 12.500+ Guru se-Indonesia
        </span>
        <h2 className="mb-4 max-w-2xl font-display-hero text-2xl font-extrabold tracking-tight sm:text-4xl">
          Siap Menghemat Waktu Administrasi Mengajar Hari Ini?
        </h2>
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-on-surface-variant sm:text-base">
          Daftar sekarang dan nikmati 50 token gratis. Coba susun kisi-kisi dan
          naskah soal ujian pertama Anda dalam 3 menit.
        </p>
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#daftar"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface-card px-8 py-3.5 text-sm font-bold text-teal-900 shadow-lg transition-transform hover:scale-105 hover:bg-surface-container-low sm:w-auto sm:text-base"
          >
            <Icon name="rocket_launch" className="text-[20px] text-kurikulum-k13" />
            <span>Daftar Cepat (Hanya 30 Detik)</span>
          </a>
          <a
            href="#demo-simulator"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle/20 bg-surface-card/15 px-6 py-3.5 text-sm font-semibold text-on-primary backdrop-blur-sm transition-colors hover:bg-surface-card/25 sm:w-auto sm:text-base"
          >
            <Icon name="play_circle" className="text-[20px]" />
            <span>Lihat Simulator Interaktif</span>
          </a>
        </div>
        <p className="mt-5 text-[11px] text-teal-200">
          ✓ Langsung aktif • Tanpa kartu kredit • Aman terlindungi enkripsi
          256-bit
        </p>
      </div>
    </section>
  );
}
