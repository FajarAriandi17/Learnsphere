import { Icon } from "./icon";

export function AiEthics() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-primary-soft bg-primary-soft/70 p-6 text-on-surface shadow-2xs md:flex-row md:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-kurikulum-k13 text-on-primary shadow-2xs">
          <Icon name="gavel" className="text-[26px]" />
        </div>
        <div className="flex-1 text-xs leading-relaxed sm:text-sm">
          <h4 className="mb-1 font-bold text-on-surface">
            Prinsip Etika AI &amp; Kepatuhan Regulasi Evaluasi Belajar
            (Kemendikdasmen RI)
          </h4>
          <p className="text-on-surface-variant">
            Learnsphere beroperasi murni sebagai{" "}
            <strong>alat bantu akselerator administrasi pendidik</strong>. Seluruh
            instrumen soal, kisi-kisi, dan asesmen wajib ditelaah secara pedagogik
            oleh guru mata pelajaran sebelum diujikan resmi di kelas guna
            memastikan konteks sosial-budaya peserta didik tetap terlindungi.
          </p>
        </div>
      </div>
    </section>
  );
}
