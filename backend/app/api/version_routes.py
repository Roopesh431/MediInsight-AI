import json
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.database.crud import get_document, update_document
from backend.app.database.models import User
from backend.app.database.version_crud import get_version, get_versions

from backend.app.api.deps import get_current_user, ensure_document_access

from backend.app.schemas.version import VersionListResponse, VersionSummary

router = APIRouter(
    prefix="/documents",
    tags=["Report Versions"],
)


def _get_owned_document(document_id: str, db: Session, current_user: User):

    document = get_document(db, document_id)

    if document is None:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    ensure_document_access(document, current_user)

    return document


@router.get(
    "/{document_id}/versions",
    response_model=VersionListResponse,
)
def list_versions(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = _get_owned_document(document_id, db, current_user)

    versions = get_versions(db, document_id)

    return VersionListResponse(

        document_id=document_id,

        versions=[

            VersionSummary(

                version_number=v.version_number,

                created_at=v.created_at,

                is_current=(v.file_path == document.analysis_json_path),

            )

            for v in versions

        ],

    )


@router.get("/{document_id}/versions/{version_number}")
def get_version_analysis(
    document_id: str,
    version_number: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    _get_owned_document(document_id, db, current_user)

    version = get_version(db, document_id, version_number)

    if version is None:

        raise HTTPException(
            status_code=404,
            detail="Version not found.",
        )

    path = Path(version.file_path)

    if not path.exists():

        raise HTTPException(
            status_code=404,
            detail="Version file missing on disk.",
        )

    with open(path, "r", encoding="utf-8") as file:

        data = json.load(file)

    return JSONResponse(content=data)


@router.post("/{document_id}/versions/{version_number}/restore")
def restore_version(
    document_id: str,
    version_number: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    _get_owned_document(document_id, db, current_user)

    version = get_version(db, document_id, version_number)

    if version is None:

        raise HTTPException(
            status_code=404,
            detail="Version not found.",
        )

    path = Path(version.file_path)

    if not path.exists():

        raise HTTPException(
            status_code=404,
            detail="Version file missing on disk.",
        )

    # Restoring just repoints "current" at this version's file - it does
    # not delete or renumber any other version, and does not create a new
    # version entry. The full history stays intact either way.
    update_document(
        db,
        document_id,
        analysis_json_path=version.file_path,
    )

    return {
        "message": f"Restored version {version_number} as current.",
    }
