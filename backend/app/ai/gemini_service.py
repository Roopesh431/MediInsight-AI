import json

from google import genai

from backend.config import settings
from backend.app.ai.response_parser import parse_ai_response


client = genai.Client(api_key=settings.GEMINI_API_KEY)


SYSTEM_PROMPT = """
You are MediInsight AI.

You are an expert medical document analyst.

Analyze OCR text extracted from medical documents.

Return ONLY valid JSON.

Never use markdown.

Never wrap JSON inside ```.

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

  "medical_terms": [
    {
      "term": "",
      "meaning": ""
    }
  ],

  "patient_advice": [],

  "recommended_questions": [],

  "confidence": 0.0
}

Rules

1. Summary must be at most THREE sentences.

2. Never explain medicines inside summary.

3. Put medicine explanations ONLY inside medical_terms.

4. patient_advice must contain exactly TWO strings.

5. recommended_questions must contain exactly TWO strings.

6. confidence must be between 0 and 1.

7. total_charges must be numeric.

8. remaining_balance must be numeric.

9. procedures must always be an array.

10. If information is unavailable use null.

11. Never invent medical facts.

12. document_type MUST be one of:

Hospital Bill
Medical Report
Prescription
Lab Report
Discharge Summary
Insurance Document
Other
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

        try:
            return parse_ai_response(answer)

        except Exception as e:
            return {
        "error": str(e),
        "raw_response": answer,
    }

    except Exception as e:
        return {
            "error": str(e)
        }