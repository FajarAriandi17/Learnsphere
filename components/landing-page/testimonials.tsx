import { Icon } from "./icon";

const TESTIMONIALS = [
  {
    initials: "SW",
    avatarClass: "bg-gradient-to-br from-teal-500 to-emerald-600 border-teal-400",
    quote:
      "Mengampu 5 kelas paralel matematika sebelumnya membuat saya begadang setiap musim asesmen semester. Dengan Learnsphere, kisi-kisi dan naskah soal Word siap cetak cuma butuh 15 menit. Saya punya waktu lebih untuk membimbing siswa yang perlu remedial!",
    name: "Ibu Sri Wahyuni, S.Pd.",
    role: "Guru Matematika SMP Negeri, Kab. Bogor",
    roleClass: "text-kurikulum-k13",
    note: "Pengguna Aktif Modul Kurikulum Merdeka & Raport",
  },
  {
    initials: "AF",
    avatarClass: "bg-gradient-to-br from-sky-600 to-indigo-700 border-sky-400",
    quote:
      "Soal kejuruan teknik dan studi kasus HOTS yang dihasilkan sangat masuk akal dan relevan dengan industri. Fitur rekap nilai ke format Excel raport membuat pengisian e-Rapor sekolah kami selesai 2 hari lebih cepat sebelum batas akhir.",
    name: "Pak Ahmad Fauzi, S.Pd.",
    role: "Ketua MGMP Teknik Komputer & Informatika SMK, Surabaya",
    roleClass: "text-kurikulum-merdeka",
    note: "Pelanggan Learnsphere Pro & Multi-Rombel",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimoni"
      className="w-full border-y border-border-subtle bg-surface-paper px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            Suara Guru Indonesia
          </span>
          <h2 className="mt-3 font-headline-lg text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
            Pengalaman Nyata Mengajar Tanpa Stres Administrasi
          </h2>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col items-center gap-6 rounded-3xl border border-border-subtle bg-surface-card p-6 shadow-sm sm:flex-row sm:items-start sm:p-8"
            >
              <div
                className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-2 font-display-hero text-3xl font-extrabold text-on-primary shadow-md sm:h-36 sm:w-36 ${t.avatarClass}`}
              >
                {t.initials}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" filled className="text-[18px]" />
                    ))}
                  </div>
                  <p className="mb-4 text-xs italic leading-relaxed text-on-surface-variant sm:text-sm">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div>
                  <div className="text-sm font-bold text-on-surface">{t.name}</div>
                  <div className={`text-xs font-semibold ${t.roleClass}`}>
                    {t.role}
                  </div>
                  <div className="text-[11px] text-faint">{t.note}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
