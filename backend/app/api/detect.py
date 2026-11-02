import io
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from PIL import Image
from ..ml.model_loader import classifier
from ..ml.gradcam import generate_gradcam_overlay
import json
from pathlib import Path

router = APIRouter(prefix="/api", tags=["detection"])

DATA_DIR = Path(__file__).parent.parent / "data"

@router.post("/detect")
async def detect_disease(
    file: Optional[UploadFile] = File(None),
    sample_id: Optional[str] = Form(None)
):
    """
    Analyzes an uploaded leaf photo or sample identifier.
    Returns:
      - Predicted disease name and ID
      - Confidence percentage
      - Top-3 predictions with confidence bars
      - Severity level badge (Low / Medium / High / None)
      - Grad-CAM activation heatmap overlay (base64 PNG)
      - Quick recommendation snippet
    """
    image = None

    if file:
        try:
            contents = await file.read()
            image = Image.open(io.BytesIO(contents))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid image file uploaded: {str(e)}")
    elif sample_id:
        # Load one of the bundled sample images or generate representative pattern
        sample_path = DATA_DIR.parent / "static" / "samples" / f"{sample_id}.jpg"
        if sample_path.exists():
            image = Image.open(sample_path)
        else:
            # Create a realistic test image representation
            image = Image.new("RGB", (256, 256), color=(40, 140, 60))
    else:
        raise HTTPException(status_code=400, detail="Please upload an image file or provide a sample_id")

    # Run CNN inference / heuristic classifier
    prediction = classifier.predict(image)
    disease_id = prediction["disease_id"]

    # Generate Grad-CAM attention heatmap overlay
    heatmap_data_uri = generate_gradcam_overlay(image, disease_id)

    # Attach treatment preview snippet from treatments.json
    treatments_file = DATA_DIR / "treatments.json"
    treatment_snippet = "Maintain standard paddy management."
    if treatments_file.exists():
        with open(treatments_file, "r", encoding="utf-8") as f:
            t_data = json.load(f).get("treatments", {})
            if disease_id in t_data:
                treatment_snippet = t_data[disease_id].get("summary", "")

    return {
        "success": True,
        "prediction": prediction,
        "gradcam_heatmap": heatmap_data_uri,
        "quick_advice": treatment_snippet,
        "timestamp": prediction.get("timestamp")
    }
