from google import genai

from backend.config import settings
from backend.app.utils.text_storage import load_text


CHAT_PROMPT = """
You are MediInsight AI.

You are an AI medical assistant.

You answer questions ONLY using the provided medical document.

Rules

1. Never invent information.

2. If the answer is not present in the document,
say:

"I could not find that information in the uploaded document."

3. Explain medical terms in simple language.

4. Keep answers concise.

5. Never provide a diagnosis.

6. Never recommend medications.

7. If asked about billing,
explain charges only from the document.
"""


def chat_with_document(document_id: str, question: str) -> str:

    document_text = load_text(document_id)

    client = genai.Client(api_key=settings.GEMINI_API_KEY)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            CHAT_PROMPT,
            f"Medical Document:\n{document_text}",
            f"Question:\n{question}",
        ],
    )

    return response.text.strip()