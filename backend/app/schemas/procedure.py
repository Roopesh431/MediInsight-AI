from pydantic import BaseModel


class Procedure(BaseModel):

    date: str | None = None

    code: str | None = None

    description: str | None = None

    charge: float | None = None