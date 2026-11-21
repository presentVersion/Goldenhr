import { useState, useEffect } from 'react';
import {
  CaseRecord,
  CaseState,
  UserRole,
  Hospital,
  Department,
  Bay,
  DocumentItem,
  AccessLog,
  Volunteer,
  Landmark,
  MedicalResource,
  KitAssignment,
  SeverityLevel,
} from '@/types';
import { AiProvider } from './mockProviders';

export interface AppState {
  currentRole: UserRole;
  currentScreenId: string; // e.g. 'S1', 'S2', ... 'S25'
  activeCaseId: string;
  cases: CaseRecord[];
  hospitals: Hospital[];
  departments: Department[];
  bays: Bay[];
  documents: DocumentItem[];
  accessLogs: AccessLog[];
  volunteers: Volunteer[];
  landmarks: Landmark[];
  resources: MedicalResource[];
  kitAssignments: KitAssignment[];
  currentLanguage: 'en' | 'te' | 'hi';
  connectionStatus: 'live' | 'reconnecting' | 'offline';
  isSilenceActive: boolean;
  selectedReportPatientId?: string;
  showTakeoverCaseId?: string;
  familyToken?: string;
  volunteerDuty: boolean;
}

// Initial Simulated Seed Data per Section 11 & Section 16
const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-apollo',
    name: 'Apollo Jubilee Hills Trauma Center',
    lat: 17.4325,
    lng: 78.4071,
    verified: true,
    sim: true,
    freeBeds: 3,
    totalBeds: 24,
  },
  {
    id: 'hosp-nims',
    name: "Nizam's Institute of Medical Sciences (NIMS)",
    lat: 17.4226,
    lng: 78.4526,
    verified: true,
    sim: true,
    freeBeds: 1,
    totalBeds: 30,
  },
  {
    id: 'hosp-osmania',
    name: 'Osmania General Hospital',
    lat: 17.3776,
    lng: 78.4735,
    verified: true,
    sim: true,
    freeBeds: 4,
    totalBeds: 40,
  },
];

const INITIAL_DEPARTMENTS: Department[] = [
  { id: 'dept-er', hospital_id: 'hosp-apollo', name: 'Emergency Room', type: 'ER', median_prep_minutes: 4 },
  { id: 'dept-icu', hospital_id: 'hosp-apollo', name: 'Intensive Care Unit', type: 'ICU', median_prep_minutes: 12 },
  { id: 'dept-ct', hospital_id: 'hosp-apollo', name: 'Trauma CT Suite', type: 'CT', median_prep_minutes: 6 },
  { id: 'dept-cath', hospital_id: 'hosp-apollo', name: 'Cath Lab', type: 'CathLab', median_prep_minutes: 15 },
  { id: 'dept-blood', hospital_id: 'hosp-apollo', name: 'Blood Bank', type: 'BloodBank', median_prep_minutes: 5 },
];

const INITIAL_BAYS: Bay[] = [
  { id: 'bay-1', hospital_id: 'hosp-apollo', department_id: 'dept-er', name: 'Trauma Bay 1 (Red)', type: 'BedDouble', status: 'held', holdExpiresAt: new Date(Date.now() + 85000).toISOString(), holdDurationSeconds: 90, kitStatus: 'preparing', prepProgress: 60, estReadyMinutes: 3 },
  { id: 'bay-2', hospital_id: 'hosp-apollo', department_id: 'dept-er', name: 'Trauma Bay 2 (Red)', type: 'BedDouble', status: 'free', kitStatus: 'ready' },
  { id: 'bay-3', hospital_id: 'hosp-apollo', department_id: 'dept-icu', name: 'Resuscitation ICU-A', type: 'BedSingle', status: 'preparing', prepProgress: 40, estReadyMinutes: 8 },
  { id: 'bay-4', hospital_id: 'hosp-apollo', department_id: 'dept-ct', name: 'CT Scanner Suite 1', type: 'ScanLine', status: 'free' },
  { id: 'bay-5', hospital_id: 'hosp-apollo', department_id: 'dept-cath', name: 'Cath Lab 2', type: 'Activity', status: 'occupied' },
  { id: 'bay-6', hospital_id: 'hosp-apollo', department_id: 'dept-blood', name: 'Blood Bank O-Negative Reserve', type: 'Droplets', status: 'free' },
];

const INITIAL_CASES: CaseRecord[] = [
  {
    id: 'GH-2026-8812',
    state: 'PRE_ALERTED',
    severity: 'critical',
    lat: 17.4399,
    lng: 78.3982,
    location_name: 'Durgam Cheruvu Flyover Junction',
    location_source: 'gps',
    mlc: true,
    mass_casualty: false,
    silent: false,
    family_docs_requested: true,
    created_at: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    incident_time: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    assigned_ambulance_id: 'Ambulance 04',
    assigned_hospital_id: 'hosp-apollo',
    caller_answers: {
      breathingNormally: false,
      responsive: false,
      heavyBleeding: true,
      voiceTranscript: 'Motorcycle crash, male driver unconscious, bleeding from head, breathing shallow.',
    },
    vitals: {
      bp: '142/90',
      hr: 118,
      spo2: 92,
      gcs: 12,
      isAiDrafted: true,
    },
    patient_id: 'pat-8812',
    patient_name: 'Vikram Rao (Simulated)',
    patient_age: 38,
    patient_gender: 'Male',
    triage_esi: 2,
    symptoms_summary: 'Blunt chest & head trauma, tachycardia, shallow respiration',
    deterioration_signal: true,
  },
  {
    id: 'GH-2026-8813',
    state: 'REPORTED',
    severity: 'watch',
    lat: 17.4482,
    lng: 78.3742,
    location_name: 'Kondapur Signal near Botanical Garden',
    location_source: 'landmark',
    mlc: false,
    mass_casualty: false,
    silent: false,
    family_docs_requested: false,
    created_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    incident_time: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    caller_answers: {
      breathingNormally: true,
      responsive: true,
      heavyBleeding: false,
      voiceTranscript: 'Elderly lady collapsed with chest heaviness.',
    },
    symptoms_summary: 'Chest tightness, diaphoresis, radiating left arm pain',
  },
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    case_id: 'GH-2026-8812',
    type: 'patient_id',
    name: 'Drivers_License_Vikram.jpg',
    file_path: '/uploads/dl_simulated.jpg',
    status: 'verified',
    ai_type: 'Driver License',
    ai_quality: 'high',
    created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 'doc-2',
    case_id: 'GH-2026-8812',
    type: 'prior_reports',
    name: 'Discharge_Summary_Cardiology_2024.pdf',
    file_path: '/uploads/cardio_report.pdf',
    status: 'pending',
    ai_type: 'Discharge Summary',
    ai_quality: 'high',
    ai_flags: ['Prior PCI with drug-eluting stent 2024', 'Severe penicillin allergy noted'],
    created_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  },
  {
    id: 'doc-3',
    case_id: 'GH-2026-8812',
    type: 'insurance',
    name: 'Ayushman_Bharat_PMJAY_Card.jpg',
    file_path: '/uploads/pmjay_card.jpg',
    status: 'pending',
    ai_type: 'PMJAY Health Card',
    ai_quality: 'blurry',
    ai_flags: ['Check: image is blurry'],
    created_at: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
  },
];

const INITIAL_ACCESS_LOGS: AccessLog[] = [
  {
    id: 'log-1',
    patient_id: 'pat-8812',
    actor_role: 'Paramedic Crew (Ambulance 04)',
    purpose: 'Emergency Field Triage & Document Verification',
    break_glass: false,
    created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-2',
    patient_id: 'pat-8812',
    actor_role: 'Emergency Medical Officer',
    purpose: 'Pre-alert Resuscitation Planning',
    break_glass: true,
    break_glass_reason: 'Unconscious patient acute resuscitation protocol activation',
    anomaly_flagged: false,
    created_at: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
  },
];

const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-1',
    name: 'Dr. Anita Desai (BLS Certified)',
    phone: '+91 98765 43210',
    area: 'Madhapur / Hitec City',
    on_duty: true,
    certificate_status: 'verified',
    lat: 17.4412,
    lng: 78.3912,
  },
  {
    id: 'vol-2',
    name: 'K. Rajesh (Red Cross Responder)',
    phone: '+91 98765 12345',
    area: 'Jubilee Hills Checkpost',
    on_duty: true,
    certificate_status: 'verified',
    lat: 17.4310,
    lng: 78.4110,
  },
];

const INITIAL_LANDMARKS: Landmark[] = [
  { id: 'lm-1', name: 'Durgam Cheruvu Cable Bridge Toll', lat: 17.4395, lng: 78.3970, tagged_by: 'vol-1', verified: true, aliases: ['Cable Bridge', 'Hanging Bridge Toll'] },
  { id: 'lm-2', name: 'Inorbit Mall Main Entrance', lat: 17.4342, lng: 78.3868, tagged_by: 'system', verified: true, aliases: ['Inorbit Hitec'] },
  { id: 'lm-3', name: 'Kondapur RTO Office Crossroad', lat: 17.4610, lng: 78.3610, tagged_by: 'vol-2', verified: true, aliases: ['RTO Junction'] },
  { id: 'lm-4', name: 'Jubilee Hills Metro Station Pillar 162', lat: 17.4318, lng: 78.4095, tagged_by: 'admin', verified: true, aliases: ['Pillar 162'] },
];

const INITIAL_RESOURCES: MedicalResource[] = [
  { id: 'res-1', type: 'aed', name: 'Public AED - Metro Station Concourse', lat: 17.4320, lng: 78.4090, updated_at: new Date().toISOString(), status: 'ready' },
  { id: 'res-2', type: 'oxygen', name: 'Rapid Oxygen Refill Depot #3', lat: 17.4380, lng: 78.4020, updated_at: new Date().toISOString(), status: 'ready' },
  { id: 'res-3', type: 'blood_bank', name: 'Apollo Blood Bank (O-Negative 8 Units)', lat: 17.4325, lng: 78.4071, updated_at: new Date().toISOString(), status: 'ready' },
];

const INITIAL_KIT_ASSIGNMENT: KitAssignment = {
  id: 'kit-8812',
  case_id: 'GH-2026-8812',
  room: 'Trauma Bay 1 (Red)',
  core_kit: ['Trauma primary pack', 'High-flow oxygen mask', '18G IV cannulas × 2', 'Normal saline 500ml'],
  optional_items: [
    { name: 'Chest tube thoracostomy tray 28Fr', aiRank: 1, approved: true },
    { name: 'Pelvic binder (medium)', aiRank: 2, approved: false },
    { name: 'Rapid infuser blood tubing', aiRank: 3, approved: true },
  ],
  status: 'preparing',
  approved_by: 'Sister Sunita (Charge Nurse)',
  est_ready_at: new Date(Date.now() + 180000).toISOString(),
};

// Store Singleton State
let globalState: AppState = {
  currentRole: 'bystander',
  currentScreenId: 'S1',
  activeCaseId: 'GH-2026-8812',
  cases: INITIAL_CASES,
  hospitals: INITIAL_HOSPITALS,
  departments: INITIAL_DEPARTMENTS,
  bays: INITIAL_BAYS,
  documents: INITIAL_DOCUMENTS,
  accessLogs: INITIAL_ACCESS_LOGS,
  volunteers: INITIAL_VOLUNTEERS,
  landmarks: INITIAL_LANDMARKS,
  resources: INITIAL_RESOURCES,
  kitAssignments: [INITIAL_KIT_ASSIGNMENT],
  currentLanguage: 'en',
  connectionStatus: 'live',
  isSilenceActive: false,
  volunteerDuty: true,
};

type Listener = (state: AppState) => void;
const listeners = new Set<Listener>();

function emitChange() {
  listeners.forEach((listener) => listener({ ...globalState }));
}

/**
 * Determine the screen ID according to Section 8 User journeys and Case state
 */
export const calculateScreenId = (role: UserRole, activeCase?: CaseRecord): string => {
  if (role === 'bystander') {
    if (!activeCase) return 'S1';
    if (activeCase.state === 'REPORTED') return 'S4'; // Created -> tracker
    return 'S4';
  }

  if (role === 'family') {
    return 'S4'; // Tracker home, S5 when docs requested
  }

  if (role === 'crew') {
    if (!activeCase || activeCase.state === 'CLOSED') return 'S8';
    if (activeCase.state === 'ARRIVING' || activeCase.state === 'ARRIVED') return 'S9';
    return 'S8';
  }

  if (role === 'dispatcher') {
    return 'S10';
  }

  if (role === 'doctor') {
    return 'S14';
  }

  if (role === 'triage') {
    return 'S11';
  }

  if (role === 'desk') {
    return 'S12';
  }

  if (role === 'gate') {
    return 'S13';
  }

  if (role === 'nurse') {
    return 'S18';
  }

  if (role === 'dept') {
    return 'S17'; // Bay readiness, pings go to S19
  }

  if (role === 'volunteer') {
    return 'S21';
  }

  if (role === 'admin') {
    return 'S24';
  }

  return 'S1';
};

export const store = {
  getState: (): AppState => globalState,

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  setRole: (role: UserRole, forcedScreen?: string) => {
    const activeCase = globalState.cases.find((c) => c.id === globalState.activeCaseId);
    const screenId = forcedScreen || calculateScreenId(role, activeCase);
    globalState = {
      ...globalState,
      currentRole: role,
      currentScreenId: screenId,
    };
    emitChange();
  },

  setScreen: (screenId: string) => {
    globalState = {
      ...globalState,
      currentScreenId: screenId,
    };
    emitChange();
  },

  setActiveCase: (caseId: string) => {
    globalState = {
      ...globalState,
      activeCaseId: caseId,
    };
    emitChange();
  },

  setLanguage: (lang: 'en' | 'te' | 'hi') => {
    globalState = {
      ...globalState,
      currentLanguage: lang,
    };
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    emitChange();
  },

  createCase: (data: Partial<CaseRecord>): CaseRecord => {
    const newCaseId = `GH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase: CaseRecord = {
      id: newCaseId,
      state: 'REPORTED',
      severity: data.severity || 'stable',
      lat: data.lat || 17.4399,
      lng: data.lng || 78.3982,
      location_name: data.location_name || 'Reported Location',
      location_source: data.location_source || 'gps',
      mlc: false,
      mass_casualty: false,
      silent: false,
      family_docs_requested: false,
      created_at: new Date().toISOString(),
      incident_time: new Date().toISOString(),
      assigned_ambulance_id: 'Ambulance 04',
      caller_answers: data.caller_answers,
      symptoms_summary: data.symptoms_summary || 'Reported emergency',
    };

    globalState = {
      ...globalState,
      activeCaseId: newCaseId,
      cases: [newCase, ...globalState.cases],
      currentScreenId: 'S4', // J1 Bystander automatic transition to S4
    };
    emitChange();
    return newCase;
  },

  updateCaseState: (caseId: string, newState: CaseState) => {
    globalState = {
      ...globalState,
      cases: globalState.cases.map((c) => (c.id === caseId ? { ...c, state: newState } : c)),
    };
    emitChange();
  },

  updateCaseSeverity: (caseId: string, severity: SeverityLevel) => {
    globalState = {
      ...globalState,
      cases: globalState.cases.map((c) => (c.id === caseId ? { ...c, severity } : c)),
    };
    emitChange();
  },

  updateCaseVitals: (caseId: string, vitals: CaseRecord['vitals']) => {
    const current = globalState.cases.find((c) => c.id === caseId);
    const updatedVitals = { ...current?.vitals, ...vitals };
    const deterioration = AiProvider.checkDeterioration(updatedVitals.hr || 80, updatedVitals.spo2 || 98);

    globalState = {
      ...globalState,
      cases: globalState.cases.map((c) =>
        c.id === caseId
          ? {
              ...c,
              vitals: updatedVitals,
              deterioration_signal: deterioration.flagged,
            }
          : c
      ),
    };
    emitChange();
  },

  setFamilyDocsRequested: (caseId: string, requested: boolean) => {
    globalState = {
      ...globalState,
      cases: globalState.cases.map((c) => (c.id === caseId ? { ...c, family_docs_requested: requested } : c)),
    };
    emitChange();
  },

  confirmTriageLevel: (caseId: string, esiLevel: number) => {
    globalState = {
      ...globalState,
      cases: globalState.cases.map((c) =>
        c.id === caseId ? { ...c, triage_esi: esiLevel, state: 'TRIAGE_CONFIRMED' } : c
      ),
    };
    emitChange();
  },

  holdBay: (bayId: string, caseId: string, durationSeconds: number = 90) => {
    const expiresAt = new Date(Date.now() + durationSeconds * 1000).toISOString();
    globalState = {
      ...globalState,
      bays: globalState.bays.map((b) =>
        b.id === bayId
          ? {
              ...b,
              status: 'held',
              holdExpiresAt: expiresAt,
              holdDurationSeconds: durationSeconds,
            }
          : b
      ),
    };
    emitChange();
  },

  lockBay: (bayId: string) => {
    globalState = {
      ...globalState,
      bays: globalState.bays.map((b) => (b.id === bayId ? { ...b, status: 'locked', holdExpiresAt: undefined } : b)),
    };
    emitChange();
  },

  releaseBay: (bayId: string) => {
    globalState = {
      ...globalState,
      bays: globalState.bays.map((b) => (b.id === bayId ? { ...b, status: 'free', holdExpiresAt: undefined } : b)),
    };
    emitChange();
  },

  addDocument: (doc: Omit<DocumentItem, 'id' | 'created_at'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    globalState = {
      ...globalState,
      documents: [newDoc, ...globalState.documents],
    };
    emitChange();
  },

  verifyDocument: (docId: string, status: 'verified' | 'rejected', reason?: string) => {
    globalState = {
      ...globalState,
      documents: globalState.documents.map((d) => (d.id === docId ? { ...d, status, reason } : d)),
    };
    emitChange();
  },

  logAccess: (log: Omit<AccessLog, 'id' | 'created_at'>) => {
    const newLog: AccessLog = {
      ...log,
      id: `log-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    globalState = {
      ...globalState,
      accessLogs: [newLog, ...globalState.accessLogs],
    };
    emitChange();
  },

  toggleSilenceAlarm: (active: boolean) => {
    globalState = {
      ...globalState,
      isSilenceActive: active,
      cases: globalState.cases.map((c) =>
        c.id === globalState.activeCaseId
          ? {
              ...c,
              silent: active,
              silence_started_at: active ? new Date().toISOString() : undefined,
              last_known_lat: active ? c.lat : undefined,
              last_known_lng: active ? c.lng : undefined,
            }
          : c
      ),
    };
    emitChange();
  },

  setVolunteerDuty: (duty: boolean) => {
    globalState = {
      ...globalState,
      volunteerDuty: duty,
    };
    emitChange();
  },

  requestFamilyDocs: (caseId: string) => {
    globalState = {
      ...globalState,
      cases: globalState.cases.map((c) =>
        c.id === caseId ? { ...c, family_docs_requested: true } : c
      ),
    };
    emitChange();
  },

  addLandmark: (name: string, lat: number, lng: number) => {
    const newLm: Landmark = {
      id: `lm-${Date.now()}`,
      name,
      lat,
      lng,
      tagged_by: 'volunteer-current',
      verified: false,
      aliases: [],
    };
    globalState = {
      ...globalState,
      landmarks: [newLm, ...globalState.landmarks],
    };
    emitChange();
  },
};

// React hook to access and subscribe to store
export function useAppStore(): AppState {
  const [state, setState] = useState<AppState>(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}
