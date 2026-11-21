export type CaseState =
  | 'REPORTED'
  | 'DISPATCHED'
  | 'EN_ROUTE'
  | 'PRE_ALERTED'
  | 'ACCEPTED'
  | 'TRIAGE_CONFIRMED'
  | 'ARRIVING'
  | 'ARRIVED'
  | 'HANDED_OVER'
  | 'CLOSED';

export type SeverityLevel = 'stable' | 'watch' | 'critical';

export type UserRole =
  | 'bystander'
  | 'family'
  | 'crew'
  | 'dispatcher'
  | 'doctor'
  | 'triage'
  | 'desk'
  | 'gate'
  | 'nurse'
  | 'dept'
  | 'volunteer'
  | 'admin';

export type BayStatus = 'free' | 'held' | 'locked' | 'occupied' | 'preparing';

export interface Hospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
  verified: boolean;
  sim: boolean;
  freeBeds: number;
  totalBeds: number;
}

export interface Department {
  id: string;
  hospital_id: string;
  name: string;
  type: 'ER' | 'ICU' | 'CT' | 'CathLab' | 'BloodBank';
  median_prep_minutes: number;
}

export interface Bay {
  id: string;
  hospital_id: string;
  department_id: string;
  name: string;
  type: 'BedDouble' | 'BedSingle' | 'ScanLine' | 'Activity' | 'Droplets';
  status: BayStatus;
  holdExpiresAt?: string;
  holdDurationSeconds?: number;
  kitStatus?: 'none' | 'preparing' | 'ready';
  prepProgress?: number;
  estReadyMinutes?: number;
}

export interface CaseRecord {
  id: string;
  state: CaseState;
  severity: SeverityLevel;
  lat: number;
  lng: number;
  location_name: string;
  location_source: 'gps' | 'landmark' | 'manual';
  mlc: boolean;
  mass_casualty: boolean;
  silent: boolean;
  family_docs_requested: boolean;
  created_at: string;
  incident_time: string;
  assigned_ambulance_id?: string;
  assigned_hospital_id?: string;
  caller_answers?: {
    breathingNormally?: boolean;
    responsive?: boolean;
    heavyBleeding?: boolean;
    voiceTranscript?: string;
  };
  vitals?: {
    bp?: string;
    hr?: number;
    spo2?: number;
    gcs?: number;
    isAiDrafted?: boolean;
  };
  patient_id?: string;
  patient_name?: string;
  patient_age?: number;
  patient_gender?: string;
  triage_esi?: number;
  symptoms_summary?: string;
  last_known_lat?: number;
  last_known_lng?: number;
  silence_started_at?: string;
  deterioration_signal?: boolean;
}

export interface CaseEvent {
  id: string;
  case_id: string;
  type: string;
  payload: Record<string, unknown>;
  source: 'human' | 'sensor' | 'system' | 'ai';
  verified: boolean;
  actor_id?: string;
  created_at: string;
}

export interface DocumentItem {
  id: string;
  case_id: string;
  type: 'patient_id' | 'prior_reports' | 'insurance';
  name: string;
  file_path: string;
  status: 'pending' | 'verified' | 'rejected';
  reason?: string;
  ai_type?: string;
  ai_quality?: 'high' | 'blurry' | 'unreadable';
  ai_flags?: string[];
  created_at: string;
}

export interface Patient {
  id: string;
  name_ref: string;
  consent: boolean;
  allergies?: string[];
  conditions?: string[];
  medicines?: string[];
}

export interface AccessLog {
  id: string;
  patient_id: string;
  actor_role: string;
  purpose: string;
  break_glass: boolean;
  break_glass_reason?: string;
  anomaly_flagged?: boolean;
  created_at: string;
}

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  area: string;
  on_duty: boolean;
  certificate_status: 'pending' | 'verified' | 'rejected';
  lat: number;
  lng: number;
}

export interface Landmark {
  id: string;
  name: string;
  lat: number;
  lng: number;
  tagged_by: string;
  verified: boolean;
  aliases: string[];
}

export interface MedicalResource {
  id: string;
  type: 'aed' | 'oxygen' | 'blood_bank';
  name: string;
  lat: number;
  lng: number;
  updated_at: string;
  status: 'ready' | 'watch';
}

export interface KitAssignment {
  id: string;
  case_id: string;
  room: string;
  core_kit: string[];
  optional_items: { name: string; aiRank: number; approved: boolean }[];
  status: 'not_started' | 'preparing' | 'ready';
  approved_by?: string;
  est_ready_at?: string;
}

export interface AIOutputLog {
  id: string;
  feature_id: string;
  model_name: string;
  model_version: string;
  output: unknown;
  confidence: number;
  accepted_by?: string;
  rejected_by?: string;
  created_at: string;
}

export interface LoadForecast {
  id: string;
  hospital_id: string;
  horizon_start: string;
  predicted_arrivals: number;
  free_beds: number;
  created_at: string;
}
