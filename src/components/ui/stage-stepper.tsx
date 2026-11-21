import * as React from "react"
import { Check, Circle, Radio } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StepItem {
  id: string
  label: string
  sublabel?: string
  icon?: React.ReactNode
}

interface StageStepperProps {
  steps: StepItem[]
  currentStepIndex: number
  orientation?: "vertical" | "horizontal"
  className?: string
}

export const StageStepper: React.FC<StageStepperProps> = ({
  steps,
  currentStepIndex,
  orientation = "vertical",
  className,
}) => {
  return (
    <div
      className={cn(
        orientation === "vertical"
          ? "flex flex-col space-y-4"
          : "flex items-center justify-between w-full overflow-x-auto py-2",
        className
      )}
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStepIndex
        const isCurrent = idx === currentStepIndex
        const isFuture = idx > currentStepIndex
        const isLast = idx === steps.length - 1

        return (
          <div
            key={step.id}
            className={cn(
              orientation === "vertical"
                ? "flex items-start gap-3 relative"
                : "flex flex-col items-center flex-1 min-w-[72px] relative"
            )}
          >
            {/* Connecting line */}
            {!isLast && (
              <div
                className={cn(
                  orientation === "vertical"
                    ? "absolute left-[13px] top-[28px] bottom-[-16px] w-[2px]"
                    : "absolute top-[13px] left-[50%] right-[-50%] h-[2px]",
                  isCompleted ? "bg-green-600" : "bg-navy-100"
                )}
              />
            )}

            {/* Node */}
            <div
              className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all font-semibold",
                isCompleted && "bg-green-600 text-white shadow-sm",
                isCurrent && "bg-navy-700 text-white ring-4 ring-navy-100",
                isFuture && "bg-navy-100 text-text-muted"
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4 stroke-[2.5]" />
              ) : isCurrent ? (
                <Radio className="h-4 w-4 animate-pulse text-teal-500" />
              ) : (
                <Circle className="h-3 w-3 fill-current text-navy-700/20" />
              )}
            </div>

            {/* Label */}
            <div
              className={cn(
                orientation === "vertical" ? "flex flex-col pt-0.5" : "text-center mt-2 w-full px-1"
              )}
            >
              <span
                className={cn(
                  "text-small font-semibold leading-tight",
                  isCurrent ? "text-navy-900 font-bold" : isCompleted ? "text-navy-700" : "text-text-muted"
                )}
              >
                {step.label}
              </span>
              {step.sublabel && (
                <span className="text-micro text-text-muted mt-0.5">{step.sublabel}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
