from pathlib import Path

from fastapi import UploadFile

from backend.app.utils.constants import (
    ALLOWED_EXTENSIONS,
    MAX_FILE_SIZE,
)


def validate_extension(filename: str) -> None:
    """
    Validate that the uploaded file has an allowed extension.
    """
    extension = Path(filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError("Invalid file extension.")


def validate_file_size(file: UploadFile) -> None:

    file.file.seek(0, 2)

    size = file.file.tell()

    file.file.seek(0)

    if size > MAX_FILE_SIZE:
        raise ValueError("File exceeds maximum size.")

def validate_pdf_signature(file: UploadFile) -> None:

    file.file.seek(0)

    signature = file.file.read(4)

    file.file.seek(0)

    if signature != b"%PDF":
        raise ValueError("Invalid PDF file.")