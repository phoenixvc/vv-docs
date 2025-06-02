import type { ReactNode } from "react"
import { getSectionById } from "../../lib/documentation-structure"
import { cn } from "../../lib/utils"
import SectionAnchor from "../section-anchor"
import { Badge } from "../ui/badge"

interface SectionLevelOneProps {
  id: string
  title: string
  description?: string
  sectionNumber?: string // Optional override
  children: ReactNode
  className?: string
  isPrintMode?: boolean
}

export function SectionLevelOne({
  id,
  title,
  description,
  sectionNumber,
  children,
  className,
  isPrintMode = false,
}: SectionLevelOneProps) {
  // Get section number from the documentation structure if not provided
  const section = getSectionById(id)
  const displayNumber = sectionNumber || section?.number || ""

  return (
    <section id={id} className={cn("scroll-mt-24 mb-10", className)}>
      <div className="flex items-center mb-4">
        <Badge variant="primary" className="mr-3 text-md font-normal px-3 py-1">
          {displayNumber}
        </Badge>
        <h1 className="text-3xl font-bold group flex items-center">
          {title}
          {!isPrintMode && <SectionAnchor id={id} />}
        </h1>
      </div>

      {description && (
        <div className="mb-6">
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>
      )}

      <div className="space-y-6">
        {children}
      </div>
    </section>
  )
}

// Named export for import in MDX files
export { SectionLevelOne }

// Default export for import in other components
export default SectionLevelOne