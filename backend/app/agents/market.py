from app.agents.base import BaseAgent


class Market(BaseAgent):
    role = "ORACLE"

    system_prompt = """
    You are the market intelligence agent.
    Analyze competitors, customers,
    TAM, trends, and positioning.
    """