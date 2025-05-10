import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

interface SectionContentTemplateProps {
  id: string
  title: string
  description?: string
  level?: 1 | 2 | 3
  children: React.ReactNode
  isPrintMode?: boolean
}

export function SectionContentTemplate({
  id,
  title,
  description,
  level = 2,
  children,
  isPrintMode = false,
}: SectionContentTemplateProps) {
  const HeadingTag = level === 1 ? "h1" : level === 2 ? "h2" : "h3"
  const headingClass =
    level === 1
      ? "text-3xl font-bold mb-4 group flex items-center"
      : level === 2
        ? "text-2xl font-bold mb-4 group flex items-center"
        : "text-xl font-semibold mb-3 group flex items-center"

  return (
    <section id={id} className={isPrintMode ? "" : "scroll-mt-20"}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <HeadingTag className={headingClass}>
              {title}
              {!isPrintMode && <SectionAnchor id={id} />}
            </HeadingTag>
            {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">{children}</CardContent>
      </Card>
    </section>
  )
}
