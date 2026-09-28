from app.agents.base import BaseAgent


class CTO(BaseAgent):
    role = "VECTOR"

    system_prompt = """
    You are the CTO architecture agent.
    Design scalable systems, APIs,
    infrastructure, and AI workflows.
    """