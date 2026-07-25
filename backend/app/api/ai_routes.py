import json

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.database.crud import get_document, update_document
from backend.app.database.models import User

from backend.app.api.deps import get_current_user, ensure_document_access

from backend.app.services.document_service import load_document
from backend.app.services.ocr_service import extract_text_from_pdf

from backend.app.utils.text_storage import save_text
from backend.app.utils.json_storage import save_analysis_version

from backend.app.database.version_crud import (
    create_version,
    get_next_version_number,
)

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
    current_user: User = Depends(get_current_user),
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

    ensure_document_access(document, current_user)

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

    # Every analysis run becomes a new version - re-running AI analysis
    # (e.g. after switching AI providers, or getting a better OCR pass)
    # no longer destroys the previous result. document.analysis_json_path
    # always points at whichever version is "current" (normally the
    # newest, unless the user explicitly restored an older one).
    version_number = get_next_version_number(
        db,
        document.document_id,
    )

    analysis_path = save_analysis_version(
        document.document_id,
        version_number,
        analysis_data,
    )

    create_version(
        db,
        document_id=document.document_id,
        version_number=version_number,
        file_path=analysis_path,
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
    current_user: User = Depends(get_current_user),
):

    try:

        document, _ = load_document(
            document_id,
            db,
        )

    except ValueError:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    ensure_document_access(document, current_user)

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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = get_document(db, document_id)

    if document is None:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    ensure_document_access(document, current_user)

    answer = chat_with_document(
        document_id,
        request.question,
    )

    return ChatResponse(
        answer=answer,
    )
