import React from 'react';
import { Sparkles, Cpu, Pill } from 'lucide-react';

interface HolographicAiOrbProps {
  statusText?: string;
  subText?: string;
  isThinking?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HolographicAiOrb: React.FC<HolographicAiOrbProps> = ({
  statusText = 'Describe your symptoms With GoldenHour AI',
  subText = 'Clinical Decision Support • Real-time Triage Engine',
  isThinking = false,
  size = 'md',
  className = '',
}) => {
  const orbSizes = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48',
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* 3D Holographic Energy Orb Container */}
      <div className="relative flex items-center justify-center p-4">
        {/* Outer Plasma Dispersion Blur */}
        <div className={`absolute ${orbSizes[size]} rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-600 opacity-35 blur-2xl animate-pulse-glow pointer-events-none`} />

        {/* Outer Glass Sphere */}
        <div
          className={`relative ${orbSizes[size]} rounded-full flex items-center justify-center overflow-hidden border border-cyan-300/60 dark:border-cyan-400/30 shadow-[0_0_35px_rgba(6,182,212,0.35)] transition-all`}
          style={{
            background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(56, 189, 248, 0.45) 40%, rgba(14, 165, 233, 0.75) 75%, rgba(3, 105, 161, 0.95) 100%)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Specular Refraction Arc (Glass Highlight) */}
          <div className="absolute top-1 left-3 w-3/4 h-1/3 rounded-full bg-gradient-to-b from-white/90 to-transparent opacity-85 rotate-[-18deg] pointer-events-none" />

          {/* Magnetic Particle Ring 1 */}
          <div className="absolute inset-1 rounded-full border border-cyan-200/50 dark:border-cyan-200/30 animate-[spin_8s_linear_infinite]" />

          {/* Magnetic Particle Ring 2 (Counter-rotating) */}
          <div className="absolute inset-3 rounded-full border border-dashed border-sky-100/40 animate-[spin_12s_linear_infinite_reverse]" />

          {/* Floating Central Clinical AI Capsule (Reference 4 Viora) */}
          <div className="relative z-10 w-10 h-16 rounded-full bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/50 animate-float flex flex-col items-center justify-center overflow-hidden">
            {/* Top half: illuminated cyan pill dome */}
            <div className="w-full h-1/2 bg-gradient-to-b from-white to-cyan-300 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-cyan-700 animate-spin-slow" />
            </div>
            {/* Bottom half: deep sapphire drug core */}
            <div className="w-full h-1/2 bg-gradient-to-b from-sky-600 to-indigo-900 flex items-center justify-center">
              <Cpu className="w-3 h-3 text-cyan-200" />
            </div>
          </div>

          {/* Electric Sparkle Motes */}
          <div className="absolute top-4 right-5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping" />
          <div className="absolute bottom-5 left-5 w-1 h-1 rounded-full bg-cyan-200 shadow-[0_0_6px_#38bdf8] animate-pulse" />
        </div>
      </div>

      {/* Cognitive Status Pill Banner */}
      <div className="mt-4 flex flex-col items-center gap-1.5 max-w-sm">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-cyan-200/60 dark:border-cyan-900/50 shadow-md">
          <span className={`w-2 h-2 rounded-full ${isThinking ? 'bg-amber-400 animate-ping' : 'bg-cyan-500 animate-pulse'}`} />
          <span className="text-xs font-black tracking-tight text-slate-800 dark:text-slate-100">
            {isThinking ? 'Synthesizing Neural Protocols...' : 'GoldenHour Neural Triage'}
          </span>
        </div>
        <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-snug">
          {statusText}
        </p>
        {subText && (
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
            {subText}
          </p>
        )}
      </div>
    </div>
  );
};
export default HolographicAiOrb;
