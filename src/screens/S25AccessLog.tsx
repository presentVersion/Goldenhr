import * as React from 'react';
import { KeyRound, ShieldAlert, ShieldCheck, ArrowLeft, Clock, Lock } from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { MivoCard } from '@/components/ui/mivo-card';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S25AccessLog: React.FC = () => {
  const { accessLogs, currentRole } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const handleBack = () => {
    if (currentRole === 'admin') {
      store.setScreen('S24');
    } else {
      store.setScreen('S4');
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-[1100px] mx-auto p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              Who Viewed Your Information (F29)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cryptographic immutable audit ledger of clinical and administrative access to your emergency records.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white/80 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-xs">
          <Lock className="h-3.5 w-3.5 text-rose-500" />
          <span>Entries cannot be edited or erased</span>
        </div>
      </div>

      {accessLogs.length === 0 ? (
        <MivoCard waveArch="none" className="p-12 text-center text-slate-400">
          No one has viewed your information yet.
        </MivoCard>
      ) : (
        <MivoCard waveArch="top" className="p-0 overflow-hidden shadow-xl">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-white/10 bg-slate-950/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-black">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Accessor Role (Identity Masked)</th>
                  <th className="p-4">Clinical Purpose</th>
                  <th className="p-4">Consent / Access Mode</th>
                  <th className="p-4 text-right">Anomaly Flag (F36)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-white/10">
                {accessLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-950/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-slate-400">
                      {new Date(log.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="p-4 font-black text-slate-900 dark:text-white">{log.actor_role}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">{log.purpose}</td>
                    <td className="p-4">
                      {log.break_glass ? (
                        <span className="inline-flex items-center gap-1.5 text-rose-600 font-bold text-[10px] bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                          <KeyRound className="h-3 w-3" />
                          <span>Emergency Break-Glass</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          <ShieldCheck className="h-3 w-3" />
                          <span>Token Verified</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {log.anomaly_flagged ? (
                        <Chip variant="critical" label="Review (F36)" />
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-200/60 dark:divide-white/10 p-2">
            {accessLogs.map((log) => (
              <div key={log.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400 text-[10px]">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </span>
                  {log.break_glass ? (
                    <span className="text-rose-600 font-bold text-[10px] bg-rose-500/10 px-2 py-0.5 rounded-full">
                      Break-Glass
                    </span>
                  ) : (
                    <span className="text-emerald-600 text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Token Verified
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">{log.actor_role}</div>
                <div className="text-xs text-slate-500">{log.purpose}</div>
              </div>
            ))}
          </div>
        </MivoCard>
      )}
    </div>
  );
};
