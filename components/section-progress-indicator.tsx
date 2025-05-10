"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  label: string
}

interface SectionProgressIndicatorProps {
  sections: Section[]
  className?: string
}

export function SectionProgressIndicator({ sections, className }: SectionProgressIndicatorProps) {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header

      // Find the current section
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (!element) continue

        const sectionTop = element.offsetTop
        const sectionBottom = sectionTop + element.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <div className={cn("hidden lg:flex flex-col gap-2 fixed right-8 top-1/2 -translate-y-1/2", className)}>
      {sections.map((section) => (
        <button
          key={section.id}
          className="group flex items-center"
          onClick={() => {
            const element = document.getElementById(section.id)
            if (element) {
              const yOffset = -80
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
              window.scrollTo({ top: y, behavior: "smooth" })
            }
          }}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeSection === section.id
                ? "bg-primary w-3 h-3"
                : "bg-muted-foreground/30 group-hover:bg-muted-foreground/70",
            )}
          />
          <span
            className={cn(
              "ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity",
              activeSection === section.id ? "text-primary font-medium" : "text-muted-foreground",
            )}
          >
            {section.label}
          </span>
        </button>
      ))}
    </div>
  )
}
