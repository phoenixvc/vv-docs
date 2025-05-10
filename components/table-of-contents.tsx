"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getNumberedDocumentationStructure, getFlattenedDocumentationStructure } from "@/lib/documentation-structure"

interface TableOfContentsProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export function TableOfContents({ activeSection, onNavigate }: TableOfContentsProps) {
  // Get the numbered documentation structure
  const numberedStructure = getNumberedDocumentationStructure()
  const flattenedStructure = getFlattenedDocumentationStructure()

  // Track expanded sections - set tokenomics and security to true by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tokenomics: true,
    security: true,
  })

  // Track active hash for tokenomics subsections
  const [activeHash, setActiveHash] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Listen for hash changes
  useEffect(() => {
    if (!isClient) return

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActiveHash(hash)
      }
    }

    // Check hash on initial load
    handleHashChange()

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange)

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [isClient])

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Collapse all sections
  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {}
    numberedStructure.forEach((item) => {
      if (item.children && item.children.length > 0) {
        allCollapsed[item.id] = false
      }
    })
    setExpandedSections(allCollapsed)
  }

  // Expand all sections
  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {}
    numberedStructure.forEach((item) => {
      if (item.children?.length > 0) {
        allExpanded[item.id] = true
      }
    })
    setExpandedSections(allExpanded)
  }

  // Handle navigation with hash
  const handleNavigate = (sectionId: string, hash?: string) => {
    onNavigate(sectionId)

    // If hash is provided, update the URL hash after a short delay
    // to ensure the section is scrolled into view first
    if (hash && isClient) {
      setTimeout(() => {
        window.location.hash = hash
      }, 100)
    }
  }

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const results: any[] = []

    // Search in flattened structure
    Object.values(flattenedStructure).forEach((section) => {
      if (section.label.toLowerCase().includes(query.toLowerCase())) {
        results.push(section)
      }
    })

    setSearchResults(results)
  }

  // Define which items go in the first column (sections 1-5)
  const firstColumnItems = numberedStructure.slice(0, 5)

  // Define which items go in the second column (sections 6-10)
  const secondColumnItems = numberedStructure.slice(5)

  // Render TOC items with improved styling and interaction
  const renderTocItems = (items: any[]) => {
    return items.map((item: any) => {
      // Check if this item is active
      let isActive = activeSection === item.id

      // For tokenomics subsections, check if the hash matches
      if (item.id.startsWith("token-") && activeSection === "tokenomics" && activeHash === item.id) {
        isActive = true
      }

      const hasActiveChild = item.children?.some(
        (child: any) => child.id === activeSection || (activeSection === "tokenomics" && activeHash === child.id),
      )

      return (
        <div
          key={item.id}
          className={cn("rounded-md transition-all duration-200 relative", isActive ? "bg-primary/10 -mx-2 px-2" : "")}
        >
          <div className={cn("flex items-center py-1", isActive ? "border-l-2 border-primary pl-1" : "")}>
            {item.children && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 sm:h-6 sm:w-6 p-0 mr-1"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleSection(item.id)
                }}
                aria-label={expandedSections[item.id] ? "Collapse section" : "Expand section"}
              >
                {expandedSections[item.id] ? (
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </Button>
            )}

            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "text-xs sm:text-sm hover:underline transition-colors flex-1 py-1",
                  isActive
                    ? "text-primary font-bold"
                    : hasActiveChild
                      ? "text-primary/80 font-medium"
                      : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.number ? `${item.number}. ${item.label}` : item.label}
              </Link>
            ) : (
              <button
                onClick={() => {
                  // For tokenomics subsections, navigate with hash
                  if (item.id.startsWith("token-")) {
                    handleNavigate("tokenomics", item.id)
                  } else {
                    onNavigate(item.id)
                  }
                }}
                className={cn(
                  "text-xs sm:text-sm text-left hover:underline transition-colors flex-1 py-1",
                  isActive
                    ? "text-primary font-bold"
                    : hasActiveChild
                      ? "text-primary/80 font-medium"
                      : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.number ? `${item.number}. ${item.label}` : item.label}
              </button>
            )}
          </div>

          {item.children && expandedSections[item.id] && (
            <div
              className={cn(
                "ml-4 sm:ml-6 mt-1 space-y-1 border-l pl-1 sm:pl-2 border-muted-foreground/20",
                hasActiveChild ? "border-primary/50" : "",
              )}
            >
              {renderTocItems(item.children)}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="my-4 sm:my-5 md:my-6 p-3 sm:p-4 md:p-5 border rounded-lg bg-muted/30">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-semibold">Table of Contents</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={expandAll} className="text-xs">
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs">
              Collapse All
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        {searchQuery && (
          <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
            <h4 className="text-sm font-medium mb-2">Search Results</h4>
            {searchResults.length > 0 ? (
              <ul className="space-y-1">
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={`#${result.id}`}
                      className="text-xs hover:underline text-primary block py-1"
                      onClick={() => {
                        setSearchQuery("")
                        setSearchResults([])
                        onNavigate(result.id)
                      }}
                    >
                      {result.number ? `${result.number}. ${result.label}` : result.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">No results found</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-8 gap-y-2 mt-4">
        <div className="space-y-2">{renderTocItems(firstColumnItems)}</div>
        <div className="space-y-2">{renderTocItems(secondColumnItems)}</div>
      </div>
    </div>
  )
}
