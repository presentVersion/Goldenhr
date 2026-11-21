import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-transform active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        primary: "bg-navy-700 text-white hover:bg-navy-900 border border-transparent shadow-e1",
        secondary: "bg-white text-navy-700 border border-navy-700 hover:bg-navy-100/50 shadow-e1",
        danger: "bg-red-600 text-white hover:bg-red-600/90 border border-transparent shadow-e1",
        success: "bg-green-600 text-white hover:bg-green-600/90 border border-transparent shadow-e1",
        ghost: "bg-transparent text-navy-700 hover:bg-navy-100/60",
        ai: "bg-teal-50 text-navy-700 border border-teal-500 hover:bg-teal-50/80 shadow-e1",
      },
      size: {
        lg: "h-14 min-h-[56px] px-6 rounded-btn text-body font-semibold gap-2",
        md: "h-12 min-h-[48px] px-5 rounded-btn text-body font-medium gap-2",
        sm: "h-10 min-h-[40px] px-4 rounded-btn text-small font-medium gap-1.5",
        icon: "h-10 w-10 min-h-[40px] min-w-[40px] rounded-btn p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  isAi?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, isAi = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const chosenVariant = isAi ? "ai" : variant

    return (
      <Comp
        className={cn(buttonVariants({ variant: chosenVariant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {isAi && <Sparkles className="h-4 w-4 text-teal-500 flex-shrink-0" />}
            {children}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"
