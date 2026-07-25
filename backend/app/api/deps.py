from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.database.models import User
from backend.app.database.user_crud import get_user_by_id
from backend.app.utils.security import decode_access_token

# tokenUrl is just for the Swagger "Authorize" button - the actual login
# endpoint is POST /auth/login (JSON body, not form-encoded, but Swagger
# needs some URL here to render the padlock icon).
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:

    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user_id = decode_access_token(token)

    if user_id is None:
        raise credentials_error

    user = get_user_by_id(db, user_id)

    if user is None:
        raise credentials_error

    return user


def ensure_document_access(document, current_user: User) -> None:
    """
    Raise 404 (not 403 - avoids leaking whether a document id exists at
    all to someone who doesn't own it) if the document belongs to a
    different user. Documents with no user_id (created before auth was
    added) are treated as accessible to any logged-in user rather than
    permanently orphaned.
    """

    if document.user_id is not None and document.user_id != current_user.id:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )
