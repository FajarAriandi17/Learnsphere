import { generateQuestions } from "./lib/mock/soal-generator";
import { GenerationContext } from "./types";

const ctx: GenerationContext = {
  level: "SMP",
  grade: "8",
  className: "VIII-A",
  subject: "Matematika",
  curriculum: "Kurikulum Merdeka",
  academicYear: "2026/2027",
  semester: "1",
  topic: "Teorema Pythagoras",
  count: 50,
  types: ["multiple_choice"],
  difficulty: "sedang",
};

const questions = generateQuestions(ctx, 0);
const questionsSet = new Set(questions.map(q => q.question));

if (questionsSet.size !== questions.length) {
    console.log("Found duplicates!", questions.length - questionsSet.size);
    const seen = new Set();
    questions.forEach((q, i) => {
        if (seen.has(q.question)) {
            console.log(`Duplicate at ${i}:`, q.question);
        }
        seen.add(q.question);
    });
} else {
    console.log("No duplicates.");
}
