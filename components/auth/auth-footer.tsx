import Link from "next/link";

const POLICY_LINKS = [
  { label: "Kebijakan Privasi Data Guru", href: "/privacy" },
  { label: "Ketentuan Layanan Asesmen", href: "/terms" },
  { label: "Panduan Kepatuhan", href: "/security" },
];

/**
 * One-line auth footer: copyright, the BSKAP quality-standard claim, and the
 * three policy links a school procurement officer looks for before signing in.
 */
export function AuthFooter() {
  return (
    <footer className="w-full bg-surface-container-low py-4 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left lg:px-8">
        <div className="flex flex-col gap-1 md:items-start">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            © 2026 Learnsphere • Ekosistem Evaluasi & Asesmen Pembelajaran Terpadu
          </span>
          <span className="font-label-sm text-label-sm text-outline">
            Kepatuhan Standar Asesmen Nasional • Permendikdasmen RI No. 12 Tahun 2024
          </span>
        </div>
        <div className="flex items-center gap-space-lg">
          {POLICY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
