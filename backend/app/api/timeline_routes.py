from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database.database import get_db

from backend.app.services.timeline_service import get_timeline

from backend.app.schemas.timeline import TimelineResponse

router = APIRouter(
    prefix="/timeline",
    tags=["Timeline"],
)


@router.get(
    "",
    response_model=TimelineResponse,
)
def timeline(
    db: Session = Depends(get_db),
):

    return get_timeline(
        db,
    )