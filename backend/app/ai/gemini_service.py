import json

from google import genai

from backend.config import settings
from backend.app.ai.response_parser import parse_ai_response


client = genai.Client(api_key=settings.GEMINI_API_KEY)


SYSTEM_PROMPT = """
You are MediInsight AI.

You are an expert medical document analyst specializing in:

- Hospital Bills
- Outpatient Bills
- Emergency Bills
- Surgical Bills
- Oncology Bills
- Physical Therapy Bills
- Dental Bills
- Maternity Bills
- Behavioral Health Bills
- Pediatric Bills
- Imaging Bills
- Prescriptions
- Lab Reports
- Insurance Statements

Your job is to EXTRACT information.

Never calculate values.

Never estimate values.

Never infer values.

Only return values explicitly present in the document.

If a value cannot be found, return null.

The document may contain:

- Multiple visits
- Multiple providers
- Multiple hospitals
- Multiple procedure tables
- Multiple payment sections
- Multiple insurance sections
- Multiple pages

Treat the entire document as one record.

Extract EVERY procedure from EVERY table.

Extract EVERY payment if available.

If multiple providers exist:

Return the primary provider.

If multiple hospitals exist:

Return the document header hospital.

Return ONLY valid JSON.

Never use markdown.

Never use ```.

Return EXACTLY this schema.

{
  "document_type": "",
  "hospital": "",
  "patient_name": "",
  "doctor": "",
  "statement_date": "",
  "total_charges": null,
  "remaining_balance": null,

  "procedures": [
    {
      "date": "",
      "code": "",
      "description": "",
      "charge": null
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

1. Never calculate totals.

2. Never calculate balances.

3. Never add numbers together.

4. Never subtract payments.

5. Never invent procedures.

6. Never invent providers.

7. Never invent hospitals.

8. Summary maximum three sentences.

9. patient_advice exactly two items.

10. recommended_questions exactly two items.

11. confidence between 0 and 1.

12. Extract every procedure across all pages.

13. Ignore decorative text.

14. Ignore advertisements.

15. Ignore footer text.

16. Prefer explicitly labeled values.

17. Return numeric values only for monetary fields.

18. If document says "Visit Balance", use that as remaining_balance.

19. If document says "Total Account Balance", use that as remaining_balance.

20. Never overwrite document values with your own calculations.
"""

def analyze_with_gemini(
    text: str,
) -> dict:

    try:

        response = client.models.generate_content(

            model="gemini-2.5-flash",

            contents=[

                SYSTEM_PROMPT,

                text,

            ],

        )

        answer = response.text.strip()

        if answer.startswith("```json"):

            answer = (

                answer

                .replace("```json", "")

                .replace("```", "")

                .strip()

            )

        elif answer.startswith("```"):

            answer = (

                answer

                .replace("```", "")

                .strip()

            )

        parsed = parse_ai_response(
            answer,
        )

        if parsed.remaining_balance is None:

            import re

            patterns = [

                r"Visit Balance[:\s]*\$?([0-9,.\-]+)",

                r"Total Account Balance[:\s]*\$?([0-9,.\-]+)",

                r"Remaining Balance[:\s]*\$?([0-9,.\-]+)",

            ]

            for pattern in patterns:

                match = re.search(
                    pattern,
                    text,
                    re.IGNORECASE,
                )

                if match:

                    parsed.remaining_balance = float(

                        match.group(1)

                        .replace(",", "")

                    )

                    break

        if parsed.total_charges is None:

            import re

            match = re.search(

                r"Total (?:Professional )?Charges[:\s]*\$?([0-9,.\-]+)",

                text,

                re.IGNORECASE,

            )

            if match:

                parsed.total_charges = float(

                    match.group(1)

                    .replace(",", "")

                )

        return parsed

    except Exception as e:

        return {

            "error": str(e),

        }
                
def ask_gemini(
    prompt: str,
):

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text