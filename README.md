# 🏥 MediInsight AI

An AI-powered medical document analysis platform that helps patients understand hospital bills and medical reports using OCR, Natural Language Processing, and Large Language Models.

---

## 📌 Overview

MediInsight AI extracts text from uploaded medical PDFs, analyzes the document using AI, explains medical terminology in simple language, and allows users to ask questions about their medical documents through an intelligent chatbot.

The project is built with a modular backend architecture using FastAPI and is designed to be extended with a modern React frontend.

---

# ✨ Features

## 📄 Document Upload

- Upload PDF medical reports
- Upload hospital bills
- Automatic document storage
- SHA-256 integrity hash generation

---

## 🔍 OCR

- Extract text from scanned PDFs
- OCR text stored for future reuse
- Avoids re-uploading documents

---

## 📊 Rule-Based Analysis

Automatically extracts:

- Patient Name
- Hospital
- Doctor
- Statement Date
- Visit Balance
- Total Charges
- Medical Procedures

---

## 🤖 AI Analysis

Powered by **Google Gemini**.

Provides:

- Medical summary
- Medical term explanations
- Patient-friendly advice
- Suggested questions to ask doctors
- Confidence score
- Structured JSON output

---

## 💬 AI Chat

Users can ask questions such as:

- Why is my balance so high?
- What is Ciprofloxacin IV?
- What does CPT Code 99215 mean?
- What should I ask my doctor?

The chatbot answers using the OCR text extracted from the uploaded document.

---

## 📁 Document Management

- Upload documents
- View uploaded documents
- Process OCR
- Run AI Analysis
- Delete documents
- SQLite metadata storage

---

# 🏗 Backend Architecture

```
Client
   │
   ▼
FastAPI API
   │
   ├── Upload Routes
   ├── Document Routes
   ├── Processing Routes
   └── AI Routes
           │
           ▼
      Service Layer
           │
           ▼
      AI Integration
      OCR Engine
      Parser
      Chat
           │
           ▼
      SQLite Database
```

---

# 📂 Project Structure

```
backend/
│
├── app/
│   ├── ai/
│   ├── api/
│   ├── database/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── uploads/
├── extracted_text/
├── config.py
└── requirements.txt
```

---

# 🛠 Tech Stack

## Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

## AI

- Google Gemini API
- PaddleOCR

## Utilities

- UUID
- SHA-256
- pathlib

---

# 📌 Available APIs

| Method | Endpoint | Description |
|----------|------------------------------|-----------------------------|
| POST | `/documents` | Upload PDF |
| GET | `/documents` | List uploaded documents |
| GET | `/documents/{id}` | Document details |
| DELETE | `/documents/{id}` | Delete document |
| POST | `/documents/{id}/ocr` | Extract OCR |
| POST | `/documents/{id}/analyze` | Rule-based analysis |
| POST | `/documents/{id}/ai-analyze` | AI analysis |
| POST | `/documents/{id}/chat` | Chat with document |

---

# 📊 Current Status

## ✅ Completed

- Backend Architecture
- Modular API Design
- PDF Upload
- OCR
- Rule-Based Parser
- Gemini AI Integration
- AI Chat
- SQLite Database
- Document Management
- Swagger Documentation

---

## 🚧 In Progress

- React Frontend
- Dashboard
- Authentication
- Docker Support

---

## 📅 Planned

- User Accounts
- RAG
- Vector Database
- Medical Report Comparison
- Export AI Analysis
- Cloud Deployment

---

# 🚀 Running Locally

```bash
git clone https://github.com/Roopesh431/MediInsight-AI.git

cd MediInsight-AI

python -m venv .venv

source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create

```
backend/.env
```

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run

```bash
uvicorn backend.app.main:app --reload
```

Open

```
http://127.0.0.1:8000/docs
```

---

# 📈 Development Progress

```
Backend        ████████████████████ 100%

Frontend       ░░░░░░░░░░░░░░░░░░░░   0%

Authentication ░░░░░░░░░░░░░░░░░░░░

Deployment     ░░░░░░░░░░░░░░░░░░░░
```

---

# 👨‍💻 Author

**Lingam Roopesh**

B.Tech — Internet of Things

Passionate about AI, Embedded Systems, IoT, and Healthcare Technology.

---

# ⭐ Future Vision

MediInsight AI aims to become an intelligent healthcare assistant capable of:

- Understanding medical reports
- Explaining complex terminology
- Assisting patients with billing
- Comparing historical reports
- Answering medical document questions using Retrieval-Augmented Generation (RAG)