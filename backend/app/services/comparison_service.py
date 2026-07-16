import json
from pathlib import Path

from sqlalchemy.orm import Session

from backend.app.database.models import Document
from backend.app.schemas.comparison import (
    ComparisonResponse,
    Difference,
)


FIELDS_TO_COMPARE = [

    "patient_name",
    "hospital",
    "doctor",
    "statement_date",
    "total_charges",
    "remaining_balance",

]


def compare_reports(

    first_document_id: str,

    second_document_id: str,

    db: Session,

) -> ComparisonResponse:

    first = (

        db.query(Document)

        .filter(

            Document.document_id == first_document_id,

        )

        .first()

    )

    second = (

        db.query(Document)

        .filter(

            Document.document_id == second_document_id,

        )

        .first()

    )

    if not first or not second:

        raise ValueError(
            "Document not found."
        )

    with open(

        Path(first.analysis_json_path),

        "r",

        encoding="utf-8",

    ) as file:

        first_data = json.load(file)

    with open(

        Path(second.analysis_json_path),

        "r",

        encoding="utf-8",

    ) as file:

        second_data = json.load(file)

    differences = []

    for field in FIELDS_TO_COMPARE:

        first_value = str(

            first_data.get(field, ""),

        )

        second_value = str(

            second_data.get(field, ""),

        )

        if first_value != second_value:

            differences.append(

                Difference(

                    field=field,

                    first_value=first_value,

                    second_value=second_value,

                )

            )

    summary = (

        f"{len(differences)} differences detected."

    )

    return ComparisonResponse(

        first_document=first.original_filename,

        second_document=second.original_filename,

        differences=differences,

        summary=summary,

    )