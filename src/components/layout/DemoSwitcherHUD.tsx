import * as React from 'react';
import {
  Layers,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Shield,
  Activity,
  User,
  Radio,
  SlidersHorizontal,
} from 'lucide-react';
import { store, useAppStore } from '@/services/store';
import { APP_CONFIG, setAiEnabled } from '@/services/config';
import { UserRole } from '@/types';

export const DemoSwitcherHUD: React.FC = () => {
  const { currentRole, currentScreenId, activeCaseId } = useAppStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [aiActive, setAiActive] = React.useState(APP_CONFIG.AI_ENABLED);

  const screens: { id: string; label: string; role: UserRole; category: string }[] = [
    { id: 'S1', label: 'S1 Landing (Public)', role: 'bystander', category: 'Public & Bystander' },
    { id: 'S2', label: 'S2 SOS Trigger (F1)', role: 'bystander', category: 'Public & Bystander' },
    { id: 'S3', label: 'S3 Scene Guide (F2)', role: 'bystander', category: 'Public & Bystander' },
    { id: 'S4', label: 'S4 Live Tracker (F5)', role: 'family', category: 'Patient & Family' },
    { id: 'S5', label: 'S5 Family Upload (F10)', role: 'family', category: 'Patient & Family' },
    { id: 'S6', label: 'S6 Staff Sign-In', role: 'doctor', category: 'Clinical & Crew' },
    { id: 'S7', label: 'S7 Role Registration', role: 'doctor', category: 'Clinical & Crew' },
    { id: 'S8', label: 'S8 Paramedic Live (F6,F9)', role: 'crew', category: 'Clinical & Crew' },
    { id: 'S9', label: 'S9 Handoff Confirmation', role: 'crew', category: 'Clinical & Crew' },
    { id: 'S10', label: 'S10 Command Map (F28,F30)', role: 'dispatcher', category: 'Hospital & Command' },
    { id: 'S11', label: 'S11 Triage Review (F11)', role: 'triage', category: 'Hospital & Command' },
    { id: 'S12', label: 'S12 Desk & PMJAY (F14)', role: 'desk', category: 'Hospital & Command' },
    { id: 'S13', label: 'S13 Fast Gate (F15)', role: 'gate', category: 'Hospital & Command' },
    { id: 'S14', label: 'S14 Doctor Case Radar (F20)', role: 'doctor', category: 'Hospital & Command' },
    { id: 'S15', label: 'S15 Alert Takeover (F19)', role: 'doctor', category: 'Hospital & Command' },
    { id: 'S16', label: 'S16 Break-Glass (F23)', role: 'doctor', category: 'Hospital & Command' },
    { id: 'S17', label: 'S17 Bay Readiness Board', role: 'dept', category: 'Hospital & Command' },
    { id: 'S18', label: 'S18 Room & Kit (F13,F22)', role: 'nurse', category: 'Hospital & Command' },
    { id: 'S19', label: 'S19 Dept Auto-Ping (F21)', role: 'dept', category: 'Hospital & Command' },
    { id: 'S20', label: 'S20 Volunteer Reg', role: 'volunteer', category: 'First Responders' },
    { id: 'S21', label: 'S21 Volunteer Radar (F24)', role: 'volunteer', category: 'First Responders' },
    { id: 'S22', label: 'S22 Landmark Tag (F3,F32)', role: 'volunteer', category: 'First Responders' },
    { id: 'S23', label: 'S23 Hospital Setup', role: 'admin', category: 'Admin & Analytics' },
    { id: 'S24', label: 'S24 Analytics (F26,F27,F37)', role: 'admin', category: 'Admin & Analytics' },
    { id: 'S25', label: 'S25 Access Log (F29,F36)', role: 'family', category: 'Patient & Family' },
  ];

  const handleSelectScreen = (screenId: string, role: UserRole) => {
    store.setRole(role, screenId);
  };

  const handleToggleAi = () => {
    const next = !aiActive;
    setAiActive(next);
    setAiEnabled(next);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      {/* Floating Pill Toggle Button */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-navy-900/90 text-white border border-teal-500/40 shadow-e3 backdrop-blur-md hover:bg-navy-900 hover:border-teal-500 hover:scale-105 transition-all text-small font-semibold group cursor-pointer"
          title="Open Demo Navigator for S1-S25"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-teal-500 animate-ping" />
          <span className="text-micro font-mono text-teal-500 font-bold uppercase tracking-wider">
            {currentScreenId} • {currentRole.toUpperCase()}
          </span>
          <span className="text-xs text-white/80 font-medium hidden sm:inline">Demo HUD</span>
          <ChevronUp className="h-4 w-4 text-white/60 group-hover:text-white transition-transform" />
        </button>
      ) : (
        /* Expanded High-Tech Glass Drawer */
        <div className="w-[360px] sm:w-[420px] max-h-[82vh] rounded-card bg-navy-900/95 border border-teal-500/40 shadow-e3 backdrop-blur-2xl flex flex-col overflow-hidden text-white animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-navy-950/60">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-teal-500" />
              <span className="text-small font-bold tracking-tight text-white">
                GoldenHour AI — Screen Navigator
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* AI Toggle Banner */}
          <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between bg-teal-500/10">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-500" />
              <span className="text-micro font-bold uppercase tracking-wider text-teal-400">
                AI Suggestion Engine (F8-F37)
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleAi}
              className={`text-micro font-bold px-2.5 py-1 rounded-chip border transition-all ${
                aiActive
                  ? 'bg-teal-500 text-navy-900 border-teal-400 shadow-[0_0_10px_rgba(0,180,200,0.4)]'
                  : 'bg-white/10 text-white/60 border-white/20'
              }`}
            >
              {aiActive ? 'ENABLED (Mock)' : 'FALLBACK MODE'}
            </button>
          </div>

          {/* 25 Screen Selector Grid */}
          <div className="p-3 overflow-y-auto flex-1 space-y-3 max-h-[55vh]">
            {['Public & Bystander', 'Patient & Family', 'Clinical & Crew', 'Hospital & Command', 'First Responders', 'Admin & Analytics'].map(
              (cat) => (
                <div key={cat} className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 px-2 pt-1">
                    {cat}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {screens
                      .filter((s) => s.category === cat)
                      .map((item) => {
                        const isCurrent = currentScreenId === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectScreen(item.id, item.role)}
                            className={`p-2 rounded-btn text-left text-xs font-semibold transition-all border ${
                              isCurrent
                                ? 'bg-teal-500 text-navy-900 border-teal-400 font-bold shadow-sm'
                                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <div className="truncate">{item.label}</div>
                            <div
                              className={`text-[10px] uppercase font-mono ${
                                isCurrent ? 'text-navy-900/70' : 'text-white/40'
                              }`}
                            >
                              Role: {item.role}
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 border-t border-white/10 bg-navy-950/80 text-[11px] text-white/50 text-center">
            Zero global navigation in production • Screens transition by role & case state
          </div>
        </div>
      )}
    </div>
  );
};
