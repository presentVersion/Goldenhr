import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check, ChevronRight, Lock } from 'lucide-react';

interface SwipeConfirmSliderProps {
  label?: string;
  confirmedLabel?: string;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
}

export const SwipeConfirmSlider: React.FC<SwipeConfirmSliderProps> = ({
  label = 'Swipe to Confirm',
  confirmedLabel = 'Action Confirmed',
  onConfirm,
  disabled = false,
  className = '',
}) => {
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number) => {
    if (disabled || isConfirmed) return;
    setIsDragging(true);
  };

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !trackRef.current || isConfirmed) return;
    const rect = trackRef.current.getBoundingClientRect();
    const thumbWidth = 52;
    const maxDistance = rect.width - thumbWidth - 8; // 8px padding
    const currentOffset = clientX - rect.left - thumbWidth / 2;
    const progress = Math.min(Math.max(currentOffset / maxDistance, 0), 1);
    setDragProgress(progress);

    if (progress >= 0.92) {
      setIsConfirmed(true);
      setIsDragging(false);
      setDragProgress(1);
      onConfirm();
    }
  }, [isDragging, isConfirmed, onConfirm]);

  const handleEnd = useCallback(() => {
    if (!isDragging || isConfirmed) return;
    setIsDragging(false);
    if (dragProgress < 0.92) {
      setDragProgress(0); // Spring back
    }
  }, [isDragging, isConfirmed, dragProgress]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <div
      ref={trackRef}
      className={`relative h-16 w-full rounded-full select-none overflow-hidden p-1.5 transition-all shadow-lg ${
        isConfirmed
          ? 'bg-emerald-600 text-white shadow-emerald-500/25'
          : 'bg-slate-900/90 dark:bg-black/85 text-white border border-white/20 backdrop-blur-xl'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {/* Dynamic Progress Fill Layer */}
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/40 to-emerald-400/80 rounded-full transition-all duration-75"
        style={{ width: `${Math.max(dragProgress * 100, isConfirmed ? 100 : 0)}%` }}
      />

      {/* Track Label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-black uppercase tracking-widest text-slate-300 dark:text-slate-200">
        {isConfirmed ? (
          <span className="flex items-center gap-2 text-white">
            <Check className="w-4 h-4 stroke-[3]" /> {confirmedLabel}
          </span>
        ) : (
          <span className="flex items-center gap-1.5 opacity-80">
            <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
            <ChevronRight className="w-3.5 h-3.5 animate-pulse delay-75" />
            {label}
            <ChevronRight className="w-3.5 h-3.5 animate-pulse delay-150" />
            <ChevronRight className="w-3.5 h-3.5 animate-pulse delay-200" />
          </span>
        )}
      </div>

      {/* Draggable Rounded Check Thumb (Dr+ style) */}
      {!isConfirmed && (
        <div
          onMouseDown={(e) => handleStart(e.clientX)}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          className={`absolute top-1.5 bottom-1.5 w-13 h-13 rounded-full bg-white dark:bg-slate-100 text-slate-900 flex items-center justify-center shadow-xl border border-white/90 cursor-grab active:cursor-grabbing transition-transform ${
            isDragging ? 'scale-105 shadow-2xl' : 'hover:scale-102'
          }`}
          style={{
            left: `calc(${dragProgress * 100}% * ((100% - 52px) / 100) + 6px)`,
            transition: isDragging ? 'none' : 'left 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <Check className="w-5 h-5 text-slate-900 stroke-[3]" />
        </div>
      )}

      {/* Right End Target Icon */}
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <Lock className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};
export default SwipeConfirmSlider;
