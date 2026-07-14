from fastapi import APIRouter

from backend.app.api.upload_routes import router as upload_router
from backend.app.api.document_routes import router as document_router
from backend.app.api.processing_routes import router as processing_router
from backend.app.api.ai_routes import router as ai_router
from backend.app.api.rag_routes import router as rag_router
from backend.app.api.timeline_routes import (
    router as timeline_router,
)

router = APIRouter()

router.include_router(upload_router)
router.include_router(document_router)
router.include_router(processing_router)
router.include_router(ai_router)
router.include_router(
    rag_router,
)
router.include_router(
    timeline_router,
)