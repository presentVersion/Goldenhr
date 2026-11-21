import * as React from 'react';
import {
  Heart,
  Stethoscope,
  UserCheck,
  Hospital as HospitalIcon,
  Share2,
  FlaskConical,
  Sparkles,
  Activity,
  ShieldCheck,
  Radio,
  ArrowRight,
  Clock,
  HeartPulse,
  ChevronRight,
  Flame,
  Zap,
  Mic,
  MicOff,
  Volume2,
  Pill,
  Siren,
  Lock,
} from 'lucide-react';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import Strands from '@/components/ui/react-bits/Strands';
import { store } from '@/services/store';
import { animateHeroEntrance, animateScrollFloat } from '@/lib/scrollAnimation';

export const S1Landing: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = React.useState(false);
  const [voiceQuery, setVoiceQuery] = React.useState('');

  // Dynamic greeting based on current local hour
  const greeting = React.useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  React.useEffect(() => {
    animateHeroEntrance(containerRef.current);
    animateScrollFloat(containerRef.current);
  }, []);

  const handleSOSTap = () => {
    store.setScreen('S2');
  };

  const handleStaffLoginTap = () => {
    store.setRole('doctor', 'S6');
  };

  const handleToggleVoiceTriage = () => {
    if (!isListening) {
      setIsListening(true);
      setVoiceQuery('Listening to emergency dispatch audio...');
      setTimeout(() => {
        setVoiceQuery('"Emergency at Jubilee Hills Road 36: Pedestrian hit by car, unconscious, severe bleeding"');
      }, 1800);
    } else {
      setIsListening(false);
      setVoiceQuery('');
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex-1 flex flex-col items-center justify-between min-h-[calc(100vh-72px)] overflow-hidden bg-gradient-to-b from-rose-50/50 via-slate-50 to-slate-100 dark:from-[#0a0710] dark:via-[#070b12] dark:to-[#04060a] text-slate-900 dark:text-slate-100 transition-colors"
    >
      {/* Grand Ethereal Mivo Radiant Aurora Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[750px] rounded-full bg-gradient-to-br from-rose-500/25 via-pink-400/20 to-amber-300/15 blur-[140px] pointer-events-none -translate-y-1/3" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-amber-400/20 via-rose-400/10 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-teal-400/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Top Demo Simulation Banner (Zero Aadhaar Non-Negotiable) */}
      <div className="relative z-10 w-full bg-slate-950/90 text-white backdrop-blur-xl py-2 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold shadow-sm">
        <FlaskConical className="h-3.5 w-3.5 text-rose-400 flex-shrink-0 animate-pulse" />
        <span className="text-rose-200">
          SIMULATED PILOT PROTOCOL • Built for Indian Emergency Medical Coordination • Zero Aadhaar Stored
        </span>
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 w-full max-w-[1380px] px-4 md:px-8 py-8 md:py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Greeting, Grand Headline, 3D Strands Orb & Entryway (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Pill Eyebrow with Live Timestamp & Greeting */}
            <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-rose-200/60 dark:border-rose-900/40 shadow-sm backdrop-blur-md">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
              <Sparkles className="h-4 w-4 text-rose-500" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-800 dark:text-rose-300">
                {greeting} • Hyderabad Trauma Grid Active
              </span>
            </div>

            {/* Iridescent Grand Headline */}
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-slate-950 dark:text-white">
              Golden hour, <br />
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                coordinated.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
              Direct telemetry from bystander to paramedic, instant trauma bay holds, AI second-opinion triage, and emergency vehicle routing across India.
            </p>

            {/* WebGL 3D Strands Interactive Orb Showcase */}
            <div className="hero-orb w-full max-w-lg rounded-3xl p-4 glass-specular border border-rose-500/25 relative overflow-hidden shadow-2xl bg-gradient-to-b from-white/50 via-white/20 to-transparent dark:from-slate-900/50 dark:via-slate-950/20">
              <div className="flex items-center justify-between mb-2 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Neural AI Triage Core • Realtime 3D
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleVoiceTriage}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/40 animate-pulse'
                      : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-rose-400'
                  }`}
                >
                  {isListening ? <Mic className="w-3 h-3 text-white" /> : <MicOff className="w-3 h-3 text-slate-400" />}
                  <span>{isListening ? 'Voice Active' : 'Tap to Test Voice AI'}</span>
                </button>
              </div>

              {/* 3D WebGL Strands Canvas */}
              <div className="w-full h-48 md:h-56 relative rounded-2xl overflow-hidden bg-slate-950/95 border border-white/10 flex items-center justify-center">
                <Strands
                  colors={['#f43f5e', '#fb7185', '#fb923c', '#facc15', '#ffffff', '#2dd4bf', '#0ea5e9']}
                  glass={true}
                  interactive={true}
                  listening={isListening}
                  energy={isListening ? 0.95 : 0.65}
                  amplitude={1.1}
                  waviness={1.2}
                  rim={1.4}
                  dispersion={1.2}
                  className="w-full h-full"
                />

                {/* Overlaid Voice Query Subtitle */}
                {voiceQuery && (
                  <div className="absolute bottom-2.5 left-3 right-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-center animate-fadeIn">
                    <p className="text-[11px] font-mono text-emerald-300 tracking-tight leading-snug">
                      {voiceQuery}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Grand Dual-Option Entryway Button (SOS or Login) */}
            <div className="hero-cta w-full max-w-lg p-5 rounded-3xl glass-specular border border-rose-500/30 shadow-2xl bg-gradient-to-b from-white/80 to-white/40 dark:from-slate-900/80 dark:to-slate-950/60 space-y-3.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Enter GoldenHour System • Choose Your Role
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: SOS Immediate Alert */}
                <button
                  type="button"
                  onClick={handleSOSTap}
                  className="group relative p-4 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-rose-500 text-white shadow-xl shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <Siren className="w-5 h-5 text-white animate-bounce" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-white/20">
                      Emergency
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight leading-tight">
                      TAP SOS NOW
                    </h3>
                    <p className="text-[11px] text-white/80 font-medium mt-1 leading-snug">
                      Dispatches nearest ambulance & streams live GPS
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-200 group-hover:translate-x-1 transition-transform">
                    <span>Activate Alert</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Option 2: Staff Login & Portals */}
                <button
                  type="button"
                  onClick={handleStaffLoginTap}
                  className="group relative p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-lg hover:border-rose-400 hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      Medical Staff
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight leading-tight">
                      STAFF LOGIN
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-snug">
                      Doctors, Paramedics, Nurses & Command Centre
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
                    <span>Access All Roles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Status Tags */}
            <div className="hero-cta flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <MivoPillTag label="108 Integration" variant="frosted" />
              <MivoPillTag label="Apollo Jubilee Connected" variant="lime" />
              <MivoPillTag label="3D Trauma Twins" variant="amber" />
              <MivoPillTag label="Zero Aadhaar Stored" variant="jade" />
            </div>
          </div>

          {/* Right Column: 3D Visual Cards & Quick Access (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* 3D Anatomical Twin Preview Card */}
            <MivoCard
              waveArch="top"
              className="scroll-float p-5 relative overflow-hidden group cursor-pointer"
              onClick={() => store.setScreen('S10')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Live 3D Trauma Twin Visualizer
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20">
                  REALTIME
                </span>
              </div>

              {/* Visual Preview Container */}
              <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-950/10 dark:bg-black/40 border border-white/40 dark:border-white/10 flex items-center justify-center">
                <img
                  src="/assets/mivo-anatomical-scan.jpg"
                  alt="3D Crystalline Anatomical Scan Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div>
                    <span className="font-black text-sm block">Matthew Johnson • 26</span>
                    <span className="text-[11px] text-white/80">Throat Pain 7/10 • C4-C5 Active Protocol</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#D4FF00] text-black font-black text-[10px] uppercase shadow-md">
                    Inspect Twin →
                  </span>
                </div>
              </div>
            </MivoCard>

            {/* 3D Jelly Medications Gallery Card */}
            <MivoCard
              waveArch="none"
              className="scroll-float p-4 relative overflow-hidden group cursor-pointer"
              onClick={() => store.setScreen('S8')}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Translucent Jelly Medications (Mivo Spec)
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                  PHARMA
                </span>
              </div>
              <div className="relative h-24 rounded-2xl overflow-hidden bg-slate-950/10 dark:bg-black/40 border border-white/30 dark:border-white/10 flex items-center justify-center">
                <img
                  src="/assets/mivo-jelly-medications.jpg"
                  alt="3D Jelly Translucent Medications"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-bold text-[11px]">Metformin 150mg • Atorvastatin 80mg • Ticagrelor</span>
                  <span className="text-[10px] text-emerald-300 font-mono font-bold">In-Transit Sync</span>
                </div>
              </div>
            </MivoCard>

            {/* Quick Portals Stack */}
            <div className="scroll-float space-y-2.5">
              <div
                onClick={() => store.setRole('doctor', 'S14')}
                className="group relative glass-specular rounded-2xl p-3.5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border-l-4 border-l-slate-800 dark:border-l-rose-500"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-rose-500 transition-all">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                        Trauma Physician Radar (S14)
                      </h4>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Direct 3D Patient Dossier, Bed Reservation & Resuscitation
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => store.setRole('dispatcher', 'S10')}
                className="group relative glass-specular rounded-2xl p-3.5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border-l-4 border-l-cyan-500"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                        Dr+ Ambulance Control Centre (S10)
                      </h4>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Live GPS Dispatch, Active Triage Incidents & SlideCommit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Telemetry Strip */}
      <div className="relative z-10 w-full border-t border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md py-3 px-4 text-center">
        <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700 dark:text-slate-300 font-semibold">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Server Active: Apollo Jubilee Hills & NIMS Connected</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-slate-500 dark:text-slate-400">
            <span>MEDIAN DISPATCH: <strong className="text-slate-900 dark:text-white">2.1 MIN</strong></span>
            <span>TRAUMA BAYS READY: <strong className="text-emerald-500">8 AVAILABLE</strong></span>
            <span>BLS VOLUNTEERS ON-DUTY: <strong className="text-rose-500">24 ONLINE</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
