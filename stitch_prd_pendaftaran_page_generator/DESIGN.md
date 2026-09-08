---
name: Modern Edu-Administrative Workspace
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  surface-paper: '#F8FAFC'
  surface-card: '#FFFFFF'
  border-subtle: '#E2E8F0'
  text-ink: '#0F172A'
  kurikulum-merdeka: '#0284C7'
  kurikulum-k13: '#0D9488'
  credit-amber: '#D97706'
  state-error: '#EF4444'
  state-success: '#10B981'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  exam-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 22px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  container-max: 1280px
  gutter-mobile: 1rem
  gutter-desktop: 2rem
---

## Brand & Style

The design system establishes a warm, deeply trustworthy, and empowering environment tailored for Indonesian educators navigating Kurikulum Merdeka and K13. The emotional posture balances administrative rigor with an approachable, companionate AI experience—dispelling pedagogical fatigue through visual clarity, structured white space, and encouraging accents.

Drawing from modern academic minimalism infused with warm institutional design, the aesthetic echoes high-grade bond paper, physical test papers, and structured ledger books, modernized via crisp digital primitives. Interfaces are intentionally clean, avoiding hyper-stylized tech tropes, flashy glassmorphism, or high-friction animations. The system prioritizes immediate legibility, high scannability under varied lighting conditions (e.g., standard classroom projectors and modest laptop screens), and a reliable, calm utility that respects the teacher's time.

## Colors

The palette is anchored by balanced chromatic values reflecting pedagogical professionalism and calm clarity:

- **Primary (`#0D9488` - Edu Emerald)**: Conveys growth, academic guidance, and institutional trust. Used for primary CTAs, active administrative states, and confirmation actions.
- **Secondary (`#0284C7` - Ocean Cerulean)**: Drives informational cues, secondary workflows, and features tied to standard curriculum alignment.
- **Tertiary (`#F59E0B` - Warm Amber)**: Energizes AI-assisted features, credit counter badges, and key attention targets without alarmist tension.
- **Neutral (`#64748B` - Slate)**: Modulates structural borders, body copy, and muted meta-labels.

### Semantic Color Assignments
- **Kurikulum Merdeka**: Rendered in `#0284C7` tinted pills (`bg-sky-50 text-sky-700 border-sky-200`) to signal modern modular learning frameworks.
- **Kurikulum 2013 (K13)**: Rendered in `#0D9488` tinted pills (`bg-teal-50 text-teal-700 border-teal-200`) to denote traditional, grounded competencies.
- **Surface Paper (`#F8FAFC`)**: Applied as the universal workspace canvas, simulating clean A4 bond paper sheets while reducing digital glare during extended grading and planning sessions.

## Typography

Typography prioritizes clarity, fast visual parsing, and high readability for dense question prompts, rubrics, and formal Indonesian educational standards:

- **Primary Headings & Body (`Plus Jakarta Sans`)**: Provides a contemporary, warm, open geometric humanist tone. Rounded terminals invite confidence and reduce visual strain during long administrative sessions.
- **Labels, Tables & System Disclaimers (`Inter`)**: Deployed across data tables, attendance matrices, AI audit badges, and metadata tags where vertical alignment, tabular numbers, and zero-ambiguity characters are paramount.
- **Editorial Conventions**: Question stems inside the exam generator enforce high-contrast body styling (`body-lg`) with distinct indentations for multiple-choice choices (`A, B, C, D, E`). Disclaimer text alerting teachers to AI validation is consistently rendered in `body-sm` with medium contrast (`#64748B`).

## Layout & Spacing

Layouts follow an 8pt architectural rhythm, maintaining clear boundaries between global navigation, interactive workspace panels, and live document mockups.

- **Grid Framework**: Desktop workspaces employ a 12-column responsive grid with `1.5rem` (24px) gutters, accommodating collapsible contextual sidebars (fixed width `260px`) and centered live document staging viewports.
- **A4 Document Simulation**: The central authoring viewport constrains the exam editor and raport generator to an A4 preview ratio (`aspect-[210/297]`), preserving strict print fidelity for DOCX and PDF deliverables.
- **Responsive Adaptations**:
  - **Desktop (>=1024px)**: Dual-pane interface with left-side administrative parameters and right-side interactive sheet preview.
  - **Tablet (768px - 1023px)**: Tabbed workflow switching between wizard inputs and sheet inspection.
  - **Mobile (<768px)**: Single-column linear stack; table grids transition to horizontal swipe or responsive structured list cards.

## Elevation & Depth

Depth is conveyed through clean structural delineation, light tonal layering, and fine borders rather than heavy, dramatic shadows:

- **Base Layer (Ground)**: `surface-paper` (`#F8FAFC`) provides a comfortable, soft contrast beneath white cards.
- **Elevated Surfaces**: Interactive cards, questions, and tables rest on pure white (`#FFFFFF`) with a hairline border (`1px solid #E2E8F0`).
- **Ambient Elevation 1 (Resting Cards & Popovers)**: `box-shadow: 0 1px 3px 0 rgb(15 23 42 / 0.05), 0 1px 2px -1px rgb(15 23 42 / 0.05)`.
- **Ambient Elevation 2 (Dropdowns, Active Modals, Dragged Question Items)**: `box-shadow: 0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.04)`.
- **Focus Rings**: Strict 2px offset focus states using `#0D9488` at 25% opacity ensure swift keyboard navigation for high-speed student grading.

## Shapes

The interface implements a balanced `roundedness: 2` (0.5rem / 8px standard base radius) throughout standard controls, producing an approachable, human, yet distinctly orderly atmosphere:

- **Inputs, Buttons, and Select Triggers**: `rounded-md` (0.375rem / 6px) to maintain structured alignment within compact data forms.
- **Question Review Cards & Metric Panels**: `rounded-lg` (0.5rem / 8px to 0.75rem / 12px) paired with soft 1px border framing.
- **Badges & Status Tags**: Fully pill-shaped (`rounded-full`) to distinctly separate contextual metadata (e.g., `Kurikulum Merdeka`, `Fase E`, `HOTS`) from actionable box elements.

## Components

### Buttons
- **Primary**: Solid Edu Emerald (`#0D9488`) with white text, font weight 600, padding `0.625rem 1.25rem`, subtle hover state transitioning to `#0F766E`.
- **Secondary / Outline**: Pure white background, `1px solid #CBD5E1`, text `#0F172A`, hover background `#F1F5F9`.
- **AI Action Variant**: Gradient border or light Amber highlight (`bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100`) accompanied by a subtle sparkle icon.

### Curriculum & HOTS Chips (Badges)
- **Kurikulum Merdeka Badge**: Sky-blue tonal chip (`bg-sky-50 text-sky-700 border-sky-200`) indicating progressive national curricula.
- **Kurikulum 2013 Badge**: Emerald tonal chip (`bg-teal-50 text-teal-700 border-teal-200`).
- **Cognitive Level Badge (HOTS / MOTS / LOTS)**: Violet/Indigo micro-badge (`bg-indigo-50 text-indigo-700`) applied to questions to verify pedagogical balance.

### Question Mockup Card
- Modular white card container featuring step numbers, question stem, and optional stimulus (e.g., tables, reading passages).
- Inline action controls (Regenerate, Edit Key, Delete, Duplicate) grouped neatly at the top right.
- Visual distinction between "Kunci Jawaban" (Answer Key) and "Rubrik Penilaian" (Grading Rubric) using muted amber panels.

### Form Inputs & Dropdowns
- Inset padding `0.5rem 0.75rem`, placeholder text `#94A3B8`, border `#CBD5E1`.
- Error validation state displays crisp `#EF4444` borders accompanied by an inline warning prompt beneath the field.

### Administrative Tables (Raport & Absensi)
- Sticky tabular header with background `#F8FAFC` and subtle border bottom.
- Alternate zebra striping for rapid grade reading; cells include tight compact padding (`0.5rem 0.75rem`).
- Rapid attendance radio pills: Hadir (Green), Izin (Blue), Sakit (Amber), Alpa (Red).

### Pricing & Quota Cards (Rupiah Optimized)
- Clean vertical pricing cards featuring localized IDR formatting (e.g., `Rp 49.000 / bln`).
- Transparent feature matrix comparing free exports (with educational watermark) versus official unrestricted Word/PDF exports with custom school seals and signature blocks.