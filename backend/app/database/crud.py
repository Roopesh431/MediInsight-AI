from sqlalchemy.orm import Session

from backend.app.database.models import Document


def create_document(
    db: Session,
    document_id: str,
    original_filename: str,
    saved_filename: str,
    status: str = "uploaded",
):
    document = Document(
        document_id=document_id,
        original_filename=original_filename,
        saved_filename=saved_filename,
        status=status,
        document_type="Unknown",
        confidence=0.0,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document

def update_document_analysis(
    db: Session,
    document_id: str,
    document_type: str,
    confidence: float,
):
    document = (
        db.query(Document)
        .filter(Document.document_id == document_id)
        .first()
    )

    if document:

        document.document_type = document_type
        document.confidence = confidence
        document.status = "analyzed"

        db.commit()

    return document

def get_document(db: Session, document_id: str):

    return (
        db.query(Document)
        .filter(Document.document_id == document_id)
        .first()
    )


def get_documents(db: Session):

    return db.query(Document).all()

def delete_document(
    db: Session,
    document_id: str,
):

    document = (
        db.query(Document)
        .filter(Document.document_id == document_id)
        .first()
    )

    if document:

        db.delete(document)
        db.commit()

    return document