from pathlib import Path

from sqlalchemy.orm import Session

from backend.app.database.crud import (
    get_document,
    update_document,
)

from backend.app.services.ocr_service import extract_text_from_pdf
from backend.app.utils.text_storage import save_text

TEXT_FOLDER = Path("backend/extracted_text")


def get_text_path(
    document_id: str,
) -> Path:

    return TEXT_FOLDER / f"{document_id}.txt"


def get_document_text(
    document_id: str,
    db: Session,
) -> str:
    pass