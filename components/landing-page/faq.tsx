import { Icon } from "./icon";

const FAQS = [
  {
    q: "Apakah soal yang dibuat sesuai dengan Kurikulum Merdeka & BSKAP terbaru?",
    a: "Ya, seluruh basis data materi dan generator telah diselaraskan dengan Keputusan BSKAP Kemendikdasmen No. 032/H/KR/2024 tentang Capaian Pembelajaran Fase A hingga F. Platform juga tetap mendukung silabus K13 (Kompetensi Inti & Dasar) untuk sekolah masa transisi.",
  },
  {
    q: "Apakah hasil unduhan Word (.DOCX) bisa diedit lagi di Microsoft Word / WPS?",
    a: "100% bisa diedit! File diekspor dalam format resmi .DOCX standar Office XML tanpa proteksi password. Bapak/Ibu guru dapat mengubah teks, mengganti logo sekolah, menyesuaikan nomor lembar, atau menyisipkan gambar lokal sebelum mencetak.",
  },
  {
    q: "Bagaimana keamanan data nilai murid yang kami unggah?",
    a: "Keamanan data pendidik dan siswa adalah prioritas mutlak kami. Seluruh file nilai dan daftar absensi dienkripsi end-to-end (AES-256) dan tidak pernah digunakan untuk melatih model AI umum demi menjaga privasi UU Perlindungan Data Pribadi (PDP).",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia? Apakah mendukung dana BOS?",
    a: "Kami menerima pembayaran instan via QRIS (GoPay, OVO, ShopeePay, DANA), Transfer Virtual Account semua Bank Nasional, serta SPJ BOS resmi dengan Faktur Pajak & kwitansi berstempel untuk paket langganan kolektif sekolah.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-[900px] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mb-12 text-center">
        <span className="rounded-full bg-surface-container-low px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-on-surface">
          Pertanyaan Umum
        </span>
        <h2 className="mt-3 font-headline-lg text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl">
          Hal yang Kerap Ditanyakan Bapak/Ibu Guru
        </h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-border-subtle bg-surface-card p-5 shadow-2xs transition-colors open:border-kurikulum-k13"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-on-surface sm:text-base">
              <span>{item.q}</span>
              <Icon
                name="expand_more"
                className="text-faint transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 border-t border-border-subtle pt-3 text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
