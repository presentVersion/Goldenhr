import React from 'react';
import { X } from 'lucide-react';

export interface MivoPillTagProps {
  label: string;
  onRemove?: () => void;
  variant?: 'frosted' | 'lime' | 'amber' | 'jade';
  className?: string;
}

export const MivoPillTag: React.FC<MivoPillTagProps> = ({
  label,
  onRemove,
  variant = 'frosted',
  className = '',
}) => {
  const getStyle = () => {
    switch (variant) {
      case 'lime':
        return 'bg-[#D4FF00] text-[#121212] font-black border-lime-300 shadow-sm';
      case 'amber':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'jade':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'frosted':
      default:
        return 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-white/10 shadow-xs hover:bg-white dark:hover:bg-slate-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md transition-all select-none ${getStyle()} ${className}`}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="w-4 h-4 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
          title={`Remove ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default MivoPillTag;
