import json
from pathlib import Path

SAVE_DIR = Path("backend/analysis")
SAVE_DIR.mkdir(
    parents=True,
    exist_ok=True,
)

def save_analysis(
    document_id: str,
    data: dict,
):

    file = SAVE_DIR / f"{document_id}.json"

    with open(
        file,
        "w",
        encoding="utf-8",
    ) as f:

        json.dump(
            data,
            f,
            indent=4,
        )

    return str(file)