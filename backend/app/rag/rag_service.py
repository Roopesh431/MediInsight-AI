from backend.app.rag.chunker import chunk_text
from backend.app.rag.retriever import Retriever


class RAGService:

    def __init__(self):

        self.retriever = Retriever()

    def build_index(
        self,
        document_text: str,
    ):

        chunks = chunk_text(
            document_text,
        )

        self.retriever.index_documents(
            chunks,
        )

    def retrieve_context(
        self,
        question: str,
        top_k: int = 4,
    ):

        results = self.retriever.retrieve(
            question,
            top_k,
        )

        context = "\n\n".join(

            item["chunk"]

            for item in results

        )

        return context


if __name__ == "__main__":

    service = RAGService()

    sample_text = """

Patient Name: John Doe

Diagnosis:
Type 2 Diabetes Mellitus

Prescription:
Metformin 500mg twice daily.

Blood Pressure:
120/80 mmHg

Advice:
Exercise daily.
Reduce sugar intake.

Follow-up after 30 days.

"""

    service.build_index(
        sample_text,
    )

    context = service.retrieve_context(
        "What medicine is prescribed?",
    )

    print()

    print("Retrieved Context")

    print("----------------------------")

    print(context)