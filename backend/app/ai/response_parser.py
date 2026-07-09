import json

from backend.app.schemas.ai_analysis import AIAnalysisResponse


def parse_ai_response(response: str) -> AIAnalysisResponse:

    data = json.loads(response)

    return AIAnalysisResponse.model_validate(data)