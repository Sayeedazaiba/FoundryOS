from groq import Groq
from app.config import settings
from app.artifacts.artifact_store import update_artifact

client = Groq(api_key=settings.GROQ_API_KEY)


class BaseAgent:
    role = "Agent"

    system_prompt = "You are a helpful AI agent."

    async def run(self, brief: str, session_id: str) -> str:
        try:

            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {
                        "role": "system",
                        "content": self.system_prompt,
                    },
                    {
                        "role": "user",
                        "content": brief,
                    },
                ],
                temperature=0.7,
                max_tokens=500,
            )

            content = completion.choices[0].message.content

            artifact_map = {
                "ATLAS": "business_plan",
                "ORACLE": "market_analysis",
                "LEDGER": "financial_model",
                "VECTOR": "tech_architecture",
                "NEXUS": "mvp_roadmap",
            }

            section_map = {
                "ATLAS": "Business Strategy",
                "ORACLE": "Market Research",
                "LEDGER": "Financial Planning",
                "VECTOR": "Architecture Design",
                "NEXUS": "Execution Roadmap",
            }

            artifact = artifact_map.get(self.role)
            section = section_map.get(self.role)

            if artifact:
                update_artifact(
                    session_id,
                    artifact,
                    section,
                    content,
                )

            return content

        except Exception as e:
            return f"ERROR: {str(e)}"