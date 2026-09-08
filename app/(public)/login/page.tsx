import type { Metadata } from "next";

import { AuthTrustPanel } from "@/components/auth/auth-trust-panel";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Masuk ke Dashboard Learnsphere",
  description:
    "Portal masuk resmi pengajar terakreditasi. Kelola naskah soal ujian, bank soal HOTS terstandar, dan cetak administrasi akademik instan.",
};

/**
 * Sign-in screen: one card split 7/5 between the credential flow and the
 * institutional proof panel, floated over a dotted grid with two soft glows.
 */
export default function LoginPage() {
  return (
    <div className="relative w-full flex-1 overflow-hidden bg-surface">
      {/* Dotted canvas + ambient glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#00685f_0.75px,transparent_0.75px)] opacity-40 [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-fixed/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-secondary-fixed/30 blur-3xl" />

      <div className="relative z-10 flex min-h-[calc(100dvh-4rem-5rem)] w-full items-center justify-center px-4 py-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col py-3 sm:py-4">
          <div className="grid w-full min-h-[640px] grid-cols-1 overflow-hidden rounded-2xl bg-surface-card shadow-xl lg:grid-cols-12">
            <LoginForm />
            <AuthTrustPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
