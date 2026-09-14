import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap text-sm",
    "nav-label tracking-[0.12em] font-medium",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-40",
    "relative overflow-hidden btn-shimmer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "rounded-full bg-primary text-primary-foreground",
          "shadow-[0_0_20px_hsl(28_55%_58%/0.25)]",
          "hover:shadow-[0_0_35px_hsl(28_55%_58%/0.5)]",
          "hover:bg-primary/90",
        ].join(" "),
        destructive: "rounded-sm bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: [
          "rounded-full border border-border bg-transparent text-foreground",
          "hover:border-primary hover:text-primary",
        ].join(" "),
        secondary: "rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted text-muted-foreground hover:text-foreground rounded-sm",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-12 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
