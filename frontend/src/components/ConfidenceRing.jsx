import React, { useEffect, useState } from 'react';

export default function ConfidenceRing({ 
  percentage = 95.5, 
  size = 140, 
  strokeWidth = 10,
  label = "Model Confidence"
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 150);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Color mapping based on score
  const isOptimal = percentage >= 90;
  const isModerate = percentage >= 75 && percentage < 90;
  
  const strokeColor = isOptimal ? 'url(#greenGradient)' : isModerate ? 'url(#amberGradient)' : 'url(#redGradient)';
  const textColor = isOptimal ? 'text-emerald-600 dark:text-emerald-400' : isModerate ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800/80"
          fill="transparent"
        />

        {/* Indicator */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 0 6px rgba(34, 197, 94, 0.3))'
          }}
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`text-2xl sm:text-3xl font-extrabold font-heading ${textColor}`}>
          {percentage.toFixed(1)}%
        </span>
        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}
