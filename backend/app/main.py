from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import (
    startup,
    stream,
    reports,
    artifacts
)
import os
from dotenv import load_dotenv


load_dotenv()

app = FastAPI(title="Foundry OS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:8080")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(startup.router, prefix="/api")
app.include_router(stream.router)
app.include_router(reports.router)
app.include_router(artifacts.router)

@app.get("/")
def root():
    return {"status": "ok", "service": "Foundry OS API"}