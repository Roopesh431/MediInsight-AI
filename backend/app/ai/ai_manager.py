import re

from backend.app.ai.providers.gemini_provider import GeminiProvider
from backend.app.ai.providers.groq_provider import GroqProvider
from backend.app.ai.providers.openrouter_provider import OpenRouterProvider
# Cerebras was never implemented (provider file is empty, no SDK installed,
# no API key configured) - leaving it out rather than faking an integration.
# from backend.app.ai.providers.cerebras_provider import CerebrasProvider

from backend.app.ai.response_parser import parse_ai_response
from backend.app.services.financial_validator import validate_financial_fields


class AIManager:

    def __init__(self):

        # Order matches PRIMARY_PROVIDER/SECONDARY_PROVIDER/TERTIARY_PROVIDER
        # in .env (groq -> gemini -> openrouter). If a provider's API key is
        # missing, is_available() returns False and it's skipped automatically.
        self.providers = [

            GroqProvider(),
            GeminiProvider(),
            OpenRouterProvider(),

        ]

    def _clean_response(
        self,
        text: str,
    ) -> str:

        text = text.strip()

        if text.startswith("```json"):

            text = (
                text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        elif text.startswith("```"):

            text = (
                text
                .replace("```", "")
                .strip()
            )

        return text

    def _regex_fallback(
        self,
        parsed,
        ocr_text: str,
    ):

        if parsed.remaining_balance is None:

            patterns = [

                r"Visit Balance[:\s]*\$?([0-9,.\-]+)",

                r"Total Account Balance[:\s]*\$?([0-9,.\-]+)",

                r"Remaining Balance[:\s]*\$?([0-9,.\-]+)",

            ]

            for pattern in patterns:

                match = re.search(
                    pattern,
                    ocr_text,
                    re.IGNORECASE,
                )

                if match:

                    parsed.remaining_balance = float(
                        match.group(1).replace(",", "")
                    )

                    break

        if parsed.total_charges is None:

            match = re.search(

                r"Total (?:Professional )?Charges[:\s]*\$?([0-9,.\-]+)",

                ocr_text,

                re.IGNORECASE,

            )

            if match:

                parsed.total_charges = float(
                    match.group(1).replace(",", "")
                )

        return parsed

    def analyze(
        self,
        ocr_text: str,
    ):

        errors = []

        for provider in self.providers:

            if not provider.is_available():

                continue

            try:

                response = provider.analyze(
                    ocr_text,
                )

                response = self._clean_response(
                    response,
                )

                parsed = parse_ai_response(
                    response,
                )

                parsed = validate_financial_fields(
                    parsed,
                    ocr_text,
                )

                parsed = self._regex_fallback(
                    parsed,
                    ocr_text,
                )

                return parsed

            except Exception as e:

                errors.append(
                    f"{provider.name}: {e}"
                )

        return {

            "error": "All AI providers failed.",

            "details": errors,

        }

    def chat(
        self,
        prompt: str,
    ):

        errors = []

        for provider in self.providers:

            if not provider.is_available():

                continue

            try:

                return provider.chat(
                    prompt,
                )

            except Exception as e:

                errors.append(
                    f"{provider.name}: {e}"
                )

        return "I'm sorry, all AI providers are currently unavailable."