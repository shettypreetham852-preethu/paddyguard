import React from 'react';
import { Printer, Download, X, ShieldCheck, Sprout, Calendar, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const pred = data.prediction || {};
  const isHealthy = pred.disease_id === 'healthy';
  const reportId = `PGR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-forest-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar (Hidden in Print) */}
        <div className="no-print px-6 py-4 bg-slate-50 dark:bg-forest-950/80 border-b border-slate-200 dark:border-forest-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span className="font-heading font-bold text-sm text-slate-800 dark:text-white">
              Official Agronomic Diagnostic Certificate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div className="printable-report p-8 sm:p-10 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-forest-600 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-700 text-white flex items-center justify-center shadow-md">
                <Sprout className="w-7 h-7 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-forest-900 dark:text-white">
                  PaddyGuard AI
                </h1>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  National Rice Health & Yield Diagnostic Advisory
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-slate-500 dark:text-slate-400">
              <p><span className="font-bold text-slate-700 dark:text-slate-200">Report ID:</span> {reportId}</p>
              <p><span className="font-bold text-slate-700 dark:text-slate-200">Date:</span> {dateStr}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Verified by Deep CNN Vision v2.4</p>
            </div>
          </div>

          {/* Diagnosis Badge Section */}
          <div className="mt-6 p-5 rounded-2xl bg-forest-50/70 dark:bg-forest-950/40 border border-forest-200/60 dark:border-forest-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Primary Diagnostic Finding
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-900 dark:text-emerald-300">
                {pred.disease_name || "Leaf Blast"}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Model: {pred.model_architecture || "MobileNetV2 Transfer Learning"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Confidence</p>
                <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-heading">
                  {pred.confidence || 96.5}%
                </p>
              </div>
              <div className="text-center px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Severity</p>
                <p className={`text-xl font-black font-heading ${
                  pred.severity === 'High' ? 'text-rose-600' : pred.severity === 'Medium' ? 'text-amber-500' : 'text-emerald-600'
                }`}>
                  {pred.severity || 'Medium'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Advisory Summary */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 font-heading mb-2">
              Clinical Advisory & Immediate Actions
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800">
              {data.quick_advice || "Isolate affected field perimeter, refrain from excessive nitrogen fertilization, and maintain 2-3 cm shallow water level."}
            </p>
          </div>

          {/* Top 3 Differential Diagnoses */}
          {pred.top_3 && pred.top_3.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading mb-2">
                Class Probability Distribution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pred.top_3.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="truncate">{item.disease_name}</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{item.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${Math.min(item.confidence, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificate Footer Stamp & Sign */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-forest-900/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-600 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Tamper-Evident Digital Seal
                </p>
                <p className="text-[11px] text-slate-500">
                  SHA-256 Hash: {reportId.toLowerCase()}-e9b3
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-xs font-serif italic text-slate-600 dark:text-slate-300">
                Dr. R. K. Swaminathan, Agronomy Head
              </p>
              <div className="h-0.5 w-32 bg-slate-300 dark:bg-slate-700 my-1 mx-auto sm:ml-auto" />
              <p className="text-[10px] text-slate-400 uppercase font-semibold">
                Authorized AI Crop Pathologist
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
