import * as React from 'react';
import {
  Timer,
  Siren,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  AlertCircle,
  Mic,
  Square,
  ShieldCheck,
  Share2,
  Ambulance,
  Copy,
  Sparkles,
  HeartPulse,
  Activity,
  Zap,
  Pill,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { DecisionSupportBanner } from '@/components/ui/status-badges';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { AnatomicalBodyScan } from '@/components/ui/anatomical-body-scan';
import { SwipeConfirmSlider } from '@/components/ui/swipe-confirm-slider';
import SlideCommit from '@/components/ui/react-bits/SlideCommit';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { GsapCounter } from '@/components/ui/gsap-counter';
import { store, useAppStore } from '@/services/store';
import { AiProvider } from '@/services/mockProviders';
import { generateCaseCapsule } from '@/services/capsule';
import { SeverityLevel } from '@/types';
import { animateScreenEnter } from '@/lib/motion';

export const S8ParamedicLiveCase: React.FC = () => {
  const { cases, activeCaseId } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const [bp, setBp] = React.useState(activeCase?.vitals?.bp || '142/90');
  const [hr, setHr] = React.useState(activeCase?.vitals?.hr?.toString() || '118');
  const [spo2, setSpo2] = React.useState(activeCase?.vitals?.spo2?.toString() || '92');
  const [gcs, setGcs] = React.useState(activeCase?.vitals?.gcs?.toString() || '12');

  const [isAiDrafted, setIsAiDrafted] = React.useState(activeCase?.vitals?.isAiDrafted || false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [transcript, setTranscript] = React.useState('');
  const [isDraftSheetOpen, setIsDraftSheetOpen] = React.useState(false);
  const [copiedSMS, setCopiedSMS] = React.useState(false);

  // Survival clock calculation
  const [elapsedSeconds, setElapsedSeconds] = React.useState(840); // 14 mins

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatSurvivalClock = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const capsule = generateCaseCapsule(
    activeCase?.id || 'GH-2026-8812',
    activeCase?.severity || 'critical',
    activeCase?.lat || 17.4399,
    activeCase?.lng || 78.3982,
    {
      bp,
      hr: parseInt(hr, 10) || 80,
      spo2: parseInt(spo2, 10) || 98,
      gcs: parseInt(gcs, 10) || 15,
    }
  );

  const handleSeverityChange = (newSev: SeverityLevel) => {
    store.updateCaseSeverity(activeCase.id, newSev);
  };

  const handleVitalsBlur = () => {
    store.updateCaseVitals(activeCase.id, {
      bp,
      hr: parseInt(hr, 10) || 80,
      spo2: parseInt(spo2, 10) || 98,
      gcs: parseInt(gcs, 10) || 15,
      isAiDrafted,
    });
  };

  const handleArriving = () => {
    store.updateCaseState(activeCase.id, 'ARRIVED');
    store.setScreen('S9');
  };

  const handleVoiceDraft = async () => {
    setIsRecording(false);
    const draft = await AiProvider.draftHandoff('Blunt chest trauma, BP 142/90, heart rate elevated');
    setTranscript('Blunt chest trauma, BP 142/90, heart rate elevated');
    setBp('142/90');
    setHr('118');
    setSpo2('92');
    setGcs('12');
    setIsAiDrafted(true);
    setIsDraftSheetOpen(true);
  };

  const handleCopySMS = () => {
    navigator.clipboard?.writeText(capsule.smsString);
    setCopiedSMS(true);
    setTimeout(() => setCopiedSMS(false), 3000);
  };

  const handleRequestFamilyDocs = () => {
    store.requestFamilyDocs(activeCase.id);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1340px] mx-auto p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100"
    >
      {/* Top Protocol Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Paramedic Field Telemetry • Unit 04
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Case {activeCase?.id}: Live Patient Biometrics
          </h1>
        </div>

        {/* Golden Hour Survival Clock */}
        <div className="flex items-center gap-3 glass-specular px-4 py-2 rounded-2xl shadow-sm">
          <Timer className="h-5 w-5 text-rose-500 animate-pulse" />
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Golden Hour Clock</span>
            <span className="text-xl font-mono font-black text-rose-600 dark:text-rose-400">
              {formatSurvivalClock(elapsedSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vitals, 3D Scan & Jelly Medications (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Real-time Numeric Vitals Panel */}
          <MivoCard waveArch="top" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-500" />
                <span>Streaming Telemetry Vitals</span>
              </h3>
              {isAiDrafted && (
                <Chip variant="ai" label="AI Extracted (mock)" />
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Blood Pressure */}
              <div className="p-3.5 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Blood Pressure
                </span>
                <input
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  onBlur={handleVitalsBlur}
                  className="w-full text-xl font-mono font-black text-slate-900 dark:text-white bg-transparent focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 font-semibold">mmHg</span>
              </div>

              {/* Heart Rate */}
              <div className="p-3.5 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Heart Rate
                </span>
                <div className="text-xl font-mono font-black text-rose-600 dark:text-rose-400 flex items-baseline gap-1">
                  <GsapCounter end={parseInt(hr, 10) || 118} />
                  <span className="text-[10px] text-slate-400 font-normal">BPM</span>
                </div>
                <span className="text-[10px] text-rose-500 font-bold">Tachycardia</span>
              </div>

              {/* SpO2 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Oxygen SpO2
                </span>
                <div className="text-xl font-mono font-black text-amber-500 flex items-baseline gap-1">
                  <GsapCounter end={parseInt(spo2, 10) || 92} />
                  <span className="text-[10px] text-slate-400 font-normal">%</span>
                </div>
                <span className="text-[10px] text-amber-500 font-bold">Supplemental O2</span>
              </div>

              {/* GCS */}
              <div className="p-3.5 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  GCS Score
                </span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-white flex items-baseline gap-1">
                  <GsapCounter end={parseInt(gcs, 10) || 12} />
                  <span className="text-[10px] text-slate-400 font-normal">/15</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Eye 3, V 4, M 5</span>
              </div>
            </div>
          </MivoCard>

          {/* 3D Anatomical Body Scan & Pain Mapping */}
          <AnatomicalBodyScan
            patientName="Matthew Johnson"
            patientAge="26 old"
            compact={false}
            showTelemetryCards={true}
          />

          {/* Active Jelly Medications Gallery (Generated Asset Showcase) */}
          <MivoCard waveArch="none" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-rose-500" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Active Clinical Medications (3D Jelly Formulations)
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                3 Verified Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Asset Item 1 */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group bg-slate-950/5 dark:bg-white/5 p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/60 dark:border-white/20 shadow-sm">
                  <img
                    src="/assets/mivo-jelly-medications.jpg"
                    alt="Jelly Metformin Lozenge"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">Metformin</span>
                  <span className="text-[10px] text-slate-500">150 mg • Oral Lozenge</span>
                </div>
              </div>

              {/* Asset Item 2 */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group bg-slate-950/5 dark:bg-white/5 p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/60 dark:border-white/20 shadow-sm">
                  <img
                    src="/assets/mivo-jelly-medications.jpg"
                    alt="Amber Ibuprofen Capsule"
                    className="w-full h-full object-cover object-right group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">Ibuprofen</span>
                  <span className="text-[10px] text-slate-500">400 mg • Amber Capsule</span>
                </div>
              </div>

              {/* Asset Item 3 */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group bg-slate-950/5 dark:bg-white/5 p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/60 dark:border-white/20 shadow-sm">
                  <img
                    src="/assets/mivo-jelly-medications.jpg"
                    alt="Sapphire Syrup Droplet"
                    className="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">Salbutamol</span>
                  <span className="text-[10px] text-slate-500">2.5 mg • Nebulized</span>
                </div>
              </div>
            </div>
          </MivoCard>
        </div>

        {/* Right Column: Voice Dictation, Case Capsule & Arrival Slider (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Voice Dictation Card */}
          <MivoCard waveArch="top" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Voice Dictation (F8 & F33)
              </h3>
              <Chip variant="ai" label="Indic Multilingual" />
            </div>

            <button
              type="button"
              onClick={() => {
                if (!isRecording) {
                  setIsRecording(true);
                  setTranscript('Blunt chest trauma, BP 142/90, heart rate elevated, respiratory rate rapid.');
                } else {
                  handleVoiceDraft();
                }
              }}
              className={`w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl font-bold text-xs border transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white border-rose-700 shadow-lg animate-pulse'
                  : 'glass-specular text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-rose-400'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="h-4 w-4 fill-current animate-pulse" />
                  <span>Stop & AI-Draft Handoff</span>
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 text-rose-500" />
                  <span>Dictate Paramedic Note</span>
                </>
              )}
            </button>

            {transcript && (
              <div className="p-3 bg-rose-500/10 dark:bg-rose-500/20 rounded-xl text-xs text-slate-900 dark:text-white border border-rose-500/30 italic">
                "{transcript}"
              </div>
            )}
          </MivoCard>

          {/* Signed Cryptographic Case Capsule */}
          <MivoCard waveArch="none" className="p-5 flex flex-col items-center text-center space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Signed Case Capsule (F6)
              </h4>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <QRCodeSVG value={capsule.jsonString} size={150} />
            </div>

            <div className="w-full space-y-1.5 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                SMS Fallback String:
              </span>
              <div className="p-2.5 bg-slate-950/5 dark:bg-white/5 rounded-xl text-[10px] font-mono break-all text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 select-all">
                {capsule.smsString}
              </div>
              <button
                type="button"
                onClick={handleCopySMS}
                className="w-full py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center justify-center gap-1"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{copiedSMS ? 'Copied to clipboard!' : 'Copy capsule payload'}</span>
              </button>
            </div>
          </MivoCard>

          {/* Request Family Docs Button */}
          <button
            type="button"
            onClick={handleRequestFamilyDocs}
            className="w-full py-3.5 px-4 rounded-2xl glass-specular border border-slate-200 dark:border-white/10 hover:border-rose-400 font-bold text-xs flex items-center justify-center gap-2 text-slate-900 dark:text-white transition-all shadow-sm"
          >
            <Share2 className="h-4 w-4 text-rose-500" />
            <span>
              {activeCase.family_docs_requested ? 'Family link dispatched via SMS' : 'Request Family Documents (SMS)'}
            </span>
          </button>

          {/* Tactile SlideCommit Arrival Confirmation */}
          <div className="pt-2 flex flex-col items-center">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Slide to Handover Patient (Mivo Commit)
            </span>
            <SlideCommit
              label="Slide to Confirm ER Arrival"
              doneLabel="Handover Confirmed • Bay 1"
              onConfirm={() =>
                new Promise<void>((resolve) => {
                  setTimeout(() => {
                    handleArriving();
                    resolve();
                  }, 600);
                })
              }
              trackColor="rgba(15, 23, 42, 0.85)"
              handleColor="#ffffff"
              successColor="#D4FF00"
              width={300}
              height={52}
              radius={26}
            />
          </div>
        </div>
      </div>

      {/* Handoff Draft Bottom Sheet */}
      <BottomSheet
        open={isDraftSheetOpen}
        onOpenChange={setIsDraftSheetOpen}
        title="AI-Drafted Clinical Handoff Card (F8)"
        description="Verify extracted biometrics before confirming transfer."
      >
        <div className="space-y-4 pt-3">
          <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 font-semibold">
            Source: Clinical LLM v2 (mock) • Confidence: 89%
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/10">
              <span className="font-bold text-slate-500">BP:</span>
              <span className="font-black text-slate-900 dark:text-white">{bp}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/10">
              <span className="font-bold text-slate-500">Heart Rate:</span>
              <span className="font-black text-slate-900 dark:text-white">{hr} BPM</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/10">
              <span className="font-bold text-slate-500">SpO2:</span>
              <span className="font-black text-slate-900 dark:text-white">{spo2}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/10">
              <span className="font-bold text-slate-500">GCS Score:</span>
              <span className="font-black text-slate-900 dark:text-white">{gcs}/15</span>
            </div>
          </div>

          <MivoButton
            label="CONFIRM DRAFT VALUES"
            onClick={() => setIsDraftSheetOpen(false)}
            variant="emergency"
            size="md"
            arrowIcon={true}
          />
        </div>
      </BottomSheet>
    </div>
  );
};
