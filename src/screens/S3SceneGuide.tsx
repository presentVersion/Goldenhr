import * as React from 'react';
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, Activity, Phone, AlertTriangle, HeartPulse, Clock, Sparkles } from 'lucide-react';
import { CountdownRing } from '@/components/ui/countdown-ring';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { PROTOCOLS, ProtocolDefinition } from '@/services/protocols';
import { SpeechProvider } from '@/services/mockProviders';
import { animateScreenEnter } from '@/lib/motion';

export const S3SceneGuide: React.FC = () => {
  const { currentLanguage } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [activeProtocolId, setActiveProtocolId] = React.useState<'cpr' | 'choking' | 'bleeding' | 'unconscious'>('cpr');
  const protocol: ProtocolDefinition = PROTOCOLS[activeProtocolId] || PROTOCOLS.cpr;
  const [currentStepIdx, setCurrentStepIdx] = React.useState(0);
  const [timerSeconds, setTimerSeconds] = React.useState(120);
  const [isTimerRunning, setIsTimerRunning] = React.useState(true);
  const [metronomeTick, setMetronomeTick] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const step = protocol.steps[currentStepIdx] || protocol.steps[0];
  const isLastStep = currentStepIdx === protocol.steps.length - 1;

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, [currentStepIdx, activeProtocolId]);

  // Switch protocol handler
  const handleSelectProtocol = (id: 'cpr' | 'choking' | 'bleeding' | 'unconscious') => {
    setActiveProtocolId(id);
    setCurrentStepIdx(0);
    const firstStep = PROTOCOLS[id]?.steps[0];
    if (firstStep?.hasTimer) {
      setTimerSeconds(firstStep.timerDurationSeconds || 120);
      setIsTimerRunning(true);
    }
  };

  // 110 BPM CPR Metronome (~545ms per beat)
  React.useEffect(() => {
    if (!step?.hasMetronome) return;
    const interval = setInterval(() => {
      setMetronomeTick((prev) => !prev);
    }, 545);
    return () => clearInterval(interval);
  }, [step?.hasMetronome]);

  // Countdown timer
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleSpeak = () => {
    if (step) {
      setIsSpeaking(true);
      SpeechProvider.speakText(`${step.title}. ${step.body}`, currentLanguage);
      setTimeout(() => setIsSpeaking(false), 4000);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      store.setScreen('S4');
    } else {
      setCurrentStepIdx((prev) => prev + 1);
      const nextStep = protocol.steps[currentStepIdx + 1];
      if (nextStep?.hasTimer) {
        setTimerSeconds(nextStep.timerDurationSeconds || 120);
        setIsTimerRunning(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    } else {
      store.setScreen('S2');
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[620px] mx-auto min-h-[calc(100vh-80px)] p-4 md:p-6 pb-28 flex flex-col justify-between"
    >
      {/* Top Protocol Status Bar */}
      <div className="space-y-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-xs border border-rose-500/20 shadow-xs">
              {step.stepNumber}
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white block">
                Step {step.stepNumber} of {protocol.steps.length}
              </span>
              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 font-mono">
                {protocol.title}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSpeak}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs backdrop-blur-md ${
              isSpeaking
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white'
            }`}
          >
            <Volume2 className="h-3.5 w-3.5" />
            <span>{isSpeaking ? 'Reading Audio...' : 'Audio Assist'}</span>
          </button>
        </div>

        {/* Emergency Protocol Switcher Pills (RonDesignLab / Mivo Style) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'cpr', label: 'CPR (4 Steps)' },
            { id: 'choking', label: 'Choking (Heimlich)' },
            { id: 'bleeding', label: 'Severe Bleeding' },
            { id: 'unconscious', label: 'Recovery Position' },
          ].map((item) => {
            const isActive = activeProtocolId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectProtocol(item.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-sm'
                    : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* CPR 4-Step Quick Tabs when CPR is active */}
        {activeProtocolId === 'cpr' && (
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {protocol.steps.map((s, idx) => {
              const isCurrent = idx === currentStepIdx;
              return (
                <button
                  key={s.stepNumber}
                  type="button"
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all text-center border ${
                    isCurrent
                      ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                      : 'bg-white/40 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/10 hover:bg-white/70'
                  }`}
                >
                  Step 0{s.stepNumber}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Guidance Card with Mivo Wave Arch */}
      <div className="my-auto py-4 space-y-5">
        {/* Unconstrained Minimal Professional 3D Rescue Visual (Zero Framelock) */}
        <div className="relative flex flex-col items-center justify-center my-1">
          {/* Subtle Ambient Studio Occlusion */}
          <div className="absolute inset-0 w-80 h-80 mx-auto rounded-full bg-rose-500/10 dark:bg-rose-500/20 blur-3xl pointer-events-none" />

          {/* Floating Telemetry Pills - Top */}
          <div className="relative z-10 w-full flex items-center justify-between px-1 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 text-rose-600 dark:text-rose-400 font-mono text-[11px] font-black border border-rose-500/30 shadow-md backdrop-blur-xl flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full bg-rose-500 ${metronomeTick ? 'scale-150 animate-ping' : ''}`} />
              {activeProtocolId === 'cpr'
                ? `CPR STEP 0${step.stepNumber}: ${step.title.toUpperCase()}`
                : protocol.title.toUpperCase()}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#D4FF00] text-slate-950 font-mono text-[10px] font-black shadow-md">
              {step.hasMetronome ? '110 BPM PACER' : 'EMERGENCY PROTOCOL'}
            </span>
          </div>

          {/* 16:9 Clean Professional Medical 3D Asset Container */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/80 dark:border-white/15 bg-[#FAFAFA] dark:bg-slate-900/60 group">
            <img
              src={step.image || '/assets/cpr-step-01-assess-alert.jpg'}
              alt={step.title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
                step.hasMetronome && metronomeTick ? 'brightness-105' : ''
              }`}
            />
          </div>

          {/* Floating Telemetry Pills - Bottom (Non-Obscuring) */}
          <div className="relative z-10 w-full flex items-center justify-between px-1 mt-2">
            <span className="px-3 py-1 rounded-full bg-slate-950/85 text-white font-mono text-[10px] font-bold border border-white/20 shadow-md backdrop-blur-xl">
              {activeProtocolId === 'cpr'
                ? 'Target: Lower Half of Sternum • 5-6 cm'
                : activeProtocolId === 'choking'
                ? 'Vector: Inward & Upward J-Thrust'
                : activeProtocolId === 'bleeding'
                ? 'Placement: 2-3 Inches Above Wound'
                : 'Position: Lateral Recumbent Drain'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white font-mono text-[10px] font-bold border border-slate-200 dark:border-white/20 shadow-md backdrop-blur-xl">
              Medically Validated • GoldenHour
            </span>
          </div>
        </div>

        <MivoCard waveArch="top" className="p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-wider">
                Critical Directive
              </span>
              {step.hasMetronome && (
                <span className="px-2.5 py-1 rounded-full bg-[#D4FF00] text-black text-[10px] font-black uppercase tracking-wider shadow-xs">
                  110 BPM Metronome Active
                </span>
              )}
            </div>

            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {step.title}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {step.body}
            </p>
          </div>

          {/* CPR 110 BPM Visual Beat Metronome */}
          {step.hasMetronome && (
            <div className="p-4 rounded-2xl bg-slate-950/5 dark:bg-black/30 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Match Chest Compression Tempo
              </span>
              <div className="relative flex items-center justify-center w-20 h-20">
                <span
                  className={`absolute inset-0 rounded-full bg-[#D4FF00] transition-transform duration-200 ${
                    metronomeTick ? 'scale-125 opacity-40' : 'scale-90 opacity-10'
                  }`}
                />
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-slate-950 font-black text-xs transition-all duration-150 ${
                    metronomeTick ? 'bg-[#D4FF00] scale-110 shadow-lg shadow-[#D4FF00]/50' : 'bg-[#D4FF00]/80 scale-95'
                  }`}
                >
                  <HeartPulse className="h-6 w-6 text-slate-950 animate-pulse" />
                </div>
              </div>
              <span className="text-xs font-mono font-black text-slate-900 dark:text-white">
                110 COMPRESSIONS / MIN
              </span>
            </div>
          )}

          {/* Countdown Timer if required */}
          {step.hasTimer && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">
                  Action Cycle Timer
                </span>
                <span className="text-[11px] text-amber-700/80 dark:text-amber-400">
                  Maintain continuous action until cycle ends or EMS arrives.
                </span>
              </div>
              <div className="text-xl font-mono font-black text-amber-600 dark:text-amber-400">
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </div>
            </div>
          )}
        </MivoCard>
      </div>

      {/* Navigation Stadium Rails */}
      <div className="space-y-3">
        <MivoButton
          label={isLastStep ? 'FINISH & VIEW LIVE AMBULANCE MAP' : 'PROCEED TO NEXT STEP'}
          sublabel={`Step ${step.stepNumber} of ${protocol.steps.length} • ${protocol.title}`}
          onClick={handleNext}
          variant="primary"
          size="lg"
          arrowIcon={true}
        />

        <div className="flex items-center justify-between px-2 text-xs">
          <button
            type="button"
            onClick={handleBack}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => store.setScreen('S4')}
            className="text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>Skip to Live Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
