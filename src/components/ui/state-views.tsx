import * as React from "react"
import { AlertTriangle, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 5.12 Empty State
interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="h-14 w-14 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 mb-3 shadow-sm">
        <Icon className="h-7 w-7 text-navy-700" />
      </div>
      <h4 className="text-body font-semibold text-navy-700">{title}</h4>
      {description && <p className="text-small text-text-muted max-w-sm mt-1">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

// 5.12 Loading State (Skeleton with Shimmer)
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean
}

export const Skeleton: React.FC<SkeletonProps> = ({ shimmer = true, className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-btn bg-navy-100/80 relative overflow-hidden",
        shimmer &&
          "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent",
        className
      )}
      {...props}
    />
  )
}

// 5.12 Error State
interface ErrorStateProps {
  message: string
  onRetry?: () => void
  className?: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-6 text-center rounded-card border border-red-600/30 bg-red-600/5", className)}>
      <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
      <p className="text-body font-semibold text-red-600">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-3">
          Try again
        </Button>
      )}
    </div>
  )
}
