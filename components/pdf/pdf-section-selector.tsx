"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileDown } from "lucide-react"

interface Section {
  id: string
  label: string
  children?: Section[]
}

interface PDFSectionSelectorProps {
  className?: string
  onSectionsSelected?: (sections: string[]) => void
}

export function PDFSectionSelector({ className, onSectionsSelected }: PDFSectionSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedSections, setSelectedSections] = useState<Record<string, boolean>>({
    "project-overview": true,
    "executive-summary": true,
    "protocol-overview": true,
    "technical-infrastructure": true,
    "technical-components": true,
    "black-litterman": true,
    tokenomics: true,
    "tokenomics-overview": true,
    "token-distribution": true,
    "token-utility": true,
    "token-utility-diagram": true,
    "token-economics": true,
    "token-economics-flow": true,
    "token-governance": true,
    "token-vesting": true,
    "token-staking": true,
    "token-burn": true,
    "token-comparison": true,
    "governance-framework": true,
    "security-model": true,
    "audit-framework": true,
    "communication-system": true,
    "implementation-roadmap": true,
    integrations: true,
    "integration-benefits": true,
    "integration-comparison": true,
    "data-providers": true,
    "wallet-integrations": true,
    "blockchain-integrations": true,
    "risk-management": true,
  })

  const sections: Section[] = [
    { id: "project-overview", label: "Project Overview" },
    { id: "executive-summary", label: "Executive Summary" },
    { id: "protocol-overview", label: "Protocol Overview" },
    {
      id: "technical-infrastructure",
      label: "Technical Infrastructure",
      children: [
        { id: "technical-components", label: "Technical Components" },
        { id: "black-litterman", label: "Black-Litterman Model" },
      ],
    },
    {
      id: "tokenomics",
      label: "Tokenomics",
      children: [
        { id: "tokenomics-overview", label: "Tokenomics Overview" },
        { id: "token-distribution", label: "Token Distribution" },
        { id: "token-utility", label: "Token Utility" },
        { id: "token-utility-diagram", label: "Token Utility Diagram" },
        { id: "token-economics", label: "Token Economics" },
        { id: "token-economics-flow", label: "Token Economics Flow" },
        { id: "token-governance", label: "Token Governance" },
        { id: "token-vesting", label: "Token Vesting Schedule" },
        { id: "token-staking", label: "Token Staking Calculator" },
        { id: "token-burn", label: "Token Burn Mechanism" },
        { id: "token-comparison", label: "Token Comparison" },
      ],
    },
    {
      id: "integrations",
      label: "Integrations",
      children: [
        { id: "integration-benefits", label: "Integration Benefits" },
        { id: "integration-comparison", label: "Integration Comparison" },
        {
          id: "data-providers",
          label: "Data Providers",
          children: [
            { id: "coingecko-integration", label: "CoinGecko" },
            { id: "defillama-integration", label: "DeFiLlama" },
            { id: "pinax-integration", label: "Pinax" },
            { id: "goldsky-integration", label: "Goldsky" },
          ],
        },
        {
          id: "wallet-integrations",
          label: "Wallet Integrations",
          children: [
            { id: "ethermail-integration", label: "EtherMail" },
            { id: "plurality-integration", label: "Plurality" },
          ],
        },
        {
          id: "blockchain-integrations",
          label: "Blockchain Integrations",
          children: [
            { id: "eigenlayer-integration", label: "EigenLayer" },
            { id: "etherlink-integration", label: "EtherLink" },
          ],
        },
        {
          id: "risk-management",
          label: "Risk Management",
          children: [{ id: "risk-bot-integration", label: "Risk Bot" }],
        },
      ],
    },
    {
      id: "governance-framework",
      label: "Governance Framework",
      children: [
        { id: "security-model", label: "Security Model" },
        { id: "audit-framework", label: "Audit Framework" },
        { id: "communication-system", label: "Communication System" },
      ],
    },
    { id: "implementation-roadmap", label: "Implementation Roadmap" },
  ]

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const toggleAll = (checked: boolean) => {
    const newState: Record<string, boolean> = {}
    const addSectionsRecursively = (items: Section[]) => {
      items.forEach((item) => {
        newState[item.id] = checked
        if (item.children) {
          addSectionsRecursively(item.children)
        }
      })
    }
    addSectionsRecursively(sections)
    setSelectedSections(newState)
  }

  const generatePDF = () => {
    // Get all selected section IDs
    const sectionsToInclude = Object.entries(selectedSections)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id)

    // Ensure we have at least one section selected
    if (sectionsToInclude.length === 0) {
      alert("Please select at least one section to include in the PDF")
      return
    }

    // Check if we're only including tokenomics sections
    const isTokenomicsOnly =
      sectionsToInclude.length > 0 &&
      sectionsToInclude.every(
        (section) => section === "tokenomics" || section.startsWith("token-") || section === "tokenomics-overview",
      )

    // Create query params
    const queryParams = new URLSearchParams()

    // Add document type
    queryParams.append("type", isTokenomicsOnly ? "tokenomics" : "whitepaper")

    // Add each selected section
    queryParams.append("sections", sectionsToInclude.join(","))

    // Add timestamp to prevent caching
    queryParams.append("t", Date.now().toString())

    // Open the print preview in a new tab
    window.open(`/pdf-preview?${queryParams.toString()}`, "_blank")

    // Close the dialog
    setOpen(false)

    // Call the callback if provided
    if (onSectionsSelected) {
      onSectionsSelected(sectionsToInclude)
    }
  }

  const renderSections = (items: Section[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className="space-y-1">
        <div className="flex items-center space-x-2">
          <div style={{ marginLeft: `${level * 1.5}rem` }} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={selectedSections[item.id] || false}
              onCheckedChange={() => toggleSection(item.id)}
            />
            <label
              htmlFor={item.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </label>
          </div>
        </div>
        {item.children && <div className="mt-1">{renderSections(item.children, level + 1)}</div>}
      </div>
    ))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <FileDown className="h-4 w-4 mr-2" />
          <span>Download PDF</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Sections to Include</DialogTitle>
          <DialogDescription>Choose which sections you want to include in your custom PDF download.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={() => toggleAll(true)}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleAll(false)}>
              Deselect All
            </Button>
          </div>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">{renderSections(sections)}</div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button onClick={generatePDF}>Generate PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
