from backend.app.services.upload_service import save_uploaded_file
from backend.app.services.ocr_service import extract_text_from_pdf
from backend.app.utils.text_storage import save_text

from backend.app.database.crud import create_document


def upload_document(file, db):
    """
    Upload a PDF and register it in the database.
    """

    upload_result = save_uploaded_file(file)

    create_document(
        db=db,
        document_id=upload_result.document_id,
        original_filename=upload_result.original_filename,
        saved_filename=upload_result.saved_filename,
    )

    return upload_result


def run_ocr(upload_result):
    """
    Run OCR and save extracted text.
    """

    text = extract_text_from_pdf(
        f"backend/uploads/{upload_result.saved_filename}"
    )

    save_text(
        upload_result.document_id,
        text,
    )

    return text