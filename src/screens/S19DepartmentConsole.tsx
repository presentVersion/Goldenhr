import * as React from 'react';
import {
  BellRing,
  Timer,
  CheckCircle2,
  Clock,
  Sparkles,
  Bell,
  ArrowLeft,
  Activity,
  Layers,
} from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

interface DepartmentPing {
  id: string;
  departmentName: string;
  ruleName: string;
  confirmedField: string;
  aiClassifierFired: boolean;
  confidence: number;
  timeReceived: string;
  eta: string;
  status: 'pending' | 'acknowledged' | 'prep_started' | 'ready';
}

export const S19DepartmentConsole: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [pings, setPings] = React.useState<DepartmentPing[]>([
    {
      id: 'ping-1',
      departmentName: 'Trauma CT Suite',
      ruleName: 'Polytrauma CT Brain & C-Spine Angiography Rule',
      confirmedField: 'GCS 12 + Severe Head Trauma + Scalp Laceration',
      aiClassifierFired: true,
      confidence: 0.91,
      timeReceived: '4 min ago',
      eta: '8 min',
      status: 'pending',
    },
    {
      id: 'ping-2',
      departmentName: 'Blood Bank',
      ruleName: 'Massive Transfusion Protocol (MTP) Standing Pre-Alert',
      confirmedField: 'Persistent Tachycardia (HR > 115) + Desaturation',
      aiClassifierFired: false,
      confidence: 1.0,
      timeReceived: '6 min ago',
      eta: '8 min',
      status: 'acknowledged',
    },
  ]);

  const [selectedPingId, setSelectedPingId] = React.useState<string>(pings[0]?.id);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const handleUpdateStatus = (pingId: string, newStatus: DepartmentPing['status']) => {
    setPings((prev) =>
      prev.map((p) => (p.id === pingId ? { ...p, status: newStatus } : p))
    );
  };

  const selectedPing = pings.find((p) => p.id === selectedPingId) || pings[0];
  const openPingsCount = pings.filter((p) => p.status !== 'ready').length;

  return (
    <div ref={containerRef} className="w-full max-w-[1400px] mx-auto p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => store.setScreen('S17')}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Back to bays"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              Specialty Department Console (F21)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-pings triggered by confirmed paramedic biometrics (CT Scan, Cath Lab, Blood Bank)
            </p>
          </div>
        </div>

        <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          {openPingsCount} Active Pre-Alert Pings
        </span>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Specialty Department Alerts
          </h3>
          <div className="space-y-2.5">
            {pings.map((ping) => {
              const isSelected = ping.id === selectedPingId;
              return (
                <div
                  key={ping.id}
                  onClick={() => setSelectedPingId(ping.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-500 bg-white dark:bg-slate-800 shadow-md ring-1 ring-rose-500/40'
                      : 'glass-specular hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {ping.departmentName}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      ping.status === 'ready'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : ping.status === 'prep_started'
                        ? 'bg-cyan-500/15 text-cyan-600'
                        : 'bg-amber-500/15 text-amber-600'
                    }`}>
                      {ping.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold truncate">{ping.ruleName}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{ping.timeReceived}</span>
                    <span className="font-bold text-rose-500">ETA: {ping.eta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detail & Workflow Action (7 cols) */}
        <div className="lg:col-span-7">
          {selectedPing && (
            <MivoCard waveArch="top" className="p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {selectedPing.departmentName}
                  </h3>
                  <span className="text-xs text-rose-500 font-bold">{selectedPing.ruleName}</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  ETA: {selectedPing.eta}
                </span>
              </div>

              {/* Trigger Condition */}
              <div className="p-4 rounded-2xl bg-slate-950/5 dark:bg-white/5 space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 block">
                  Biometric Trigger Criteria:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedPing.confirmedField}</span>
              </div>

              {/* Workflow Step Actions */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Update Department Readiness State
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedPing.id, 'acknowledged')}
                    className={`py-3 rounded-2xl text-xs font-black transition-all ${
                      selectedPing.status === 'acknowledged'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950/5 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    1. Acknowledge
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedPing.id, 'prep_started')}
                    className={`py-3 rounded-2xl text-xs font-black transition-all ${
                      selectedPing.status === 'prep_started'
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950/5 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    2. Prep Started
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedPing.id, 'ready')}
                    className={`py-3 rounded-2xl text-xs font-black transition-all ${
                      selectedPing.status === 'ready'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950/5 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    3. Suite Ready
                  </button>
                </div>
              </div>
            </MivoCard>
          )}
        </div>
      </div>
    </div>
  );
};
