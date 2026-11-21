import * as React from 'react';
import {
  BedDouble,
  BedSingle,
  ScanLine,
  Activity,
  Droplets,
  ArrowUpCircle,
  CheckCircle2,
  LockOpen,
  Sparkles,
} from 'lucide-react';
import { CountdownRing } from '@/components/ui/countdown-ring';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { Bay } from '@/types';
import { animateScreenEnter } from '@/lib/motion';

export const S17BayReadinessBoard: React.FC = () => {
  const { bays, cases } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [heldRemaining, setHeldRemaining] = React.useState(75);

  const hasCriticalCase = cases.some((c) => c.severity === 'critical');

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
    const interval = setInterval(() => {
      setHeldRemaining((prev) => (prev > 0 ? prev - 1 : 90));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBayIcon = (type: Bay['type']) => {
    switch (type) {
      case 'BedDouble':
        return <BedDouble className="h-5 w-5 text-rose-500" />;
      case 'BedSingle':
        return <BedSingle className="h-5 w-5 text-cyan-500" />;
      case 'ScanLine':
        return <ScanLine className="h-5 w-5 text-amber-500" />;
      case 'Activity':
        return <Activity className="h-5 w-5 text-emerald-500" />;
      case 'Droplets':
        return <Droplets className="h-5 w-5 text-red-500" />;
      default:
        return <BedDouble className="h-5 w-5 text-rose-500" />;
    }
  };

  const handleMarkReady = (bayId: string) => {
    store.releaseBay(bayId);
  };

  const handleRelease = (bayId: string) => {
    store.releaseBay(bayId);
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[calc(100vh-72px)] p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100"
    >
      {/* Escalation Banner (F9) */}
      {hasCriticalCase && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <ArrowUpCircle className="h-6 w-6 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider">
              Critical case active (Survival Clock alert). ER & Trauma board on RED status.
            </span>
          </div>
          <span className="text-[10px] font-black uppercase bg-white/20 px-3 py-1 rounded-full">
            Code Red Priority
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Bay Readiness Board
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Live room, bed, and procedure suite capacity at Apollo Jubilee Hills
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => store.setScreen('S19')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 dark:bg-slate-800/80 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-white/10 hover:bg-white shadow-xs"
          >
            <span>View Department Console (S19) →</span>
          </button>
        </div>
      </div>

      {/* Bay Cards Grid */}
      {bays.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          No bays set up. Ask your admin.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {bays.map((bay) => (
            <MivoCard
              key={bay.id}
              waveArch="none"
              className={`p-5 space-y-4 ${
                bay.status === 'held'
                  ? 'border-amber-500/60 ring-2 ring-amber-500/30'
                  : bay.status === 'locked'
                  ? 'border-rose-500/60'
                  : ''
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-slate-950/5 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                    {getBayIcon(bay.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                      {bay.name}
                    </h3>
                    <div className="text-[10px] text-slate-400 font-semibold">{bay.type}</div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    bay.status === 'free'
                      ? 'bg-[#D4FF00] text-black shadow-xs'
                      : bay.status === 'held' || bay.status === 'preparing'
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      : 'bg-red-500/20 text-red-600 dark:text-red-400'
                  }`}
                >
                  {bay.status.toUpperCase()}
                </span>
              </div>

              {/* Countdown ring if held */}
              {bay.status === 'held' && (
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="text-[11px] font-bold text-slate-500">Hold Expiry:</span>
                  <CountdownRing
                    remainingSeconds={heldRemaining}
                    totalSeconds={90}
                    size="sm"
                  />
                </div>
              )}

              {/* Kit Status & Estimated Ready Time (F22) */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Kit Prep:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {bay.kitStatus ? bay.kitStatus.toUpperCase() : 'STANDARD'}
                  </span>
                </div>

                {bay.prepProgress !== undefined && (
                  <div className="w-full bg-slate-950/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${bay.prepProgress}%` }}
                    />
                  </div>
                )}

                {bay.estReadyMinutes && (
                  <div className="flex items-center justify-between text-rose-500 pt-1 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Ready Est (F22):</span>
                    </span>
                    <span className="font-mono">{bay.estReadyMinutes} min</span>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex gap-2">
                {bay.status !== 'free' && (
                  <button
                    type="button"
                    onClick={() => handleRelease(bay.id)}
                    className="flex-1 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-white/10"
                  >
                    Release
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleMarkReady(bay.id)}
                  className="flex-1 py-2 text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl shadow-xs"
                >
                  Mark Ready
                </button>
              </div>
            </MivoCard>
          ))}
        </div>
      )}
    </div>
  );
};
