import json
from datetime import datetime
from pathlib import Path

from sqlalchemy.orm import Session

from backend.app.database.models import Document
from backend.app.schemas.timeline import (
    TimelineItem,
    TimelineResponse,
)


# Documents in the wild use different date formats depending on the
# hospital/provider ("02/10/26", "01/22/2026", etc). Try each known format
# in turn so the timeline sorts chronologically instead of alphabetically.
_DATE_FORMATS = [
    "%m/%d/%Y",
    "%m/%d/%y",
    "%Y-%m-%d",
    "%d/%m/%Y",
]


def _parse_date(value: str):

    for fmt in _DATE_FORMATS:

        try:
            return datetime.strptime(value, fmt)

        except (ValueError, TypeError):
            continue

    return None


def get_timeline(
    db: Session,
) -> TimelineResponse:

    documents = (

        db.query(Document)

        .filter(

            Document.analysis_json_path.isnot(None),

        )

        .all()

    )

    timeline = []

    for document in documents:

        analysis_path = Path(

            document.analysis_json_path,

        )

        if not analysis_path.exists():

            continue

        with open(

            analysis_path,

            "r",

            encoding="utf-8",

        ) as file:

            data = json.load(file)

        timeline.append(

            TimelineItem(

                document_id=document.document_id,

                document_type=data.get(

                    "document_type",

                    "Unknown",

                ),

                title=document.original_filename,

                date=data.get(

                    "statement_date",

                    "Unknown",

                ),

                hospital=data.get(

                    "hospital",

                    "-",

                ),

                doctor=data.get(

                    "doctor",

                    "-",

                ),

                summary=data.get(

                    "summary",

                    "",

                ),

            )

        )

    def sort_key(item: TimelineItem):

        parsed = _parse_date(item.date)

        # Sort dated items first (most recent first); anything unparseable
        # ("Unknown", bad OCR, etc) sorts to the end instead of corrupting
        # the chronological order. Using -timestamp keeps a single
        # ascending sort doing both jobs at once.
        if parsed is None:
            return (1, 0)

        return (0, -parsed.timestamp())

    timeline.sort(key=sort_key)

    return TimelineResponse(

        timeline=timeline,

    )