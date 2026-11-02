import json
from pathlib import Path
from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional
from ..ml.yield_model import yield_model

router = APIRouter(prefix="/api", tags=["yield"])
DATA_DIR = Path(__file__).parent.parent / "data"

class YieldRequest(BaseModel):
    variety: str = Field(default="ir64", description="Rice variety ID")
    area: float = Field(default=2.5, description="Land area")
    area_unit: str = Field(default="acres", description="'acres' or 'hectares'")
    soil_type: str = Field(default="alluvial", description="Soil classification")
    sowing_date: Optional[str] = Field(default="2026-06-15", description="Sowing or transplant date")
    rainfall: float = Field(default=950.0, description="Seasonal rainfall in mm")
    temperature: float = Field(default=28.5, description="Average temperature in °C")
    humidity: float = Field(default=75.0, description="Relative humidity %")
    nitrogen: float = Field(default=120.0, description="Nitrogen N kg/ha")
    phosphorus: float = Field(default=60.0, description="Phosphorus P kg/ha")
    potassium: float = Field(default=40.0, description="Potassium K kg/ha")
    irrigation_type: str = Field(default="canal", description="Irrigation method")
    disease_id: str = Field(default="healthy", description="Detected disease ID")
    disease_severity: str = Field(default="None", description="Severity: None, Low, Medium, High")
    region: str = Field(default="national_average", description="Agro-climatic region")

@router.post("/yield")
async def calculate_yield(req: YieldRequest):
    """
    Computes expected paddy yield based on variety genetics, soil, weather,
    NPK fertilizers, irrigation, and detected disease loss penalty.
    Returns:
      - Predicted yield (tons/ha and total tons)
      - Uninfected baseline comparison
      - Yield loss % and loss in tons
      - Regional benchmark comparison
      - Economic gross revenue & lost income under MSP (Minimum Support Price)
      - Loss breakdown factors for visual charts
    """
    res = yield_model.predict(req.dict())
    return {
        "success": True,
        "input_params": req.dict(),
        "prediction": res
    }

@router.get("/yield/metadata")
async def get_yield_metadata():
    """
    Returns lists of available rice varieties, soil types, irrigation methods,
    and regional benchmarks to populate frontend form selectors.
    """
    with open(DATA_DIR / "regional_yield.json", "r", encoding="utf-8") as f:
        meta = json.load(f)
    return {
        "success": True,
        "varieties": meta.get("varieties", []),
        "soils": meta.get("soils", []),
        "irrigation_types": meta.get("irrigation_types", []),
        "regional_benchmarks": meta.get("regional_benchmarks", {}),
        "economic_benchmarks": meta.get("economic_benchmarks", {})
    }
