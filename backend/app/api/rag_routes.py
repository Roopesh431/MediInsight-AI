from fastapi import APIRouter

from backend.app.rag.rag_service import RAGService
from backend.app.utils.text_storage import load_text

router = APIRouter(
    prefix="/rag",
    tags=["RAG"],
)

rag = RAGService()


@router.post("/{document_id}/build")
def build_index(
    document_id: str,
):

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
):

    context = rag.retrieve_context(
        document_id,
        query,
    )

    return {
        "query": query,
        "results": context,
    }