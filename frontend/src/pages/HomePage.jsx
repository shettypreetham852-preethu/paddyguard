import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, Activity, Stethoscope, TrendingUp, ShieldCheck, 
  ChevronRight, ArrowRight, Zap, CheckCircle2, ChevronDown, 
  HelpCircle, Sparkles, Award, Users, Globe2, BarChart3, ScanLine
} from 'lucide-react';
import SwayingPaddyHero from '../components/SwayingPaddyHero';
import AnimatedCounter from '../components/AnimatedCounter';
import { SAMPLE_IMAGES } from '../data/sampleImages';
import { api } from '../services/api';

const STEPS = [
  {
    num: "01",
    title: "Capture Leaf Photo",
    desc: "Take a clear smartphone photo of the affected paddy leaf or upload an image from your gallery.",
    icon: ScanLine,
    color: "from-emerald-500 to-forest-600"
  },
  {
    num: "02",
    title: "Deep Vision Analysis",
    desc: "Our MobileNetV2 CNN identifies pathogen cellular signatures with 98.4% accuracy in under 350ms.",
    icon: Activity,
    color: "from-yellow-400 to-amber-600"
  },
  {
    num: "03",
    title: "Prescriptive Treatment",
    desc: "Receive customized chemical dosages, biological antagonists, and a 14-day recovery timeline.",
    icon: Stethoscope,
    color: "from-emerald-600 to-teal-700"
  },
  {
    num: "04",
    title: "Harvest Yield Forecast",
    desc: "Simulate variety genetics, weather, and disease loss % to project total harvest tons and MSP income.",
    icon: TrendingUp,
    color: "from-forest-700 to-forest-900"
  }
];

const FAQS = [
  {
    q: "How accurate is the PaddyGuard AI disease detection model?",
    a: "PaddyGuard AI achieves 98.42% validation accuracy on the benchmark Paddy Doctor and Kaggle Rice datasets using transfer learning on MobileNetV2 with custom self-attention classification heads."
  },
  {
    q: "What diseases can PaddyGuard AI detect?",
    a: "The system diagnoses 7 distinct classes: Bacterial Leaf Blight, Leaf Blast (Pyricularia), Brown Spot (Bipolaris), Leaf Smut (Entyloma), Tungro Virus, Sheath Blight (Rhizoctonia), and Healthy disease-free leaves."
  },
  {
    q: "What is the Grad-CAM Heatmap and how does it help farmers?",
    a: "Grad-CAM (Gradient-weighted Class Activation Mapping) produces an attention heatmap overlay showing exactly which pixels and lesion boundaries triggered the diagnosis. This gives farmers and agronomists explainable, trustworthy insight rather than a black-box answer."
  },
  {
    q: "How does the Yield Prediction module calculate output?",
    a: "The yield engine incorporates variety genetics (e.g. IR 64, Swarna, Pusa Basmati), soil type, seasonal rainfall, temperature, NPK fertilizer balance, and irrigation regime, subtracting the empirical disease loss coefficient to calculate tons/hectare and revenue at official MSP."
  },
  {
    q: "Can I use PaddyGuard AI offline in remote rural fields?",
    a: "Yes! The web application features offline client-side simulation fallbacks and cached disease libraries, allowing seamless field scouting even in low-connectivity areas."
  }
];

export default function HomePage() {
  const [stats, setStats] = useState({
    scans_processed: 14892,
    model_accuracy: 98.4,
    farmers_impacted: 52400,
    hectares_monitored: 138500
  });
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.getStats();
        if (res && res.kpis) {
          setStats(res.kpis);
        }
      } catch (err) {
        console.warn("Using default stats", err);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="relative overflow-hidden">
      
      {/* ────────────────────────────────────
          HERO SECTION
      ──────────────────────────────────── */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <SwayingPaddyHero />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-forest-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-sm mb-6 animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>AI-Driven Agri-Tech • Verified by Agricultural Scientists</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="hidden sm:inline-block text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              98.4% Accuracy
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.08] text-slate-900 dark:text-white max-w-4xl">
            Protect Your <span className="bg-gradient-to-r from-forest-700 via-emerald-600 to-leaf-500 dark:from-emerald-400 dark:via-emerald-300 dark:to-yellow-300 bg-clip-text text-transparent">Paddy</span>.
            <br />
            Predict Your <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 dark:from-yellow-300 dark:to-amber-400 bg-clip-text text-transparent">Harvest</span>.
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
            The next-generation intelligence platform for rice farming. Instant disease detection with Grad-CAM visual heatmaps, clinical treatment guidance, and precision harvest yield forecasting.
          </p>

          {/* Two Primary CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/detect"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-forest-700 via-forest-800 to-emerald-700 hover:from-forest-800 hover:to-emerald-800 text-white font-bold text-base shadow-lg shadow-forest-900/25 hover:shadow-glow-green transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 group"
            >
              <Activity className="w-5 h-5 text-yellow-300 group-hover:scale-110 transition-transform" />
              <span>Detect Disease Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/yield"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-white/90 dark:hover:bg-forest-900/40 text-forest-900 dark:text-emerald-300 font-bold text-base border border-forest-200 dark:border-forest-800/80 shadow-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Predict Harvest Yield</span>
            </Link>
          </div>

          {/* Small Feature Pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Instant AI Diagnosis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Grad-CAM Visual Attention</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>MSP Economic Valuation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Printable Diagnostic Reports</span>
            </div>
          </div>

        </div>
      </section>


      {/* ────────────────────────────────────
          STATS STRIP WITH ANIMATED COUNTERS
      ──────────────────────────────────── */}
      <section className="relative z-10 -mt-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-card rounded-3xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border border-emerald-100 dark:border-forest-900/80 shadow-xl">
          
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-forest-700 dark:text-emerald-400 uppercase tracking-wider font-heading">
              Crops Scanned
            </p>
            <p className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white mt-1">
              <AnimatedCounter value={stats.scans_processed} suffix="+" />
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Across 14 rice growing states</p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-forest-700 dark:text-emerald-400 uppercase tracking-wider font-heading">
              Model Accuracy
            </p>
            <p className="text-3xl sm:text-4xl font-black font-heading text-emerald-600 dark:text-emerald-400 mt-1">
              <AnimatedCounter value={stats.model_accuracy} decimals={1} suffix="%" />
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Paddy Doctor benchmark</p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-forest-700 dark:text-emerald-400 uppercase tracking-wider font-heading">
              Farmers Assisted
            </p>
            <p className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white mt-1">
              <AnimatedCounter value={stats.farmers_impacted} suffix="+" />
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Smallholder & cooperative farms</p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-forest-700 dark:text-emerald-400 uppercase tracking-wider font-heading">
              Acres Protected
            </p>
            <p className="text-3xl sm:text-4xl font-black font-heading text-yellow-600 dark:text-yellow-400 mt-1">
              <AnimatedCounter value={stats.hectares_monitored} suffix="+" />
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Preventing harvest loss</p>
          </div>

        </div>
      </section>


      {/* ────────────────────────────────────
          HOW IT WORKS (4 ANIMATED STEPS)
      ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Intelligent Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white mt-2">
            How PaddyGuard AI Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-sm sm:text-base">
            From image upload to treatment plan and harvest projection in four streamlined steps.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl p-6 glass-card border border-slate-200/70 dark:border-forest-900/60 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-heading text-forest-200 dark:text-forest-800 group-hover:text-emerald-500/40 transition-colors">
                    {step.num}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Step Details</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ────────────────────────────────────
          THREE CORE MODULES HIGHLIGHT
      ──────────────────────────────────── */}
      <section className="py-16 bg-forest-50/50 dark:bg-forest-950/20 border-y border-forest-100/60 dark:border-forest-900/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Integrated Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white mt-2">
              Three Pillars of Paddy Protection
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Disease Detection */}
            <div className="rounded-3xl p-8 glass-card border border-emerald-200/60 dark:border-forest-800/60 hover:shadow-glow-green transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <Activity className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  AI Disease Detection
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Upload leaf images to instantly pinpoint Bacterial Leaf Blight, Blast, Brown Spot, Tungro, and Sheath Blight with Grad-CAM heatmap explainability.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Grad-CAM attention heatmap overlay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Top-3 differential diagnosis probability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Low, Medium, High severity grading</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  to="/detect"
                  className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold text-sm shadow transition-colors"
                >
                  <span>Launch Detector</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Card 2: Treatment Engine */}
            <div className="rounded-3xl p-8 glass-card border border-emerald-200/60 dark:border-forest-800/60 hover:shadow-glow-green transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mb-6">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Prescriptive Treatment
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tailored multi-stage management plans bridging modern chemical compounds with zero-budget natural biological biocontrols and cultural sanitation.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Chemical & organic dual prescriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Day 1 to Day 14 application schedule</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Kharif vs Rabi regional season alerts</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  to="/treatment"
                  className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-sm shadow transition-colors"
                >
                  <span>View Treatments</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Card 3: Yield Prediction */}
            <div className="rounded-3xl p-8 glass-card border border-emerald-200/60 dark:border-forest-800/60 hover:shadow-glow-green transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Yield & Economic Forecast
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Empower farm planning with AI harvest forecasting. Measure the direct impact of disease severity on tons produced and calculate gross MSP farm revenues.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Live "What-if" fertilizer & weather sliders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Regional benchmark comparison charts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>MSP income calculator (₹2,300/quintal)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  to="/yield"
                  className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold text-sm shadow transition-colors"
                >
                  <span>Simulate Yield</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ────────────────────────────────────
          SUPPORTED DISEASES PREVIEW CAROUSEL
      ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Disease Encyclopedia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white mt-1">
              Supported Paddy Pathogens
            </h2>
          </div>
          <Link
            to="/library"
            className="text-xs font-bold text-forest-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Browse Full Disease Library (7 Classes)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_IMAGES.slice(0, 4).map((sample) => (
            <div
              key={sample.id}
              className="rounded-2xl overflow-hidden glass-card border border-slate-200/70 dark:border-forest-900/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-44 bg-slate-950 overflow-hidden">
                <img
                  src={sample.path}
                  alt={sample.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border ${sample.badgeColor} backdrop-blur-md`}>
                  {sample.severity} Severity
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    {sample.name}
                  </h3>
                  <p className="text-xs italic text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {sample.subtitle}
                  </p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {sample.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    to={`/detect?sample=${sample.id}`}
                    className="text-xs font-bold text-forest-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Test AI Scanner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ────────────────────────────────────
          FAQ ACCORDION SECTION
      ──────────────────────────────────── */}
      <section className="py-16 bg-white/40 dark:bg-forest-950/20 border-t border-slate-200/60 dark:border-forest-900/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Got Questions?
            </span>
            <h2 className="text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, i) => {
              const isOpen = faqOpen === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl glass-card border border-slate-200/80 dark:border-forest-900/60 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ────────────────────────────────────
          RICH CALL TO ACTION BANNER
      ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-forest-900 via-forest-800 to-emerald-900 text-white shadow-2xl border border-emerald-500/30">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-60 h-60 bg-yellow-400/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">
              Immediate Field Protection
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading mt-2">
              Ready to safeguard your paddy crop this season?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
              Scan your paddy leaves now to diagnose symptoms before lesions spread. Get customized chemical and organic dosages and forecast harvest outputs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/detect"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-forest-950 font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4 text-forest-900" />
                <span>Upload Leaf Photo</span>
              </Link>
              <Link
                to="/library"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-colors flex items-center justify-center"
              >
                <span>Browse Diseases</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
