import * as React from 'react';
import {
  CheckCircle2,
  ClipboardList,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { StageStepper, StepItem } from '@/components/ui/stage-stepper';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { AiProvider } from '@/services/mockProviders';
import { animateScreenEnter } from '@/lib/motion';

export const S18ChargeNurseRoomKit: React.FC = () => {
  const { cases, activeCaseId } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const [selectedRoom, setSelectedRoom] = React.useState('Trauma Bay 1 (Red)');
  const [prepStep, setPrepStep] = React.useState(1); // 0: Not started, 1: Preparing, 2: Ready
  const [approved, setApproved] = React.useState(false);

  const kitPrediction = AiProvider.predictKit(activeCase?.symptoms_summary || '');
  const [optionalItems, setOptionalItems] = React.useState(kitPrediction.optionalItems);

  const isTriageConfirmed = activeCase?.state === 'TRIAGE_CONFIRMED' || activeCase?.triage_esi !== undefined;

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const toggleOptionalItem = (idx: number) => {
    setOptionalItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, approved: !item.approved } : item))
    );
  };

  const handleApproveAssignment = () => {
    setApproved(true);
    setPrepStep(2);
    setTimeout(() => {
      store.setScreen('S17');
    }, 400);
  };

  const steps: StepItem[] = [
    { id: '1', label: 'Not Started', sublabel: 'Kit requested' },
    { id: '2', label: 'Preparing', sublabel: 'Nursing staff packing' },
    { id: '3', label: 'Ready at Bay', sublabel: 'Sterile field prepped' },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1340px] mx-auto min-h-[calc(100vh-72px)] p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100"
    >
      {/* Header: Case ID, Tier, ETA */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Room & Trauma Kit Assignment (F13 & F22)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Charge Nurse Allocation • Case ID: <span className="font-mono text-rose-500 font-bold">{activeCase?.id}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Chip
            variant={activeCase?.severity === 'critical' ? 'critical' : 'watch'}
            label={`TIER: ${activeCase?.severity.toUpperCase()} (ESI 2)`}
          />
          <span className="text-xs font-bold numeric text-rose-600 dark:text-rose-400 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-xs">
            ETA: 7 to 9 min
          </span>
        </div>
      </div>

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Room Selector */}
          <MivoCard waveArch="top" className="p-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Resuscitation Room
            </h3>
            <SegmentedControl
              options={[
                { value: 'Trauma Bay 1 (Red)', label: 'Trauma Bay 1' },
                { value: 'Trauma Bay 2 (Red)', label: 'Trauma Bay 2' },
                { value: 'ICU Resuscitation Bed', label: 'ICU Bed' },
              ]}
              value={selectedRoom}
              onChange={setSelectedRoom}
            />
          </MivoCard>

          {/* Core Kit Checklist */}
          <MivoCard waveArch="none" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Core Protocol Kit (Mandatory)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                Fixed by Clinical Rule
              </span>
            </div>

            <div className="space-y-2">
              {kitPrediction.coreKit.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white font-bold"
                >
                  <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </MivoCard>

          {/* Optional Kit Items with AI Rank */}
          <MivoCard waveArch="none" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Optional Specialized Items (F13)
                </h3>
                <p className="text-[11px] text-slate-400">Suggestions generated from clinical symptoms. Approve or remove.</p>
              </div>
              <Chip variant="ai" label="Kit model v0" confidence={0.84} />
            </div>

            <div className="space-y-2 pt-1">
              {optionalItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleOptionalItem(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    item.approved
                      ? 'border-rose-500 bg-rose-500/10 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-white/10 bg-slate-950/5 dark:bg-white/5 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold text-rose-500 font-mono">Rank #{item.aiRank}</span>
                    <span className="text-xs font-bold">{item.name}</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={item.approved}
                    onChange={() => {}}
                    className="h-4 w-4 rounded text-rose-600 accent-rose-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </MivoCard>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <MivoCard waveArch="top" className="p-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Preparation Progression (F22)
            </h3>

            <StageStepper
              steps={steps}
              currentStepIndex={prepStep}
              orientation="vertical"
            />

            {/* AI Estimated Time to Ready (F22) */}
            <div className="p-3.5 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Estimated Prep Time:</span>
              </div>
              <span className="text-sm font-black numeric text-rose-600 dark:text-rose-400">3.5 min</span>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <MivoButton
                label="APPROVE ROOM & KIT ASSIGNMENT"
                sublabel="Signals nursing station & updates S17 Bay Board"
                onClick={handleApproveAssignment}
                disabled={!isTriageConfirmed}
                variant="emergency"
                size="md"
                arrowIcon={true}
              />

              {!isTriageConfirmed && (
                <p className="text-[11px] text-amber-500 text-center font-semibold">
                  Requires clinician triage confirmation on S11 before final nurse approval.
                </p>
              )}
            </div>
          </MivoCard>
        </div>
      </div>
    </div>
  );
};
