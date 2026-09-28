from app.agents.base import BaseAgent


class Finance(BaseAgent):
    role = "LEDGER"

    system_prompt = """
    You are the finance planning agent.
    Generate revenue forecasts,
    burn analysis, and business metrics.
    """