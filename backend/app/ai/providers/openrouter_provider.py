import requests

from backend.config import settings
from backend.app.ai.prompts import SYSTEM_PROMPT
from backend.app.ai.providers.provider_base import BaseAIProvider
from backend.app.ai.provider_stats import ProviderStats

BASE_URL = "https://openrouter.ai/api/v1/chat/completions"


class OpenRouterProvider(BaseAIProvider):

    name = "openrouter"

    def __init__(self):

        self.api_key = settings.OPENROUTER_API_KEY

        # Falls back to free-tier models if OPENROUTER_MODEL isn't set in .env
        configured_model = settings.OPENROUTER_MODEL

        self.models = [
            m for m in [
                configured_model,
                "meta-llama/llama-3.3-70b-instruct:free",
                "google/gemini-2.0-flash-exp:free",
            ] if m
        ]

    def is_available(self) -> bool:
        return bool(self.api_key)

    def _request(self, messages: list) -> str:

        response = requests.post(
            BASE_URL,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": self._current_model,
                "messages": messages,
            },
            timeout=120,
        )

        if not response.ok:
            raise Exception(
                f"OpenRouter API error {response.status_code}: {response.text[:300]}"
            )

        data = response.json()

        return data["choices"][0]["message"]["content"]

    def analyze(self, text: str) -> str:

        last_error = None

        for model in self.models:

            self._current_model = model

            start = ProviderStats.start()

            try:

                result = self._request(
                    messages=[
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": text},
                    ],
                )

                ProviderStats.success(self.name, model, start)

                return result

            except Exception as e:

                last_error = e

                ProviderStats.failure(self.name, model, str(e), start)

        raise Exception(last_error)

    def chat(self, prompt: str) -> str:

        last_error = None

        for model in self.models:

            self._current_model = model

            start = ProviderStats.start()

            try:

                result = self._request(
                    messages=[
                        {"role": "user", "content": prompt},
                    ],
                )

                ProviderStats.success(self.name, model, start)

                return result

            except Exception as e:

                last_error = e

                ProviderStats.failure(self.name, model, str(e), start)

        raise Exception(last_error)
