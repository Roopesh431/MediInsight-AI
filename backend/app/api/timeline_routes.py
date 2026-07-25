from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.database.models import User
from backend.app.api.deps import get_current_user

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
    current_user: User = Depends(get_current_user),
):

    return get_timeline(
        db,
        user_id=current_user.id,
    )
