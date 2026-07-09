from pathlib import Path
import shutil

from fastapi import UploadFile

from backend.app.schemas.upload_response import UploadResponse
from backend.app.utils.constants import UPLOAD_DIRECTORY
from backend.app.utils.file_utils import generate_filename
from backend.app.utils.hash_utils import calculate_sha256
from backend.app.utils.validators import (
    validate_extension,
    validate_file_size,
    validate_pdf_signature,
)

UPLOAD_DIR = Path(UPLOAD_DIRECTORY)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def save_uploaded_file(file: UploadFile) -> UploadResponse:
    """
    Validate, hash, rename and store an uploaded PDF file.

    Returns metadata about the stored document.
    """

    # Step 1: Validate the uploaded file
    validate_extension(file.filename)
    validate_file_size(file)
    validate_pdf_signature(file)

    # Step 2: Calculate SHA-256 hash
    sha256 = calculate_sha256(file)

    # Step 3: Generate document ID and filename
    document_id, saved_filename = generate_filename(file.filename)

    # Step 4: Create the full path
    file_path = UPLOAD_DIR / saved_filename

    # Step 5: Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 6: Return metadata
    return UploadResponse(
    document_id=document_id,
    original_filename=file.filename,
    saved_filename=saved_filename,
    content_type=file.content_type,
    size=file_path.stat().st_size,
    sha256=sha256,
    status="uploaded",
)