from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.database.crud import get_document
from backend.app.database.models import User
from backend.app.api.deps import get_current_user, ensure_document_access

from backend.app.rag.rag_service import RAGService
from backend.app.utils.text_storage import load_text

router = APIRouter(
    prefix="/rag",
    tags=["RAG"],
)

rag = RAGService()


def _get_owned_document(document_id: str, db: Session, current_user: User):

    document = get_document(db, document_id)

    if document is None:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    ensure_document_access(document, current_user)

    return document


@router.post("/{document_id}/build")
def build_index(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    _get_owned_document(document_id, db, current_user)

    text = load_text(
        document_id,
    )

    rag.build_index(
        document_id,
        text,
    )

    return {
        "message": "Index created successfully.",
    }


@router.get("/{document_id}/search")
def semantic_search(
    document_id: str,
    query: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    _get_owned_document(document_id, db, current_user)

    context = rag.retrieve_context(
        document_id,
        query,
    )

    return {
        "query": query,
        "results": context,
    }
