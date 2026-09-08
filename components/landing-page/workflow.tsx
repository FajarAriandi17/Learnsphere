import { Icon } from "./icon";

const STEPS = [
  {
    num: "1",
    numBg: "bg-teal-600",
    title: "Pilih Jenjang & Fase",
    desc: "Tentukan jenjang pendidikan (SD, SMP, SMA, SMK), Fase A–F atau Kurikulum K13, dan topik materi pelajaran yang ingin diujikan.",
    metaIcon: "touch_app",
    metaText: "Proses hanya 20 detik",
    metaClass: "text-teal-700",
  },
  {
    num: "2",
    numBg: "bg-sky-600",
    title: "Atur Bobot & HOTS",
    desc: "Pilih jumlah butir soal, komposisi tingkat kesukaran penalaran HOTS (C4–C6), serta tipe stimulus wacana kontekstual.",
    metaIcon: "tune",
    metaText: "Otomatisasi presisi AI",
    metaClass: "text-kurikulum-merdeka",
  },
  {
    num: "3",
    numBg: "bg-amber-600",
    title: "Review & Kontrol Guru",
    desc: "Periksa hasil generate naskah, kunci jawaban, dan kisi-kisi. Anda memegang kendali penuh untuk menyunting atau mengganti opsi soal.",
    metaIcon: "edit_note",
    metaText: "Fleksibilitas pendidik",
    metaClass: "text-amber-700",
  },
  {
    num: "4",
    numBg: "bg-state-success",
    title: "Unduh Naskah Siap Ujian",
    desc: "Ekspor langsung file Microsoft Word (.DOCX) dan PDF ber-kop sekolah yang siap dicetak, digandakan, dan dibagikan ke siswa.",
    metaIcon: "print",
    metaText: "Siap fotokopi seketika",
    metaClass: "text-emerald-700",
  },
];

export function Workflow() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="rounded-full bg-surface-container-low px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-on-surface">
          Proses Sangat Mudah
        </span>
        <h2 className="mt-3 font-headline-lg text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
          4 Langkah Praktis dari Ide ke Meja Ujian
        </h2>
        <p className="mt-2 font-body-lg text-sm text-on-surface-variant sm:text-base">
          Dibuat khusus untuk pendidik tanpa perlu memahami prompt engineering
          yang rumit.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-2xs transition-colors hover:border-kurikulum-k13"
          >
            <div>
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full text-base font-extrabold text-on-primary shadow-2xs ${step.numBg}`}
              >
                {step.num}
              </div>
              <h3 className="mb-2 font-headline-sm text-base font-bold text-on-surface">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                {step.desc}
              </p>
            </div>
            <div
              className={`mt-4 flex items-center gap-1 border-t border-border-subtle pt-3 text-[11px] font-semibold ${step.metaClass}`}
            >
              <Icon name={step.metaIcon} className="text-[16px]" /> {step.metaText}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
