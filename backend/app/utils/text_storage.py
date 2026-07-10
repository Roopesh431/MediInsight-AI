from pathlib import Path

from backend.app.utils.constants import TEXT_DIRECTORY

TEXT_DIR = Path(TEXT_DIRECTORY)

TEXT_DIR.mkdir(parents=True, exist_ok=True)


def save_text(document_id: str, text: str):

    file_path = TEXT_DIR / f"{document_id}.txt"

    file_path.write_text(
        text,
        encoding="utf-8",
    )


def load_text(document_id: str) -> str:

    file_path = TEXT_DIR / f"{document_id}.txt"

    if not file_path.exists():

        raise FileNotFoundError(
            f"{document_id} not found."
        )

    return file_path.read_text(
        encoding="utf-8"
    )