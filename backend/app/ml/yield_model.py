import json
import math
from pathlib import Path
from typing import Dict, Any

DATA_DIR = Path(__file__).parent.parent / "data"

class PaddyYieldModel:
    """
    Advanced Agronomic & ML Yield Predictor for Paddy/Rice Crops.
    Combines IRRI/ICAR crop growth response curves with disease loss modeling
    and provides hooks for pre-trained RandomForest / XGBoost regression models.
    """

    def __init__(self):
        with open(DATA_DIR / "regional_yield.json", "r", encoding="utf-8") as f:
            self.metadata = json.load(f)

        self.variety_map = {v["id"]: v for v in self.metadata["varieties"]}
        self.soil_map = {s["id"]: s for s in self.metadata["soils"]}
        self.irrigation_map = {i["id"]: i for i in self.metadata["irrigation_types"]}
        self.disease_loss = self.metadata["disease_loss_coefficients"]
        self.economic = self.metadata["economic_benchmarks"]

        # Check for trained scikit-learn / XGBoost model file
        self.sklearn_model_path = Path(__file__).parent / "yield_model.pkl"
        self.sklearn_model = None
        self._load_sklearn_model()

    def _load_sklearn_model(self):
        if self.sklearn_model_path.exists():
            try:
                import pickle
                with open(self.sklearn_model_path, "rb") as f:
                    self.sklearn_model = pickle.load(f)
                print(f"[PaddyGuard ML] Loaded trained Yield Regression model from {self.sklearn_model_path}")
            except Exception as e:
                print(f"[PaddyGuard ML] Note: Could not load yield_model.pkl: {e}. Using calibrated agronomic engine.")

    def predict(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Inputs:
          variety: str
          area: float
          area_unit: 'acres' | 'hectares'
          soil_type: str
          rainfall: float (mm during crop season)
          temperature: float (°C average)
          humidity: float (% average)
          nitrogen: float (kg/ha)
          phosphorus: float (kg/ha)
          potassium: float (kg/ha)
          irrigation_type: str
          disease_id: str
          disease_severity: 'None' | 'Low' | 'Medium' | 'High'
          region: str
        """
        variety_id = data.get("variety", "ir64")
        area = float(data.get("area", 1.0))
        area_unit = data.get("area_unit", "acres")
        soil_id = data.get("soil_type", "alluvial")
        rainfall = float(data.get("rainfall", 950.0))
        temperature = float(data.get("temperature", 28.5))
        humidity = float(data.get("humidity", 78.0))
        n = float(data.get("nitrogen", 120.0))
        p = float(data.get("phosphorus", 60.0))
        k = float(data.get("potassium", 40.0))
        irrigation_id = data.get("irrigation_type", "canal")
        disease_id = data.get("disease_id", "healthy")
        disease_severity = data.get("disease_severity", "None")
        region_id = data.get("region", "national_average")

        # Normalize area to hectares
        hectares = area if area_unit == "hectares" else area * 0.404686

        # 1. Base Potential Yield from cultivar genetics
        variety_info = self.variety_map.get(variety_id, self.variety_map["ir64"])
        base_potential = variety_info["potential_yield"] # tons/ha

        # 2. Soil Factor (0.80 to 1.15)
        soil_info = self.soil_map.get(soil_id, self.soil_map["alluvial"])
        soil_factor = soil_info["fertility_factor"]

        # 3. Irrigation Factor
        irr_info = self.irrigation_map.get(irrigation_id, self.irrigation_map["canal"])
        irrigation_factor = irr_info["factor"]

        # 4. Temperature penalty / bell curve (Optimum 25 - 32°C for paddy)
        if 24.0 <= temperature <= 32.0:
            temp_factor = 1.0 - (abs(temperature - 28.0) * 0.015)
        elif temperature < 24.0:
            temp_factor = max(0.65, 1.0 - (24.0 - temperature) * 0.05)
        else: # High heat stress during anthesis
            temp_factor = max(0.60, 1.0 - (temperature - 32.0) * 0.065)

        # 5. Moisture / Rainfall Index
        # Paddy requires 900 - 1400 mm total water requirement
        effective_water = rainfall + (600 if irrigation_id in ["canal", "borewell", "awd"] else 0)
        if 900 <= effective_water <= 1500:
            water_factor = 1.0
        elif effective_water < 900:
            water_factor = max(0.55, 1.0 - ((900 - effective_water) / 900.0) * 0.6)
        else:
            # Water logging / flooding excess
            water_factor = max(0.75, 1.0 - ((effective_water - 1500) / 1000.0) * 0.25)

        # 6. Nutrient Balance Factor (NPK Liebig Law Response)
        # Optimal ratio approx 120 : 60 : 40 kg/ha
        n_eff = min(1.08, (n / 120.0) * 0.7 + (1.0 - ((max(0, n - 150) / 100.0)**1.5) * 0.2))
        p_eff = min(1.04, (p / 60.0) * 0.6 + 0.4)
        k_eff = min(1.05, (k / 40.0) * 0.6 + 0.4)
        npk_factor = (n_eff * 0.5 + p_eff * 0.25 + k_eff * 0.25)

        # Healthy Potential Yield under current field conditions
        uninfected_yield_per_ha = base_potential * soil_factor * irrigation_factor * temp_factor * water_factor * npk_factor
        uninfected_yield_per_ha = max(1.5, min(8.5, uninfected_yield_per_ha))

        # 7. Disease Loss Penalty
        disease_penalties = self.disease_loss.get(disease_id, {"Low": 0.05, "Medium": 0.15, "High": 0.35})
        loss_pct = disease_penalties.get(disease_severity, 0.0)
        
        # Blast resistance bonus if applicable
        if variety_info.get("blast_resistant") and disease_id == "leaf_blast":
            loss_pct = loss_pct * 0.4

        actual_yield_per_ha = uninfected_yield_per_ha * (1.0 - loss_pct)
        total_predicted_tons = actual_yield_per_ha * hectares
        total_loss_tons = (uninfected_yield_per_ha - actual_yield_per_ha) * hectares

        # 8. Regional Benchmark Comparison
        reg_bench = self.metadata["regional_benchmarks"].get(region_id, self.metadata["regional_benchmarks"]["national_average"])
        regional_avg = reg_bench["average_yield"]
        benchmark_diff_pct = round(((actual_yield_per_ha - regional_avg) / regional_avg) * 100.0, 1)

        # 9. Economic Assessment (MSP ₹2,300/quintal = ₹23,000/ton)
        price_per_ton = self.economic["msp_paddy_common"] * 10.0
        if "basmati" in variety_id:
            price_per_ton = self.economic["basmati_open_market_avg"] * 10.0

        estimated_revenue = round(total_predicted_tons * price_per_ton, 2)
        revenue_loss = round(total_loss_tons * price_per_ton, 2)
        potential_revenue = round(estimated_revenue + revenue_loss, 2)

        # 10. Factors Breakdown for Radar / Donut Chart
        loss_factors = [
            {"factor": "Disease Pathogen Attack", "percentage": round(loss_pct * 100, 1)},
            {"factor": "Nutrient Gap (NPK)", "percentage": round(max(0, (1.0 - npk_factor) * 100), 1)},
            {"factor": "Water / Climate Stress", "percentage": round(max(0, (1.0 - water_factor * temp_factor) * 100), 1)},
            {"factor": "Soil Inherent Constraint", "percentage": round(max(0, (1.15 - soil_factor) * 40), 1)}
        ]

        return {
            "predicted_yield_per_ha": round(actual_yield_per_ha, 2),
            "predicted_yield_per_acre": round(actual_yield_per_ha * 0.404686, 2),
            "total_predicted_yield_tons": round(total_predicted_tons, 2),
            "uninfected_yield_per_ha": round(uninfected_yield_per_ha, 2),
            "yield_loss_percentage": round(loss_pct * 100, 1),
            "yield_loss_tons": round(total_loss_tons, 2),
            "regional_benchmark": {
                "region_name": reg_bench["name"],
                "regional_avg_per_ha": regional_avg,
                "difference_pct": benchmark_diff_pct,
                "status": "Above Average" if benchmark_diff_pct >= 0 else "Below Average"
            },
            "economics": {
                "msp_rate_per_quintal": self.economic["msp_paddy_common"] if "basmati" not in variety_id else self.economic["basmati_open_market_avg"],
                "price_per_ton": price_per_ton,
                "currency": "INR",
                "currency_symbol": "₹",
                "estimated_gross_income": estimated_revenue,
                "income_lost_to_disease": revenue_loss,
                "potential_income_with_treatment": potential_revenue
            },
            "breakdown_factors": loss_factors,
            "variety_details": variety_info,
            "soil_details": soil_info
        }

# Global singleton
yield_model = PaddyYieldModel()
