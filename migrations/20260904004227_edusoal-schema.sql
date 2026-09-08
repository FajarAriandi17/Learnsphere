-- EduSoal AI — PRD §29 database schema
-- Migration runs as project_admin against public.
-- No BEGIN/COMMIT/ROLLBACK: the backend wraps each migration in its own transaction.

-- ---------------------------------------------------------------- profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id      UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT,
  avatar_url   TEXT,
  role         TEXT NOT NULL DEFAULT 'teacher',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- schools
CREATE TABLE IF NOT EXISTS public.schools (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  npsn           TEXT,
  address        TEXT,
  city           TEXT,
  province       TEXT,
  logo_url       TEXT,
  principal_name TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- teachers
CREATE TABLE IF NOT EXISTS public.teachers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id    UUID REFERENCES public.schools(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  nip          TEXT,
  subject      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- academic_years
CREATE TABLE IF NOT EXISTS public.academic_years (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id    UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  is_active    BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- classes
CREATE TABLE IF NOT EXISTS public.classes (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id          UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  academic_year_id   UUID REFERENCES public.academic_years(id) ON DELETE SET NULL,
  level              TEXT NOT NULL,
  grade              TEXT NOT NULL,
  class_name         TEXT NOT NULL,
  homeroom_teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- students
CREATE TABLE IF NOT EXISTS public.students (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id        UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  class_id         UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  academic_year_id UUID REFERENCES public.academic_years(id) ON DELETE SET NULL,
  nis              TEXT,
  name             TEXT NOT NULL,
  gender           TEXT,
  birth_date       DATE,
  status           TEXT NOT NULL DEFAULT 'aktif',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- subjects
CREATE TABLE IF NOT EXISTS public.subjects (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  education_level TEXT,
  active         BOOLEAN NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- curricula
CREATE TABLE IF NOT EXISTS public.curricula (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  version       TEXT,
  academic_year TEXT,
  active        BOOLEAN NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- curriculum_topics
CREATE TABLE IF NOT EXISTS public.curriculum_topics (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curriculum_id       UUID REFERENCES public.curricula(id) ON DELETE CASCADE,
  level               TEXT,
  grade               TEXT,
  subject_id          UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  semester            TEXT,
  topic               TEXT,
  competency          TEXT,
  learning_objective  TEXT
);

-- ---------------------------------------------------------------- exams
CREATE TABLE IF NOT EXISTS public.exams (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id         UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  teacher_id        UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  class_id          UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  subject_id        UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  curriculum_id     UUID REFERENCES public.curricula(id) ON DELETE SET NULL,
  academic_year_id  UUID REFERENCES public.academic_years(id) ON DELETE SET NULL,
  semester          TEXT,
  title             TEXT NOT NULL,
  question_count    INTEGER,
  status            TEXT NOT NULL DEFAULT 'draf',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- exam_questions
CREATE TABLE IF NOT EXISTS public.exam_questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id         UUID REFERENCES public.exams(id) ON DELETE CASCADE,
  question_number INTEGER,
  question_type   TEXT,
  question        TEXT,
  options         JSONB,
  answer          TEXT,
  explanation     TEXT,
  difficulty      TEXT,
  topic           TEXT,
  competency      TEXT,
  cognitive_level TEXT
);

-- ---------------------------------------------------------------- report_cards
CREATE TABLE IF NOT EXISTS public.report_cards (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id        UUID REFERENCES public.students(id) ON DELETE CASCADE,
  teacher_id        UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  academic_year_id  UUID REFERENCES public.academic_years(id) ON DELETE SET NULL,
  semester          TEXT,
  template_id       UUID,
  status            TEXT NOT NULL DEFAULT 'draft',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- report_card_scores
CREATE TABLE IF NOT EXISTS public.report_card_scores (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_card_id  UUID REFERENCES public.report_cards(id) ON DELETE CASCADE,
  subject_id      UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  knowledge       NUMERIC(5,2),
  skills          NUMERIC(5,2),
  grade           TEXT,
  teacher_note    TEXT
);

-- ---------------------------------------------------------------- attendance
CREATE TABLE IF NOT EXISTS public.attendance (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID REFERENCES public.students(id) ON DELETE CASCADE,
  class_id    UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  status      TEXT NOT NULL,
  note        TEXT
);

-- ---------------------------------------------------------------- portfolios
CREATE TABLE IF NOT EXISTS public.portfolios (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id    UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  achievement   TEXT,
  teacher_note  TEXT,
  evidence_url  TEXT,
  date          DATE
);

-- ---------------------------------------------------------------- subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan        TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active',
  started_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ
);

-- ---------------------------------------------------------------- ai_usage
CREATE TABLE IF NOT EXISTS public.ai_usage (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action       TEXT,
  credits_used NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------- generated_documents
CREATE TABLE IF NOT EXISTS public.generated_documents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT,
  source_id     UUID,
  format        TEXT,
  file_url      TEXT,
  status        TEXT NOT NULL DEFAULT 'queued',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);