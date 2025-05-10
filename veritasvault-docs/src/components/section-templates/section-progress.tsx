"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface SectionProgressProps {
  sectionId: string
  className?: string
}

export function SectionProgress({ sectionId, className }: SectionProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const calculateProgress = () => {
      const sectionRect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Section is above viewport
      if (sectionRect.bottom <= 0) return 100

      // Section is below viewport
      if (sectionRect.top >= viewportHeight) return 0

      // Section is partially visible
      if (sectionRect.top < 0) {
        // Calculate how much of the section has been scrolled past
        const visibleHeight = sectionRect.height + sectionRect.top
        return Math.min(100, Math.max(0, (visibleHeight / sectionRect.height) * 100))
      } else {
        // Calculate how much of the section is visible
        const visibleHeight = Math.min(sectionRect.height, viewportHeight - sectionRect.top)
        return Math.min(100, Math.max(0, (visibleHeight / sectionRect.height) * 100))
      }
    }

    const handleScroll = () => {
      setProgress(calculateProgress())
    }

    // Initial calculation
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionId])

  return (
    <div className={cn("mb-4", className)}>
      <Progress value={progress} className="h-1" />
      <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round(progress)}% complete</p>
    </div>
  )
}
