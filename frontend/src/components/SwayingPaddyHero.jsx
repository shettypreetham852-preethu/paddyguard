import React from 'react';

export default function SwayingPaddyHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Radiant Gradient Mesh */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-yellow-400/10 to-transparent rounded-full blur-3xl opacity-70 dark:opacity-40" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-2xl" />
      <div className="absolute top-40 -right-20 w-80 h-80 bg-paddy-300/20 rounded-full blur-2xl" />

      {/* Floating Golden Pollen / Leaf Particles */}
      <div className="absolute inset-0">
        {[...Array(14)].map((_, i) => {
          const left = 5 + (i * 7) + (i % 3) * 2;
          const delay = (i * 0.7) % 5;
          const duration = 7 + (i % 5) * 1.5;
          const size = 4 + (i % 4) * 2;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-tr from-yellow-400 to-emerald-300 opacity-60 dark:opacity-40 animate-float-slow"
              style={{
                left: `${left}%`,
                top: `${20 + (i * 5) % 65}%`,
                width: `${size}px`,
                height: `${size * 1.4}px`,
                transform: `rotate(${i * 25}deg)`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                filter: 'blur(0.5px)'
              }}
            />
          );
        })}
      </div>

      {/* Layer 1: Distant Misty Hill & Paddy Horizon */}
      <svg
        className="absolute bottom-0 w-full h-40 sm:h-52 opacity-25 dark:opacity-15 text-forest-300 dark:text-forest-900"
        viewBox="0 0 1440 280"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,160 C320,100 480,210 720,140 C960,70 1180,180 1440,110 L1440,280 L0,280 Z" />
      </svg>

      {/* Layer 2: Midground Swaying Paddy Stalks (Slow Wind) */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-64 flex items-end justify-around opacity-45 dark:opacity-30">
        {[...Array(24)].map((_, i) => {
          const height = 90 + (i % 5) * 18;
          const delay = (i * 0.28) % 3;
          return (
            <div
              key={`mid-${i}`}
              className="origin-bottom animate-sway-slow flex flex-col items-center"
              style={{
                height: `${height}px`,
                animationDelay: `${delay}s`,
              }}
            >
              {/* Rice Panicle Head */}
              <div className="w-2 h-7 bg-yellow-500/70 dark:bg-yellow-400/50 rounded-full transform -rotate-12" />
              {/* Stem */}
              <div className="w-1 flex-1 bg-gradient-to-t from-emerald-700 via-emerald-600 to-emerald-500/80 rounded-full" />
            </div>
          );
        })}
      </div>

      {/* Layer 3: Foreground Swaying Paddy Field (Active Wind Wave) */}
      <div className="absolute -bottom-2 left-0 right-0 h-36 sm:h-52 flex items-end justify-between px-2 opacity-70 dark:opacity-40">
        {[...Array(32)].map((_, i) => {
          const height = 110 + (i % 7) * 14;
          const delay = (i * 0.18) % 2.5;
          const isGold = i % 3 === 0;
          return (
            <div
              key={`fg-${i}`}
              className="origin-bottom animate-sway flex flex-col items-center"
              style={{
                height: `${height}px`,
                animationDelay: `${delay}s`,
              }}
            >
              {/* Golden Rice Panicle */}
              <div 
                className={`w-2.5 h-10 rounded-full transform ${i % 2 === 0 ? 'rotate-12' : '-rotate-12'} shadow-sm ${
                  isGold 
                    ? 'bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600' 
                    : 'bg-gradient-to-b from-emerald-300 via-emerald-500 to-forest-700'
                }`}
              />
              {/* Paddy Leaf Blades branching out */}
              <div className="relative w-full">
                <div className="absolute -left-3 top-2 w-4 h-1 bg-emerald-600 rounded-full transform -rotate-45" />
                <div className="absolute -right-3 top-4 w-4 h-1 bg-emerald-600 rounded-full transform rotate-45" />
              </div>
              {/* Stem */}
              <div className="w-1.5 flex-1 bg-gradient-to-t from-forest-900 via-emerald-700 to-emerald-500 rounded-full" />
            </div>
          );
        })}
      </div>

      {/* Bottom Ground Blend */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#fcfdfa] dark:from-[#0a150e] to-transparent" />
    </div>
  );
}
