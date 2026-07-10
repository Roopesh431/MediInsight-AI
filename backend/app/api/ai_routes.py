from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.services.document_service import load_document

from backend.app.services.ocr_service import extract_text_from_pdf
from backend.app.utils.text_storage import save_text

from backend.app.ai.ai_interface import analyze_document
from backend.app.ai.chat_service import chat_with_document

from backend.app.schemas.chat import ChatRequest
from backend.app.schemas.chat import ChatResponse
from backend.app.database.crud import update_document

router = APIRouter(
    prefix="/documents",
    tags=["AI"],
)

@router.post("/{document_id}/ai-analyze")
def ai_analyze(
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

    result = analyze_document(text)

   

    update_document(
        db,
        document.document_id,
        document_type=result.document_type,
        confidence=result.confidence,
        status="ai_completed",
    )

    return result

@router.post("/{document_id}/chat", response_model=ChatResponse)
def chat(
    document_id: str,
    request: ChatRequest,
):

    answer = chat_with_document(
        document_id,
        request.question,
    )

    return ChatResponse(
        answer=answer,
    )   