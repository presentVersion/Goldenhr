import * as React from 'react';
import {
  HeartPulse,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  Lock,
  UserCircle2,
  ScanFace,
  Fingerprint,
  UserPlus,
  Stethoscope,
  Building2,
  CheckCircle2,
  Ambulance,
  Radio,
  FileText,
  Activity,
  BedDouble,
  BarChart3,
  UserCheck,
  Share2,
  FileCheck,
  DoorOpen,
  FolderOpen,
  Shield,
  Layers,
} from 'lucide-react';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { MivoCard } from '@/components/ui/mivo-card';
import { MivoButton } from '@/components/ui/mivo-button';
import { MivoPillTag } from '@/components/ui/mivo-pill-tag';
import { store, useAppStore } from '@/services/store';
import { UserRole } from '@/types';
import { animateScrollFloat } from '@/lib/scrollAnimation';

interface DepartmentRoleCard {
  id: string;
  role: UserRole;
  targetScreen: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  tagVariant: 'lime' | 'amber' | 'jade' | 'frosted';
}

const DEPARTMENTS: { title: string; subtitle: string; roles: DepartmentRoleCard[] }[] = [
  {
    title: 'Clinical & Resuscitation Department',
    subtitle: 'Emergency physicians, trauma surgeons, charge nurses & triage',
    roles: [
      {
        id: 'doc',
        role: 'doctor',
        targetScreen: 'S14',
        title: 'Emergency Physician / Doctor',
        subtitle: 'Case radar, 3D patient dossier & trauma bay holds',
        icon: Stethoscope,
        tag: 'S14 Direct',
        tagVariant: 'lime',
      },
      {
        id: 'nurse',
        role: 'nurse',
        targetScreen: 'S18',
        title: 'Charge Nurse • Room & Kit',
        subtitle: 'Trauma bay prep, polytrauma rapid kits & equipment',
        icon: Activity,
        tag: 'S18 Direct',
        tagVariant: 'frosted',
      },
      {
        id: 'triage',
        role: 'triage',
        targetScreen: 'S11',
        title: 'Neural AI Triage Clinician',
        subtitle: 'ESI scoring, severity algorithms & second-opinion triage',
        icon: Sparkles,
        tag: 'S11 Direct',
        tagVariant: 'amber',
      },
      {
        id: 'dept',
        role: 'dept',
        targetScreen: 'S19',
        title: 'Department Head Console',
        subtitle: 'Capacity pings, cross-department handshakes & status',
        icon: BedDouble,
        tag: 'S19 Direct',
        tagVariant: 'jade',
      },
      {
        id: 'bay-board',
        role: 'dept',
        targetScreen: 'S17',
        title: 'Bay Readiness Board',
        subtitle: 'Live multi-bay capacity board & equipment status',
        icon: Layers,
        tag: 'S17 Direct',
        tagVariant: 'frosted',
      },
    ],
  },
  {
    title: 'Emergency Response & Fleet Command',
    subtitle: '108 field paramedic crews, satellite command & transfers',
    roles: [
      {
        id: 'crew',
        role: 'crew',
        targetScreen: 'S8',
        title: 'Paramedic Ambulance Crew',
        subtitle: 'Live vitals telemetry, QR sync & handover confirmation',
        icon: Ambulance,
        tag: 'S8 Direct',
        tagVariant: 'lime',
      },
      {
        id: 'dispatcher',
        role: 'dispatcher',
        targetScreen: 'S10',
        title: 'Dr+ Ambulance Control Centre',
        subtitle: 'Satellite dispatch deck, active triage incidents & routing',
        icon: Radio,
        tag: 'S10 Direct',
        tagVariant: 'amber',
      },
      {
        id: 'handoff',
        role: 'crew',
        targetScreen: 'S9',
        title: 'Handoff Transfer Confirmation',
        subtitle: 'Signed biometric clinical transfer card & bed intake',
        icon: FileCheck,
        tag: 'S9 Direct',
        tagVariant: 'jade',
      },
    ],
  },
  {
    title: 'Hospital Intake & Administration',
    subtitle: 'Security gates, reception eligibility, PMJAY & executive ledger',
    roles: [
      {
        id: 'gate',
        role: 'gate',
        targetScreen: 'S13',
        title: 'Hospital Gate Security',
        subtitle: 'Barrier clearance, beacon arrival & plate scanner',
        icon: DoorOpen,
        tag: 'S13 Direct',
        tagVariant: 'frosted',
      },
      {
        id: 'desk',
        role: 'desk',
        targetScreen: 'S12',
        title: 'Hospital Desk & PMJAY Eligibility',
        subtitle: 'Ayushman Bharat PMJAY instant eligibility & intake check',
        icon: FileText,
        tag: 'S12 Direct',
        tagVariant: 'amber',
      },
      {
        id: 'admin',
        role: 'admin',
        targetScreen: 'S24',
        title: 'Hospital Administrator Cockpit',
        subtitle: 'Golden-hour survival analytics, bottlenecks & delays',
        icon: BarChart3,
        tag: 'S24 Direct',
        tagVariant: 'lime',
      },
      {
        id: 'setup',
        role: 'admin',
        targetScreen: 'S23',
        title: 'Hospital Setup & Capacity',
        subtitle: 'Facility configuration, bed counts & trauma protocols',
        icon: Building2,
        tag: 'S23 Direct',
        tagVariant: 'frosted',
      },
    ],
  },
  {
    title: 'First Responder Volunteers & Family',
    subtitle: 'Community CPR first responders, family tracking & audit ledger',
    roles: [
      {
        id: 'volunteer',
        role: 'volunteer',
        targetScreen: 'S21',
        title: 'BLS First Responder Radar',
        subtitle: 'Golden Minutes volunteer network & AED map',
        icon: UserCheck,
        tag: 'S21 Direct',
        tagVariant: 'lime',
      },
      {
        id: 'volunteer-reg',
        role: 'volunteer',
        targetScreen: 'S20',
        title: 'Volunteer Onboarding & Cert',
        subtitle: 'CPR/BLS accreditation verification',
        icon: Shield,
        tag: 'S20 Direct',
        tagVariant: 'frosted',
      },
      {
        id: 'family',
        role: 'family',
        targetScreen: 'S4',
        title: 'Patient & Family Live Tracker',
        subtitle: 'Ambulance ETA, telemetry & hospital route',
        icon: Share2,
        tag: 'S4 Direct',
        tagVariant: 'amber',
      },
      {
        id: 'family-docs',
        role: 'family',
        targetScreen: 'S5',
        title: 'Family Document OCR Upload',
        subtitle: 'Medical records, allergies & insurance cards',
        icon: FolderOpen,
        tag: 'S5 Direct',
        tagVariant: 'jade',
      },
      {
        id: 'access-log',
        role: 'family',
        targetScreen: 'S25',
        title: 'Patient Immutable Access Log',
        subtitle: 'ABDM compliance & break-glass access audit ledger',
        icon: Lock,
        tag: 'S25 Direct',
        tagVariant: 'frosted',
      },
    ],
  },
];

export const S6Login: React.FC = () => {
  const { currentRole } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [authMethod, setAuthMethod] = React.useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = React.useState('+91 98765 43210');
  const [codeSent, setCodeSent] = React.useState(false);
  const [otp, setOtp] = React.useState(['7', '2', '4', '8', '1', '9']);
  const [selectedRole, setSelectedRole] = React.useState<UserRole>(currentRole || 'doctor');
  const [error, setError] = React.useState('');
  const [biometricScanning, setBiometricScanning] = React.useState(false);

  React.useEffect(() => {
    animateScrollFloat(containerRef.current);
  }, []);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeSent(true);
    setError('');
  };

  const handleVerify = () => {
    const entered = otp.join('');
    if (entered.length < 6) {
      setError('Please enter the full 6-digit security code.');
      return;
    }
    store.setRole(selectedRole);
  };

  const handleBiometricAuth = () => {
    setBiometricScanning(true);
    setTimeout(() => {
      setBiometricScanning(false);
      store.setRole(selectedRole);
    }, 1000);
  };

  const handleLaunchRole = (role: UserRole, targetScreen: string) => {
    store.setRole(role, targetScreen);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-72px)] p-4 md:p-8 flex flex-col items-center justify-start overflow-hidden bg-slate-50 dark:bg-[#070b12] text-slate-900 dark:text-slate-100 pb-32"
    >
      {/* Radiant Glowing Ambient Mesh */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-gradient-to-tr from-rose-500/20 via-pink-500/10 to-amber-500/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1240px] space-y-8">
        
        {/* Main Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-rose-200/60 dark:border-rose-900/40 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-800 dark:text-rose-300">
              GoldenHour Hospital & Department Access Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Healthcare Department Portals
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Direct authenticated access to all 25 emergency, surgical, fleet, and administration modules. Zero hidden logins.
          </p>
        </div>

        {/* Top 2-Column: OTP/Biometric Login Form (Left) & Quick Access Hero (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Secure Credential Verification Box (5 cols) */}
          <div className="lg:col-span-5 scroll-float">
            <MivoCard waveArch="top" className="p-6 md:p-8 space-y-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 shrink-0">
                  <HeartPulse className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Sign in to Portal
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    ABDM M1 & M2 Compliant • Zero Aadhaar Stored
                  </span>
                </div>
              </div>

              {/* Simulated Role Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Select Staff Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="flex h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 px-4 py-2 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm cursor-pointer"
                >
                  <option value="doctor">Emergency Physician / Doctor (S14)</option>
                  <option value="crew">Paramedic Ambulance Crew (S8)</option>
                  <option value="dispatcher">Emergency Dispatcher (S10)</option>
                  <option value="triage">Triage Clinician (S11)</option>
                  <option value="nurse">Charge Nurse (S18)</option>
                  <option value="dept">Department Head (S19)</option>
                  <option value="desk">Hospital Desk & PMJAY (S12)</option>
                  <option value="gate">Hospital Gate Security (S13)</option>
                  <option value="volunteer">BLS Volunteer (S21)</option>
                  <option value="admin">Hospital Administrator (S24)</option>
                </select>
              </div>

              {/* Phone vs Hospital Email Segmented */}
              <SegmentedControl<'phone' | 'email'>
                options={[
                  { value: 'phone', label: 'Mobile Phone' },
                  { value: 'email', label: 'Hospital Email' },
                ]}
                value={authMethod}
                onChange={(val) => {
                  setAuthMethod(val);
                  setIdentifier(val === 'phone' ? '+91 98765 43210' : 'dr.sharma@apollohospital.org');
                }}
              />

              {!codeSent ? (
                <form onSubmit={handleSendCode} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {authMethod === 'phone' ? 'Verified Mobile Number' : 'Hospital Email ID'}
                    </label>
                    <input
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={authMethod === 'phone' ? '+91 98765 43210' : 'doctor@hospital.org'}
                      required
                      className="w-full h-11 px-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                    />
                  </div>

                  <MivoButton
                    label="SEND 6-DIGIT OTP"
                    sublabel="Instant passcode verification"
                    onClick={() => setCodeSent(true)}
                    variant="emergency"
                    size="md"
                    arrowIcon={true}
                  />

                  {/* Biometric Quick Login */}
                  <button
                    type="button"
                    onClick={handleBiometricAuth}
                    disabled={biometricScanning}
                    className="w-full py-2.5 px-4 rounded-2xl glass-specular border border-slate-200 dark:border-white/10 hover:border-rose-400 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 transition-all"
                  >
                    <Fingerprint className={`w-4 h-4 text-rose-500 ${biometricScanning ? 'animate-spin' : ''}`} />
                    <span>{biometricScanning ? 'Verifying TouchID...' : 'Quick Pass with TouchID / FaceID'}</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-3.5">
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Enter 6-digit OTP sent to <strong className="text-rose-500">{identifier}</strong>
                    </span>
                  </div>

                  <div className="flex justify-center gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const next = [...otp];
                          next[idx] = e.target.value;
                          setOtp(next);
                        }}
                        className="w-10 h-11 text-center text-lg font-black rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                      />
                    ))}
                  </div>

                  {error && <p className="text-xs text-rose-600 font-bold text-center">{error}</p>}

                  <MivoButton
                    label="VERIFY & ENTER SYSTEM"
                    sublabel={`Launch role workspace for ${selectedRole.toUpperCase()}`}
                    onClick={handleVerify}
                    variant="emergency"
                    size="md"
                    arrowIcon={true}
                  />

                  <button
                    type="button"
                    onClick={() => setCodeSent(false)}
                    className="w-full text-center text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors"
                  >
                    Change phone or email
                  </button>
                </div>
              )}

              {/* Register New Clinical Staff Link */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">New Medical Staff?</span>
                <button
                  type="button"
                  onClick={() => store.setScreen('S7')}
                  className="font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                >
                  <span>Register Clinical License (S7)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </MivoCard>
          </div>

          {/* Right Column: Direct Jump Matrix for All Healthcare Departments (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {DEPARTMENTS.map((dept, deptIdx) => (
              <div key={deptIdx} className="scroll-float space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-white/10 pb-1.5">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      {dept.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {dept.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dept.roles.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div
                        key={r.id}
                        onClick={() => handleLaunchRole(r.role, r.targetScreen)}
                        className="group relative p-3.5 rounded-2xl glass-specular border border-slate-200/80 dark:border-white/10 hover:border-rose-400 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition-all">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-rose-500 transition-colors">
                              {r.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                              {r.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          <MivoPillTag label={r.tag} variant={r.tagVariant} />
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
