import json
from pathlib import Path

from sqlalchemy.orm import Session

from backend.app.database.models import Document
from backend.app.schemas.timeline import (
    TimelineItem,
    TimelineResponse,
)


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

    timeline.sort(

        key=lambda x: x.date,

        reverse=True,

    )

    return TimelineResponse(

        timeline=timeline,

    )