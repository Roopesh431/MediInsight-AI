from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Float

from backend.app.database.database import Base


class Document(Base):

    __tablename__ = "documents"

    document_id = Column(
        String,
        primary_key=True,
        index=True,
    )

    original_filename = Column(String)

    saved_filename = Column(String)

    document_type = Column(String)

    confidence = Column(Float)

    status = Column(String)