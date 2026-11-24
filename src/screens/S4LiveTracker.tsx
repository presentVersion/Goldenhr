import * as React from 'react';
import {
  Gauge,
  FileText,
  Radio,
  Route,
  Clock,
  Hospital,
  VolumeX,
  Siren,
  Upload,
  Eye,
  HeartPulse,
  Navigation,
  Phone,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { StageStepper, StepItem } from '@/components/ui/stage-stepper';
import { MapWrapper, MapPinItem } from '@/components/ui/map-wrapper';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { AiProvider } from '@/services/mockProviders';
import { animateScreenEnter } from '@/lib/motion';

export const S4LiveTracker: React.FC = () => {
  const { cases, activeCaseId, currentRole, isSilenceActive } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const etaPrediction = AiProvider.predictETA(2.8);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const getStageIndex = () => {
    switch (activeCase?.state) {
      case 'REPORTED':
        return 0;
      case 'DISPATCHED':
        return 1;
      case 'EN_ROUTE':
      case 'PRE_ALERTED':
      case 'ACCEPTED':
        return 2;
      case 'TRIAGE_CONFIRMED':
      case 'ARRIVING':
        return 3;
      case 'ARRIVED':
      case 'HANDED_OVER':
      case 'CLOSED':
      default:
        return 4;
    }
  };

  const steps: StepItem[] = [
    { id: '1', label: 'Reported', sublabel: 'GPS & incident logged', icon: <FileText className="h-4 w-4" /> },
    { id: '2', label: 'Dispatched', sublabel: 'Ambulance 04 en route', icon: <Radio className="h-4 w-4" /> },
    { id: '3', label: 'On the way', sublabel: 'Navigating active traffic', icon: <Route className="h-4 w-4" /> },
    { id: '4', label: 'Arriving', sublabel: 'Crew approaching scene', icon: <Clock className="h-4 w-4" /> },
    { id: '5', label: 'At hospital', sublabel: 'Apollo Jubilee Hills Trauma', icon: <Hospital className="h-4 w-4" /> },
  ];

  const mapPins: MapPinItem[] = [
    {
      id: 'caller',
      lat: activeCase ? activeCase.lat : 17.4399,
      lng: activeCase ? activeCase.lng : 78.3982,
      title: 'You are here',
      subtitle: activeCase ? activeCase.location_name : 'Patient Location',
      type: 'caller',
    },
    {
      id: 'amb',
      lat: 17.4365,
      lng: 78.4025,
      title: '1st Responder (Emily Dayton)',
      subtitle: `${etaPrediction.etaMinutes} min away`,
      type: 'ambulance',
    },
  ];

  const routeLine: [number, number][] = [
    [17.4365, 78.4025],
    [17.4380, 78.4010],
    [activeCase ? activeCase.lat : 17.4399, activeCase ? activeCase.lng : 78.3982],
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[540px] mx-auto px-4 py-6 pb-24 flex flex-col space-y-5"
    >
      {/* Header Info (Matching Reference Image 3 Right Phone) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Live Responder Stream • Case {activeCase?.id}
            </span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
            High Priority Dispatch
          </span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
          Ambulance and responders are on a way
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          Speak calmly to the person until the first aider arrives. First responders are on the way and the Rescue service is alarmed.
        </p>
        <button
          type="button"
          onClick={() => store.setScreen('S3')}
          className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline inline-block"
        >
          Open full instruction →
        </button>
      </div>

      {/* Raised ETA & Telemetry Card */}
      <MivoCard waveArch="top" className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-rose-500" />
              <span>Estimated Arrival Time (F30)</span>
            </span>
            <div className="text-4xl font-black numeric text-slate-900 dark:text-white tracking-tight mt-1">
              {etaPrediction.etaMinutes} <span className="text-lg font-bold text-rose-600 dark:text-rose-400">min</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Expected at scene in 04:30
            </div>
          </div>

          <Chip
            variant="ai"
            label="ETA Model v0"
            confidence={etaPrediction.confidence}
            source="gradient-boosted"
          />
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-rose-500" />
            <span>Range: {etaPrediction.rangeMin} to {etaPrediction.rangeMax} min</span>
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Satellite GPS Hook</span>
          </span>
        </div>
      </MivoCard>

      {/* Silence Alarm Alert */}
      {isSilenceActive && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border-l-4 border-l-amber-500 border border-amber-500/30 shadow-sm flex items-center gap-3">
          <VolumeX className="h-5 w-5 text-amber-600 flex-shrink-0 animate-pulse" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Silence Alarm Triggered (F7)</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              No telemetry packet received for 40 s. Estimated position computed along last known route.
            </p>
          </div>
        </div>
      )}

      {/* Unframed 3D Aerodynamic Rapid Transit Evacuation Unit (Hero Asset Showcase) */}
      <div className="relative my-2 space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-rose-600 dark:text-rose-400 font-mono text-[11px] font-black border border-rose-500/30 shadow-lg backdrop-blur-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            3D Rapid Transit Evacuation Unit
          </span>
          <span className="px-3 py-1.5 rounded-full bg-[#D4FF00] text-slate-950 font-mono text-[11px] font-black shadow-lg">
            GREEN CORRIDOR ACTIVE
          </span>
        </div>

        {/* Unconstrained 3D Asset Container */}
        <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/15 bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-slate-900/10 dark:from-slate-900 dark:to-slate-950 group">
          <img
            src="/assets/mivo-ambulance-transit-3d.jpg"
            alt="3D Emergency ICU Ambulance & Transit Unit"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Floating Telemetry Badges - Clean Floating Stadium Pills */}
          <div className="absolute bottom-3 left-3 z-10">
            <div className="flex items-center gap-2 bg-slate-950/85 text-white backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/20 shadow-xl text-xs font-mono">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              <span>Speed: 68 km/h</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-10">
            <span className="bg-white/90 dark:bg-slate-900/90 text-slate-950 dark:text-white font-mono font-black px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/20 shadow-xl text-[11px] backdrop-blur-xl">
              Cardiohelp Air & Ground
            </span>
          </div>
        </div>
      </div>

      {/* Live Interactive Map with Full Route (Reference Image 3) */}
      <div className="space-y-2">
        <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg relative h-64 bg-slate-950/5">
          <MapWrapper
            center={[17.4385, 78.4005]}
            zoom={14}
            pins={mapPins}
            routePolyline={routeLine}
            height="100%"
          />

          {/* Overlaid Floating Responder Card (Reference Image 3: Emily Dayton 1st Responder) */}
          <div className="absolute bottom-3 inset-x-3 z-30">
            <div className="glass-specular p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-md shrink-0">
                  ED
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Emily Dayton
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>1st Responder (5 min away)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call & Message */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => alert('Dialing First Responder Emily Dayton (+91 98765 00012)...')}
                  className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Opening encrypted message channel to First Responder...')}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 font-bold text-xs flex items-center gap-1 border border-slate-200 dark:border-white/10 shadow-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Progression Stepper */}
      <MivoCard waveArch="none" className="p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Emergency Response Progression
        </h3>
        <StageStepper
          steps={steps}
          currentStepIndex={getStageIndex()}
          orientation="vertical"
        />
      </MivoCard>

      {/* Action Row */}
      <div className="space-y-3 pt-1">
        {currentRole === 'bystander' && (
          <MivoButton
            label="OPEN FIRST-AID STEPS (SCENE GUIDE)"
            sublabel="CPR metronome & bleeding control"
            onClick={() => store.setScreen('S3')}
            variant="emergency"
            size="md"
            arrowIcon={true}
          />
        )}

        {(currentRole === 'family' || activeCase?.family_docs_requested) && (
          <MivoButton
            label="UPLOAD PATIENT DOCUMENTS FOR FAST-TRACK"
            sublabel="Ayushman Bharat PMJAY, ID, or prior ECG"
            onClick={() => store.setScreen('S5')}
            variant="primary"
            size="md"
            arrowIcon={true}
          />
        )}
      </div>

      {/* Footer Link to S25 */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={() => store.setScreen('S25')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Eye className="h-3.5 w-3.5 text-rose-500" />
          <span>Who viewed my information? (Access Log)</span>
        </button>
      </div>
    </div>
  );
};
