import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ContentBlockProps {
  title?: string
  description?: string
  footer?: ReactNode
  variant?: "default" | "outline" | "info" | "warning" | "success" | "error"
  children: ReactNode
  className?: string
}

export function ContentBlock({
  title,
  description,
  footer,
  variant = "default",
  children,
  className,
}: ContentBlockProps) {
  const variantStyles = {
    default: "",
    outline: "border-2",
    info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    warning: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
    success: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
  }

  return (
    <Card className={cn("mb-6", variantStyles[variant], className)}>
      {(title || description) && (
        <CardHeader className="pb-2">
          {title && <CardTitle className="text-lg">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={title || description ? "pt-2" : ""}>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
