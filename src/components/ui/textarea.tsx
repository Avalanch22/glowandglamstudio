import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-sm border border-border",
        "bg-muted/30 px-4 py-3 text-sm text-foreground",
        "placeholder:text-muted-foreground/50",
        "focus:outline-none focus:border-primary",
        "transition-colors duration-300 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
