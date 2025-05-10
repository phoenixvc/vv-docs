"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

interface DirectDownloadLinkProps {
  type: "whitepaper" | "tokenomics" | "executive-summary"
  label?: string
  className?: string
}

export function DirectDownloadLink({ type, label, className }: DirectDownloadLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (type === "tokenomics") {
      window.open(`/tokenomics-download?t=${Date.now()}`, "_blank")
    } else {
      window.open(`/pdf-preview?type=${type}&t=${Date.now()}`, "_blank")
    }
  }

  return (
    <Button variant="link" className={className} onClick={handleClick}>
      <FileDown className="h-4 w-4 mr-2" />
      {label || `Download ${type}`}
    </Button>
  )
}
