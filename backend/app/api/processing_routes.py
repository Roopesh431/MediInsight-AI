from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.services.document_service import load_document
from backend.app.services.ocr_service import extract_text_from_pdf
from backend.app.services.parser_service import extract_medical_information

from backend.app.schemas.ocr_response import OCRResponse
from backend.app.schemas.parser_response import ParserResponse

from backend.app.utils.text_storage import save_text
from backend.app.database.crud import update_document

router = APIRouter(
    prefix="/documents",
    tags=["Processing"],
)

@router.post("/{document_id}/ocr", response_model=OCRResponse)
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

    text_path = f"backend/extracted_text/{document.document_id}.txt"

    update_document(
        db,
        document.document_id,
        status="ocr_completed",
        ocr_text_path=str(text_path),
    )

    return OCRResponse(
        document_id=document.document_id,
        extracted_text=text,
    )

@router.post("/{document_id}/analyze", response_model=ParserResponse)
def analyze_document(
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

    data = extract_medical_information(
    text,
    )

    update_document(
        db,
        document.document_id,
        status="parsed",
    )

    return ParserResponse(**data)