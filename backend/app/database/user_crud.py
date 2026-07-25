from sqlalchemy.orm import Session

from backend.app.database.models import User
from backend.app.utils.security import hash_password


def get_user_by_email(
    db: Session,
    email: str,
) -> User | None:

    return (
        db.query(User)
        .filter(User.email == email)
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
