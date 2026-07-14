from backend.app.rag.embedder import Embedder
from backend.app.rag.vector_db import VectorDB


class Retriever:

    def __init__(self):

        self.embedder = Embedder()

        self.database = VectorDB()

    def index_documents(
        self,
        chunks: list[str],
    ):

        embeddings = self.embedder.encode(
            chunks,
        )

        self.database.add_documents(
            chunks,
            embeddings,
        )

    def retrieve(
        self,
        question: str,
        top_k: int = 5,
    ):

        query_embedding = self.embedder.encode(
            [question],
        )

        return self.database.search(
            query_embedding,
            k=top_k,
        )


if __name__ == "__main__":

    retriever = Retriever()

    chunks = [

        "Patient diagnosed with Diabetes Mellitus.",

        "Metformin 500mg prescribed twice daily.",

        "Blood pressure is normal.",

        "Follow-up after one month.",

        "Patient has Vitamin D deficiency.",

    ]

    retriever.index_documents(
        chunks,
    )

    results = retriever.retrieve(
        "What medicine is prescribed?",
    )

    print()

    print("Retrieved Chunks")

    print()

    for result in results:

        print(result)