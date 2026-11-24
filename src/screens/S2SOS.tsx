import * as React from 'react';
import {
  Siren,
  MapPin,
  CircleOff,
  HeartCrack,
  CarFront,
  Wind,
  Mic,
  Square,
  Languages,
  ArrowRight,
  Sparkles,
  Activity,
  CheckCircle2,
  Radio,
  Sliders,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { SegmentedControl, SegmentOption } from '@/components/ui/segmented-control';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { AnatomicalBodyScan } from '@/components/ui/anatomical-body-scan';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoSeveritySlider } from '@/components/ui/mivo-severity-slider';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import SlideCommit from '@/components/ui/react-bits/SlideCommit';
import { store, useAppStore } from '@/services/store';
import { SpeechProvider } from '@/services/mockProviders';
import { animateScreenEnter } from '@/lib/motion';

type EmergencyType = 'unconscious' | 'chest_pain' | 'accident' | 'breathing';

export const S2SOS: React.FC = () => {
  const { currentLanguage, landmarks, connectionStatus } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [emergencyType, setEmergencyType] = React.useState<EmergencyType>('accident');
  const [severityVal, setSeverityVal] = React.useState<number>(8);
  const [hasVoiceAiSuggestion, setHasVoiceAiSuggestion] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordDuration, setRecordDuration] = React.useState(0);
  const [voiceTranscript, setVoiceTranscript] = React.useState('');

  const [breathingNormally, setBreathingNormally] = React.useState(false);
  const [responsive, setResponsive] = React.useState(false);
  const [heavyBleeding, setHeavyBleeding] = React.useState(true);

  const [locationName, setLocationName] = React.useState('Durgam Cheruvu Flyover Junction (±12 m)');
  const [isLandmarkPickerOpen, setIsLandmarkPickerOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const mappedZoneId =
    emergencyType === 'chest_pain'
      ? 'chest'
      : emergencyType === 'unconscious'
      ? 'head'
      : emergencyType === 'breathing'
      ? 'throat'
      : 'spine';

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  // Recording timer
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggleRecord = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordDuration(0);
    } else {
      setIsRecording(false);
      const res = await SpeechProvider.transcribeAudio(new Blob(), currentLanguage);
      setVoiceTranscript(res.transcript);
      setHasVoiceAiSuggestion(true);
      setEmergencyType('accident');
    }
  };

  const handleSOSSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      store.createCase({
        severity: !responsive || heavyBleeding || severityVal >= 8 ? 'critical' : 'watch',
        lat: 17.4399,
        lng: 78.3982,
        location_name: locationName,
        location_source: 'gps',
        symptoms_summary: `${emergencyType.replace('_', ' ').toUpperCase()} • Severity: ${severityVal}/10 • ${
          voiceTranscript || 'Immediate field dispatch'
        }`,
        caller_answers: {
          breathingNormally,
          responsive,
          heavyBleeding,
          voiceTranscript,
        },
      });
      setIsSubmitting(false);
    }, 400);
  };

  const emergencyOptions: SegmentOption<EmergencyType>[] = [
    { value: 'unconscious', label: 'Unconscious', icon: <CircleOff className="h-4 w-4" /> },
    { value: 'chest_pain', label: 'Chest Pain', icon: <HeartCrack className="h-4 w-4" /> },
    { value: 'accident', label: 'Accident', icon: <CarFront className="h-4 w-4" /> },
    { value: 'breathing', label: 'Breathing', icon: <Wind className="h-4 w-4" /> },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[560px] mx-auto px-4 py-6 pb-32 md:pb-16 flex flex-col space-y-6"
    >
      {/* Radiant Glow Pools */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />

      {/* Header with Welcome & Language Selector (Reference Image 3 Center Phone) */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Welcome back, Jenifer Pilman
          </span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            Are you in emergency?
          </h1>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 shadow-xs backdrop-blur-md">
          <Languages className="h-3.5 w-3.5 text-rose-500" />
          <select
            value={currentLanguage}
            onChange={(e) => store.setLanguage(e.target.value as 'en' | 'te' | 'hi')}
            className="bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            aria-label="Select Language"
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </div>

      {/* Hero Radiant Multi-Ring Pulsating SOS Beacon (Reference Image 3 Center Phone) */}
      <div className="relative z-10 flex flex-col items-center justify-center py-4">
        <div className="relative flex items-center justify-center w-52 h-52">
          {/* Outermost shockwave ring */}
          <div className="absolute inset-0 rounded-full bg-rose-500/10 dark:bg-rose-500/20 animate-ping opacity-60" />
          
          {/* Secondary pulsating ripple */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-rose-500/20 to-amber-500/20 dark:from-rose-500/30 dark:to-amber-500/30 animate-pulse blur-xs" />

          {/* Tertiary frosted glass bezel ring */}
          <div className="absolute inset-8 rounded-full border border-white/80 dark:border-white/20 shadow-xl bg-white/30 dark:bg-slate-900/40 backdrop-blur-md" />

          {/* Center Tactical SOS Button */}
          <button
            type="button"
            onClick={handleSOSSubmit}
            disabled={isSubmitting}
            className="relative z-20 w-32 h-32 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black tracking-widest text-2xl shadow-[0_8px_32px_rgba(244,63,94,0.5)] active:scale-95 transition-all flex flex-col items-center justify-center border-2 border-white/80"
          >
            <span>SOS</span>
            <span className="text-[10px] tracking-normal font-bold opacity-80 mt-0.5">TAP ONCE</span>
          </button>
        </div>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Press the button above, help will reach you immediately.
        </p>
      </div>

      {/* Location Radar Card (Reference Image 3: Your current address) */}
      <div className="relative z-10 glass-specular p-4 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-full bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center text-rose-500 border border-rose-500/30 flex-shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="truncate">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Your Current Location</span>
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{locationName}</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>High Precision GPS Fix (±12 m)</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsLandmarkPickerOpen(true)}
          className="text-xs font-bold text-slate-900 dark:text-white bg-white/80 dark:bg-slate-800/80 hover:bg-white px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-xs transition-all flex-shrink-0"
        >
          Change
        </button>
      </div>

      {/* Emergency Type Selector */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            What is happening?
          </h3>
          {hasVoiceAiSuggestion && (
            <Chip
              variant="ai"
              label="Pre-selected from voice note"
              className="text-[10px]"
            />
          )}
        </div>
        <SegmentedControl<EmergencyType>
          options={emergencyOptions}
          value={emergencyType}
          onChange={setEmergencyType}
        />

        {/* 3D Anatomical Trauma Scanner (Always Visible Hero - Never Hidden in Dropdowns) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Live 3D Trauma Twin • Tap Hotspots to Target Pain
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Active Zone: {mappedZoneId.toUpperCase()}
            </span>
          </div>

          <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/10 bg-gradient-to-b from-white/80 via-white/40 to-transparent dark:from-slate-900/80 dark:via-slate-950/40 backdrop-blur-xl">
            <AnatomicalBodyScan
              patientName="Emergency Patient Scan"
              patientAge="Active Trauma"
              activeZoneId={mappedZoneId}
              onZoneSelect={(zone) => {
                setSeverityVal(zone.severity);
                if (zone.category === 'cardiac') setEmergencyType('chest_pain');
                else if (zone.category === 'cranial') setEmergencyType('unconscious');
                else if (zone.category === 'respiratory') setEmergencyType('breathing');
                else setEmergencyType('accident');
              }}
              compact={false}
              showTelemetryCards={true}
            />
          </div>
        </div>
      </div>

      {/* Mivo Tactile Symptom Severity Slider */}
      <div className="relative z-10 p-4 rounded-2xl glass-specular shadow-sm">
        <MivoSeveritySlider
          value={severityVal}
          onChange={setSeverityVal}
          label="Triage Severity Rating"
        />
      </div>

      {/* Quick Bystander Checks */}
      <div className="relative z-10 space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Quick Bystander Checks
        </h3>

        <div className="space-y-2 glass-specular p-4 rounded-2xl">
          <label className="flex items-center justify-between cursor-pointer py-1 group">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 transition-colors">
              Breathing normally?
            </span>
            <input
              type="checkbox"
              checked={breathingNormally}
              onChange={(e) => setBreathingNormally(e.target.checked)}
              className="h-5 w-5 rounded-md border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-1 border-t border-slate-200/60 dark:border-white/10 group">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 transition-colors">
              Responsive & awake?
            </span>
            <input
              type="checkbox"
              checked={responsive}
              onChange={(e) => setResponsive(e.target.checked)}
              className="h-5 w-5 rounded-md border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-1 border-t border-slate-200/60 dark:border-white/10 group">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 group-hover:text-rose-700 transition-colors">
              Heavy active bleeding?
            </span>
            <input
              type="checkbox"
              checked={heavyBleeding}
              onChange={(e) => setHeavyBleeding(e.target.checked)}
              className="h-5 w-5 rounded-md border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
            />
          </label>
        </div>
      </div>

      {/* Voice Note with Live Visualizer */}
      <div className="relative z-10 space-y-2">
        <button
          type="button"
          onClick={handleToggleRecord}
          className={`w-full flex items-center justify-center gap-3 p-3.5 rounded-2xl border transition-all ${
            isRecording
              ? 'bg-rose-600 text-white border-rose-700 shadow-lg animate-pulse'
              : 'glass-specular text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-rose-400'
          }`}
        >
          {isRecording ? (
            <>
              <Square className="h-4 w-4 fill-current" />
              <span className="text-xs font-bold">Recording Voice ({recordDuration}s) — Tap to Finish</span>
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-bold">
                {voiceTranscript ? 'Re-record Voice Note' : 'Record Voice Note (Telugu, Hindi, English)'}
              </span>
            </>
          )}
        </button>

        {isRecording && (
          <div className="flex items-center justify-center gap-1.5 py-1.5">
            {[40, 75, 90, 50, 100, 65, 85, 45, 95, 60].map((h, i) => (
              <span
                key={i}
                className="w-1.5 bg-rose-600 rounded-full animate-pulse"
                style={{ height: `${h * 0.28}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {voiceTranscript && (
          <div className="p-3 bg-rose-500/10 dark:bg-rose-500/20 rounded-xl border border-rose-500/30 text-xs text-slate-900 dark:text-white flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <span className="font-bold text-[10px] uppercase text-rose-600 dark:text-rose-300 block">AI Transcript (mock)</span>
              <span className="italic">"{voiceTranscript}"</span>
            </div>
          </div>
        )}
      </div>

      {/* Offline Alert fallback message */}
      {connectionStatus === 'offline' && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          Device offline. Case will queue and dispatch via SMS fallback automatically.
        </div>
      )}

      {/* Sticky Bottom Action Rail with Tactile SlideCommit & Stadium Button */}
      <div className="fixed md:static bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-slate-950/95 md:bg-transparent backdrop-blur-xl border-t md:border-t-0 border-slate-200 dark:border-white/10 z-30 shadow-lg md:shadow-none space-y-3">
        <MivoButton
          label="TAP TO DISPATCH HELP NOW"
          sublabel="Streams GPS coordinates directly to Ambulance 04"
          onClick={handleSOSSubmit}
          loading={isSubmitting}
          variant="emergency"
          size="lg"
          arrowIcon={true}
        />

        <div className="flex flex-col items-center justify-center pt-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Or Slide to Dispatch (Tactile Commit)
          </span>
          <SlideCommit
            label="Slide to Dispatch 108 Ambulance"
            doneLabel="Ambulance Dispatched"
            onConfirm={() =>
              new Promise<void>((resolve) => {
                handleSOSSubmit();
                setTimeout(resolve, 800);
              })
            }
            trackColor="rgba(15, 23, 42, 0.85)"
            handleColor="#ffffff"
            successColor="#D4FF00"
            dangerColor="#f43f5e"
            width={320}
            height={52}
            radius={26}
          />
        </div>
      </div>

      {/* Landmark Bottom Sheet (F3) */}
      <BottomSheet
        open={isLandmarkPickerOpen}
        onOpenChange={setIsLandmarkPickerOpen}
        title="Nearby Landmark Anchors (F3)"
        description="Select a recognized junction or public landmark to assist rapid ambulance routing"
      >
        <div className="space-y-2.5 pt-2">
          {landmarks.map((lm) => (
            <button
              key={lm.id}
              type="button"
              onClick={() => {
                setLocationName(lm.name);
                setIsLandmarkPickerOpen(false);
              }}
              className="w-full text-left p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                  {lm.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Aliases: {lm.aliases.join(', ') || 'Emergency landmark'}
                </div>
              </div>
              <MapPin className="h-4 w-4 text-rose-500 flex-shrink-0" />
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};
