from sqlalchemy import func
from sqlalchemy.orm import Session

from backend.app.database.models import ReportVersion


def get_next_version_number(
    db: Session,
    document_id: str,
) -> int:

    current_max = (

        db.query(func.max(ReportVersion.version_number))

        .filter(ReportVersion.document_id == document_id)

        .scalar()

    )

    return (current_max or 0) + 1


def create_version(
    db: Session,
    document_id: str,
    version_number: int,
    file_path: str,
) -> ReportVersion:

    version = ReportVersion(
        document_id=document_id,
        version_number=version_number,
        file_path=file_path,
    )

    db.add(version)
    db.commit()
    db.refresh(version)

    return version


def get_versions(
    db: Session,
    document_id: str,
) -> list[ReportVersion]:

    return (

        db.query(ReportVersion)

        .filter(ReportVersion.document_id == document_id)

        .order_by(ReportVersion.version_number.desc())

        .all()

    )


def get_version(
    db: Session,
    document_id: str,
    version_number: int,
) -> ReportVersion | None:

    return (

        db.query(ReportVersion)

        .filter(
            ReportVersion.document_id == document_id,
            ReportVersion.version_number == version_number,
        )

        .first()

    )
