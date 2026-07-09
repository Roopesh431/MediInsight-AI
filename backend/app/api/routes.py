from fastapi import APIRouter, UploadFile, File

from backend.app.schemas.upload_response import UploadResponse
from backend.app.schemas.ocr_response import OCRResponse
from backend.app.services.upload_service import save_uploaded_file
from backend.app.services.ocr_service import extract_text_from_pdf
from backend.app.services.parser_service import extract_medical_information
from backend.app.schemas.parser_response import ParserResponse
from backend.app.ai.ai_interface import analyze_document as ai_analyze_document

router = APIRouter()


@router.post("/upload", response_model=UploadResponse)
def upload_file(file: UploadFile = File(...)):
    return save_uploaded_file(file)


@router.post("/ocr", response_model=OCRResponse)
def ocr_file(file: UploadFile = File(...)):

    upload_result = save_uploaded_file(file)

    text = extract_text_from_pdf(
        f"backend/uploads/{upload_result.saved_filename}"
    )

    return OCRResponse(
        document_id=upload_result.document_id,
        extracted_text=text,
    )

@router.post("/analyze", response_model=ParserResponse)
def analyze_bill(file: UploadFile = File(...)):

    upload_result = save_uploaded_file(file)

    text = extract_text_from_pdf(
        f"backend/uploads/{upload_result.saved_filename}"
    )

    data = extract_medical_information(text)

    return ParserResponse(**data)

@router.post("/ai-analyze")
def ai_analyze(file: UploadFile = File(...)):

    upload = save_uploaded_file(file)

    text = extract_text_from_pdf(
        f"backend/uploads/{upload.saved_filename}"
    )

    return ai_analyze_document(text)