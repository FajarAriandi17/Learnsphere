import { topicsFor } from "@/lib/curriculum/reference";
import type { Difficulty, GenerationContext, QuestionType } from "@/types";

/**
 * Reads what the teacher typed and folds it into the generation context, so
 * "buat 10 soal uraian statistika" updates the side panel instead of being
 * silently ignored. Runs on the client; the real backend will do the same job
 * from the model side and this becomes a fallback.
 */

const typeKeywords: Array<[RegExp, QuestionType]> = [
  [/pilihan ganda|pilgan|multiple choice/i, "multiple_choice"],
  [/benar[\s-]*salah|true[\s-]*false/i, "true_false"],
  [/jawaban singkat|isian singkat|isian/i, "short_answer"],
  [/uraian|esai|essay/i, "essay"],
];

const difficultyKeywords: Array<[RegExp, Difficulty]> = [
  [/mudah|gampang|dasar/i, "mudah"],
  [/sulit|susah|hots|menantang|tingkat tinggi/i, "sulit"],
  [/sedang|menengah/i, "sedang"],
];

const subjectKeywords: Array<[RegExp, string]> = [
  [/matematika/i, "Matematika"],
  [/bahasa indonesia/i, "Bahasa Indonesia"],
  [/bahasa inggris/i, "Bahasa Inggris"],
  [/ipa|ilmu pengetahuan alam/i, "Ilmu Pengetahuan Alam"],
  [/ips|ilmu pengetahuan sosial/i, "Ilmu Pengetahuan Sosial"],
  [/pancasila/i, "Pendidikan Pancasila"],
  [/informatika/i, "Informatika"],
  [/seni budaya/i, "Seni Budaya"],
  [/penjas|pendidikan jasmani/i, "Pendidikan Jasmani"],
];

/**
 * Picks the closest curriculum topic to what the teacher wrote. A full phrase
 * match wins outright; otherwise the candidate sharing the most significant
 * words wins, so "soal relasi fungsi" still lands on "Relasi dan fungsi".
 */
function pickTopic(lower: string, candidates: string[]): string | undefined {
  let best: string | undefined;
  let bestScore = 0;

  for (const candidate of candidates) {
    const head = candidate.toLowerCase().split(/[:,]/)[0].trim();
    if (head && lower.includes(head)) return candidate;

    const words = head.split(/\s+/).filter((word) => word.length > 3);
    const score = words.filter((word) => lower.includes(word)).length;
    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  return bestScore > 0 ? best : undefined;
}

export function applyIntent(
  text: string,
  base: GenerationContext,
): GenerationContext {
  const next = { ...base };

  const count = text.match(/(\d{1,3})\s*(soal|butir|pertanyaan|nomor)/i);
  if (count) next.count = Number(count[1]);

  const types = typeKeywords
    .filter(([pattern]) => pattern.test(text))
    .map(([, type]) => type);
  if (types.length) next.types = types;

  const difficulty = difficultyKeywords.find(([pattern]) => pattern.test(text));
  if (difficulty) next.difficulty = difficulty[1];

  const subject = subjectKeywords.find(([pattern]) => pattern.test(text));
  if (subject) {
    next.subject = subject[1];
    console.log("Subject detected:", subject[1]);
  }

  const rombel = text.match(/\b((?:VII|VIII|IX|X|XI|XII)-[A-Z])\b/);
  if (rombel) next.className = rombel[1];

  console.log("Calling topicsFor with:", next.subject, next.grade);
  const topic = pickTopic(
    text.toLowerCase(),
    topicsFor(next.subject, next.grade),
  );
  if (topic) {
    next.topic = topic;
    console.log("Topic detected:", topic);
  }

  return next;
}

export const MAX_PER_REQUEST = 50;

/** Returns a reason when the request cannot be run as asked. */
export function validate(ctx: GenerationContext): string | null {
  if (!ctx.topic.trim()) {
    return "Materi belum dipilih. Pilih materi di panel konteks, atau sebutkan materinya di pesan Anda.";
  }
  if (ctx.count > MAX_PER_REQUEST) {
    return `Sekali proses maksimal ${MAX_PER_REQUEST} soal supaya hasilnya tetap rapi dan bisa Anda periksa. Untuk jumlah lebih besar, buat beberapa paket.`;
  }
  return null;
}
