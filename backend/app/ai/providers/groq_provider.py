from groq import Groq

from backend.config import settings
from backend.app.ai.prompts import SYSTEM_PROMPT
from backend.app.ai.providers.provider_base import BaseAIProvider
from backend.app.ai.provider_stats import ProviderStats


class GroqProvider(BaseAIProvider):

    name = "groq"

    def __init__(self):

        self.client = Groq(
            api_key=settings.GROQ_API_KEY,
        )

        self.models = [

            settings.GROQ_MODEL,

            "llama-3.3-70b-versatile",

            "openai/gpt-oss-120b",

            "meta-llama/llama-4-scout-17b-16e-instruct",

        ]

    def is_available(self):

        return bool(settings.GROQ_API_KEY)

    def analyze(self, text: str):

        last_error = None

        for model in self.models:

            start = ProviderStats.start()

            try:

                response = self.client.chat.completions.create(

                    model=model,

                    messages=[

                        {
                            "role": "system",
                            "content": SYSTEM_PROMPT,
                        },

                        {
                            "role": "user",
                            "content": text,
                        },

                    ],

                    temperature=0,

                )

                ProviderStats.success(
                    self.name,
                    model,
                    start,
                )

                return response.choices[0].message.content

            except Exception as e:

                last_error = e

                ProviderStats.failure(
                    self.name,
                    model,
                    str(e),
                    start,
                )

        raise Exception(last_error)

    def chat(self, prompt: str):

        last_error = None

        for model in self.models:

            start = ProviderStats.start()

            try:

                response = self.client.chat.completions.create(

                    model=model,

                    messages=[

                        {
                            "role": "user",
                            "content": prompt,
                        }

                    ],

                )

                ProviderStats.success(
                    self.name,
                    model,
                    start,
                )

                return response.choices[0].message.content

            except Exception as e:

                last_error = e

                ProviderStats.failure(
                    self.name,
                    model,
                    str(e),
                    start,
                )

        raise Exception(last_error)