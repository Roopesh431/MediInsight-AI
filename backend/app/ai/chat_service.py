from backend.app.ai.gemini_service import ask_gemini

from backend.app.utils.text_storage import load_text

from backend.app.rag.rag_service import RAGService


def chat_with_document(
    document_id: str,
    question: str,
):

    text = load_text(
        document_id,
    )

    rag = RAGService()

    rag.build_index(
        text,
    )

    context = rag.retrieve_context(
        question,
    )

    prompt = f"""
You are a medical AI assistant.

Use ONLY the context below to answer.

If the answer is not present, say:
"I couldn't find that information in the document."

--------------------
Context

{context}

--------------------

Question:

{question}

Answer:
"""

    answer = ask_gemini(
        prompt,
    )

    return answer