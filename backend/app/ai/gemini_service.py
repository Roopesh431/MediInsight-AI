import json

from google import genai

from backend.config import settings
from backend.app.ai.response_parser import parse_ai_response


client = genai.Client(api_key=settings.GEMINI_API_KEY)


SYSTEM_PROMPT = """
You are MediInsight AI.

You are an expert medical document analyst.

Analyze the OCR text and return ONLY valid JSON.

Never use markdown.

Never explain anything.

Use EXACTLY this schema.

{
  "document_type": "",
  "hospital": "",
  "patient_name": "",
  "doctor": "",
  "statement_date": "",
  "total_charges": 0,
  "remaining_balance": 0,
  "procedures": [
    {
      "date": "",
      "code": "",
      "description": "",
      "charge": 0
    }
  ],
  "summary": "",
  "confidence": 0.0
}

Rules:

1. Return ONLY JSON.
2. Do not rename any keys.
3. Use "date", never "date_of_service".
4. Use "code", never "procedure_code".
5. confidence must be between 0 and 1.
6. total_charges must be numeric.
7. remaining_balance must be numeric.
8. If a field is unavailable, use null.
9. Do not invent information.
"""


def analyze_with_gemini(text: str) -> dict:
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[SYSTEM_PROMPT, text],
        )

        answer = response.text.strip()

        if answer.startswith("```json"):
            answer = answer.replace("```json", "").replace("```", "").strip()
        elif answer.startswith("```"):
            answer = answer.replace("```", "").strip()

        return parse_ai_response(answer)

    except Exception as e:
        return {
            "error": str(e)
        }