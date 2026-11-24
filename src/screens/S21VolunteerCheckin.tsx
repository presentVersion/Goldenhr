import * as React from 'react';
import {
  Radio,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  HeartPulse,
  Navigation,
} from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S21VolunteerCheckin: React.FC = () => {
  const { volunteerDuty, cases } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [hasAccepted, setHasAccepted] = React.useState(false);
  const activeEmergency = cases[0];

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, [volunteerDuty]);

  const handleToggleDuty = () => {
    store.setVolunteerDuty(!volunteerDuty);
  };

  const handleAccept = () => {
    setHasAccepted(true);
  };

  const handleDecline = () => {
    setHasAccepted(false);
  };

  return (
    <div ref={containerRef} className="w-full max-w-[540px] mx-auto p-4 md:p-6 pb-28 space-y-5 text-slate-900 dark:text-slate-100">
      {/* Status Card: On-duty toggle + area name */}
      <MivoCard waveArch="top" className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${volunteerDuty ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
              <Radio className={`h-6 w-6 ${volunteerDuty ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {volunteerDuty ? 'Active On-Duty' : 'Currently Off-Duty'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Madhapur / Durgam Cheruvu Sector</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={volunteerDuty}
              onChange={handleToggleDuty}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
          </label>
        </div>

        {volunteerDuty && (
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Ready for Golden Minutes (F24) nearest cardiac & trauma alerts</span>
          </div>
        )}
      </MivoCard>

      {!volunteerDuty ? (
        <MivoCard waveArch="none" className="p-8 text-center space-y-2">
          <Clock className="h-8 w-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-black text-slate-900 dark:text-white">You are currently off duty</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Toggle on duty above when you are ready to receive emergency dispatch notifications in your sector.
          </p>
        </MivoCard>
      ) : (
        /* Emergency Alert Card */
        <MivoCard
          waveArch="top"
          className={`p-6 border-l-4 border-l-rose-500 space-y-4 shadow-xl ${
            hasAccepted ? 'ring-2 ring-emerald-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-rose-500 animate-pulse" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Emergency Nearby (F24)</h3>
            </div>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600">
              CRITICAL • CPR NEEDED
            </span>
          </div>

          {/* 3D Crystal Defibrillator (AED) & Radar Visualization (Unframed Hero Showcase) */}
          <div className="relative rounded-3xl overflow-hidden glass-specular border border-rose-500/20 shadow-xl p-4 bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                3D AED Station & 500m Radar Topography
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                AED Unit Online
              </span>
            </div>

            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/15 bg-gradient-to-b from-rose-500/10 to-slate-900 group">
              <img
                src="/assets/mivo-volunteer-aed-radar-3d.jpg"
                alt="3D Crystal Defibrillator and 500m Radar Map"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Non-Obscuring Stadium Pills */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="bg-slate-950/85 text-white backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20 shadow-xl text-xs font-mono font-bold">
                  Radius: 500m Concentric Grid
                </span>
              </div>
              <div className="absolute bottom-3 right-3 z-10">
                <span className="bg-[#D4FF00] text-slate-950 font-black px-3 py-1.5 rounded-full shadow-xl text-xs font-mono">
                  PADS ARMED
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-lg font-black text-slate-900 dark:text-white">
              {activeEmergency?.location_name || 'Durgam Cheruvu Flyover Junction'}
            </div>
            <div className="text-xs text-rose-500 font-mono font-bold flex items-center gap-2">
              <span>Distance: 320 meters</span>
              <span>•</span>
              <span>Walking ETA: 3 min</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            {activeEmergency?.symptoms_summary || 'Unconscious adult male, suspected cardiac arrest, bystander calling'}
          </p>

          <div className="pt-2">
            {!hasAccepted ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDecline}
                  className="flex-1 py-3 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-2xl border border-slate-200 dark:border-white/10"
                >
                  Decline
                </button>
                <div className="flex-1">
                  <MivoButton
                    label="ACCEPT (3 MIN)"
                    onClick={handleAccept}
                    variant="emergency"
                    size="sm"
                    arrowIcon={true}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accepted! Dispatching live turn-by-turn routing</span>
                </div>
                <MivoButton
                  label="OPEN SCENE CPR PROTOCOL (S3)"
                  onClick={() => store.setScreen('S3')}
                  variant="primary"
                  size="md"
                  arrowIcon={true}
                />
              </div>
            )}
          </div>
        </MivoCard>
      )}
    </div>
  );
};
