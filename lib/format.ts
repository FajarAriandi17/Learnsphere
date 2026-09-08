import type {
  CognitiveLevel,
  Difficulty,
  QuestionOption,
  QuestionType,
} from "@/types";

const numbers = new Intl.NumberFormat("id-ID");

export function formatNumber(value: number) {
  return numbers.format(value);
}

/** "4 Sep" / "4 Sep 2025" — short enough to sit inside a ledger row. */
export function formatShortDate(iso: string, withYear = false) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
  }).format(date);
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** "Rp35.000" — whole rupiah, no decimals, as prices are written in Indonesia. */
export function formatRupiah(value: number) {
  return `Rp${numbers.format(Math.round(value))}`;
}

/** "September 2026" — the heading of an attendance or billing period. */
export function formatMonth(year: number, month: number) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
}

/** "95,2%" — one decimal and a comma, the way a raport prints a percentage. */
export function formatPercent(value: number, digits = 1) {
  return `${new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)}%`;
}

export function formatRelative(iso: string, now = new Date()) {
  const minutes = Math.round((now.getTime() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  return formatShortDate(iso);
}

/**
 * Today in WIB as plain calendar parts — the anchor a month grid needs. Read
 * through `formatToParts` so the result never depends on a locale's date order.
 */
export function jakartaToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const read = (type: "year" | "month" | "day") =>
    Number(parts.find((part) => part.type === type)?.value ?? "1");

  const year = read("year");
  const month = read("month");
  const day = read("day");

  return {
    year,
    /** Zero-based, to match `new Date(year, month, day)`. */
    month: month - 1,
    day,
    iso: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
  };
}

export const questionTypeLabel: Record<QuestionType, string> = {
  multiple_choice: "Pilihan ganda",
  true_false: "Benar / salah",
  short_answer: "Jawaban singkat",
  essay: "Uraian",
};

export const difficultyLabel: Record<Difficulty, string> = {
  mudah: "Mudah",
  sedang: "Sedang",
  sulit: "Sulit",
};

/** Bloom levels as Indonesian teachers write them on a kisi-kisi. */
export const cognitiveLabel: Record<CognitiveLevel, string> = {
  C1: "C1 Mengingat",
  C2: "C2 Memahami",
  C3: "C3 Menerapkan",
  C4: "C4 Menganalisis",
  C5: "C5 Mengevaluasi",
  C6: "C6 Mencipta",
};

/**
 * How a key is printed. For option-based items `answer` stores the label only,
 * so the text is read back from `options` and stays correct after an edit.
 */
export function answerText(question: {
  answer: string;
  options?: QuestionOption[];
}) {
  const option = question.options?.find((o) => o.label === question.answer);
  return option ? `${option.label}. ${option.text}` : question.answer;
}

export function greetingForHour(hour: number) {
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 19) return "Selamat sore";
  return "Selamat malam";
}

/**
 * Everything time-of-day is read in WIB. The product is Indonesian-first, and
 * pinning the zone keeps server and client output identical.
 */
export function jakartaNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "8");

  return {
    hour,
    greeting: greetingForHour(hour),
    dateLabel: new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now),
  };
}
