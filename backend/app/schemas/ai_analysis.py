from pydantic import BaseModel, Field

from backend.app.schemas.procedure import Procedure
from pydantic import Field
from backend.app.schemas.medical_term import MedicalTerm


class AIAnalysisResponse(BaseModel):
    document_type: str

    hospital: str

    patient_name: str

    doctor: str | None = None

    statement_date: str | None = None

    total_charges: float | None = None

    remaining_balance: float | None = None

    procedures: list[Procedure] = Field(default_factory=list)

    summary: str
    medical_terms: list[MedicalTerm] = Field(default_factory=list)

    patient_advice: list[str] = Field(default_factory=list)

    recommended_questions: list[str] = Field(default_factory=list)

    confidence: float