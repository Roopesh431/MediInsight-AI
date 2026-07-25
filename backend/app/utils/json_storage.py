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


def save_analysis_version(
    document_id: str,
    version_number: int,
    data: dict,
):
    """
    Saves a specific version's analysis to its own file rather than
    overwriting the document's single analysis file. This is what makes
    report history/versioning possible - previous runs are never lost.
    """

    file = SAVE_DIR / f"{document_id}_v{version_number}.json"

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