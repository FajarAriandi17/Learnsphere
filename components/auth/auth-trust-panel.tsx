import Link from "next/link";

import { Icon } from "@/components/ui/icon";

const DOC_META = [
  { label: "TOTAL SOAL", value: "40 Butir", valueClass: "text-text-ink" },
  { label: "KUNCI & RUBRIK", value: "Lengkap 100%", valueClass: "text-state-success" },
  { label: "FORMAT EKSPOR", value: "DOCX & PDF", valueClass: "text-primary-deep" },
];

/**
 * Verified-teacher stack. The reference hotlinks three generated portraits;
 * gradient initials keep the panel self-contained and stable offline.
 */
const TEACHERS = [
  { initials: "SW", className: "bg-gradient-to-br from-teal-500 to-emerald-600" },
  { initials: "AF", className: "bg-gradient-to-br from-sky-500 to-indigo-600" },
  { initials: "RH", className: "bg-gradient-to-br from-amber-500 to-orange-600" },
];

/**
 * Right pane of the auth card: institutional trust and live assessment proof.
 * A teacher signing in at 11pm is being reminded what the tool gives back —
 * a finished SAS paper with keys and rubrics, not a marketing promise.
 */
export function AuthTrustPanel() {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-surface-container-low p-4 sm:p-8 lg:col-span-5">
      {/* Ambient decorative shapes */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-kurikulum-merdeka/10 blur-2xl" />

      <div className="relative z-10 space-y-4">
        {/* Live benefit badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-surface-card px-3 py-1.5 font-label-md text-label-md font-semibold text-primary-deep shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-state-success opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-state-success" />
          </span>
          <span>Hemat hingga 8 jam lembur kisi-kisi per pekan</span>
        </div>

        {/* Live document preview card */}
        <div className="relative rounded-2xl bg-surface-card p-4 shadow-md transition-transform duration-200 hover:-translate-y-0.5">
          <div className="-mx-4 -mt-4 mb-2 flex items-center justify-between rounded-t-2xl bg-surface-paper px-4 pb-2 pt-2">
            <div className="flex items-center gap-2">
              <Icon name="description" className="text-[20px] text-primary-deep" />
              <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-text-ink">
                Pratinjau Hasil Instan
              </span>
            </div>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-label-sm text-label-sm font-semibold text-indigo-700">
              HOTS C4 - C6
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-headline-sm text-headline-sm leading-snug text-text-ink">
                  Asesmen Sumatif Akhir Semester (SAS)
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Matematika Fase D • Kelas VIII SMP • Kurikulum Merdeka
                </p>
              </div>
              <span className="shrink-0 rounded bg-sky-50 px-2 py-1 font-label-sm text-label-sm font-bold text-kurikulum-merdeka">
                Fase D
              </span>
            </div>

            {/* Simulated stimulus */}
            <div className="rounded-lg bg-surface-paper p-2 font-body-sm text-body-sm text-text-ink">
              <span className="mb-1 block font-semibold text-primary-deep">
                Stimulus Kontekstual Numerasi:
              </span>
              <p className="line-clamp-2 text-on-surface-variant">
                &ldquo;Koperasi Siswa Mandiri mencatat keuntungan bersih bulanan
                dalam kurun waktu semester ganjil membentuk barisan
                aritmetika...&rdquo;
              </p>
            </div>

            {/* Meta attributes */}
            <div className="grid grid-cols-3 gap-1 pt-1 text-center font-label-sm text-label-sm">
              {DOC_META.map((meta) => (
                <div key={meta.label} className="rounded bg-surface-paper p-1">
                  <span className="block text-[10px] text-outline">
                    {meta.label}
                  </span>
                  <span className={`font-bold ${meta.valueClass}`}>
                    {meta.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social proof stats & verified avatars */}
        <div className="space-y-2 rounded-2xl bg-surface-card/80 p-4 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between">
            <div
              className="flex text-credit-amber"
              title="Rating 4.9 / 5.0 dari guru Indonesia"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" filled className="text-[18px]" />
              ))}
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-text-ink">
              4.9 / 5.0 Kepuasan Guru
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              {TEACHERS.map((teacher) => (
                <span
                  key={teacher.initials}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-label-sm text-label-sm font-bold text-white ring-2 ring-surface-card ${teacher.className}`}
                >
                  {teacher.initials}
                </span>
              ))}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-deep font-label-sm text-label-sm font-bold text-on-primary ring-2 ring-surface-card">
                +12k
              </span>
            </div>
            <div className="text-left">
              <p className="font-label-md text-label-md font-bold leading-tight text-text-ink">
                12.500+ Guru &amp; Pengawas
              </p>
              <p className="font-body-sm text-[11px] leading-tight text-on-surface-variant">
                Tergabung dari Sabang sampai Merauke
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration CTA callout */}
      <div className="relative z-10 pt-4">
        <div className="flex flex-col items-center justify-between gap-2 rounded-xl bg-surface-card p-3 shadow-sm sm:flex-row">
          <div className="text-left">
            <p className="font-headline-sm text-headline-sm leading-tight text-text-ink">
              Belum punya akun dinas?
            </p>
            <p className="font-body-sm text-body-sm font-medium text-credit-amber">
              Dapatkan bonus 50 Token Pembuat Soal AI
            </p>
          </div>
          <Link
            href="/register"
            className="whitespace-nowrap rounded-lg bg-surface-container-high px-4 py-2 font-label-md text-label-md font-semibold text-primary-deep transition-colors hover:bg-surface-variant"
          >
            Daftar Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
