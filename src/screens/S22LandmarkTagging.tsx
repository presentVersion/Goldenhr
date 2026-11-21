import * as React from 'react';
import { MapPin, BadgeCheck, Sparkles, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { MapWrapper, MapPinItem } from '@/components/ui/map-wrapper';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { animateScreenEnter } from '@/lib/motion';

export const S22LandmarkTagging: React.FC = () => {
  const { currentRole, landmarks } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [pinCoords, setPinCoords] = React.useState<[number, number]>([17.4395, 78.3970]);
  const [landmarkName, setLandmarkName] = React.useState('');
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const isAdmin = currentRole === 'admin';

  const aiSuggestions = [
    'Durgam Cheruvu Walking Track Gate 2',
    'దుర్గం చెరువు గేట్ 2',
    'केबल ब्रिज पिलर 14',
    'Toll Plaza U-Turn',
  ];

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  const handleSave = () => {
    if (landmarkName.trim()) {
      store.addLandmark(landmarkName.trim(), pinCoords[0], pinCoords[1]);
      setSavedSuccess(true);
      setTimeout(() => {
        store.setScreen('S21');
      }, 1000);
    }
  };

  const mapPins: MapPinItem[] = [
    {
      id: 'new-pin',
      lat: pinCoords[0],
      lng: pinCoords[1],
      title: landmarkName || 'Proposed Landmark Pin',
      subtitle: 'Coordinates: 17.4395, 78.3970',
      type: 'caller',
    },
    ...landmarks.map((l) => ({
      id: l.id,
      lat: l.lat,
      lng: l.lng,
      title: l.name,
      subtitle: 'Existing Anchor',
      type: 'resource' as const,
    })),
  ];

  return (
    <div ref={containerRef} className="w-full max-w-[640px] mx-auto min-h-[calc(100vh-72px)] flex flex-col p-4 md:p-6 pb-28 space-y-5 text-slate-900 dark:text-slate-100">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => store.setScreen('S21')}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
            Emergency Landmark Anchor Tagging (F3 & F32)
          </h1>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-[300px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
        <MapWrapper
          center={pinCoords}
          zoom={15}
          pins={mapPins}
          height="100%"
        />
      </div>

      {/* Form Below */}
      <MivoCard waveArch="top" className="p-6 md:p-8 space-y-4">
        {/* Suggested Names */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              AI Landmark Suggestions (Indic Multilingual F32):
            </span>
            <Chip variant="ai" label="Multilingual" />
          </div>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLandmarkName(sug)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-950/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-rose-400 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Anchor Landmark Name
          </label>
          <input
            value={landmarkName}
            onChange={(e) => setLandmarkName(e.target.value)}
            placeholder="e.g. Durgam Cheruvu Gate 2 Pillar 14"
            className="w-full h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="pt-2">
          <MivoButton
            label={savedSuccess ? 'LANDMARK ANCHOR SAVED!' : 'SAVE EMERGENCY ANCHOR'}
            sublabel="Streams into caller landmark dropdown (S2)"
            onClick={handleSave}
            disabled={!landmarkName.trim() || savedSuccess}
            variant="emergency"
            size="md"
            arrowIcon={true}
          />
        </div>
      </MivoCard>
    </div>
  );
};
