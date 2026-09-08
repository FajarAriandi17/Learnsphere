-- EduSoal AI — Row Level Security + auth hooks (PRD §30 tenant isolation)
-- All helper functions are SECURITY DEFINER and pin search_path to break
-- recursive RLS. Every policy helper that touches an RLS-enabled table is
-- SECURITY DEFINER.

-- ---------------------------------------------------------------- helpers
CREATE OR REPLACE FUNCTION public.my_teacher_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT t.id
  FROM public.teachers t
  WHERE t.user_id = (SELECT auth.uid())
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.my_school_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT t.school_id
  FROM public.teachers t
  WHERE t.user_id = (SELECT auth.uid())
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.teachers t
    WHERE t.user_id = (SELECT auth.uid())
  )
$$;

-- ---------------------------------------------------------------- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_select ON public.profiles
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ---------------------------------------------------------------- schools
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY schools_owner ON public.schools
  FOR ALL TO authenticated
  USING (owner_id = (SELECT auth.uid()))
  WITH CHECK (owner_id = (SELECT auth.uid()));

CREATE POLICY schools_teacher_select ON public.schools
  FOR SELECT TO authenticated
  USING (id = (SELECT public.my_school_id()));

-- ---------------------------------------------------------------- teachers
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY teachers_select ON public.teachers
  FOR SELECT TO authenticated
  USING (
    user_id = (SELECT auth.uid())
    OR school_id = (SELECT public.my_school_id())
  );

CREATE POLICY teachers_insert ON public.teachers
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY teachers_update ON public.teachers
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ---------------------------------------------------------------- academic_years
ALTER TABLE public.academic_years ENABLE ROW LEVEL SECURITY;

CREATE POLICY academic_years_access ON public.academic_years
  FOR ALL TO authenticated
  USING (school_id = (SELECT public.my_school_id()))
  WITH CHECK (school_id = (SELECT public.my_school_id()));

-- ---------------------------------------------------------------- classes
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY classes_access ON public.classes
  FOR ALL TO authenticated
  USING (school_id = (SELECT public.my_school_id()))
  WITH CHECK (school_id = (SELECT public.my_school_id()));

-- ---------------------------------------------------------------- students
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY students_access ON public.students
  FOR ALL TO authenticated
  USING (school_id = (SELECT public.my_school_id()))
  WITH CHECK (school_id = (SELECT public.my_school_id()));

-- ---------------------------------------------------------------- subjects
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY subjects_read ON public.subjects
  FOR SELECT TO authenticated
  USING (true);

-- ---------------------------------------------------------------- curricula
ALTER TABLE public.curricula ENABLE ROW LEVEL SECURITY;

CREATE POLICY curricula_read ON public.curricula
  FOR SELECT TO authenticated
  USING (true);

-- ---------------------------------------------------------------- curriculum_topics
ALTER TABLE public.curriculum_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY curriculum_topics_read ON public.curriculum_topics
  FOR SELECT TO authenticated
  USING (true);

-- ---------------------------------------------------------------- exams
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY exams_access ON public.exams
  FOR ALL TO authenticated
  USING (school_id = (SELECT public.my_school_id()))
  WITH CHECK (school_id = (SELECT public.my_school_id()));

-- ---------------------------------------------------------------- exam_questions
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY exam_questions_access ON public.exam_questions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.exams e
      WHERE e.id = public.exam_questions.exam_id
        AND e.school_id = (SELECT public.my_school_id())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.exams e
      WHERE e.id = public.exam_questions.exam_id
        AND e.school_id = (SELECT public.my_school_id())
    )
  );

-- ---------------------------------------------------------------- report_cards
ALTER TABLE public.report_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY report_cards_access ON public.report_cards
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = public.report_cards.student_id
        AND s.school_id = (SELECT public.my_school_id())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = public.report_cards.student_id
        AND s.school_id = (SELECT public.my_school_id())
    )
  );

-- ---------------------------------------------------------------- report_card_scores
ALTER TABLE public.report_card_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY report_card_scores_access ON public.report_card_scores
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.report_cards rc
      JOIN public.students s ON s.id = rc.student_id
      WHERE rc.id = public.report_card_scores.report_card_id
        AND s.school_id = (SELECT public.my_school_id())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.report_cards rc
      JOIN public.students s ON s.id = rc.student_id
      WHERE rc.id = public.report_card_scores.report_card_id
        AND s.school_id = (SELECT public.my_school_id())
    )
  );

-- ---------------------------------------------------------------- attendance
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_access ON public.attendance
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = public.attendance.student_id
        AND s.school_id = (SELECT public.my_school_id())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = public.attendance.student_id
        AND s.school_id = (SELECT public.my_school_id())
    )
  );

-- ---------------------------------------------------------------- portfolios
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY portfolios_access ON public.portfolios
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = public.portfolios.student_id
        AND s.school_id = (SELECT public.my_school_id())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = public.portfolios.student_id
        AND s.school_id = (SELECT public.my_school_id())
    )
  );

-- ---------------------------------------------------------------- subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY subscriptions_owner ON public.subscriptions
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ---------------------------------------------------------------- ai_usage
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY ai_usage_owner ON public.ai_usage
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ---------------------------------------------------------------- generated_documents
ALTER TABLE public.generated_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY generated_documents_owner ON public.generated_documents
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ---------------------------------------------------------------- auth hook
-- Every new InsForge user gets a profile row so app code can resolve role
-- and school membership without a separate bootstrap step.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.profile->>'full_name', NEW.profile->>'name'),
    'teacher'
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();