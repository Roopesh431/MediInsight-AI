from pydantic import BaseModel


class DocumentResponse(BaseModel):

    document_id: str

    original_filename: str

    saved_filename: str

    document_type: str

    confidence: float

    status: str

    class Config:
        from_attributes = True