"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Download, ChevronDown } from "lucide-react"
import { EnhancedPDFSelector } from "./pdf/enhanced-pdf-selector"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Don't show download buttons on the tokenomics download page
  const isTokenomicsDownloadPage = pathname === "/tokenomics-download"

  // Don't show download buttons on the PDF preview page
  const isPDFPreviewPage = pathname === "/pdf-preview"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDirectDownload = (type: string) => {
    // Add timestamp to prevent caching
    const timestamp = Date.now()

    if (type === "tokenomics") {
      window.open(`/tokenomics-download?t=${timestamp}`, "_blank")
    } else if (type === "executive-summary") {
      // Enhanced executive summary with more sections
      const sections = ["project-overview", "key-benefits", "executive-summary", "protocol-overview"].join(",")

      window.open(`/pdf-preview?type=${type}&sections=${sections}&isSingleSection=false&t=${timestamp}`, "_blank")
    } else if (type === "litepaper") {
      // Enhanced litepaper with key sections
      const sections = [
        "project-overview",
        "key-benefits",
        "executive-summary",
        "protocol-overview",
        "architecture",
        "tokenomics-overview",
        "implementation-roadmap",
      ].join(",")

      window.open(`/pdf-preview?type=${type}&sections=${sections}&isSingleSection=false&t=${timestamp}`, "_blank")
    } else if (type === "whitepaper") {
      // For whitepaper, use a simpler approach to avoid recursion
      window.open(`/pdf-preview?type=whitepaper&includeAll=true&t=${timestamp}`, "_blank")
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">VeritasVault.ai</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isTokenomicsDownloadPage && !isPDFPreviewPage && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Download className="mr-2 h-4 w-4" />
                    Download <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* Reordered from shortest to longest */}
                  <DropdownMenuItem onClick={() => handleDirectDownload("executive-summary")}>
                    Executive Summary
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDirectDownload("litepaper")}>Litepaper</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDirectDownload("tokenomics")}>Tokenomics</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDirectDownload("whitepaper")}>
                    Full Whitepaper
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <EnhancedPDFSelector className="w-full justify-start p-0 h-auto font-normal text-sm" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
