import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export type CountFormat = 'number' | 'usd' | 'compact' | 'percent' | 'clock';

export interface GsapCounterProps {
  value?: number;
  end?: number;
  format?: CountFormat;
  duration?: number;
  className?: string;
}

const numberFormat = new Intl.NumberFormat('en-US');
const usdFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format;
const usdCompact = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format;

const formatValue = (val: number, format: CountFormat): string => {
  switch (format) {
    case 'usd':
      return usdFormat(val);
    case 'compact':
      return usdCompact(val);
    case 'percent':
      return `${val.toFixed(1)}%`;
    case 'clock': {
      const mins = Math.floor(val / 60);
      const secs = Math.floor(val % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    case 'number':
    default:
      return numberFormat.format(Math.round(val));
  }
};

export const GsapCounter: React.FC<GsapCounterProps> = ({
  value,
  end,
  format = 'number',
  duration = 0.75,
  className = '',
}) => {
  const targetVal = end !== undefined ? end : value !== undefined ? value : 0;
  const [displayValue, setDisplayValue] = useState<string>(formatValue(targetVal, format));
  const countRef = useRef<{ val: number }>({ val: 0 });

  useEffect(() => {
    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setDisplayValue(formatValue(targetVal, format));
      return;
    }

    const obj = countRef.current;
    const tween = gsap.to(obj, {
      val: targetVal,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(formatValue(obj.val, format));
      },
    });

    return () => {
      tween.kill();
    };
  }, [targetVal, duration, format]);

  return <span className={`numeric font-mono ${className}`}>{displayValue}</span>;
};

export default GsapCounter;
