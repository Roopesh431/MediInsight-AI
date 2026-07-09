from backend.app.ai.gemini_service import analyze_with_gemini


def analyze_document(text: str) -> dict:

    return analyze_with_gemini(text)