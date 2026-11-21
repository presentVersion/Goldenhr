import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import {
  Download,
  Calendar,
  Sparkles,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  FileText,
  Eye,
  ShieldCheck,
  Zap,
  Clock3,
  Activity,
  ListChecks,
  ChevronRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { GsapCounter } from '@/components/ui/gsap-counter';
import { store, useAppStore } from '@/services/store';
import { AiProvider } from '@/services/mockProviders';
import { animateScreenEnter } from '@/lib/motion';

interface WorkItem {
  id: string;
  name: string;
  description: string;
  tool: string;
  owner: string;
  status: 'Needs review' | 'Scheduled' | 'Running' | 'Exceptions';
  timestamp: string;
}

const INITIAL_CLINICAL_WORK: WorkItem[] = [
  { id: 'EMS-401', name: 'STEMI Handoff Review', description: 'Patient GH-2026-8812 arriving at Bay 1. ECG lead elevation verified by AI.', tool: 'Ambulance 04', owner: 'ER Trauma Team', status: 'Needs review', timestamp: '14:22' },
  { id: 'EMS-402', name: 'Cath Lab Room Hold', description: 'Immediate coronary angioplasty reserved. Ready for catheterization.', tool: 'Apollo Jubilee', owner: 'Cardiology', status: 'Scheduled', timestamp: '14:35' },
  { id: 'EMS-403', name: 'RFID Gate Fast-Track', description: 'Auto-barrier optical sensor streaming live vehicle beacon telemetry.', tool: 'Gate Beacon 02', owner: 'Facility Security', status: 'Running', timestamp: '14:18' },
  { id: 'EMS-404', name: 'Network Sync Exception', description: 'SMS HMAC capsule fallback activated due to intermittent 4G cellular tunnel.', tool: 'Telemetry Mesh', owner: 'EMS Dispatch', status: 'Exceptions', timestamp: '14:09' },
];

export const S24Analytics: React.FC = () => {
  const { hospitals } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [dateRange, setDateRange] = React.useState('last_7_days');
  const [selectedHospital, setSelectedHospital] = React.useState('all');
  const [showSeverityAdjusted, setShowSeverityAdjusted] = React.useState(true);
  const [workList, setWorkList] = React.useState<WorkItem[]>(INITIAL_CLINICAL_WORK);
  const [inspectItem, setInspectItem] = React.useState<WorkItem | null>(null);

  React.useEffect(() => {
    animateScreenEnter(containerRef.current);
  }, []);

  // F26 Delay Ledger Data (Stage durations in minutes)
  const delayData = [
    { stage: 'Dispatch', actualMin: 2.1, benchmarkMin: 3.0, anomaly: false },
    { stage: 'Transit Scene', actualMin: 8.4, benchmarkMin: 7.5, anomaly: false },
    { stage: 'Field Triage', actualMin: 4.8, benchmarkMin: 4.0, anomaly: false },
    { stage: 'Transit Hosp', actualMin: 9.6, benchmarkMin: 8.0, anomaly: true },
    { stage: 'ER Handover', actualMin: 14.2, benchmarkMin: 8.5, anomaly: true },
  ];

  // F27 Benchmark line data per hospital
  const benchmarkData = [
    { hour: '08:00', apollo: 12, nims: 16, osmania: 18 },
    { hour: '11:00', apollo: 15, nims: 22, osmania: 24 },
    { hour: '14:00', apollo: 18, nims: 28, osmania: 29 },
    { hour: '17:00', apollo: 16, nims: 25, osmania: 26 },
    { hour: '20:00', apollo: 11, nims: 17, osmania: 19 },
  ];

  // F26 Heatmap zones (Simulated delay index)
  const heatmapZones = [
    { name: 'Madhapur Flyover', delayScore: 'high', color: 'bg-red-600/80' },
    { name: 'Kondapur Junction', delayScore: 'high', color: 'bg-red-600/80' },
    { name: 'Jubilee Hills Checkpost', delayScore: 'medium', color: 'bg-amber-500/80' },
    { name: 'Gachibowli Outer Ring', delayScore: 'low', color: 'bg-green-600/80' },
    { name: 'Panjagutta Circle', delayScore: 'medium', color: 'bg-amber-500/80' },
    { name: 'Banjara Hills Rd 12', delayScore: 'low', color: 'bg-green-600/80' },
  ];

  // F37 Narrator output
  const aiNarrative = AiProvider.generateNarrative({
    avgHandoverMin: 14.2,
    stage1Min: 2.1,
    delaysCount: 2,
  });

  const handleExportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Stage,ActualMin,BenchmarkMin\n' +
      delayData.map((e) => `${e.stage},${e.actualMin},${e.benchmarkMin}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'goldenhour_delay_ledger.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={containerRef}
      className="theme-command w-full min-h-[calc(100vh-72px)] bg-command-bg text-command-text p-4 md:p-8 space-y-6 pb-24"
    >
      {/* 1. Filters & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-command-border">
        <div>
          <h1 className="text-h1 font-bold text-command-text">Regional Emergency Analytics (F26 & F27)</h1>
          <p className="text-small text-command-muted">
            Survival clock variance, stage bottleneck audit, and handover benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-3 rounded-btn bg-command-surface border border-command-border text-small text-command-text font-semibold"
          >
            <option value="today">Today (Live)</option>
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportCSV}
            className="text-command-muted hover:text-white"
          >
            <Download className="h-4 w-4 mr-1.5" />
            <span>Export CSV</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => store.setScreen('S25')}
            className="text-teal-500 border-teal-500 hover:bg-teal-500/10"
          >
            <Eye className="h-4 w-4 mr-1.5" />
            <span>Patient Access Audit (S25)</span>
          </Button>
        </div>
      </div>

      {/* Row 1: Four Glass Specular Metric Cards (GlassyDashboard Architecture) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Golden Hour Compliance */}
        <div className="glass-specular p-4 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Golden Hour Compliance</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight my-2">
            <GsapCounter value={89.4} format="percent" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-teal-400 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.7% vs prior month</span>
          </div>
        </div>

        {/* Metric 2: Active Emergency Fleet */}
        <div className="glass-specular p-4 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Active Ambulance Fleet</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight my-2">
            <GsapCounter value={18} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <span>12 Free • 6 Dispatched</span>
          </div>
        </div>

        {/* Metric 3: Median Handover Latency */}
        <div className="glass-specular p-4 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Median Handover Latency</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight my-2">
            <GsapCounter value={14.2} /> <span className="text-sm font-semibold text-slate-400">min</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-teal-400 font-bold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>−3.4 min improvement</span>
          </div>
        </div>

        {/* Metric 4: Bottleneck Clusters */}
        <div className="glass-specular p-4 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Traffic Anomaly Zones</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight my-2">
            <GsapCounter value={2} /> <span className="text-sm font-semibold text-slate-400">corridors</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold">
            <span>Madhapur & Kondapur</span>
          </div>
        </div>
      </div>

      {/* Row 2: Delay Ledger (7 cols) & Heatmap (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Delay Ledger Recharts Bar Chart (7 cols) */}
        <Card className="lg:col-span-7 p-5 bg-command-surface border-command-border space-y-4 shadow-e1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-body font-bold text-command-text">Emergency Delay Ledger (F26)</h3>
              <p className="text-micro text-command-muted">Actual vs Benchmark duration by response stage</p>
            </div>
            <Chip variant="ai" label="Anomaly detection (mock)" />
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={delayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#24406E" />
                <XAxis dataKey="stage" stroke="#9FB3D1" fontSize={12} />
                <YAxis stroke="#9FB3D1" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1A36', borderColor: '#24406E', color: '#E8EFFA' }}
                />
                <Bar dataKey="actualMin" fill="#00B4C8" name="Actual Minutes" radius={[4, 4, 0, 0]} />
                <Bar dataKey="benchmarkMin" fill="#5A6B85" name="Target Benchmark" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-2 text-micro text-amber-500">
            <AlertTriangle className="h-4 w-4" />
            <span>ER Handover and Hospital Transit stages flagged for clinical turnaround delay.</span>
          </div>
        </Card>

        {/* Heatmap Grid (5 cols) */}
        <Card className="lg:col-span-5 p-5 bg-command-surface border-command-border space-y-4 shadow-e1">
          <div className="flex items-center justify-between">
            <h3 className="text-body font-bold text-command-text">Transit Delay Heatmap (F26)</h3>
            <span className="text-micro text-command-muted">Traffic Bottleneck Clusters</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {heatmapZones.map((zone, i) => (
              <div
                key={i}
                className="p-3 rounded-btn bg-command-bg border border-command-border flex flex-col justify-between"
              >
                <span className="text-small font-semibold text-command-text">{zone.name}</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-micro text-command-muted uppercase">{zone.delayScore}</span>
                  <span className={`h-3 w-3 rounded-full ${zone.color}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-micro text-command-muted pt-2 border-t border-command-border">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
              <span>Low Delay</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span>Moderate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
              <span>Severe Delay</span>
            </span>
          </div>
        </Card>
      </div>

      {/* Row 3: Handover Benchmark (7 cols) & AI Narrative (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Benchmark Line Chart (7 cols) */}
        <Card className="lg:col-span-7 p-5 bg-command-surface border-command-border space-y-4 shadow-e1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-body font-bold text-command-text">Handover Benchmark (F27)</h3>
              <p className="text-micro text-command-muted">Arrival to handover duration (minutes)</p>
            </div>

            <button
              type="button"
              onClick={() => setShowSeverityAdjusted(!showSeverityAdjusted)}
              className="text-micro font-semibold text-teal-500 border border-teal-500/40 px-2.5 py-1 rounded-btn hover:bg-teal-500/10"
            >
              {showSeverityAdjusted ? 'Severity-Adjusted' : 'Raw Durations'}
            </button>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={benchmarkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#24406E" />
                <XAxis dataKey="hour" stroke="#9FB3D1" fontSize={12} />
                <YAxis stroke="#9FB3D1" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1A36', borderColor: '#24406E', color: '#E8EFFA' }}
                />
                <Line type="monotone" dataKey="apollo" stroke="#00B4C8" strokeWidth={2.5} name="Apollo" />
                <Line type="monotone" dataKey="nims" stroke="#E8A317" strokeWidth={2} name="NIMS" />
                <Line type="monotone" dataKey="osmania" stroke="#D93A3A" strokeWidth={2} name="Osmania" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 5. AI Narrative Card (F37) */}
        <Card className="lg:col-span-5 p-5 bg-command-surface border-command-border space-y-3 shadow-e1">
          <div className="flex items-center justify-between">
            <h3 className="text-body font-bold text-command-text">Executive Narrative (F37)</h3>
            <Chip variant="ai" label="Narrator LLM v0" confidence={aiNarrative.confidence} />
          </div>

          <div className="p-3 bg-command-bg rounded-btn border border-command-border text-small leading-relaxed text-command-text">
            "{aiNarrative.narrative}"
          </div>

          <div className="p-2.5 rounded bg-amber-500/10 text-amber-500 text-micro font-semibold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
            <span>AI draft. Review and verify before sharing with regional EMS authorities.</span>
          </div>
        </Card>
      </div>

      {/* Row 4: Active Clinical Operations Board (GlassyDashboard OperationsView) */}
      <div className="glass-specular p-6 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-teal-400" />
              <span>Active Clinical Operations Board</span>
            </h3>
            <p className="text-xs text-slate-400">
              Track queued paramedic handovers, bay holds, fast-track barriers, and network exceptions.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            {workList.length} Active System Queues
          </span>
        </div>

        {/* 4 Lanes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {(['Needs review', 'Scheduled', 'Running', 'Exceptions'] as const).map((status) => {
            const laneItems = workList.filter((item) => item.status === status);
            const statusConfig = {
              'Needs review': { color: 'text-rose-400 bg-rose-500/20 border-rose-500/30' },
              Scheduled: { color: 'text-amber-400 bg-amber-500/20 border-amber-500/30' },
              Running: { color: 'text-teal-400 bg-teal-500/20 border-teal-500/30' },
              Exceptions: { color: 'text-slate-300 bg-slate-700/50 border-slate-600' },
            }[status];

            return (
              <div
                key={status}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between pb-1">
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-black uppercase border ${statusConfig.color}`}>
                    {status}
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    {laneItems.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {laneItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setInspectItem(item)}
                      className="w-full p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-cyan-400/40 text-left transition-all shadow-sm group"
                    >
                      <div className="flex items-center justify-between text-xs font-black text-white mb-1">
                        <span className="truncate">{item.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-1 border-t border-white/5">
                        <span className="font-semibold text-teal-400">{item.tool}</span>
                        <span className="font-mono">{item.timestamp}</span>
                      </div>
                    </button>
                  ))}

                  {laneItems.length === 0 && (
                    <p className="py-4 text-center text-xs text-slate-500 italic">
                      Queue clear.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Work Item Inspection Dialog (GlassyDashboard Dialog) */}
      {inspectItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
          onClick={() => setInspectItem(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl glass-specular p-6 border border-white/20 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-500/30">
                  {inspectItem.status}
                </span>
                <span className="font-mono text-xs text-slate-400">{inspectItem.id}</span>
              </div>
              <button
                onClick={() => setInspectItem(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{inspectItem.name}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {inspectItem.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">System Node</span>
                <span className="text-xs font-bold text-white mt-0.5 block">{inspectItem.tool}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Clinical Owner</span>
                <span className="text-xs font-bold text-white mt-0.5 block">{inspectItem.owner}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Logged At</span>
                <span className="text-xs font-mono font-bold text-teal-400 mt-0.5 block">{inspectItem.timestamp}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              {inspectItem.status === 'Needs review' && (
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black"
                  onClick={() => {
                    setWorkList((prev) =>
                      prev.map((w) => (w.id === inspectItem.id ? { ...w, status: 'Scheduled' } : w))
                    );
                    setInspectItem(null);
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Mark Reviewed & Schedule Transfer</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="md"
                onClick={() => setInspectItem(null)}
                className="text-slate-400 hover:text-white"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
