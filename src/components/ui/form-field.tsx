import * as React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-input border border-border bg-surface px-4 py-2 text-body text-navy-700 placeholder:text-text-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-600 focus-visible:ring-red-600",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface FormFieldProps {
  label: string
  helperText?: string
  error?: string
  id?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  helperText,
  error,
  id,
  required,
  className,
  children,
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full text-left", className)}>
      <label htmlFor={id} className="text-small font-semibold text-navy-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-600 font-bold">*</span>}
      </label>
      {children}
      {helperText && !error && (
        <span className="text-small text-text-muted">{helperText}</span>
      )}
      {error && (
        <span className="text-small text-red-600 flex items-center gap-1 mt-0.5">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </span>
      )}
    </div>
  )
}
