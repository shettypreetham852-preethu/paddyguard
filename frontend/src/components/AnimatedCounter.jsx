import React, { useEffect, useState } from 'react';

export default function AnimatedCounter({ 
  value, 
  duration = 1800, 
  prefix = '', 
  suffix = '', 
  decimals = 0 
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const target = Number(value) || 0;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing function: easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startValue + (target - startValue) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.floor(displayValue).toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
