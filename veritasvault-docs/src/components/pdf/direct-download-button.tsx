"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DirectDownloadButtonProps {
  type: "whitepaper" | "tokenomics"
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function DirectDownloadButton({ type, size = "default", variant = "default" }: DirectDownloadButtonProps) {
  const getLabel = () => {
    if (type === "tokenomics") {
      return "Download Tokenomics"
    } else {
      return "Download Whitepaper"
    }
  }

  const handleClick = () => {
    if (type === "tokenomics") {
      window.open(`/tokenomics-download?t=${Date.now()}`, "_blank")
    } else {
      window.open(`/pdf-preview?type=${type}&t=${Date.now()}`, "_blank")
    }
  }

  return (
    <Button size={size} variant={variant} onClick={handleClick}>
      <Download className="mr-2 h-4 w-4" />
      {getLabel()}
    </Button>
  )
}
