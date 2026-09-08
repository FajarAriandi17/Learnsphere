import { Icon } from "./icon";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";

const TEMPLATE_TABS = [
  { icon: "description", label: "Naskah Ujian Murid", active: true },
  { icon: "key", label: "Kunci & Pedoman Penskoran" },
  { icon: "table_rows", label: "Kisi-Kisi Standar BSNP/Dinas" },
  { icon: "assignment_ind", label: "Format Buku Raport Siswa" },
];

const META = [
  { label: "Mata Pelajaran:", value: "Biologi" },
  { label: "Kelas / Fase:", value: "XI / F" },
  { label: "Hari/Tanggal:", value: "Senin, 2 Juni 2026" },
  { label: "Alokasi Waktu:", value: "90 Menit" },
];

const OPTIONS = [
  "A. Peningkatan produksi asam laktat seluler secara drastis",
  "B. Penumpukan elektron pada NADH dan penurunan sintesis ATP drastis",
  "C. Peningkatan konsumsi gas oksigen oleh sel-sel hati",
  "D. Penurunan laju glikolisis di dalam sitoplasma sel",
];

export function DocumentPreview() {
  return (
    <section
      id="preview-template"
      className="relative w-full overflow-hidden bg-on-surface px-4 py-20 text-on-primary sm:px-6 lg:px-8"
    >
      <HexagonPattern className="fill-teal-900/20 stroke-teal-700/20" />
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="rounded-full border border-teal-700 bg-on-surface px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-300">
            Standar Format Resmi A4
          </span>
          <h2 className="mt-3 font-headline-lg text-2xl font-extrabold tracking-tight text-kurikulum-k13 sm:text-3xl lg:text-4xl">
            Pratinjau Format Dokumen Hasil Ekspor
          </h2>
          <p className="mt-2 text-sm text-credit-amber sm:text-base">
            Bukan sekadar teks acak. Format dirancang mengikuti tata letak naskah
            ujian resmi sekolah Indonesia.
          </p>
        </div>

        {/* Template tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {TEMPLATE_TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={
                tab.active
                  ? "flex items-center gap-2 rounded-xl bg-kurikulum-k13 px-4 py-2 text-xs font-bold text-on-primary sm:text-sm"
                  : "flex items-center gap-2 rounded-xl bg-kurikulum-k13 px-4 py-2 text-xs font-bold text-on-primary transition-colors hover:brightness-110 sm:text-sm"
              }
            >
              <Icon name={tab.icon} className="text-[18px]" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Document preview canvas */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-border-subtle bg-surface-card p-6 text-on-surface shadow-2xl sm:p-10">
          {/* Official school header */}
          <div className="mb-6 border-b-2 border-border-subtle pb-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-container-low text-center text-xs font-bold text-faint">
                LOGO
                <br />
                SEKOLAH
              </div>
              <div className="flex-1 text-center">
                <h4 className="font-headline-sm text-sm font-extrabold uppercase leading-tight tracking-wider text-on-surface sm:text-base">
                  Pemerintah Daerah Provinsi Jawa Barat Dinas Pendidikan
                </h4>
                <h5 className="text-xs font-bold uppercase text-on-surface sm:text-sm">
                  Sekolah Menengah Atas Negeri 1 Cibinong
                </h5>
                <p className="mt-0.5 text-[11px] text-on-surface-variant">
                  Jl. Mayor Oking Jayaatmaja No. 73, Cibinong, Kab. Bogor 16918
                  Telp: (021) 8752431
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t-2 border-double border-border-subtle pt-2 text-xs font-semibold text-on-surface sm:grid-cols-4">
              {META.map((m) => (
                <div key={m.label}>
                  {m.label} <strong>{m.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Question body */}
          <div className="space-y-4 font-body-md text-xs leading-relaxed text-on-surface sm:text-sm">
            <div className="rounded bg-surface-container-low p-2 text-xs font-bold text-on-surface-variant">
              PETUNJUK UMUM: Pilihlah satu jawaban yang paling tepat dengan
              menghitamkan bulatan (●) pada lembar jawaban komputer atau naskah
              ujian!
            </div>
            <div>
              <p className="mb-1 font-bold text-on-surface">
                1. (HOTS - Analisis Kasus) Perhatikan skema siklus Krebs dan
                fosforilasi oksidatif berikut ini:
              </p>
              <div className="mb-2 rounded-lg border border-border-subtle bg-surface-paper p-3 font-exam-mono text-xs text-on-surface-variant">
                Glukosa ➔ Asam Piruvat ➔ Asetil Ko-A ➔ [Siklus Krebs] ➔
                Fosforilasi Oksidatif (34 ATP)
              </div>
              <p className="mb-2">
                Jika suatu zat racun sianida menghambat kompleks sitokrom c
                oksidase pada membran dalam mitokondria, dampak biologis yang
                secara langsung teramati pada tingkat sel adalah...
              </p>
              <div className="grid grid-cols-1 gap-2 pl-4 text-xs font-medium sm:grid-cols-2">
                {OPTIONS.map((opt) => (
                  <div key={opt}>{opt}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle pt-4 text-xs text-faint">
            <span>Standar Lembar Ujian Nasional &amp; SAS Kurikulum Merdeka</span>
            <span className="font-exam-mono">Halaman 1 dari 6</span>
          </div>
        </div>
      </div>
    </section>
  );
}
