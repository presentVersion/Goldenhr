import * as React from "react"
import { FlaskConical, Info, WifiOff, Radio, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

// 5.13 Connection dot
interface ConnectionDotProps {
  status: "live" | "reconnecting" | "offline"
  className?: string
}

export const ConnectionDot: React.FC<ConnectionDotProps> = ({ status, className }) => {
  const getDotColor = () => {
    switch (status) {
      case "live":
        return "bg-emerald-500 ring-emerald-500/30"
      case "reconnecting":
        return "bg-amber-500 ring-amber-500/30 animate-pulse"
      case "offline":
      default:
        return "bg-slate-400 ring-slate-400/30"
    }
  }

  const getLabel = () => {
    switch (status) {
      case "live":
        return "Live"
      case "reconnecting":
        return "Reconnecting"
      case "offline":
      default:
        return "Offline"
    }
  }

  return (
    <div
      className={cn("inline-flex items-center gap-1.5 text-[11px] font-medium select-none", className)}
      title={`Network: ${getLabel()}`}
    >
      <span className={cn("h-2 w-2 rounded-full ring-2 transition-colors", getDotColor())} />
      <span className="hidden sm:inline text-current font-semibold">{getLabel()}</span>
    </div>
  )
}

// 5.14 Decision-support banner
// Appears on S8, S9, S11, S16
export const DecisionSupportBanner: React.FC<{
  className?: string
  ruleLevel?: number
  mlLevel?: number
  confidence?: number
}> = ({ className, ruleLevel, mlLevel, confidence }) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 w-full p-3.5 rounded-2xl bg-amber-500/10 border-l-4 border-l-amber-500 border border-amber-500/20 text-slate-800 dark:text-slate-200 text-xs",
        className
      )}
      role="note"
    >
      <div className="flex items-center gap-2.5">
        <Info className="h-4 w-4 text-amber-500 flex-shrink-0" />
        <span className="font-semibold">
          Decision support, not a definitive medical record. Clinician confirmation required.
        </span>
      </div>

      {ruleLevel !== undefined && (
        <div className="flex items-center gap-2 font-mono text-[11px] text-amber-700 dark:text-amber-300">
          <span>Rule: <strong>ESI {ruleLevel}</strong></span>
          {mlLevel !== undefined && mlLevel !== null && <span>• ML: <strong>ESI {mlLevel}</strong></span>}
          {confidence !== undefined && <span>• ({Math.round(confidence * 100)}% conf)</span>}
        </div>
      )}
    </div>
  )
}

// 5.15 Simulated data pill
export const SimulatedDataPill: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold uppercase tracking-wider select-none shadow-sm",
        className
      )}
      title="This environment uses simulated patient and location data"
    >
      <FlaskConical className="h-3 w-3 text-rose-500" />
      <span>SIMULATED PILOT</span>
    </div>
  )
}
