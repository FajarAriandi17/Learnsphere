"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navGroups } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * The rail's navigation. Active is said three ways — a solid primary fill,
 * white text, and `aria-current` — so the state never rests on colour alone.
 * The fill is the full row rather than a marker: on a white rail a tinted row
 * reads as hover, and a teacher scanning for "where am I" should not have to
 * compare two similar greys.
 */
export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Menu utama" className="space-y-5">
      {navGroups.map((group) => (
        <div key={group.heading}>
          <p className="mb-1.5 px-3 text-[10.5px] font-bold tracking-[0.04em] text-faint uppercase">
            {group.heading}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              if (!item.ready) {
                return (
                  <li key={item.href}>
                    <span
                      aria-disabled
                      title="Belum tersedia"
                      className="flex cursor-default items-center gap-2.5 rounded-[var(--radius-control)] px-3 py-2 text-[13.5px] text-faint/60"
                    >
                      <Icon aria-hidden className="size-[17px]" />
                      {item.label}
                    </span>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[var(--radius-control)] px-3 py-2 text-[13.5px] transition-colors",
                      active
                        ? "bg-primary font-semibold text-white"
                        : "text-ink-soft hover:bg-paper-deep hover:text-ink",
                    )}
                  >
                    <Icon
                      aria-hidden
                      className={cn(
                        "size-[17px]",
                        active ? "text-white" : "text-faint",
                      )}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
