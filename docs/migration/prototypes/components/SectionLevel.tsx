import type React from "react"
import clsx from "clsx"
import { useDoc } from "@docusaurus/theme-common/internal"
import { Badge } from "./Badge"
import { SectionAnchor } from "./SectionAnchor"

interface SectionLevelProps {
  id: string
  title: string
  description?: string
  sectionNumber?: string
  children: React.ReactNode
  className?: string
}

/**
 * Top-level section component for documentation
 */
export function SectionLevelOne({
  id,
  title,
  description,
  sectionNumber,
  children,
  className,
}: SectionLevelProps): JSX.Element {
  const { metadata } = useDoc()
  // Get section number from the documentation structure if not provided
  const displayNumber = sectionNumber || metadata.frontMatter.sectionNumber || ""

  return (
    <section id={id} className={clsx("scroll-mt-20 mb-10", className)}>
      <div className="flex items-center mb-4">
        <Badge variant="outline" className="mr-3 text-base font-normal px-3 py-1 border-primary/30">
          {displayNumber}
        </Badge>
        <h1 className="text-4xl font-bold text-primary group flex items-center">
          {title}
          <SectionAnchor id={id} />
        </h1>
      </div>

      {description && (
        <div className="mb-6">
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>
      )}

      <div className="border-l-4 border-l-primary bg-card rounded-lg shadow-sm p-6">{children}</div>
    </section>
  )
}

/**
 * Second-level section component for documentation
 */
export function SectionLevelTwo({
  id,
  title,
  description,
  sectionNumber,
  children,
  className,
}: SectionLevelProps): JSX.Element {
  const { metadata } = useDoc()
  // Get section number from the documentation structure if not provided
  const displayNumber = sectionNumber || metadata.frontMatter.subsectionNumber || ""

  return (
    <section id={id} className={clsx("scroll-mt-20 mb-8", className)}>
      <div className="flex items-center mb-3">
        <Badge variant="outline" className="mr-3 text-sm font-normal px-2 py-0.5 border-secondary/50">
          {displayNumber}
        </Badge>
        <h2 className="text-2xl font-bold group flex items-center">
          {title}
          <SectionAnchor id={id} />
        </h2>
      </div>

      {description && (
        <div className="mb-4">
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      )}

      <div className="border-l-2 border-l-secondary bg-card rounded-lg shadow-sm p-5">{children}</div>
    </section>
  )
}

/**
 * Third-level section component for documentation
 */
export function SectionLevelThree({
  id,
  title,
  description,
  sectionNumber,
  children,
  className,
}: SectionLevelProps): JSX.Element {
  const { metadata } = useDoc()
  // Get section number from the documentation structure if not provided
  const displayNumber = sectionNumber || metadata.frontMatter.subsubsectionNumber || ""

  return (
    <section id={id} className={clsx("scroll-mt-20 mb-6", className)}>
      <div className="flex items-center mb-2">
        <Badge variant="outline" className="mr-2 text-xs font-normal px-1.5 py-0.5 border-tertiary/50">
          {displayNumber}
        </Badge>
        <h3 className="text-xl font-bold group flex items-center">
          {title}
          <SectionAnchor id={id} />
        </h3>
      </div>

      {description && (
        <div className="mb-3">
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
      )}

      <div className="border-l-1 border-l-tertiary bg-card rounded-lg shadow-sm p-4">{children}</div>
    </section>
  )
}
