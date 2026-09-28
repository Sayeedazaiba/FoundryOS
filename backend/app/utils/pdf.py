from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO


def generate_pdf(title: str, content: list[str]) -> BytesIO:
    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)
    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph(title, styles["Title"]))
    story.append(Spacer(1, 12))

    for line in content:
        story.append(Paragraph(line, styles["BodyText"]))
        story.append(Spacer(1, 8))

    doc.build(story)

    buffer.seek(0)
    return buffer