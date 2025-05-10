import type React from "react"
import { cn } from "@/lib/utils"

export interface ContentBlockProps {
  variant?: "default" | "outline" | "info" | "warning" | "success" | "error"
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  variant = "default",
  title,
  icon,
  children,
  className,
}) => {
  const variantClasses = {
    default: "bg-white dark:bg-gray-800",
    outline: "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
    info: "bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500",
    warning: "bg-yellow-50 border-l-4 border-yellow-500 dark:bg-yellow-900/30 dark:border-yellow-500",
    success: "bg-green-50 border-l-4 border-green-500 dark:bg-green-900/30 dark:border-green-500",
    error: "bg-red-50 border-l-4 border-red-500 dark:bg-red-900/30 dark:border-red-500",
  }

  const titleColorClasses = {
    default: "text-gray-900 dark:text-gray-100",
    outline: "text-gray-900 dark:text-gray-100",
    info: "text-blue-800 dark:text-blue-300",
    warning: "text-yellow-800 dark:text-yellow-300",
    success: "text-green-800 dark:text-green-300",
    error: "text-red-800 dark:text-red-300",
  }

  return (
    <div className={cn("rounded-md p-4 mb-4", variantClasses[variant], className)}>
      {title && (
        <div className="flex items-center mb-2">
          {icon && <span className="mr-2">{icon}</span>}
          <h3 className={cn("font-medium", titleColorClasses[variant])}>{title}</h3>
        </div>
      )}
      <div className={variant !== "default" && variant !== "outline" ? "text-gray-700 dark:text-gray-300" : ""}>
        {children}
      </div>
    </div>
  )
}

export default ContentBlock
