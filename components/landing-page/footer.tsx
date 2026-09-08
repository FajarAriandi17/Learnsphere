import { Brand } from "./header";
import { Icon } from "./icon";

const PRODUK = [
  { label: "Generator Soal HOTS", href: "#solusi-guru" },
  { label: "Tabel Kisi-Kisi & Kartu Soal", href: "#demo-simulator" },
  { label: "Auto Input Raport Excel", href: "#demo-simulator" },
  { label: "Absensi & Rekap Dapodik", href: "#demo-simulator" },
  { label: "Paket Langganan Guru", href: "#harga" },
];

const SUMBER_DAYA = [
  { label: "Panduan BSKAP Fase A–F", href: "#kurikulum-sync" },
  { label: "Contoh Template Word A4", href: "#preview-template" },
  { label: "Pusat Bantuan & Tutorial", href: "#faq" },
  { label: "Komunitas Guru Penggerak", href: "#faq" },
  { label: "Proposal Kerjasama Sekolah", href: "#harga" },
];

const BRAND_TAGS = [
  { label: "Kurikulum Merdeka", className: "text-teal-400" },
  { label: "K13 Kompatibel", className: "text-sky-400" },
  { label: "Standar BSKAP", className: "text-amber-400" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle bg-[#081320] text-faint">
      <div className="mx-auto max-w-[1280px] px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-border-subtle pb-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="flex flex-col gap-4 pr-4 lg:col-span-2">
            <Brand inverted />
            <p className="max-w-sm text-xs leading-relaxed text-faint sm:text-sm">
              Platform AI asisten administrasi guru dan lembaga pendidikan
              Indonesia. Membantu penyusunan soal ujian berstandar HOTS, kisi-kisi
              otomatis, absensi cepat, dan raport kurikulum resmi siap cetak.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {BRAND_TAGS.map((tag) => (
                <span
                  key={tag.label}
                  className={`rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold ${tag.className}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* Produk */}
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <span className="mb-1 text-sm font-bold uppercase tracking-wider text-on-primary">
              Produk
            </span>
            {PRODUK.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-faint transition-colors hover:text-on-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Sumber Daya */}
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <span className="mb-1 text-sm font-bold uppercase tracking-wider text-on-primary">
              Sumber Daya
            </span>
            {SUMBER_DAYA.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-faint transition-colors hover:text-on-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hubungi Kami */}
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <span className="mb-1 text-sm font-bold uppercase tracking-wider text-on-primary">
              Hubungi Kami
            </span>
            <p className="leading-relaxed text-faint">
              Menara Edukasi Nusantara Lt. 8
              <br />
              Jakarta Selatan, DKI Jakarta 12190
            </p>
            <p className="text-faint">Email: halo@learnsphere.ai</p>
            <p className="font-semibold text-teal-400">
              WhatsApp Guru: +62 812-3456-7890
            </p>
          </div>
        </div>

        {/* Compliance disclaimer */}
        <div className="my-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-faint">
          <Icon
            name="verified_user"
            className="mt-0.5 shrink-0 text-[20px] text-amber-400"
          />
          <p className="leading-relaxed">
            <strong className="text-faint">
              Perlindungan Data &amp; Kepatuhan Nasional:
            </strong>{" "}
            Seluruh data sekolah, identitas pengajar, dan hasil asesmen peserta
            didik disimpan dalam server lokal terenkripsi di Indonesia sesuai UU
            Pelindungan Data Pribadi (PDP) No. 27 Tahun 2022.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-4 text-xs text-faint md:flex-row">
          <p>
            © 2026 Learnsphere (PT Edukasi Cerdas Nusantara). Hak Cipta Dilindungi
            Undang-Undang.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-faint">
              Kebijakan Privasi
            </a>
            <span>•</span>
            <a href="#" className="transition-colors hover:text-faint">
              Syarat &amp; Ketentuan Layanan
            </a>
            <span>•</span>
            <a href="#" className="transition-colors hover:text-faint">
              Pernyataan Etika AI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
