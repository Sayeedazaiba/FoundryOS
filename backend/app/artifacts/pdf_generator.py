from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)
from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf(path, title, content_dict):

    doc = SimpleDocTemplate(path)

    styles = getSampleStyleSheet()

    story = []

    # Title
    story.append(
        Paragraph(title, styles["Title"])
    )

    story.append(Spacer(1, 12))

    # Sections
    for section, content in content_dict.items():

        story.append(
            Paragraph(section, styles["Heading2"])
        )

        story.append(Spacer(1, 6))

        for line in content.split("\n"):

            if line.strip():

                story.append(
                    Paragraph(
                        line,
                        styles["BodyText"]
                    )
                )

        story.append(Spacer(1, 12))

    doc.build(story)