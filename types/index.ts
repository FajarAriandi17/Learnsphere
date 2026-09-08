/**
 * Frontend view types. These mirror the PRD data model closely enough for
 * the UI to be built against, but they are deliberately not the database
 * schema — the backend layer will own that.
 */

export type EducationLevel = "SD" | "SMP" | "SMA" | "SMK";

export type Semester = "1" | "2";

export type QuestionType =
  | "multiple_choice"
  | "true_false"
  | "short_answer"
  | "essay";

export type Difficulty = "mudah" | "sedang" | "sulit";

export type CognitiveLevel = "C1" | "C2" | "C3" | "C4" | "C5" | "C6";

export interface QuestionOption {
  label: string;
  text: string;
}

export interface Question {
  id: string;
  number: number;
  type: QuestionType;
  question: string;
  options?: QuestionOption[];
  answer: string;
  explanation: string;
  difficulty: Difficulty;
  topic: string;
  competency: string;
  cognitiveLevel: CognitiveLevel;
}

export type Language = "id" | "en";

/** The curriculum context that grounds every generation request. */
export interface GenerationContext {
  level: EducationLevel;
  grade: string;
  className: string;
  subject: string;
  curriculum: string;
  academicYear: string;
  semester: Semester;
  topic: string;
  count: number;
  types: QuestionType[];
  difficulty: Difficulty;
  /** PRD §15 — specific targets for this batch. */
  objective?: string;
  competency?: string;
  cognitiveLevels?: CognitiveLevel[];
  language?: Language;
  instructions?: string;
}

export type ChatRole = "teacher" | "assistant";

export type ChatStatus = "writing" | "done" | "failed";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  /** Plain text shown above any generated soal. */
  body: string;
  questions?: Question[];
  /** Snapshot of the context used, so older turns stay readable. */
  context?: GenerationContext;
  status: ChatStatus;
  createdAt: string;
}

export interface DashboardMetric {
  key: string;
  label: string;
  value: number;
  /** Change over the previous month, in absolute records. */
  delta?: number;
  unit?: string;
  href: string;
}

export type ActivityKind =
  | "exam"
  | "report"
  | "attendance"
  | "portfolio"
  | "student"
  | "export";

export interface ActivityEntry {
  id: string;
  kind: ActivityKind;
  text: string;
  detail: string;
  at: string;
}

/* ---------------------------------------------------------------- roster */

export type StudentStatus = "aktif" | "pindah" | "lulus";

export interface Student {
  id: string;
  nis: string;
  name: string;
  gender: "L" | "P";
  birthDate: string;
  classId: string;
  status: StudentStatus;
}

export interface ClassGroup {
  id: string;
  name: string;
  level: EducationLevel;
  grade: string;
  academicYear: string;
  semester: Semester;
  homeroomTeacher: string;
  studentCount: number;
  /** Classes this teacher actually teaches, as opposed to the whole school. */
  taught: boolean;
}

/* ------------------------------------------------------------------ soal */

export type ExamStatus = "draf" | "siap" | "diekspor";

/** One saved exam package, as listed in Bank Soal. */
export interface ExamSummary {
  id: string;
  title: string;
  template: string;
  subject: string;
  className: string;
  grade: string;
  topic: string;
  questionCount: number;
  types: QuestionType[];
  difficulty: Difficulty;
  status: ExamStatus;
  createdAt: string;
}

/** A single reusable item, separate from the package it came from. */
export interface BankItem {
  id: string;
  question: string;
  type: QuestionType;
  difficulty: Difficulty;
  cognitiveLevel: CognitiveLevel;
  subject: string;
  grade: string;
  topic: string;
  usedCount: number;
  source: "AI" | "Guru";
}

/* -------------------------------------------------------- administration */

export type AttendanceStatus = "H" | "S" | "I" | "A";

export interface ReportRow {
  studentId: string;
  knowledge: number;
  skills: number;
  note: string;
}

export type PortfolioKind =
  | "Projek"
  | "Kegiatan"
  | "Prestasi"
  | "Lomba"
  | "Sertifikat";

export interface PortfolioItem {
  id: string;
  studentId: string;
  kind: PortfolioKind;
  title: string;
  subject: string;
  description: string;
  teacherNote: string;
  date: string;
  evidence?: string;
}

export type DocumentFormat = "DOCX" | "PDF" | "XLSX";

export type DocumentStatus = "siap" | "diproses" | "gagal";

export interface GeneratedDocument {
  id: string;
  name: string;
  kind: string;
  format: DocumentFormat;
  size: string;
  context: string;
  status: DocumentStatus;
  createdAt: string;
}

/* --------------------------------------------------------------- billing */

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  /** Rupiah per month; null means the price is quoted per school. */
  monthly: number | null;
  /** Rupiah per month when billed yearly. */
  yearly: number | null;
  credits: string;
  students: string;
  note: string;
  cta: string;
  href: string;
  featured?: boolean;
}

export interface PlanFeatureRow {
  group: string;
  label: string;
  /** Keyed by plan id: a short string, or true/false for a plain yes/no. */
  values: Record<string, string | boolean>;
}

export type InvoiceStatus = "lunas" | "menunggu" | "gagal";

export interface Invoice {
  id: string;
  number: string;
  period: string;
  amount: number;
  method: string;
  status: InvoiceStatus;
  issuedAt: string;
}
