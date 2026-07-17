import re


def _extract_amount(
    pattern: str,
    text: str,
):

    match = re.search(
        pattern,
        text,
        re.IGNORECASE,
    )

    if not match:
        return None

    try:

        return float(

            match.group(1)

            .replace(",", "")

            .replace("$", "")

            .strip()

        )

    except Exception:

        return None


def validate_financial_fields(
    ai_result,
    ocr_text: str,
):

    total = _extract_amount(

        r"Total\s+(?:Professional\s+)?Charges[:\s]*\$?\s*([0-9,]+\.\d{2})",

        ocr_text,

    )

    visit = _extract_amount(

        r"Visit\s+Balance[:\s]*\$?\s*([0-9,]+\.\d{2})",

        ocr_text,

    )

    remaining = _extract_amount(

        r"Remaining\s+Balance[:\s]*\$?\s*([0-9,]+\.\d{2})",

        ocr_text,

    )

    account = _extract_amount(

        r"Total\s+Account\s+Balance[:\s]*\$?\s*([0-9,]+\.\d{2})",

        ocr_text,

    )

    if total is not None:

        ai_result.total_charges = total

    if visit is not None:

        ai_result.remaining_balance = visit

    elif remaining is not None:

        ai_result.remaining_balance = remaining

    elif account is not None:

        ai_result.remaining_balance = account

    return ai_result