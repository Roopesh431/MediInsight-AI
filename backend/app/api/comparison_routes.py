from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.database import get_db

from backend.app.services.comparison_service import (
    compare_reports,
)

from backend.app.schemas.comparison import (
    ComparisonResponse,
)

router = APIRouter(
    prefix="/comparison",
    tags=["Comparison"],
)


@router.get(
    "",
    response_model=ComparisonResponse,
)
def compare(
    first_document_id: str,
    second_document_id: str,
    db: Session = Depends(get_db),
):

    try:

        return compare_reports(
            first_document_id,
            second_document_id,
            db,
        )

    except ValueError as error:

        raise HTTPException(
            status_code=404,
            detail=str(error),
        )