import * as React from "react"
import { AlertCircle, FlaskConical, Sparkles, CheckCircle2, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export type ChipVariant =
  | "critical"
  | "watch"
  | "ready"
  | "neutral"
  | "ai"
  | "unverified"
  | "simulated"
  | "pending"
  | "verified"
  | "rejected"

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant
  label?: string
  confidence?: number
  source?: string
  icon?: React.ReactNode
}

export const Chip: React.FC<ChipProps> = ({
  variant = "neutral",
  label,
  confidence,
  source,
  icon,
  className,
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "critical":
      case "rejected":
        return "bg-red-600/10 text-red-600 border border-red-600/20"
      case "watch":
      case "pending":
        return "bg-amber-500/10 text-amber-500 border border-amber-500/30"
      case "ready":
      case "verified":
        return "bg-green-600/10 text-green-600 border border-green-600/20"
      case "ai":
        return "bg-teal-50 text-navy-900 border border-teal-500/40"
      case "unverified":
        return "bg-amber-50 text-amber-500 border border-amber-500/40"
      case "simulated":
        return "bg-navy-100 text-navy-700 border border-navy-700/20"
      case "neutral":
      default:
        return "bg-navy-100 text-navy-700 border border-border"
    }
  }

  const renderIcon = () => {
    if (icon) return icon
    switch (variant) {
      case "critical":
        return <span className="h-2 w-2 rounded-full bg-red-600 flex-shrink-0" />
      case "rejected":
        return <XCircle className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />
      case "watch":
        return <span className="h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
      case "pending":
        return <Clock className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
      case "ready":
        return <span className="h-2 w-2 rounded-full bg-green-600 flex-shrink-0" />
      case "verified":
        return <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
      case "ai":
        return <Sparkles className="h-3 w-3 text-teal-500 flex-shrink-0" />
      case "unverified":
        return <AlertCircle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
      case "simulated":
        return <FlaskConical className="h-3.5 w-3.5 text-navy-700 flex-shrink-0" />
      case "neutral":
      default:
        return <span className="h-2 w-2 rounded-full bg-navy-700/40 flex-shrink-0" />
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-6 px-2.5 rounded-chip text-micro uppercase tracking-wide font-semibold select-none",
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {renderIcon()}
      <span>
        {label || children}
        {confidence !== undefined && (
          <span className="ml-1 opacity-80 lowercase font-normal">({Math.round(confidence * 100)}%)</span>
        )}
        {source && <span className="ml-1 opacity-70 normal-case font-normal">• {source}</span>}
      </span>
    </span>
  )
}
