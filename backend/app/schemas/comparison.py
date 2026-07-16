from pydantic import BaseModel


class Difference(BaseModel):

    field: str

    first_value: str

    second_value: str


class ComparisonResponse(BaseModel):

    first_document: str

    second_document: str

    differences: list[Difference]

    summary: str