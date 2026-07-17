import json

from google import genai

from backend.config import settings
from backend.app.ai.response_parser import parse_ai_response


client = genai.Client(api_key=settings.GEMINI_API_KEY)

from backend.app.ai.prompts import SYSTEM_PROMPT


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

        from backend.app.services.financial_validator import (
            validate_financial_fields,
        )

        parsed = validate_financial_fields(
            parsed,
            text,
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