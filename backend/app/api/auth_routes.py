from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.database.models import User
from backend.app.database.user_crud import (
    create_user,
    get_user_by_email,
)
from backend.app.api.deps import get_current_user
from backend.app.schemas.auth import (
    Token,
    UserCreate,
    UserLogin,
    UserPublic,
)
from backend.app.utils.security import (
    create_access_token,
    verify_password,
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post(
    "/register",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
)
def register(
    payload: UserCreate,
    db: Session = Depends(get_db),
):

    existing = get_user_by_email(db, payload.email)

    if existing is not None:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists.",
        )

    user = create_user(
        db,
        email=payload.email,
        password=payload.password,
        full_name=payload.full_name,
    )

    access_token = create_access_token(subject=user.id)

    return Token(
        access_token=access_token,
        user=UserPublic.model_validate(user),
    )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    payload: UserLogin,
    db: Session = Depends(get_db),
):

    invalid_credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password.",
    )

    user = get_user_by_email(db, payload.email)

    if user is None:
        raise invalid_credentials_error

    if not verify_password(payload.password, user.hashed_password):
        raise invalid_credentials_error

    access_token = create_access_token(subject=user.id)

    return Token(
        access_token=access_token,
        user=UserPublic.model_validate(user),
    )


@router.get(
    "/me",
    response_model=UserPublic,
)
def read_current_user(
    current_user: User = Depends(get_current_user),
):

    return current_user
