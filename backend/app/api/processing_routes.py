from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session

from backend.app.database.crud import update_document
from backend.app.database.database import get_db
from backend.app.schemas.ocr_response import OCRResponse
from backend.app.services.document_service import load_document
from backend.app.services.ocr_service import extract_text_from_pdf
from backend.app.utils.text_storage import save_text

router = APIRouter(
    prefix="/documents",
    tags=["Processing"],
)


@router.post(
    "/{document_id}/ocr",
    response_model=OCRResponse,
)
def process_ocr(
    document_id: str,
    db: Session = Depends(get_db),
):

    try:

        document, pdf_path = load_document(
            document_id,
            db,
        )

    except ValueError:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    text = extract_text_from_pdf(
        pdf_path,
    )

    save_text(
        document.document_id,
        text,
    )

    text_path = (
        f"backend/extracted_text/{document.document_id}.txt"
    )

    update_document(
        db,
        document.document_id,
        status="ocr_completed",
        ocr_text_path=text_path,
    )

    return OCRResponse(
        document_id=document.document_id,
        extracted_text=text,
    )


@router.get(
    "/{document_id}/ocr-text",
    response_class=PlainTextResponse,
)
def get_ocr_text(
    document_id: str,
    db: Session = Depends(get_db),
):

    document, _ = load_document(
        document_id,
        db,
    )

    if not document.ocr_text_path:

        raise HTTPException(
            status_code=404,
            detail="OCR not completed.",
        )

    text_path = Path(
        document.ocr_text_path,
    )

    if not text_path.exists():

        raise HTTPException(
            status_code=404,
            detail="OCR file missing.",
        )

    return text_path.read_text(
        encoding="utf-8",
    )


# Note: AI analysis lives in ai_routes.py (POST /documents/{id}/ai-analyze).
# A duplicate /analyze endpoint used to live here doing the same thing;
# it was never called by the frontend and has been removed.