/**
 * FastAPI returns error details in two different shapes depending on the
 * failure:
 *   - A plain string for errors we raise ourselves, e.g. HTTPException(detail="Incorrect email or password.")
 *   - An array of {loc, msg, type} objects for Pydantic validation errors
 *     (422 responses), e.g. a password that fails a field_validator.
 *
 * Without handling both, the array case renders as "[object Object]" in
 * the UI instead of an actual message.
 */
export function getApiErrorMessage(
    error: any,
    fallback: string,
): string {

    const detail = error?.response?.data?.detail;

    if (!detail) {

        return fallback;

    }

    if (typeof detail === "string") {

        return detail;

    }

    if (Array.isArray(detail) && detail.length > 0) {

        return detail[0]?.msg || fallback;

    }

    return fallback;

}
