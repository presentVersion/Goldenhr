import * as React from "react"
import { Drawer } from "vaul"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}) => {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 transition-opacity" />
        <Drawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 max-h-[88vh] rounded-t-sheet bg-surface border-t border-border p-6 shadow-e3 focus:outline-none flex flex-col",
            className
          )}
        >
          {/* Section 4.6 Visible drag handle (40 x 4 px pill, border) */}
          <div className="mx-auto h-1 w-10 rounded-chip bg-border mb-4 flex-shrink-0" />

          <div className="flex items-center justify-between gap-3 pb-3 mb-2 border-b border-navy-100 flex-shrink-0">
            <div>
              {title && <Drawer.Title className="text-h3 font-semibold text-navy-700">{title}</Drawer.Title>}
              {description && (
                <Drawer.Description className="text-small text-text-muted mt-0.5">
                  {description}
                </Drawer.Description>
              )}
            </div>
            {/* Section 4.6: The close action is always a visible button */}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-9 w-9 rounded-full flex items-center justify-center text-text-muted hover:text-navy-700 hover:bg-navy-100/50 transition-colors"
              aria-label="Close sheet"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 pb-4">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
