import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

type Feature = {
  icon: string;
  iconClass?: string;
  lead?: string;
  text?: string;
  rowClass?: string;
};

type Tier = {
  title: string;
  badge?: string;
  sub: string;
  price: string;
  priceClass: string;
  per: string;
  cardClass: string;
  featListClass: string;
  btnClass: string;
  btnText: string;
  href: string;
  popular?: boolean;
  features: Feature[];
};

const TIERS: Tier[] = [
  {
    title: "Uji Coba Gratis",
    sub: "Coba langsung tanpa komitmen.",
    price: "Rp 0",
    priceClass: "text-on-surface",
    per: "/ selamanya",
    cardClass: "border border-border-subtle shadow-2xs",
    featListClass: "text-on-surface-variant",
    btnClass: "bg-surface-container-low hover:bg-surface-container text-on-surface",
    btnText: "Coba Gratis Sekarang",
    href: "/register",
    features: [
      { icon: "check", iconClass: "text-state-success", lead: "50 Kredit AI", text: " pertama" },
      { icon: "check", iconClass: "text-state-success", text: "5 set generator soal/bulan" },
      { icon: "check", iconClass: "text-state-success", text: "Format template standar" },
      { icon: "close", iconClass: "text-faint", text: "Export PDF dengan watermark", rowClass: "text-faint" },
    ],
  },
  {
    title: "Guru Basic",
    sub: "Cukup seharga secangkir kopi sebulan.",
    price: "Rp 29.000",
    priceClass: "text-kurikulum-k13",
    per: "/ bulan",
    cardClass: "border-2 border-kurikulum-k13 shadow-md lg:-translate-y-1",
    featListClass: "text-on-surface-variant",
    btnClass: "bg-kurikulum-k13 hover:bg-kurikulum-k13-dark text-on-primary shadow-sm",
    btnText: "Pilih Guru Basic",
    href: "/register",
    popular: true,
    features: [
      { icon: "check_circle", iconClass: "text-kurikulum-k13", lead: "300 Kredit AI", text: " per bulan", rowClass: "font-semibold" },
      { icon: "check_circle", iconClass: "text-kurikulum-k13", text: "Bank Soal tanpa batas" },
      { icon: "check_circle", iconClass: "text-kurikulum-k13", text: "Kunci & pembahasan lengkap" },
      { icon: "check_circle", lead: "Export DOCX Tanpa Watermark", rowClass: "font-semibold text-kurikulum-k13" },
      { icon: "check_circle", iconClass: "text-kurikulum-k13", text: "Absensi siswa 3 kelas" },
    ],
  },
  {
    title: "Guru Pro",
    badge: "Lengkap",
    sub: "Wali kelas & guru multi-rombel.",
    price: "Rp 79.000",
    priceClass: "text-on-surface",
    per: "/ bulan",
    cardClass: "border border-border-subtle shadow-2xs",
    featListClass: "text-on-surface-variant",
    btnClass: "bg-on-surface hover:bg-on-surface-variant text-surface",
    btnText: "Pilih Guru Pro",
    href: "/register",
    features: [
      { icon: "check_circle", iconClass: "text-state-success", lead: "AI Kredit Fleksibel (1.200)", rowClass: "font-semibold" },
      { icon: "check_circle", lead: "Generator Raport Excel", rowClass: "font-semibold text-state-success" },
      { icon: "check_circle", iconClass: "text-state-success", text: "Prioritas penalaran HOTS C4–C6" },
      { icon: "check_circle", iconClass: "text-state-success", text: "Multi-kelas & portofolio siswa" },
      { icon: "check_circle", iconClass: "text-state-success", text: "Dukungan WhatsApp Prioritas" },
    ],
  },
  {
    title: "Sekolah / Dinas",
    sub: "Grosir sekolah, MGMP, & KKG.",
    price: "Kustom",
    priceClass: "text-on-surface",
    per: "/ instansi",
    cardClass: "border border-border-subtle shadow-2xs",
    featListClass: "text-on-surface-variant",
    btnClass: "bg-secondary-fixed hover:bg-secondary-fixed text-kurikulum-merdeka",
    btnText: "Hubungi Tim Kemitraan",
    href: "#kontak",
    features: [
      { icon: "check", iconClass: "text-kurikulum-merdeka", text: "Akses seluruh dewan guru" },
      { icon: "check", iconClass: "text-kurikulum-merdeka", text: "Kop & tanda tangan terpusat" },
      { icon: "check", iconClass: "text-kurikulum-merdeka", text: "Bank Soal internal sekolah" },
      { icon: "check", iconClass: "text-kurikulum-merdeka", text: "Faktur Pajak & SPJ BOS resmi" },
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="harga"
      className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="rounded-full bg-credit-amber-tint px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-credit-amber">
          Biaya Langganan Transparan
        </span>
        <h2 className="mt-3 font-headline-lg text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
          Investasi Terjangkau untuk Ketenangan Mengajar Anda
        </h2>
        <p className="mt-2 font-body-lg text-sm text-on-surface-variant sm:text-base">
          Mulai gratis, tingkatkan saat musim Penilaian Tengah Semester (PTS) dan
          Sumatif Akhir Semester (SAS).
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <div
            key={tier.title}
            className={cn(
              "relative flex flex-col justify-between rounded-2xl bg-surface-card p-6 sm:p-7",
              tier.cardClass
            )}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-kurikulum-k13 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-primary shadow-2xs">
                Paling Populer
              </div>
            )}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  {tier.title}
                </h3>
                {tier.badge && (
                  <span className="rounded bg-credit-amber-tint px-2 py-0.5 text-[10px] font-bold text-credit-amber">
                    {tier.badge}
                  </span>
                )}
              </div>
              <p className="mb-4 text-xs text-faint">{tier.sub}</p>
              <div className="mb-6">
                <span className={cn("text-3xl font-extrabold", tier.priceClass)}>
                  {tier.price}
                </span>
                <span className="text-xs text-faint"> {tier.per}</span>
              </div>
              <ul className={cn("mb-6 space-y-3 text-xs sm:text-sm", tier.featListClass)}>
                {tier.features.map((f, i) => (
                  <li key={i} className={cn("flex items-center gap-2", f.rowClass)}>
                    <Icon name={f.icon} className={cn("text-[18px]", f.iconClass)} />
                    <span>
                      {f.lead && <strong>{f.lead}</strong>}
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={tier.href}
              className={cn(
                "w-full rounded-xl px-4 py-2.5 text-center text-xs font-bold transition-colors sm:text-sm",
                tier.btnClass
              )}
            >
              {tier.btnText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
