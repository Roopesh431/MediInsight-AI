# Auth validation — password/email hardening

## What changed

**Password can no longer contain your name or email.** Previously the only
rule was "8+ characters" — `roopesh123` or `Roopesh` itself would pass. Now
rejected: passwords under 8 characters, passwords with no letter or no
digit, and passwords containing your email's local part (the bit before
`@`) or any part of your name (3+ characters, so short name parts like "Jo"
don't false-positive).

**Fixed a real login bug while I was in here**: email lookups were
case-sensitive. Register with `Roopesh@Example.com`, try to log in with
`roopesh@example.com` (which is what most people would naturally type),
and login would fail — even though it's the same email address by any
normal definition. Fixed two ways for defense in depth: (1) both
`UserCreate` and `UserLogin` now normalize the email to lowercase before
anything else touches it, and (2) `get_user_by_email` does a
case-insensitive DB comparison regardless, which also covers any account
created before this fix.

## Files changed

**Backend**
- `backend/app/schemas/auth.py` — password complexity rules
  (`field_validator`), name/email-in-password check (`model_validator`,
  needs both fields so it can't be a plain field validator), email
  lowercasing on both `UserCreate` and `UserLogin`
- `backend/app/database/user_crud.py` — case-insensitive email lookup via
  `func.lower()`

**Frontend**
- `frontend/src/utils/apiError.ts` (new) — shared helper for parsing
  FastAPI error responses. Worth knowing why this exists: FastAPI returns
  errors in two different shapes — a plain string for errors we raise
  ourselves (`HTTPException(detail="...")`), and an array of
  `{loc, msg, type}` objects for Pydantic validation failures (422s, which
  is exactly what the new password rules trigger). The old error handling
  in both Login and Register only handled the string case, so a validation
  error would have rendered `[object Object]` in the UI instead of an
  actual message.
- `frontend/src/pages/Register/RegisterPage.tsx` — live password checklist
  that updates as you type (green check / gray X per rule), mirrors the
  backend rules exactly so you see the same requirements the server will
  enforce, not a different client-side approximation. The backend is still
  the actual source of truth; this is just so you're not guessing from a
  422 error after the fact.
- `frontend/src/pages/Login/LoginPage.tsx` — switched to the shared error
  parser (same bug fix, applied for consistency even though login itself
  doesn't have complex validation to trigger it today)

## Testing performed

**Schema-level** (12 cases) — confirmed all four password rules reject
correctly (too short, no digit, no letter, contains email, contains either
name part), confirmed a valid password/email/name combo passes, confirmed
short name parts (2 chars) don't false-positive, confirmed whitespace-only
names become `None`, confirmed names get trimmed, confirmed email
lowercasing works on both schemas.

**HTTP-level** (5 scenarios via `TestClient`) — registering with a
name-in-password correctly returns 422; registering with a mixed-case
email succeeds and the stored/returned email is lowercase; logging in with
three different casing variants of the same email all succeed against the
one registered account.

**Frontend** — `tsc --noEmit` clean, full `npm run build` succeeds.

## Try it

1. Try registering with your name as part of the password (e.g. name
   "Roopesh", password "Roopesh1234") — should see the checklist mark
   "Doesn't contain your name" as failed in real time, and the submit
   button remains usable but the actual submission will show a clear
   error if you ignore the checklist and submit anyway
2. Register normally with a valid password, using an email with some
   uppercase letters, e.g. `YourName@Gmail.com`
3. Log out, log back in typing the email in all-lowercase — should work
   despite not matching the casing you registered with
