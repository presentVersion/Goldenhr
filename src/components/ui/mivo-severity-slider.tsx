import React from 'react';

export interface MivoSeveritySliderProps {
  value: number; // 1-10
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

export const MivoSeveritySlider: React.FC<MivoSeveritySliderProps> = ({
  value,
  onChange,
  label = 'Symptom Severity',
  className = '',
}) => {
  const getTier = (val: number): string => {
    if (val >= 8) return 'Critical';
    if (val >= 5) return 'Moderate';
    if (val >= 3) return 'Mild';
    return 'Minimal';
  };

  const getTierColor = (val: number): string => {
    if (val >= 8) return 'text-rose-600 dark:text-rose-400';
    if (val >= 5) return 'text-amber-500 dark:text-amber-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const percent = ((value - 1) / 9) * 100;

  return (
    <div className={`space-y-2.5 w-full select-none ${className}`}>
      {/* Header Label & Qualitative Tier */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-600 dark:text-slate-300">
          {label}:
        </span>
        <span className={`font-black tracking-tight ${getTierColor(value)}`}>
          {getTier(value)} ({value}/10)
        </span>
      </div>

      {/* Tactile Split Groove Track (Mivo Reference: Image 6, 10, 12) */}
      <div className="relative py-2 flex items-center">
        {/* Track Background */}
        <div className="relative w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          {/* Active Segment (Charcoal Light / White Dark) */}
          <div
            className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Neon Lime Thumb with Double Concentric Halo */}
        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
          style={{ left: `calc(${percent}% - 12px)` }}
        >
          {/* Outer Pulse Ring */}
          <div className="w-6 h-6 rounded-full bg-[#D4FF00]/30 animate-ping absolute inset-0" />
          {/* Middle Concentric Ring */}
          <div className="relative w-6 h-6 rounded-full bg-[#D4FF00] border-2 border-slate-950 dark:border-white shadow-[0_0_12px_#D4FF00] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-slate-950 dark:bg-white" />
          </div>
        </div>

        {/* Hidden Input for Native Touch / Drag */}
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Scale Tick Markers */}
      <div className="flex justify-between text-[10px] font-bold text-slate-400 px-0.5">
        <span>1 (Mild)</span>
        <span>5 (Moderate)</span>
        <span>10 (Critical)</span>
      </div>
    </div>
  );
};

export default MivoSeveritySlider;
