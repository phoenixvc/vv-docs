"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

interface LandingDownloadButtonProps {
  type: "whitepaper" | "litepaper" | "tokenomics" | "executive-summary"
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
}

export function LandingDownloadButton({
  type,
  variant = "default",
  size = "default",
  className = "",
  children,
}: LandingDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      // Create URL with selected sections based on document type
      const params = new URLSearchParams()

      if (type === "whitepaper") {
        // Include all sections for the full whitepaper
        params.append("includeAll", "true")
      } else if (type === "litepaper") {
        // Include only key sections for the litepaper
        params.append("section", "project-overview")
        params.append("section", "executive-summary")
        params.append("section", "protocol-overview")
        params.append("section", "architecture")
        params.append("section", "tokenomics")
        params.append("section", "implementation-roadmap")
      } else if (type === "tokenomics") {
        // Include only tokenomics section
        params.append("section", "tokenomics")
        params.append("isTokenomicsOnly", "true")
      } else if (type === "executive-summary") {
        // Include only executive summary section
        params.append("section", "executive-summary")
        params.append("isSingleSection", "true")
      }

      // Add metadata flag and timestamp
      params.append("includeMetadata", "true")
      params.append("t", Date.now().toString())

      // Use direct location change for landing page
      const url = `/pdf-preview?${params.toString()}`
      window.open(url, "_blank")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      // Reset downloading state after a delay
      setTimeout(() => {
        setIsDownloading(false)
      }, 2000)
    }
  }

  const getButtonLabel = () => {
    if (isDownloading) return "Preparing..."

    if (children) return children

    switch (type) {
      case "whitepaper":
        return (
          <>
            <FileDown className="mr-2 h-4 w-4" />
            Download Whitepaper
          </>
        )
      case "litepaper":
        return (
          <>
            <FileDown className="mr-2 h-4 w-4" />
            Download Litepaper
          </>
        )
      case "tokenomics":
        return (
          <>
            <FileDown className="mr-2 h-4 w-4" />
            Download Tokenomics
          </>
        )
      case "executive-summary":
        return (
          <>
            <FileDown className="mr-2 h-4 w-4" />
            Download Executive Summary
          </>
        )
      default:
        return (
          <>
            <FileDown className="mr-2 h-4 w-4" />
            Download
          </>
        )
    }
  }

  return (
    <Button onClick={handleDownload} variant={variant} size={size} className={className} disabled={isDownloading}>
      {getButtonLabel()}
    </Button>
  )
}
