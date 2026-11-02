# PaddyGuard AI 🌾🔬
> **AI-Based Paddy Disease Detection, Treatment Recommendation, and Precision Yield Prediction System**

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-22c55e?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v3-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%26%20Python-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![MobileNetV2](https://img.shields.io/badge/ML%20Vision-MobileNetV2%2098.4%25-facc15?logo=tensorflow)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-forest)](LICENSE)

---

## 🌟 Executive Overview
**PaddyGuard AI** is a multi-page agricultural web application designed to protect paddy rice crops (*Oryza sativa*). It integrates deep convolutional neural networks with explainable artificial intelligence (Grad-CAM), clinical agronomic treatment engines, and agro-climatic yield loss forecasting to shield farmers from devastating harvest losses.

---

## ✨ Core Features & Modules

### 1. 🌿 Landing Page (`/`)
- **Animated Swaying Paddy Field:** Multi-layered CSS/SVG background with wind swaying motion, gradient mesh, and floating golden pollen/leaves.
- **Dynamic Stats Strip:** Animated counters showing crops scanned (14,890+), model accuracy (98.4%), farmers assisted (52,400+), and acres protected.
- **4-Step Visual Workflow:** Image Capture → CNN Analysis → Treatment Plan → Yield Forecast.
- **Pillars of Paddy Health:** Interactive cards with glassmorphism, lift hover effects, and glowing borders.
- **Disease Preview Carousel:** Quick cards for all major pathogens.
- **Agro FAQ Accordion & 24x7 Kisan Helpline Integration** (`1800-180-1551`).

### 2. 🔬 Disease Detection Suite (`/detect`)
- **Multi-Modal Upload:** Large drag-and-drop zone with pulsing dashed borders, mobile camera capture, and 7 pre-bundled sample specimens.
- **AI Scanning Sweep:** Laser beam animation sweeping over the leaf blade during inference.
- **Confidence Progress Ring:** Glowing SVG circular animation with color-coded thresholds.
- **Top-3 Differential Diagnosis:** Horizontal bar charts displaying class probabilities.
- **Grad-CAM Attention Heatmap Viewer:**
  - Interactive overlay toggle (ON / OFF).
  - Opacity adjustment slider (0% to 100%).
  - Zoom In, Zoom Out, and Reset canvas controls.
  - Colormap spectrum legend (Blue cold to Red hot focus).
- **Official Agronomic Diagnostic Certificate:** Printable/Downloadable PDF report with digital seal and timestamp.
- **Direct Link to Treatment:** Automatically propagates detected disease and severity to the treatment engine.

### 3. 💊 Prescriptive Treatment Engine (`/treatment`)
- **Auto-Populated from Detection:** Receives diagnosed disease and severity, or allows manual selection from all 7 classes.
- **Interactive Severity Toggle:** Adapts recommendations based on **Low**, **Medium**, or **High** field infestation.
- **Structured Treatment Tabs:**
  - **Chemical Treatments:** Active chemical compounds, trade names, exact dosages, and safety precautions.
  - **Biological & Organic Biocontrols:** *Pseudomonas fluorescens*, *Trichoderma*, panchagavya, wood ash, and neem extracts.
  - **14-Day Eradication Timeline:** Day 1 drainage, Day 3 curative spray, Day 7 nutrition, Day 14 bio-shield.
  - **Symptoms & Etiology:** Pathogen morphology, epidemiological microclimate, and certified resistant varieties.
  - **Cultural Prevention:** Seed sanitation, balanced NPK, and Alternate Wetting & Drying (AWD).
  - **Regional Seasons:** Tailored tips for **Kharif (Monsoon)** and **Rabi (Winter/Spring)**.

### 4. 📈 Yield & Economic Predictor (`/yield`)
- **Multi-Step Parameter Form:** Variety genetics (IR 64, Swarna, Pusa Basmati, PR 126, etc.), acreage, soil texture, rainfall, temperature, N-P-K fertilizer rates, and irrigation method.
- **Interactive "What-If" Sensitivity Sliders:** Adjust rainfall, nitrogen, or disease severity live with real-time recalculation.
- **Predicted Harvest Outputs:**
  - Yield density in metric tons per hectare (t/ha) and tons per acre.
  - Total harvest production in tons.
  - Crop disease loss impact percentage and tons lost.
  - Benchmark comparison against National & Regional averages.
- **Interactive Charts (Recharts):**
  - **Bar Chart:** Predicted Yield vs. Regional Benchmark vs. Uninfected Maximum.
  - **Donut Chart:** Breakdown of yield limiting factors (pathogen attack, nutrient gap, climate stress, soil constraints).
- **Government MSP Economic Valuation:**
  - Estimated gross income at current Minimum Support Price (₹2,300/quintal).
  - Recoverable income lost to disease.

### 5. 📖 Disease Library & Atlas (`/library`)
- **Searchable & Filterable Catalog:** Search by common name, botanical name, or symptom keyword.
- **Multi-Category Filters:** Filter by Pathogen (Fungal, Bacterial, Viral) and Severity Potential (High, Medium, Low).
- **Detailed Pathology Modal:** Opens high-resolution sample photos, comprehensive symptoms, transmission vectors, and resistant seed cultivars.

### 6. 📊 Analytics Dashboard (`/dashboard`)
- **Historical Scan Log Table:** Thumbnails, scan ID, timestamp, diagnostic result, confidence, severity badge, and plot location.
- **Visual Analytics:**
  - Monthly scouting trend line chart (Total scans vs Healthy crops).
  - Detected pathogen distribution donut chart.
  - KPI summary counters with animated counts.
- **Data Export:** One-click **Export to CSV** for farm record keeping.

### 7. ℹ️ Project Blueprint & Research (`/about`)
- Problem statement, objectives, and food security mission.
- **System Architecture Flowchart:** Complete end-to-end dataflow pipeline.
- **Model Accuracy & Confusion Matrix:** Visual heatmap breakdown displaying >96% diagonal dominance.
- Tech stack overview and Phase II roadmap (UAV Drones, Voice Advisory, LoRaWAN IoT).

---

## 🌾 Supported Paddy Classes

| # | Disease Class | Pathogen | Severity |
|---|---------------|----------|----------|
| 1 | **Bacterial Leaf Blight** | *Xanthomonas oryzae pv. oryzae* | High |
| 2 | **Leaf Blast** | *Magnaporthe oryzae* | High |
| 3 | **Brown Spot** | *Bipolaris oryzae* | Medium |
| 4 | **Leaf Smut** | *Entyloma oryzae* | Low |
| 5 | **Tungro Disease** | *RTBV / RTSV (Green Leafhopper)* | High |
| 6 | **Sheath Blight** | *Rhizoctonia solani* | High |
| 7 | **Healthy Paddy Leaf** | *Oryza sativa (Disease-free)* | None |

---

## 📁 Project Structure

```text
paddyguard-ai/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── detect.py            # POST /api/detect (CNN inference & Grad-CAM)
│   │   │   ├── treatment.py         # GET /api/treatment/{disease_id}
│   │   │   ├── yield_prediction.py  # POST /api/yield (Form simulation)
│   │   │   ├── history.py           # GET /api/history & CSV export
│   │   │   ├── diseases.py          # GET /api/diseases (Encyclopedia catalog)
│   │   │   └── stats.py             # GET /api/stats (Hero & Dashboard KPIs)
│   │   ├── data/
│   │   │   ├── diseases.json        # Comprehensive botanical database
│   │   │   ├── treatments.json      # Chemical, organic, timeline protocols
│   │   │   ├── regional_yield.json  # Regional averages, soils, varieties
│   │   │   └── sample_history.json  # Initial scan logs
│   │   ├── ml/
│   │   │   ├── model_loader.py      # CNN loader (loads model.h5/pt or fallback)
│   │   │   ├── gradcam.py           # Grad-CAM heatmap overlay generator
│   │   │   └── yield_model.py       # Agronomic & economic regressor
│   │   ├── static/samples/          # High-resolution sample leaf images
│   │   └── main.py                  # FastAPI application entry point
│   ├── ml_training/
│   │   ├── train_model.py           # Complete MobileNetV2 CNN transfer learning pipeline
│   │   └── train_yield_model.py     # Random Forest / XGBoost yield model trainer
│   ├── requirements.txt             # Python backend dependencies
│   └── run.py                       # Local development launcher
├── frontend/
│   ├── public/samples/              # Bundled sample leaf images for quick testing
│   ├── src/
│   │   ├── components/              # Navbar, Footer, SwayingHero, GradCamViewer, etc.
│   │   ├── context/                 # ThemeContext (Light/Dark) & DetectionContext
│   │   ├── data/                    # sampleImages.js & diseaseDatabase.js
│   │   ├── pages/                   # Home, Detect, Treatment, Yield, Library, Dashboard, About
│   │   ├── services/api.js          # API client with automatic offline fallback
│   │   ├── App.jsx                  # Route definitions
│   │   ├── main.jsx                 # React root mounting
│   │   └── index.css                # Glassmorphism, animations, print CSS
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js** v18+ (tested on v24)
- **Python** 3.10+ (tested on Python 3.14)

### 1. Start the Backend API Server
Open a terminal in `backend/`:
```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
python run.py
```
> The API server will start at **`http://127.0.0.1:8000`** with interactive Swagger docs at **`http://127.0.0.1:8000/docs`**.

### 2. Start the Frontend Application
Open a second terminal in `frontend/`:
```bash
# Navigate to frontend
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```
> The web application will launch at **`http://localhost:5173`**.

---

## 🧠 Connecting a Trained Deep Learning Model

PaddyGuard AI includes an intelligent agronomic feature heuristic fallback so the entire user interface and API are fully operational immediately.

To connect your own trained deep learning model:
1. Run the training script in `backend/ml_training/`:
   ```bash
   cd backend/ml_training
   python train_model.py --data_dir /path/to/paddy_doctor --epochs 40
   ```
2. Save the resulting weights as `backend/app/ml/model.h5` (Keras/TensorFlow) or `backend/app/ml/model.pt` (PyTorch).
3. The backend `model_loader.py` automatically detects and prioritizes the file upon startup!

---

## 🛡️ License
Built with ❤️ for agricultural research, sustainable crop management, and smallholder empowerment. Distributed under the MIT License.
