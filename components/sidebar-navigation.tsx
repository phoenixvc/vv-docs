"use client"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronRight,
  ChevronDown,
  Home,
  Layers,
  Shield,
  Calendar,
  Database,
  Wallet,
  BarChart,
  PanelLeftClose,
  PanelLeftOpen,
  LinkIcon,
  DollarSign,
  Server,
  Gamepad2,
  Coins,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getNumberedDocumentationStructure } from "@/lib/documentation-structure"

interface SidebarNavigationProps {
  activeItem: string
  onNavigate: (sectionId: string) => void
  isCollapsed: boolean
  toggleCollapsed: () => void
}

export function SidebarNavigation({ activeItem, onNavigate, isCollapsed, toggleCollapsed }: SidebarNavigationProps) {
  const pathname = usePathname()
  const activeItemRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [initialScrollDone, setInitialScrollDone] = useState(false)
  const [prevActiveItem, setPrevActiveItem] = useState(activeItem)
  const [isClient, setIsClient] = useState(false)
  const [currentHash, setCurrentHash] = useState("")

  // Initialize all sections as collapsed by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tokenomics: true, // Tokenomics is expanded by default
    security: true, // Security is expanded by default
  })

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true)

    // Get initial hash
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash.replace("#", ""))

      // Add hash change listener
      const handleHashChange = () => {
        setCurrentHash(window.location.hash.replace("#", ""))
      }

      window.addEventListener("hashchange", handleHashChange)
      return () => window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  // Determine active section based on pathname
  useEffect(() => {
    if (!pathname || !isClient) return

    // Extract section from pathname
    let currentSection = activeItem

    if (pathname.includes("/integrations")) {
      if (pathname === "/integrations") {
        currentSection = "integrations"
      } else if (pathname.includes("/data-providers")) {
        currentSection = "data-providers"
      } else if (pathname.includes("/wallet-integrations")) {
        currentSection = "wallet-integrations"
      } else if (pathname.includes("/blockchain-integrations")) {
        currentSection = "blockchain-integrations"
      } else if (pathname.includes("/risk-management")) {
        currentSection = "risk-management"
      }

      // Expand only the relevant sections for the current page
      setExpandedSections((prev) => ({
        ...prev,
        integrations: true,
        [currentSection]: true,
      }))
    } else if (pathname.includes("/architecture")) {
      setExpandedSections((prev) => ({
        ...prev,
        architecture: true,
      }))
    } else if (pathname.includes("/finance-models")) {
      setExpandedSections((prev) => ({
        ...prev,
        "finance-models": true,
      }))
    } else if (pathname.includes("/technical-infrastructure")) {
      setExpandedSections((prev) => ({
        ...prev,
        "technical-infrastructure": true,
      }))
    } else if (pathname.includes("/tokenomics")) {
      setExpandedSections((prev) => ({
        ...prev,
        tokenomics: true,
      }))
    } else if (pathname.includes("/security")) {
      setExpandedSections((prev) => ({
        ...prev,
        security: true,
      }))
    } else if (pathname.includes("/gaming-technologies")) {
      setExpandedSections((prev) => ({
        ...prev,
        "gaming-technologies": true,
      }))
    } else if (pathname.includes("/governance-framework")) {
      setExpandedSections((prev) => ({
        ...prev,
        "governance-framework": true,
      }))
    }
  }, [pathname, activeItem, isClient])

  // Scroll to active item ONLY when activeItem changes or on initial load
  useEffect(() => {
    if (!isClient) return

    // Only scroll if the active item has changed or it's the initial load
    if ((activeItem !== prevActiveItem || !initialScrollDone) && activeItemRef.current && scrollAreaRef.current) {
      // Find the scroll container
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")

      if (scrollContainer) {
        // Get the position of the active item relative to the scroll container
        const itemRect = activeItemRef.current.getBoundingClientRect()
        const containerRect = scrollContainer.getBoundingClientRect()

        // Calculate the scroll position to center the item
        const scrollTop = itemRect.top - containerRect.top - containerRect.height / 2 + itemRect.height / 2

        // Scroll smoothly to the position
        scrollContainer.scrollTop += scrollTop

        // Update state to prevent unnecessary scrolling
        setInitialScrollDone(true)
        setPrevActiveItem(activeItem)
      }
    }
  }, [activeItem, prevActiveItem, initialScrollDone, expandedSections, isCollapsed, isClient])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
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

  // Get the numbered documentation structure
  const numberedStructure = getNumberedDocumentationStructure()

  // Map the structure to navigation items with icons
  const navigationItems = numberedStructure.map((section) => {
    // Assign icons based on section ID
    const getIconForSection = (id: string) => {
      switch (id) {
        case "project-overview":
          return <Home className="h-5 w-5" />
        case "architecture":
          return <Server className="h-5 w-5" />
        case "finance-models":
          return <DollarSign className="h-5 w-5" />
        case "technical-infrastructure":
          return <Shield className="h-5 w-5" />
        case "tokenomics":
          return <Coins className="h-5 w-5" />
        case "security":
          return <Shield className="h-5 w-5" />
        case "integrations":
          return <Layers className="h-5 w-5" />
        case "governance-framework":
          return <Shield className="h-5 w-5" />
        case "gaming-technologies":
          return <Gamepad2 className="h-5 w-5" />
        case "implementation-roadmap":
          return <Calendar className="h-5 w-5" />
        case "data-providers":
          return <Database className="h-5 w-5" />
        case "wallet-integrations":
          return <Wallet className="h-5 w-5" />
        case "blockchain-integrations":
          return <Layers className="h-5 w-5" />
        case "risk-management":
          return <BarChart className="h-5 w-5" />
        default:
          return null
      }
    }

    // Create the navigation item with proper href
    return {
      ...section,
      icon: getIconForSection(section.id),
      href: section.id === "project-overview" ? "/" : `/${section.id}`,
      label: section.number ? `${section.number}. ${section.label}` : section.label,
      children: section.children?.map((child) => ({
        ...child,
        href: `/${section.id}#${child.id}`,
        label: child.number ? `${child.number}. ${child.label}` : child.label,
        children: child.children?.map((grandchild) => ({
          ...grandchild,
          href: `/${section.id}#${grandchild.id}`,
          label: grandchild.number ? `${grandchild.number}. ${grandchild.label}` : grandchild.label,
        })),
      })),
    }
  })

  // Check if an item is active based on pathname and activeItem
  const isItemActive = (item: any): boolean => {
    if (!isClient) return false

    // First, check if this is the exact active item from props
    if (item.id === activeItem) return true

    // For hash-based navigation on the same page
    if (currentHash && item.id === currentHash) return true

    // For tokenomics subsections with hash
    if (pathname === "/tokenomics" && item.id.startsWith("token-") && currentHash === item.id) return true

    // For main pages without hash
    if (item.href) {
      // Remove hash part for comparison
      const itemPathWithoutHash = item.href.split("#")[0]

      // Check if this is the current page (exact match)
      if (pathname === itemPathWithoutHash) {
        // If there's no hash or this is a parent item, it's active
        if (!currentHash || !item.href.includes("#")) return true
      }

      // For section pages with hash
      if (item.href.includes("#")) {
        const [itemPath, itemHash] = item.href.split("#")
        // If we're on the right page and the hash matches
        if (pathname === itemPath && currentHash === itemHash) return true
      }
    }

    // For integration pages
    if (pathname.includes("/integrations")) {
      if (item.id === "integrations" && pathname === "/integrations") return true
      if (item.id === "data-providers" && pathname.includes("/data-providers")) return true
      if (item.id === "wallet-integrations" && pathname.includes("/wallet-integrations")) return true
      if (item.id === "blockchain-integrations" && pathname.includes("/blockchain-integrations")) return true
      if (item.id === "risk-management" && pathname.includes("/risk-management")) return true
    }

    return false
  }

  const renderNavigationItems = (items: any[], level = 0) => {
    return items.map((item) => {
      const isActive = isItemActive(item)

      // Check if any child is active
      const hasActiveChild = item.children?.some(
        (child: any) => isItemActive(child) || child.children?.some((grandchild: any) => isItemActive(grandchild)),
      )

      // Visual indicators for hierarchy
      const levelIndicators = {
        0: "", // Level 0 - Main sections
        1: "border-l-2 border-muted pl-2", // Level 1 - Subsections
        2: "border-l border-muted/50 pl-2 ml-1", // Level 2 - Detailed components
      }

      if (!item.children) {
        if (item.href) {
          return isCollapsed && level === 0 ? (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href} className="block w-full">
                    <Button
                      ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn("w-full justify-center", isActive ? "bg-primary/10 text-primary font-medium" : "")}
                    >
                      {item.icon || <div className="w-5 h-5" />}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link key={item.id} href={item.href} className="block w-full">
              <Button
                ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive ? "bg-primary/10 text-primary font-medium sidebar-active-item" : "",
                  level === 1 && "ml-4",
                  level === 2 && "ml-8",
                  level === 3 && "ml-12",
                  item.href?.includes("#") && "flex items-center",
                  levelIndicators[level as keyof typeof levelIndicators],
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span className="sidebar-label">{item.label}</span>
                {item.href?.includes("#") && <LinkIcon className="ml-1 h-3 w-3 opacity-70" />}
              </Button>
            </Link>
          )
        }

        // For tokenomics subsections
        if (level > 0 && item.id.startsWith("token-")) {
          return isCollapsed ? null : (
            <Link key={item.id} href={`/tokenomics#${item.id}`} className="block w-full">
              <Button
                ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive ? "bg-primary/10 text-primary font-medium sidebar-active-item" : "",
                  level === 1 && "ml-4",
                  level === 2 && "ml-8",
                  level === 3 && "ml-12",
                  levelIndicators[level as keyof typeof levelIndicators],
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span className="sidebar-label">{item.label}</span>
              </Button>
            </Link>
          )
        }

        return isCollapsed && level === 0 ? (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-center", isActive ? "bg-primary/10 text-primary font-medium" : "")}
                  onClick={() => onNavigate(item.id)}
                >
                  {item.icon || <div className="w-5 h-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            key={item.id}
            ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              isActive ? "bg-primary/10 text-primary font-medium sidebar-active-item" : "",
              level === 1 && "ml-4",
              level === 2 && "ml-8",
              level === 3 && "ml-12",
              levelIndicators[level as keyof typeof levelIndicators],
            )}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            <span className="sidebar-label">{item.label}</span>
          </Button>
        )
      }

      // If sidebar is collapsed and this is a top-level item with children, show only icon with tooltip
      if (isCollapsed && level === 0) {
        return (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                {item.href ? (
                  <Link href={item.href}>
                    <Button
                      ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
                      variant={isActive || hasActiveChild ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-center",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : hasActiveChild
                            ? "bg-primary/5 text-primary/80"
                            : "",
                      )}
                    >
                      {item.icon || <div className="w-5 h-5" />}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
                    variant={isActive || hasActiveChild ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-center",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : hasActiveChild
                          ? "bg-primary/5 text-primary/80"
                          : "",
                    )}
                    onClick={() => onNavigate(item.id)}
                  >
                    {item.icon || <div className="w-5 h-5" />}
                  </Button>
                )}
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }

      return (
        <div
          key={item.id}
          className={cn("space-y-1", level > 0 && levelIndicators[level as keyof typeof levelIndicators])}
        >
          {item.href ? (
            <div className="flex w-full">
              <Link href={item.href} className={cn("flex-1", isActive ? "text-primary" : "")}>
                <Button
                  ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
                  variant={isActive || hasActiveChild ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : hasActiveChild
                        ? "bg-primary/5 text-primary/80"
                        : "",
                    level === 1 && "ml-4",
                    level === 2 && "ml-8",
                  )}
                >
                  <span className="flex items-center">
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span className="sidebar-label">{item.label}</span>
                  </span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-9 w-9 flex-none"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleSection(item.id)
                }}
              >
                {expandedSections[item.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          ) : (
            <div className="flex w-full">
              <Button
                ref={isActive ? (el) => (activeItemRef.current = el) : undefined}
                variant={isActive || hasActiveChild ? "secondary" : "ghost"}
                className={cn(
                  "flex-1 justify-start",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : hasActiveChild
                      ? "bg-primary/5 text-primary/80"
                      : "",
                  level === 1 && "ml-4",
                  level === 2 && "ml-8",
                )}
                onClick={() => onNavigate(item.id)}
              >
                <span className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span className="sidebar-label">{item.label}</span>
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-9 w-9 flex-none"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleSection(item.id)
                }}
              >
                {expandedSections[item.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          )}

          {expandedSections[item.id] && !isCollapsed && (
            <div
              className={cn(
                "space-y-1",
                level === 0 && "border-l-2 border-muted/30 ml-3 pl-2",
                level === 1 && "border-l border-muted/20 ml-6 pl-2",
              )}
            >
              {renderNavigationItems(item.children, level + 1)}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="relative h-full">
      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold tracking-tight ${isCollapsed ? "sr-only" : ""}`}>Whitepaper</h2>
          {/* Positioned toggle button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCollapsed}
            className="sidebar-toggle absolute right-2 top-2 z-10"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)]" ref={scrollAreaRef}>
          <div className="space-y-1 mt-4 pb-4">{renderNavigationItems(navigationItems)}</div>
        </ScrollArea>
      </div>
    </div>
  )
}
