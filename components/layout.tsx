"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { ScrollProgress } from "@/components/scroll-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageNavigation } from "@/components/page-navigation"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface LayoutProps {
  children: ReactNode
  showSidebar?: boolean
  activeSection?: string
  onNavigate?: (sectionId: string) => void
  previousPage?: { title: string; href: string } | null
  nextPage?: { title: string; href: string } | null
}

export function Layout({
  children,
  showSidebar = true,
  activeSection = "executive-summary",
  onNavigate = () => {},
  previousPage = null,
  nextPage = null,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [lastReadPosition, setLastReadPosition] = useState<string | null>(null)
  const pathname = usePathname()

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize sidebar state from localStorage if available
  useEffect(() => {
    if (!isClient) return

    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true")
    }

    // Get last read position
    const lastPosition = localStorage.getItem("lastReadPosition")
    if (lastPosition) {
      setLastReadPosition(lastPosition)
    }
  }, [isClient])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    if (!isClient) return

    localStorage.setItem("sidebarCollapsed", String(sidebarCollapsed))
  }, [sidebarCollapsed, isClient])

  // Save current page as last read position
  useEffect(() => {
    if (!isClient || !pathname) return

    localStorage.setItem("lastReadPosition", pathname)
  }, [pathname, isClient])

  // Listen for mobile menu toggle from header
  useEffect(() => {
    if (!isClient) return

    const handleMobileMenuToggle = () => {
      setSidebarOpen(!sidebarOpen)
    }

    // Add event listener for custom event from header
    window.addEventListener("toggleMobileMenu", handleMobileMenuToggle)
    return () => window.removeEventListener("toggleMobileMenu", handleMobileMenuToggle)
  }, [sidebarOpen, isClient])

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="page-container">
      <Header />
      <ScrollProgress />
      <ScrollToTop />

      <div className="content-wrapper">
        {showSidebar && (
          <aside
            className={`sidebar ${sidebarOpen ? "open" : ""} ${sidebarCollapsed ? "collapsed" : ""}`}
            style={{ position: "sticky", top: "4rem" }}
          >
            <SidebarNavigation
              activeItem={activeSection}
              onNavigate={onNavigate}
              isCollapsed={sidebarCollapsed}
              toggleCollapsed={toggleSidebar}
            />
          </aside>
        )}

        <div className="main-content">
          {lastReadPosition && pathname !== lastReadPosition && (
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center text-xs"
                onClick={() => (window.location.href = lastReadPosition)}
              >
                <ChevronLeft className="mr-1 h-3 w-3" />
                Continue reading from last position
              </Button>
            </div>
          )}

          {children}

          {/* Page Navigation */}
          {(previousPage || nextPage) && <PageNavigation previousPage={previousPage} nextPage={nextPage} />}

          <Footer />
        </div>
      </div>
    </div>
  )
}
