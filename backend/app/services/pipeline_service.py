from sqlalchemy.orm import Session

from backend.app.services.document_service import (
    upload_document,
    run_ocr,
)

from backend.app.services.parser_service import (
    extract_medical_information,
)

from backend.app.ai.ai_interface import (
    analyze_document,
)


def process_upload(
    file,
    db: Session,
):
    """
    Upload document only.
    """

    return upload_document(
        file=file,
        db=db,
    )


def process_ocr(
    file,
    db: Session,
):
    """
    Upload + OCR.
    """

    upload = upload_document(
        file=file,
        db=db,
    )

    text = run_ocr(upload)

    return upload, text


def process_parser(
    file,
    db: Session,
):
    """
    Upload + OCR + Rule Parser.
    """

    upload, text = process_ocr(
        file=file,
        db=db,
    )

    parser = extract_medical_information(
        text,
    )

    return upload, parser


def process_ai(
    file,
    db: Session,
):
    """
    Upload + OCR + AI.
    """

    upload, text = process_ocr(
        file=file,
        db=db,
    )

    analysis = analyze_document(
        text,
    )

    return upload, analysis