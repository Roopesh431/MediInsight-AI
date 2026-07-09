from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "MediInsight AI"
    VERSION: str = "0.1.0"
    DEBUG: bool = True


settings = Settings()