import type React from "react"
import clsx from "clsx"

type BadgeVariant = "default" | "secondary" | "outline" | "destructive"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

/**
 * Badge component for displaying small labels
 */
export function Badge({ variant = "default", children, className, ...props }: BadgeProps): JSX.Element {
  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "text-foreground border border-input",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
