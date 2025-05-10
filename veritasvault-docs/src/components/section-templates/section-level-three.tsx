import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getSectionById } from "@/lib/documentation-structure"

interface SectionLevelThreeProps {
  id: string
  title: string
  description?: string
  sectionNumber?: string // Optional override
  children: ReactNode
  className?: string
  isPrintMode?: boolean
}

export function SectionLevelThree({
  id,
  title,
  description,
  sectionNumber,
  children,
  className,
  isPrintMode = false,
}: SectionLevelThreeProps) {
  // Get section number from the documentation structure if not provided
  const section = getSectionById(id)
  const displayNumber = sectionNumber || section?.number || ""

  return (
    <section id={id} className={cn("scroll-mt-20 mb-6 ml-4", className)}>
      <div className="flex items-center mb-2">
        <Badge variant="outline" className="mr-2 text-xs font-normal px-1.5 py-0.5 border-muted-foreground/30">
          {displayNumber}
        </Badge>
        <h3 className="text-xl font-semibold group flex items-center">
          {title}
          {!isPrintMode && <SectionAnchor id={id} />}
        </h3>
      </div>

      {description && (
        <div className="mb-3">
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
      )}

      <Card className="border-l border-l-muted-foreground/30">
        <CardContent className="pt-4">{children}</CardContent>
      </Card>
    </section>
  )
}
