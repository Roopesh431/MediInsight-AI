from sentence_transformers import SentenceTransformer


class Embedder:

    def __init__(self):

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2",
        )

    def encode(
        self,
        texts: list[str],
    ):

        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )

        return embeddings


if __name__ == "__main__":

    embedder = Embedder()

    texts = [

        "Patient has diabetes.",

        "Blood pressure is normal.",

        "Prescribed Metformin.",

    ]

    vectors = embedder.encode(texts)

    print("Embeddings Shape:")

    print(vectors.shape)

    print()

    print("First 10 Values:")

    print(vectors[0][:10])