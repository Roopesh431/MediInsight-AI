from datetime import datetime, timezone
import uuid

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey


from backend.app.database.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        index=True,
    )

    email = Column(
        String,
        unique=True,
        index=True,
        nullable=False,
    )

    full_name = Column(String, nullable=True)

    hashed_password = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
    )


class Document(Base):


    __tablename__ = "documents"

    document_id = Column(
        String,
        primary_key=True,
        index=True,
    )

    # Nullable so documents created before auth was added don't break
    # existing rows; every new document created after this point will
    # always have a user_id set by the upload route.
    user_id = Column(
        String,
        ForeignKey("users.id"),
        nullable=True,
        index=True,
    )

    original_filename = Column(String)

    saved_filename = Column(String)

    document_type = Column(String)

    confidence = Column(Float)

    status = Column(String)
    
    ocr_text_path = Column(String)
    
    analysis_json_path = Column(String)


class ReportVersion(Base):

    __tablename__ = "report_versions"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        index=True,
    )

    document_id = Column(
        String,
        ForeignKey("documents.document_id"),
        nullable=False,
        index=True,
    )

    version_number = Column(Integer, nullable=False)

    file_path = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
    )
