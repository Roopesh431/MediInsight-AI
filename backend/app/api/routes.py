from fastapi import APIRouter

from backend.app.api.upload_routes import router as upload_router
from backend.app.api.document_routes import router as document_router
from backend.app.api.processing_routes import router as processing_router
from backend.app.api.ai_routes import router as ai_router

router = APIRouter()

router.include_router(upload_router)
router.include_router(document_router)
router.include_router(processing_router)
router.include_router(ai_router)