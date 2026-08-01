import re
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator


class UserCreate(BaseModel):

    email: EmailStr

    password: str = Field(min_length=8, max_length=128)

    full_name: str | None = None

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:

        # Emails are case-insensitive by convention (RFC 5321 technically
        # allows case-sensitive local parts, but no real provider honors
        # that). Without normalizing, "Roopesh@Example.com" at signup and
        # "roopesh@example.com" at login would be treated as different
        # accounts and login would silently fail.
        return value.strip().lower()

    @field_validator("full_name")
    @classmethod
    def clean_full_name(cls, value: str | None) -> str | None:

        if value is None:
            return None

        cleaned = value.strip()

        return cleaned or None

    @field_validator("password")
    @classmethod
    def password_complexity(cls, value: str) -> str:

        if not re.search(r"[A-Za-z]", value):

            raise ValueError(
                "Password must contain at least one letter."
            )

        if not re.search(r"\d", value):

            raise ValueError(
                "Password must contain at least one number."
            )

        return value

    @model_validator(mode="after")
    def password_must_not_contain_identity(self) -> "UserCreate":

        password_lower = self.password.lower()

        email_local_part = self.email.split("@")[0].lower()

        # Only flag it if the local part is a meaningful chunk (3+ chars)
        # to avoid false positives on very short email prefixes.
        if len(email_local_part) >= 3 and email_local_part in password_lower:

            raise ValueError(
                "Password must not contain your email address."
            )

        if self.full_name:

            for name_part in self.full_name.split():

                name_part_lower = name_part.lower()

                if len(name_part_lower) >= 3 and name_part_lower in password_lower:

                    raise ValueError(
                        "Password must not contain your name."
                    )

        return self


class UserLogin(BaseModel):

    email: EmailStr

    password: str

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:

        return value.strip().lower()


class UserPublic(BaseModel):

    id: str

    email: EmailStr

    full_name: str | None = None

    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):

    access_token: str

    token_type: str = "bearer"

    user: UserPublic
