import * as React from 'react';
import { Siren, Activity } from 'lucide-react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { isReducedMotion } from '@/lib/motion';

interface SOSButtonProps {
  onPress: () => void;
  size?: 'normal' | 'large';
  className?: string;
  label?: string;
  caption?: string;
}

export const SOSButton: React.FC<SOSButtonProps> = ({
  onPress,
  size = 'large',
  className,
  label = 'TAP SOS',
  caption = 'Tap once. We dispatch emergency care to your exact location.',
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = React.useState(false);

  // GSAP Breathing and subtle heartbeat pulse
  React.useEffect(() => {
    if (isReducedMotion() || !buttonRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle organic breathing animation
      gsap.to(buttonRef.current, {
        scale: 1.03,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePointerDown = () => {
    setIsPressed(true);
    if (!buttonRef.current || isReducedMotion()) return;
    gsap.to(buttonRef.current, {
      scale: 0.92,
      duration: 0.12,
      ease: 'power2.out',
    });
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    if (!buttonRef.current || isReducedMotion()) return;
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.45,
      ease: 'back.out(2)',
    });
  };

  const diameterClass =
    size === 'large'
      ? 'h-[220px] w-[220px] sm:h-[250px] sm:w-[250px]'
      : 'h-[180px] w-[180px] sm:h-[200px] sm:w-[200px]';

  return (
    <div ref={containerRef} className={cn('relative flex flex-col items-center justify-center select-none py-6', className)}>
      {/* Multi-Ring Expanding Radar Ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute h-[250px] w-[250px] sm:h-[290px] sm:w-[290px] rounded-full border-2 border-red-600/30 bg-red-600/5 animate-radar-1" />
        <div className="absolute h-[250px] w-[250px] sm:h-[290px] sm:w-[290px] rounded-full border border-red-600/20 bg-red-600/5 animate-radar-2" />
        <div className="absolute h-[250px] w-[250px] sm:h-[290px] sm:w-[290px] rounded-full border border-red-600/15 animate-radar-3" />
      </div>

      {/* Ambient Radial Red Glow */}
      <div className="absolute h-[220px] w-[220px] rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

      {/* Main 3D Tactile Button */}
      <button
        ref={buttonRef}
        type="button"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onClick={onPress}
        className={cn(
          'relative z-10 rounded-full flex flex-col items-center justify-center cursor-pointer transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600 focus-visible:ring-offset-4',
          diameterClass
        )}
        style={{
          background: 'radial-gradient(circle at 35% 30%, #FF4D4D 0%, #D93A3A 55%, #9E1A1A 100%)',
          boxShadow: isPressed
            ? '0 6px 20px rgba(217, 58, 58, 0.4), inset 0 6px 12px rgba(0, 0, 0, 0.5), inset 0 -2px 6px rgba(255, 255, 255, 0.2)'
            : '0 20px 40px -10px rgba(217, 58, 58, 0.6), 0 0 60px rgba(217, 58, 58, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -8px 16px rgba(0, 0, 0, 0.4)',
          border: '4px solid rgba(255, 255, 255, 0.95)',
        }}
        aria-label="Emergency SOS Trigger"
      >
        {/* Subtle glass reflection sheen on upper half */}
        <div className="absolute top-2 left-6 right-6 h-1/3 rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

        {/* Siren Beacon Icon with Pulse */}
        <div className="relative mb-1">
          <Siren className="h-20 w-20 sm:h-24 sm:w-24 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] animate-pulse" />
        </div>

        {/* SOS Typography */}
        <span className="text-h2 sm:text-display font-black text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {label}
        </span>
      </button>

      {/* Caption with ECG wave icon */}
      {caption && (
        <div className="relative z-10 mt-5 flex items-center gap-2 text-center max-w-sm px-4">
          <Activity className="h-4 w-4 text-red-600 flex-shrink-0 animate-pulse" />
          <span className="text-small font-semibold text-navy-700 tracking-wide">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
};
