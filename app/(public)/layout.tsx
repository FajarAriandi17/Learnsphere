import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";

/**
 * Chrome for the unauthenticated routes (login, register, forgot password,
 * pricing). Deliberately quieter than the marketing header — a teacher landing
 * here is trying to get in, not to be sold to again.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col justify-between bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      <AuthHeader />
      <main className="relative flex w-full flex-1 flex-col pt-16">{children}</main>
      <AuthFooter />
    </div>
  );
}
