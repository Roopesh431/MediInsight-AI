from sqlalchemy.orm import Session

from backend.app.database.models import Document


# ---------------------------------
# Create
# ---------------------------------
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
        ocr_text_path="",
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


# ---------------------------------
# Read One
# ---------------------------------
def get_document(
    db: Session,
    document_id: str,
):

    return (
        db.query(Document)
        .filter(Document.document_id == document_id)
        .first()
    )


# ---------------------------------
# Read All
# ---------------------------------
def get_documents(
    db: Session,
):

    return db.query(Document).all()


# ---------------------------------
# Delete
# ---------------------------------
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


# ---------------------------------
# Generic Update
# ---------------------------------
def update_document(
    db: Session,
    document_id: str,
    **fields,
):
    """
    Generic document updater.

    Example:
        update_document(
            db,
            document_id,
            status="ocr_completed",
            confidence=0.98,
            document_type="Hospital Bill",
            ocr_text_path="backend/extracted_text/123.txt",
        )
    """

    document = (
        db.query(Document)
        .filter(Document.document_id == document_id)
        .first()
    )

    if document is None:
        return None

    for key, value in fields.items():

        if hasattr(document, key):
            setattr(document, key, value)

    db.commit()
    db.refresh(document)

    return document

def get_document_by_id(
    db: Session,
    document_id: str,
):
    return get_document(
        db,
        document_id,
    )