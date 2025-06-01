import type { ReactNode } from "react"
import { Card, CardContent } from "../ui/card"
import { cn } from "../../lib/utils"
import { getSectionById } from "../../lib/documentation-structure"
import SectionAnchor from "../section-anchor"
import { Badge } from "../ui/badge"

interface SectionLevelTwoProps {
  id: string
  title: string
  description?: string
  sectionNumber?: string // Optional override
  children: ReactNode
  className?: string
  isPrintMode?: boolean
}

export function SectionLevelTwo({
  id,
  title,
  description,
  sectionNumber,
  children,
  className,
  isPrintMode = false,
}: SectionLevelTwoProps) {
  // Get section number from the documentation structure if not provided
  const section = getSectionById(id)
  const displayNumber = sectionNumber || section?.number || ""

  return (
    <section id={id} className={cn("scroll-mt-20 mb-8", className)}>
      <div className="flex items-center mb-3">
        <Badge variant="outline" className="mr-3 text-sm font-normal px-2 py-0.5 border-secondary/50">
          {displayNumber}
        </Badge>
        <h2 className="text-2xl font-bold group flex items-center">
          {title}
          {!isPrintMode && <SectionAnchor id={id} />}
        </h2>
      </div>

      {description && (
        <div className="mb-4">
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      )}

      <Card className="border-l-2 border-l-secondary">
        <CardContent className="pt-5">{children}</CardContent>
      </Card>
    </section>
  )
}
