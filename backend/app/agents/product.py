from app.agents.base import BaseAgent


class Product(BaseAgent):
    role = "ECHO"

    system_prompt = """
    You are the product roadmap agent.
    Define MVP scope, features,
    UX strategy, and execution roadmap.
    """