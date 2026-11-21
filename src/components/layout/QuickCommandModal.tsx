import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, X, ShieldAlert, Ambulance, Stethoscope, Compass, Sparkles, BarChart3, FileText, Activity } from 'lucide-react';
import { store } from '@/services/store';

interface QuickCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  screenId: string;
  role: any;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const COMMAND_ITEMS: CommandItem[] = [
  { id: 's1', screenId: 'S1', role: 'bystander', title: 'Portal Home (S1)', category: 'Bystander', description: 'Emergency landing portal & quick SOS trigger', icon: ShieldAlert },
  { id: 's2', screenId: 'S2', role: 'bystander', title: 'One-Tap SOS & Trauma Twin (S2)', category: 'Bystander', description: 'GPS coordinates streaming with 3D body pain scan', icon: ShieldAlert },
  { id: 's3', screenId: 'S3', role: 'bystander', title: 'Scene Guide Protocol (S3)', category: 'Bystander', description: 'Step-by-step CPR & bleeding control instructions', icon: Activity },
  { id: 's4', screenId: 'S4', role: 'bystander', title: 'Ambulance Live Tracker (S4)', category: 'Bystander', description: 'Real-time vehicle map tracking and ETA countdown', icon: Ambulance },
  { id: 's5', screenId: 'S5', role: 'bystander', title: 'Family Document Upload (S5)', category: 'Bystander', description: 'Prior ECGs, prescriptions, and PMJAY card upload', icon: FileText },
  { id: 's8', screenId: 'S8', role: 'crew', title: 'Paramedic Live Telemetry (S8)', category: 'Crew', description: '3D digital twin, dual-waveform BP 200/110, voice note', icon: Ambulance },
  { id: 's9', screenId: 'S9', role: 'crew', title: 'Handoff Confirmation (S9)', category: 'Crew', description: 'Digital transfer sign-off and receiving nurse handshake', icon: Ambulance },
  { id: 's10', screenId: 'S10', role: 'dispatcher', title: 'Emergency Command Deck (S10)', category: 'Dispatch', description: 'Satellite dispatch map, helicopter picker, swipe rail', icon: Compass },
  { id: 's11', screenId: 'S11', role: 'triage', title: 'Neural AI Pre-Alert Triage (S11)', category: 'Hospital', description: '3D Holographic AI Energy Orb and ESI 1-5 allocation', icon: Sparkles },
  { id: 's12', screenId: 'S12', role: 'desk', title: 'Registration & PMJAY Desk (S12)', category: 'Hospital', description: 'Ayushman Bharat eligibility check and intake verification', icon: FileText },
  { id: 's14', screenId: 'S14', role: 'doctor', title: 'Doctor Trauma Board & Bay Hold (S14)', category: 'Doctor', description: '3D anatomical review, bay reservation countdown, lock bay', icon: Stethoscope },
  { id: 's15', screenId: 'S15', role: 'doctor', title: 'Critical Alert Takeover (S15)', category: 'Doctor', description: 'Full-screen emergency strobe overlay with audio alarm', icon: ShieldAlert },
  { id: 's17', screenId: 'S17', role: 'nurse', title: 'Bay Readiness Board (S17)', category: 'Nurse', description: 'Trauma bay occupancy, kit allocation, and turn-around timer', icon: Activity },
  { id: 's19', screenId: 'S19', role: 'dept', title: 'Specialty Department Console (S19)', category: 'Specialty', description: 'Cath lab, CT suite, and blood bank coordination', icon: BarChart3 },
  { id: 's24', screenId: 'S24', role: 'admin', title: 'Hospital Spatial Analytics (S24)', category: 'Admin', description: 'Spatial performance, golden hour ledger, and CSV export', icon: BarChart3 },
];

export const QuickCommandModal: React.FC<QuickCommandModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global hotkey Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = COMMAND_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.screenId.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: CommandItem) => {
    store.setRole(item.role, item.screenId);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl glass-specular border border-white/40 dark:border-white/10 p-5 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/20">
          <div className="flex items-center gap-2">
            <span className="neural-ai-orb" />
            <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              GoldenHour AI Command Palette
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/70 dark:border-slate-700 px-3.5 py-2.5 shadow-inner">
          <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search views, protocols, triage ESI, or press Esc to close..."
            className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-1.5 pr-1">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 hover:bg-white/90 dark:hover:bg-slate-800/90 border border-transparent hover:border-cyan-500/40 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            );
          })}

          {filtered.length === 0 && (
            <p className="py-8 text-center text-xs font-semibold text-slate-400">
              No matching clinical view or protocol found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickCommandModal;
