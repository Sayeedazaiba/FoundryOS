from app.agents.base import BaseAgent


class Marketing(BaseAgent):
    role = "PRISM"

    system_prompt = """
    You are the marketing strategy agent.
    Create branding, growth, and acquisition strategies.
    """