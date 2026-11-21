import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SegmentOption<T extends string = string> {
  value: T
  label: string
  icon?: React.ReactNode
  aiSuggested?: boolean
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  name?: string
  className?: string
  disabled?: boolean
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className,
  disabled = false,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "grid w-full gap-2 p-1.5 rounded-card bg-navy-100/70 border border-border sm:grid-flow-col sm:auto-cols-fr",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex items-center justify-center gap-2 h-12 min-h-[48px] px-3 rounded-btn text-small font-semibold transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
              isSelected
                ? "bg-navy-700 text-white shadow-e1"
                : "bg-surface/80 text-navy-700 hover:bg-surface border border-transparent hover:border-border",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {option.icon && (
              <span className={cn("flex-shrink-0", isSelected ? "text-white" : "text-navy-700")}>
                {option.icon}
              </span>
            )}
            <span className="truncate">{option.label}</span>
            {isSelected && (
              <Check className="h-4 w-4 ml-0.5 text-teal-500 animate-in zoom-in-50 duration-200" />
            )}
            {option.aiSuggested && !isSelected && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white" />
            )}
          </button>
        )
      })}
    </div>
  )
}
