from pydantic import BaseModel


class UploadResponse(BaseModel):
    document_id: str
    original_filename: str
    saved_filename: str
    content_type: str
    size: int
    sha256: str
    status: str