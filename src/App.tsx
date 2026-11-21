import * as React from 'react';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/Header';
import { LiquidNavigationDock } from '@/components/layout/LiquidNavigationDock';
import { initLenisAndGsap } from '@/lib/scrollAnimation';
import { store, useAppStore } from '@/services/store';

// Import All S1–S25 Screens
import { S1Landing } from '@/screens/S1Landing';
import { S2SOS } from '@/screens/S2SOS';
import { S3SceneGuide } from '@/screens/S3SceneGuide';
import { S4LiveTracker } from '@/screens/S4LiveTracker';
import { S5FamilyUpload } from '@/screens/S5FamilyUpload';
import { S6Login } from '@/screens/S6Login';
import { S7RoleRegistration } from '@/screens/S7RoleRegistration';
import { S8ParamedicLiveCase } from '@/screens/S8ParamedicLiveCase';
import { S9HandoffConfirmation } from '@/screens/S9HandoffConfirmation';
import { S10CommandMap } from '@/screens/S10CommandMap';
import { S11TriageReview } from '@/screens/S11TriageReview';
import { S12Desk } from '@/screens/S12Desk';
import { S13Gate } from '@/screens/S13Gate';
import { S14DoctorCaseBoard } from '@/screens/S14DoctorCaseBoard';
import { S15AlertTakeover } from '@/screens/S15AlertTakeover';
import { S16PatientReports } from '@/screens/S16PatientReports';
import { S17BayReadinessBoard } from '@/screens/S17BayReadinessBoard';
import { S18ChargeNurseRoomKit } from '@/screens/S18ChargeNurseRoomKit';
import { S19DepartmentConsole } from '@/screens/S19DepartmentConsole';
import { S20VolunteerRegistration } from '@/screens/S20VolunteerRegistration';
import { S21VolunteerCheckin } from '@/screens/S21VolunteerCheckin';
import { S22LandmarkTagging } from '@/screens/S22LandmarkTagging';
import { S23HospitalSetup } from '@/screens/S23HospitalSetup';
import { S24Analytics } from '@/screens/S24Analytics';
import { S25AccessLog } from '@/screens/S25AccessLog';

export function App() {
  const { currentScreenId } = useAppStore();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    initLenisAndGsap();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const handleDockNavigate = (targetScreen: string) => {
    switch (targetScreen) {
      case 'S1':
        store.setRole('bystander', 'S1');
        break;
      case 'S2':
        store.setRole('bystander', 'S2');
        break;
      case 'S6':
        store.setRole('doctor', 'S6');
        break;
      case 'S8':
        store.setRole('crew', 'S8');
        break;
      case 'S10':
        store.setRole('dispatcher', 'S10');
        break;
      case 'S11':
        store.setRole('triage', 'S11');
        break;
      case 'S14':
        store.setRole('doctor', 'S14');
        break;
      case 'S16':
        store.setRole('doctor', 'S16');
        break;
      case 'S19':
        store.setRole('dept', 'S19');
        break;
      default:
        store.setScreen(targetScreen);
    }
  };

  const getScreenTitle = (): string => {
    switch (currentScreenId) {
      case 'S1':
        return 'GoldenHour AI Emergency Portal';
      case 'S2':
        return 'One-Tap Emergency SOS (F1)';
      case 'S3':
        return 'Scene Guide Protocol (F2)';
      case 'S4':
        return 'Ambulance Live Tracker (F5)';
      case 'S5':
        return 'Family Document Upload (F10)';
      case 'S6':
        return 'Clinical & Staff Sign-In';
      case 'S7':
        return 'Role & Credential Registration';
      case 'S8':
        return 'Paramedic Live Telemetry & Vitals';
      case 'S9':
        return 'Confirm Clinical Handover (F8)';
      case 'S10':
        return 'Emergency Command & Dispatch Map';
      case 'S11':
        return 'Pre-Alert Triage Review (F11)';
      case 'S12':
        return 'Registration Desk & PMJAY Eligibility';
      case 'S13':
        return 'Emergency Gate & Fast-Track Barrier';
      case 'S14':
        return 'Doctor Case Radar & Bay Hold (F20)';
      case 'S15':
        return 'Critical Case Takeover Alert';
      case 'S16':
        return 'Patient Medical History & Break-Glass';
      case 'S17':
        return 'Hospital Bay Readiness Board';
      case 'S18':
        return 'Room & Kit Assignment Protocol';
      case 'S19':
        return 'Specialty Department Console';
      case 'S20':
        return 'Volunteer Responder Registration';
      case 'S21':
        return 'First Responder On-Duty Console';
      case 'S22':
        return 'Emergency Landmark Anchor Tagging';
      case 'S23':
        return 'Hospital Facility Configuration';
      case 'S24':
        return 'Emergency Delay Ledger & Benchmarks';
      case 'S25':
        return 'Patient Immutable Access Log (F29)';
      default:
        return 'GoldenHour AI';
    }
  };

  const renderActiveScreen = () => {
    switch (currentScreenId) {
      case 'S1':
        return <S1Landing />;
      case 'S2':
        return <S2SOS />;
      case 'S3':
        return <S3SceneGuide />;
      case 'S4':
        return <S4LiveTracker />;
      case 'S5':
        return <S5FamilyUpload />;
      case 'S6':
        return <S6Login />;
      case 'S7':
        return <S7RoleRegistration />;
      case 'S8':
        return <S8ParamedicLiveCase />;
      case 'S9':
        return <S9HandoffConfirmation />;
      case 'S10':
        return <S10CommandMap />;
      case 'S11':
        return <S11TriageReview />;
      case 'S12':
        return <S12Desk />;
      case 'S13':
        return <S13Gate />;
      case 'S14':
        return <S14DoctorCaseBoard />;
      case 'S15':
        return <S15AlertTakeover />;
      case 'S16':
        return <S16PatientReports />;
      case 'S17':
        return <S17BayReadinessBoard />;
      case 'S18':
        return <S18ChargeNurseRoomKit />;
      case 'S19':
        return <S19DepartmentConsole />;
      case 'S20':
        return <S20VolunteerRegistration />;
      case 'S21':
        return <S21VolunteerCheckin />;
      case 'S22':
        return <S22LandmarkTagging />;
      case 'S23':
        return <S23HospitalSetup />;
      case 'S24':
        return <S24Analytics />;
      case 'S25':
        return <S25AccessLog />;
      default:
        return <S1Landing />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full selection:bg-rose-500/20 selection:text-rose-600 transition-colors">
      {/* S15 Takeover is the only full-screen overlay without header */}
      {currentScreenId !== 'S15' && <Header screenTitle={getScreenTitle()} />}

      {/* Floating Liquid Command Dock (Left on desktop, Bottom on mobile) */}
      {currentScreenId !== 'S15' && (
        <LiquidNavigationDock
          currentScreen={currentScreenId}
          onNavigate={handleDockNavigate}
          isDark={isDarkMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Main Content Area with padding for bottom floating dock */}
      <main className="flex-1 w-full flex flex-col pb-28 transition-all">
        {renderActiveScreen()}
      </main>

      <Toaster position="bottom-center" richColors />
    </div>
  );
}

export default App;
