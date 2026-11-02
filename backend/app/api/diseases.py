import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api", tags=["diseases"])
DATA_DIR = Path(__file__).parent.parent / "data"

@router.get("/diseases")
async def get_all_diseases():
    """
    Returns full catalog of all 7 paddy disease classes including symptoms,
    pathogens, causes, favorable conditions, resistant varieties, and image URLs.
    """
    file_path = DATA_DIR / "diseases.json"
    if not file_path.exists():
        raise HTTPException(status_code=500, detail="Diseases database missing")
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return {
        "success": True,
        "count": len(data.get("diseases", [])),
        "diseases": data.get("diseases", [])
    }

@router.get("/diseases/{disease_id}")
async def get_disease(disease_id: str):
    file_path = DATA_DIR / "diseases.json"
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    for d in data.get("diseases", []):
        if d["id"] == disease_id.lower().strip():
            return {"success": True, "disease": d}
    raise HTTPException(status_code=404, detail="Disease not found in encyclopedia")
