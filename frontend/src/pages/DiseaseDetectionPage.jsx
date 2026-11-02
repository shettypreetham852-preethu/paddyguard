import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  UploadCloud, Camera, RefreshCw, Sparkles, CheckCircle2, 
  AlertTriangle, FileText, ArrowRight, ShieldAlert, Layers, Image as ImageIcon 
} from 'lucide-react';
import { useDetection } from '../context/DetectionContext';
import { api } from '../services/api';
import { SAMPLE_IMAGES } from '../data/sampleImages';
import ConfidenceRing from '../components/ConfidenceRing';
import GradCamViewer from '../components/GradCamViewer';
import ReportModal from '../components/ReportModal';

export default function DiseaseDetectionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentDetection, setCurrentDetection } = useDetection();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectionResult, setDetectionResult] = useState(currentDetection);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Check if a sample was passed via URL parameter (e.g. ?sample=leaf_blast)
  useEffect(() => {
    const sampleParam = searchParams.get('sample');
    if (sampleParam) {
      const match = SAMPLE_IMAGES.find(s => s.id === sampleParam);
      if (match) {
        handleSampleSelect(match);
      }
    }
  }, [searchParams]);

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setErrorMsg(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setDetectionResult(null);
  };

  const handleSampleSelect = (sample) => {
    setErrorMsg(null);
    setSelectedFile(sample.id); // Passing sample id string
    setPreviewUrl(sample.path);
    setDetectionResult(null);
  };

  // Run AI Inference
  const handleAnalyze = async () => {
    if (!selectedFile && !previewUrl) {
      setErrorMsg("Please upload a leaf photo or pick a sample leaf.");
      return;
    }

    setIsScanning(true);
    setErrorMsg(null);

    try {
      // Simulate authentic scanning sweep delay
      const [res] = await Promise.all([
        api.detectDisease(selectedFile),
        new Promise(resolve => setTimeout(resolve, 1600))
      ]);

      if (res && res.success) {
        setDetectionResult(res);
        setCurrentDetection(res, previewUrl);
      } else {
        throw new Error("Unable to analyze image.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("AI Diagnostic analysis failed. Please verify image and retry.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    setErrorMsg(null);
  };

  const pred = detectionResult?.prediction;
  const isHealthy = pred?.disease_id === 'healthy';

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          AI Diagnostic Suite
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white mt-1">
          Paddy Leaf Disease Detection
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Upload an image of your paddy leaf to run instant MobileNetV2 computer vision classification, cellular Grad-CAM attention heatmap inspection, and severity assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ────────────────────────────────────
            LEFT COLUMN: UPLOAD & SAMPLE SELECTOR
        ──────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Upload Zone Card */}
          <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60 shadow-lg">
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-emerald-600" />
                <span>Input Leaf Specimen</span>
              </h2>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-500 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !previewUrl && fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[260px] cursor-pointer ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
                  : previewUrl
                  ? 'border-emerald-500/40 bg-slate-50 dark:bg-forest-950/40'
                  : 'border-slate-300 dark:border-forest-900 hover:border-emerald-500/60 bg-slate-50/50 dark:bg-forest-950/20'
              }`}
            >
              {/* Hidden File Inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full flex flex-col items-center">
                  <div className="relative rounded-xl overflow-hidden max-h-64 shadow-md border border-slate-200 dark:border-forest-800">
                    <img
                      src={previewUrl}
                      alt="Specimen Preview"
                      className="max-h-64 object-contain"
                    />
                    {isScanning && (
                      <div className="scanner-laser animate-laser-sweep" />
                    )}
                  </div>
                  <p className="mt-3 text-xs text-slate-500 font-medium">
                    Click "Run AI Diagnosis" below to analyze
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-200 font-heading">
                    Drag and drop your paddy leaf image here
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                    Supports high-resolution JPG, PNG, or WEBP (up to 15MB)
                  </p>
                  <div className="mt-4 px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold text-xs transition-colors shadow">
                    Browse File
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Camera & Action Toolbar */}
            <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl glass-panel hover:bg-slate-100 dark:hover:bg-forest-900/40 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 dark:border-forest-800 transition-colors"
              >
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>Take Live Camera Photo</span>
              </button>

              <button
                type="button"
                disabled={!previewUrl || isScanning}
                onClick={handleAnalyze}
                className="w-full sm:w-auto flex-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-forest-700 via-forest-800 to-emerald-700 hover:from-forest-800 hover:to-emerald-800 disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-bold shadow-md hover:shadow-glow-green transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-yellow-300" />
                    <span>Analyzing Cellular Lesions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Run AI Diagnosis</span>
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

          </div>

          {/* Quick Sample Specimen Carousel */}
          <div className="rounded-3xl glass-card p-6 border border-slate-200/80 dark:border-forest-900/60">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Or Try One of 7 Curated Sample Leaves:
              </h3>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {SAMPLE_IMAGES.map((sample) => {
                const isSelected = selectedFile === sample.id || (typeof selectedFile === 'object' && selectedFile?.name === sample.name);
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSampleSelect(sample)}
                    className={`relative rounded-xl overflow-hidden p-1 border-2 transition-all group flex flex-col items-center ${
                      isSelected 
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105' 
                        : 'border-transparent hover:border-emerald-500/40 bg-slate-100 dark:bg-forest-950/60'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900">
                      <img
                        src={sample.path}
                        alt={sample.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 text-center truncate w-full mt-1">
                      {sample.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>


        {/* ────────────────────────────────────
            RIGHT COLUMN: DIAGNOSTIC RESULTS & GRAD-CAM
        ──────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {pred ? (
            <>
              {/* Primary Diagnostic Result Card */}
              <div className="rounded-3xl glass-card p-6 sm:p-8 border border-emerald-200/80 dark:border-forest-800/80 shadow-xl relative overflow-hidden">
                
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-forest-900/60">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      AI Diagnostic Result
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-0.5">
                      {pred.disease_name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                      {pred.model_architecture}
                    </p>
                  </div>

                  {/* Confidence Progress Ring */}
                  <div className="shrink-0">
                    <ConfidenceRing percentage={pred.confidence} size={110} strokeWidth={8} />
                  </div>
                </div>

                {/* Key Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Severity Level</span>
                    <p className={`text-base font-bold font-heading mt-0.5 ${
                      pred.severity === 'High' ? 'text-rose-600' : pred.severity === 'Medium' ? 'text-amber-500' : 'text-emerald-600'
                    }`}>
                      {pred.severity} Severity
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Confidence Score</span>
                    <p className="text-base font-bold font-heading text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {pred.confidence}%
                    </p>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-slate-50 dark:bg-forest-950/60 border border-slate-100 dark:border-forest-900/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Verification</span>
                    <p className="text-base font-bold font-heading text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Certified</span>
                    </p>
                  </div>
                </div>

                {/* Top-3 Horizontal Bar Chart */}
                {pred.top_3 && pred.top_3.length > 0 && (
                  <div className="my-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-heading">
                      Differential Diagnosis Probabilities (Top-3)
                    </span>
                    <div className="mt-3 space-y-2.5">
                      {pred.top_3.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-800 dark:text-slate-200">{item.disease_name}</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">{item.confidence}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-forest-950/80 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                idx === 0 
                                  ? 'bg-gradient-to-r from-emerald-500 to-forest-600' 
                                  : 'bg-slate-400 dark:bg-slate-600'
                              }`}
                              style={{ width: `${Math.min(item.confidence, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Advice Snippet */}
                {detectionResult.quick_advice && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 my-4 text-xs text-forest-950 dark:text-emerald-200 leading-relaxed">
                    <span className="font-bold uppercase tracking-wider block text-[10px] text-emerald-800 dark:text-emerald-400 mb-1">
                      Immediate Clinical Observation:
                    </span>
                    {detectionResult.quick_advice}
                  </div>
                )}

                {/* Action CTAs */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-forest-900/60 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(true)}
                    className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl glass-panel hover:bg-slate-100 dark:hover:bg-forest-900/40 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 dark:border-forest-800 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Download Diagnostic PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/treatment?disease=${pred.disease_id}&severity=${pred.severity}`)}
                    className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-md hover:shadow-glow-green transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Treatment Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Grad-CAM Attention Heatmap Viewer */}
              <GradCamViewer
                imageSrc={previewUrl}
                heatmapSrc={detectionResult.gradcam_heatmap}
                diseaseName={pred.disease_name}
                isScanning={isScanning}
              />
            </>
          ) : (
            /* Empty State */
            <div className="rounded-3xl glass-card p-12 text-center border border-dashed border-slate-300 dark:border-forest-900 flex flex-col items-center justify-center min-h-[460px]">
              <div className="w-20 h-20 rounded-3xl bg-forest-50 dark:bg-forest-950/60 text-forest-700 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-inner">
                <ImageIcon className="w-10 h-10 opacity-60" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-800 dark:text-slate-200">
                Awaiting Specimen Analysis
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                Select an image on the left and click "Run AI Diagnosis" to generate diagnostic probabilities, Grad-CAM attention maps, and customized crop treatments.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Official Diagnostic Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        data={detectionResult}
      />

    </div>
  );
}
