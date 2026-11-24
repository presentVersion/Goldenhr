import * as React from 'react';
import {
  ShieldCheck,
  KeyRound,
  FileText,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { DecisionSupportBanner } from '@/components/ui/status-badges';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import Folder from '@/components/ui/react-bits/Folder';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

interface ReportFile {
  id: string;
  name: string;
  date: string;
  type: string;
  confidence: number;
  verified: boolean;
  summary: {
    allergies: string[];
    conditions: string[];
    medicines: string[];
  };
}

export const S16PatientReports: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hasConsent, setHasConsent] = React.useState(true);
  const [breakGlassUnlocked, setBreakGlassUnlocked] = React.useState(false);
  const [isBreakGlassDialogOpen, setIsBreakGlassDialogOpen] = React.useState(false);
  const [breakGlassReason, setBreakGlassReason] = React.useState('');

  const [reports, setReports] = React.useState<ReportFile[]>([
    {
      id: 'rep-1',
      name: 'Discharge_Summary_Cardiology_2024.pdf',
      date: '14 May 2024',
      type: 'Hospital Discharge',
      confidence: 0.88,
      verified: false,
      summary: {
        allergies: ['Penicillin (anaphylaxis documented)'],
        conditions: ['Post-PCI Anterior Wall STEMI 2024', 'Hypertension'],
        medicines: ['Aspirin 75mg', 'Ticagrelor 90mg', 'Atorvastatin 80mg'],
      },
    },
    {
      id: 'rep-2',
      name: 'Diabetic_Panel_HbA1c.pdf',
      date: '02 Jan 2025',
      type: 'Lab Investigation',
      confidence: 0.94,
      verified: false,
      summary: {
        allergies: [],
        conditions: ['Type 2 Diabetes (HbA1c: 7.8%)'],
        medicines: ['Metformin 500mg bd'],
      },
    },
  ]);

  const [selectedReport, setSelectedReport] = React.useState<ReportFile>(reports[0]);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const handleOpenBreakGlass = () => {
    setBreakGlassReason('');
    setIsBreakGlassDialogOpen(true);
  };

  const handleConfirmBreakGlass = () => {
    if (breakGlassReason.trim().length >= 10) {
      setBreakGlassUnlocked(true);
      setIsBreakGlassDialogOpen(false);
      store.logAccess({
        patient_id: 'pat-8812',
        actor_role: 'Emergency Physician',
        purpose: 'Acute Emergency Resuscitation — Break Glass Access',
        break_glass: true,
        break_glass_reason: breakGlassReason,
      });
    }
  };

  const handleVerifyReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verified: true } : r))
    );
  };

  const isUnlocked = hasConsent || breakGlassUnlocked;

  return (
    <div ref={containerRef} className="w-full max-w-[1240px] mx-auto p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100">
      {/* Decision Support Banner */}
      <DecisionSupportBanner />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => store.setScreen('S14')}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Back to Doctor Board"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              Patient Medical History & Reports
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Case GH-2026-8812 • Break-glass access protocol enabled (F23)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isUnlocked ? (
            <button
              type="button"
              onClick={handleOpenBreakGlass}
              className="px-3.5 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-all"
            >
              <KeyRound className="h-4 w-4" />
              <span>Emergency Break-Glass (F23)</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Access Unlocked via Break-Glass (Logged)</span>
            </span>
          )}
        </div>
      </div>

      {!isUnlocked ? (
        <MivoCard waveArch="top" className="p-8 text-center flex flex-col items-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Medical Records Protected by Consent Protocol
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            Patient is currently unconscious. Clinical staff may invoke emergency break-glass with an audited clinical rationale.
          </p>
          <div className="pt-2">
            <MivoButton
              label="UNLOCK VIA EMERGENCY BREAK-GLASS"
              sublabel="Access is immutably logged in Patient Access Log (F29)"
              onClick={handleOpenBreakGlass}
              variant="emergency"
              size="md"
              arrowIcon={true}
            />
          </div>
        </MivoCard>
      ) : (
        <div className="space-y-6">
          {/* 3D Interactive WebGL Flap Glass Folder Dossier & 3D Octane Render Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: 3D Interactive WebGL Flap Glass Folder (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-3xl glass-specular border border-rose-500/20 overflow-hidden shadow-xl bg-gradient-to-b from-white/40 via-white/10 to-transparent dark:from-slate-900/40 dark:via-slate-950/20">
              <div className="flex items-center justify-between w-full mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
                    3D Interactive Clinical Dossier (WebGL Refraction)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Click to Open Flap • Drag or Zoom Cards
                </span>
              </div>

              <div className="flex items-center justify-center py-6 min-h-[300px]">
                <Folder
                  label="GH-8812 Dossier"
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
                  onItemClick={(item: any, idx: number) => {
                    if (reports[idx]) setSelectedReport(reports[idx]);
                  }}
                />
              </div>
            </div>

            {/* Right: 3D Translucent Glass Diagnostic Dossier & ECG Asset (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-3xl glass-specular border border-rose-500/20 shadow-xl bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Telemetry Hologram & O-Negative Blood Vial
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Verified Crossmatch
                </span>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/15 bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-slate-900/10 dark:from-slate-900 dark:to-slate-950 group">
                <img
                  src="/assets/mivo-diagnostic-dossier-3d.jpg"
                  alt="3D Translucent Glass Diagnostic Dossier with Holographic ECG and Blood Vial"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Telemetry Badges - Clean Floating Stadium Pills */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="bg-slate-950/85 text-white backdrop-blur-xl px-3 py-1 rounded-full border border-white/20 shadow-xl text-[11px] font-mono font-bold">
                    O-NEG: 2 UNITS READY
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="bg-[#D4FF00] text-slate-950 font-black px-3 py-1 rounded-full shadow-xl text-[11px] font-mono">
                    12-LEAD STEMI ACTIVE
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 px-1">
                Octane 3D raytraced dossier scan with dynamic 12-lead telemetry ribbon and transfusion vial.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Report Files List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified Intake Reports ({reports.length})
            </h3>
            <div className="space-y-2">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedReport.id === rep.id
                      ? 'border-rose-500 bg-white dark:bg-slate-800 shadow-md ring-1 ring-rose-500/40'
                      : 'glass-specular hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400">{rep.date}</span>
                    <span className="text-[10px] font-bold text-rose-500 uppercase">{rep.type}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{rep.name}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Allergies Extracted:</span>
                    <span className="font-bold text-rose-600">{rep.summary.allergies.length > 0 ? 'Yes' : 'None'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Extracted Clinical Findings (8 cols) */}
          <div className="lg:col-span-8">
            <MivoCard waveArch="top" className="p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {selectedReport.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    AI Clinical Extraction • Confidence: {Math.round(selectedReport.confidence * 100)}%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleVerifyReport(selectedReport.id)}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-xs"
                >
                  {selectedReport.verified ? 'Verified by Physician' : 'Mark as Verified'}
                </button>
              </div>

              {/* Allergies Highlight */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
                  Critical Allergies Documented:
                </span>
                {selectedReport.summary.allergies.length > 0 ? (
                  selectedReport.summary.allergies.map((all, i) => (
                    <div key={i} className="text-xs font-black text-rose-700 dark:text-rose-300">
                      ⚠️ {all}
                    </div>
                  ))
                ) : (
                  <div className="text-xs font-semibold text-slate-500">No known drug allergies.</div>
                )}
              </div>

              {/* Prior Conditions */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Documented Prior Conditions:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.summary.conditions.map((cond, i) => (
                    <MivoPillTag key={i} label={cond} variant="amber" />
                  ))}
                </div>
              </div>

              {/* Active Medications */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Extracted Routine Medications:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.summary.medicines.map((med, i) => (
                    <MivoPillTag key={i} label={med} variant="frosted" />
                  ))}
                </div>
              </div>
            </MivoCard>
          </div>
        </div>
      </div>
      )}

      {/* Break-Glass Reason Dialog */}
      <BottomSheet
        open={isBreakGlassDialogOpen}
        onOpenChange={setIsBreakGlassDialogOpen}
        title="Emergency Break-Glass Authorization (F23)"
        description="Immediate clinical access required for acute resuscitation. Enter medical justification."
      >
        <div className="space-y-4 pt-3">
          <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 font-medium">
            Warning: This action is immutably signed and published to the Patient Immutable Access Log (F29).
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Clinical Rationale (Minimum 10 characters)
            </label>
            <input
              value={breakGlassReason}
              onChange={(e) => setBreakGlassReason(e.target.value)}
              placeholder="e.g. Unresponsive polytrauma patient, checking for anticoagulant therapy"
              className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <MivoButton
            label="AUTHORIZE BREAK-GLASS ACCESS"
            sublabel="Access will be granted immediately"
            onClick={handleConfirmBreakGlass}
            disabled={breakGlassReason.trim().length < 10}
            variant="emergency"
            size="md"
            arrowIcon={true}
          />
        </div>
      </BottomSheet>
    </div>
  );
};
