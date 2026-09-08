# Product Requirements Document (PRD)

## Project
EduSoal.ai — Dark Mode Text Contrast Accessibility Fix

**Version:** 1.0  
**Priority:** High  
**Type:** UI/UX Improvement (Non-functional)

---

## 1. Objective

Memperbaiki seluruh masalah kontras teks pada Dark Mode tanpa mengubah layout, spacing, typography, maupun struktur komponen. Fokus utama adalah memastikan seluruh semantic color token menghasilkan keterbacaan yang konsisten pada background navy gelap.

## 2. Problem Statement

Pada implementasi saat ini terdapat dua blok `.dark` di `app/globals.css` yang saling menimpa (override). Akibatnya beberapa semantic token berubah menjadi warna terlalu gelap sehingga hero headline, subtitle, badge, navigation, placeholder, dan secondary text sulit dibaca.

### Root Cause

- Duplicate `.dark` theme block.
- Semantic tokens tertimpa oleh nilai yang lebih gelap.
- Beberapa komponen masih menggunakan hardcoded Tailwind text colors.
- Opacity (`text-white/50`, `opacity-40`) menurunkan readability.

---

## 3. Goals

- Seluruh teks memiliki kontras WCAG yang baik pada dark mode.
- Hero section menjadi jelas terbaca.
- Light mode tidak berubah.
- Semua komponen menggunakan semantic color tokens.
- Tidak ada perubahan visual selain warna teks.

## 4. Non Goals

- Tidak membuat theme toggle baru.
- Tidak mengubah layout.
- Tidak mengubah spacing.
- Tidak mengubah font.
- Tidak mengubah ukuran komponen.

---

## 5. Scope

### In Scope

- `app/globals.css`
- Hero Section
- Header / Navigation
- Buttons
- Badges
- Links
- Placeholder
- Input text
- Surface text
- Secondary & muted text

### Out of Scope

- New components
- Animation
- Responsive redesign
- Brand redesign

---

## 6. Color System Specification

### Dark Theme Tokens

| Token | Value | Usage |
|------|------|------|
| Background | `#0B1C30` | Main background |
| Surface | `#10243D` | Card |
| Surface 2 | `#16304D` | Elevated surface |
| Heading | `#F1F5F9` | H1–H6 |
| Body | `#C2CEE0` | Paragraph |
| Secondary | `#A6B3D4` | Labels |
| Muted | `#9AA8C2` | Helper text |
| Accent | Existing Teal/Cyan | CTA & highlight |
| Link | `#67E8F9` | Links |
| Placeholder | `#7F92B3` | Form placeholder |

---

## 7. Hero Requirements

### Headline

- Near white (`#F1F5F9`)
- Gradient highlight tetap cyan/teal
- Tidak boleh menghasilkan bagian gelap

### Subtitle

- Gunakan Body token
- Minimal kontras tinggi terhadap background

### Badge

- Background translucent teal
- Text teal terang
- Border tetap soft

### CTA

- Primary button tetap brand teal
- Secondary button menggunakan text primary

---

## 8. Navigation Requirements

| Element | Color |
|---------|------|
| Logo text | Primary |
| Menu active | Primary |
| Menu default | Secondary |
| Hover | White |
| Login | Primary |

Tidak boleh menggunakan:

- `text-slate-900`
- `text-gray-900`
- `text-slate-800`
- Hardcoded hex gelap

---

## 9. Semantic Token Audit

Audit seluruh project terhadap:

### Primary

- text-primary
- text-heading
- text-on-surface

### Body

- text-body
- text-secondary
- text-muted

### Interactive

- links
- buttons
- badges
- placeholder

### Surface

- cards
- dialogs
- navigation
- footer

---

## 10. Hardcoded Class Audit

Ganti seluruh hardcoded class berikut menjadi semantic token bila muncul pada dark mode:

```text
text-slate-900
text-slate-800
text-gray-900
text-gray-700
text-[#...]
text-white/40
text-white/50
opacity-40
opacity-50
```

---

## 11. Acceptance Criteria

### Hero

- [ ] Headline terbaca jelas
- [ ] Highlight cyan tetap terang
- [ ] Subtitle mudah dibaca
- [ ] Badge readable

### Navigation

- [ ] Semua menu readable
- [ ] Hover tetap jelas

### Global

- [ ] Tidak ada teks berwarna `#07182B`
- [ ] Tidak ada semantic token yang menghasilkan teks terlalu gelap
- [ ] Light mode identik dengan sebelumnya
- [ ] Tidak ada perubahan layout

---

## 12. QA Checklist

### Visual Inspection

- Hero headline
- Hero subtitle
- Badge
- Navbar
- Buttons
- Cards
- Inputs
- Footer

### Accessibility

- Kontras heading sangat tinggi
- Body nyaman dibaca
- Secondary tetap terlihat
- Placeholder masih terbaca

---

## 13. Definition of Done

Fitur dianggap selesai apabila:

1. Duplicate `.dark` block dihapus.
2. Seluruh semantic token menggunakan nilai baru.
3. Hero section memiliki hierarchy yang jelas.
4. Tidak ada hardcoded dark text pada dark mode.
5. Light mode tetap pixel-identik.
6. Seluruh halaman lolos inspeksi visual tanpa low-contrast text.
