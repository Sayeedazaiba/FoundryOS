from fastapi import APIRouter, WebSocket
from app.orchestrator import run_simulation

router = APIRouter()


@router.websocket("/ws/stream/{session_id}")
async def stream(websocket: WebSocket, session_id: str):
    await websocket.accept()

    try:
        data = await websocket.receive_json()

        brief = data.get("brief", "")

        async def emit(payload):
            await websocket.send_json(payload)

        await run_simulation(
    brief,
    emit,
    session_id
)

    except Exception as e:
        print("STREAM ERROR:", e)

        await websocket.send_json({
            "agent": "ceo",
            "output": f"ERROR: {str(e)}",
        })

    finally:
        await websocket.close()