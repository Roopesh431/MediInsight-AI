from pydantic import BaseModel


class OCRResponse(BaseModel):
    document_id: str
    extracted_text: str