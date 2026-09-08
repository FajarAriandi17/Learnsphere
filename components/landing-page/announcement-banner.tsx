import { Icon } from "./icon";

export function AnnouncementBanner() {
  return (
    <div className="sticky top-0 z-50 border-b border-border-subtle/10 bg-gradient-to-r from-teal-900 via-kurikulum-k13 to-sky-800 px-4 py-2 text-xs text-on-primary shadow-sm sm:text-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-credit-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-surface">
            Baru 2025/2026
          </span>
          <span className="truncate font-medium tracking-wide">
            Pembaruan Regulasi Kemendikdasmen: Sinkronisasi Capaian Pembelajaran
            (CP 032/033) Fase A–F &amp; K13 siap ekspor Word/PDF A4 rapi.
          </span>
        </div>
        <a
          href="#demo-simulator"
          className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-on-surface-variant underline underline-offset-4 transition-colors hover:text-on-primary md:inline-flex"
        >
          <span>Coba Simulator</span>
          <Icon name="arrow_forward" className="text-[14px]" />
        </a>
      </div>
    </div>
  );
}
