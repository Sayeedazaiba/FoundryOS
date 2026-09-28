import asyncio

from app.agents.ceo import CEO
from app.agents.cto import CTO
from app.agents.market import Market
from app.agents.finance import Finance
from app.agents.marketing import Marketing
from app.agents.product import Product


agents = [
    ("ceo", CEO()),
    ("market", Market()),
    ("cto", CTO()),
    ("finance", Finance()),
    ("marketing", Marketing()),
    ("product", Product()),
]


async def run_simulation(brief: str, emit, session_id: str):
    for agent_id, agent in agents:
        try:
            result = await agent.run(brief, session_id)

            await emit({
                "agent": agent_id,
                "output": result,
            })

            await asyncio.sleep(1)

        except Exception as e:
            await emit({
                "agent": agent_id,
                "output": f"ERROR: {str(e)}",
            })