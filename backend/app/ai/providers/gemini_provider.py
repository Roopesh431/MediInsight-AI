from google import genai

from backend.config import settings
from backend.app.ai.prompts import SYSTEM_PROMPT
from backend.app.ai.providers.provider_base import BaseAIProvider
from backend.app.ai.provider_stats import ProviderStats


class GeminiProvider(BaseAIProvider):

    name = "gemini"

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY,
        )

        self.models = [
            settings.GEMINI_MODEL,
            "gemini-2.5-flash",
            "gemini-2.5-pro",
        ]

    def is_available(self) -> bool:
        return bool(settings.GEMINI_API_KEY)

    def analyze(self, text: str) -> str:

        last_error = None

        for model in self.models:

            start = ProviderStats.start()

            try:

                response = self.client.models.generate_content(

                    model=model,

                    contents=[
                        SYSTEM_PROMPT,
                        text,
                    ],

                )

                ProviderStats.success(
                    self.name,
                    model,
                    start,
                )

                return response.text

            except Exception as e:

                last_error = e

                ProviderStats.failure(
                    self.name,
                    model,
                    str(e),
                    start,
                )

        raise Exception(last_error)

    def chat(self, prompt: str) -> str:

        last_error = None

        for model in self.models:

            start = ProviderStats.start()

            try:

                response = self.client.models.generate_content(

                    model=model,

                    contents=prompt,

                )

                ProviderStats.success(
                    self.name,
                    model,
                    start,
                )

                return response.text

            except Exception as e:

                last_error = e

                ProviderStats.failure(
                    self.name,
                    model,
                    str(e),
                    start,
                )

        raise Exception(last_error)