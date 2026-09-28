from fastapi import APIRouter
from app.artifacts.artifact_store import save_artifact

router = APIRouter()

@router.post("/api/session/{session_id}")
async def create_session(session_id: str, payload: dict):

    save_artifact(session_id, payload)

    return {
        "message": "Session saved",
        "session_id": session_id,
        "data": payload
    }