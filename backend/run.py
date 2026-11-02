import uvicorn
import sys
from pathlib import Path

# Add backend directory to sys.path
sys.path.insert(0, str(Path(__file__).parent))

if __name__ == "__main__":
    print("=" * 65)
    print(" PaddyGuard AI Backend Server")
    print(" AI-Based Paddy Disease Detection, Treatment & Yield Prediction")
    print("=" * 65)
    print(" Starting FastAPI server at http://127.0.0.1:8000")
    print(" Interactive API Docs available at http://127.0.0.1:8000/docs")
    print("=" * 65)
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
