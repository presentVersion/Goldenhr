import * as React from 'react';
import { BellRing, CheckCircle2, Volume2, VolumeX, AlertTriangle, ArrowRight, Activity, ShieldAlert } from 'lucide-react';
import { CountdownRing } from '@/components/ui/countdown-ring';
import { MivoButton } from '@/components/ui/mivo-button';
import { store, useAppStore } from '@/services/store';
import { animateTakeoverShake } from '@/lib/motion';

export const S15AlertTakeover: React.FC = () => {
  const { cases, activeCaseId } = useAppStore();
  const iconRef = React.useRef<HTMLDivElement>(null);
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const [remainingSeconds, setRemainingSeconds] = React.useState(30);
  const [soundMuted, setSoundMuted] = React.useState(false);
  const [isEscalated, setIsEscalated] = React.useState(false);

  React.useEffect(() => {
    animateTakeoverShake(iconRef.current);
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsEscalated(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = () => {
    store.updateCaseState(activeCase.id, 'ACCEPTED');
    store.setScreen('S14');
  };

  const handleOpenCase = () => {
    store.setScreen('S14');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070b14] flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pulsing Emergency Crimson Glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[550px] w-[550px] rounded-full bg-rose-600/20 blur-[130px] animate-pulse" />
        <div className="absolute h-[360px] w-[360px] rounded-full border border-rose-500/40 animate-ping opacity-30" />
        <div className="absolute h-[420px] w-[420px] rounded-full border border-rose-500/20 animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-[640px] p-6 sm:p-10 glass-specular border-2 border-rose-500/60 rounded-3xl shadow-[0_0_80px_rgba(244,63,94,0.35)] text-center space-y-6 flex flex-col items-center">
        {/* Top Sound and Escalation Status Bar */}
        <div className="w-full flex items-center justify-between text-xs font-bold tracking-wider">
          <span className="flex items-center gap-2 text-rose-400">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span>{isEscalated ? 'ESCALATED TO REGIONAL ON-CALL TRAUMA CHIEF' : 'EMERGENCY TRAUMA OVERLAY (F19)'}</span>
          </span>
          <button
            type="button"
            onClick={() => setSoundMuted(!soundMuted)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {soundMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-rose-400 animate-pulse" />}
            <span>{soundMuted ? 'Muted' : 'Alarm Active'}</span>
          </button>
        </div>

        {/* Vibrating Siren Icon */}
        <div
          ref={iconRef}
          className="relative h-28 w-28 rounded-full bg-rose-600/20 text-rose-500 border-2 border-rose-500 flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.6)]"
        >
          <BellRing className="h-14 w-14 animate-pulse drop-shadow-[0_2px_10px_rgba(244,63,94,0.8)]" />
        </div>

        {/* Title, Case ID, ETA */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Critical Case Incoming
          </h1>
          <div className="text-2xl font-mono font-black text-[#D4FF00] tracking-wider">
            {activeCase?.id || 'GH-2026-8812'}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Estimated Arrival in <span className="text-white font-extrabold">7 to 9 Minutes</span>
          </div>
        </div>

        {/* Patient Telemetry Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 w-full text-left space-y-2.5 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-rose-400" />
              <span>Patient Telemetry Stream</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
              CODE RED • ESI LEVEL 2
            </span>
          </div>

          <p className="text-sm sm:text-base font-bold text-white leading-snug">
            {activeCase?.symptoms_summary || 'Blunt chest & head trauma, severe tachycardia, desaturating rapidly'}
          </p>

          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
            <span className="text-white">BP: <strong className="text-rose-400">{activeCase?.vitals?.bp || '142/90'}</strong></span>
            <span className="text-white">HR: <strong className="text-rose-400">{activeCase?.vitals?.hr || 118} BPM</strong></span>
            <span className="text-white">SpO2: <strong className="text-amber-400">{activeCase?.vitals?.spo2 || 92}%</strong></span>
            <span className="text-white">GCS: <strong className="text-emerald-400">{activeCase?.vitals?.gcs || 12}/15</strong></span>
          </div>
        </div>

        {/* Countdown Ring */}
        <div className="flex flex-col items-center gap-2">
          <CountdownRing
            remainingSeconds={remainingSeconds}
            totalSeconds={30}
            size="lg"
          />
          <span className="text-xs text-slate-400 font-medium">
            Auto-escalates to on-call specialist if unacknowledged
          </span>
        </div>

        {/* Actions */}
        <div className="w-full space-y-3 pt-2">
          <MivoButton
            label="ACKNOWLEDGE & CONFIRM RECEPTION"
            sublabel="Locks Trauma Bay & signals ambulance crew"
            onClick={handleAcknowledge}
            variant="emergency"
            size="lg"
            arrowIcon={true}
          />

          <button
            type="button"
            onClick={handleOpenCase}
            className="w-full text-center text-xs font-bold text-slate-400 hover:text-white transition-colors py-2"
          >
            Dismiss to Doctor Radar (S14)
          </button>
        </div>
      </div>
    </div>
  );
};
