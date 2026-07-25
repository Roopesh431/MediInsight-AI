from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.document import DocumentResponse

from backend.app.database.database import get_db
from backend.app.database.models import User
from backend.app.api.deps import get_current_user, ensure_document_access
from backend.app.database.crud import (
    get_document,
    get_documents,
    delete_document,
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.get(
    "",
    response_model=list[DocumentResponse],
)
def list_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_documents(db, user_id=current_user.id)


@router.get(
    "/{document_id}",
    response_model=DocumentResponse,
)
def document_details(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = get_document(
        db,
        document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    ensure_document_access(document, current_user)

    return document


@router.delete("/{document_id}")
def remove_document(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = get_document(
        db,
        document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    ensure_document_access(document, current_user)

    delete_document(
        db,
        document_id,
    )

    return {
        "message": "Document deleted successfully."
    }
