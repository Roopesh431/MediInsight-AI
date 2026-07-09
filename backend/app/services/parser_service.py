import re

from backend.app.schemas.procedure import Procedure

def extract_medical_information(text: str) -> dict:
    """
    Extract important information from OCR text.
    """

    data = {}

    patient = re.search(
    r"Patient Name\s+Visit ID\s+([A-Za-z ]+?)\s+\d{6,}",
    text,
    re.MULTILINE,
    )

    if patient:
        data["patient_name"] = patient.group(1).strip()

    provider = re.search(
        r"Provider:\s*(.+)",
        text
    )

    if provider:
        data["provider"] = provider.group(1).strip()

    statement = re.search(
        r"Statement Date:\s*([0-9/]+)",
        text
    )

    if statement:
        data["statement_date"] = statement.group(1)

    visit_balance = re.search(
        r"Visit Balance:\s*\$?([0-9,.]+)",
        text
    )

    if visit_balance:
        data["visit_balance"] = visit_balance.group(1)

    total = re.search(
        r"Total professional charges:\s*\$?([0-9,.]+)",
        text,
        re.IGNORECASE,
    )

    if total:
        data["total_charges"] = total.group(1)
    
        procedures = []

    pattern = re.compile(
        r'(\d{2}/\d{2}/\d{4}).*?([A-Z]?\d{4,5}).*?\$([0-9]+\.[0-9]{2})',
        re.DOTALL,
    )

    matches = pattern.findall(text)

    for match in matches:

        date = match[0]

        code = match[1]

        charge = float(match[2])

        start = text.find(code)

        end = text.find("$", start)

        description = text[start:end]

        description = re.sub(r"\s+", " ", description)

        procedures.append(
            Procedure(
                date=date,
                code=code,
                description=description.strip(),
                charge=charge,
            )
        )

    data["procedures"] = procedures

    return data