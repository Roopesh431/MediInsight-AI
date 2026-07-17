import json

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.database.crud import update_document

from backend.app.services.document_service import load_document
from backend.app.services.ocr_service import extract_text_from_pdf

from backend.app.utils.text_storage import save_text
from backend.app.utils.json_storage import save_analysis

from backend.app.ai.ai_interface import analyze_document
from backend.app.ai.chat_service import chat_with_document

from backend.app.schemas.chat import ChatRequest
from backend.app.schemas.chat import ChatResponse

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

    result = analyze_document(
        text,
    )

    if isinstance(
        result,
        dict,
    ):

        raise HTTPException(
            status_code=500,
            detail=result.get(
                "error",
                "AI analysis failed.",
            ),
        )

    analysis_data = result.model_dump()

    analysis_path = save_analysis(
        document.document_id,
        analysis_data,
    )

    updated = update_document(
        db,
        document.document_id,
        document_type=result.document_type,
        confidence=result.confidence,
        status="ai_completed",
        analysis_json_path=analysis_path,
    )

    print(
        "Saved Path:",
        updated.analysis_json_path,
    )

    return result


@router.get("/{document_id}/analysis")
def get_analysis(
    document_id: str,
    db: Session = Depends(get_db),
):

    document, _ = load_document(
        document_id,
        db,
    )

    if not document.analysis_json_path:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found.",
        )

    with open(
        document.analysis_json_path,
        "r",
        encoding="utf-8",
    ) as file:

        data = json.load(file)

    return JSONResponse(
        content=data,
    )


@router.post(
    "/{document_id}/chat",
    response_model=ChatResponse,
)
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