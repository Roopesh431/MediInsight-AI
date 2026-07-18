import json
from pathlib import Path

from sqlalchemy.orm import Session

from backend.app.database.models import Document
from backend.app.schemas.comparison import (
    ComparisonResponse,
    Difference,
    ProcedureDifference,
)


FIELDS_TO_COMPARE = [

    "patient_name",
    "hospital",
    "doctor",
    "statement_date",
    "total_charges",
    "remaining_balance",

]


def _procedure_key(procedure: dict) -> str:
    """
    Match procedures across two reports by CPT/procedure code when
    available (the stable identifier), falling back to the description
    text if the code is missing.
    """

    code = (procedure.get("code") or "").strip()

    if code:
        return code.lower()

    return (procedure.get("description") or "").strip().lower()


def _compare_procedures(
    first_procedures: list[dict],
    second_procedures: list[dict],
) -> list[ProcedureDifference]:

    first_by_key = {
        _procedure_key(p): p for p in first_procedures if _procedure_key(p)
    }

    second_by_key = {
        _procedure_key(p): p for p in second_procedures if _procedure_key(p)
    }

    differences = []

    # Removed: present in first report, missing from second
    for key, procedure in first_by_key.items():

        if key not in second_by_key:

            differences.append(
                ProcedureDifference(
                    status="removed",
                    code=procedure.get("code"),
                    description=procedure.get("description"),
                    first_charge=procedure.get("charge"),
                    second_charge=None,
                )
            )

    # Added: present in second report, missing from first
    for key, procedure in second_by_key.items():

        if key not in first_by_key:

            differences.append(
                ProcedureDifference(
                    status="added",
                    code=procedure.get("code"),
                    description=procedure.get("description"),
                    first_charge=None,
                    second_charge=procedure.get("charge"),
                )
            )

    # Changed: present in both, but charge differs
    for key, first_procedure in first_by_key.items():

        second_procedure = second_by_key.get(key)

        if second_procedure is None:
            continue

        first_charge = first_procedure.get("charge")
        second_charge = second_procedure.get("charge")

        if first_charge != second_charge:

            differences.append(
                ProcedureDifference(
                    status="changed",
                    code=first_procedure.get("code"),
                    description=first_procedure.get("description"),
                    first_charge=first_charge,
                    second_charge=second_charge,
                )
            )

    return differences


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

    if not first.analysis_json_path or not second.analysis_json_path:

        raise ValueError(
            "Both documents must have completed AI analysis before they can be compared."
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

    procedure_differences = _compare_procedures(
        first_data.get("procedures", []),
        second_data.get("procedures", []),
    )

    total_charge_delta = None

    first_total = first_data.get("total_charges")
    second_total = second_data.get("total_charges")

    if isinstance(first_total, (int, float)) and isinstance(second_total, (int, float)):
        total_charge_delta = round(second_total - first_total, 2)

    summary_parts = [f"{len(differences)} field difference(s)"]

    if procedure_differences:

        added = sum(1 for d in procedure_differences if d.status == "added")
        removed = sum(1 for d in procedure_differences if d.status == "removed")
        changed = sum(1 for d in procedure_differences if d.status == "changed")

        summary_parts.append(
            f"{added} procedure(s) added, {removed} removed, {changed} changed"
        )

    else:

        summary_parts.append("no procedure differences")

    summary = ", ".join(summary_parts) + "."

    return ComparisonResponse(

        first_document=first.original_filename,

        second_document=second.original_filename,

        differences=differences,

        procedure_differences=procedure_differences,

        total_charge_delta=total_charge_delta,

        summary=summary,

    )
