import faiss
import numpy as np
from pathlib import Path


VECTOR_DB_DIR = Path(
    "backend/app/rag/vector_store",
)

VECTOR_DB_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


class VectorDB:

    def __init__(self):

        self.dimension = 384

        self.index = faiss.IndexFlatIP(
            self.dimension,
        )

        self.chunks = []

    def add_documents(

        self,

        chunks: list[str],

        embeddings: np.ndarray,

    ):

        self.index.add(
            embeddings.astype("float32"),
        )

        self.chunks.extend(
            chunks,
        )

    def search(

        self,

        embedding: np.ndarray,

        k: int = 5,

    ):

        distances, indices = self.index.search(

            embedding.astype("float32"),

            k,

        )

        results = []

        for score, idx in zip(

            distances[0],

            indices[0],

        ):

            if idx == -1:

                continue

            results.append(

                {

                    "score": float(score),

                    "chunk": self.chunks[idx],

                }

            )

        return results


if __name__ == "__main__":

    from embedder import Embedder

    embedder = Embedder()

    database = VectorDB()

    chunks = [

        "Patient has diabetes.",

        "Blood pressure is normal.",

        "Metformin prescribed.",

        "Follow-up after one month.",

    ]

    embeddings = embedder.encode(

        chunks,

    )

    database.add_documents(

        chunks,

        embeddings,

    )

    query = embedder.encode(

        [

            "Which medicine is prescribed?",

        ],

    )

    results = database.search(

        query,

        k=2,

    )

    print()

    print("Search Results")

    print()

    for result in results:

        print(result)