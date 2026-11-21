import * as React from 'react';
import { UserCheck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { UploadDropzone } from '@/components/ui/upload-dropzone';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { store } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S20VolunteerRegistration: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [name, setName] = React.useState('K. Rajesh');
  const [phone, setPhone] = React.useState('+91 98765 12345');
  const [area, setArea] = React.useState('Madhapur / Jubilee Hills');
  const [hasCert, setHasCert] = React.useState(false);
  const [agreed, setAgreed] = React.useState(true);
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, [isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && agreed) {
      setIsPending(true);
    }
  };

  if (isPending) {
    return (
      <div ref={containerRef} className="w-full max-w-[500px] mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-72px)] text-center text-slate-900 dark:text-slate-100">
        <MivoCard waveArch="top" className="p-8 space-y-4 shadow-2xl flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
            <Clock className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Registration Under Review</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            Your Basic Life Support (BLS) certification is being verified by the regional EMS team. You will receive an SMS once approved.
          </p>
          <div className="pt-2 w-full">
            <MivoButton
              label="LAUNCH VOLUNTEER RADAR CONSOLE (DEMO)"
              onClick={() => store.setRole('volunteer', 'S21')}
              variant="emergency"
              size="md"
              arrowIcon={true}
            />
          </div>
        </MivoCard>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-[540px] mx-auto p-4 md:p-6 pb-28 space-y-6 text-slate-900 dark:text-slate-100">
      <div className="text-left pb-2 border-b border-slate-200/80 dark:border-white/10 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
          Become a First Responder
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Join the Golden Minutes volunteer network to deliver bystander CPR & AED support in Hyderabad.
        </p>
      </div>

      <MivoCard waveArch="top" className="p-6 md:p-8 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mobile Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Service Area</label>
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">BLS / First-Aid Certificate</span>
            <UploadDropzone
              onFilesAccepted={() => setHasCert(true)}
              acceptText="Red Cross, St. John Ambulance, or AHA BLS Certificate"
            />
          </div>

          <label className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 rounded text-rose-600 accent-rose-600 mt-0.5"
              required
            />
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              I agree to respond to nearby cardiac & trauma emergencies when on duty.
            </span>
          </label>

          <div className="pt-2">
            <MivoButton
              label="SUBMIT VOLUNTEER APPLICATION"
              sublabel="Instant verification review"
              onClick={() => setIsPending(true)}
              variant="emergency"
              size="md"
              arrowIcon={true}
            />
          </div>
        </form>
      </MivoCard>
    </div>
  );
};
