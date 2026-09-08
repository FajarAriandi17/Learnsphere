import { Icon } from "./icon";

const OLD_WAY = [
  {
    strong: "Mencari & menyusun butir soal:",
    text: "Buka puluhan buku teks dan browsing PDF lama tanpa standardisasi kognitif yang jelas.",
  },
  {
    strong: "Ketik tabel kisi-kisi manual:",
    text: "Harus menyalin manual Capaian Pembelajaran, nomor soal, dan rubrik satu per satu ke Word.",
  },
  {
    strong: "Format Word sering berantakan:",
    text: "Spasi tabel bergeser, kop sekolah melenceng saat dicetak di mesin fotokopi sekolah.",
  },
  {
    strong: "Input nilai raport begadang:",
    text: "Menghitung rata-rata dan mengetik kalimat narasi capaian 30+ siswa sampai tengah malam.",
  },
];

const NEW_WAY = [
  {
    strong: "AI Generator Cerdas HOTS/LOTS:",
    text: "Soal otomatis disesuaikan dengan Capaian Pembelajaran BSKAP terbaru lengkap opsi dan kunci.",
  },
  {
    strong: "Kisi-kisi & Kartu Soal Otomatis:",
    text: "Tabel telaah standar pengawas dinas langsung terbuat bersama naskah ujian.",
  },
  {
    strong: "Format A4 Siap Fotokopi:",
    text: "Dokumen terstruktur presisi, rapi di Microsoft Word (.DOCX) dan PDF lengkap kop sekolah Anda.",
  },
  {
    strong: "Otomatisasi Raport & Absensi:",
    text: "Unggah file excel nilai mentah, AI merangkum predikat deskriptif tiap siswa secara instan.",
  },
];

export function ProblemSolution() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <span className="rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-700">
          Transformasi Waktu Mengajar
        </span>
        <h2 className="mt-3 font-headline-lg text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
          Hentikan Lembur Menyusun Administrasi Manual
        </h2>
        <p className="mt-2 font-body-lg text-sm text-on-surface-variant sm:text-base">
          Lihat perbedaan nyata bagaimana Learnsphere mengembalikan ratusan jam
          kerja Anda setiap semester.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Cara lama manual */}
        <div className="relative rounded-2xl p-6 shadow-sm sm:p-8 bg-gradient-to-r from-kurikulum-k13 via-teal-700 to-sky-800 text-on-primary">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-card/20 font-bold text-on-primary">
              <Icon name="cancel" className="text-[24px]" />
            </div>
            <div>
              <h3 className="font-headline-md text-lg font-bold text-on-primary">
                Cara Lama: Serba Manual
              </h3>
              <p className="text-xs font-semibold text-teal-100">
                Menghabiskan 3–5 jam per set asesmen
              </p>
            </div>
          </div>
          <ul className="space-y-4 text-sm text-on-primary/90">
            {OLD_WAY.map((item) => (
              <li key={item.strong} className="flex items-start gap-3">
                <Icon name="close" className="mt-0.5 shrink-0 text-[20px] text-teal-200" />
                <span>
                  <strong>{item.strong}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dengan Learnsphere */}
        <div className="relative rounded-2xl p-6 shadow-sm sm:p-8 bg-gradient-to-r from-kurikulum-k13 via-teal-700 to-sky-800 text-on-primary">
          <div className="absolute -top-3.5 right-6 rounded-full bg-surface-card px-3 py-1 text-xs font-bold text-teal-900 shadow-2xs">
            Efisiensi 10x Lipat
          </div>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-card/20 font-bold text-on-primary shadow-2xs">
              <Icon name="check_circle" className="text-[24px]" />
            </div>
            <div>
              <h3 className="font-headline-md text-lg font-bold text-on-primary">
                Dengan Learnsphere
              </h3>
              <p className="text-xs font-bold text-teal-100">
                Tuntas hanya dalam 3 menit siap pakai
              </p>
            </div>
          </div>
          <ul className="space-y-4 text-sm text-on-primary/90">
            {NEW_WAY.map((item) => (
              <li key={item.strong} className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 shrink-0 text-[20px] text-teal-200" />
                <span>
                  <strong>{item.strong}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
