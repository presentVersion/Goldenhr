import * as React from 'react';
import {
  Hospital,
  BedDouble,
  Activity,
  ScanLine,
  Droplets,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { StageStepper, StepItem } from '@/components/ui/stage-stepper';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S23HospitalSetup: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = React.useState(0);

  const [hospName, setHospName] = React.useState('Apollo Jubilee Hills Trauma Center');
  const [erBaysCount, setErBaysCount] = React.useState('12');
  const [icuBedsCount, setIcuBedsCount] = React.useState('8');
  const [hasCT, setHasCT] = React.useState(true);
  const [hasCathLab, setHasCathLab] = React.useState(true);
  const [hasBloodBank, setHasBloodBank] = React.useState(true);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, [currentStep]);

  const steps: StepItem[] = [
    { id: '1', label: 'Hospital Info', sublabel: 'Facility Details' },
    { id: '2', label: 'Departments', sublabel: 'Specialty Units' },
    { id: '3', label: 'Bay Capacity', sublabel: 'Bed Allocations' },
  ];

  const handleSaveAndContinue = () => {
    store.setScreen('S24');
  };

  return (
    <div ref={containerRef} className="w-full max-w-[1140px] mx-auto p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100">
      <div className="pb-3 border-b border-slate-200/80 dark:border-white/10 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
          Hospital Facility Configuration
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure trauma bays, emergency procedure suites, and telemetry hooks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Stepper Left (4 cols) */}
        <div className="lg:col-span-4">
          <MivoCard waveArch="none" className="p-5">
            <StageStepper
              steps={steps}
              currentStepIndex={currentStep}
              orientation="vertical"
            />
          </MivoCard>
        </div>

        {/* Form Right (8 cols) */}
        <div className="lg:col-span-8">
          <MivoCard waveArch="top" className="p-6 md:p-8 space-y-5">
            {currentStep === 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 dark:text-white">Hospital Details</h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Hospital Official Name</label>
                  <input
                    value={hospName}
                    onChange={(e) => setHospName(e.target.value)}
                    className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Facility License Number</label>
                  <input
                    defaultValue="TG-MED-HYD-2019-948"
                    className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Emergency Contact Roster Line</label>
                  <input
                    defaultValue="+91 40 2360 7777"
                    className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="pt-2">
                  <MivoButton
                    label="NEXT: SPECIALTY UNITS"
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
                <h3 className="text-base font-black text-slate-900 dark:text-white">Emergency Departments</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Select active trauma specialty services:</p>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-950/5 dark:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <ScanLine className="h-5 w-5 text-rose-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Trauma CT Suite</span>
                        <span className="text-[10px] text-slate-400">Rapid neuro & polytrauma scans</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasCT}
                      onChange={(e) => setHasCT(e.target.checked)}
                      className="h-5 w-5 rounded text-rose-600 accent-rose-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-950/5 dark:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-amber-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Cardiac Cath Lab</span>
                        <span className="text-[10px] text-slate-400">Emergency percutaneous coronary angioplasty</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasCathLab}
                      onChange={(e) => setHasCathLab(e.target.checked)}
                      className="h-5 w-5 rounded text-rose-600 accent-rose-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-950/5 dark:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Droplets className="h-5 w-5 text-red-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Blood Bank (MTP)</span>
                        <span className="text-[10px] text-slate-400">O-negative uncrossed packs & MTP ready</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasBloodBank}
                      onChange={(e) => setHasBloodBank(e.target.checked)}
                      className="h-5 w-5 rounded text-rose-600 accent-rose-600"
                    />
                  </label>
                </div>

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
                      label="NEXT: BAY CAPACITY"
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
                <h3 className="text-base font-black text-slate-900 dark:text-white">Emergency Bed & Bay Capacity</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Total ER Resuscitation Bays</label>
                    <input
                      value={erBaysCount}
                      onChange={(e) => setErBaysCount(e.target.value)}
                      className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Emergency ICU Beds</label>
                    <input
                      value={icuBedsCount}
                      onChange={(e) => setIcuBedsCount(e.target.value)}
                      className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
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
                      label="SAVE CONFIGURATION"
                      onClick={handleSaveAndContinue}
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
