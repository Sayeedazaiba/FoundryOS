from groq import Groq
from app.config import settings

client = Groq(
    api_key=settings.GROQ_API_KEY
)

ARTIFACT_PROMPTS = {
    "business_plan": "Generate a detailed startup business plan.",
    "market_analysis": "Generate a detailed market analysis report.",
    "financial_model": "Generate a financial model report.",
    "tech_architecture": "Generate a technical architecture report.",
    "pitch_deck": "Generate a startup pitch deck report.",
    "mvp_roadmap": "Generate an MVP roadmap report."
}


async def generate_dynamic_report(session_data: dict, artifact: str):

    idea = session_data.get("idea", "")
    industry = session_data.get("industry", "")
    budget = session_data.get("budget", "")
    audience = session_data.get("audience", "")
    goals = session_data.get("goals", "")
    stack = session_data.get("stack", "")

    prompt = f"""
You are an elite startup strategist and venture analyst.

Generate a highly detailed {artifact.replace("_", " ").title()} report.

Startup Details:
- Idea: {idea}
- Industry: {industry}
- Budget: {budget}
- Target Audience: {audience}
- Goals: {goals}
- Tech Stack: {stack}

TASK:
{ARTIFACT_PROMPTS.get(artifact, "")}

Requirements:
- Make the report realistic and startup-grade
- Do NOT mention missing information
- Do NOT ask for more details
- Write professionally
- Use clear headings
- Include actionable insights
- Be specific to the startup idea provided
- Generate at least 1200 words
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
    )

    generated_text = completion.choices[0].message.content

    return {
        "title": artifact.replace("_", " ").title(),
        "content": [
            ("AI Generated Report", generated_text)
        ]
    }