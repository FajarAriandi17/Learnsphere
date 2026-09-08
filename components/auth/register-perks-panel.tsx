import { Icon } from "@/components/ui/icon";

/**
 * Right column of the registration screen: three stacked trust cards that make
 * the free tier feel concrete (what you get, that it's compliant, that a real
 * teacher vouches for it). Pure presentation, so this stays a server component.
 */

const WELCOME_FEATURES = [
  {
    title: "50 Token AI Langsung Aktif",
    desc: "Cukup untuk ~10 paket soal lengkap plus kisi-kisi tanpa biaya.",
  },
  {
    title: "Generator Soal Multi-Format",
    desc: "Pilihan ganda, esai HOTS, hingga AKM literasi & numerasi terstandar.",
  },
  {
    title: "Ekspor DOCX Kop Sekolah & PDF A4",
    desc: "Naskah siap cetak dengan kop resmi, tanpa merapikan format manual.",
  },
  {
    title: "Otomatisasi Raport & Presensi",
    desc: "Deskripsi capaian dan rekap kehadiran tersusun otomatis.",
  },
];

const COMPLIANCE_TAGS = ["ISO/IEC 27001", "UU PDP Terverifikasi", "Server Domestik RI"];

export function RegisterPerksPanel() {
  return (
    <aside className="flex flex-col gap-4 lg:col-span-5">
      {/* Card 1 — welcome pack */}
      <div className="rounded-xl bg-surface-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon name="stars" className="text-[24px] text-primary" />
          </span>
          <span className="inline-flex items-center rounded-full bg-surface-container px-2.5 py-1 font-label-sm text-label-sm font-semibold text-primary">
            Gratis Selamanya • Tanpa Kartu Kredit
          </span>
        </div>
        <h2 className="font-headline-md text-headline-md tracking-tight text-on-surface">
          Paket Sambutan Pendidik Baru
        </h2>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Semua yang dibutuhkan untuk memangkas jam kerja administratif sejak hari pertama.
        </p>

        <ul className="mt-4 flex flex-col gap-3">
          {WELCOME_FEATURES.map((f) => (
            <li key={f.title} className="flex items-start gap-2.5">
              <Icon name="check_circle" className="mt-px text-[20px] text-state-success" />
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface">{f.title}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Efficiency panel */}
        <div className="mt-5 rounded-lg bg-surface-paper p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Efisiensi Beban Administrasi Guru
            </span>
            <span className="font-label-md text-label-md font-semibold text-primary">
              Hemat 85% Jam Kerja
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full rounded-full bg-primary" style={{ width: "88%" }} />
          </div>
          <div className="mt-2 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span>Sebelum: 8-12 Jam / Paket</span>
            <span className="font-semibold text-on-surface">Learnsphere: 15-20 Menit Selesai</span>
          </div>
        </div>
      </div>

      {/* Card 2 — compliance & privacy */}
      <div className="rounded-xl bg-surface-card p-4 shadow-sm sm:p-6">
        <div className="mb-2 flex items-center gap-2">
          <Icon name="policy" className="text-[22px] text-primary" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Kepatuhan Regulasi &amp; Privasi Siswa
          </h2>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Data guru dan siswa dilindungi melalui <strong className="font-semibold text-on-surface">Row Level Security (RLS)</strong>,
          standar ISO 27001, serta patuh penuh pada{" "}
          <strong className="font-semibold text-on-surface">UU Perlindungan Data Pribadi (PDP No. 27/2022)</strong>.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {COMPLIANCE_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded bg-surface-container px-2 py-1 font-label-sm text-label-sm text-on-surface-variant"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card 3 — testimonial */}
      <div className="rounded-xl bg-surface-card p-6 shadow-sm">
        <div className="mb-2 flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" filled className="text-[18px] text-credit-amber" />
          ))}
          <span className="ml-1 font-label-md text-label-md font-semibold text-on-surface">
            5.0 / 5.0
          </span>
        </div>
        <p className="font-body-md text-body-md italic text-on-surface">
          &ldquo;Membuat kisi-kisi dan 40 butir soal SAS Matematika biasanya butuh 2 hari
          lembur. Dengan Learnsphere, drafnya jadi dalam hitungan menit dan tinggal saya telaah.&rdquo;
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-headline-sm text-headline-sm font-semibold text-on-primary">
            AF
          </span>
          <div>
            <p className="font-headline-sm text-headline-sm text-on-surface">Ahmad Fauzan, S.Pd.</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Guru Matematika SMPN 1 Cibinong • Fasilitator Pembelajaran
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
