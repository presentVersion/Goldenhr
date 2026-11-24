import * as React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ClipboardList,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  HeartPulse,
  Activity,
  Layers,
} from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { DecisionSupportBanner } from '@/components/ui/status-badges';
import { HolographicAiOrb } from '@/components/ui/holographic-ai-orb';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { AiProvider, PmjayEligibilityProvider } from '@/services/mockProviders';
import { animateScreenEnter } from '@/lib/motion';

export const S11TriageReview: React.FC = () => {
  const { cases, activeCaseId } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const [selectedEsi, setSelectedEsi] = React.useState(activeCase?.triage_esi?.toString() || '2');
  const [eligibility, setEligibility] = React.useState<any>(null);
  const [verifiedPriorReports, setVerifiedPriorReports] = React.useState<Record<string, boolean>>({});

  const triageSuggestion = AiProvider.getTriageSuggestion(
    activeCase?.vitals || { hr: 118, spo2: 92, gcs: 12 },
    activeCase?.caller_answers
  );

  const kitPrediction = AiProvider.predictKit(activeCase?.symptoms_summary || '');

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
    PmjayEligibilityProvider.checkEligibility(activeCase?.id || '').then(setEligibility);
  }, [activeCase?.id]);

  const handleConfirmTriage = () => {
    store.confirmTriageLevel(activeCase.id, parseInt(selectedEsi, 10));
    store.setScreen('S18');
  };

  const toggleVerifyItem = (key: string) => {
    setVerifiedPriorReports((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div ref={containerRef} className="w-full max-w-[1400px] mx-auto p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100">
      {/* Top Banner with Pre-Alert Info */}
      <MivoCard waveArch="top" className="p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
            <HeartPulse className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Pre-alert from {activeCase?.assigned_ambulance_id || 'Ambulance 04'} • Arriving in 8 min
            </h2>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-mono mt-0.5 font-bold">
              Case ID: <span className="text-slate-900 dark:text-white">{activeCase?.id}</span> • Regional Polytrauma Protocol Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-[#D4FF00] text-slate-950 font-black text-xs shadow-sm uppercase">
            ESI Level {triageSuggestion.ruleLevel} Suggested
          </span>
        </div>
      </MivoCard>

      {/* 3D Holographic AI Energy Orb & 3D Cranial Scan */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
        <div className="md:col-span-7">
          <HolographicAiOrb
            statusText={`Neural Triage Evaluated: ESI Level ${triageSuggestion.ruleLevel} (${triageSuggestion.ruleLevel === 1 ? 'Resuscitation' : 'Emergent'})`}
            subText="Analyzing real-time vitals trajectory & hospital receiving bay capacity"
            size="md"
          />
        </div>
        <div className="md:col-span-5">
          <div className="relative rounded-3xl overflow-hidden glass-specular border border-rose-500/20 shadow-xl bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent p-3.5">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                3D Neural Synapse Scan
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                GCS: {activeCase?.vitals?.gcs || 12}/15
              </span>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner border border-white/40 dark:border-white/10 group">
              <img
                src="/assets/mivo-cranial-neural-3d.jpg"
                alt="3D Translucent Cranial and Neural Synapse Scan"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-[10px] font-mono">
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                  CEREBRAL ISCHEMIA RISK: LOW
                </span>
                <span className="bg-[#D4FF00] text-black font-black px-2 py-0.5 rounded-full shadow-sm">
                  ESI 2 ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Symptoms and Vitals Card */}
          <MivoCard waveArch="none" className="p-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Symptoms & Telemetry Vitals
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/5 dark:bg-white/5">
                <span className="font-bold text-slate-500">Blood Pressure:</span>
                <span className="font-black text-slate-900 dark:text-white">{activeCase?.vitals?.bp || '142/90 mmHg'}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/5 dark:bg-white/5">
                <span className="font-bold text-slate-500">Heart Rate:</span>
                <span className="font-black text-rose-600 dark:text-rose-400">{activeCase?.vitals?.hr || 118} BPM (Tachycardia)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/5 dark:bg-white/5">
                <span className="font-bold text-slate-500">SpO2:</span>
                <span className="font-black text-amber-500">{activeCase?.vitals?.spo2 || 92}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/5 dark:bg-white/5">
                <span className="font-bold text-slate-500">GCS Score:</span>
                <span className="font-black text-slate-900 dark:text-white">{activeCase?.vitals?.gcs || 12}/15</span>
              </div>
            </div>
          </MivoCard>

          {/* AI Pre-Alert Decision Support Disclaimer */}
          <DecisionSupportBanner
            ruleLevel={triageSuggestion.ruleLevel}
            mlLevel={triageSuggestion.modelLevel ?? undefined}
            confidence={triageSuggestion.confidence}
          />
        </div>

        {/* Right Column: Triage Override & Kit Assignment (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* ESI Triage Level Selection */}
          <MivoCard waveArch="top" className="p-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Confirm or Override Triage ESI Level
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedEsi(lvl.toString())}
                  className={`py-3 rounded-2xl text-center font-black transition-all ${
                    selectedEsi === lvl.toString()
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                      : 'bg-slate-950/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg block">ESI {lvl}</span>
                  <span className="text-[10px] opacity-75 font-normal">
                    {lvl === 1 ? 'Immediate' : lvl === 2 ? 'Emergent' : lvl === 3 ? 'Urgent' : 'Routine'}
                  </span>
                </button>
              ))}
            </div>

            {/* PMJAY Eligibility Check Result */}
            {eligibility && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Ayushman Bharat PMJAY Eligible
                    </span>
                    <span className="text-[10px] text-slate-500">Wallet balance: ₹5,00,000 active</span>
                  </div>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">
                  Verified
                </span>
              </div>
            )}

            {/* Confirm & Move to Room Kit */}
            <div className="pt-2">
              <MivoButton
                label={`CONFIRM TRIAGE (ESI LEVEL ${selectedEsi})`}
                sublabel="Locks Bay & routes to Room & Kit Assignment (S18)"
                onClick={handleConfirmTriage}
                variant="emergency"
                size="md"
                arrowIcon={true}
              />
            </div>
          </MivoCard>
        </div>
      </div>
    </div>
  );
};
