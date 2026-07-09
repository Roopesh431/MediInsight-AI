from pydantic import BaseModel


class MedicalTerm(BaseModel):
    term: str
    meaning: str