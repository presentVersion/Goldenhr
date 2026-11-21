import * as React from 'react';
import { ScanLine, RotateCw, AlertCircle, CheckCircle2, DoorClosed, DoorOpen, ShieldCheck } from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S13Gate: React.FC = () => {
  const { cases, documents } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [hasScanned, setHasScanned] = React.useState(true);
  const [manualInput, setManualInput] = React.useState('');
  const [roomOpened, setRoomOpened] = React.useState(false);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const activeCase = cases.find((c) => c.id === 'GH-2026-8812') || cases[0];
  const isTriageConfirmed = activeCase?.state === 'TRIAGE_CONFIRMED' || activeCase?.triage_esi !== undefined;
  const hasVerifiedDoc = documents.some((d) => d.status === 'verified');

  const isPassOpen = isTriageConfirmed && hasVerifiedDoc;

  const handleSimulateScan = () => {
    setHasScanned(true);
    setRoomOpened(false);
  };

  const handleManualLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setHasScanned(true);
      setRoomOpened(false);
    }
  };

  const handleOpenRoom = () => {
    setRoomOpened(true);
  };

  return (
    <div ref={containerRef} className="w-full max-w-[540px] mx-auto p-4 md:p-6 pb-28 space-y-6 flex flex-col items-center min-h-[calc(100vh-72px)] text-slate-900 dark:text-slate-100">
      <div className="w-full text-left pb-2 border-b border-slate-200/80 dark:border-white/10">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
          Fast-Track Gate Barrier (F15)
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Instant barrier validation via signed ambulance Case Capsule QR.
        </p>
      </div>

      {/* Scanner View: 4:3 Area with Corner Guides */}
      <div className="w-full aspect-[4/3] rounded-3xl bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center border-2 border-rose-500/80 shadow-2xl">
        {/* Animated Corner Guides */}
        <div className="absolute top-4 left-4 h-8 w-8 border-t-4 border-l-4 border-rose-500 rounded-tl-xl" />
        <div className="absolute top-4 right-4 h-8 w-8 border-t-4 border-r-4 border-rose-500 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 h-8 w-8 border-b-4 border-l-4 border-rose-500 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 h-8 w-8 border-b-4 border-r-4 border-rose-500 rounded-br-xl" />

        <ScanLine className="h-20 w-20 text-rose-500 animate-pulse" />
        <span className="text-xs font-mono font-bold text-rose-400 mt-2 tracking-widest uppercase">
          Scanning Ambulance Capsule QR
        </span>
      </div>

      {/* Result Card After Scan */}
      {hasScanned && (
        <MivoCard waveArch="top" className="w-full p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Scanned Incident</div>
              <div className="text-xl font-mono font-black text-slate-900 dark:text-white">
                {activeCase?.id || 'GH-2026-8812'}
              </div>
            </div>

            <span
              className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                isPassOpen
                  ? 'bg-[#D4FF00] text-black shadow-sm'
                  : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
              }`}
            >
              {isPassOpen ? 'Pass Open (Green)' : 'Waiting for Triage / Docs'}
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/10 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Clinician Triage Confirmed:</span>
              <span className={`font-black ${isTriageConfirmed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                {isTriageConfirmed ? 'Confirmed (ESI 2)' : 'Pending Clinician'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Patient ID Verified:</span>
              <span className={`font-black ${hasVerifiedDoc ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                {hasVerifiedDoc ? 'Verified at Desk' : 'Pending Verification'}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <MivoButton
              label={roomOpened ? 'BARRIER LOWERED • PASS AUTHORIZED' : 'OPEN FAST-TRACK BARRIER'}
              sublabel="Electronic gate release for Ambulance 04"
              onClick={handleOpenRoom}
              disabled={!isPassOpen || roomOpened}
              variant="emergency"
              size="md"
              arrowIcon={true}
            />
          </div>
        </MivoCard>
      )}
    </div>
  );
};
