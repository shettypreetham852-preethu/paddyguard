import json
import csv
import io
from pathlib import Path
from datetime import datetime
from fastapi import APIRouter, Response
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/api", tags=["history"])
DATA_DIR = Path(__file__).parent.parent / "data"
HISTORY_FILE = DATA_DIR / "sample_history.json"

class HistoryItem(BaseModel):
    disease_id: str
    disease_name: str
    confidence: float
    severity: str
    variety: Optional[str] = "IR 64"
    location: Optional[str] = "Field Plot 1"
    area_acres: Optional[float] = 2.5
    status: Optional[str] = "Diagnosed"
    thumbnail: Optional[str] = "/samples/leaf_blast.jpg"

def load_history():
    if HISTORY_FILE.exists():
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_history(data):
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

@router.get("/history")
async def get_history():
    history = load_history()
    return {
        "success": True,
        "count": len(history),
        "history": history
    }

@router.post("/history")
async def add_history_entry(item: HistoryItem):
    history = load_history()
    now_iso = datetime.utcnow().isoformat() + "Z"
    new_id = f"SCAN-{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}"

    entry = {
        "id": new_id,
        "timestamp": now_iso,
        "disease_id": item.disease_id,
        "disease_name": item.disease_name,
        "confidence": item.confidence,
        "severity": item.severity,
        "area_acres": item.area_acres,
        "variety": item.variety,
        "location": item.location,
        "status": item.status,
        "thumbnail": item.thumbnail
    }

    history.insert(0, entry) # Most recent first
    save_history(history)
    return {
        "success": True,
        "entry": entry
    }

@router.get("/history/export")
async def export_history_csv():
    history = load_history()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Scan ID", "Timestamp", "Disease", "Confidence (%)", "Severity", "Variety", "Area (Acres)", "Location", "Status"])
    for row in history:
        writer.writerow([
            row.get("id"),
            row.get("timestamp"),
            row.get("disease_name"),
            row.get("confidence"),
            row.get("severity"),
            row.get("variety"),
            row.get("area_acres"),
            row.get("location"),
            row.get("status")
        ])
    output.seek(0)
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=paddyguard_detection_history.csv"}
    )
