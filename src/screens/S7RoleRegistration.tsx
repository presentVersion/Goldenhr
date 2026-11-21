import * as React from 'react';
import { UserCheck, FileText, CheckCircle2, Clock, Upload, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { FormField } from '@/components/ui/form-field';
import { StageStepper } from '@/components/ui/stage-stepper';
import { UploadDropzone } from '@/components/ui/upload-dropzone';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S7RoleRegistration: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [fullName, setFullName] = React.useState('Dr. Ramesh Varma');
  const [medicalRegNumber, setMedicalRegNumber] = React.useState('TSMC-2018-84729');
  const [hospitalAffiliation, setHospitalAffiliation] = React.useState('Apollo Jubilee Hills');
  const [hasUploadedCert, setHasUploadedCert] = React.useState(false);
  const [isPendingApproval, setIsPendingApproval] = React.useState(false);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, [currentStep, isPendingApproval]);

  const steps = [
    { id: '1', label: 'Credentials', sublabel: 'Identity & Reg' },
    { id: '2', label: 'Verification', sublabel: 'Council Certificate' },
    { id: '3', label: 'Review', sublabel: 'Confirmation' },
  ];

  const handleSubmit = () => {
    setIsPendingApproval(true);
  };

  if (isPendingApproval) {
    return (
      <div ref={containerRef} className="w-full max-w-[540px] mx-auto p-6 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center">
        <MivoCard waveArch="top" className="p-8 space-y-4 shadow-2xl flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
            <Clock className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Waiting for Approval</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            Your medical council credentials have been submitted for verification by the hospital clinical director. We will notify you via SMS.
          </p>
          <div className="pt-2 w-full">
            <MivoButton
              label="ENTER DEMO DOCTOR CONSOLE"
              sublabel="Simulated bypass for verification review"
              onClick={() => store.setRole('doctor', 'S14')}
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
    <div ref={containerRef} className="w-full max-w-[1040px] mx-auto p-4 md:p-8 min-h-[calc(100vh-72px)] space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500">
            Hospital Credentialing Protocol
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Clinical Staff Registration
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Register your state medical council license for pre-alert dispatch access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Stepper (4 cols) */}
        <div className="md:col-span-4">
          <MivoCard waveArch="none" className="p-5">
            <StageStepper
              steps={steps}
              currentStepIndex={currentStep}
              orientation="vertical"
            />
          </MivoCard>
        </div>

        {/* Right Form Body (8 cols) */}
        <div className="md:col-span-8">
          <MivoCard waveArch="top" className="p-6 md:p-8 space-y-5">
            {currentStep === 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Personal & Registration Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Full Name with Title
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    State Medical Council Registration No.
                  </label>
                  <input
                    value={medicalRegNumber}
                    onChange={(e) => setMedicalRegNumber(e.target.value)}
                    className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <span className="text-[10px] text-slate-400">e.g. TSMC / MCI Registration</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Hospital Affiliation
                  </label>
                  <input
                    value={hospitalAffiliation}
                    onChange={(e) => setHospitalAffiliation(e.target.value)}
                    className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="pt-2">
                  <MivoButton
                    label="PROCEED TO CERTIFICATE UPLOAD"
                    sublabel="Step 1 of 3 complete"
                    onClick={() => setCurrentStep(1)}
                    variant="primary"
                    size="md"
                    arrowIcon={true}
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Medical Council Registration Certificate
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload an image or PDF of your valid registration certificate.
                </p>

                <UploadDropzone
                  onFilesAccepted={() => setHasUploadedCert(true)}
                  uploadedFiles={
                    hasUploadedCert
                      ? [
                          {
                            id: 'cert-1',
                            name: 'TSMC_Registration_Certificate_2018.pdf',
                            size: 1.2 * 1024 * 1024,
                            type: 'application/pdf',
                            status: 'verified',
                          },
                        ]
                      : []
                  }
                  acceptText="Upload TSMC Certificate PDF / JPEG"
                />

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <div className="w-64">
                    <MivoButton
                      label="NEXT: REVIEW & SUBMIT"
                      onClick={() => setCurrentStep(2)}
                      variant="primary"
                      size="md"
                      arrowIcon={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Review Credentials
                </h3>

                <div className="space-y-2 p-4 rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/10">
                    <span className="font-bold text-slate-500">Name:</span>
                    <span className="font-black text-slate-900 dark:text-white">{fullName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/10">
                    <span className="font-bold text-slate-500">Reg No:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{medicalRegNumber}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-slate-500">Hospital:</span>
                    <span className="font-black text-slate-900 dark:text-white">{hospitalAffiliation}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <div className="w-64">
                    <MivoButton
                      label="CONFIRM & SUBMIT"
                      onClick={handleSubmit}
                      variant="emergency"
                      size="md"
                      arrowIcon={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </MivoCard>
        </div>
      </div>
    </div>
  );
};
