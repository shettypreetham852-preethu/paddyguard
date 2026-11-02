import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  TrendingUp, BarChart3, PieChart as PieIcon, Sliders, 
  HelpCircle, Sparkles, RefreshCw, IndianRupee, Layers, CheckCircle2, ArrowUpRight 
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { api } from '../services/api';
import AnimatedCounter from '../components/AnimatedCounter';

const DONUT_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

export default function YieldPredictionPage() {
  const [searchParams] = useSearchParams();

  // Initial params from URL or defaults
  const paramDisease = searchParams.get('disease') || 'healthy';
  const paramSeverity = searchParams.get('severity') || 'None';

  // Form State
  const [formData, setFormData] = useState({
    variety: 'ir64',
    area: 3.5,
    area_unit: 'acres',
    soil_type: 'alluvial',
    rainfall: 1050,
    temperature: 28.5,
    humidity: 78,
    nitrogen: 120,
    phosphorus: 60,
    potassium: 40,
    irrigation_type: 'canal',
    disease_id: paramDisease,
    disease_severity: paramSeverity,
    region: 'national_average'
  });

  const [metadata, setMetadata] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mspRate, setMspRate] = useState(2300); // INR per quintal

  // Load Metadata
  useEffect(() => {
    async function loadMeta() {
      try {
        const res = await api.getYieldMetadata();
        if (res) {
          setMetadata(res);
          if (res.economic_benchmarks?.msp_paddy_common) {
            setMspRate(res.economic_benchmarks.msp_paddy_common);
          }
        }
      } catch (err) {
        console.warn("Using fallback yield metadata", err);
      }
    }
    loadMeta();
  }, []);

  // Compute Yield whenever inputs change
  useEffect(() => {
    let cancel = false;
    async function runPrediction() {
      setLoading(true);
      try {
        const res = await api.calculateYield(formData);
        if (!cancel && res && res.prediction) {
          setPredictionResult(res.prediction);
        }
      } catch (e) {
        console.error("Prediction error:", e);
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    runPrediction();
    return () => { cancel = true; };
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const pred = predictionResult;

  // Bar Chart Data: Predicted vs Regional Benchmark vs Uninfected
  const barChartData = useMemo(() => {
    if (!pred) return [];
    return [
      {
        name: 'Predicted Yield',
        yield: pred.predicted_yield_per_ha,
        fill: '#10b981'
      },
      {
        name: 'Regional Benchmark',
        yield: pred.regional_benchmark?.regional_avg_per_ha || 4.25,
        fill: '#64748b'
      },
      {
        name: 'Uninfected Genetic Max',
        yield: pred.uninfected_yield_per_ha || 6.2,
        fill: '#f59e0b'
      }
    ];
  }, [pred]);

  // Yield Trend Line Data (Sensitivity across fertilizer / rainfall)
  const lineTrendData = useMemo(() => {
    if (!pred) return [];
    const base = pred.predicted_yield_per_ha;
    return [
      { season: 'Early Tillering', projected: Math.max(1, base * 0.72) },
      { season: 'Active Tillering', projected: Math.max(1, base * 0.85) },
      { season: 'Panicle Booting', projected: Math.max(1, base * 0.94) },
      { season: 'Flowering & Grain Fill', projected: base },
      { season: 'Harvest Maturity', projected: base * 1.02 }
    ];
  }, [pred]);

  // Donut Chart Data
  const donutData = useMemo(() => {
    if (!pred || !pred.breakdown_factors) return [];
    return pred.breakdown_factors.filter(f => f.percentage > 0);
  }, [pred]);

  // Custom MSP Income calculation based on user custom slider
  const customGrossIncome = useMemo(() => {
    if (!pred) return 0;
    const tons = pred.total_predicted_yield_tons || 0;
    const pricePerTon = mspRate * 10;
    return Math.round(tons * pricePerTon);
  }, [pred, mspRate]);

  const customLostIncome = useMemo(() => {
    if (!pred) return 0;
    const lossTons = pred.yield_loss_tons || 0;
    const pricePerTon = mspRate * 10;
    return Math.round(lossTons * pricePerTon);
  }, [pred, mspRate]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Precision Harvest Simulation
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white mt-1">
          Paddy Yield & Economic Predictor
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Combine variety genetics, soil fertility, seasonal microclimate, and disease severity to forecast harvest tons and calculate revenue at MSP rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ────────────────────────────────────
            LEFT COLUMN: MULTI-STEP INPUT FORM & WHAT-IF SLIDERS
        ──────────────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60 shadow-lg">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60 dark:border-forest-900/60">
              <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <span>Field Parameters & Live Sliders</span>
              </h2>
              {loading && <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />}
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Rice Variety */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Paddy Cultivar / Variety
                </label>
                <select
                  value={formData.variety}
                  onChange={(e) => handleChange('variety', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ir64">IR 64 (Potential: 6.2 t/ha)</option>
                  <option value="swarna">Swarna MTU 7029 (Potential: 6.8 t/ha)</option>
                  <option value="pusa_basmati_1121">Pusa Basmati 1121 (Potential: 4.8 t/ha)</option>
                  <option value="sona_masuri">Sona Masuri BPT 5204 (Potential: 5.5 t/ha)</option>
                  <option value="pr126">PR 126 (Potential: 7.2 t/ha)</option>
                  <option value="samba_mahsuri">Improved Samba Mahsuri (Potential: 6.0 t/ha)</option>
                </select>
              </div>

              {/* Land Area with Unit Toggle */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Land Area: <span className="text-emerald-600 font-mono">{formData.area} {formData.area_unit}</span>
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-forest-800 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => handleChange('area_unit', 'acres')}
                      className={`px-2 py-0.5 ${formData.area_unit === 'acres' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-forest-950 text-slate-600'}`}
                    >
                      Acres
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('area_unit', 'hectares')}
                      className={`px-2 py-0.5 ${formData.area_unit === 'hectares' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-forest-950 text-slate-600'}`}
                    >
                      Hectares
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="50"
                  step="0.5"
                  value={formData.area}
                  onChange={(e) => handleChange('area', parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Soil Type & Irrigation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Soil Texture
                  </label>
                  <select
                    value={formData.soil_type}
                    onChange={(e) => handleChange('soil_type', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="alluvial">Alluvial (High fertility)</option>
                    <option value="clay_loam">Clay Loam (Water holding)</option>
                    <option value="silt_loam">Silt Loam</option>
                    <option value="red_loam">Red Loam</option>
                    <option value="sandy_loam">Sandy Loam</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Irrigation Regime
                  </label>
                  <select
                    value={formData.irrigation_type}
                    onChange={(e) => handleChange('irrigation_type', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="canal">Canal Irrigation</option>
                    <option value="borewell">Tubewell / Borewell</option>
                    <option value="awd">AWD Water-Saving</option>
                    <option value="rainfed_favorable">Rainfed Lowland</option>
                    <option value="rainfed_upland">Rainfed Upland</option>
                  </select>
                </div>
              </div>

              {/* Live What-if Sliders: Weather & Nutrients */}
              <div className="pt-2 border-t border-slate-100 dark:border-forest-900/60 space-y-3">
                <span className="font-bold uppercase tracking-wider text-[10px] text-forest-700 dark:text-emerald-400 block">
                  Interactive "What-If" Sensitivity Sliders
                </span>

                {/* Rainfall */}
                <div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-600 dark:text-slate-400">Seasonal Rainfall:</span>
                    <span className="font-mono text-slate-800 dark:text-white font-bold">{formData.rainfall} mm</span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="2000"
                    step="50"
                    value={formData.rainfall}
                    onChange={(e) => handleChange('rainfall', parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* Temperature */}
                <div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-600 dark:text-slate-400">Mean Temperature:</span>
                    <span className="font-mono text-slate-800 dark:text-white font-bold">{formData.temperature}°C</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="40"
                    step="0.5"
                    value={formData.temperature}
                    onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Nitrogen NPK */}
                <div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-600 dark:text-slate-400">Nitrogen (N Dosage):</span>
                    <span className="font-mono text-slate-800 dark:text-white font-bold">{formData.nitrogen} kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="220"
                    step="5"
                    value={formData.nitrogen}
                    onChange={(e) => handleChange('nitrogen', parseFloat(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                {/* Disease Severity Factor */}
                <div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-600 dark:text-slate-400">Disease Severity Constraint:</span>
                    <span className={`font-bold uppercase ${
                      formData.disease_severity === 'High' ? 'text-rose-600' : formData.disease_severity === 'Medium' ? 'text-amber-500' : 'text-emerald-600'
                    }`}>
                      {formData.disease_severity}
                    </span>
                  </div>
                  <select
                    value={formData.disease_severity}
                    onChange={(e) => handleChange('disease_severity', e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 text-slate-900 dark:text-slate-100 font-semibold"
                  >
                    <option value="None">None (Disease-Free Healthy Stand)</option>
                    <option value="Low">Low (&lt; 10% canopy affected)</option>
                    <option value="Medium">Medium (10% - 30% lesion spread)</option>
                    <option value="High">High (&gt; 30% blighting / lodging danger)</option>
                  </select>
                </div>

              </div>

            </div>

          </div>
        </div>


        {/* ────────────────────────────────────
            RIGHT COLUMN: PREDICTED YIELD & INTERACTIVE CHARTS
        ──────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {pred ? (
            <>
              {/* Output Summary KPI Banner */}
              <div className="rounded-3xl glass-card p-6 sm:p-8 border border-emerald-200/80 dark:border-forest-800/80 shadow-xl bg-gradient-to-br from-white via-white to-forest-50/50 dark:from-forest-950/60 dark:to-[#07130a]">
                
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  AI Harvest Forecast
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                  
                  {/* Yield per Hectare */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      Yield Density
                    </p>
                    <p className="text-3xl font-black font-heading text-forest-900 dark:text-emerald-300 mt-1">
                      {pred.predicted_yield_per_ha}
                      <span className="text-sm font-semibold text-slate-500 ml-1">tons/ha</span>
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                      ≈ {pred.predicted_yield_per_acre} tons/acre
                    </p>
                  </div>

                  {/* Total Harvest Tons */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      Total Production
                    </p>
                    <p className="text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
                      {pred.total_predicted_yield_tons}
                      <span className="text-sm font-semibold text-slate-500 ml-1">tons</span>
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                      For {formData.area} {formData.area_unit}
                    </p>
                  </div>

                  {/* Disease Loss Impact */}
                  <div className={`p-4 rounded-2xl border ${
                    pred.yield_loss_percentage > 0 ? 'bg-rose-500/10 border-rose-500/20' : 'bg-emerald-500/10 border-emerald-500/20'
                  }`}>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      Disease Loss Impact
                    </p>
                    <p className={`text-3xl font-black font-heading mt-1 ${
                      pred.yield_loss_percentage > 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}>
                      -{pred.yield_loss_percentage}%
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                      {pred.yield_loss_tons > 0 ? `-${pred.yield_loss_tons} tons lost` : 'Optimal health'}
                    </p>
                  </div>

                </div>

                {/* Benchmark Comparison Pill */}
                <div className="mt-5 p-3 rounded-2xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      Regional Comparison: <strong>{pred.regional_benchmark?.difference_pct >= 0 ? `+${pred.regional_benchmark?.difference_pct}%` : `${pred.regional_benchmark?.difference_pct}%`}</strong> versus National Benchmark ({pred.regional_benchmark?.regional_avg_per_ha} t/ha)
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                    pred.regional_benchmark?.status === 'Above Average' 
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' 
                      : 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                  }`}>
                    {pred.regional_benchmark?.status}
                  </span>
                </div>

              </div>

              {/* Economic MSP Revenue Calculator Card */}
              <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <span>Estimated Farm Gross Revenue</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Calculated using Government Minimum Support Price (MSP)
                    </p>
                  </div>

                  {/* MSP Rate Tuner */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">MSP/Quintal:</span>
                    <input
                      type="number"
                      value={mspRate}
                      onChange={(e) => setMspRate(parseInt(e.target.value) || 2300)}
                      className="w-20 px-2 py-1 rounded-lg bg-slate-50 dark:bg-forest-950 border border-slate-200 dark:border-forest-800 font-mono font-bold text-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/40">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Gross Estimated Income</span>
                    <p className="text-2xl font-black font-heading text-emerald-700 dark:text-emerald-300 mt-1">
                      ₹{customGrossIncome.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Harvested quantity</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                    <span className="text-[10px] font-bold text-rose-500 uppercase">Income Lost to Disease</span>
                    <p className="text-2xl font-black font-heading text-rose-600 mt-1">
                      -₹{customLostIncome.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Recoverable via treatment</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                    <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase">Potential with Cure</span>
                    <p className="text-2xl font-black font-heading text-slate-900 dark:text-white mt-1">
                      ₹{(customGrossIncome + customLostIncome).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Target maximum</p>
                  </div>
                </div>
              </div>

              {/* Interactive Charts: Bar & Donut */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Chart 1: Bar Chart Benchmark Comparison */}
                <div className="rounded-3xl glass-card p-6 border border-slate-200/80 dark:border-forest-900/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-heading mb-1">
                      Predicted vs Regional Benchmark
                    </h4>
                    <p className="text-[11px] text-slate-500 mb-4">Yield in metric tons per hectare (t/ha)</p>
                  </div>

                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip 
                          formatter={(value) => [`${value} t/ha`, 'Yield']}
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                        />
                        <Bar dataKey="yield" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Donut Chart Loss Breakdown */}
                <div className="rounded-3xl glass-card p-6 border border-slate-200/80 dark:border-forest-900/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-heading mb-1">
                      Yield Limiting Factor Distribution
                    </h4>
                    <p className="text-[11px] text-slate-500 mb-4">Percentage contribution to yield gap</p>
                  </div>

                  <div className="h-56 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donutData}
                          dataKey="percentage"
                          nameKey="factor"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={4}
                        >
                          {donutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(val) => [`${val}%`, 'Impact']}
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

            </>
          ) : (
            <div className="rounded-3xl glass-card p-12 text-center text-slate-500">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
              <p>Simulating crop growth curve...</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
