import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, PhoneCall, ShieldCheck, Cpu, ArrowUpRight, Heart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-forest-100/80 dark:border-forest-900/40 bg-white/50 dark:bg-[#07130a]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-forest-700 text-white shadow-glow-green">
                <Sprout className="w-5 h-5 text-yellow-300" />
              </div>
              <span className="text-xl font-extrabold tracking-tight font-heading text-forest-900 dark:text-emerald-400">
                PaddyGuard <span className="text-paddy-500 font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-paddy-400/10 border border-paddy-400/30">AI</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Empowering farmers, agronomists, and researchers with state-of-the-art Computer Vision disease diagnosis, Grad-CAM attention visualizer, and climate-resilient paddy yield forecasting.
            </p>

            {/* Helpline Banner */}
            <div className="mt-5 p-3.5 rounded-xl bg-forest-50/80 dark:bg-forest-950/60 border border-forest-200/60 dark:border-forest-800/40 flex items-center gap-3 max-w-sm">
              <div className="w-9 h-9 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-forest-800 dark:text-emerald-300 uppercase tracking-wider">
                  Kisan Agro Advisory Toll-Free
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-white font-mono">
                  1800-180-1551 <span className="text-xs font-normal text-slate-500">(24x7)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 font-heading">
              Core Modules
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/detect" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Disease Detection</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/treatment" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  Treatment Guidance
                </Link>
              </li>
              <li>
                <Link to="/yield" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  Yield Prediction
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  Paddy Disease Library
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Agricultural Classes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 font-heading">
              Supported Classes
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Bacterial Leaf Blight</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Leaf Blast (Pyricularia)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Brown Spot (Bipolaris)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Tungro Virus (GLH Vector)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Sheath Blight (Rhizoctonia)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Leaf Smut & Healthy Crops</span>
              </li>
            </ul>
          </div>

          {/* Col 5: System Status & Alerts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-emerald-400 font-heading">
              Advisory Alerts
            </h4>
            <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Subscribe to weather-triggered outbreak forecasts and Kharif/Rabi spray advisories.
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter farmer email..."
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 dark:text-slate-200"
                />
              </div>
              <button
                type="button"
                onClick={() => alert("Subscribed for agro-weather advisories!")}
                className="px-3 py-2 rounded-lg bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold shrink-0 transition-colors"
              >
                Join
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-forest-900 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                AI Inference Engine v2.4 Active
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/70 dark:border-forest-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} PaddyGuard AI. Built for Smart Agriculture & Sustainable Food Security.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Methodology & Arch
            </Link>
            <span>•</span>
            <span className="text-forest-700 dark:text-emerald-400 font-medium">
              MobileNetV2 Transfer Learning • 98.4% Acc
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
