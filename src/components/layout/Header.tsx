import * as React from "react"
import { HeartPulse, Phone, LogOut, Search, Sparkles } from "lucide-react"
import { store, useAppStore } from "@/services/store"
import { ConnectionDot, SimulatedDataPill } from "@/components/ui/status-badges"
import { Chip } from "@/components/ui/chip"
import { QuickCommandModal } from "@/components/layout/QuickCommandModal"
import { cn } from "@/lib/utils"

interface HeaderProps {
  screenTitle?: string
}

export const Header: React.FC<HeaderProps> = ({ screenTitle }) => {
  const { currentRole, currentScreenId, activeCaseId, connectionStatus } = useAppStore()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // Screens that use Command theme (Section 3.1): S10, S14, S17, S18, S24
  const isCommandTheme = ["S10", "S14", "S17", "S18", "S24"].includes(currentScreenId)

  // Emergency strip: on S1, S2, S3, S4, S8, S9
  const showEmergencyCall = ["S1", "S2", "S3", "S4", "S8", "S9"].includes(currentScreenId)

  // Staff screens show SIMULATED DATA pill and Sign out (Section 1.7 & Section 7)
  const isStaffScreen = !["bystander", "family"].includes(currentRole)

  const handleSignOut = () => {
    store.setRole("bystander", "S1")
  }

  const getContextPrompt = (): string => {
    switch (currentScreenId) {
      case 'S1':
      case 'S2':
        return 'Bystander SOS • GPS streamed to Ambulance 04'
      case 'S3':
        return 'CPR Scene Guide • 100-120 BPM audio pacing'
      case 'S4':
        return 'Ambulance 04 Live Tracking • 8 min ETA'
      case 'S5':
        return 'Family Document OCR • Ready to parse'
      case 'S8':
        return 'Paramedic Telemetry • Dual waveform BP 200/110'
      case 'S10':
        return 'Satellite Dispatch Deck • 6 active calls'
      case 'S11':
        return 'Neural AI Triage • ESI Level 2 Emergent'
      case 'S14':
        return 'Doctor Trauma Board • Bay 1 hold locked'
      default:
        return 'Search clinical views or press ⌘K'
    }
  }

  return (
    <>
      <header
        className={cn(
          "h-16 md:h-[72px] w-full px-4 md:px-8 flex items-center justify-between border-b transition-all z-40 select-none glass-rail",
          isCommandTheme
            ? "border-white/10 text-command-text"
            : "border-border text-navy-700 shadow-sm"
        )}
      >
        {/* Left: Product Mark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (currentRole === "bystander") store.setScreen("S1")
            }}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-btn p-1"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-[1.5px] shadow-md shadow-rose-500/20 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white">
                <HeartPulse className="h-4.5 w-4.5 text-rose-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-h3 font-black tracking-tight leading-none block">
                GoldenHour AI
              </span>
              <span className="text-[10px] font-semibold text-text-muted hidden sm:block">
                Clinical Emergency OS
              </span>
            </div>
          </button>

          {activeCaseId && isStaffScreen && (
            <span
              className={cn(
                "hidden sm:inline-flex text-micro font-mono px-2.5 py-0.5 rounded-full border shadow-xs",
                isCommandTheme
                  ? "bg-command-surface border-command-border text-teal-300"
                  : "bg-navy-100 border-border text-navy-700"
              )}
            >
              {activeCaseId}
            </span>
          )}
        </div>

        {/* Centre: Glassy Search & Neural Prompt Capsule (GlassyDashboard .gd-ask) */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="group relative flex items-center gap-3 px-3.5 py-2 rounded-full border border-white/60 dark:border-white/15 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xs hover:bg-white/95 dark:hover:bg-slate-900/90 hover:shadow-md transition-all text-left max-w-md"
          >
            {/* Iridescent 3D Neural Orb */}
            <span className="neural-ai-orb" aria-hidden="true" />

            {/* Contextual Typing Prompt */}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[260px]">
              {getContextPrompt()}
            </span>

            {/* Search Icon & Shortcut Pill */}
            <div className="flex items-center gap-1.5 ml-auto text-slate-400">
              <Search className="w-3.5 h-3.5 group-hover:text-cyan-500 transition-colors" />
              <kbd className="hidden lg:inline-block px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-mono font-bold text-slate-500 border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right: Actions, Connection Dot, Simulated Data Pill, Emergency Phone */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showEmergencyCall && (
            <a
              href="tel:112"
              className="flex items-center gap-1.5 h-9 px-3 rounded-full bg-red-600/10 text-red-600 border border-red-600/30 text-small font-bold hover:bg-red-600 hover:text-white transition-colors shadow-xs"
              title="Call National Emergency Line"
            >
              <Phone className="h-3.5 w-3.5 animate-pulse flex-shrink-0" />
              <span className="text-xs font-black">112 / 108</span>
            </a>
          )}

          {isStaffScreen && <SimulatedDataPill className="hidden lg:inline-flex" />}

          <ConnectionDot status={connectionStatus} />

          <Chip
            variant="neutral"
            label={currentRole.toUpperCase()}
            className={cn(
              "hidden sm:inline-flex text-[11px] font-bold rounded-full",
              isCommandTheme && "bg-command-surface text-command-text border-command-border"
            )}
          />

          {isStaffScreen && (
            <button
              type="button"
              onClick={handleSignOut}
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                isCommandTheme
                  ? "text-command-muted hover:text-command-text hover:bg-command-surface"
                  : "text-text-muted hover:text-navy-700 hover:bg-navy-100/60"
              )}
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* Spotlight Command Modal */}
      <QuickCommandModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}

export default Header;
