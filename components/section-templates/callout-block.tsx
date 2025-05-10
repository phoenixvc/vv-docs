import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"

interface CalloutBlockProps {
  title?: string
  variant?: "info" | "warning" | "success" | "error"
  children: ReactNode
  className?: string
}

export function CalloutBlock({ title, variant = "info", children, className }: CalloutBlockProps) {
  const variantStyles = {
    info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
    warning: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200",
    success: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
    error: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
  }

  const icons = {
    info: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  }

  return (
    <div className={cn("p-4 mb-6 rounded-md border-l-4 flex", variantStyles[variant], className)}>
      <div className="mr-3 mt-0.5">{icons[variant]}</div>
      <div>
        {title && <p className="font-medium mb-1">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  )
}
