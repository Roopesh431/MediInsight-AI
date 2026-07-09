# 🏥 MediInsight AI

An AI-powered medical document analysis platform that extracts, structures, and analyzes information from hospital bills and medical reports using OCR and Artificial Intelligence.

---

# 🚀 Current Features

### ✅ Backend
- FastAPI REST API
- Modular project architecture
- Interactive Swagger documentation
- Health check endpoint

### ✅ Secure PDF Upload
- PDF upload API
- UUID-based file naming
- SHA-256 document hashing
- File extension validation
- File size validation
- PDF signature verification

### ✅ OCR Pipeline
- PDF to image conversion (Poppler)
- Text extraction using Tesseract OCR
- Multi-page PDF support

### ✅ Medical Information Extraction
- Patient information extraction
- Provider information extraction
- Statement date extraction
- Visit balance extraction
- Total charge extraction
- Procedure extraction (Initial Version)

---

# 🚧 Currently In Development

- AI-powered medical bill understanding
- LLM-based structured data extraction
- Medical report summarization
- Billing anomaly detection
- Insurance claim assistance
- Interactive dashboard

---

# 🛠 Tech Stack

## Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

## OCR

- Tesseract OCR
- Poppler
- pdf2image
- Pillow

## AI (Upcoming)

- Google Gemini
- Hugging Face Transformers
- SentenceTransformers

## Frontend (Upcoming)

- React
- Tailwind CSS

## Database (Upcoming)

- SQLite
- PostgreSQL

---

# 📂 Project Architecture

```
MediInsight-AI
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── schemas
│   │   ├── services
│   │   ├── utils
│   │   ├── models
│   │   ├── database
│   │   └── main.py
│   │
│   └── uploads
│
├── frontend
│
└── README.md
```

---

# 📌 Implemented API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Welcome endpoint |
| GET | `/health` | Health check |
| POST | `/upload` | Secure PDF upload |
| POST | `/ocr` | OCR text extraction |
| POST | `/analyze` | Structured medical bill extraction |

---

# 🛣 Roadmap

## ✅ Phase 1

- Repository setup
- Backend architecture
- Secure PDF upload
- OCR pipeline
- Medical bill parser

## 🚧 Phase 2

- AI-powered structured extraction
- Hospital bill understanding
- Medical report understanding
- Billing explanation

## ⏳ Phase 3

- Medical chatbot
- RAG implementation
- Interactive dashboard
- Authentication
- Database integration

## ⏳ Phase 4

- Docker deployment
- Cloud deployment
- CI/CD
- Monitoring

---

# 🎯 Project Goal

MediInsight AI aims to simplify the understanding of hospital bills and medical reports by combining OCR, Artificial Intelligence, and Large Language Models into a single intelligent document analysis platform.

---

# 👨‍💻 Author

**Lingam Roopesh**
