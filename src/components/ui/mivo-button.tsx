import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export interface MivoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'prominent' | 'regular' | 'dark' | 'lime' | 'emergency' | 'primary' | 'secondary';
  label?: React.ReactNode;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  arrowIcon?: boolean;
  icon?: React.ReactNode;
  satelliteIcon?: React.ReactNode;
  onSatelliteClick?: (e: React.MouseEvent) => void;
  satelliteTitle?: string;
  loading?: boolean;
}

export const MivoButton: React.FC<MivoButtonProps> = ({
  children,
  label,
  sublabel,
  size = 'md',
  arrowIcon = true,
  variant = 'prominent',
  icon,
  satelliteIcon,
  onSatelliteClick,
  satelliteTitle,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const isEmergency = variant === 'emergency';
  const isLime = variant === 'lime';
  const isDark = variant === 'dark';
  const isPrimary = variant === 'primary';

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 'h-11 md:h-12';
      case 'lg':
        return 'h-16 md:h-18';
      case 'md':
      default:
        return 'h-14 md:h-15';
    }
  };

  const getVariantStyles = () => {
    if (isEmergency) {
      return 'bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-[0_12px_36px_rgba(244,63,94,0.35)] hover:shadow-[0_16px_44px_rgba(244,63,94,0.45)] border border-rose-400/40';
    }
    if (isLime) {
      return 'bg-[#D4FF00] text-[#121212] shadow-lg shadow-lime-400/25 hover:shadow-lime-400/40 hover:scale-[1.01]';
    }
    if (isDark || isPrimary) {
      return 'bg-slate-950/90 dark:bg-white text-white dark:text-slate-950 border border-white/20 dark:border-white/10 backdrop-blur-2xl shadow-xl hover:scale-[1.01]';
    }
    return 'bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border border-white/70 dark:border-white/10 backdrop-blur-2xl shadow-[0_12px_36px_rgba(255,51,102,0.14)] hover:shadow-[0_16px_44px_rgba(255,51,102,0.22)] hover:scale-[1.01]';
  };

  const content = label || children;

  return (
    <div className={`flex items-center gap-3 w-full ${className}`}>
      {/* Stadium Main Action Rail */}
      <button
        disabled={disabled || loading}
        className={`group relative flex-1 ${getHeight()} rounded-full px-3 py-1.5 flex items-center justify-between select-none transition-all duration-300 ${getVariantStyles()} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-[0.99]'
        }`}
        {...props}
      >
        {/* Left Circular Arrow Capsule */}
        {arrowIcon && (
          <div
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105 ${
              isEmergency
                ? 'bg-white text-rose-600 shadow-rose-900/20'
                : isLime
                ? 'bg-[#121212] text-white'
                : isDark || isPrimary
                ? 'bg-rose-500 text-white dark:bg-slate-950 dark:text-white'
                : 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
            }`}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              icon || <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            )}
          </div>
        )}

        {/* Center Label & Sublabel */}
        <div className="flex-1 text-center px-3 truncate">
          <div className="text-xs md:text-sm font-black tracking-tight truncate">
            {content}
          </div>
          {sublabel && (
            <div className="text-[10px] md:text-[11px] opacity-75 font-semibold truncate mt-0.5">
              {sublabel}
            </div>
          )}
        </div>

        {/* Right Animated Triple Chevrons */}
        <div className="flex items-center text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all pr-2">
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
          <ChevronRight className="w-3.5 h-3.5 -ml-2 animate-pulse delay-75" />
          <ChevronRight className="w-3.5 h-3.5 -ml-2 animate-pulse delay-150" />
        </div>
      </button>

      {/* Satellite Circular Button */}
      {satelliteIcon && (
        <button
          type="button"
          onClick={onSatelliteClick}
          title={satelliteTitle}
          className="w-13 h-13 md:w-15 md:h-15 rounded-full bg-white/90 dark:bg-slate-900/90 border border-white/70 dark:border-white/10 backdrop-blur-2xl shadow-lg shadow-rose-500/10 text-slate-800 dark:text-slate-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          {satelliteIcon}
        </button>
      )}
    </div>
  );
};

export default MivoButton;
