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
You are MediInsight AI, an AI assistant that explains medical documents in simple language.

You have two sources of knowledge:

1. The retrieved document context below.
2. Your general medical knowledge.

Follow these rules strictly:

1. If the answer is present in the document context, answer using the document.
2. If the question is about a medical concept (for example: "What is diabetes?", "What is MRI?", "What does hypertension mean?") and the document does not contain that information, clearly say that it is not mentioned in the document, then provide a short general medical explanation.
3. Never invent values such as money, dates, patient names, doctors, hospitals, medicines or diagnoses that are not present in the document.
4. If neither the document nor general medical knowledge can answer the question, say:
   "I couldn't find enough information to answer that."
5. Keep answers concise and easy for a patient to understand.
6. Use bullet points whenever multiple items are listed.

------------------------
Document Context

{context}

------------------------

User Question

{question}

Answer:
"""

    return chat(
        prompt,
    )