import * as React from 'react';
import {
  BellRing,
  BedDouble,
  Users,
  Wrench,
  Timer,
  XCircle,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingDown,
  Lock,
  Activity,
  HeartPulse,
} from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { CountdownRing } from '@/components/ui/countdown-ring';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { SwipeConfirmSlider } from '@/components/ui/swipe-confirm-slider';
import SlideCommit from '@/components/ui/react-bits/SlideCommit';
import { AnatomicalBodyScan } from '@/components/ui/anatomical-body-scan';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import Folder from '@/components/ui/react-bits/Folder';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S14DoctorCaseBoard: React.FC = () => {
  const { cases, activeCaseId } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [sortBy, setSortBy] = React.useState<'priority' | 'time'>('priority');
  const [selectedCaseId, setSelectedCaseId] = React.useState(activeCaseId || cases[0]?.id);
  const [bayHoldRemaining, setBayHoldRemaining] = React.useState(82);

  const [bedAvailable, setBedAvailable] = React.useState(true);
  const [teamReady, setTeamReady] = React.useState(true);
  const [equipmentReady, setEquipmentReady] = React.useState(true);

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const hasCriticalUnacknowledged = cases.some((c) => c.severity === 'critical' && c.state === 'PRE_ALERTED');

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
    const interval = setInterval(() => {
      setBayHoldRemaining((prev) => (prev > 0 ? prev - 1 : 90));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    store.setActiveCase(id);
  };

  const handleConfirmReadiness = () => {
    if (activeCase) {
      store.updateCaseState(activeCase.id, 'ACCEPTED');
      store.lockBay('bay-1');
    }
  };

  const isReady = bedAvailable && teamReady && equipmentReady;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-72px)] p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100"
    >
      {/* Header with Forecast Chip */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono uppercase text-rose-600 dark:text-rose-400 font-bold">
              Apollo Jubilee Trauma Roster • Active Doctor Stream
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Emergency Physician Case Radar
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-[#D4FF00] text-slate-950 font-black text-xs shadow-xs">
            Arrivals Next 30 min: 3 • Free Bays: 2 (F31)
          </span>

          <SegmentedControl<'priority' | 'time'>
            options={[
              { value: 'priority', label: 'Priority Sort' },
              { value: 'time', label: 'Arrival Time' },
            ]}
            value={sortBy}
            onChange={setSortBy}
            className="w-48"
          />
        </div>
      </div>

      {/* Critical Unacknowledged Siren Banner */}
      {hasCriticalUnacknowledged && (
        <div
          onClick={() => store.setScreen('S15')}
          className="relative z-10 p-4 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white flex items-center justify-between shadow-2xl cursor-pointer hover:opacity-95 transition-all border border-red-400/40 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <BellRing className="h-5 w-5 text-white animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-black tracking-wide block uppercase">
                CRITICAL INCOMING CASE UNACKNOWLEDGED (42s)
              </span>
              <span className="text-[11px] text-white/80 font-medium">
                Tap anywhere on this banner to activate Full-Screen Alert Takeover (S15)
              </span>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-white text-red-700 font-black text-xs shadow-sm">
            Launch S15 Takeover →
          </span>
        </div>
      )}

      {/* 2-Zone Layout (List 60% Left, Detail Panel 40% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Case Cards List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {cases.map((c) => {
            const isSelected = c.id === selectedCaseId;
            return (
              <div
                key={c.id}
                onClick={() => handleSelectCase(c.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 bg-white dark:bg-slate-800 shadow-xl ring-2 ring-rose-500/30'
                    : 'glass-specular hover:border-rose-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-mono font-black text-slate-900 dark:text-white">{c.id}</span>
                    <Chip
                      variant={c.severity === 'critical' ? 'critical' : c.severity === 'watch' ? 'watch' : 'ready'}
                      label={c.severity.toUpperCase()}
                    />
                  </div>
                  <span className="text-base font-black text-rose-600 dark:text-rose-400">7-9 min ETA</span>
                </div>

                <p className="text-sm text-slate-800 dark:text-slate-200 font-bold leading-relaxed">{c.symptoms_summary}</p>

                <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <span className="flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-rose-500" />
                    <span>Unit: {c.assigned_ambulance_id || 'Ambulance 04'}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    {c.deterioration_signal && (
                      <span className="flex items-center gap-1 text-red-600 font-black animate-pulse">
                        <TrendingDown className="h-4 w-4" />
                        <span>Deteriorating (F34)</span>
                      </span>
                    )}
                    <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">
                      Priority Score: 94/100
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Handshake Detail Panel (5 cols) */}
        {activeCase && (
          <div className="lg:col-span-5 space-y-5">
            <MivoCard waveArch="top" className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Readiness Handshake (F20)</h3>
                  <p className="text-xs text-rose-500 font-mono font-bold">Case {activeCase.id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => store.setScreen('S16')}
                  className="px-3 py-1.5 rounded-full text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>View Reports (S16)</span>
                </button>
              </div>

              {/* 90-sec Bay Countdown Ring */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    Trauma Bay 1 Reservation Hold
                  </span>
                  <span className="text-[11px] text-slate-500">Auto-expires if unconfirmed</span>
                </div>
                <CountdownRing remainingSeconds={bayHoldRemaining} totalSeconds={90} size="sm" />
              </div>

              {/* 3 Readiness Checkboxes */}
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 cursor-pointer">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Trauma Bay Bed 1 Clean & Ready</span>
                  <input
                    type="checkbox"
                    checked={bedAvailable}
                    onChange={(e) => setBedAvailable(e.target.checked)}
                    className="h-5 w-5 rounded-md text-rose-600 accent-rose-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 cursor-pointer">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Resuscitation Team Assembled</span>
                  <input
                    type="checkbox"
                    checked={teamReady}
                    onChange={(e) => setTeamReady(e.target.checked)}
                    className="h-5 w-5 rounded-md text-rose-600 accent-rose-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 cursor-pointer">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Polytrauma Rapid Kit Deployed</span>
                  <input
                    type="checkbox"
                    checked={equipmentReady}
                    onChange={(e) => setEquipmentReady(e.target.checked)}
                    className="h-5 w-5 rounded-md text-rose-600 accent-rose-600"
                  />
                </label>
              </div>

              {/* Confirm Readiness with Tactile SlideCommit & Stadium Action */}
              <div className="pt-2 flex flex-col items-center gap-2">
                <MivoButton
                  label={activeCase.state === 'ACCEPTED' ? 'BAY CONFIRMED • CREW NOTIFIED' : 'CONFIRM BAY READINESS'}
                  sublabel="Locks Trauma Bay 1 & sends arrival beacon"
                  onClick={handleConfirmReadiness}
                  disabled={!isReady}
                  variant="emergency"
                  size="md"
                  arrowIcon={true}
                />

                {isReady && activeCase.state !== 'ACCEPTED' && (
                  <div className="pt-1 flex flex-col items-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Or Slide to Lock Bay
                    </span>
                    <SlideCommit
                      label="Slide to Lock Trauma Bay 1"
                      doneLabel="Bay 1 Locked • Beacon Live"
                      onConfirm={() =>
                        new Promise<void>((resolve) => {
                          handleConfirmReadiness();
                          setTimeout(resolve, 600);
                        })
                      }
                      trackColor="rgba(15, 23, 42, 0.85)"
                      handleColor="#ffffff"
                      successColor="#D4FF00"
                      width={280}
                      height={48}
                      radius={24}
                    />
                  </div>
                )}
              </div>
            </MivoCard>

            {/* Direct Doctor 3D Clinical Dossier (Merged into Doctor Page) */}
            <MivoCard waveArch="none" className="p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    3D Clinical Dossier • Direct Doctor Access
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                  UNLOCKED (F20)
                </span>
              </div>

              {/* 3D WebGL Flap Glass Folder */}
              <div className="flex flex-col items-center justify-center py-4 bg-gradient-to-b from-slate-950/5 via-rose-500/5 to-transparent dark:from-white/5 rounded-2xl border border-white/40 dark:border-white/10">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 mb-2">
                  Click Flap to Open • Drag or Zoom Cards
                </span>
                <Folder
                  label={`Patient ${activeCase.id}`}
                  mode="flap"
                  variant="glass"
                  items={[
                    { title: 'Cardiology Discharge 2024', description: 'Post-PCI STEMI' },
                    { title: 'Diabetic HbA1c Panel', description: 'HbA1c 7.8% • Metformin' },
                    { title: '12-Lead STEMI ECG Strip', description: 'V1-V4 Acute Elevation' },
                    { title: 'Blood Crossmatch Record', description: 'O-Negative Rh-D' },
                  ]}
                  color="#f43f5e"
                  paperColor="#ffffff"
                  openOn="click"
                  draggable={true}
                  zoomOnClick={true}
                />
              </div>

              {/* Extracted Clinical Biometrics (Zero Gatekeeping for Doctor) */}
              <div className="space-y-3 pt-1">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2">
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400">CRITICAL ALLERGY:</span>
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                    Penicillin (Documented Anaphylaxis)
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Active Medications in Transit:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <MivoPillTag label="Ticagrelor 90mg bd" variant="frosted" />
                    <MivoPillTag label="Aspirin 75mg" variant="amber" />
                    <MivoPillTag label="Atorvastatin 80mg" variant="lime" />
                    <MivoPillTag label="Metformin 500mg" variant="frosted" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Documented Comorbidities:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <MivoPillTag label="Anterior STEMI (PCI 2024)" variant="amber" />
                    <MivoPillTag label="Systemic Hypertension" variant="frosted" />
                    <MivoPillTag label="Type 2 Diabetes" variant="jade" />
                  </div>
                </div>
              </div>
            </MivoCard>
          </div>
        )}
      </div>
    </div>
  );
};
