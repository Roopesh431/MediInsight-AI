from pydantic import BaseModel


class TimelineItem(BaseModel):

    document_id: str

    document_type: str

    title: str

    date: str

    hospital: str

    doctor: str

    summary: str


class TimelineResponse(BaseModel):

    timeline: list[TimelineItem]