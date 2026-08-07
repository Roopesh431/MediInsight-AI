FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

# Install CPU-only torch first (much smaller) - without this,
# sentence-transformers pulls the full CUDA build by default
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/

ENV PORT=8000
EXPOSE 8000

CMD uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT}
