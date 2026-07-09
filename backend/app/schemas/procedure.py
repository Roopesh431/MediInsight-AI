from pydantic import BaseModel


class Procedure(BaseModel):
    date: str
    code: str
    description: str
    charge: float