import { BottomNav } from "@/components/shell/bottom-nav";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";

/**
 * The shell: a white rail on the left, the working column beside it, and a
 * bottom bar on small screens. The content column is capped at 1320px so
 * the rail plus the column never push the page past the reference's
 * maximum width, and the rail's 280px leaves the column an 8-column canvas.
 */
export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh bg-paper">
      <aside className="sticky top-4 hidden h-[calc(100dvh-2rem)] w-72 shrink-0 lg:block">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="min-w-0 flex-1 pb-24 lg:pb-0">{children}</main>
      </div>

      <BottomNav />
    </div>
  );
}