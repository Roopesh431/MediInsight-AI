# 🏥 MediInsight AI

An AI-powered medical document analysis platform that extracts information from hospital bills, prescriptions, lab reports, and medical documents using OCR and Large Language Models.

---

## 🚀 Project Progress

```text
Backend         ████████████████████ 100%

Frontend        ███████████████████░ 95%

AI Integration  ████████████████████ 100%

OCR Pipeline    ████████████████████ 100%

Database        ████████████████████ 100%

Authentication  ░░░░░░░░░░░░░░░░░░░░   0%

Deployment      ░░░░░░░░░░░░░░░░░░░░   0%

Testing         ████████████████░░░░ 80%

Documentation   ██████████████████░░ 90%
```

---

## ✨ Features

- 📄 Upload Medical Documents (PDF)
- 🔍 OCR Text Extraction
- 🤖 AI Medical Report Generation
- 💊 Medical Term Explanation
- 🩺 Patient Advice
- 📋 Procedure Extraction
- ❓ AI Suggested Questions
- 💬 AI Chat Assistant
- 📑 Export AI Report as PDF
- 📂 Search & Filter Documents
- 📊 Dashboard Analytics
- 📜 Processing History
- ⚙️ Settings Page

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- jsPDF

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### AI

- Google Gemini 2.5 Flash
- PaddleOCR
- pdf2image

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

---

### Upload Workflow

![Upload](screenshots/upload.png)

---

### Documents

![Documents](screenshots/documents.png)

---

### OCR Result

![OCR](screenshots/ocr.png)

---

### AI Medical Report

![AI Report](screenshots/ai-report.png)

---

### AI Chat Assistant

![Chat](screenshots/chat.png)

---

### History

![History](screenshots/history.png)

---

## 🏗 Architecture

```
Frontend (React + TypeScript)
        │
        ▼
 FastAPI REST API
        │
        ▼
SQLite Database
        │
        ├────────► OCR Pipeline (PaddleOCR)
        │
        └────────► Gemini 2.5 Flash
```

---

## 📁 Project Structure

```
MediInsight-AI
│
├── backend
│   ├── ai
│   ├── api
│   ├── database
│   ├── services
│   ├── utils
│   ├── uploads
│   ├── extracted_text
│   └── analysis
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── utils
│   └── types
│
├── screenshots
├── README.md
└── requirements.txt
```

---

## ⚙️ Installation

### Backend

```bash
cd backend

python -m venv .venv

pip install -r requirements.txt

uvicorn backend.app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🎯 Roadmap

### Version 1.1

- User Authentication
- User Accounts
- Cloud File Storage
- Responsive Mobile UI

### Version 1.2

- RAG-based Chat
- Medical Report Comparison
- Medical Timeline
- Better PDF Export

### Version 2.0

- Doctor Dashboard
- Patient Dashboard
- Appointment Integration
- Multi-language OCR
- DICOM Image Support
- Medical Image Analysis

---

## 👨‍💻 Author

**Lingam Roopesh**

B.Tech - Internet of Things

KL University

---

## ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.