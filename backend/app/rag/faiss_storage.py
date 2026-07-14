import pickle
from pathlib import Path

import faiss
import numpy as np


VECTOR_STORE_DIR = Path(
    "backend/app/rag/vector_store",
)

VECTOR_STORE_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


def save_index(
    document_id: str,
    index: faiss.Index,
    chunks: list[str],
):

    faiss.write_index(
        index,
        str(
            VECTOR_STORE_DIR / f"{document_id}.index",
        ),
    )

    with open(
        VECTOR_STORE_DIR / f"{document_id}.pkl",
        "wb",
    ) as file:

        pickle.dump(
            chunks,
            file,
        )


def load_index(
    document_id: str,
):

    index_file = (
        VECTOR_STORE_DIR /
        f"{document_id}.index"
    )

    chunk_file = (
        VECTOR_STORE_DIR /
        f"{document_id}.pkl"
    )

    if (
        not index_file.exists()
        or
        not chunk_file.exists()
    ):

        return None, None

    index = faiss.read_index(
        str(index_file),
    )

    with open(
        chunk_file,
        "rb",
    ) as file:

        chunks = pickle.load(
            file,
        )

    return index, chunks