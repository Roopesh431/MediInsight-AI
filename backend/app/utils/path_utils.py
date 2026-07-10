from pathlib import Path

from backend.app.utils.constants import (
    UPLOAD_DIRECTORY,
)


def get_pdf_path(saved_filename: str) -> str:

    return str(
        Path(UPLOAD_DIRECTORY) / saved_filename
    )


def get_text_path(document_id: str) -> str:

    return str(
        Path("backend/extracted_text")
        / f"{document_id}.txt"
    )