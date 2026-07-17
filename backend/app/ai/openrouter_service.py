import json

import requests

from backend.config import settings
from backend.app.ai.response_parser import parse_ai_response
from backend.app.ai.gemini_service import SYSTEM_PROMPT

BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

MODEL = settings.OPENROUTER_MODEL


def _request(prompt: str) -> str:

    response = requests.post(

        BASE_URL,

        headers={

            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",

            "Content-Type": "application/json",

        },

        json={

            "model": MODEL,

            "messages": [

                {

                    "role": "system",

                    "content": SYSTEM_PROMPT,

                },

                {

                    "role": "user",

                    "content": prompt,

                },

            ],

        },

        timeout=120,

    )

    if not response.ok:

        print("========== OPENROUTER ERROR ==========")
        print("Status:", response.status_code)
        print(response.text)
        print("======================================")

        response.raise_for_status()

    data = response.json()

    return data["choices"][0]["message"]["content"]

def analyze_with_openrouter(
    text: str,
):

    answer = _request(
        text,
    )

    if answer.startswith("```json"):

        answer = answer.replace(
            "```json",
            "",
        ).replace(
            "```",
            "",
        ).strip()

    elif answer.startswith("```"):

        answer = answer.replace(
            "```",
            "",
        ).strip()

    return parse_ai_response(
        answer,
    )


def ask_openrouter(
    prompt: str,
):

    return _request(
        prompt,
    )