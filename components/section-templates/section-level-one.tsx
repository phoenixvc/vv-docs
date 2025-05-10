import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getSectionById } from "@/lib/documentation-structure"

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
    <section id={id} className={cn("scroll-mt-20 mb-10", className)}>
      <div className="flex items-center mb-4">
        <Badge variant="outline" className="mr-3 text-base font-normal px-3 py-1 border-primary/30">
          {displayNumber}
        </Badge>
        <h1 className="text-4xl font-bold text-primary group flex items-center">
          {title}
          {!isPrintMode && <SectionAnchor id={id} />}
        </h1>
      </div>

      {description && (
        <div className="mb-6">
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>
      )}

      <Card className="border-l-4 border-l-primary">
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </section>
  )
}
