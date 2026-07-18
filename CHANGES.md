# MediInsight AI — v1.1 Phase 2

All four roadmap items in one pass: comparison polish, timeline fix, dark
mode, and mobile responsiveness. Every file here has been verified with
`tsc --noEmit`, a full `npm run build`, and `python -m py_compile` — no
errors, no warnings beyond a normal chunk-size note.

Drop these files into your project at the matching paths.

## 1. Timeline bug fix

**`backend/app/services/timeline_service.py`**

Timeline items were sorted with plain Python string comparison on the raw
date string (`x.date`). Your documents use mixed formats (`"02/10/26"`,
`"01/22/2026"`), so string sort put them in the wrong chronological order,
and any document with an unparseable/"Unknown" date got interleaved
randomly instead of pushed to the end. Now parses each date through a list
of known formats and sorts numerically, with unparseable dates always last.

## 2. Comparison feature — procedure-level diffs

This was the one that was actually incomplete before — it only compared 6
top-level fields (patient, hospital, doctor, date, totals). It never looked
at individual procedures, which is the more useful comparison for a medical
bill.

**`backend/app/schemas/comparison.py`** — added `ProcedureDifference` and
`total_charge_delta` to the response.

**`backend/app/services/comparison_service.py`** — matches procedures
across the two reports by CPT/procedure code (falling back to description
text if no code), and classifies each as `added`, `removed`, or `changed`
(same procedure, different charge). Also computes the net total charge
delta between the two reports. Added a guard: comparing a document that
hasn't finished AI analysis now raises a clear error instead of crashing on
`Path(None)`.

**`frontend/src/components/comparison/ComparisonCard.tsx`** — rewritten to
show the procedure diff list with color-coded added/removed/changed badges
and the total charge delta.

**`frontend/src/pages/comparison/ComparisonPage.tsx`** — passes the new
fields through, adds real error messages (previously errors were only
`console.error`'d with no user-facing feedback), and blocks comparing a
document against itself.

## 3. Dark mode

**`frontend/src/styles.css`** — switched Tailwind v4 from OS-preference
dark mode to class-based (`@custom-variant dark`), since this needs a
manual toggle, not just following system settings.

**`frontend/src/hooks/useTheme.ts`** (new) — manages the theme, persists
choice to `localStorage`, defaults to OS preference on first visit.

**`frontend/src/components/layout/ThemeToggle.tsx`** (new) — sun/moon
toggle button, used in both the navbar and the settings page.

**Shell components updated with `dark:` classes**: `MainLayout.tsx`,
`Navbar.tsx`, `Sidebar.tsx`, `PageContainer.tsx`, `SettingsPage.tsx`. Since
almost every page renders inside `PageContainer`, this gives you dark
styling on the page shell and card backgrounds everywhere for free.

**Known limitation**: deeper components (Dashboard stat cards, document
list rows, chat bubbles, etc.) still use hardcoded `bg-white`/`text-gray-*`
without `dark:` variants. They won't look broken — text stays readable —
but they won't shift to dark backgrounds yet. The infrastructure (hook,
toggle, Tailwind config) is done; extending `dark:` classes to the rest of
the components is mechanical from here, just say the word and I'll do a
pass over the rest.

## 4. Mobile responsive pass

**`MainLayout.tsx` / `Sidebar.tsx` / `Navbar.tsx`** — sidebar is now a
slide-in drawer below the `lg` breakpoint (hidden by default, opened via a
hamburger button in the navbar, with a tap-to-close backdrop and
auto-close when you tap a nav link). Above `lg`, it behaves exactly as
before (always visible, static).

**`PageContainer.tsx`** — responsive text sizing and padding (smaller
headings/padding on phones, scaling up at `sm`/`lg`).

**`ComparisonPage.tsx`** — compare button is full-width on mobile.

## Also fixed while in there

**`frontend/src/pages/Settings/SettingsPage.tsx`** had the same stale
"PaddleOCR" claim as the old README (you're actually running Tesseract +
Poppler), and still said "Gemini 2.5 Flash" as the only model despite the
AI Gateway now having three providers with failover. Corrected both, bumped
the displayed version to v1.1.0, and added the dark mode toggle here too.

## Steps to apply

```bash
# Backend - just the 3 files above, no new dependencies
# Frontend
cd frontend
npm install   # no new deps needed, but safe to run
npm run dev
```

Test checklist:
- [ ] Upload two documents, run AI analysis on both, compare them — check
      the procedure diff list and total charge delta
- [ ] Check the timeline page orders documents newest-first correctly
- [ ] Click the sun/moon icon in the navbar — whole shell should switch
      dark/light, and it should persist across a page refresh
- [ ] Resize your browser below ~1024px width (or open on your phone) —
      sidebar should collapse into a hamburger menu
