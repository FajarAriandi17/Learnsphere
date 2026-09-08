import { Icon } from "./icon";

const TABS = [
  { icon: "quiz", label: "1. Generator Soal HOTS & Sumatif", active: true },
  { icon: "assignment_turned_in", label: "2. Auto Kisi-Kisi & Indikator" },
  { icon: "table_chart", label: "3. Generator Raport Excel" },
  { icon: "event_available", label: "4. Absensi 1-Klik Rekap" },
];

const CHOICES = [
  {
    key: "A",
    text: "Ventrikel kiri mengalami penurunan curah jantung akibat hipoksia seluler.",
  },
  {
    key: "B",
    text: "Terjadi vasodilatasi pembuluh darah perifer untuk menurunkan pengantaran oksigen ke otot rangka.",
  },
  {
    key: "C",
    text: "Ventrikel kiri berkontraksi lebih kuat meningkatkan curah jantung demi memenuhi kebutuhan ATP otot aktif.",
    correct: true,
  },
  {
    key: "D",
    text: "Katup trikuspidalis menutup permanen sehingga menghambat kembalinya darah dari vena cava superior.",
  },
];

export function DemoSimulator() {
  return (
    <div
      id="demo-simulator"
      className="w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-xl"
    >
      {/* Window chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-on-surface px-5 py-3.5 text-faint">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500" />
          <span className="h-3 w-3 rounded-full bg-credit-amber" />
          <span className="h-3 w-3 rounded-full bg-primary-tint0" />
          <span className="ml-2 flex items-center gap-1.5 text-xs font-semibold text-faint sm:text-sm">
            <Icon name="smart_toy" className="text-[16px] text-kurikulum-k13" />
            Simulator Studio Learnsphere v3.4 — Siap Ujian Sumatif Semester Genap 2026
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 rounded-full bg-primary-tint0/20 px-2.5 py-1 font-semibold text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Mesin AI Edu-BSKAP Aktif
          </span>
          <span className="rounded-md bg-on-surface-variant px-2.5 py-1 font-exam-mono text-faint">
            Token: 50/50
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-border-subtle bg-surface-paper px-4 py-2.5 sm:px-6">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={
              tab.active
                ? "flex shrink-0 items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-card px-3.5 py-1.5 text-xs font-bold text-kurikulum-k13 shadow-2xs sm:text-sm"
                : "flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface sm:text-sm"
            }
          >
            <Icon name={tab.icon} className="text-[18px]" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dual-pane body */}
      <div className="grid grid-cols-1 gap-6 bg-surface-paper/50 p-4 sm:p-6 lg:grid-cols-12 lg:p-8">
        {/* Left configuration panel */}
        <div className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-surface-card p-5 shadow-2xs lg:col-span-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <h4 className="flex items-center gap-1.5 text-sm font-bold text-on-surface">
              <Icon name="tune" className="text-[20px] text-kurikulum-k13" />
              Parameter Ujian / Asesmen
            </h4>
            <span className="rounded bg-secondary-fixed px-2 py-0.5 text-[11px] font-bold text-kurikulum-merdeka">
              Fase D (SMP)
            </span>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
              Mata Pelajaran &amp; Jenjang
            </label>
            <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-surface-paper p-2.5 text-xs font-semibold text-on-surface">
              <span>Ilmu Pengetahuan Alam (IPA) • Kelas 8</span>
              <Icon name="expand_more" className="text-[16px] text-faint" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
              Materi / Bab Pembelajaran
            </label>
            <div className="rounded-lg border border-border-subtle bg-surface-paper p-2.5 text-xs font-semibold text-on-surface">
              Sistem Peredaran Darah Manusia &amp; Tekanan Zat
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                Tingkat Kognitif
              </label>
              <div className="flex items-center gap-1 rounded-lg border border-indigo-100 bg-indigo-50 p-2 text-xs font-bold text-indigo-700">
                <Icon name="psychology" className="text-[16px]" /> HOTS (C4 Analisis)
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                Bentuk Soal
              </label>
              <div className="rounded-lg border border-border-subtle bg-surface-paper p-2 text-xs font-semibold text-on-surface">
                Pilihan Ganda + Stimulus
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-primary-soft bg-primary-soft/70 p-3 text-xs text-on-surface-variant">
            <span className="mb-1 block font-bold text-kurikulum-k13">
              Target Capaian Pembelajaran (CP):
            </span>
            Peserta didik mampu menganalisis keterkaitan struktur jaringan organ
            peredaran darah serta memecahkan problem hemostasis kontekstual.
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-kurikulum-k13 px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm transition-colors hover:bg-kurikulum-k13-dark sm:text-sm"
          >
            <Icon name="auto_fix_high" className="text-[18px]" />
            <span>Regenerate Soal (1 Kredit)</span>
          </button>
        </div>

        {/* Right preview document pane (A4 exam layout) */}
        <div className="flex flex-col justify-between rounded-xl border border-border-subtle bg-surface-card p-5 shadow-sm sm:p-7 lg:col-span-8">
          {/* Simulated official school exam header */}
          <div className="mb-5 border-b-2 border-border-subtle pb-3">
            <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-faint">
              <span>PEMERINTAH KABUPATEN BOGOR • DINAS PENDIDIKAN</span>
              <span>TAHUN AJARAN 2025/2026</span>
            </div>
            <div className="text-center text-sm font-extrabold uppercase tracking-wide text-on-surface sm:text-base">
              Naskah Asesmen Sumatif Akhir Semester (SAS) — Ilmu Pengetahuan Alam
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle pt-2 text-xs text-on-surface-variant">
              <span>Nama Siswa: ______________________</span>
              <span>Kelas: VIII (Delapan)</span>
              <span>Waktu: 90 Menit</span>
            </div>
          </div>

          {/* Live generated question box */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kurikulum-k13 text-xs font-bold text-on-primary">
                1
              </span>
              <div className="flex-1 text-sm leading-relaxed text-on-surface">
                <p className="mb-2 font-semibold text-on-surface">
                  <span className="mr-1 rounded border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                    Stimulus Kasus Medis
                  </span>
                  Hasil uji laboratorium seorang atlet lari maraton setelah
                  menyelesaikan rute 42 km menunjukkan tekanan darah{" "}
                  <span className="font-exam-mono font-semibold">145/95 mmHg</span>{" "}
                  dengan frekuensi denyut nadi 115 kali per menit. Berdasarkan
                  prinsip hukum kontinuitas aliran darah dan kerja otot ventrikel
                  kiri jantung, kesimpulan fisiologis yang paling tepat adalah...
                </p>

                {/* Choice options */}
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CHOICES.map((choice) => (
                    <div
                      key={choice.key}
                      className={
                        choice.correct
                          ? "relative rounded-lg border-2 border-state-success bg-primary-tint p-2.5 text-xs font-medium text-on-surface"
                          : "rounded-lg border border-border-subtle bg-surface-paper p-2.5 text-xs text-on-surface-variant hover:border-border-subtle"
                      }
                    >
                      <strong>{choice.key}.</strong> {choice.text}
                      {choice.correct && (
                        <span className="absolute -right-2 -top-2 rounded-full bg-state-success px-1.5 py-0.5 text-[9px] font-bold text-on-primary shadow-2xs">
                          Kunci Benar (C)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pedagogic explanation box for teacher */}
            <div className="mt-2 rounded-lg border border-primary-soft bg-primary-soft/80 p-3.5 text-xs text-on-surface">
              <div className="mb-1 flex items-center gap-1.5 font-bold text-kurikulum-k13">
                <Icon name="menu_book" className="text-[18px]" />
                <span>Pedoman Penskoran &amp; Pembahasan Pedagogik Guru:</span>
              </div>
              <p className="leading-relaxed text-on-surface-variant">
                <strong>Indikator Kognitif C4 (Menganalisis):</strong> Saat
                berolahraga intensitas tinggi, otot rangka membutuhkan pasokan
                oksigen dan glukosa lebih banyak untuk respirasi seluler. Jantung
                beradaptasi dengan meningkatkan frekuensi denyut dan volume
                sekuncup (<em>stroke volume</em>) melalui kontraksi ventrikel kiri
                yang lebih bertenaga. Skor maksimum: <strong>4 poin</strong>.
              </p>
            </div>
          </div>

          {/* Action toolbar on document bottom */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
            <div className="flex items-center gap-2 text-xs font-medium text-faint">
              <Icon name="check_circle" className="text-[18px] text-faint" />
              Telah lolos verifikasi format kisi-kisi Kemendikdasmen
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-1.5 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container"
              >
                <Icon name="edit" className="text-[16px]" /> Edit Butir Soal
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary-fixed px-3 py-1.5 text-xs font-semibold text-kurikulum-merdeka transition-colors hover:bg-secondary-fixed"
              >
                <Icon name="picture_as_pdf" className="text-[16px]" /> PDF A4
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-kurikulum-k13 px-3.5 py-1.5 text-xs font-bold text-on-primary shadow-2xs transition-colors hover:bg-kurikulum-k13-dark"
              >
                <Icon name="download" className="text-[16px]" /> Export DOCX Kop
                Resmi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
