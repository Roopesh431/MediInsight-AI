from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_text(
    text: str,
) -> list[str]:

    splitter = RecursiveCharacterTextSplitter(

        chunk_size=350,

        chunk_overlap=50,

        separators=[

            "\n\n",

            "\n",

            ". ",

            ": ",

            " ",

            "",

        ],

    )

    return [

        chunk.strip()

        for chunk in splitter.split_text(text)

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