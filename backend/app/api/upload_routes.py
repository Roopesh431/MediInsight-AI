from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.schemas.upload_response import UploadResponse
from backend.app.services.document_service import upload_document

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post("", response_model=UploadResponse)
def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    upload_result = upload_document(
        file=file,
        db=db,
    )

    return upload_result