"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { GitHubMark, GoogleMark } from "@/components/auth/brand-marks";
import { Icon } from "@/components/ui/icon";
import { insforge } from "@/lib/insforge";

type Role = "guru" | "admin";

/**
 * Everything the role tabs rewrite. A classroom teacher signs in with a NUPTK
 * to build exam papers; a Dapodik operator signs in with a school registration
 * code to manage licences. Keeping both variants in one map keeps the copy
 * divergence auditable instead of scattered through the JSX.
 */
const ROLE_COPY = {
  guru: {
    tabIcon: "school",
    tabLabel: "Guru / Pendidik",
    title: "Selamat Datang Kembali, Bapak/Ibu Guru",
    subtitle:
      "Masuk untuk mengelola naskah soal ujian, bank soal HOTS terstandar, dan cetak administrasi akademik instan.",
    identifierLabel: "Email Dinas Kemendikbud / NUPTK / NIP",
    identifierPlaceholder:
      "contoh: budi.santoso@guru.smp.belajar.id atau 198503...",
    identifierIcon: "badge",
    submitLabel: "Masuk ke Dashboard Learnsphere",
  },
  admin: {
    tabIcon: "admin_panel_settings",
    tabLabel: "Admin Sekolah / Dapodik",
    title: "Masuk Sebagai Operator / Admin Sekolah",
    subtitle:
      "Kelola sinkronisasi Dapodik, lisensi guru satu sekolah, dan bank soal terpadu institusi.",
    identifierLabel: "Kode Registrasi Dapodik / Email Admin Sekolah",
    identifierPlaceholder: "contoh: admin.smpn1@sekolah.sch.id atau NPSN...",
    identifierIcon: "corporate_fare",
    submitLabel: "Masuk ke Konsol Admin",
  },
} satisfies Record<Role, Record<string, string>>;

const ROLES = Object.keys(ROLE_COPY) as Role[];

const TAB_BASE =
  "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-label-md text-label-md transition-all duration-200 sm:flex-initial";
const INPUT_BASE =
  "w-full rounded-xl bg-surface-paper py-2.5 pl-11 font-body-md text-body-md text-text-ink transition-all placeholder:text-outline focus:bg-surface-card focus:outline-none focus:ring-2 focus:ring-primary-deep/25";
const SSO_BASE =
  "group flex flex-1 flex-col items-start justify-center rounded-xl bg-surface-paper p-3 text-left shadow-sm transition-all duration-200 hover:bg-surface-container-low";

/** Brand marks now live in @/components/auth/brand-marks so the two auth
 * screens cannot drift apart. Kept as a comment here to mark the handoff. */

/**
 * Left pane of the auth card. Real credentials go to InsForge; the role tabs,
 * password reveal, and submit-state choreography are local UI concerns.
 */
export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = React.useState<Role>("guru");
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">(
    "idle",
  );
  const [error, setError] = React.useState<string | null>(null);

  const copy = ROLE_COPY[role];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setStatus("loading");

    const { error: signInError } = await insforge.auth.signInWithPassword({
      email: identifier,
      password,
    });

    if (signInError) {
      setStatus("idle");
      // InsForge answers in English; the rest of this screen is Indonesian, so
      // the one failure a teacher actually hits gets translated by hand.
      setError(
        /invalid credentials/i.test(signInError.message ?? "")
          ? "Kredensial tidak dikenali. Periksa kembali email dinas dan kata sandi Anda."
          : signInError.message ||
              "Gagal masuk. Coba lagi beberapa saat atau hubungi helpdesk Dapodik.",
      );
      return;
    }

    // Mirror the reference's confirmation beat — the button turns green as the
    // navigation starts, so the label never promises something that isn't true.
    setStatus("success");
    router.push("/dashboard");
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
      label: copy.submitLabel,
      className: "bg-primary-deep hover:bg-primary-container hover:shadow-lg",
      spin: false,
    },
    loading: {
      icon: "progress_activity",
      label: "Memverifikasi Kredensial...",
      className: "bg-primary-deep",
      spin: true,
    },
    success: {
      icon: "check_circle",
      label: "Berhasil Masuk! Membuka Dashboard...",
      className: "bg-state-success",
      spin: false,
    },
  }[status];

  // Borderless inputs carry their error state as a ring, which reads as the
  // "crisp #EF4444 border" the design doc calls for without shifting layout.
  const fieldTone = error ? " ring-2 ring-state-error" : "";

  return (
    <div className="flex flex-col justify-between bg-surface-card p-4 sm:p-8 lg:col-span-7 lg:p-12">
      <div>
        {/* Role switching tabs */}
        <div
          role="tablist"
          aria-label="Pilih jenis akun"
          className="mb-6 inline-flex w-full rounded-xl bg-surface-container-low p-1 shadow-sm sm:w-auto"
        >
          {ROLES.map((value) => {
            const active = value === role;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setRole(value)}
                className={`${TAB_BASE} ${
                  active
                    ? "bg-surface-card text-primary-deep shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <Icon name={ROLE_COPY[value].tabIcon} className="text-[18px]" />
                <span>{ROLE_COPY[value].tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic header */}
        <div className="mb-6">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2 py-1 font-label-sm text-label-sm font-semibold text-kurikulum-merdeka">
            <Icon name="verified_user" className="text-[14px]" />
            <span>Portal Masuk Resmi Pengajar Terakreditasi</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg tracking-tight text-text-ink">
            {copy.title}
          </h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            {copy.subtitle}
          </p>
        </div>

        {/* SSO primary buttons */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className={`${SSO_BASE} relative overflow-hidden`}
          >
            <div className="mb-1 flex w-full items-center gap-2">
              <GoogleMark />
              <span className="font-headline-sm text-headline-sm text-text-ink transition-colors group-hover:text-primary-deep">
                Google SSO
              </span>
            </div>
            <span className="line-clamp-1 font-label-sm text-label-sm font-medium text-kurikulum-merdeka">
              Akun @guru.belajar.id / Gmail
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className={SSO_BASE}
          >
            <div className="mb-1 flex w-full items-center gap-2">
              <GitHubMark />
              <span className="font-headline-sm text-headline-sm text-text-ink transition-colors group-hover:text-primary-deep">
                GitHub Pendidik
              </span>
            </div>
            <span className="line-clamp-1 font-label-sm text-label-sm text-on-surface-variant">
              Guru SMK / IT / Vokasi
            </span>
          </button>
        </div>

        {/* Divider with clean rhythm */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="h-[1px] w-full bg-surface-container-high" />
          </div>
          <span className="relative bg-surface-card px-3 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            atau gunakan kredensial dinas
          </span>
        </div>

        {/* Form credentials */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="identifierInput"
              className="mb-1 block font-label-md text-label-md text-text-ink"
            >
              {copy.identifierLabel}
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-outline">
                <Icon name={copy.identifierIcon} className="text-[20px]" />
              </div>
              <input
                id="identifierInput"
                type="text"
                required
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={copy.identifierPlaceholder}
                className={`${INPUT_BASE} pr-3${fieldTone}`}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label
                htmlFor="passwordInput"
                className="font-label-md text-label-md text-text-ink"
              >
                Kata Sandi Akun
              </label>
              <Link
                href="/forgot-password"
                className="font-label-sm text-label-sm font-semibold text-primary-deep transition-colors hover:text-primary-container"
              >
                Lupa Kata Sandi?
              </Link>
            </div>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-outline">
                <Icon name="lock" className="text-[20px]" />
              </div>
              <input
                id="passwordInput"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi terdaftar..."
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "authError" : undefined}
                className={`${INPUT_BASE} pr-11${fieldTone}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                title="Lihat / Sembunyikan Sandi"
                aria-label={
                  showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"
                }
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-outline transition-colors hover:text-on-surface"
              >
                <Icon
                  name={showPassword ? "visibility_off" : "visibility"}
                  className="text-[20px]"
                />
              </button>
            </div>
          </div>

          {error ? (
            <p
              id="authError"
              role="alert"
              className="flex items-start gap-1.5 font-body-sm text-body-sm text-state-error"
            >
              <Icon name="error" className="mt-px text-[16px]" />
              <span>{error}</span>
            </p>
          ) : null}

          {/* Preferences & security badging */}
          <div className="flex flex-col justify-between gap-1 pt-1 sm:flex-row sm:items-center">
            <label className="flex cursor-pointer select-none items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded bg-surface-paper text-primary-deep focus:ring-primary-deep/20"
              />
              <span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                Ingat sesi di komputer sekolah ini
                <Icon
                  name="help"
                  className="text-[15px] text-outline"
                  title="Disarankan hanya dicentang pada laptop pribadi atau ruang guru aman"
                />
              </span>
            </label>
            <div className="inline-flex items-center gap-1 font-label-sm text-label-sm text-state-success">
              <Icon name="lock_clock" className="text-[14px]" />
              <span>Enkripsi SSL 256-bit &amp; UU PDP</span>
            </div>
          </div>

          {/* Primary submit button */}
          <button
            type="submit"
            disabled={status !== "idle"}
            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-headline-sm text-headline-sm text-on-primary shadow-md transition-all active:scale-[0.99] disabled:cursor-progress ${submit.className}`}
          >
            {status === "idle" ? (
              <>
                <span>{submit.label}</span>
                <Icon name={submit.icon} className="text-[20px]" />
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
      </div>

      {/* Helpdesk strip — the escape hatch for a locked belajar.id account */}
      <div className="mt-4 flex flex-col items-center justify-between gap-2 rounded-xl bg-surface-container-low/60 p-2 pt-3 sm:flex-row">
        <div className="flex items-center gap-2">
          <Icon name="support_agent" className="text-[20px] text-credit-amber" />
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Kendala akun belajar.id?
          </span>
        </div>
        <Link
          href="/help"
          className="flex items-center gap-1 font-label-sm text-label-sm font-semibold text-secondary hover:underline"
        >
          <span>Hubungi Helpdesk MGMP / Dapodik</span>
          <Icon name="open_in_new" className="text-[14px]" />
        </Link>
      </div>
    </div>
  );
}
