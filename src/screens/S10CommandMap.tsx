import * as React from 'react';
import {
  Radio,
  Siren,
  Route,
  Lock,
  Layers,
  TrendingUp,
  UserCheck,
  VolumeX,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Activity,
  HeartPulse,
  Heart,
  CarFront,
  Flame,
  X,
  Check,
  ChevronRight,
  Plane,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { CountdownRing } from '@/components/ui/countdown-ring';
import { MapWrapper, MapPinItem } from '@/components/ui/map-wrapper';
import { AnatomicalBodyScan } from '@/components/ui/anatomical-body-scan';
import { SwipeConfirmSlider } from '@/components/ui/swipe-confirm-slider';
import SlideCommit from '@/components/ui/react-bits/SlideCommit';
import SwipeRow from '@/components/ui/react-bits/SwipeRow';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick02Icon, Delete02Icon } from '@hugeicons/core-free-icons';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S10CommandMap: React.FC = () => {
  const { cases, activeCaseId, hospitals, volunteers, resources, isSilenceActive } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [selectedCaseId, setSelectedCaseId] = React.useState(activeCaseId || cases[0]?.id);
  const [showResourceLayer, setShowResourceLayer] = React.useState(true);
  const [bayHoldSeconds, setBayHoldSeconds] = React.useState(85);
  const [showTraumaTwin, setShowTraumaTwin] = React.useState(true);
  const [vehicleType, setVehicleType] = React.useState<'heli' | 'ambulance'>('heli');

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
    const interval = setInterval(() => {
      setBayHoldSeconds((prev) => (prev > 0 ? prev - 1 : 90));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    store.setActiveCase(id);
  };

  const handleDispatch = () => {
    if (activeCase) {
      store.updateCaseState(activeCase.id, 'DISPATCHED');
    }
  };

  const handleLockBay = () => {
    store.lockBay('bay-1');
  };

  const handleToggleSilence = () => {
    store.toggleSilenceAlarm(!isSilenceActive);
  };

  const mapPins: MapPinItem[] = [
    ...hospitals.map((h) => ({
      id: h.id,
      lat: h.lat,
      lng: h.lng,
      title: h.name,
      subtitle: `Free ER Beds: ${h.freeBeds}/${h.totalBeds}`,
      type: 'hospital' as const,
      status: (h.freeBeds > 2 ? 'ready' : h.freeBeds > 0 ? 'watch' : 'critical') as 'ready' | 'watch' | 'critical',
    })),
    {
      id: 'caller',
      lat: activeCase ? activeCase.lat : 17.4399,
      lng: activeCase ? activeCase.lng : 78.3982,
      title: activeCase?.location_name || 'Emergency Site',
      subtitle: `${activeCase?.severity.toUpperCase()} • ${activeCase?.id}`,
      type: 'caller' as const,
    },
    {
      id: 'amb-04',
      lat: 17.4365,
      lng: 78.4025,
      title: 'Ambulance 04',
      subtitle: 'En route with live GPS',
      type: 'ambulance' as const,
    },
  ];

  if (showResourceLayer) {
    resources.forEach((r) => {
      mapPins.push({
        id: r.id,
        lat: r.lat,
        lng: r.lng,
        title: r.name,
        subtitle: `Resource: ${r.type.toUpperCase()}`,
        type: 'resource' as const,
        status: r.status,
      });
    });

    volunteers.forEach((v) => {
      if (v.on_duty) {
        mapPins.push({
          id: v.id,
          lat: v.lat,
          lng: v.lng,
          title: v.name,
          subtitle: `BLS Responder • ${v.area}`,
          type: 'volunteer' as const,
        });
      }
    });
  }

  const routeLine: [number, number][] = [
    [17.4365, 78.4025],
    [17.4380, 78.4010],
    [activeCase ? activeCase.lat : 17.4399, activeCase ? activeCase.lng : 78.3982],
  ];

  // Dr+ Reference Incident Triage Categories (Reference Image 2)
  const triageCategories = [
    {
      category: 'Heart Attack',
      items: [{ name: 'Cardiac Arrest / STEMI', time: '15 min', active: true }],
    },
    {
      category: 'Car Accident',
      items: [
        { name: 'Brain Concussion', time: '5 min', active: true },
        { name: 'Arm Fracture', time: '49 min', active: false },
      ],
    },
    {
      category: 'Animal Attack',
      items: [
        { name: 'Leg Injury', time: '12 min', active: true },
        { name: 'Facial Dissection', time: '25 min', active: false },
        { name: 'Arterial Bleed', time: '8 min', active: false },
      ],
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-72px)] bg-slate-100 dark:bg-[#070b12] text-slate-900 dark:text-slate-100 flex flex-col overflow-hidden transition-colors"
    >
      {/* Top Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] rounded-full bg-rose-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Top HUD Telemetry Bar (Dr+ Reference Image 2) */}
      <div className="relative z-10 h-16 border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">Dr+</span>
            <span className="text-base font-bold text-slate-900 dark:text-white">Ambulance Control Centre</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-white/10">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">6</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">New Calls</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">12</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Free Ambulance</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleSilence}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
              isSilenceActive
                ? 'text-amber-700 bg-amber-500/20 border-amber-500/50'
                : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <VolumeX className="h-3.5 w-3.5" />
            <span>{isSilenceActive ? 'Silence Alarm Active (F7)' : 'Test Silence Alarm'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResourceLayer(!showResourceLayer)}
            className="px-3 py-1.5 rounded-full text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 flex items-center gap-1.5"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Resources Layer (F25)</span>
          </button>
        </div>
      </div>

      {/* Main 3-Zone Palantir-Grade Layout (Dr+ Reference Image 2) */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Zone: Emergency Queue (3 cols) */}
        <div className="lg:col-span-3 border-r border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-136px)]">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-rose-500" />
              <span>Incident Radar Queue</span>
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20">
              {cases.length} LIVE
            </span>
          </div>

          <div className="space-y-2.5">
            {cases.map((c) => {
              const isSelected = c.id === selectedCaseId;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCase(c.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-500 bg-white dark:bg-slate-800 shadow-md ring-1 ring-rose-500/40'
                      : 'border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">{c.id}</span>
                    <Chip
                      variant={c.severity === 'critical' ? 'critical' : c.severity === 'watch' ? 'watch' : 'ready'}
                      label={c.severity.toUpperCase()}
                    />
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{c.location_name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                    <span>State: <strong className="text-slate-900 dark:text-white">{c.state}</strong></span>
                    <span className="flex items-center gap-1 font-mono text-rose-500">
                      <Clock className="h-3 w-3" />
                      <span>14 min ago</span>
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">ESI-2 Triage Priority</span>
                    <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                      8 min ETA
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centre Zone: Interactive Map & Floating Dr+ Trauma Twin (6 cols) */}
        <div className="lg:col-span-6 relative p-3 flex flex-col justify-between overflow-hidden">
          <div className="relative flex-1 w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg min-h-[440px] bg-slate-950/5">
            <MapWrapper
              center={[17.4385, 78.4005]}
              zoom={14}
              pins={mapPins}
              routePolyline={routeLine}
              height="100%"
            />

            {/* Map Top Action Pills */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowTraumaTwin(!showTraumaTwin)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl border transition-all ${
                  showTraumaTwin
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-500/30'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white border-slate-200 dark:border-white/20'
                }`}
              >
                {showTraumaTwin ? 'Hide 3D Trauma Twin' : 'Show 3D Trauma Twin (Dr+)'}
              </button>
            </div>

            {/* Floating Central Liquid Glass Trauma Twin Card (Dr+ Reference Image 2) */}
            {showTraumaTwin && (
              <div className="absolute top-12 left-3 right-3 md:left-auto md:right-3 z-20 md:w-[410px] max-h-[calc(100%-60px)] overflow-y-auto animate-fade-in shadow-2xl rounded-3xl">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTraumaTwin(false)}
                    className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <AnatomicalBodyScan
                    patientName="Matthew Johnson"
                    patientAge="26 old"
                    compact={true}
                    showTelemetryCards={true}
                    className="shadow-2xl border-white/60 dark:border-white/20"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sticky Tactical Fleet & Dispatch Bar (Direct Dr+ Reference Image 2) */}
          <div className="mt-3 p-4 rounded-3xl glass-specular flex flex-col gap-3">
            {/* Choose Ambulance Section */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Choose Ambulance:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setVehicleType('heli')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all ${
                    vehicleType === 'heli'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30 ring-2 ring-amber-400/50'
                      : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Cardiohelp Heli</span>
                  <span className="text-[10px] opacity-80 font-normal">3 Free</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleType('ambulance')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all ${
                    vehicleType === 'ambulance'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 ring-2 ring-rose-500/50'
                      : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Cardiohelp Mobile ICU</span>
                  <span className="text-[10px] opacity-80 font-normal">1 Free</span>
                </button>
              </div>
            </div>

            {/* Tactile SlideCommit Dispatch Confirmation (Dr+ Master Spec) */}
            <div className="flex flex-col items-center pt-1">
              <SlideCommit
                label={activeCase?.state === 'REPORTED' ? 'Slide to Confirm Dispatch' : 'Slide to Update Route'}
                doneLabel="Unit Dispatched • Route Locked"
                onConfirm={() =>
                  new Promise<void>((resolve) => {
                    handleDispatch();
                    setTimeout(resolve, 600);
                  })
                }
                trackColor="rgba(15, 23, 42, 0.85)"
                handleColor="#ffffff"
                successColor="#D4FF00"
                dangerColor="#f43f5e"
                width={280}
                height={52}
                radius={26}
              />
            </div>
          </div>
        </div>

        {/* Right Zone: Dr+ Triage Cases List & Hospitals (3 cols) */}
        <div className="lg:col-span-3 border-l border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-136px)]">
          {/* Triage Cases with Interactive SwipeRow (Dr+ Reference Image 2) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Triage Incidents
              </h4>
              <span className="text-[10px] text-rose-500 font-mono font-bold">Swipe to Dispatch</span>
            </div>

            {triageCategories.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                  {cat.category}
                </span>
                <div className="space-y-1.5">
                  {cat.items.map((item, itemIdx) => {
                    const mins = parseInt(item.time, 10) || 15;
                    const ringOffset = 75.4 - (Math.min(60, mins) / 60) * 75.4;
                    const barWidth = Math.min(100, Math.max(12, (mins / 60) * 100));

                    return (
                      <SwipeRow
                        key={itemIdx}
                        actions={[
                          {
                            id: 'dispatch',
                            label: 'Dispatch',
                            icon: <HugeiconsIcon icon={Tick02Icon} size={18} />,
                          },
                          {
                            id: 'defer',
                            label: 'Defer',
                            icon: <HugeiconsIcon icon={Delete02Icon} size={18} />,
                            dismiss: true,
                          },
                        ]}
                        onAction={(action: any) => {
                          console.log('Action selected:', action.id, item.name);
                        }}
                        onCommit={(action: any) => {
                          console.log('Committed action:', action.id, item.name);
                        }}
                        actionColor="#10b981"
                        drawerColor="#1e293b"
                        rowColor="rgba(255, 255, 255, 0.9)"
                        textColor="#0f172a"
                        height={54}
                        radius={16}
                        actionWidth={72}
                        direction="left"
                        fullSwipe
                      >
                        <div className="w-full h-full px-3 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 truncate flex-1 min-w-0 pr-2">
                            {item.active ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                            )}
                            <span className="font-bold text-slate-900 truncate">
                              {item.name}
                            </span>
                          </div>

                          {/* Live Animated Golden-Minute Ring & Bar */}
                          <div className="flex items-center gap-2 shrink-0">
                            {/* Animated SVG Progress Ring */}
                            <div className="relative w-6 h-6 flex items-center justify-center">
                              <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                                <circle
                                  cx="16"
                                  cy="16"
                                  r="12"
                                  fill="none"
                                  stroke="#e2e8f0"
                                  strokeWidth="2.5"
                                />
                                <circle
                                  cx="16"
                                  cy="16"
                                  r="12"
                                  fill="none"
                                  stroke={item.active ? '#f43f5e' : '#0284c7'}
                                  strokeWidth="2.8"
                                  strokeDasharray="75.4"
                                  strokeDashoffset={ringOffset}
                                  strokeLinecap="round"
                                  className="transition-all duration-1000 animate-pulse"
                                />
                              </svg>
                              <span className="absolute text-[8px] font-mono font-black text-slate-700">
                                {mins}
                              </span>
                            </div>

                            {/* Live Countdown Progress Bar */}
                            <div className="flex flex-col items-end">
                              <span
                                className={`text-[10px] font-mono font-black ${
                                  item.active ? 'text-rose-600 animate-pulse' : 'text-slate-600'
                                }`}
                              >
                                {item.time}
                              </span>
                              <div className="w-12 h-1 rounded-full bg-slate-200 overflow-hidden mt-0.5">
                                <div
                                  className={`h-full rounded-full transition-all duration-700 ${
                                    item.active
                                      ? 'bg-gradient-to-r from-rose-500 to-amber-400 animate-pulse'
                                      : 'bg-sky-500'
                                  }`}
                                  style={{ width: `${barWidth}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwipeRow>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Receiving Bays */}
          <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Ranked Receiving Bays
              </h4>
              <Chip variant="ai" label="ETA + Beds" />
            </div>

            <div className="space-y-1.5">
              {hospitals.map((h, i) => (
                <div
                  key={h.id}
                  className={`p-3 rounded-2xl border text-xs transition-all ${
                    i === 0
                      ? 'border-rose-400 bg-white dark:bg-slate-800 shadow-sm'
                      : 'border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="truncate text-slate-900 dark:text-white">{h.name}</span>
                    <span className="numeric text-rose-500 ml-1">{i === 0 ? '7-9 min' : '14 min'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] mt-1">
                    <span className="text-slate-500">{h.freeBeds} Free Bays</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {i === 0 ? 'Optimal Match' : 'Secondary'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bay Lock Countdown */}
          <div className="p-4 rounded-2xl glass-specular space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">Trauma Bay Hold (F20)</h5>
                <p className="text-[11px] text-rose-500 font-mono">Trauma Bay 1 • Apollo Jubilee</p>
              </div>
              <CountdownRing
                remainingSeconds={bayHoldSeconds}
                totalSeconds={90}
                size="sm"
              />
            </div>

            <MivoButton
              label="CONFIRM BAY LOCK"
              onClick={handleLockBay}
              variant="emergency"
              size="sm"
              arrowIcon={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
