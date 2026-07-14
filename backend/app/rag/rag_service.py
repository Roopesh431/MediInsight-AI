from backend.app.rag.index_manager import IndexManager
from backend.app.rag.embedder import Embedder


class RAGService:

    def __init__(self):

        self.manager = IndexManager()

        self.embedder = Embedder()

    def build_index(
        self,
        document_id: str,
        document_text: str,
    ):

        self.manager.build(
            document_id,
            document_text,
        )

    def retrieve_context(
        self,
        document_id: str,
        question: str,
        top_k: int = 4,
    ):

        database = self.manager.load(
            document_id,
        )

        if database is None:

            return ""

        query_embedding = self.embedder.encode(
            [question],
        )

        results = database.search(
            query_embedding,
            k=top_k,
        )

        return "\n\n".join(

            item["chunk"]

            for item in results

        )