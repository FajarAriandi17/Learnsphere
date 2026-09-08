# PRD.md — EduSoal AI
## AI Exam Generator & Teacher Administration SaaS for Indonesian Education

**Document Version:** 1.0  
**Date:** 4 September 2026  
**Product Type:** B2C/B2B2C SaaS for Teachers & Educational Institutions  
**Primary Market:** Indonesian teachers  
**Secondary Market:** Schools, tutoring institutions, education foundations, and small education teams

---

## 1. Product Summary

**EduSoal AI** is an affordable SaaS web application that helps Indonesian teachers create school assessment materials and manage essential student academic administration with AI.

The core product is not only an AI question generator. It is a lightweight **Teacher Productivity & Academic Administration platform** containing:

1. AI Exam/Question Generator
2. Answer Key & Explanation Generator
3. Curriculum-aware Question Generation
4. Report Card / Raport Generator
5. Student Attendance Generator
6. Student Portfolio Generator
7. DOCX/Word, PDF, and Excel exports
8. Student and school data management
9. Teacher dashboard and document history

The product must prioritize **low subscription cost, speed, simplicity, and practical usefulness for Indonesian teachers**.

---

## 2. Product Vision

> "Membantu guru menyelesaikan pekerjaan administrasi dan pembuatan soal sekolah dalam hitungan menit, bukan berjam-jam."

EduSoal AI should feel like a practical digital assistant for teachers rather than a complex enterprise ERP.

### Core principles

- Affordable
- Simple
- Fast
- Indonesian-first
- Curriculum-aware
- Teacher-controlled
- Export-ready
- Privacy-conscious
- AI-assisted, not AI-dependent

---

## 3. Problem Statement

Teachers frequently spend significant time on:

- Creating exam questions
- Creating answer keys
- Matching questions to curriculum/material
- Formatting exams
- Preparing student report cards
- Entering student information repeatedly
- Creating attendance records
- Creating student portfolios
- Converting documents into printable formats

Existing AI tools can generate text but generally do not provide an integrated workflow from **curriculum → questions → answer key → school document → student administration**.

EduSoal AI solves this by combining these workflows in one inexpensive application.

---

## 4. Target Users

### Primary Persona — Individual Teacher

Typical needs:

- Create 20–50 questions quickly
- Generate answer keys
- Prepare exams for different classes
- Export directly to Word/PDF
- Maintain student records
- Generate report cards and attendance
- Work from a laptop or mobile browser

### Secondary Persona — School / Institution Admin

Needs:

- Manage teachers
- Manage classes
- Manage students
- Standardize document templates
- Manage school identity
- Monitor usage
- Purchase subscriptions for multiple teachers

### Future Personas

- Tutor/learning center
- Homeschooling institution
- Private education foundation
- Course provider

---

# 5. Supported Education Structure

The product must support Indonesian education levels:

### SD

- Grade 1
- Grade 2
- Grade 3
- Grade 4
- Grade 5
- Grade 6

### SMP

- Grade 7
- Grade 8
- Grade 9

### SMA

- Grade 10
- Grade 11
- Grade 12

### SMK

- Grade 10
- Grade 11
- Grade 12
- Major/program of expertise
- Vocational subjects

### Semester

Every academic workflow must support:

- Semester 1
- Semester 2

### Academic Year

Academic year must be configurable, for example:

- 2025/2026
- 2026/2027

Do not hard-code a single academic year.

---

# 6. Curriculum Architecture

Curriculum data must be versioned so the application can adapt when Indonesian education policies change.

Initial supported curriculum options:

1. Kurikulum Merdeka
2. Kurikulum 2013
3. Future/legacy curriculum versions when required

The application must not assume that every school uses the same curriculum.

The curriculum selector should include:

- Curriculum
- Education level
- Grade
- Subject
- Semester
- Learning objective / competency
- Topic/material
- Difficulty

### Important implementation rule

Curriculum content must be stored as configurable data rather than embedded directly inside frontend code.

Create a versioned structure such as:

`curriculum → academic_year → level → grade → subject → semester → competency/topic`

This allows administrators to update curriculum references without redeploying the frontend.

---

# 7. Current Indonesian Education Context

As of the PRD date, the product should be designed around the fact that Indonesian curriculum policy can change over time.

Official government material indicates that Kurikulum Merdeka is implemented under the national curriculum framework, while policy updates continue to occur. The application must therefore use a **versioned curriculum database** and provide an administrator workflow for updating curriculum references.

The 2025 policy update also described Kurikulum Merdeka and Kurikulum 2013 as curriculum options during the relevant transition period. The product should therefore support both rather than forcing one curriculum globally.

The 2026 education environment also includes the Tes Kemampuan Akademik (TKA). TKA has its own standardized assessment scope and must not be represented as identical to ordinary school examinations. If a future TKA-oriented generator is added, it should be a separate generation mode.

**Product rule:** AI-generated school questions must be clearly labeled as generated content and should be reviewed by the teacher before official use.

---

# 8. Core Feature: AI Exam Generator

## 8.1 Input Form

Teacher selects:

- Education level
- Grade
- Class
- Subject
- Curriculum
- Academic year
- Semester
- Topic/material
- Number of questions
- Question type
- Difficulty
- Language
- Learning objective/competency
- Optional custom instructions

### Question count presets

- 5
- 10
- 20
- 25
- 30
- 40
- 50
- Custom

---

## 8.2 Question Types

MVP:

- Multiple Choice
- True/False
- Short Answer
- Essay

Future:

- Multiple-response / complex multiple choice
- Matching
- Fill in the blank
- Case-based questions
- HOTS questions
- Literacy questions
- Numeracy questions
- Vocational/practical questions

---

# 9. AI Question Generation

The AI generation engine must generate:

### For each question

- Question number
- Question text
- Options, when applicable
- Correct answer
- Answer key
- Explanation
- Difficulty
- Topic
- Competency/learning objective
- Cognitive level
- Optional estimated score

### Example internal object

```json
{
  "number": 1,
  "type": "multiple_choice",
  "question": "...",
  "options": [
    {"label": "A", "text": "..."},
    {"label": "B", "text": "..."},
    {"label": "C", "text": "..."},
    {"label": "D", "text": "..."}
  ],
  "answer": "B",
  "explanation": "...",
  "difficulty": "medium",
  "topic": "...",
  "competency": "...",
  "cognitive_level": "C3"
}
```

---

# 10. Question Quality Controls

Before showing generated questions, the backend should run validation.

### Validation

- Missing answer
- Duplicate questions
- Duplicate answer options
- Ambiguous questions
- Invalid option count
- Answer not matching options
- Excessively similar questions
- Unsupported curriculum mapping
- Unsafe or inappropriate content
- Hallucinated factual claims where detectable

### Teacher controls

Each generated question can be:

- Edit
- Regenerate
- Delete
- Duplicate
- Reorder
- Change answer
- Change difficulty
- Change type

Teacher can regenerate:

- One question
- Selected questions
- Entire exam

---

# 11. Answer Key System

The generated answer key must be available separately from the student-facing exam.

Views:

### Student Version

Contains:

- Questions
- Options
- Instructions
- School identity
- Student name field
- Class
- Date

Does NOT show:

- Correct answers
- Explanations

### Teacher Version

Contains:

- Questions
- Correct answers
- Explanations
- Difficulty
- Competency
- Optional scoring guide

---

# 12. Exam Templates

Provide templates:

1. Ujian Harian
2. Penilaian Tengah Semester
3. Penilaian Akhir Semester
4. Ujian Sekolah
5. Latihan Soal
6. Quiz
7. Remedial
8. Pengayaan
9. Custom

Templates must be editable.

---

# 13. Export Exam

Supported formats:

### DOCX / Microsoft Word

Export a professionally formatted `.docx`.

Options:

- Student version
- Teacher version
- Questions + answer key
- Questions only

### PDF

Export print-ready PDF.

Options:

- Student version
- Teacher version
- Answer key
- Separate answer sheet

---

# 14. Report Card / Raport Generator

The application must provide an **Auto Input Raport** module.

## Required student fields

- NIS
- Student name
- School name
- Education level
- Grade
- Class
- Academic year
- Semester
- Subject

## Academic fields

- Knowledge/achievement score
- Skills score when applicable
- Final score
- Grade/predicate
- Teacher notes
- Attendance summary
- Extracurricular information
- Portfolio summary

The exact report structure must be configurable because schools may use different templates.

---

# 15. Raport Input Modes

### Mode A — Manual

Teacher enters data through a form.

### Mode B — Bulk Excel Import

Teacher uploads an Excel file.

System:

1. Reads spreadsheet
2. Detects columns
3. Maps columns
4. Validates rows
5. Shows preview
6. Allows correction
7. Imports records

### Mode C — Copy/Paste

Teacher can paste tabular data from Excel/Google Sheets.

---

# 16. Raport Generator

Teacher selects:

- School
- Academic year
- Semester
- Class
- Student(s)
- Template

System generates the report.

Exports:

- DOCX
- PDF
- Excel

### Excel export

Excel should contain:

- Student identity
- Subjects
- Scores
- Final grades
- Notes
- Attendance
- Class
- Semester
- Academic year

---

# 17. Student Attendance Generator

Create automatic attendance sheets.

### Input

- School
- Class
- Academic year
- Semester
- Month/date range
- Student list

### Attendance statuses

- Present
- Sick
- Excused
- Absent
- Other

### Features

- Monthly attendance
- Semester attendance
- Automatic totals
- Attendance percentage
- Notes
- Print layout
- PDF export
- Excel export
- DOCX export

---

# 18. Student Portfolio

Create a digital portfolio for each student.

### Portfolio fields

- Student identity
- Class
- Academic year
- Semester
- Subject
- Project
- Activity
- Achievement
- Competition
- Certificate
- Teacher note
- Evidence/photo/file
- Date

### Portfolio actions

- Add
- Edit
- Delete
- Upload evidence
- Generate portfolio document
- Export PDF
- Export DOCX
- Export Excel summary

Future:

- Student/parent portal
- Shareable portfolio link
- QR code
- Digital portfolio certificate

---

# 19. Student Management

CRUD:

- Create student
- Edit student
- Delete student
- Search student
- Import students
- Export students
- Assign class
- Assign academic year
- View academic history

Student profile should show:

- Identity
- Class history
- Subjects
- Scores
- Attendance
- Portfolio
- Generated reports

---

# 20. Class Management

Teacher can create:

- Class name
- Grade
- Education level
- Academic year
- Semester
- Student list

Example:

`VII-A | SMP | 2026/2027 | Semester 1`

---

# 21. School Profile

School information should be reusable in all generated documents.

Fields:

- School name
- NPSN (optional)
- Address
- City/Regency
- Province
- Principal name
- Teacher name
- Teacher NIP (optional)
- Logo
- Signature image
- Contact information

---

# 22. Dashboard

The dashboard should immediately show:

### Overview cards

- Total Students
- Total Classes
- Generated Exams
- Generated Reports
- Attendance Records
- Portfolio Records
- AI Credits remaining

### Quick actions

- Generate Exam
- Add Students
- Generate Raport
- Generate Attendance
- Create Portfolio

### Recent activity

Example:

- "Ujian Matematika Kelas 8 generated"
- "12 student reports exported"
- "Attendance for VIII-A updated"

---

# 23. AI Credits System

Because the product must remain affordable, use a controlled AI credit system.

Example:

### Free

- Limited AI generations
- Limited students
- Watermarked exports or limited templates
- Basic features

### Teacher Basic

Target price:

**Rp29.000–Rp49.000/month**

Suggested:

- Higher AI quota
- Exam generator
- Answer keys
- DOCX/PDF
- Student management
- Attendance

### Teacher Pro

Target price:

**Rp79.000–Rp99.000/month**

Suggested:

- Higher AI quota
- Raport
- Excel export
- Portfolio
- More templates
- Advanced AI generation
- Priority processing

### School

Target price:

**Custom / affordable per-teacher pricing**

Features:

- Multiple teachers
- Shared school profile
- Centralized students
- Admin dashboard
- Shared templates
- Usage monitoring

Pricing must remain configurable from an admin panel.

---

# 24. Authentication

Support:

- Email/password
- Google Sign-In

Account fields:

- Name
- Email
- Avatar
- Role
- School
- Subscription
- AI credits

Roles:

1. Teacher
2. School Admin
3. Super Admin

---

# 25. Subscription & Billing

MVP should be architected for Indonesian payment providers.

Future/production integrations:

- Midtrans
- Xendit
- QRIS
- Bank transfer
- E-wallets

Subscription states:

- Free
- Trial
- Active
- Past due
- Cancelled
- Expired

The billing system must be provider-agnostic.

---

# 26. File Storage

Store:

- School logos
- Teacher signatures
- Student portfolio evidence
- Generated documents
- Imported Excel files

Use Supabase Storage where appropriate.

Sensitive student files must not be publicly accessible by default.

---

# 27. Technology Stack

## Frontend

**Next.js**

Recommended:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Responsive design

## Database

**Supabase**

Use:

- PostgreSQL
- Auth where appropriate
- Storage
- Row Level Security
- Database functions where appropriate

## Backend / API

**Insforge**

Responsibilities:

- Application business logic
- API layer
- AI orchestration
- Document generation jobs
- Subscription logic
- Usage/credit enforcement
- Validation
- Background jobs where supported

## Deployment / Infrastructure

**Cloudflare**

Use:

- Cloudflare Pages/Workers as appropriate
- CDN
- DNS
- WAF
- Caching
- Security controls

### Important architecture rule

Do not place secret API keys inside Next.js client-side code.

AI provider credentials, database service-role credentials, payment secrets, and signing secrets must only exist on trusted server-side infrastructure.

---

# 28. High-Level Architecture

```text
Teacher
   |
   v
Next.js Web App
   |
   v
Insforge API / Backend
   |
   +----> AI Provider
   |
   +----> Supabase PostgreSQL
   |
   +----> Supabase Storage
   |
   +----> Document Generator
   |
   +----> Billing Provider
   |
   v
Cloudflare Infrastructure
```

---

# 29. Database Schema

## users

- id
- email
- full_name
- avatar_url
- role
- created_at
- updated_at

## schools

- id
- owner_id
- name
- npsn
- address
- city
- province
- logo_url
- principal_name
- created_at
- updated_at

## teachers

- id
- user_id
- school_id
- name
- nip
- created_at

## academic_years

- id
- school_id
- name
- is_active

## classes

- id
- school_id
- academic_year_id
- level
- grade
- class_name

## students

- id
- school_id
- nis
- name
- gender
- birth_date
- class_id
- academic_year_id
- status
- created_at

## subjects

- id
- name
- education_level
- active

## curricula

- id
- name
- version
- academic_year
- active

## curriculum_topics

- id
- curriculum_id
- level
- grade
- subject_id
- semester
- topic
- competency
- learning_objective

## exams

- id
- school_id
- teacher_id
- class_id
- subject_id
- curriculum_id
- academic_year_id
- semester
- title
- question_count
- status
- created_at

## exam_questions

- id
- exam_id
- question_number
- question_type
- question
- options
- answer
- explanation
- difficulty
- topic
- competency
- cognitive_level

## report_cards

- id
- student_id
- teacher_id
- academic_year_id
- semester
- template_id
- status

## report_card_scores

- id
- report_card_id
- subject_id
- score
- grade
- teacher_note

## attendance

- id
- student_id
- class_id
- date
- status
- note

## portfolios

- id
- student_id
- subject_id
- title
- description
- achievement
- teacher_note
- evidence_url
- date

## subscriptions

- id
- user_id
- plan
- status
- started_at
- expires_at

## ai_usage

- id
- user_id
- action
- credits_used
- created_at

## generated_documents

- id
- user_id
- document_type
- source_id
- format
- file_url
- created_at

---

# 30. Security & Privacy

Student information is sensitive and must be handled carefully.

Requirements:

- Row Level Security
- Tenant isolation
- Server-side authorization
- Secure file URLs
- No public student documents by default
- Audit logs for administrative actions
- Encryption in transit
- Secure secrets
- Rate limiting
- Input validation
- File type validation
- File size limits
- Malware scanning where practical

Never expose:

- Supabase service-role keys
- AI API keys
- Payment secrets
- Internal credentials

---

# 31. AI Safety & Reliability

AI output must never be treated as automatically authoritative.

The UI must show:

> "Soal dibuat oleh AI. Harap periksa kembali sebelum digunakan dalam ujian resmi."

AI must support:

- Regeneration
- Teacher editing
- Manual answer correction
- Content reporting
- Generation history

The system should minimize hallucinations by grounding generation in selected curriculum/topic data.

---

# 32. UX/UI Requirements

Design direction:

**Modern, clean, friendly, professional, lightweight.**

The product should feel designed specifically for teachers.

Avoid:

- Overly complicated dashboards
- Excessive animations
- Enterprise-style complexity
- Too many settings on one page

### Navigation

Sidebar:

- Dashboard
- AI Buat Soal
- Bank Soal
- Siswa
- Kelas
- Raport
- Absensi
- Portofolio
- Dokumen
- Template
- Billing
- Pengaturan

---

# 33. Exam Generator UX

Use a multi-step wizard:

### Step 1 — Basic Information

- Level
- Grade
- Class
- Subject
- Semester

### Step 2 — Curriculum

- Curriculum
- Academic year
- Topic
- Competency

### Step 3 — Question Settings

- Number
- Type
- Difficulty
- Instructions

### Step 4 — Generate

Show progress animation.

### Step 5 — Review

Question cards with:

- Edit
- Regenerate
- Delete

### Step 6 — Export

Buttons:

- Download Word
- Download PDF

---

# 34. Raport UX

Flow:

```text
Select School
     ↓
Select Academic Year
     ↓
Select Semester
     ↓
Select Class
     ↓
Import / Input Students
     ↓
Input Scores
     ↓
Preview Raport
     ↓
Generate
     ↓
DOCX / PDF / Excel
```

---

# 35. Attendance UX

Flow:

```text
Select Class
   ↓
Select Date / Month
   ↓
Student Table
   ↓
Mark Attendance
   ↓
Auto Calculate
   ↓
Preview
   ↓
Export
```

---

# 36. Portfolio UX

Flow:

```text
Select Student
   ↓
Add Portfolio Item
   ↓
Upload Evidence
   ↓
Teacher Note
   ↓
Save
   ↓
Generate Portfolio
   ↓
Export
```

---

# 37. Document Engine

Build a reusable document generation service.

Input:

```text
template
+
structured data
+
school profile
+
student data
+
teacher data
```

Output:

- DOCX
- PDF
- XLSX

The document engine must support:

- Indonesian language
- A4
- School logo
- Header/footer
- Tables
- Signatures
- Page numbering
- Teacher/student information
- Custom templates

---

# 38. Template System

Admin/teacher can select templates.

Templates:

- Exam
- Answer Key
- Raport
- Attendance
- Portfolio

Future:

- Custom drag-and-drop template builder

---

# 39. Search & History

Teacher can search:

- Exam
- Student
- Class
- Document
- Portfolio
- Raport

Filters:

- Date
- Class
- Subject
- Semester
- Academic year
- Document type

---

# 40. Notifications

Notifications for:

- Generation completed
- Export completed
- AI credits low
- Subscription expiring
- Import errors
- Document ready

---

# 41. Admin Panel

Super Admin:

- User management
- School management
- Subscription plans
- AI usage
- Curriculum versions
- Curriculum topics
- Subject database
- Document templates
- System settings
- Audit logs
- Feature flags

School Admin:

- Teachers
- Students
- Classes
- School profile
- Templates
- Usage

---

# 42. Analytics

Track product usage:

- Questions generated
- Exams generated
- Documents exported
- Students added
- Reports generated
- Attendance records
- Portfolio records
- AI credits consumed

Do not expose sensitive student information in analytics dashboards unnecessarily.

---

# 43. MVP Scope

MVP must include:

### Authentication

- Email
- Google

### School/Teacher

- Profile
- School profile
- Class
- Students

### AI

- Question generation
- Answer key
- Explanation
- Edit/regenerate/delete
- Curriculum selection

### Export

- DOCX
- PDF
- XLSX for administrative data

### Administration

- Raport
- Attendance
- Portfolio

### Billing

- Free plan
- Paid plan
- Credit system
- Subscription status

---

# 44. Phase 2

Add:

- More question types
- HOTS mode
- TKA-oriented question mode
- Advanced question bank
- Bulk generation
- More curriculum references
- Custom templates
- School multi-user management
- Payment gateway
- Advanced analytics

---

# 45. Phase 3

Add:

- Parent portal
- Student portal
- Shareable portfolio
- QR verification
- AI learning analytics
- Personalized remedial questions
- Automatic student performance analysis
- Recommendation engine
- Mobile PWA
- Native Android/iOS if justified

---

# 46. Non-Functional Requirements

### Performance

- Dashboard initial load target < 2.5 seconds on normal connection
- Standard CRUD operations < 1 second where feasible
- AI generation must show asynchronous progress
- Document generation should not block the UI

### Reliability

- Automatic retry for failed document jobs
- Generation history
- Safe recovery from interrupted exports

### Scalability

Architecture must support:

- 10,000+ teachers
- 100,000+ students
- Large document generation workloads

Scale should be incremental and cost-conscious.

---

# 47. Acceptance Criteria — AI Exam

Given:

- Grade 8
- SMP
- Mathematics
- Kurikulum Merdeka
- Semester 1
- 20 questions

When teacher clicks **Generate**

Then:

- System generates 20 questions
- Each question has an answer
- Multiple choice questions have valid options
- Teacher can edit each question
- Teacher can regenerate individual questions
- Teacher can delete questions
- Teacher can reorder questions
- Teacher can export DOCX
- Teacher can export PDF
- Teacher can export teacher answer key

---

# 48. Acceptance Criteria — Raport

Given a class with 30 students.

When teacher imports Excel:

- System recognizes students
- System validates required fields
- Invalid rows are highlighted
- Teacher can correct errors
- Data is saved
- Teacher can generate reports
- Teacher can export PDF
- Teacher can export DOCX
- Teacher can export XLSX

---

# 49. Acceptance Criteria — Attendance

Given a class with 30 students.

Teacher selects September 2026.

System:

- Creates attendance grid
- Shows all students
- Allows attendance input
- Calculates totals
- Calculates percentages
- Saves records
- Generates printable output
- Exports PDF/Word/Excel

---

# 50. Acceptance Criteria — Portfolio

Teacher selects a student.

Teacher can:

- Add project
- Add description
- Add achievement
- Add teacher note
- Upload evidence
- Edit
- Delete

System can generate:

- Portfolio DOCX
- Portfolio PDF
- Portfolio Excel summary

---

# 51. Cost-Control Strategy

Because the target market is teachers, infrastructure and AI costs must be tightly controlled.

Implement:

- AI credit limits
- Token-efficient prompts
- Structured generation
- Cached curriculum context
- Batch generation
- Async document generation
- Server-side rate limiting
- File size limits
- Usage monitoring
- Cheap model for simple tasks
- More capable model only for complex generation

Do not use expensive AI models for every operation.

---

# 52. Product Metrics

North Star Metric:

**Number of useful teacher documents successfully generated per active teacher per month.**

Supporting metrics:

- Weekly active teachers
- Questions generated
- Exams exported
- Reports generated
- Attendance sheets generated
- Portfolio documents generated
- Free → paid conversion
- Monthly retention
- AI cost per active teacher
- Average document generation time

---

# 53. Recommended Product Positioning

Primary positioning:

> **"AI Administrasi Guru & Pembuat Soal Sekolah — cepat, murah, dan siap cetak."**

Alternative:

> **"Dari buat soal sampai raport, satu aplikasi untuk guru Indonesia."**

The product should compete on:

1. Local relevance
2. Simplicity
3. Price
4. Export quality
5. Teacher workflow integration

Not on being a generic AI chatbot.

---

# 54. Future AI Features

Potential future modules:

### AI Kisi-Kisi Generator

Generate:

- Kisi-kisi
- Kompetensi
- Indikator
- Materi
- Nomor soal
- Bentuk soal
- Level kognitif

### AI Remedial Generator

Analyze weak topics and generate remedial questions.

### AI Enrichment Generator

Generate advanced exercises for high-performing students.

### AI Question Bank

Save and reuse questions.

### AI Question Randomizer

Generate multiple exam versions:

- Paket A
- Paket B
- Paket C
- Paket D

with equivalent difficulty.

### AI Blueprint

Automatically distribute questions across:

- Topic
- Competency
- Difficulty
- Cognitive level

---

# 55. Recommended Folder Structure

```text
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── forgot-password/
│
├── dashboard/
├── exams/
│   ├── create/
│   ├── [id]/
│   └── bank/
│
├── students/
├── classes/
├── report-cards/
├── attendance/
├── portfolios/
├── documents/
├── templates/
├── billing/
├── settings/
└── admin/

components/
├── ui/
├── dashboard/
├── exams/
├── students/
├── report-cards/
├── attendance/
├── portfolios/
└── documents/

lib/
├── supabase/
├── insforge/
├── ai/
├── documents/
├── billing/
├── validation/
└── permissions/

types/
```

---

# 56. Development Priority

## P0 — Must Have

- Authentication
- Teacher dashboard
- School profile
- Class
- Student
- AI exam generation
- Answer key
- Edit/regenerate questions
- DOCX
- PDF
- Basic subscription/credits

## P1 — Important

- Raport
- Excel import
- Excel export
- Attendance
- Portfolio
- Document history

## P2 — Growth

- Question bank
- Kisi-kisi generator
- HOTS
- Remedial
- Enrichment
- Multiple exam packages

## P3 — Advanced

- School multi-tenant management
- Parent/student portal
- Analytics
- QR portfolio
- AI learning insights

---

# 57. Final Product Requirement

EduSoal AI must be built as a **real production SaaS**, not a demo.

Every major feature must include:

- Loading state
- Empty state
- Error state
- Success state
- Validation
- Permission checks
- Responsive UI
- Database persistence
- Auditability where appropriate
- Export functionality where specified

Avoid fake buttons and placeholder functionality in production flows.

If an integration is not yet available, clearly mark it as a planned integration rather than simulating a successful transaction.

---

# 58. Important Compliance & Product Disclaimer

EduSoal AI is an educational productivity tool.

It must not claim that AI-generated questions are officially approved by the Indonesian government unless an actual official approval exists.

Curriculum information must be maintained as versioned reference data and reviewed when government policy changes.

The application should distinguish:

- School-created assessments
- AI-generated practice questions
- TKA-oriented content
- Official government assessment information

---

# 59. Definition of Done

The MVP is considered complete when a teacher can:

1. Register/login
2. Create a school profile
3. Create a class
4. Add/import students
5. Select Indonesian education level
6. Select grade
7. Select semester
8. Select curriculum
9. Select subject/topic
10. Generate exam questions using AI
11. Receive answer keys
12. Receive explanations
13. Edit/regenerate/delete questions
14. Save the exam
15. Export student exam as DOCX
16. Export student exam as PDF
17. Generate a basic report card
18. Export report card as DOCX/PDF/XLSX
19. Generate attendance
20. Export attendance
21. Create student portfolio
22. Export portfolio
23. View generated document history
24. See AI credit usage
25. Upgrade subscription

---

# 60. Source References for Curriculum/Product Assumptions

The PRD should be maintained against current official Indonesian education policy.

Relevant official references used when drafting this document:

- Kemendikdasmen information regarding Permendikdasmen No. 13 Tahun 2025 and curriculum policy.
- Kemendikdasmen information regarding the 2026 curriculum/learning outcome update.
- Pusat Asesmen Pendidikan information regarding TKA 2026.
- Official Dapodik documentation describing curriculum implementation options across SD, SMP, SMA, and SMK.

These references should be treated as policy references, not as static application data. The production system should maintain a versioned curriculum reference layer.

---

## End of PRD
