from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from backend.app.schemas.upload_response import UploadResponse
from backend.app.schemas.ocr_response import OCRResponse
from backend.app.schemas.parser_response import ParserResponse
from backend.app.schemas.chat import ChatRequest, ChatResponse

from backend.app.services.document_service import (
    upload_document,
    run_ocr,
)

from backend.app.database.crud import (
    get_document,
    get_documents,
)

from backend.app.services.parser_service import extract_medical_information

from backend.app.ai.ai_interface import analyze_document as ai_analyze_document
from backend.app.ai.chat_service import chat_with_document

from backend.app.database.database import get_db


router = APIRouter()


# ---------------------------------
# Upload
# ---------------------------------
@router.post("/upload", response_model=UploadResponse)
def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    upload_result = upload_document(
        file=file,
        db=db,
    )

    return upload_result

@router.get("/documents")
def list_documents(
    db: Session = Depends(get_db),
):

    return get_documents(db)
@router.get("/documents/{document_id}")
def document_details(
    document_id: str,
    db: Session = Depends(get_db),
):

    document = get_document(
        db,
        document_id,
    )

    if document is None:

        return {
            "error": "Document not found."
        }

    return document
@router.delete("/documents/{document_id}")
def delete_uploaded_document(
    document_id: str,
    db: Session = Depends(get_db),
):

    document = delete_document(
        db,
        document_id,
    )

    if document is None:

        return {
            "error":"Document not found."
        }

    return {
        "message":"Document deleted."
    }
# ---------------------------------
# OCR
# ---------------------------------
@router.post("/ocr", response_model=OCRResponse)
def ocr_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    upload_result = upload_document(
        file=file,
        db=db,
    )

    text = run_ocr(upload_result)

    return OCRResponse(
        document_id=upload_result.document_id,
        extracted_text=text,
    )


# ---------------------------------
# Rule Parser
# ---------------------------------
@router.post("/analyze", response_model=ParserResponse)
def analyze_bill(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    upload_result = upload_document(
        file=file,
        db=db,
    )

    text = run_ocr(upload_result)

    data = extract_medical_information(text)

    return ParserResponse(**data)


# ---------------------------------
# AI Analysis
# ---------------------------------
@router.post("/ai-analyze")
def ai_analyze(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    upload_result = upload_document(
        file=file,
        db=db,
    )

    text = run_ocr(upload_result)

    return ai_analyze_document(text)


# ---------------------------------
# Chat
# ---------------------------------
@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    answer = chat_with_document(
        request.document_id,
        request.question,
    )

    return ChatResponse(
        answer=answer,
    )