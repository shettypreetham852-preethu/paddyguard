import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api", tags=["treatments"])
DATA_DIR = Path(__file__).parent.parent / "data"

@router.get("/treatment/{disease_id}")
async def get_treatment_details(disease_id: str):
    """
    Returns full treatment protocol:
    - Symptoms and Causes
    - Severity-based recommendations (Low vs Medium vs High)
    - Chemical treatment cards (brand, dosage, application method, safety precautions)
    - Organic & biological alternatives
    - 14-day recovery timeline schedule
    - Seasonal tips (Kharif vs Rabi)
    """
    treatments_path = DATA_DIR / "treatments.json"
    diseases_path = DATA_DIR / "diseases.json"

    if not treatments_path.exists():
        raise HTTPException(status_code=500, detail="Treatment database not found")

    with open(treatments_path, "r", encoding="utf-8") as f:
        treatments = json.load(f).get("treatments", {})

    disease_key = disease_id.lower().strip()
    if disease_key not in treatments:
        # Fallback to general healthy or search
        disease_key = "healthy"

    treatment_info = treatments[disease_key]

    # Join with symptoms & causes from diseases.json if present
    disease_info = {}
    if diseases_path.exists():
        with open(diseases_path, "r", encoding="utf-8") as f:
            all_diseases = json.load(f).get("diseases", [])
            for d in all_diseases:
                if d["id"] == disease_key:
                    disease_info = d
                    break

    return {
        "success": True,
        "disease_id": disease_key,
        "treatment": treatment_info,
        "botanical_details": disease_info
    }
