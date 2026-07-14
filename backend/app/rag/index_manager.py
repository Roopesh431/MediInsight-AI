from backend.app.rag.chunker import chunk_text
from backend.app.rag.embedder import Embedder
from backend.app.rag.vector_db import VectorDB

from backend.app.rag.faiss_storage import (
    save_index,
    load_index,
)


class IndexManager:

    def __init__(self):

        self.embedder = Embedder()

    def build(
        self,
        document_id: str,
        text: str,
    ):

        chunks = chunk_text(
            text,
        )

        embeddings = self.embedder.encode(
            chunks,
        )

        database = VectorDB()

        database.add_documents(
            chunks,
            embeddings,
        )

        save_index(
            document_id,
            database.index,
            database.chunks,
        )

    def load(
        self,
        document_id: str,
    ):

        index, chunks = load_index(
            document_id,
        )

        if index is None:

            return None

        database = VectorDB()

        database.index = index

        database.chunks = chunks

        return database