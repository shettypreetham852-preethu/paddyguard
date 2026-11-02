import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .api.detect import router as detect_router
from .api.treatment import router as treatment_router
from .api.yield_prediction import router as yield_router
from .api.history import router as history_router
from .api.diseases import router as diseases_router
from .api.stats import router as stats_router

app = FastAPI(
    title="PaddyGuard AI Backend API",
    description="AI-Based Paddy Disease Detection, Treatment Recommendation and Yield Prediction System",
    version="1.0.0"
)

# Enable CORS for local dev and production frontend ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(detect_router)
app.include_router(treatment_router)
app.include_router(yield_router)
app.include_router(history_router)
app.include_router(diseases_router)
app.include_router(stats_router)

# Mount static folder for sample images
STATIC_DIR = Path(__file__).parent / "static"
STATIC_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

@app.get("/")
async def root():
    return {
        "project": "PaddyGuard AI",
        "tagline": "Protect Your Paddy. Predict Your Harvest.",
        "status": "online",
        "docs_url": "/docs",
        "endpoints": [
            "POST /api/detect",
            "GET  /api/treatment/{disease_id}",
            "POST /api/yield",
            "GET  /api/yield/metadata",
            "GET  /api/history",
            "POST /api/history",
            "GET  /api/history/export",
            "GET  /api/diseases",
            "GET  /api/stats"
        ]
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "paddyguard-backend"}
