import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Stethoscope, ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, 
  Clock, Calendar, Droplets, Leaf, FlaskConical, ShieldCheck, 
  ArrowRight, Thermometer, Wind, RefreshCw 
} from 'lucide-react';
import { api } from '../services/api';
import { useDetection } from '../context/DetectionContext';

const DISEASE_OPTIONS = [
  { id: 'bacterial_leaf_blight', name: 'Bacterial Leaf Blight' },
  { id: 'leaf_blast', name: 'Leaf Blast' },
  { id: 'brown_spot', name: 'Brown Spot' },
  { id: 'sheath_blight', name: 'Sheath Blight' },
  { id: 'tungro', name: 'Tungro Disease' },
  { id: 'leaf_smut', name: 'Leaf Smut' },
  { id: 'healthy', name: 'Healthy Paddy Leaf' }
];

export default function TreatmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentDetection } = useDetection();

  const initialDisease = searchParams.get('disease') || currentDetection?.prediction?.disease_id || 'leaf_blast';
  const initialSeverity = searchParams.get('severity') || currentDetection?.prediction?.severity || 'Medium';

  const [selectedDisease, setSelectedDisease] = useState(initialDisease);
  const [severityLevel, setSeverityLevel] = useState(initialSeverity === 'None' ? 'Medium' : initialSeverity);
  const [activeTab, setActiveTab] = useState('chemical');
  const [treatmentData, setTreatmentData] = useState(null);
  const [botanicalData, setBotanicalData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync with URL params
  useEffect(() => {
    const d = searchParams.get('disease');
    if (d && d !== selectedDisease) {
      setSelectedDisease(d);
    }
  }, [searchParams]);

  // Fetch Treatment Protocol
  useEffect(() => {
    async function loadTreatment() {
      setLoading(true);
      try {
        const res = await api.getTreatment(selectedDisease);
        if (res && res.treatment) {
          setTreatmentData(res.treatment);
          setBotanicalData(res.botanical_details);
        }
      } catch (err) {
        console.error("Failed to load treatment:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTreatment();
  }, [selectedDisease]);

  const handleDiseaseChange = (newDisease) => {
    setSelectedDisease(newDisease);
    setSearchParams({ disease: newDisease, severity: severityLevel });
  };

  const handleSeverityChange = (level) => {
    setSeverityLevel(level);
    setSearchParams({ disease: selectedDisease, severity: level });
  };

  const tr = treatmentData || {};
  const isHealthy = selectedDisease === 'healthy';

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Clinical Agronomy Engine
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white mt-1">
          Prescriptive Crop Treatment & Recovery
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Scientifically calibrated chemical dosages, zero-budget biological biocontrols, and 14-day field rehabilitation schedules for paddy crops.
        </p>
      </div>

      {/* Disease Selector & Severity Toggle Bar */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-slate-200/80 dark:border-forest-900/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Selector */}
        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Target Disease Diagnosis:
          </label>
          <select
            value={selectedDisease}
            onChange={(e) => handleDiseaseChange(e.target.value)}
            className="w-full text-base font-bold font-heading px-4 py-3 rounded-2xl bg-slate-50 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 text-forest-900 dark:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {DISEASE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {/* Severity Toggle */}
        {!isHealthy && (
          <div className="w-full md:w-auto">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Field Infestation Severity:
            </label>
            <div className="inline-flex rounded-2xl p-1 bg-slate-100 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800">
              {['Low', 'Medium', 'High'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleSeverityChange(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    severityLevel === lvl
                      ? lvl === 'High'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : lvl === 'Medium'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lvl} Severity
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Severity Clinical Alert Banner */}
      {!isHealthy && tr.severity_rules && (
        <div className={`p-5 rounded-3xl mb-8 border flex items-start gap-4 shadow-sm ${
          severityLevel === 'High' 
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200' 
            : severityLevel === 'Medium'
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
        }`}>
          <div className="p-2 rounded-xl bg-white/60 dark:bg-black/20 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-heading uppercase tracking-wider">
              {severityLevel} Severity Action Protocol:
            </h3>
            <p className="text-xs sm:text-sm mt-1 leading-relaxed">
              {tr.severity_rules[severityLevel] || tr.summary}
            </p>
          </div>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-forest-900/60 overflow-x-auto gap-2 mb-8">
        {[
          { id: 'chemical', label: 'Chemical Treatment', icon: FlaskConical },
          { id: 'organic', label: 'Biological / Organic', icon: Leaf },
          { id: 'timeline', label: '14-Day Timeline Schedule', icon: Calendar },
          { id: 'symptoms', label: 'Symptoms & Pathology', icon: ShieldCheck },
          { id: 'prevention', label: 'Cultural Prevention', icon: Droplets },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-t-2xl font-heading text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-emerald-600 text-forest-900 dark:text-emerald-300 bg-white/70 dark:bg-forest-950/60'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {loading ? (
        <div className="py-20 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
          <p className="text-xs text-slate-500">Loading agronomic protocol...</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* TAB 1: CHEMICAL TREATMENT */}
          {activeTab === 'chemical' && (
            <div className="space-y-6">
              {tr.chemical_treatment && tr.chemical_treatment.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tr.chemical_treatment.map((chem, idx) => (
                    <div
                      key={idx}
                      className="rounded-3xl glass-card p-6 border border-slate-200/80 dark:border-forest-900/60 hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                            Active Molecule #{idx + 1}
                          </span>
                          <FlaskConical className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                          {chem.agent}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                          Trade Name: {chem.brand}
                        </p>

                        <div className="mt-4 space-y-2 text-xs">
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/40">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Recommended Dosage</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{chem.dosage}</span>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/40">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Application Method</span>
                            <span className="text-slate-700 dark:text-slate-300 mt-0.5 block">{chem.method}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>Safety: {chem.safety}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card rounded-3xl p-10 text-center text-slate-500">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-base font-bold text-slate-800 dark:text-slate-200">No chemical pesticides required.</p>
                  <p className="text-xs mt-1">This plant is classified as healthy. Continue standard prophylactic nutrition.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORGANIC & BIOLOGICAL */}
          {activeTab === 'organic' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tr.organic_treatment && tr.organic_treatment.length > 0 ? (
                tr.organic_treatment.map((org, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl glass-card p-6 border border-emerald-100 dark:border-forest-900/60 hover:shadow-lg transition-all"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                      {org.method}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                      Dosage: {org.dosage}
                    </p>

                    <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/40 text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Preparation Protocol</span>
                      <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                        {org.preparation}
                      </p>
                    </div>

                    <div className="mt-4 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Frequency: {org.frequency}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 glass-card rounded-3xl p-10 text-center text-slate-500">
                  <p>Standard preventive bio-stimulants apply.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: 14-DAY TIMELINE SCHEDULE */}
          {activeTab === 'timeline' && (
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-forest-900/60">
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>14-Day Eradication & Recovery Regimen</span>
              </h3>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/40 space-y-8">
                {tr.timeline && tr.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full bg-forest-700 text-white flex items-center justify-center text-[10px] font-bold shadow-md border-2 border-white dark:border-slate-900 group-hover:scale-125 transition-transform">
                      {idx + 1}
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-forest-950/60 border border-slate-200/60 dark:border-forest-900/60">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold font-heading px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          {step.day}
                        </span>
                        <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SYMPTOMS & PATHOLOGY */}
          {activeTab === 'symptoms' && botanicalData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60">
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Clinical Botanical Symptoms</span>
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {botanicalData.symptoms?.map((sym, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60">
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Pathogen & Favorable Vectors</span>
                </h3>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Causal Organism</span>
                    <span className="font-serif italic font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {botanicalData.scientific_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Epidemiological Climate</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {botanicalData.favorable_conditions}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Resistant Cultivars</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {botanicalData.resistant_varieties?.map((vr, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                          {vr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CULTURAL PREVENTION */}
          {activeTab === 'prevention' && (
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60">
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-emerald-600" />
                <span>Agronomic & Cultural Sanitation Guidelines</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tr.preventive_measures?.map((prev, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/40 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{prev}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seasonal Kharif & Rabi Advisory Box */}
          {tr.seasonal_tips && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm mb-2">
                  <Wind className="w-4 h-4" />
                  <span>Kharif Season (Monsoon) Specifics:</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {tr.seasonal_tips.kharif}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-sm mb-2">
                  <Thermometer className="w-4 h-4" />
                  <span>Rabi Season (Winter / Spring) Specifics:</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {tr.seasonal_tips.rabi}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Next Step Link to Yield Prediction */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-forest-900 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-500/30">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                Step 3 of 3 • Harvest Economics
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading mt-1">
                Forecast how {treatmentData?.disease_name || "this disease"} will impact your harvest yield
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Simulate land acreage, weather, and fertilizer to estimate gross revenue and averted loss.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/yield?disease=${selectedDisease}&severity=${severityLevel}`)}
              className="px-6 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-forest-950 font-bold text-xs sm:text-sm shadow-md transition-colors shrink-0 flex items-center gap-2"
            >
              <span>Predict Harvest Yield</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
