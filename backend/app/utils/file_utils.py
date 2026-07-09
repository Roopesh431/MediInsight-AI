from pathlib import Path
from uuid import uuid4

def generate_filename(filename: str) -> tuple[str, str]:

    extension = Path(filename).suffix.lower()

    document_id = str(uuid4())

    saved_filename = f"{document_id}{extension}"

    return document_id, saved_filename