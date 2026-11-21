import * as React from "react"
import { cn } from "@/lib/utils"

interface CountdownRingProps {
  remainingSeconds: number
  totalSeconds: number
  size?: "sm" | "md" | "lg"
  className?: string
  showLabel?: boolean
  label?: string
}

export const CountdownRing: React.FC<CountdownRingProps> = ({
  remainingSeconds,
  totalSeconds,
  size = "md",
  className,
  showLabel = true,
  label,
}) => {
  const fraction = Math.max(0, Math.min(1, remainingSeconds / Math.max(1, totalSeconds)))
  
  // Size mapping
  // sm: 40px, md: 56px, lg: 72px
  const diameter = size === "sm" ? 40 : size === "lg" ? 72 : 56
  const strokeWidth = size === "sm" ? 3.5 : 4
  const radius = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - fraction)

  // Section 4.3: Amber at 25% remaining, red at 10%
  const getStrokeColor = () => {
    if (fraction <= 0.1) return "#D93A3A" // red-600
    if (fraction <= 0.25) return "#E8A317" // amber-500
    return "#00B4C8" // teal-500 default or green-600
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center flex-shrink-0", className)}>
      <svg
        width={diameter}
        height={diameter}
        className="-rotate-90 transform"
        style={{ width: diameter, height: diameter }}
      >
        {/* Track */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke="#E3EAF5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset,stroke] duration-300 ease-linear"
        />
      </svg>
      {showLabel && (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center font-bold numeric text-navy-700",
            size === "sm" ? "text-micro" : size === "lg" ? "text-h2" : "text-small"
          )}
        >
          {label ?? `${Math.ceil(remainingSeconds)}s`}
        </span>
      )}
    </div>
  )
}
