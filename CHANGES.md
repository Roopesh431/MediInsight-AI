# MediInsight AI - Fixes Applied

Drop these files into your project at the matching paths (they mirror your
folder structure), then follow the steps below.

## Files in this package

1. `frontend/package.json` — added `tailwindcss` and `@tailwindcss/vite` as
   devDependencies. Your `vite.config.ts` and `styles.css` were already using
   them, but they were never actually declared as a dependency (they'd been
   installed at the project root by mistake, not inside `frontend/`). This is
   almost certainly the cause of your earlier "error from npm".

2. `requirements.txt` and `backend/requirements.txt` — re-saved as plain
   UTF-8. Both files were UTF-16 (a side effect of `pip freeze > requirements.txt`
   in PowerShell), which some pip installs fail to parse.

3. `backend/app/ai/ai_manager.py` — re-enabled Groq and OpenRouter as real
   fallback providers, in the order Groq -> Gemini -> OpenRouter (matching
   your `.env`'s PRIMARY_PROVIDER/SECONDARY_PROVIDER/TERTIARY_PROVIDER).
   Previously only Gemini was active, so any Gemini failure/rate-limit took
   down analysis and chat completely. Cerebras is still disabled — it was
   never actually implemented (empty provider file, no SDK installed, no key
   configured), so I left it out rather than fake an integration.

4. `backend/app/ai/providers/openrouter_provider.py` — was a completely empty
   file. Rewrote it as a real provider class (same shape as `groq_provider.py`)
   using plain REST calls, matching the logic your old `openrouter_service.py`
   already had.

5. `backend/app/api/processing_routes.py` — removed the duplicate
   `POST /documents/{id}/analyze` endpoint. It did the exact same thing as
   `ai_routes.py`'s `POST /documents/{id}/ai-analyze` and the frontend never
   called it. Cleaned up the now-unused imports that went with it.

## Manual cleanup (not included as files, just delete these)

- `backend/app/routes/summary_routes.py`
- `backend/app/services/summary_service.py`

These implement the "Summary" feature from your earlier sessions but were
never registered in `api/routes.py` — dead code that does nothing. Delete
both, and delete the now-empty `backend/app/routes/` folder if nothing else
uses it.

## Steps to apply

```bash
# 1. Frontend - reinstall so tailwind actually gets pulled in
cd frontend
npm install

# 2. Backend - reinstall deps (now that requirements.txt is UTF-8)
cd ../backend
pip install -r requirements.txt

# 3. Delete the dead summary files
rm app/routes/summary_routes.py app/services/summary_service.py
rmdir app/routes   # only if empty

# 4. Restart both servers and test
```

## Also worth doing soon (didn't touch, just flagging)

- **Rotate your Groq/Gemini/OpenRouter API keys.** Your `.env` is properly
  gitignored so it's likely not on GitHub, but the keys did pass through this
  chat, so treat them as seen and rotate them as routine hygiene.
- You have two separate settings modules: `backend/config.py` (used by the AI
  providers) and `backend/app/config.py` (used by `main.py`). Not broken, but
  worth merging into one at some point so you don't accidentally edit the
  wrong one.
