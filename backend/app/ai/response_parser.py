import json

from backend.app.schemas.ai_analysis import AIAnalysisResponse


DOCUMENT_TYPE_MAP = {
    "Medical Statement": "Hospital Bill",
    "Account Statement": "Hospital Bill",
    "Itemization of Services": "Hospital Bill",
    "Billing Statement": "Hospital Bill",
}


def normalize_ai_response(data: dict) -> dict:
    """
    Normalize AI response before validation.
    """

    # -------------------------
    # Normalize document type
    # -------------------------
    document_type = data.get("document_type", "Other")

    data["document_type"] = DOCUMENT_TYPE_MAP.get(
        document_type,
        document_type,
    )

    # -------------------------
    # Always keep arrays
    # -------------------------
    data.setdefault("medical_terms", [])
    data.setdefault("patient_advice", [])
    data.setdefault("recommended_questions", [])
    data.setdefault("procedures", [])

    # -------------------------
    # Limit summary length
    # -------------------------
    if "summary" in data and isinstance(data["summary"], str):

        summary = data["summary"].strip()

        if len(summary) > 700:
            data["summary"] = summary[:700] + "..."

    return data


def parse_ai_response(response: str) -> AIAnalysisResponse:

    data = json.loads(response)

    data = normalize_ai_response(data)

    return AIAnalysisResponse.model_validate(data)