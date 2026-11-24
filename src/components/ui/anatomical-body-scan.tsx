import React, { useState } from 'react';
import { Heart, Activity, Pill, ShieldAlert, Sparkles, Layers, Crosshair, Stethoscope, Eye, Flame, Disc } from 'lucide-react';
import { MivoSeveritySlider } from './mivo-severity-slider';
import { MivoPillTag } from './mivo-pill-tag';

export interface TraumaZone {
  id: string;
  name: string;
  severity: number; // 1-10
  description: string;
  category: 'cardiac' | 'cranial' | 'respiratory' | 'skeletal' | 'vascular';
  x: number; // % from left in visual
  y: number; // % from top in visual
  labelNote?: string;
}

interface AnatomicalBodyScanProps {
  patientName?: string;
  patientAge?: string | number;
  activeZoneId?: string;
  onZoneSelect?: (zone: TraumaZone) => void;
  showTelemetryCards?: boolean;
  interactive?: boolean;
  compact?: boolean;
  className?: string;
}

const DEFAULT_ZONES: TraumaZone[] = [
  { id: 'throat', name: 'Pharynx / Airway', severity: 7, description: 'Partial airway resistance, stridor, 7/10 throat pain', category: 'respiratory', x: 50, y: 32, labelNote: '7/10 throat pain' },
  { id: 'chest', name: 'Cardiac / Thoracic Wall', severity: 9, description: 'STEMI anterior lead elevation, crushing substernal pain', category: 'cardiac', x: 50, y: 44, labelNote: 'Cardiac ischemia' },
  { id: 'head', name: 'Cranial / Occipital', severity: 5, description: 'Mild concussion, reactive pupils, dull headache', category: 'cranial', x: 50, y: 16, labelNote: 'Cranial trauma' },
  { id: 'spine', name: 'Cervical / Thoracic Spine', severity: 6, description: 'C4-C5 hyperextension tenderness, collar immobilized', category: 'skeletal', x: 50, y: 38, labelNote: 'Spinal stability' },
  { id: 'abdomen', name: 'Abdominal Cavity', severity: 4, description: 'Soft, non-distended, no peritoneal signs', category: 'vascular', x: 50, y: 62, labelNote: 'Hemodynamic check' },
];

export const AnatomicalBodyScan: React.FC<AnatomicalBodyScanProps> = ({
  patientName = 'Matthew Johnson',
  patientAge = '26 old',
  activeZoneId: externalActiveZone,
  onZoneSelect,
  showTelemetryCards = true,
  interactive = true,
  compact = false,
  className = '',
}) => {
  const [internalActiveZone, setInternalActiveZone] = useState<string>(externalActiveZone || 'throat');
  const [severityVal, setSeverityVal] = useState<number>(7);
  const [activeTags, setActiveTags] = useState<string[]>(['Sore throat', 'Dull headache', 'Dry cough']);
  const [visualMode, setVisualMode] = useState<'3d' | 'vector'>('3d');

  const activeZone = DEFAULT_ZONES.find((z) => z.id === (externalActiveZone || internalActiveZone)) || DEFAULT_ZONES[0];

  const handleSelectZone = (zone: TraumaZone) => {
    if (!interactive) return;
    setInternalActiveZone(zone.id);
    setSeverityVal(zone.severity);
    if (onZoneSelect) onZoneSelect(zone);
  };

  const removeTag = (tagToRemove: string) => {
    setActiveTags(activeTags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/95 via-rose-50/40 to-slate-50/90 dark:from-slate-900/95 dark:via-rose-950/20 dark:to-slate-950/95 p-6 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-2xl transition-all ${className}`}>
      {/* Radiant ambient glow matching reference Mivo & Dr+ */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-10 right-0 w-64 h-64 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      {/* Header Info & View Mode Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs shadow-inner">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </span>
            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {patientName}
            </h3>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-9">
            {patientAge} • Biometric Trauma Twin
          </p>
        </div>

        {/* View Mode & Severity Dial */}
        <div className="flex items-center gap-2">
          {/* 3D vs Vector Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setVisualMode('3d')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
                visualMode === '3d'
                  ? 'bg-white dark:bg-rose-500 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-rose-500 dark:text-white" />
              3D Twin
            </button>
            <button
              type="button"
              onClick={() => setVisualMode('vector')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
                visualMode === 'vector'
                  ? 'bg-white dark:bg-rose-500 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3 text-amber-500 dark:text-white" />
              Vector Mesh
            </button>
          </div>

          {/* Severity Dial Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-rose-200/60 dark:border-rose-900/40 shadow-sm">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
              {severityVal}/10
            </span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 capitalize">
              {activeZone.name.split('/')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Telemetry Card (Desktop Dr+ style) */}
        {showTelemetryCards && !compact && (
          <div className="hidden md:flex md:col-span-3 flex-col gap-3">
            {/* Arterial Pressure Card with Dual Waveform */}
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-bold uppercase tracking-wider text-[10px]">Pressure</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Activity className="w-3 h-3" /> Invasive
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">135</span>
                <span className="text-xs font-bold text-slate-400">/ 88</span>
                <span className="text-[10px] text-slate-400">mmHg</span>
              </div>

              {/* Dual Waveform Canvas/SVG */}
              <div className="relative h-12 w-full bg-slate-950/5 dark:bg-slate-900/60 rounded-xl overflow-hidden p-1">
                <svg className="w-full h-full" viewBox="0 0 160 40" preserveAspectRatio="none">
                  {/* Systolic Wave (Gold) */}
                  <path
                    d="M0,25 Q20,22 35,8 T45,30 Q70,26 85,10 T95,30 Q120,24 135,12 T145,30 L160,26"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]"
                  />
                  {/* Diastolic Wave (Cyan) */}
                  <path
                    d="M0,32 Q20,30 35,22 T45,33 Q70,30 85,24 T95,33 Q120,31 135,23 T145,33 L160,31"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_3px_rgba(6,182,212,0.6)]"
                  />
                </svg>
              </div>
            </div>

            {/* Active Medications Jelly Lozenge Card */}
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[10px]">Medications</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold text-[10px]">
                  3 Active
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/60 dark:border-white/10 shadow-sm shrink-0">
                  <img
                    src="/assets/mivo-jelly-medications.jpg"
                    alt="Jelly Medications"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback gracefully to icon if asset is not found
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent pointer-events-none" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">Metformin • 150mg</div>
                  <div className="text-[10px] font-semibold text-slate-500">Ibuprofen & Syrup Active</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Center: Volumetric 3D Anatomical Human Model / Vector Mesh */}
        <div className={`relative ${showTelemetryCards && !compact ? 'md:col-span-6' : 'col-span-12'} flex flex-col items-center justify-center py-2`}>
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-rose-500/10 via-rose-500/5 to-slate-900/10 dark:from-rose-950/30 dark:to-slate-950/40 p-2 border border-white/50 dark:border-white/10 shadow-inner">
            {visualMode === '3d' ? (
              /* High-Fidelity 3D Crystalline Torso with Leader Lines & Hotspots */
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/mivo-anatomical-scan.jpg"
                  alt="3D Crystalline Anatomical Scan"
                  className="w-full h-full object-cover object-center filter saturate-110 contrast-105"
                  onError={() => setVisualMode('vector')}
                />

                {/* Subtle crystal rim light effect - Zero dark dimming */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-transparent pointer-events-none" />

                {/* Hotspot Beacons for Trauma Zones */}
                {DEFAULT_ZONES.map((zone) => {
                  const isActive = zone.id === activeZone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => handleSelectZone(zone)}
                      style={{ top: `${zone.y}%`, left: `${zone.x}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none"
                      title={zone.name}
                    >
                      {/* Outer pulse */}
                      <span className={`block rounded-full ${isActive ? 'w-10 h-10 bg-amber-400/40 animate-ping' : 'w-6 h-6 bg-white/20 group-hover:scale-125 transition-transform'}`} />
                      {/* Inner luminous core */}
                      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg transition-transform ${
                        isActive 
                          ? 'w-5 h-5 bg-amber-400 shadow-amber-400/80 scale-110' 
                          : 'w-3.5 h-3.5 bg-rose-500 shadow-rose-500/50 group-hover:scale-125'
                      }`} />
                    </button>
                  );
                })}

                {/* 5-Orb Chest Arc Navigation (Mivo Reference Image 1) */}
                <div className="absolute bottom-3 inset-x-2 z-30 flex items-center justify-center gap-2">
                  <div className="px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-2">
                    {DEFAULT_ZONES.map((zone) => {
                      const isActive = zone.id === activeZone.id;
                      const getIcon = () => {
                        switch (zone.id) {
                          case 'head': return <Eye className="w-3.5 h-3.5" />;
                          case 'throat': return <Crosshair className="w-3.5 h-3.5" />;
                          case 'chest': return <Heart className="w-3.5 h-3.5" />;
                          case 'spine': return <Flame className="w-3.5 h-3.5" />;
                          case 'abdomen': default: return <Disc className="w-3.5 h-3.5" />;
                        }
                      };
                      return (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => handleSelectZone(zone)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-white text-slate-900 shadow-lg scale-110 font-bold'
                              : 'bg-white/10 hover:bg-white/20 text-white/80'
                          }`}
                          title={zone.name}
                        >
                          {getIcon()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Vector Mesh SVG Fallback */
              <svg
                className="w-full h-full drop-shadow-[0_12px_24px_rgba(244,63,94,0.18)] select-none"
                viewBox="0 0 240 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="bodySkin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE2E4" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#FAD2E1" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#F0E6EF" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="muscleContour" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E07A5F" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#C9184A" stopOpacity="0.75" />
                  </linearGradient>
                  <radialGradient id="chestPainGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF1053" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#FF4B72" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FF1053" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Head & Neck */}
                <ellipse cx="120" cy="38" rx="26" ry="32" fill="url(#bodySkin)" stroke="#F472B6" strokeWidth="1" />
                <path d="M108,68 L108,86 Q120,90 132,86 L132,68" fill="url(#bodySkin)" />

                {/* Clavicles & Shoulders */}
                <path d="M70,95 Q120,110 170,95" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M60,98 Q40,110 32,145 Q40,165 48,150 L58,115" fill="url(#bodySkin)" />
                <path d="M180,98 Q200,110 208,145 Q200,165 192,150 L182,115" fill="url(#bodySkin)" />

                {/* Torso Silhouette */}
                <path
                  d="M60,98 Q72,160 76,215 Q120,225 164,215 Q168,160 180,98 Q120,85 60,98 Z"
                  fill="url(#bodySkin)"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.5"
                />

                {/* Muscular definition */}
                <path d="M85,115 Q120,132 155,115" stroke="url(#muscleContour)" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M90,135 Q120,150 150,135" stroke="url(#muscleContour)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M102,155 Q120,160 138,155" stroke="url(#muscleContour)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M102,175 Q120,180 138,175" stroke="url(#muscleContour)" strokeWidth="1.2" strokeLinecap="round" />

                {/* Pelvis & Hips */}
                <path d="M76,215 Q120,245 164,215 L156,260 Q120,270 84,260 Z" fill="url(#bodySkin)" />

                {/* Active Zone Trauma Nodes */}
                {DEFAULT_ZONES.map((zone) => {
                  const isActive = zone.id === activeZone.id;
                  const px = (zone.x / 100) * 240;
                  const py = (zone.y / 100) * 320;
                  return (
                    <g
                      key={zone.id}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => handleSelectZone(zone)}
                    >
                      {isActive && (
                        <circle
                          cx={px}
                          cy={py}
                          r="14"
                          fill="none"
                          stroke="#FF2A4D"
                          strokeWidth="2"
                          className="animate-ping opacity-75 origin-center"
                        />
                      )}
                      <circle
                        cx={px}
                        cy={py}
                        r={isActive ? 8 : 5}
                        fill={isActive ? '#FF2A4D' : '#FFFFFF'}
                        stroke={isActive ? '#FFFFFF' : '#94A3B8'}
                        strokeWidth={isActive ? 2.5 : 1.5}
                      />
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Dynamic Zone Floating Badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md border border-white dark:border-slate-700 text-[11px] font-bold text-slate-800 dark:text-slate-100 backdrop-blur-md z-30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              {activeZone.name}
            </div>
          </div>
        </div>

        {/* Right Detail Panel: Symptoms & Tactile Severity Slider (from Mivo) */}
        <div className={`${showTelemetryCards && !compact ? 'md:col-span-3' : 'col-span-12'} flex flex-col gap-3.5`}>
          {/* Active Symptoms Tag Pill Cluster */}
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-sm">
            <span className="block font-bold uppercase tracking-wider text-[10px] text-slate-500 mb-2">
              Reported Symptoms
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeTags.map((tag) => (
                <MivoPillTag
                  key={tag}
                  label={tag}
                  onRemove={() => removeTag(tag)}
                  variant="frosted"
                />
              ))}
            </div>
          </div>

          {/* Interactive Severity Slider with Split Groove Track */}
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-sm">
            <MivoSeveritySlider
              value={severityVal}
              onChange={(val) => setSeverityVal(val)}
              label="Symptom Severity"
            />
          </div>

          {/* Clinical Alert Card */}
          <div className="p-3 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-700 dark:text-slate-200">
              <span className="font-bold text-rose-700 dark:text-rose-300">Trauma Protocol Active: </span>
              {activeZone.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnatomicalBodyScan;
