import type React from "react"
import clsx from "clsx"

type ContentBlockVariant = "default" | "outline" | "info" | "warning" | "success" | "error"

interface ContentBlockProps {
  title?: string
  description?: string
  footer?: React.ReactNode
  variant?: ContentBlockVariant
  children: React.ReactNode
  className?: string
}

/**
 * Content block component for displaying content with optional title, description, and footer
 */
export function ContentBlock({
  title,
  description,
  footer,
  variant = "default",
  children,
  className,
}: ContentBlockProps): JSX.Element {
  const variantStyles: Record<ContentBlockVariant, string> = {
    default: "",
    outline: "border-2",
    info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    warning: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
    success: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
  }

  return (
    <div
      className={clsx(
        "mb-6 rounded-lg border bg-card text-card-foreground shadow-sm",
        variantStyles[variant],
        className,
      )}
    >
      {(title || description) && (
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          {title && <h4 className="text-lg font-semibold leading-none tracking-tight">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className={clsx("p-6", title || description ? "pt-2" : "")}>{children}</div>
      {footer && <div className="flex items-center p-6 pt-0">{footer}</div>}
    </div>
  )
}
