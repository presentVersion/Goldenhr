import React, { useState } from 'react';
import { Droplet, HeartPulse, FileText, Scan, Activity, FlaskConical, Check } from 'lucide-react';

export interface MedicalCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  count?: number;
}

const DEFAULT_CATEGORIES: MedicalCategory[] = [
  { id: 'blood', name: 'Blood tests', icon: Droplet, description: 'CBC, Troponin I/T, Lipid panel', count: 2 },
  { id: 'cardio', name: 'Cardiology', icon: HeartPulse, description: '12-lead ECG, Echo records', count: 1 },
  { id: 'prescription', name: 'Prescription', icon: FileText, description: 'Medication history, allergies', count: 3 },
  { id: 'imaging', name: 'Imaging', icon: Scan, description: 'CT Angiogram, MRI brain' },
  { id: 'xray', name: 'X-ray', icon: Activity, description: 'Chest AP/Lat, trauma series' },
  { id: 'lab', name: 'Pathology', icon: FlaskConical, description: 'Biomarkers, toxicology' },
];

interface MedicalCategoryGridProps {
  onSelectCategory?: (category: MedicalCategory) => void;
  selectedId?: string;
  className?: string;
}

export const MedicalCategoryGrid: React.FC<MedicalCategoryGridProps> = ({
  onSelectCategory,
  selectedId: externalSelectedId,
  className = '',
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string>('cardio');
  const activeId = externalSelectedId || internalSelectedId;

  const handleSelect = (cat: MedicalCategory) => {
    setInternalSelectedId(cat.id);
    if (onSelectCategory) onSelectCategory(cat);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Supported Diagnostic Records
        </h4>
        <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
          Auto-Parsed by AI
        </span>
      </div>

      {/* 2x3 Grid matching Reference 4 Viora */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {DEFAULT_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelect(cat)}
              className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 select-none text-center ${
                isSelected
                  ? 'bg-gradient-to-b from-white/95 to-slate-50/90 dark:from-slate-800 dark:to-slate-900 border-2 border-cyan-500 dark:border-cyan-400 shadow-lg shadow-cyan-500/15 scale-[1.02]'
                  : 'bg-white/70 dark:bg-slate-800/60 hover:bg-white/90 dark:hover:bg-slate-800/90 border border-white/80 dark:border-white/10 shadow-sm hover:shadow-md'
              } backdrop-blur-xl`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Icon Container with subtle glass ring */}
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-2.5 transition-colors ${
                  isSelected
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 group-hover:text-cyan-600'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>

              {/* Category Name */}
              <div className="text-xs font-black tracking-tight text-slate-800 dark:text-slate-100 mb-0.5">
                {cat.name}
              </div>

              {/* Sub-label / Count badge */}
              <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-full">
                {cat.count ? `${cat.count} files attached` : 'Ready to parse'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default MedicalCategoryGrid;
