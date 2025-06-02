"use client"

import { Link } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionAnchorProps {
  id: string
  className?: string
}

export function SectionAnchor({ id, className }: SectionAnchorProps) {
  return (
    <a
      href={`#${id}`}
      className={cn(
        "ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary",
        className,
      )}
      aria-label={`Link to ${id} section`}
      onClick={(e) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
          // Update URL without triggering navigation
          history.pushState({}, "", `#${id}`)
          // Scroll to element with offset for header
          const yOffset = -80
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }}
    >
      <Link className="h-4 w-4" />
    </a>
  )
}

// Add a default export that points to the named export
export default SectionAnchor;