"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { Sheet } from "@/components/ui/sheet";

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  return (
    <Sheet className="p-6 sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="font-serif text-[22px] font-semibold text-ink">
          Pemulihan Kata Sandi
        </h2>
        <p className="mt-1 text-[13px] text-muted">
          Masukkan alamat email dinas yang terdaftar untuk menerima instruksi pengaturan ulang kata sandi.
        </p>
      </div>

      {sent ? (
        <div className="rounded-[var(--radius-control)] border border-rule bg-paper/60 p-5 text-center space-y-3">
          <CheckCircle2 className="size-8 text-tuntas mx-auto" />
          <h3 className="font-serif text-[16px] font-medium text-ink">
            Tautan Pemulihan Terkirim
          </h3>
          <p className="text-[12.5px] text-muted leading-relaxed">
            Kami telah mengirimkan tautan reset kata sandi ke <strong className="text-ink">{email}</strong>. Silakan periksa kotak masuk atau folder spam Anda.
          </p>
          <div className="pt-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Kembali ke Halaman Masuk</Link>
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Alamat Email Akun Guru">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@sekolah.sch.id"
            />
          </Field>

          <div className="pt-2">
            <Button type="submit" variant="solid" className="w-full" disabled={loading}>
              {loading ? "Mengirimkan instruksi..." : "Kirim Tautan Pemulihan"}
              <Send aria-hidden />
            </Button>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink hover:underline"
            >
              <ArrowLeft className="size-3.5" />
              Kembali ke halaman masuk
            </Link>
          </div>
        </form>
      )}
    </Sheet>
  );
}
