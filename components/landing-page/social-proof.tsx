const METRICS = [
  {
    value: "12.500+",
    valueClass: "text-kurikulum-k13",
    label: "Guru Aktif Terdaftar",
    sub: "38 Provinsi Sabang–Merauke",
  },
  {
    value: "450.000+",
    valueClass: "text-kurikulum-merdeka",
    label: "Butir Soal Terbuat",
    sub: "Lolos verifikasi kisi-kisi dinas",
  },
  {
    value: "98%",
    valueClass: "text-credit-amber",
    label: "Bebas Lembur Administrasi",
    sub: "Survei kepuasan pendidik 2025",
  },
  {
    value: "1.200+",
    valueClass: "text-on-surface",
    label: "Sekolah & Komunitas",
    sub: "Negeri, Swasta, Madrasah & PKBM",
  },
];

const JENJANG = [
  { dot: "bg-primary-soft0", label: "SD / MI Sederajat" },
  { dot: "bg-secondary-fixed0", label: "SMP / MTs Sederajat" },
  { dot: "bg-indigo-500", label: "SMA / MA Umum" },
  { dot: "bg-amber-500", label: "SMK Pusat Keunggulan Vokasi" },
  { dot: "bg-rose-500", label: "SLB & Inklusi Belajar" },
  { dot: "bg-purple-500", label: "Forum MGMP & KKG Guru" },
];

export function SocialProof() {
  return (
    <section className="w-full border-y border-border-subtle bg-surface-paper px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-wider text-faint sm:text-sm">
          Dipercaya oleh ribuan satuan pendidikan dan komunitas guru aktif di
          seluruh Indonesia
        </p>

        {/* Counter metrics grid */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-border-subtle bg-surface-card p-5 text-center shadow-2xs"
            >
              <div
                className={`mb-1 font-display-hero text-3xl font-extrabold sm:text-4xl ${m.valueClass}`}
              >
                {m.value}
              </div>
              <div className="text-sm font-bold text-on-surface">{m.label}</div>
              <div className="mt-0.5 text-xs text-faint">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Jenjang & komunitas pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-on-surface-variant sm:gap-4">
          {JENJANG.map((j) => (
            <span
              key={j.label}
              className="flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-card px-3 py-1.5 shadow-2xs"
            >
              <span className={`h-2 w-2 rounded-full ${j.dot}`} /> {j.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
