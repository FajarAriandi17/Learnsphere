import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";
import { RegisterPerksPanel } from "@/components/auth/register-perks-panel";

export const metadata: Metadata = {
  title: "Daftar Gratis & Klaim 50 Token AI",
  description:
    "Registrasi pendidik Indonesia. Daftar gratis dalam 1 menit untuk menyusun naskah soal HOTS terstandar BSKAP dan administrasi rapor otomatis.",
};

/**
 * Registration screen: unlike login's single unified card, this splits 7/5 into
 * separate stacked cards — the form on the left, three trust cards on the right
 * — floated over the canvas with two contained ambient glows.
 */
export default function RegisterPage() {
  return (
    <div className="relative w-full flex-1 overflow-hidden bg-surface">
      {/* Ambient glows, clipped by the parent's overflow-hidden */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 rounded-full bg-secondary-container/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <RegisterForm />
          <RegisterPerksPanel />
        </div>
      </div>
    </div>
  );
}
