from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en local mejor abrir a todo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = Path(__file__).resolve().parent / "vendors_data.json"

@app.get("/vendors")
def get_vendors():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data
