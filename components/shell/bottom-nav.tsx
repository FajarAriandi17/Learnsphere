"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mobileNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * PRD §33 — the five modules that earn a thumb-reachable slot on a phone. It
 * floats as a light panel with the rail's radius so the mobile shell reads as
 * the same product, and it sits above the iOS home indicator.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Menu utama"
      className="fixed inset-x-0 bottom-0 z-30 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <ul className="flex items-stretch gap-0.5 rounded-[var(--radius-rail)] bg-sheet p-1 shadow-float">
        {mobileNavItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-[var(--radius-control)] px-1 py-2 transition-colors",
                  active
                    ? "bg-primary-soft text-primary-ink"
                    : "text-faint hover:bg-paper-deep hover:text-ink",
                )}
              >
                <Icon
                  aria-hidden
                  className={cn("size-[19px]", active && "text-primary")}
                />
                <span
                  className={cn(
                    "text-[10.5px] leading-none",
                    active && "font-semibold",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}