# Report Versioning — v1.2

Every AI analysis run now creates a new version instead of silently
overwriting the last one. Full history browsing and restore, tested at the
CRUD level, HTTP level (including the cross-user security boundary), and a
full frontend build.

## ⚠️ The bug this fixes

Before this change, `save_analysis()` wrote to a fixed path —
`backend/analysis/{document_id}.json` — every time. If you ever clicked
"Re-run Analysis" (or re-triggered `/ai-analyze` for any reason — retrying
after a bad OCR pass, switching which AI provider answered, etc.), the
previous result was **gone**, no history, no way back. This wasn't a
hypothetical edge case, it was guaranteed data loss on the very first
re-analysis anyone ever ran.

## What's in this feature

**Backend (new)**
- `backend/app/database/version_crud.py` — version number allocation, create/list/get
- `backend/app/schemas/version.py` — `VersionSummary`, `VersionListResponse`
- `backend/app/api/version_routes.py` — 3 endpoints:
  - `GET /documents/{id}/versions` — list all versions, flags which one is current
  - `GET /documents/{id}/versions/{version_number}` — fetch a specific version's content
  - `POST /documents/{id}/versions/{version_number}/restore` — make an old version current again

**Backend (modified)**
- `models.py` — new `ReportVersion` table (`document_id`, `version_number`, `file_path`, `created_at`)
- `json_storage.py` — added `save_analysis_version()`, which saves to
  `{document_id}_v{n}.json` instead of overwriting a single file. The old
  `save_analysis()` function is still there but no longer called anywhere —
  left in place rather than deleted in case anything else references it.
- `ai_routes.py` — `/ai-analyze` now allocates the next version number,
  saves to a versioned file, records a `ReportVersion` row, and points
  `document.analysis_json_path` at the new version (making it "current")
- `routes.py` — registered the new version router

**Frontend (new)**
- `components/ai/VersionHistory.tsx` — version list with View/Restore per
  entry, only renders once there's more than one version to show

**Frontend (modified)**
- `documentService.ts` — `getVersions`, `getVersionAnalysis`, `restoreVersion`
- `AIAnalysisPage.tsx` — added a "🔄 Re-run Analysis" button (there wasn't
  one before — the page only ever displayed whatever analysis already
  existed), a banner when viewing a non-current version, and the version
  history panel at the bottom

## Design decisions worth knowing about

- **Restoring doesn't delete anything.** It just repoints "current" at an
  older version's file. All versions stay on disk and in the `versions`
  list forever, restore or not.
- **Viewing an old version is read-only** in the sense that "Re-run
  Analysis" is disabled while you're looking at a historical version (you
  have to go back to "current" first) — this avoids the confusing case of
  re-analyzing while looking at someone else's numbers on screen.
- **No cap on version count.** Every re-analysis adds a file. For a
  portfolio/demo project this is fine; if this were a real product you'd
  eventually want either a retention limit or an S3/cold-storage move for
  old versions, but that's future-scope, not needed now.

## Testing performed

**CRUD level** (real SQLite db) — version numbers allocate correctly in
sequence (1, 2, 3...), versions list newest-first, fetching a specific
version returns the right one, fetching a nonexistent version returns
`None` cleanly.

**HTTP level** (FastAPI `TestClient`, 8 scenarios) — list versions shows
correct `is_current` flags; fetching a specific version's content returns
the right data; **a second user gets 404 on both listing and fetching
versions of a document they don't own** (the security test that actually
matters); restoring flips `is_current` correctly without deleting the
other version; the previously-current version is still fully fetchable
after being displaced; a nonexistent version number returns 404 rather
than crashing.

**Frontend** — `npm run build` (full `tsc -b` + Vite build, not just
`--noEmit`) caught a real type-narrowing bug in the version-loading
`useEffect` (TypeScript couldn't prove `viewingVersion` was non-null inside
a nested async function even after the guard clause) — fixed by capturing
the narrowed value in a local `const` before the closure. Build is clean
after the fix.

## Try it

1. Upload a document, run AI analysis once
2. Click "🔄 Re-run Analysis" — a "Report History" section should now
   appear at the bottom showing 2 versions
3. Click "View" on version 1 — you should see the older data with an amber
   "viewing a past version" banner
4. Click "Restore" on version 1 — it should become the new "Current" one,
   while version 2 stays in the list, still viewable
