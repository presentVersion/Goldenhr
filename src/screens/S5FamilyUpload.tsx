import * as React from 'react';
import { ShieldCheck, FileText, BadgeCheck, Upload, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UploadDropzone, UploadedFileItem } from '@/components/ui/upload-dropzone';
import { MedicalCategoryGrid } from '@/components/ui/medical-category-grid';
import { store, useAppStore } from '@/services/store';
import { AiProvider } from '@/services/mockProviders';
import { animateScreenEnter } from '@/lib/motion';

export const S5FamilyUpload: React.FC = () => {
  const { documents, activeCaseId } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  // Filter docs for current case
  const caseDocs = documents.filter((d) => d.case_id === activeCaseId);

  const getFilesForType = (type: 'patient_id' | 'prior_reports' | 'insurance'): UploadedFileItem[] => {
    return caseDocs
      .filter((d) => d.type === type)
      .map((d) => ({
        id: d.id,
        name: d.name,
        size: 1.8 * 1024 * 1024,
        type: d.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
        status: d.status,
        aiFlag: d.ai_flags?.[0],
      }));
  };

  const handleFileUpload = (type: 'patient_id' | 'prior_reports' | 'insurance', files: File[]) => {
    files.forEach((file) => {
      const check = AiProvider.checkDocument(file.name);
      store.addDocument({
        case_id: activeCaseId,
        type,
        name: file.name,
        file_path: `/uploads/${file.name}`,
        status: 'pending',
        ai_type: type.replace('_', ' '),
        ai_quality: check.quality,
        ai_flags: check.aiFlags,
      });
    });
  };

  const handleRemoveFile = (docId: string) => {
    // Simulated remove
    store.verifyDocument(docId, 'rejected', 'Removed by user');
  };

  const hasPatientId = caseDocs.some((d) => d.type === 'patient_id' && d.status !== 'rejected');
  const hasPriorReports = caseDocs.some((d) => d.type === 'prior_reports' && d.status !== 'rejected');
  const hasInsurance = caseDocs.some((d) => d.type === 'insurance' && d.status !== 'rejected');

  const canSubmit = hasPatientId; // At least patient ID required for emergency verification

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      store.setScreen('S4'); // Returns to S4 when submitted
    }, 500);
  };

  return (
    <div ref={containerRef} className="w-full max-w-[480px] mx-auto px-4 py-6 pb-12 flex flex-col space-y-6">
      {/* 1. Title */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div>
          <h1 className="text-h1 font-bold text-navy-900 leading-tight">Share documents</h1>
          <p className="text-small text-text-muted mt-0.5">
            We check these before arrival. No Aadhaar number is stored.
          </p>
        </div>
        <button
          type="button"
          onClick={() => store.setScreen('S4')}
          className="p-2 text-text-muted hover:text-navy-700 transition-colors"
          title="Back to tracker"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Viora Health Insight Category Grid (Reference 4) */}
      <MedicalCategoryGrid className="my-2" />

      {/* Simulated Active Upload Progress Pill (Reference 4) */}
      <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-black text-[10px]">
              PDF
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[180px]">
              Discharge_Summary_Apollo.pdf
            </span>
          </div>
          <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">82%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-[82%] rounded-full animate-pulse" />
        </div>
      </div>

      {/* 2. Three Upload Cards */}
      <div className="space-y-4">
        {/* Card 1: Patient ID */}
        <Card className="motion-item p-4 border-border space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <h3 className="text-body font-bold text-navy-900">Patient ID (Driver's License / Voter ID)</h3>
          </div>
          <UploadDropzone
            onFilesAccepted={(files) => handleFileUpload('patient_id', files)}
            uploadedFiles={getFilesForType('patient_id')}
            onRemoveFile={handleRemoveFile}
            acceptText="Voter ID, Driving License, Passport. Never upload Aadhaar."
          />
        </Card>

        {/* Card 2: Prior Reports */}
        <Card className="motion-item p-4 border-border space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="text-body font-bold text-navy-900">Prior Medical Reports / Prescriptions</h3>
          </div>
          <UploadDropzone
            onFilesAccepted={(files) => handleFileUpload('prior_reports', files)}
            uploadedFiles={getFilesForType('prior_reports')}
            onRemoveFile={handleRemoveFile}
            acceptText="Recent ECG, discharge summary, diabetic or cardiac records"
          />
        </Card>

        {/* Card 3: Insurance */}
        <Card className="motion-item p-4 border-border space-y-3">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-teal-500" />
            <h3 className="text-body font-bold text-navy-900">Insurance / PMJAY Card</h3>
          </div>
          <UploadDropzone
            onFilesAccepted={(files) => handleFileUpload('insurance', files)}
            uploadedFiles={getFilesForType('insurance')}
            onRemoveFile={handleRemoveFile}
            acceptText="Ayushman Bharat Golden Card, TPA, or Private Insurance Card"
          />
        </Card>
      </div>

      {/* 3. Submit Bar */}
      <div className="pt-2 space-y-2">
        <Button
          variant="primary"
          size="lg"
          disabled={!canSubmit || isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 shadow-e2 bg-navy-700"
        >
          <Upload className="h-5 w-5" />
          <span>Submit documents for desk verification</span>
        </Button>
        {!hasPatientId && (
          <p className="text-micro text-amber-500 text-center font-semibold">
            Please attach at least one Patient ID card before submitting.
          </p>
        )}
      </div>
    </div>
  );
};
