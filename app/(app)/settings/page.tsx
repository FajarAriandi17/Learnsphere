import type { Metadata } from "next";

import { SettingsView } from "@/components/settings/settings-view";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Pengaturan",
  description: "Profil guru, identitas sekolah, formula penilaian raport, dan preferensi AI.",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-7 pb-16 sm:px-6">
      <PageHeader
        eyebrow="Konfigurasi & Identitas"
        title="Pengaturan Administrasi"
        description="Kelola data identitas pengajar, kop surat sekolah resmi, acuan KKM/KKTP dan bobot raport, serta preferensi asisten kecerdasan buatan."
      />

      <div className="space-y-9">
        <Section
          id="config"
          title="Konfigurasi Akun & Kurikulum"
          note="Data sekolah dan guru akan otomatis terpasang saat mencetak soal ujian dan raport."
        >
          <SettingsView />
        </Section>
      </div>
    </div>
  );
}
