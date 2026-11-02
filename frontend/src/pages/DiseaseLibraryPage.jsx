import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, BookOpen, AlertTriangle, ArrowRight, 
  X, CheckCircle2, ShieldAlert, Sparkles, Layers, Bug 
} from 'lucide-react';
import { DISEASES_DATA } from '../data/diseaseDatabase';

export default function DiseaseLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPathogen, setSelectedPathogen] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [activeModalDisease, setActiveModalDisease] = useState(null);

  // Filtered diseases
  const filteredDiseases = useMemo(() => {
    return DISEASES_DATA.filter((d) => {
      const matchesSearch = 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.short_desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPathogen = 
        selectedPathogen === 'All' || d.pathogen_type.toLowerCase().includes(selectedPathogen.toLowerCase());

      const matchesSeverity = 
        selectedSeverity === 'All' || d.severity_potential === selectedSeverity;

      return matchesSearch && matchesPathogen && matchesSeverity;
    });
  }, [searchQuery, selectedPathogen, selectedSeverity]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Pathology Encyclopedia
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white mt-1">
          Paddy Disease Library & Atlas
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Comprehensive diagnostic handbook of paddy leaf and sheath diseases, causal pathogens, favorable humidity thresholds, and resistant crop cultivars.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card rounded-3xl p-6 mb-8 border border-slate-200/80 dark:border-forest-900/60 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by disease name, pathogen, symptom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Pathogen Filter */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-slate-500 mr-1">Pathogen:</span>
            {['All', 'Fungal', 'Bacterial', 'Viral'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedPathogen(p)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedPathogen === p
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-forest-950/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-slate-500 mr-1">Severity:</span>
            {['All', 'High', 'Medium', 'Low'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSeverity(s)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedSeverity === s
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-forest-950/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Disease Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((d) => (
          <div
            key={d.id}
            className="rounded-3xl glass-card overflow-hidden border border-slate-200/80 dark:border-forest-900/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-lg"
          >
            <div>
              {/* Image Preview */}
              <div className="relative h-48 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => setActiveModalDisease(d)}>
                <img
                  src={d.image_url}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
                  d.severity_potential === 'High' 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
                    : d.severity_potential === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : d.severity_potential === 'Low'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {d.severity_potential} Potential
                </span>

                <span className="absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm">
                  {d.pathogen_type}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                  {d.name}
                </h3>
                <p className="text-xs font-serif italic text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {d.scientific_name}
                </p>
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {d.short_desc}
                </p>

                {/* Symptoms Preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Primary Symptoms:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                    {d.symptoms.slice(0, 2).map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 truncate">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="truncate">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveModalDisease(d)}
                className="text-xs font-bold text-forest-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Full Pathology Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link
                to={`/detect?sample=${d.id}`}
                className="px-3 py-1.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-[11px] font-bold shadow-sm transition-colors"
              >
                Diagnose Sample
              </Link>
            </div>

          </div>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="py-16 text-center text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-base font-bold">No diseases matching your filter criteria.</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedPathogen('All'); setSelectedSeverity('All'); }}
            className="mt-3 text-xs font-bold text-emerald-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Detailed Pathology Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-forest-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="relative h-48 bg-slate-950 overflow-hidden">
              <img
                src={activeModalDisease.image_url}
                alt={activeModalDisease.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveModalDisease(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white shadow">
                  {activeModalDisease.pathogen_type} Pathogen
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
                  {activeModalDisease.severity_potential} Severity Potential
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <h2 className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                  {activeModalDisease.name}
                </h2>
                <p className="text-sm font-serif italic text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {activeModalDisease.scientific_name}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeModalDisease.short_desc}
                </p>
              </div>

              {/* Symptoms List */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/60">
                <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                  Diagnostic Symptoms:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {activeModalDisease.symptoms.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Epidemiological Conditions */}
              <div className="text-xs space-y-2">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Favorable Microclimate: </span>
                  <span className="text-slate-600 dark:text-slate-400">{activeModalDisease.favorable_conditions}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Transmission Vectors: </span>
                  <span className="text-slate-600 dark:text-slate-400">{activeModalDisease.spread_factors}</span>
                </div>
              </div>

              {/* Resistant Varieties */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Resistant Cultivars:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalDisease.resistant_varieties.map((v, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 dark:bg-forest-950/80 border-t border-slate-200 dark:border-forest-900/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveModalDisease(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/treatment?disease=${activeModalDisease.id}`}
                  className="px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <span>Prescribed Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
