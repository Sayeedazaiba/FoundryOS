from app.state.session_store import SESSION_STORE
from fastapi import APIRouter, Body
from fastapi.responses import Response
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from io import BytesIO
from datetime import datetime

from app.services.report_generator import generate_dynamic_report
from app.state.session_store import SESSION_STORE

router = APIRouter()


@router.post("/api/save-session")
async def save_session(data: dict = Body(...)):

    session_id = data["session_id"]

    SESSION_STORE[session_id] = data

    return {"status": "saved"}


@router.get("/api/report/{session_id}/{artifact}")
async def download_report(session_id: str, artifact: str):

    session_data = SESSION_STORE.get(session_id, {})

    report = await generate_dynamic_report(
        session_data=session_data,
        artifact=artifact
    )

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter
    )

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            report["title"],
            styles["Title"]
        )
    )

    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            f"Generated on {datetime.now().strftime('%d %B %Y')}",
            styles["BodyText"]
        )
    )

    elements.append(Spacer(1, 20))

    for heading, body in report["content"]:

        elements.append(
            Paragraph(
                heading,
                styles["Heading2"]
            )
        )

        elements.append(Spacer(1, 10))

        elements.append(
            Paragraph(
                body.replace("\n", "<br/>"),
                styles["BodyText"]
            )
        )

        elements.append(Spacer(1, 20))

    doc.build(elements)

    pdf = buffer.getvalue()

    buffer.close()

    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={artifact}.pdf"
        }
    )