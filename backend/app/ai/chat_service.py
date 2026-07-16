from backend.app.ai.provider_factory import chat

from backend.app.utils.text_storage import load_text

from backend.app.rag.rag_service import RAGService


def chat_with_document(
    document_id: str,
    question: str,
):

    rag = RAGService()

    context = rag.retrieve_context(
        document_id,
        question,
    )

    if not context:

        text = load_text(
            document_id,
        )

        rag.build_index(
            document_id,
            text,
        )

        context = rag.retrieve_context(
            document_id,
            question,
        )

    prompt = f"""
You are MediInsight AI.

Answer ONLY from the context.

If the answer is unavailable say:

"I couldn't find that information in the document."

Context

{context}

Question

{question}

Answer
"""

    return chat(
        prompt,
    )