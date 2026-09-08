import type { Invoice, Plan, PlanFeatureRow } from "@/types";

/**
 * SAMPLE PLANS — frontend only.
 *
 * Prices sit inside the PRD §23 target bands (Basic Rp29–49rb, Pro Rp79–99rb)
 * and are kept in one place because §23 requires them to stay configurable:
 * when the admin panel lands, this file is read from `subscriptions` instead of
 * being edited. Yearly figures are the per-month price when billed for a year.
 */

export const plans: Plan[] = [
  {
    id: "free",
    name: "Gratis",
    tagline: "Untuk mencoba alurnya lebih dulu.",
    monthly: 0,
    yearly: 0,
    credits: "25 kredit / bulan",
    students: "40 siswa",
    note: "Ekspor diberi watermark EduSoal AI.",
    cta: "Mulai gratis",
    href: "/register",
  },
  {
    id: "basic",
    name: "Guru Basic",
    tagline: "Satu guru, satu mata pelajaran, administrasi harian.",
    monthly: 35000,
    yearly: 29000,
    credits: "500 kredit / bulan",
    students: "250 siswa",
    note: "Paket yang dipakai sebagian besar guru mata pelajaran.",
    cta: "Pilih Guru Basic",
    href: "/billing?paket=basic",
    featured: true,
  },
  {
    id: "pro",
    name: "Guru Pro",
    tagline: "Wali kelas yang juga mengurus raport dan portofolio.",
    monthly: 89000,
    yearly: 74000,
    credits: "2.000 kredit / bulan",
    students: "600 siswa",
    note: "Antrean pemrosesan diprioritaskan pada musim raport.",
    cta: "Pilih Guru Pro",
    href: "/billing?paket=pro",
  },
  {
    id: "school",
    name: "Sekolah",
    tagline: "Satu langganan untuk seluruh guru di sekolah.",
    monthly: null,
    yearly: null,
    credits: "Kuota bersama",
    students: "Tanpa batas",
    note: "Harga per guru, disesuaikan dengan jumlah rombel.",
    cta: "Hubungi kami",
    href: "mailto:sekolah@edusoal.id",
  },
];

export function planById(id: string) {
  return plans.find((plan) => plan.id === id);
}

/**
 * The comparison rows. A string is printed as-is; `true`/`false` render as a
 * tick or a dash, so a row only needs prose when the limit itself differs.
 */
export const planFeatures: PlanFeatureRow[] = [
  { group: "AI Buat Soal", label: "Kredit AI per bulan", values: { free: "25", basic: "500", pro: "2.000", school: "Kuota bersama" } },
  { group: "AI Buat Soal", label: "Soal per paket", values: { free: "10", basic: "50", pro: "50", school: "50" } },
  { group: "AI Buat Soal", label: "Pilihan ganda, benar/salah, jawaban singkat", values: { free: true, basic: true, pro: true, school: true } },
  { group: "AI Buat Soal", label: "Soal uraian dengan pedoman penskoran", values: { free: false, basic: true, pro: true, school: true } },
  { group: "AI Buat Soal", label: "Buat ulang satu soal tanpa memotong kredit", values: { free: false, basic: "3 kali", pro: "Tanpa batas", school: "Tanpa batas" } },
  { group: "AI Buat Soal", label: "Bank soal tersimpan", values: { free: "20 soal", basic: "Tanpa batas", pro: "Tanpa batas", school: "Tanpa batas" } },

  { group: "Ujian & kunci jawaban", label: "Template ujian", values: { free: "Latihan Soal, Quiz", basic: "8 template", pro: "8 template + custom", school: "Template sekolah" } },
  { group: "Ujian & kunci jawaban", label: "Versi siswa dan versi guru", values: { free: true, basic: true, pro: true, school: true } },
  { group: "Ujian & kunci jawaban", label: "Lembar jawaban terpisah", values: { free: false, basic: true, pro: true, school: true } },
  { group: "Ujian & kunci jawaban", label: "Ekspor DOCX dan PDF", values: { free: "PDF berwatermark", basic: true, pro: true, school: true } },

  { group: "Administrasi", label: "Data siswa", values: { free: "40 siswa", basic: "250 siswa", pro: "600 siswa", school: "Tanpa batas" } },
  { group: "Administrasi", label: "Absensi bulanan dengan rekap otomatis", values: { free: false, basic: true, pro: true, school: true } },
  { group: "Administrasi", label: "Raport dan rekap nilai", values: { free: false, basic: false, pro: true, school: true } },
  { group: "Administrasi", label: "Ekspor Excel", values: { free: false, basic: false, pro: true, school: true } },
  { group: "Administrasi", label: "Portofolio siswa", values: { free: false, basic: false, pro: true, school: true } },
  { group: "Administrasi", label: "Impor siswa dari Excel", values: { free: false, basic: true, pro: true, school: true } },

  { group: "Sekolah", label: "Profil sekolah pada semua dokumen", values: { free: false, basic: true, pro: true, school: true } },
  { group: "Sekolah", label: "Beberapa guru dalam satu langganan", values: { free: false, basic: false, pro: false, school: true } },
  { group: "Sekolah", label: "Data siswa terpusat", values: { free: false, basic: false, pro: false, school: true } },
  { group: "Sekolah", label: "Pemantauan pemakaian per guru", values: { free: false, basic: false, pro: false, school: true } },

  { group: "Dukungan", label: "Prioritas pemrosesan dokumen", values: { free: false, basic: false, pro: true, school: true } },
  { group: "Dukungan", label: "Bantuan", values: { free: "Pusat bantuan", basic: "Email", pro: "Email prioritas", school: "Pendampingan khusus" } },
];

/** Section order for the comparison table, taken from the rows above. */
export const featureGroups = Array.from(
  new Set(planFeatures.map((row) => row.group)),
);

/* ------------------------------------------------------------ pembayaran */

/**
 * PRD §25: the billing layer stays provider-agnostic, so the screen lists the
 * channels a school would expect and marks the whole set as a planned
 * integration rather than pretending a payment can be taken today.
 */
export const paymentChannels = [
  { id: "qris", name: "QRIS", detail: "Semua aplikasi pembayaran yang mendukung QRIS." },
  { id: "transfer", name: "Transfer bank", detail: "BCA, BRI, BNI, Mandiri, dan bank lain via virtual account." },
  { id: "ewallet", name: "E-wallet", detail: "GoPay, OVO, DANA, ShopeePay." },
  { id: "kartu", name: "Kartu kredit / debit", detail: "Visa dan Mastercard." },
] as const;

export const paymentProviders = ["Midtrans", "Xendit"] as const;

export const invoices: Invoice[] = [
  { id: "inv-9", number: "EDU/2026/09/0143", period: "September 2026", amount: 35000, method: "QRIS", status: "menunggu", issuedAt: "2026-09-01T00:05:00+07:00" },
  { id: "inv-8", number: "EDU/2026/08/0139", period: "Agustus 2026", amount: 35000, method: "QRIS", status: "lunas", issuedAt: "2026-08-01T00:05:00+07:00" },
  { id: "inv-7", number: "EDU/2026/07/0128", period: "Juli 2026", amount: 35000, method: "Transfer bank", status: "lunas", issuedAt: "2026-07-01T00:05:00+07:00" },
  { id: "inv-6", number: "EDU/2026/06/0121", period: "Juni 2026", amount: 35000, method: "Transfer bank", status: "gagal", issuedAt: "2026-06-01T00:05:00+07:00" },
  { id: "inv-5", number: "EDU/2026/05/0117", period: "Mei 2026", amount: 35000, method: "QRIS", status: "lunas", issuedAt: "2026-05-01T00:05:00+07:00" },
  { id: "inv-4", number: "EDU/2026/04/0104", period: "April 2026", amount: 35000, method: "QRIS", status: "lunas", issuedAt: "2026-04-01T00:05:00+07:00" },
];

/** Pemakaian kredit bulan ini, per fitur — PRD §23 usage monitoring. */
export const creditUsage = [
  { label: "AI Buat Soal", value: 128 },
  { label: "Buat ulang soal", value: 31 },
  { label: "Catatan raport", value: 15 },
  { label: "Ringkasan portofolio", value: 8 },
];
