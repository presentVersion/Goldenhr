import React from 'react';

export interface MivoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  concaveArch?: 'top' | 'bottom' | 'both' | 'none';
  waveArch?: 'top' | 'bottom' | 'both' | 'none';
  variant?: 'light' | 'obsidian' | 'radiant';
  dotMatrix?: boolean;
}

export const MivoCard: React.FC<MivoCardProps> = ({
  children,
  concaveArch,
  waveArch,
  variant = 'light',
  dotMatrix = false,
  className = '',
  ...props
}) => {
  const effectiveArch = waveArch || concaveArch || 'none';
  const isObsidian = variant === 'obsidian';
  const isRadiant = variant === 'radiant';

  return (
    <div
      className={`relative overflow-hidden rounded-[36px] transition-all ${
        isObsidian
          ? 'bg-slate-950/90 dark:bg-black/90 text-white border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]'
          : isRadiant
          ? 'bg-gradient-to-b from-white/95 via-rose-50/60 to-white/90 dark:from-slate-900/95 dark:via-rose-950/30 dark:to-slate-950/95 text-slate-900 dark:text-white border border-white/70 dark:border-white/10 shadow-[0_20px_50px_-15px_rgba(255,51,102,0.18)]'
          : 'bg-white/88 dark:bg-slate-900/85 text-slate-900 dark:text-white border border-white/80 dark:border-white/10 shadow-[0_16px_40px_-12px_rgba(18,36,74,0.08)]'
      } backdrop-blur-2xl ${className}`}
      {...props}
    >
      {/* Top Concave Scallop Arch (Mivo Signature) */}
      {(effectiveArch === 'top' || effectiveArch === 'both') && (
        <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none z-10 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
            <path d="M 0,0 Q 200,32 400,0 L 400,24 L 0,24 Z" fill="currentColor" className="text-white dark:text-slate-900 opacity-90" />
          </svg>
        </div>
      )}

      {/* Subtle 16px Dot Matrix Grid Texture */}
      {dotMatrix && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25 z-0"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
      )}

      {/* Bevel highlights */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-[36px] pointer-events-none border border-white/40 dark:border-white/10" />

      {/* Card Content */}
      <div className="relative z-10 w-full">{children}</div>

      {/* Bottom Concave Scallop Arch */}
      {(effectiveArch === 'bottom' || effectiveArch === 'both') && (
        <div className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none z-10 overflow-hidden rotate-180">
          <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
            <path d="M 0,0 Q 200,32 400,0 L 400,24 L 0,24 Z" fill="currentColor" className="text-white dark:text-slate-900 opacity-90" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default MivoCard;
