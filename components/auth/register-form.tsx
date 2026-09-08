"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { GitHubMark, GoogleMark } from "@/components/auth/brand-marks";
import { Icon } from "@/components/ui/icon";
import { insforge } from "@/lib/insforge";

/**
 * Jenjang drives which Capaian Pembelajaran the generator targets, so the pill
 * a teacher picks here is a real downstream input, not decoration. Fase labels
 * follow Kurikulum Merdeka's phase mapping.
 */
const STAGES = [
  { value: "SD", title: "SD / MI", phase: "Fase A – C" },
  { value: "SMP", title: "SMP / MTs", phase: "Fase D" },
  { value: "SMA", title: "SMA / MA", phase: "Fase E – F" },
  { value: "SMK", title: "SMK / MAK", phase: "Vokasi / Kerja" },
] as const;

const SUBJECTS = [
  "Matematika",
  "Bahasa Indonesia",
  "IPA Terpadu",
  "IPS Terpadu",
  "Bahasa Inggris",
  "Informatika / Pemrograman",
  "Pendidikan Pancasila",
  "PJOK / Olahraga",
];

const ROLES = [
  { value: "WaliKelas", label: "Guru Mata Pelajaran & Wali Kelas" },
  { value: "GuruMapel", label: "Guru Mata Pelajaran" },
  { value: "Kurikulum", label: "Koordinator Tim Pengembang Kurikulum" },
  { value: "Kepsek", label: "Kepala Satuan Pendidikan / Asesor" },
];

// Borderless fills that lift on a shadow and gain a focus ring — the same
// input language as the login form, so the two screens read as one system.
const INPUT_BASE =
  "w-full rounded-lg bg-surface-paper px-3.5 py-2.5 font-body-md text-body-md text-on-surface shadow-sm transition-colors placeholder:text-outline focus:bg-surface-card focus:outline-none focus:ring-2 focus:ring-primary/25";
const SSO_BASE =
  "group flex items-center justify-center gap-2 rounded-lg bg-surface-container-low px-4 py-2.5 shadow-sm transition-colors hover:bg-surface-container";

/**
 * The reference ships a static "Kekuatan: Sedang" label with three of four bars
 * lit. Faking that would lie to the teacher, so the meter is real: one point
 * each for a capital, a digit, a symbol, and length >= 12, gated behind the
 * 8-character floor the helper text promises.
 */
const STRENGTH_LEVELS = [
  { label: "Terlalu Lemah", tone: "text-state-error", bar: "bg-state-error" },
  { label: "Lemah", tone: "text-state-error", bar: "bg-state-error" },
  { label: "Sedang", tone: "text-credit-amber", bar: "bg-credit-amber" },
  { label: "Kuat", tone: "text-state-success", bar: "bg-state-success" },
  { label: "Sangat Kuat", tone: "text-state-success", bar: "bg-state-success" },
];

function passwordStrength(pwd: string): number {
  if (pwd.length < 8) return pwd.length === 0 ? 0 : 1;
  let score = 1;
  if (/[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 4);
}

/**
 * Left column of the registration screen. Real InsForge signup, then a schools
 * + teachers bootstrap so the new account lands in the dashboard with a profile
 * already attached. The stage picker, strength meter, and password reveal are
 * local UI state; everything the teacher types that the schema can hold gets
 * persisted (name, nip, subject).
 */
export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [nip, setNip] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [stage, setStage] = React.useState<string>("SMP");
  const [subject, setSubject] = React.useState(SUBJECTS[0]);
  const [teacherRole, setTeacherRole] = React.useState(ROLES[0].value);
  const [agreePedagogic, setAgreePedagogic] = React.useState(true);
  const [remember, setRemember] = React.useState(true);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">(
    "idle",
  );
  const [error, setError] = React.useState<string | null>(null);

  const strength = passwordStrength(password);
  const strengthMeta = STRENGTH_LEVELS[strength];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setStatus("loading");

    // 1. Create the auth user.
    const { data: authData, error: signUpError } = await insforge.auth.signUp({
      email,
      password,
      name,
    });

    if (signUpError || !authData?.user?.id) {
      setStatus("idle");
      const raw = signUpError?.message ?? "";
      setError(
        /already registered|exists/i.test(raw)
          ? "Email ini sudah terdaftar. Silakan masuk atau gunakan email dinas lain."
          : raw ||
              "Gagal mendaftar. Coba lagi beberapa saat atau hubungi helpdesk Dapodik.",
      );
      return;
    }

    const userId = authData.user.id;

    // 2. Bootstrap a school owned by this teacher. The school name isn't a field
    //    on this reference form, so we seed a sensible placeholder the operator
    //    can rename later from the dashboard's Dapodik settings.
    const { data: school, error: schoolError } = await insforge.database
      .from("schools")
      .insert({ name: "Satuan Pendidikan Saya", owner_id: userId })
      .select()
      .single();

    if (schoolError) {
      setStatus("idle");
      setError(
        "Akun dibuat, tetapi gagal menyiapkan data sekolah. Hubungi helpdesk Dapodik.",
      );
      return;
    }

    // 3. Attach the teacher profile, persisting the identity fields the schema
    //    can hold. Jenjang and peran aren't columns yet, so they stay UI-only.
    const { error: teacherError } = await insforge.database
      .from("teachers")
      .insert({
        user_id: userId,
        school_id: school?.id,
        name,
        nip: nip || null,
        subject,
      });

    if (teacherError) {
      setStatus("idle");
      setError(
        "Akun dibuat, tetapi profil guru gagal disimpan. Lengkapi dari dashboard.",
      );
      return;
    }

    // Mirror the reference's confirmation beat before navigating.
    setStatus("success");
    router.push("/dashboard");
    router.refresh();
  };

  const handleOAuth = (provider: "google" | "github") => {
    setError(null);
    void insforge.auth.signInWithOAuth({
      provider,
      redirectTo: `${window.location.origin}/dashboard`,
    });
  };

  const submit = {
    idle: {
      icon: "arrow_forward",
      label: "Daftar Sekarang & Klaim 50 Token Gratis",
      className: "bg-primary hover:bg-primary-deep",
      spin: false,
    },
    loading: {
      icon: "progress_activity",
      label: "Menyiapkan Akun & Ruang Kerja...",
      className: "bg-primary",
      spin: true,
    },
    success: {
      icon: "check_circle",
      label: "Berhasil! Membuka Dashboard...",
      className: "bg-state-success",
      spin: false,
    },
  }[status];

  const fieldTone = error ? " ring-2 ring-state-error" : "";

  return (
    <section className="flex flex-col gap-6 rounded-xl bg-surface-card p-4 shadow-sm sm:p-8 lg:col-span-7">
      {/* Header block: accreditation badge + the 50-token bonus lure */}
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-2.5 py-1 font-label-sm text-label-sm font-semibold text-primary">
            <Icon name="verified_user" className="text-[14px]" />
            Registrasi Pendidik Indonesia
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-2.5 py-1 font-label-sm text-label-sm font-semibold text-on-tertiary-fixed-variant">
            <Icon name="card_giftcard" className="text-[14px] text-tertiary" />
            Klaim Bonus 50 Token AI Gratis
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
          Mulai Buat Soal &amp; Administrasi Guru Tanpa Beban Lembur
        </h1>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Daftar gratis dalam 1 menit. Rasakan kemudahan menyusun naskah soal
          HOTS terstandar BSKAP dan administrasi rapor otomatis.
        </p>
      </div>

      {/* SSO — horizontal, centred variant (differs from login's stacked cards) */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button type="button" onClick={() => handleOAuth("google")} className={SSO_BASE}>
          <GoogleMark />
          <span className="text-left">
            <span className="block font-label-md text-label-md font-semibold text-on-surface transition-colors group-hover:text-primary">
              Akun Google Dinas
            </span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant">
              @guru.belajar.id / Gmail
            </span>
          </span>
        </button>
        <button type="button" onClick={() => handleOAuth("github")} className={SSO_BASE}>
          <GitHubMark className="h-5 w-5 shrink-0 fill-on-surface" />
          <span className="text-left">
            <span className="block font-label-md text-label-md font-semibold text-on-surface transition-colors group-hover:text-primary">
              GitHub Vokasi
            </span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant">
              Guru RPL, TKJ &amp; Komputer
            </span>
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="h-px w-full bg-surface-container" />
        </div>
        <span className="relative bg-surface-card px-3 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          atau daftar manual dengan identitas dinas
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Row 1: name + NIP/NUPTK */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="reg-name" className="font-label-md text-label-md text-on-surface">
                Nama Lengkap &amp; Gelar
              </label>
              <span className="font-label-sm text-label-sm text-error">*Wajib</span>
            </div>
            <input
              id="reg-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dra. Nurul Hidayati, M.Pd."
              className={`${INPUT_BASE}${fieldTone}`}
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="reg-nip" className="font-label-md text-label-md text-on-surface">
                NIP / NUPTK
              </label>
              <span className="font-label-sm text-label-sm text-outline">Opsional</span>
            </div>
            <input
              id="reg-nip"
              type="text"
              inputMode="numeric"
              maxLength={18}
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              placeholder="16 Digit NUPTK / 18 Digit NIP"
              className={INPUT_BASE}
            />
          </div>
        </div>

        {/* Row 2: email */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="reg-email" className="font-label-md text-label-md text-on-surface">
              Alamat Email Dinas atau Pribadi
            </label>
            <span className="font-label-sm text-label-sm text-primary">Bebas domain sekolah</span>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-outline">
              <Icon name="mail" className="text-[20px]" />
            </div>
            <input
              id="reg-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama.guru@smpn1.sch.id atau guru@belajar.id"
              className={`${INPUT_BASE} pl-10${fieldTone}`}
            />
          </div>
        </div>

        {/* Row 3: password + live strength meter */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="reg-password" className="font-label-md text-label-md text-on-surface">
              Kata Sandi Akun
            </label>
            {password ? (
              <span className={`font-label-sm text-label-sm font-semibold ${strengthMeta.tone}`}>
                Kekuatan: {strengthMeta.label}
              </span>
            ) : null}
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-outline">
              <Icon name="lock" className="text-[20px]" />
            </div>
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter unik..."
              aria-invalid={error ? true : undefined}
              className={`${INPUT_BASE} pl-10 pr-10${fieldTone}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-outline transition-colors hover:text-on-surface"
            >
              <Icon name={showPassword ? "visibility_off" : "visibility"} className="text-[20px]" />
            </button>
          </div>
          {/* Four bars fill as the score climbs */}
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-colors ${
                  password && i < strength ? strengthMeta.bar : "bg-surface-container"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 font-body-sm text-body-sm text-outline">
            Gunakan kombinasi minimal 8 karakter dengan huruf kapital, angka, dan simbol.
          </p>
        </div>

        {/* Row 4: stage picker */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="font-label-md text-label-md text-on-surface">
              Jenjang Pendidikan Utama (Kurikulum Merdeka):
            </label>
            <span className="hidden font-label-sm text-label-sm text-secondary sm:inline">
              Menyesuaikan Capaian Pembelajaran AI
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STAGES.map((s) => {
              const active = s.value === stage;
              return (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setStage(s.value)}
                  aria-pressed={active}
                  className={`relative flex flex-col items-start rounded-lg p-2.5 text-left transition-colors ${
                    active
                      ? "bg-surface-container-high"
                      : "bg-surface-paper hover:bg-surface-container-low"
                  }`}
                >
                  {active ? (
                    <Icon
                      name="check_circle"
                      className="absolute right-2 top-2 text-[16px] text-primary"
                    />
                  ) : null}
                  <span
                    className={`font-label-md text-label-md font-semibold ${
                      active ? "text-primary" : "text-on-surface"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {s.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 5: subject + role selects */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="reg-subject" className="mb-1 block font-label-md text-label-md text-on-surface">
              Mata Pelajaran Utama
            </label>
            <div className="relative">
              <select
                id="reg-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`${INPUT_BASE} appearance-none pr-10`}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-outline">
                <Icon name="expand_more" className="text-[20px]" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="reg-role" className="mb-1 block font-label-md text-label-md text-on-surface">
              Peran di Satuan Pendidikan
            </label>
            <div className="relative">
              <select
                id="reg-role"
                value={teacherRole}
                onChange={(e) => setTeacherRole(e.target.value)}
                className={`${INPUT_BASE} appearance-none pr-10`}
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-outline">
                <Icon name="expand_more" className="text-[20px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Compliance box */}
        <div className="flex flex-col gap-2.5 rounded-lg bg-surface-container-low p-3">
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              required
              checked={agreePedagogic}
              onChange={(e) => setAgreePedagogic(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-primary"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Saya menyetujui bahwa naskah draf AI adalah instrumen bantu yang akan
              ditelaah kembali sesuai prinsip pedagogis{" "}
              <strong className="font-semibold text-on-surface">
                Permendikdasmen No. 13 Tahun 2025
              </strong>
              .
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-primary"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Ingat sesi masuk di komputer ruang guru ini (30 hari aman).
            </span>
          </label>
        </div>

        {error ? (
          <p
            role="alert"
            className="flex items-start gap-1.5 font-body-sm text-body-sm text-state-error"
          >
            <Icon name="error" className="mt-px text-[16px]" />
            <span>{error}</span>
          </p>
        ) : null}

        {/* Primary CTA — rests at brand primary, deepens to #00685f on hover
            (the inverse of the login CTA, matching this reference). */}
        <button
          type="submit"
          disabled={status !== "idle"}
          className={`flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3.5 font-headline-sm text-headline-sm text-on-primary shadow-md transition-all active:scale-[0.99] disabled:cursor-progress ${submit.className}`}
        >
          {status === "idle" ? (
            <>
              <span>{submit.label}</span>
              <Icon
                name={submit.icon}
                className="text-[20px] transition-transform group-hover:translate-x-1"
              />
            </>
          ) : (
            <>
              <Icon
                name={submit.icon}
                className={`text-[20px] ${submit.spin ? "animate-spin" : ""}`}
              />
              <span>{submit.label}</span>
            </>
          )}
        </button>
      </form>

      {/* Switch to login */}
      <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
        Sudah memiliki akun Learnsphere terdaftar?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Masuk ke Akun Anda
        </Link>
      </p>
    </section>
  );
}
