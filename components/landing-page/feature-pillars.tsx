import { Icon } from "./icon";

const FEATURES = [
  {
    icon: "psychology",
    iconWrap: "bg-primary-soft text-kurikulum-k13 border-primary-soft",
    title: "1. AI Exam & Soal Generator",
    desc: "Mendukung pilihan ganda, esai analitis, stimulus wacana AKM numerasi/literasi, serta pengelompokan tingkat kesukaran LOTS, MOTS, dan HOTS.",
    metaLabel: "Tipe Soal:",
    metaValue: "PG, Esai, HOTS, Benar/Salah",
    metaClass: "text-kurikulum-k13",
  },
  {
    icon: "assignment",
    iconWrap: "bg-secondary-fixed text-kurikulum-merdeka border-sky-100",
    title: "2. Kisi-Kisi & Kartu Soal Otomatis",
    desc: "Hasilkan tabel matriks kisi-kisi dan kartu telaah butir soal berstandar pengawas sekolah dan dinas pendidikan secara simultan.",
    metaLabel: "Kepatuhan:",
    metaValue: "Standar BSKAP & BSNP",
    metaClass: "text-kurikulum-merdeka",
  },
  {
    icon: "table_view",
    iconWrap: "bg-amber-50 text-amber-700 border-amber-100",
    title: "3. Auto Input Raport & Konversi Excel",
    desc: "Import nilai mentah format .xlsx atau .csv. Sistem langsung mengkalkulasi bobot nilai akhir dan menghasilkan deskripsi narasi kompetensi tiap murid.",
    metaLabel: "Format Output:",
    metaValue: "Sinkron Buku Raport",
    metaClass: "text-amber-700",
  },
  {
    icon: "fact_check",
    iconWrap: "bg-primary-tint text-emerald-700 border-emerald-100",
    title: "4. Presensi & Absensi Siswa 1-Klik",
    desc: "Catat presensi harian Hadir, Sakit, Izin, Alpha secara cepat dari smartphone atau laptop. Rekap bulanan otomatis dihitung persentase kehadirannya.",
    metaLabel: "Rekap:",
    metaValue: "Dapodik Compatible",
    metaClass: "text-emerald-700",
  },
  {
    icon: "workspace_premium",
    iconWrap: "bg-purple-50 text-purple-700 border-purple-100",
    title: "5. Portofolio & Asesmen Diagnostik",
    desc: "Pencatatan rekam jejak minat, bakat kognitif awal, serta dokumentasi capaian dimensi Profil Pelajar Pancasila untuk wali kelas dan guru BK.",
    metaLabel: "Dimensi P5:",
    metaValue: "Integrated Assessment",
    metaClass: "text-purple-700",
  },
  {
    icon: "print",
    iconWrap: "bg-primary-soft text-kurikulum-k13 border-primary-soft",
    title: "6. Ekspor Fleksibel DOCX, PDF & XLSX",
    desc: "Dokumen hasil generate siap dicetak dengan layout A4 standar, kop resmi instansi sekolah, dan kolom tanda tangan pengawas serta kepala sekolah.",
    metaLabel: "Penyuntingan:",
    metaValue: "100% Editable DOCX",
    metaClass: "text-kurikulum-k13",
  },
];

export function FeaturePillars() {
  return (
    <section
      id="fitur-utama"
      className="w-full border-t border-border-subtle bg-surface-paper px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-teal-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-kurikulum-k13">
            Fitur Unggulan Terpadu
          </span>
          <h2 className="mt-3 font-headline-lg text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
            6 Pilar Solusi Guru untuk Pembelajaran Efektif
          </h2>
          <p className="mt-2 font-body-lg text-sm text-on-surface-variant sm:text-base">
            Dirancang spesifik mengikuti kebutuhan pendidik Indonesia dari fase
            asesmen formatif hingga pelaporan semester.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-2xs transition-shadow hover:shadow-md"
            >
              <div>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${f.iconWrap}`}
                >
                  <Icon name={f.icon} className="text-[28px]" />
                </div>
                <h3 className="mb-2 font-headline-sm text-base font-bold text-on-surface">
                  {f.title}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                  {f.desc}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-xs">
                <span className="text-faint">{f.metaLabel}</span>
                <span className={`font-bold ${f.metaClass}`}>{f.metaValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
