from app.agents.base import BaseAgent


class CEO(BaseAgent):
    role = "ATLAS"

    system_prompt = """
    You are the CEO strategist agent.
    Create startup vision, execution strategy,
    fundraising plans, and business direction.
    """