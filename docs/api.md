# 📡 API Documentation

Base URL

```
http://127.0.0.1:8000
```

Swagger

```
/docs
```

---

# Upload

## POST /documents

Uploads a medical PDF.

### Request

Multipart Form

```
file = sample.pdf
```

### Response

```json
{
  "document_id": "...",
  "status": "uploaded"
}
```

---

# List Documents

## GET /documents

Returns all uploaded documents.

### Response

```json
[
  {
    "document_id": "...",
    "status": "uploaded"
  }
]
```

---

# Get Document

## GET /documents/{document_id}

Returns document metadata.

---

# Delete Document

## DELETE /documents/{document_id}

Deletes the document metadata.

---

# OCR

## POST /documents/{document_id}/ocr

Runs OCR on the uploaded PDF.

### Response

```json
{
    "document_id":"...",
    "extracted_text":"..."
}
```

---

# Rule Parser

## POST /documents/{document_id}/analyze

Extracts structured information.

Example

```json
{
    "patient_name":"Jane Doe",
    "provider":"Mayo Clinic",
    "visit_balance":"538.56"
}
```

---

# AI Analysis

## POST /documents/{document_id}/ai-analyze

Uses Gemini AI to analyze the document.

Returns

- Summary
- Medical terms
- Patient advice
- Recommended questions
- Confidence score

---

# AI Chat

## POST /documents/{document_id}/chat

Request

```json
{
    "document_id":"...",
    "question":"Why is my balance high?"
}
```

Response

```json
{
    "answer":"Your remaining balance is..."
}
```

---

# HTTP Status Codes

| Code | Meaning |
|-------|----------|
|200|Success|
|400|Bad Request|
|404|Document Not Found|
|422|Validation Error|
|500|Internal Server Error|

---

# API Workflow

```
Upload
    │
    ▼
OCR
    │
    ▼
AI Analysis
    │
    ▼
Chat
```