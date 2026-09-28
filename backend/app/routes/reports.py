from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.utils.pdf import generate_pdf

from app.data.reports import (
    BUSINESS_REPORT,
    MARKET_REPORT,
    FINANCE_REPORT,
    TECH_REPORT,
    PITCH_REPORT,
    ROADMAP_REPORT,
)

router = APIRouter()


REPORTS = {
    "business": ("Business Plan", BUSINESS_REPORT),
    "market": ("Market Analysis", MARKET_REPORT),
    "finance": ("Financial Model", FINANCE_REPORT),
    "tech": ("Tech Architecture", TECH_REPORT),
    "pitch": ("Pitch Deck", PITCH_REPORT),
    "roadmap": ("MVP Roadmap", ROADMAP_REPORT),
}


@router.get("/report/{report_type}")
async def download_report(report_type: str):

    if report_type not in REPORTS:
        return {"error": "Invalid report type"}

    title, content = REPORTS[report_type]

    pdf = generate_pdf(
        title=title,
        content=content,
    )

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={report_type}.pdf"
        },
    )