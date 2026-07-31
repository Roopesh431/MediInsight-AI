from sqlalchemy import func
from sqlalchemy.orm import Session

from backend.app.database.models import User
from backend.app.utils.security import hash_password


def get_user_by_email(
    db: Session,
    email: str,
) -> User | None:

    # Case-insensitive on purpose, even though the auth schemas already
    # normalize incoming email to lowercase - this also covers any
    # account created before that normalization existed, and protects
    # against anything that calls this function directly without going
    # through the schema layer.
    return (
        db.query(User)
        .filter(func.lower(User.email) == email.lower())
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: str,
) -> User | None:

    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def create_user(
    db: Session,
    email: str,
    password: str,
    full_name: str | None = None,
) -> User:

    user = User(
        email=email,
        hashed_password=hash_password(password),
        full_name=full_name,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user
