"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getSectionById, getSectionPathById } from "@/lib/documentation-structure"

interface BreadcrumbItem {
  label: string
  value: string
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[]
  onNavigate: (sectionId: string) => void
  className?: string
}

export function BreadcrumbNavigation({ items, onNavigate, className }: BreadcrumbNavigationProps) {
  // Get the current section (last item in the breadcrumb)
  const currentSectionId = items[items.length - 1]?.value

  // Get the full path to the current section
  const sectionPath = currentSectionId ? getSectionPathById(currentSectionId) : []

  // Use the path from the documentation structure if available, otherwise use the provided items
  const breadcrumbItems =
    sectionPath.length > 0
      ? sectionPath.map((section) => ({
          label: section.label,
          value: section.id,
          number: section.number,
        }))
      : items

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          const section = getSectionById(item.value)
          const displayNumber = section?.number || ""
          const displayLabel = displayNumber ? `${displayNumber}. ${item.label}` : item.label

          return (
            <li key={item.value} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}

              {isLast ? (
                <span className="font-medium text-foreground">{displayLabel}</span>
              ) : (
                <button
                  onClick={() => onNavigate(item.value)}
                  className="hover:underline text-muted-foreground hover:text-foreground transition-colors"
                >
                  {displayLabel}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
