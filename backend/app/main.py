from fastapi import FastAPI
from backend.app.config import settings
from backend.app.api.routes import router
from backend.app.database.database import Base
from backend.app.database.database import engine

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
)

app.include_router(router)

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