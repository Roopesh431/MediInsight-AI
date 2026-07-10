# 🗄 Database Documentation

MediInsight AI currently uses SQLite for storing document metadata.

---

# Database

SQLite

```
medinsight.db
```

---

# Tables

## Document

Stores uploaded document information.

---

# Schema

| Column | Type | Description |
|----------|----------|-----------------------|
|document_id|TEXT|UUID Primary Key|
|original_filename|TEXT|Uploaded filename|
|saved_filename|TEXT|Stored filename|
|document_type|TEXT|Detected document type|
|confidence|REAL|AI confidence score|
|status|TEXT|Processing status|
|ocr_text_path|TEXT|OCR text location|

---

# Status Flow

```
uploaded
     │
     ▼
ocr_completed
     │
     ▼
analyzed
     │
     ▼
ai_completed
```

---

# Database Lifecycle

Upload

```
Insert Row
```

OCR

```
Update

status

ocr_text_path
```

AI

```
Update

document_type

confidence

status
```

Delete

```
Delete Row
```

---

# Example Record

| Field | Value |
|---------|------------------------------|
|document_id|6cb190da...|
|original_filename|sample.pdf|
|saved_filename|6cb190da.pdf|
|document_type|Hospital Bill|
|confidence|0.98|
|status|ai_completed|
|ocr_text_path|backend/extracted_text/6cb190da.txt|

---

# Entity Relationship

```
          Document
              │
              │
              ▼
      OCR Text File (.txt)
              │
              ▼
      AI Analysis Output
```

---

# Future Database Expansion

Future versions may include additional tables.

## Users

```
id

name

email

password
```

---

## Chat History

```
id

document_id

question

answer

timestamp
```

---

## AI Analysis Cache

```
id

document_id

summary

medical_terms

confidence

created_at
```

---

## Audit Logs

```
id

action

user

time

ip
```

---

# Planned Migration

Current

```
SQLite
```

Future

```
PostgreSQL
```

using SQLAlchemy ORM without changing application logic.