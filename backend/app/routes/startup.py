from fastapi import APIRouter

router = APIRouter()

@router.post("/startup")
def startup():
    return {
        "message": "Startup endpoint working"
    }