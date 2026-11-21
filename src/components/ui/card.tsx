import * as React from "react"
import { cn } from "@/lib/utils"
import { Chip } from "@/components/ui/chip"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "raised" | "alert" | "ai"
  statusColor?: "critical" | "watch" | "ready"
  aiLabel?: string
  aiConfidence?: number
  aiSource?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", statusColor = "watch", aiLabel, aiConfidence, aiSource, children, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "raised":
          return "bg-surface shadow-e2 border-border"
        case "alert": {
          const borderColor =
            statusColor === "critical"
              ? "border-l-red-600"
              : statusColor === "ready"
              ? "border-l-green-600"
              : "border-l-amber-500"
          return `bg-surface shadow-e1 border-border border-l-4 ${borderColor}`
        }
        case "ai":
          return "bg-teal-50 border-t-2 border-t-teal-500 border-x border-b border-border shadow-e1"
        case "default":
        default:
          return "bg-surface shadow-e1 border-border"
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-card border p-5 md:p-6 transition-all text-navy-700",
          getVariantStyles(),
          className
        )}
        {...props}
      >
        {variant === "ai" && (
          <div className="mb-3">
            <Chip
              variant="ai"
              label={aiLabel || "AI Suggestion"}
              confidence={aiConfidence}
              source={aiSource || "mock"}
            />
          </div>
        )}
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between gap-3 mb-4", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-h3 font-semibold text-navy-700 leading-tight", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-small text-text-muted mt-1", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-3", className)} {...props} />
)
CardContent.displayName = "CardContent"
