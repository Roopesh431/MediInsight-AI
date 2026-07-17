<div align="center">

# 🏥 MediInsight AI

**Turn medical documents into answers — not paperwork.**

Upload a hospital bill, prescription, or lab report and get an instant OCR
extraction, an AI-generated plain-language summary, and a chat assistant
that can answer questions about it — grounded in the document itself.

[Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Roadmap](#-roadmap)

</div>

---

## 🚧 Project Status: Working Prototype (v1.1)

This is a functioning end-to-end prototype, not a finished product. The
core pipeline — upload → OCR → AI analysis → chat — works reliably. Some
pieces (auth, deployment, comparison/timeline polish) are still in progress.
Treat this as an active build-in-public project, not a v1.0 release.

| Layer               | Status          |
|---------------------|-----------------|
| Backend API         | ✅ Working       |
| OCR Pipeline        | ✅ Working       |
| AI Analysis         | ✅ Working       |
| RAG-based Chat      | ✅ Working       |
| Dashboard / UI      | ✅ Working       |
| Document Comparison | 🚧 In progress   |
| Medical Timeline    | 🚧 In progress   |
| Authentication      | ⬜ Not started   |
| Deployment          | ⬜ Not started   |

---

## ✨ Features

### 📄 Document Processing
- PDF upload with validation, hashing, and unique storage
- OCR text extraction (Tesseract + Poppler)
- Persistent document history via SQLite

### 🤖 AI Analysis
- Structured medical report generation: patient, hospital, doctor, procedures, financials
- Plain-language summaries and medical term explanations
- Suggested follow-up questions
- Financial figures cross-validated against the OCR text to prevent AI arithmetic drift

### 💬 AI Chat Assistant
- Retrieval-augmented chat (FAISS + sentence-transformers) grounded in the uploaded document
- Falls back to general medical knowledge when the document doesn't have the answer — clearly labeled as such
- Multi-provider AI Gateway with automatic failover (see [Architecture](#-architecture))

### 📊 Dashboard & Document Management
- Upload workflow with live processing status
- Search, filter, and delete documents
- OCR and AI report viewers
- Export AI report as PDF

---

## 🏗 Architecture

```
                        React + TypeScript (Vite)
                                 │
                                 ▼
                        FastAPI REST API
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                   ▼
          SQLite DB      OCR (Tesseract +      AI Gateway
                          Poppler)             ┌──────────┐
                                                │  Groq    │→ primary
                                                │  Gemini  │→ fallback
                                                │OpenRouter│→ fallback
                                                └──────────┘
                                 │
                                 ▼
                      FAISS + Sentence-Transformers
                          (RAG for document chat)
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                   ▼
          OCR Viewer      AI Chat Assistant     PDF Export
```

**Why an AI Gateway?** Analysis and chat run through a provider-agnostic
interface with automatic failover across Groq, Gemini, and OpenRouter. If
one provider is rate-limited or down, the request transparently retries on
the next — the rest of the app never knows which model actually answered.

---

## 🛠 Tech Stack

**Frontend** — React · TypeScript · Tailwind CSS · React Router · Axios · React Hot Toast · jsPDF

**Backend** — FastAPI · SQLAlchemy · SQLite · Pydantic

**AI / OCR** — Groq · Google Gemini 2.5 Flash · OpenRouter · Tesseract OCR · pdf2image / Poppler · FAISS · Sentence-Transformers

---

## 📸 Screenshots

| Dashboard | Upload Workflow | Documents |
|---|---|---|
| ![Dashboard](screenshots/dashboard.png) | ![Upload](screenshots/upload.png) | ![Documents](screenshots/documents.png) |

| OCR Result | AI Medical Report | Chat Assistant |
|---|---|---|
| ![OCR](screenshots/ocr.png) | ![AI Report](screenshots/ai-report.png) | ![Chat](screenshots/chat.png) |

---

## 📁 Project Structure

```
MediInsight-AI/
├── backend/
│   └── app/
│       ├── ai/            # AI Gateway: provider classes, prompts, response parsing
│       ├── api/            # FastAPI routes
│       ├── database/       # SQLAlchemy models, CRUD
│       ├── ocr/             # OCR extraction
│       ├── rag/            # Chunking, embeddings, FAISS vector store
│       ├── schemas/        # Pydantic schemas
│       ├── services/       # Business logic (parsing, validation, pipeline)
│       └── utils/
├── frontend/
│   └── src/
│       ├── components/     # dashboard, ai, chat, documents, comparison, timeline
│       ├── pages/
│       ├── services/       # API client
│       └── types/
├── requirements.txt
└── frontend/package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Tesseract OCR and Poppler installed and on your PATH

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt

# Add your API keys to backend/.env (see backend/.env.example)

uvicorn backend.app.main:app --reload
```

Backend: `http://127.0.0.1:8000` · Swagger docs: `http://127.0.0.1:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

---

## 🗺 Roadmap

**Now (v1.1)**
- [ ] Document comparison polish
- [ ] Medical timeline view
- [ ] Dark mode
- [ ] Mobile responsive pass

**Next (v1.2)**
- [ ] User authentication and profiles
- [ ] Report versioning
- [ ] Cloud storage for uploads
- [ ] Deployment (Docker + cloud hosting)

**Later (v2.0)**
- [ ] Doctor / patient dashboards
- [ ] Multi-language OCR
- [ ] Medical image analysis (DICOM support)
- [ ] Voice assistant
- [ ] Hospital integration APIs

---

## 🤝 Contributing

```bash
git checkout -b feature-name
git commit -m "Add feature"
git push origin feature-name
```

Then open a Pull Request.

---

## 👨‍💻 Author

**Lingam Roopesh**
[GitHub](https://github.com/roopesh431) · [LinkedIn](https://linkedin.com/in/lingam-roopesh)

---

## 📄 License

MIT License.

---

<div align="center">

If this project is useful to you, consider giving it a ⭐ on GitHub.

</div>
