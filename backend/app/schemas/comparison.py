from pydantic import BaseModel


class Difference(BaseModel):

    field: str

    first_value: str

    second_value: str


class ProcedureDifference(BaseModel):

    status: str  # "added", "removed", or "changed"

    code: str | None = None

    description: str | None = None

    first_charge: float | None = None

    second_charge: float | None = None


class ComparisonResponse(BaseModel):

    first_document: str

    second_document: str

    differences: list[Difference]

    procedure_differences: list[ProcedureDifference]

    total_charge_delta: float | None = None

    summary: str
