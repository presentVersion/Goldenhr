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

  const protocol: ProtocolDefinition = PROTOCOLS.bleeding;
  const [currentStepIdx, setCurrentStepIdx] = React.useState(0);
  const [timerSeconds, setTimerSeconds] = React.useState(180);
  const [isTimerRunning, setIsTimerRunning] = React.useState(true);
  const [metronomeTick, setMetronomeTick] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const step = protocol.steps[currentStepIdx];
  const isLastStep = currentStepIdx === protocol.steps.length - 1;

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, [currentStepIdx]);

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
      store.setScreen('S4');
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[580px] mx-auto min-h-[calc(100vh-80px)] p-4 md:p-6 pb-28 flex flex-col justify-between"
    >
      {/* Top Protocol Status Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-xs border border-rose-500/20 shadow-xs">
            {step.stepNumber}
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 dark:text-white block">
              Step {step.stepNumber} of {protocol.steps.length}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">{protocol.title}</span>
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

      {/* Main Guidance Card with Mivo Wave Arch */}
      <div className="my-auto py-4 space-y-4">
        {/* 3D Translucent Cardiac Resuscitation Torso Hero Visual */}
        <div className="relative rounded-3xl overflow-hidden glass-specular border border-rose-500/20 shadow-xl bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent p-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full bg-rose-500 ${metronomeTick ? 'scale-150 animate-ping' : ''}`} />
              3D Cardiac Pacing Scan (110 BPM)
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Thoracic Compression Zone
            </span>
          </div>

          <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden shadow-inner border border-white/40 dark:border-white/10 group">
            <img
              src="/assets/mivo-cardiac-cpr-3d.jpg"
              alt="3D Translucent Cardiac Resuscitation Torso"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                metronomeTick ? 'scale-105 filter brightness-110' : 'scale-100'
              }`}
            />
            {/* Live Ripple Soundwave Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-[11px] font-mono">
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                Sternum Depth: 5.2 cm
              </span>
              <span className="bg-[#D4FF00] text-black font-black px-2.5 py-1 rounded-full shadow-sm">
                RHYTHM LOCKED
              </span>
            </div>
          </div>
        </div>

        <MivoCard waveArch="top" className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-wider">
                Critical Action
              </span>
              {step.hasMetronome && (
                <span className="px-2.5 py-1 rounded-full bg-[#D4FF00] text-black text-[10px] font-black uppercase tracking-wider shadow-xs">
                  110 BPM Metronome Active
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
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
                  Hold Firm Direct Pressure
                </span>
                <span className="text-[11px] text-amber-700/80 dark:text-amber-400">
                  Do not lift cloth to check bleeding until timer finishes.
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
          sublabel={`Step ${step.stepNumber} of ${protocol.steps.length}`}
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
            <span>Previous Step</span>
          </button>

          <button
            type="button"
            onClick={() => store.setScreen('S4')}
            className="text-rose-600 dark:text-rose-400 font-bold hover:underline"
          >
            Skip to Ambulance Tracker →
          </button>
        </div>
      </div>
    </div>
  );
};
