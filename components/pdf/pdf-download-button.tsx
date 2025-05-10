"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { EnhancedPDFSelector } from "./enhanced-pdf-selector"

interface PDFDownloadButtonProps {
  type?: "whitepaper" | "litepaper" | "tokenomics" | "executive-summary" | "custom"
  iconSize?: number
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  showSelector?: boolean
}

export function PDFDownloadButton({
  type = "whitepaper",
  iconSize = 4,
  className = "",
  variant = "outline",
  size = "default",
  showSelector = true,
}: PDFDownloadButtonProps) {
  const handleDirectDownload = () => {
    // For tokenomics, go directly to the tokenomics download page
    if (type === "tokenomics") {
      window.open(`/tokenomics-download?t=${Date.now()}`, "_blank")
      return
    }

    // For other types, use the PDF preview page
    const url = `/pdf-preview?type=${type}&t=${Date.now()}`
    window.open(url, "_blank")
  }

  const getButtonLabel = () => {
    switch (type) {
      case "whitepaper":
        return "Whitepaper"
      case "litepaper":
        return "Litepaper"
      case "tokenomics":
        return "Tokenomics"
      case "executive-summary":
        return "Executive Summary"
      default:
        return "Download"
    }
  }

  // If showSelector is false, show a direct download button
  if (!showSelector) {
    return (
      <Button onClick={handleDirectDownload} variant={variant} size={size} className={`download-button ${className}`}>
        <Download className={`mr-2 h-${iconSize} w-${iconSize}`} />
        {getButtonLabel()}
      </Button>
    )
  }

  // Otherwise, show the enhanced selector
  return <EnhancedPDFSelector className={className} />
}
