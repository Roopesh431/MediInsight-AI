from backend.config import settings

from backend.app.ai.gemini_service import (
    analyze_with_gemini,
    ask_gemini,
)

from backend.app.ai.openrouter_service import (
    analyze_with_openrouter,
    ask_openrouter,
)


def analyze(
    text: str,
):

    provider = settings.AI_PROVIDER.lower()

    if provider == "gemini":

        return analyze_with_gemini(
            text,
        )

    if provider == "openrouter":

        return analyze_with_openrouter(
            text,
        )

    raise ValueError(
        "Invalid AI Provider.",
    )


def chat(
    prompt: str,
):

    provider = settings.AI_PROVIDER.lower()

    if provider == "gemini":

        return ask_gemini(
            prompt,
        )

    if provider == "openrouter":

        return ask_openrouter(
            prompt,
        )

    raise ValueError(
        "Invalid AI Provider.",
    )