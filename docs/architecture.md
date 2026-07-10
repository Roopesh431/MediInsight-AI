# 🏗 MediInsight AI Architecture

## Overview

MediInsight AI follows a layered architecture that separates API endpoints, business logic, AI integration, database operations, and utility functions. This separation improves maintainability, scalability, and testing.

---

# High Level Architecture

```
                    User
                     │
                     ▼
              FastAPI REST API
                     │
      ┌──────────────┼──────────────┐
      │              │              │
      ▼              ▼              ▼
 Upload Routes   AI Routes   Document Routes
      │              │              │
      └──────────────┼──────────────┘
                     │
             Processing Services
                     │
     ┌───────────────┼────────────────┐
     │               │                │
     ▼               ▼                ▼
 Upload         OCR Service      Parser Service
 Service             │
                     ▼
              Extracted Text
                     │
                     ▼
              AI Integration
             (Google Gemini)
                     │
                     ▼
              Structured Output
                     │
                     ▼
             SQLite Database
```

---

# Folder Structure

```
backend/
│
├── app/
│   │
│   ├── ai/
│   │     ├── ai_interface.py
│   │     ├── gemini_service.py
│   │     ├── prompts.py
│   │     ├── response_parser.py
│   │     └── chat_service.py
│   │
│   ├── api/
│   │     ├── upload_routes.py
│   │     ├── document_routes.py
│   │     ├── processing_routes.py
│   │     ├── ai_routes.py
│   │     └── routes.py
│   │
│   ├── database/
│   │     ├── database.py
│   │     ├── models.py
│   │     └── crud.py
│   │
│   ├── schemas/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   └── main.py
│
├── uploads/
├── extracted_text/
├── config.py
└── requirements.txt
```

---

# Request Flow

## Upload

```
Client
   │
   ▼
POST /documents
   │
   ▼
Upload Service
   │
   ▼
Save PDF
   │
   ▼
Generate UUID
   │
   ▼
Store Metadata
   │
   ▼
SQLite
```

---

## OCR

```
Client
   │
   ▼
POST /documents/{id}/ocr
   │
   ▼
Find PDF
   │
   ▼
OCR Service
   │
   ▼
Extract Text
   │
   ▼
Save TXT
   │
   ▼
Update Database
```

---

## AI Analysis

```
Client
   │
   ▼
POST /documents/{id}/ai-analyze
   │
   ▼
Read OCR Text
   │
   ▼
Gemini Prompt
   │
   ▼
Gemini API
   │
   ▼
JSON Response
   │
   ▼
Response Parser
   │
   ▼
Validated Output
```

---

## AI Chat

```
Question
     │
     ▼
Load OCR Text
     │
     ▼
Prompt Builder
     │
     ▼
Gemini
     │
     ▼
Answer
```

---

# Design Principles

- Modular routing
- Separation of concerns
- Service-oriented architecture
- Reusable CRUD layer
- Pydantic validation
- Structured AI responses
- RESTful APIs
- Clean project organization

---

# Future Architecture

Future versions will include:

- JWT Authentication
- React Frontend
- Docker
- Redis Caching
- Background Workers
- RAG Pipeline
- Vector Database
- Cloud Deployment