"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TocItem {
  id: string
  text: string
  level: number
}

interface SectionTocProps {
  sectionId: string
  title?: string
  className?: string
  maxDepth?: number
}

export function SectionToc({ sectionId, title = "On this page", className, maxDepth = 3 }: SectionTocProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section) return

    // Find all headings within the section
    const headings = section.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const items: TocItem[] = []

    headings.forEach((heading) => {
      const id = heading.id
      const text = heading.textContent || ""
      const level = Number.parseInt(heading.tagName.substring(1))

      // Only include headings up to maxDepth
      if (level <= maxDepth) {
        items.push({ id, text, level })
      }
    })

    setTocItems(items)

    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [sectionId, maxDepth])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100 // Adjust for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  if (tocItems.length <= 1) return null

  return (
    <div className={cn("mb-6", className)}>
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <ul className="space-y-1">
        {tocItems.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-auto py-1 px-2 justify-start text-xs w-full",
                activeId === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => scrollToHeading(item.id)}
            >
              <ChevronRight
                className={cn(
                  "h-3 w-3 mr-1 transition-transform",
                  activeId === item.id ? "text-primary" : "text-muted-foreground",
                )}
              />
              {item.text}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
