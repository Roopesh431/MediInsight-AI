from datetime import datetime

from pydantic import BaseModel


class VersionSummary(BaseModel):

    version_number: int

    created_at: datetime

    is_current: bool


class VersionListResponse(BaseModel):

    document_id: str

    versions: list[VersionSummary]
