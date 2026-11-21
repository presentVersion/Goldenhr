import * as React from 'react';
import {
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  Search,
  Inbox,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import jsPDF from 'jspdf';
import { Chip } from '@/components/ui/chip';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { DocumentItem } from '@/types';
import { animateScreenEnter } from '@/lib/motion';

export const S12Desk: React.FC = () => {
  const { documents, accessLogs } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [filter, setFilter] = React.useState<'all' | 'pending' | 'flagged'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDoc, setSelectedDoc] = React.useState<DocumentItem | null>(documents[0] || null);
  const [rejectDialogOpen, setRejectDialogOpen] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState('');

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const counts = {
    pending: documents.filter((d) => d.status === 'pending').length,
    verified: documents.filter((d) => d.status === 'verified').length,
    rejected: documents.filter((d) => d.status === 'rejected').length,
  };

  const filteredDocs = documents.filter((doc) => {
    if (filter === 'pending' && doc.status !== 'pending') return false;
    if (filter === 'flagged' && (!doc.ai_flags || doc.ai_flags.length === 0)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return doc.name.toLowerCase().includes(q) || doc.case_id.toLowerCase().includes(q);
    }
    return true;
  });

  const handleApprove = (docId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    store.verifyDocument(docId, 'verified');
    store.logAccess({
      patient_id: 'pat-8812',
      actor_role: 'Hospital Registration Desk',
      purpose: 'Document Verification & Fast-track Admission Approval',
      break_glass: false,
    });
  };

  const handleOpenReject = (doc: DocumentItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedDoc(doc);
    setRejectReason('');
    setRejectDialogOpen(true);
  };

  const handleConfirmReject = () => {
    if (selectedDoc && rejectReason.trim()) {
      store.verifyDocument(selectedDoc.id, 'rejected', rejectReason);
      setRejectDialogOpen(false);
    }
  };

  const handleExportPacket = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('GoldenHour AI — Medico-Legal Case (MLC) Packet', 14, 20);
    doc.setFontSize(11);
    doc.text('SIMULATED DATA FOR EMERGENCY ADMISSION RECORD', 14, 28);
    doc.text(`Generated at: ${new Date().toLocaleString()}`, 14, 34);
    doc.text(`Case ID: GH-2026-8812`, 14, 42);
    doc.text(`Hospital: Apollo Jubilee Hills Trauma Center`, 14, 48);
    doc.text(`Receiving Doctor: On-Duty Trauma Surgeon`, 14, 54);
    doc.text('--- Verified Intake Documents ---', 14, 64);

    let y = 72;
    documents.forEach((item, idx) => {
      doc.text(`${idx + 1}. [${item.status.toUpperCase()}] ${item.type} — ${item.name}`, 14, y);
      y += 8;
    });

    doc.save('MLC_Intake_Packet_GH-2026-8812.pdf');
  };

  return (
    <div ref={containerRef} className="w-full max-w-[1400px] mx-auto p-4 md:p-8 space-y-6 pb-28 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Registration Desk & PMJAY Eligibility
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pre-arrival document verification and zero-friction admission handshake
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportPacket}
          className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center gap-2 shadow-sm hover:opacity-90 transition-all"
        >
          <Download className="h-4 w-4" />
          <span>Export MLC Packet (PDF)</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MivoCard waveArch="none" className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Pending Verification</span>
            <span className="text-2xl font-mono font-black text-amber-500">{counts.pending}</span>
          </div>
          <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
        </MivoCard>

        <MivoCard waveArch="none" className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verified Fast-Track</span>
            <span className="text-2xl font-mono font-black text-emerald-500">{counts.verified}</span>
          </div>
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
        </MivoCard>

        <MivoCard waveArch="none" className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Rejected Documents</span>
            <span className="text-2xl font-mono font-black text-rose-500">{counts.rejected}</span>
          </div>
          <XCircle className="w-5 h-5 text-rose-500" />
        </MivoCard>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient, doc name..."
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div className="flex gap-1">
              {(['all', 'pending', 'flagged'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    filter === f
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedDoc?.id === doc.id
                    ? 'border-rose-500 bg-white dark:bg-slate-800 shadow-md ring-1 ring-rose-500/40'
                    : 'glass-specular hover:border-rose-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-slate-400">{doc.case_id}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    doc.status === 'verified'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : doc.status === 'rejected'
                      ? 'bg-rose-500/10 text-rose-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.name}</div>
                <div className="text-[11px] text-slate-400 mt-1 capitalize">{doc.type.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Preview & Action (7 cols) */}
        <div className="lg:col-span-7">
          {selectedDoc ? (
            <MivoCard waveArch="top" className="p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedDoc.name}</h3>
                  <span className="text-[11px] text-slate-400 capitalize">{selectedDoc.type.replace('_', ' ')}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleOpenReject(selectedDoc, e)}
                    className="px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 font-bold text-xs border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleApprove(selectedDoc.id, e)}
                    className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-xs transition-colors"
                  >
                    Verify & Fast-Track
                  </button>
                </div>
              </div>

              {/* Document Visual Mock */}
              <div className="aspect-[16/10] rounded-2xl bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-2">
                <FileText className="w-16 h-16 text-slate-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{selectedDoc.name}</span>
                <span className="text-[11px] text-slate-400">PDF Document • 1.8 MB • Encrypted Stream</span>
              </div>

              {/* AI Quality Analysis */}
              <div className="p-4 rounded-2xl bg-slate-950/5 dark:bg-white/5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Optical Quality Score:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">96/100 (Crisp)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Aadhaar Data Scrub:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">PASSED • Zero Aadhaar Stored</span>
                </div>
              </div>
            </MivoCard>
          ) : (
            <div className="p-12 text-center text-slate-400">Select a document to inspect</div>
          )}
        </div>
      </div>

      {/* Reject Reason Dialog */}
      <BottomSheet
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        title="Reject Document"
        description="Provide a reason for the patient and hospital team."
      >
        <div className="space-y-4 pt-3">
          <input
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g. Document image is blurred or expired"
            className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <MivoButton
            label="CONFIRM REJECTION"
            onClick={handleConfirmReject}
            variant="emergency"
            size="md"
            arrowIcon={true}
          />
        </div>
      </BottomSheet>
    </div>
  );
};
