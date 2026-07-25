from datetime import datetime, timedelta, timezone

import bcrypt
import jwt

from backend.config import settings


def hash_password(password: str) -> str:

    salt = bcrypt.gensalt()

    return bcrypt.hashpw(
        password.encode("utf-8"),
        salt,
    ).decode("utf-8")


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:

    try:

        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8"),
        )

    except ValueError:

        # Malformed hash in the DB - fail closed rather than raising.
        return False


def create_access_token(
    subject: str,
    expires_minutes: int | None = None,
) -> str:

    expire_minutes = (
        expires_minutes
        if expires_minutes is not None
        else settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expire_minutes,
    )

    payload = {
        "sub": subject,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def decode_access_token(token: str) -> str | None:
    """
    Returns the subject (user id) encoded in the token, or None if the
    token is invalid, malformed, or expired.
    """

    try:

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        return payload.get("sub")

    except jwt.PyJWTError:

        return None
