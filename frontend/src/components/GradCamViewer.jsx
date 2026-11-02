import React, { useState } from 'react';
import { Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw, Flame, Sparkles, Layers } from 'lucide-react';

export default function GradCamViewer({
  imageSrc,
  heatmapSrc,
  diseaseName = "Leaf Blast",
  isScanning = false
}) {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [opacity, setOpacity] = useState(0.75);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoomLevel(1);
    setOpacity(0.75);
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-forest-100 dark:border-forest-900/60 bg-white dark:bg-forest-950/40 shadow-sm">
      
      {/* Viewer Header / Toolbar */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-forest-900/60 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-forest-950/60">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold font-heading text-slate-800 dark:text-slate-200">
            Grad-CAM Explainability View
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/20">
            CNN Attention Map
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Heatmap Toggle */}
          <button
            type="button"
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showHeatmap
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {showHeatmap ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Heatmap {showHeatmap ? 'ON' : 'OFF'}</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-0.5">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Stage */}
      <div className="relative w-full h-80 sm:h-96 bg-slate-950 flex items-center justify-center overflow-hidden select-none">
        
        {/* Scanning Laser Beam */}
        {isScanning && (
          <div className="scanner-laser animate-laser-sweep" />
        )}

        {/* Zoomable Image Wrapper */}
        <div
          className="relative transition-transform duration-200 flex items-center justify-center max-w-full max-h-full"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Base Leaf Image */}
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded paddy leaf"
              className="max-h-80 sm:max-h-96 object-contain rounded-lg"
            />
          ) : (
            <div className="text-slate-500 text-xs">No image loaded</div>
          )}

          {/* Grad-CAM Heatmap Layer */}
          {showHeatmap && (
            heatmapSrc ? (
              <img
                src={heatmapSrc}
                alt="Grad-CAM activation overlay"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-screen transition-opacity duration-300 rounded-lg"
                style={{ opacity: opacity }}
              />
            ) : (
              // Synthetic Jet Heatmap Overlay if backend heatmap is processing
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300 rounded-lg"
                style={{
                  opacity: opacity,
                  background: 'radial-gradient(circle at 48% 45%, rgba(239, 68, 68, 0.8) 0%, rgba(234, 179, 8, 0.7) 35%, rgba(34, 197, 94, 0.5) 60%, transparent 80%)'
                }}
              />
            )
          )}
        </div>

        {/* Scanning Overlay Text */}
        {isScanning && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center text-white z-30">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900/90 border border-emerald-500/40 shadow-glow-green">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              <span className="text-sm font-semibold tracking-wide">
                Extracting Cellular Features & Computing Gradients...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Viewer Footer: Opacity Slider & Legend */}
      <div className="px-4 py-3 bg-slate-50/70 dark:bg-forest-950/60 border-t border-slate-100 dark:border-forest-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Opacity Slider */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">
            Heatmap Opacity:
          </span>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={opacity}
            disabled={!showHeatmap}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-40"
          />
          <span className="font-mono text-slate-700 dark:text-slate-300 w-8 text-right">
            {Math.round(opacity * 100)}%
          </span>
        </div>

        {/* Heatmap Colormap Spectrum Legend */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[10px] uppercase font-bold">Cold (0.0)</span>
          <div className="w-24 h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-green-400 via-yellow-400 to-red-600 shadow-inner" />
          <span className="text-rose-500 text-[10px] uppercase font-bold flex items-center gap-0.5">
            <Flame className="w-3 h-3" /> Hot (1.0)
          </span>
        </div>

      </div>

    </div>
  );
}
