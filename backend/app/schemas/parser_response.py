from pydantic import BaseModel
from typing import List

from backend.app.schemas.procedure import Procedure


class ParserResponse(BaseModel):
    patient_name: str | None = None
    provider: str | None = None
    statement_date: str | None = None
    visit_balance: float | None = None
    total_charges: float | None = None

    procedures: List[Procedure] = []