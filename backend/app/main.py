from fastapi import FastAPI
from backend.app.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
)


@app.get("/")
def root():
    return {
        "message": "Welcome to MediInsight AI",
        "version": settings.VERSION,
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
    }