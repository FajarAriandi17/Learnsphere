import { competencyFor } from "@/lib/curriculum/reference";
import {
  templatesByTopic,
  type ItemSeed,
  type SeedTemplate,
} from "@/lib/mock/soal-bank";
import type {
  CognitiveLevel,
  GenerationContext,
  Question,
  QuestionType,
} from "@/types";

/**
 * SAMPLE GENERATOR — frontend only, no network call.
 *
 * Deliberately the single seam to the AI backend: replace the body of
 * `generateQuestions` with a call to the generation endpoint and every screen
 * keeps working, because both sides speak `Question[]`.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Fallback items for topics the sample bank has no hand-written template for,
 * and for filling the tail of a large request. Crossing six aspects with nine
 * classroom situations keeps every stem in a set distinct.
 */
const situations = [
  "penilaian harian",
  "latihan mandiri di rumah",
  "diskusi kelompok kecil",
  "kegiatan remedial",
  "penilaian tengah semester",
  "proyek sederhana di kelas",
  "kuis lisan singkat",
  "tugas terstruktur",
  "pengayaan bagi siswa cepat",
] as const;

interface GenericAspect {
  label: string;
  correct: string;
  wrong: [string, string, string];
  falseClaim: string;
  ask: string;
  why: string;
  cognitive: CognitiveLevel;
}

const aspects: GenericAspect[] = [
  {
    label: "pengertian dasar",
    correct: "konsepnya perlu dipahami sebelum dipakai mengerjakan soal",
    wrong: [
      "konsepnya cukup dihafal tanpa perlu contoh",
      "konsepnya hanya dipakai pada ujian akhir",
      "konsepnya berlaku untuk satu bentuk soal saja",
    ],
    falseClaim: "materi ini cukup dihafal tanpa memahami maknanya",
    ask: "Sebutkan dua ciri utama",
    why: "Pemahaman konsep menjadi dasar sebelum siswa mengerjakan soal apa pun.",
    cognitive: "C2",
  },
  {
    label: "urutan langkah penyelesaian",
    correct: "langkahnya ditulis berurutan agar hasilnya dapat diperiksa ulang",
    wrong: [
      "langkahnya boleh dilewati jika jawaban sudah terlihat",
      "langkahnya hanya perlu ditulis pada soal sulit",
      "langkahnya tidak memengaruhi ketepatan hasil",
    ],
    falseClaim: "langkah pengerjaan boleh dilewati jika jawabannya sudah terlihat",
    ask: "Tuliskan urutan langkah pengerjaan",
    why: "Langkah yang tertulis rapi memudahkan guru menemukan letak kesalahan siswa.",
    cognitive: "C3",
  },
  {
    label: "penerapan pada situasi nyata",
    correct: "konsepnya dapat dipakai menyelesaikan masalah sehari-hari",
    wrong: [
      "konsepnya hanya berlaku pada bilangan bulat positif",
      "konsepnya tidak berkaitan dengan kegiatan di luar kelas",
      "konsepnya hanya berguna untuk soal hitungan",
    ],
    falseClaim: "materi ini tidak berkaitan dengan masalah sehari-hari",
    ask: "Sebutkan dua contoh penerapan",
    why: "Materi ini dipelajari lewat konteks nyata, bukan sebatas hitungan di papan tulis.",
    cognitive: "C3",
  },
  {
    label: "kesalahan yang sering terjadi",
    correct: "kesalahan paling sering muncul karena informasi pada soal salah dibaca",
    wrong: [
      "kesalahan selalu berasal dari salah berhitung",
      "kesalahan tidak perlu dibahas ulang di kelas",
      "kesalahan hanya terjadi pada siswa yang belum belajar",
    ],
    falseClaim: "kesalahan siswa selalu berasal dari kesalahan berhitung",
    ask: "Sebutkan dua kesalahan yang sering terjadi pada",
    why: "Salah membaca informasi awal membuat seluruh langkah berikutnya ikut salah.",
    cognitive: "C4",
  },
  {
    label: "cara memeriksa hasil",
    correct: "hasil diperiksa dengan memasukkan kembali nilai yang diperoleh",
    wrong: [
      "hasil cukup dibandingkan dengan pekerjaan teman",
      "hasil tidak perlu diperiksa bila langkahnya sudah benar",
      "hasil diperiksa hanya pada soal bernilai besar",
    ],
    falseClaim: "hasil pekerjaan tidak perlu diperiksa ulang",
    ask: "Jelaskan singkat cara memeriksa kebenaran hasil",
    why: "Memasukkan kembali nilai yang diperoleh adalah cara paling langsung menguji hasil.",
    cognitive: "C4",
  },
  {
    label: "penarikan kesimpulan",
    correct: "kesimpulan ditulis sesuai pertanyaan, bukan sekadar angka akhir",
    wrong: [
      "kesimpulan cukup berupa angka akhir",
      "kesimpulan hanya ditulis pada soal cerita panjang",
      "kesimpulan bukan bagian dari penilaian",
    ],
    falseClaim: "kesimpulan cukup berupa angka akhir tanpa penjelasan",
    ask: "Tuliskan satu kesimpulan yang tepat untuk",
    why: "Kesimpulan menunjukkan siswa memahami yang ditanyakan, bukan hanya menghitung.",
    cognitive: "C5",
  },
];

function genericTemplate(topic: string, type: QuestionType): SeedTemplate {
  const material = topic.toLowerCase();

  return (variant) => {
    const aspect = aspects[Math.abs(variant) % aspects.length];
    const situation =
      situations[Math.floor(Math.abs(variant) / aspects.length) % situations.length];

    if (type === "true_false") {
      const truthful = variant % 2 === 1;
      return {
        type,
        question: `Dalam ${situation} tentang ${material}, ${truthful ? aspect.correct : aspect.falseClaim}.`,
        answer: truthful ? "Benar" : "Salah",
        statementIsTrue: truthful,
        explanation: truthful ? aspect.why : `Pernyataan ini salah. ${aspect.why}`,
        cognitive: aspect.cognitive,
      };
    }

    if (type === "short_answer") {
      return {
        type,
        question: `${aspect.ask} materi ${material} dalam konteks ${situation}.`,
        answer: `Jawaban yang menyebut ${aspect.label} pada ${material} secara tepat dan sesuai konteks ${situation}.`,
        explanation: aspect.why,
        cognitive: aspect.cognitive,
      };
    }

    if (type === "essay") {
      return {
        type,
        question: `Uraikan ${aspect.label} pada materi ${material}, lalu tunjukkan penerapannya dalam ${situation} di kelas Anda.`,
        answer: `Uraian ${aspect.label} yang runtut, disertai satu contoh penerapan pada ${situation}.`,
        explanation: `Kunci penilaian: ketepatan konsep, kelengkapan langkah, dan kesesuaian contoh. ${aspect.why}`,
        cognitive: aspect.cognitive,
      };
    }

    return {
      type: "multiple_choice",
      question: `Pada ${situation} materi ${material}, pernyataan yang paling tepat mengenai ${aspect.label} adalah …`,
      choices: [aspect.correct, ...aspect.wrong],
      explanation: aspect.why,
      cognitive: aspect.cognitive,
    };
  };
}

const LABELS = ["A", "B", "C", "D"] as const;

function toQuestion(
  seed: ItemSeed,
  number: number,
  ctx: GenerationContext,
  rand: () => number,
): Question {
  const shared = {
    id: `q-${number}-${hash(`${seed.question}${number}`)}`,
    number,
    type: seed.type,
    question: seed.question,
    explanation: seed.explanation,
    difficulty: ctx.difficulty,
    topic: ctx.topic,
    competency: competencyFor(ctx.subject, ctx.topic),
    cognitiveLevel: seed.cognitive,
  };

  if (seed.type === "multiple_choice" && seed.choices) {
    const correct = seed.choices[0];
    const shuffled = [...seed.choices]
      .map((text) => ({ text, order: rand() }))
      .sort((a, b) => a.order - b.order)
      .map((entry) => entry.text);
    const options = shuffled.map((text, index) => ({
      label: LABELS[index],
      text,
    }));
    const key = options.find((option) => option.text === correct);
    // For option-based items `answer` holds the label only; the screens compose
    // "A. …" from `options` so an edited option text can never drift from it.
    return { ...shared, options, answer: key ? key.label : LABELS[0] };
  }

  if (seed.type === "true_false") {
    return {
      ...shared,
      options: [
        { label: "A", text: "Benar" },
        { label: "B", text: "Salah" },
      ],
      answer: seed.statementIsTrue ? "A" : "B",
    };
  }

  return { ...shared, answer: seed.answer ?? "" };
}

function wantedTypes(ctx: GenerationContext): QuestionType[] {
  return ctx.types.length ? ctx.types : ["multiple_choice"];
}

/**
 * Templates that can serve this request: the hand-written ones for the topic
 * whose type was asked for, plus a generic template for each requested type the
 * bank does not cover. A template's type is read by running variant 0.
 */
function pool(ctx: GenerationContext): SeedTemplate[] {
  const wanted = wantedTypes(ctx);
  const bank = templatesByTopic[ctx.topic.trim().toLowerCase()] ?? [];
  const matching = bank.filter((template) => wanted.includes(template(0).type));
  const uncovered = wanted.filter(
    (type) => !matching.some((template) => template(0).type === type),
  );
  const fallbacks = (matching.length ? uncovered : wanted).map((type) =>
    genericTemplate(ctx.topic, type),
  );
  return [...matching, ...fallbacks];
}

/**
 * Walks unique (template, variant) pairs so a request for 40 soal yields 40
 * different questions. When the hand-written templates run out of variants, the
 * generic template of the same type fills the tail rather than repeating.
 */
export function generateQuestions(
  ctx: GenerationContext,
  offset = 0,
): Question[] {
  const rand = mulberry32(
    hash(`${ctx.subject}${ctx.topic}${ctx.count}${ctx.difficulty}${offset}`),
  );
  const templates = pool(ctx);
  const seen = new Set<string>();
  const questions: Question[] = [];
  let filler = 0;

  for (let index = 0; index < ctx.count; index += 1) {
    const step = index + offset;
    const template = templates[step % templates.length];

    // Always use a generic template if the hand-written one is exhausted,
    // to ensure we always have fresh, non-duplicate questions.
    const isExhausted = Math.floor(step / templates.length) >= 1;
    let seed = isExhausted
      ? genericTemplate(ctx.topic, template(0).type)(index)
      : template(Math.floor(step / templates.length));

    if (seen.has(seed.question)) {
      const spare = genericTemplate(ctx.topic, seed.type);
      let attempts = 0;
      do {
        seed = spare(filler);
        filler += 1;
        attempts += 1;
      } while (seen.has(seed.question) && attempts < 400);
    }

    seen.add(seed.question);
    questions.push(toQuestion(seed, index + 1, ctx, rand));
  }

  return questions;
}

/** One replacement item, different on every attempt. */
export function regenerateQuestion(
  ctx: GenerationContext,
  number: number,
  attempt: number,
): Question {
  const rand = mulberry32(hash(`${ctx.topic}${number}${attempt}`));
  const templates = pool(ctx);
  const step = number + attempt * (templates.length + 1);
  const template = templates[step % templates.length];
  return toQuestion(
    template(Math.floor(step / templates.length)),
    number,
    ctx,
    rand,
  );
}
