import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")


class Settings:

    # -----------------------------
    # API Keys
    # -----------------------------

    GEMINI_API_KEY = os.getenv(
        "GEMINI_API_KEY",
        "",
    )

    GROQ_API_KEY = os.getenv(
        "GROQ_API_KEY",
        "",
    )

    OPENROUTER_API_KEY = os.getenv(
        "OPENROUTER_API_KEY",
        "",
    )

    # -----------------------------
    # Provider Priority
    # -----------------------------

    PRIMARY_PROVIDER = os.getenv(
        "PRIMARY_PROVIDER",
        "groq",
    )

    SECONDARY_PROVIDER = os.getenv(
        "SECONDARY_PROVIDER",
        "gemini",
    )

    TERTIARY_PROVIDER = os.getenv(
        "TERTIARY_PROVIDER",
        "openrouter",
    )

    # Backward compatibility
    AI_PROVIDER = os.getenv(
        "AI_PROVIDER",
        PRIMARY_PROVIDER,
    )

    # -----------------------------
    # Models
    # -----------------------------

    GEMINI_MODEL = os.getenv(
        "GEMINI_MODEL",
        "gemini-2.5-flash",
    )

    GROQ_MODEL = os.getenv(
        "GROQ_MODEL",
        "llama-3.3-70b-versatile",
    )

    OPENROUTER_MODEL = os.getenv(
        "OPENROUTER_MODEL",
        "",
    )


settings = Settings()