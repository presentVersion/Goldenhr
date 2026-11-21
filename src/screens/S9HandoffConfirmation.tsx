import * as React from 'react';
import { CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { Chip, ChipVariant } from '@/components/ui/chip';
import { DecisionSupportBanner } from '@/components/ui/status-badges';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

interface HandoffField {
  id: string;
  label: string;
  value: string;
  source: string;
  chipVariant: ChipVariant;
  confirmed: boolean;
  required?: boolean;
}

export const S9HandoffConfirmation: React.FC = () => {
  const { cases, activeCaseId } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const [fields, setFields] = React.useState<HandoffField[]>([
    { id: '1', label: 'Primary Mechanism', value: 'Motorcycle collision with polytrauma', source: 'Bystander-reported', chipVariant: 'unverified', confirmed: true, required: true },
    { id: '2', label: 'Level of Consciousness', value: 'GCS 12 (E3V4M5)', source: 'AI-drafted', chipVariant: 'ai', confirmed: true, required: true },
    { id: '3', label: 'Blood Pressure', value: activeCase?.vitals?.bp || '142/90 mmHg', source: 'Crew entered', chipVariant: 'neutral', confirmed: true, required: true },
    { id: '4', label: 'Pulse / Heart Rate', value: `${activeCase?.vitals?.hr || 118} BPM (Sinus Tachycardia)`, source: 'Crew entered', chipVariant: 'neutral', confirmed: true, required: true },
    { id: '5', label: 'Oxygen Saturation', value: `${activeCase?.vitals?.spo2 || 92}% on 4L nasal cannula`, source: 'Crew entered', chipVariant: 'neutral', confirmed: true, required: true },
    { id: '6', label: 'Airway / Breathing', value: 'Patent, shallow rapid respirations', source: 'Crew entered', chipVariant: 'neutral', confirmed: false, required: true },
    { id: '7', label: 'External Bleeding Control', value: 'Direct pressure applied to scalp laceration', source: 'Crew entered', chipVariant: 'neutral', confirmed: false, required: true },
    { id: '8', label: 'C-Spine Immobilization', value: 'Rigid cervical collar applied in transit', source: 'Crew entered', chipVariant: 'neutral', confirmed: false, required: true },
    { id: '9', label: 'IV Access Established', value: '18G cannula in left antecubital fossa', source: 'Crew entered', chipVariant: 'neutral', confirmed: false, required: true },
    { id: '10', label: 'Fluids Administered', value: 'Normal Saline 500ml initiated (250ml infused)', source: 'Crew entered', chipVariant: 'neutral', confirmed: false, required: true },
    { id: '11', label: 'Suspected Internal Injuries', value: 'Right chest wall tenderness, dullness at base', source: 'AI-drafted', chipVariant: 'ai', confirmed: false, required: false },
    { id: '12', label: 'Personal Belongings / ID', value: 'Voter ID verified in Case Capsule', source: 'Crew entered', chipVariant: 'neutral', confirmed: false, required: false },
  ]);

  const [selectedField, setSelectedField] = React.useState<HandoffField | null>(null);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const confirmedCount = fields.filter((f) => f.confirmed).length;
  const totalCount = fields.length;
  const allRequiredConfirmed = fields.filter((f) => f.required).every((f) => f.confirmed);

  const toggleConfirm = (id: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, confirmed: !f.confirmed } : f))
    );
  };

  const handleFinalHandover = () => {
    store.updateCaseState(activeCase.id, 'HANDED_OVER');
    store.setScreen('S8');
  };

  return (
    <div ref={containerRef} className="w-full max-w-[680px] mx-auto p-4 md:p-6 pb-28 space-y-5 text-slate-900 dark:text-slate-100">
      {/* Decision Support Banner on S9 */}
      <DecisionSupportBanner />

      {/* Title & Progress */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            Confirm Clinical Handoff (F8)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transfer clinical custody to Apollo Jubilee Hills Trauma Resuscitation Team
          </p>
        </div>
        <button
          type="button"
          onClick={() => store.setScreen('S8')}
          className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Back to case"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Card */}
      <MivoCard waveArch="top" className="p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Handoff Verification Checklist</span>
          <span className="numeric text-rose-500 font-black">{confirmedCount} of {totalCount} verified</span>
        </div>
        <div className="w-full bg-slate-950/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(confirmedCount / totalCount) * 100}%` }}
          />
        </div>
      </MivoCard>

      {/* Field List */}
      <div className="space-y-2.5">
        {fields.map((field) => (
          <div
            key={field.id}
            onClick={() => toggleConfirm(field.id)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              field.confirmed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'glass-specular hover:border-rose-300'
            }`}
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                  {field.label}
                </span>
                {field.required && (
                  <span className="text-[10px] text-rose-500 font-bold">*Req</span>
                )}
                <Chip variant={field.chipVariant} label={field.source} className="text-[9px]" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">
                {field.value}
              </p>
            </div>

            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
              field.confirmed
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                : 'border-slate-300 dark:border-white/20'
            }`}>
              {field.confirmed && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <div className="pt-2">
        <MivoButton
          label="SIGN & CONFIRM CLINICAL TRANSFER"
          sublabel="Custody handover logged in Immutable Access Log (F29)"
          onClick={handleFinalHandover}
          disabled={!allRequiredConfirmed}
          variant="emergency"
          size="lg"
          arrowIcon={true}
        />
      </div>
    </div>
  );
};
