import type { CognitiveLevel, QuestionType } from "@/types";

/**
 * SAMPLE ITEM BANK — frontend only.
 *
 * Stand-in for model output so the review, edit and export interactions can be
 * built and judged against realistic items. Each entry is a template: it takes
 * a variant index and returns one concrete item, so a request for 40 soal gets
 * 40 different questions instead of the same handful repeated. When the real
 * generation endpoint exists, `lib/mock/soal-generator` calls it instead and
 * this file is deleted.
 */

export interface ItemSeed {
  question: string;
  type: QuestionType;
  /** Four choices, correct one first — the generator shuffles them. */
  choices?: [string, string, string, string];
  /** For non-multiple-choice items. */
  answer?: string;
  explanation: string;
  cognitive: CognitiveLevel;
  statementIsTrue?: boolean;
}

/** Turns a variant index into one concrete item. */
export type SeedTemplate = (variant: number) => ItemSeed;

const decimal = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 });
const num = (value: number) => decimal.format(value);
const rupiah = (value: number) =>
  `Rp${new Intl.NumberFormat("id-ID").format(value)}`;

function at<T>(list: readonly T[], variant: number): T {
  return list[((variant % list.length) + list.length) % list.length];
}

/** Four distinct options, correct one first; spare candidates cover collisions. */
function options(
  correct: string,
  ...candidates: string[]
): [string, string, string, string] {
  const out = [correct];
  for (const candidate of candidates) {
    if (out.length === 4) break;
    if (!out.includes(candidate)) out.push(candidate);
  }
  return out as [string, string, string, string];
}

const triples: ReadonlyArray<readonly [number, number, number]> = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [7, 24, 25],
  [12, 16, 20],
  [10, 24, 26],
  [20, 21, 29],
  [15, 20, 25],
  [12, 35, 37],
  [18, 24, 30],
];

const pythagoras: SeedTemplate[] = [
  (v) => {
    const [a, b, c] = at(triples, v);
    const [foot, height, ladder] = [a / 2, b / 2, c / 2];
    return {
      type: "multiple_choice",
      question: `Sebuah tangga bersandar pada dinding. Ujung bawah tangga berjarak ${num(foot)} m dari dinding dan ujung atasnya berada ${num(height)} m di atas tanah. Berapa panjang tangga tersebut?`,
      choices: options(
        `${num(ladder)} m`,
        `${num(foot + height)} m`,
        `${num(ladder + 1)} m`,
        `${num(ladder - 0.5)} m`,
        `${num(ladder + 2)} m`,
        `${num(ladder + 3)} m`,
      ),
      explanation: `Panjang tangga adalah sisi miring: √(${num(foot)}² + ${num(height)}²) = √${num(foot * foot + height * height)} = ${num(ladder)} m.`,
      cognitive: "C3",
    };
  },
  (v) => {
    const [a, b, c] = at(triples, v);
    return {
      type: "multiple_choice",
      question: `Diketahui segitiga dengan panjang sisi ${a} cm, ${b} cm, dan ${c} cm. Jenis segitiga tersebut adalah …`,
      choices: options(
        `siku-siku, karena ${a}² + ${b}² = ${c}²`,
        `lancip, karena ${a}² + ${b}² > ${c}²`,
        `tumpul, karena ${a}² + ${b}² < ${c}²`,
        "sama kaki, karena dua sisinya sebanding",
      ),
      explanation: `${a * a} + ${b * b} = ${c * c} dan ${c}² = ${c * c}, sehingga segitiga ini siku-siku.`,
      cognitive: "C4",
    };
  },
  (v) => {
    const [a, b, c] = at(triples, v);
    const truthful = v % 2 === 0;
    const shown = truthful ? c : c + 1;
    return {
      type: "true_false",
      question: `Panjang diagonal sebuah persegi panjang berukuran ${b} cm × ${a} cm adalah ${shown} cm.`,
      answer: truthful ? "Benar" : "Salah",
      statementIsTrue: truthful,
      explanation: `√(${b}² + ${a}²) = √${c * c} = ${c} cm, jadi pernyataan tersebut ${truthful ? "benar" : "salah"}.`,
      cognitive: "C2",
    };
  },
  (v) => {
    const [a, b, c] = at(triples, v);
    return {
      type: "short_answer",
      question: `Sebuah kapal berlayar ${b} km ke arah utara, lalu ${a} km ke arah timur. Hitung jarak terdekat kapal dari titik awal.`,
      answer: `${c} km, karena √(${b}² + ${a}²) = √${c * c} = ${c}.`,
      explanation: `Lintasan membentuk segitiga siku-siku dengan kaki ${b} km dan ${a} km, sehingga jarak terdekatnya ${c} km.`,
      cognitive: "C3",
    };
  },
  (v) => {
    const [a, b, c] = at(triples, v);
    return {
      type: "essay",
      question: `Jelaskan langkah-langkah menentukan apakah tripel (${a}, ${b}, ${c}) merupakan tripel Pythagoras, lalu sebutkan satu contoh tripel lain yang sebanding.`,
      answer: `Kuadratkan dua sisi terpendek (${a * a} + ${b * b} = ${c * c}), lalu bandingkan dengan kuadrat sisi terpanjang (${c}² = ${c * c}). Karena hasilnya sama, (${a}, ${b}, ${c}) adalah tripel Pythagoras. Tripel sebanding: (${a * 2}, ${b * 2}, ${c * 2}).`,
      explanation:
        "Kunci penilaian: prosedur pengkuadratan, pembandingan hasil, dan satu tripel kelipatan yang benar.",
      cognitive: "C4",
    };
  },
];

const diceEvents = [
  { label: "bilangan prima", members: "2, 3, dan 5", count: 3 },
  { label: "bilangan ganjil", members: "1, 3, dan 5", count: 3 },
  { label: "bilangan lebih dari 4", members: "5 dan 6", count: 2 },
  { label: "kelipatan 3", members: "3 dan 6", count: 2 },
  { label: "bilangan kurang dari 3", members: "1 dan 2", count: 2 },
  { label: "bilangan genap", members: "2, 4, dan 6", count: 3 },
] as const;

const statistika: SeedTemplate[] = [
  (v) => {
    const base = at([65, 70, 60, 75, 55, 80], v);
    const data = [
      base,
      base + 5,
      base + 10,
      base + 10,
      base + 15,
      base + 20,
      base + 20,
      base + 20,
    ];
    return {
      type: "multiple_choice",
      question: `Nilai ulangan delapan siswa: ${data.join(", ")}. Modus dari data tersebut adalah …`,
      choices: options(
        `${base + 20}`,
        `${base + 10}`,
        `${num(base + 12.5)}`,
        `${base + 15}`,
        `${base + 5}`,
      ),
      explanation: `Nilai ${base + 20} muncul tiga kali, lebih sering daripada nilai lainnya.`,
      cognitive: "C2",
    };
  },
  (v) => {
    const size = at([10, 12, 15, 20, 25], v);
    const mean = at([78, 80, 75, 82], v);
    const extra = at([90, 95, 88, 100], v);
    const total = size * mean + extra;
    const joined = Math.round((total / (size + 1)) * 100) / 100;
    return {
      type: "multiple_choice",
      question: `Rata-rata nilai ${size} siswa adalah ${mean}. Setelah satu siswa dengan nilai ${extra} bergabung, rata-rata kelas menjadi …`,
      choices: options(
        num(joined),
        num(mean),
        num((mean + extra) / 2),
        num(joined + 1),
        num(mean + 1),
      ),
      explanation: `Jumlah nilai awal ${num(size * mean)}, ditambah ${extra} menjadi ${num(total)}, lalu dibagi ${size + 1} sehingga hasilnya ${num(joined)}.`,
      cognitive: "C3",
    };
  },
  (v) => {
    const start = at([4, 5, 6, 3, 7, 8], v);
    const data = [start, start + 3, start + 5, start + 8, start + 11, start + 14];
    const median = start + 6.5;
    const truthful = v % 2 === 0;
    const shown = truthful ? median : median + 1;
    return {
      type: "true_false",
      question: `Median dari data ${data.join(", ")} adalah rata-rata dua nilai tengahnya, yaitu ${num(shown)}.`,
      answer: truthful ? "Benar" : "Salah",
      statementIsTrue: truthful,
      explanation: `Data berjumlah genap, dua nilai tengahnya ${start + 5} dan ${start + 8}, sehingga median (${start + 5} + ${start + 8})/2 = ${num(median)}.`,
      cognitive: "C2",
    };
  },
  (v) => {
    const event = at(diceEvents, v);
    const chance = event.count === 3 ? "1/2" : "1/3";
    return {
      type: "short_answer",
      question: `Sebuah dadu dilempar satu kali. Tentukan peluang muncul mata dadu ${event.label}.`,
      answer: `${chance}, karena mata dadu ${event.label} adalah ${event.members} sehingga peluangnya ${event.count}/6.`,
      explanation: `Kejadian yang diharapkan ada ${event.count} dari 6 hasil yang mungkin.`,
      cognitive: "C3",
    };
  },
  (v) => {
    const subject = at(
      [
        "tinggi badan siswa",
        "nilai ulangan siswa",
        "lama waktu belajar siswa",
        "pengeluaran jajan siswa",
        "berat badan siswa",
      ],
      v,
    );
    return {
      type: "essay",
      question: `Data ${subject} disajikan dalam tabel dan terdapat satu nilai yang jauh lebih besar daripada yang lain. Uraikan mengapa median lebih tepat digunakan daripada rata-rata untuk data seperti ini.`,
      answer:
        "Karena rata-rata ikut tertarik oleh nilai pencilan, sedangkan median hanya bergantung pada posisi tengah data sehingga lebih mewakili sebagian besar siswa.",
      explanation:
        "Kunci penilaian: menyebut pengaruh pencilan pada rata-rata dan sifat median yang tahan terhadap pencilan.",
      cognitive: "C5",
    };
  },
];

const spldv: SeedTemplate[] = [
  (v) => {
    const book = at([6000, 7500, 8000, 5000, 9000], v);
    const pencil = at([3000, 2500, 2000, 3500], v);
    const first = 2 * book + 3 * pencil;
    const second = book + 2 * pencil;
    return {
      type: "multiple_choice",
      question: `Harga 2 buku dan 3 pensil ${rupiah(first)}. Harga 1 buku dan 2 pensil ${rupiah(second)}. Harga satu buku adalah …`,
      choices: options(
        rupiah(book),
        rupiah(pencil),
        rupiah(book + pencil),
        rupiah(book + 500),
        rupiah(book - 500),
        rupiah(book + 1000),
      ),
      explanation: `Dari 2b + 3p = ${num(first)} dan b + 2p = ${num(second)} diperoleh b = ${num(book)} dan p = ${num(pencil)}.`,
      cognitive: "C3",
    };
  },
  (v) => {
    const sum = at([10, 12, 14, 16, 20, 24], v);
    const difference = at([2, 4, 6, 8], v);
    const x = (sum + difference) / 2;
    const y = (sum - difference) / 2;
    const truthful = v % 2 === 0;
    return {
      type: "true_false",
      question: `Sistem persamaan x + y = ${sum} dan x − y = ${difference} memiliki penyelesaian x = ${truthful ? x : x + 1} dan y = ${y}.`,
      answer: truthful ? "Benar" : "Salah",
      statementIsTrue: truthful,
      explanation: `Menjumlahkan kedua persamaan memberi 2x = ${sum + difference}, sehingga x = ${x} dan y = ${y}; pernyataan tersebut ${truthful ? "benar" : "salah"}.`,
      cognitive: "C2",
    };
  },
  (v) => {
    const sum = at([27, 31, 35, 29, 41], v);
    const difference = at([5, 7, 9, 3], v);
    return {
      type: "short_answer",
      question: `Tuliskan sistem persamaan linear dua variabel dari pernyataan berikut: jumlah dua bilangan ${sum} dan selisihnya ${difference}.`,
      answer: `x + y = ${sum} dan x − y = ${difference}, dengan penyelesaian x = ${(sum + difference) / 2} dan y = ${(sum - difference) / 2}.`,
      explanation:
        "Menerjemahkan kalimat menjadi model matematika, lalu menyelesaikannya dengan eliminasi.",
      cognitive: "C3",
    };
  },
  (v) => {
    const method = at(
      ["eliminasi", "substitusi", "grafik", "gabungan eliminasi dan substitusi"],
      v,
    );
    const x = at([2, 3, 4, 5], v);
    const y = at([1, 2, 3], v);
    const k = at([2, 3], v);
    return {
      type: "essay",
      question: `Diberikan sistem persamaan x + ${k}y = ${x + k * y} dan ${k}x + y = ${k * x + y}. Jelaskan langkah penyelesaiannya dengan metode ${method}, lalu tunjukkan hasilnya.`,
      answer: `Dengan metode ${method} diperoleh x = ${x} dan y = ${y}. Kedua nilai disubstitusikan kembali ke persamaan awal untuk memastikan hasilnya konsisten.`,
      explanation: `Kunci penilaian: ketepatan langkah metode ${method}, hasil x dan y yang benar, dan pemeriksaan hasil.`,
      cognitive: "C4",
    };
  },
];

export const templatesByTopic: Record<string, SeedTemplate[]> = {
  "teorema pythagoras": pythagoras,
  "statistika: mean, median, modus": statistika,
  "peluang sederhana": statistika,
  "sistem persamaan linear dua variabel": spldv,
  "analisis data dan peluang": statistika,
};
