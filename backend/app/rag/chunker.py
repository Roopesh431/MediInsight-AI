from langchain_text_splitters import RecursiveCharacterTextSplitter

def chunk_text(
    text: str,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
) -> list[str]:
    """
    Split OCR text into overlapping chunks for RAG.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            "",
        ],
    )

    chunks = splitter.split_text(text)

    return [
        chunk.strip()
        for chunk in chunks
        if chunk.strip()
    ]


if __name__ == "__main__":

    sample = """
    Patient Name: John Doe

    Diagnosis:
    Diabetes Mellitus Type 2

    Prescription:
    Metformin 500mg twice daily.
    Continue medication for 3 months.

    Follow-up after 30 days.

    Hospital:
    Apollo Hospitals
    """

    chunks = chunk_text(sample)

    for i, chunk in enumerate(chunks, start=1):

        print(f"\n------ Chunk {i} ------\n")

        print(chunk)