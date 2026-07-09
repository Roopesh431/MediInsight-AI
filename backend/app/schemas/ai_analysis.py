from pydantic import BaseModel, Field

from backend.app.schemas.procedure import Procedure


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

    confidence: float