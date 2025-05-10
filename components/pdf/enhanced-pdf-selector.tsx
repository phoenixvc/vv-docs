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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Section {
  id: string
  label: string
  children?: Section[]
}

interface EnhancedPDFSelectorProps {
  className?: string
  buttonText?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function EnhancedPDFSelector({
  className = "",
  buttonText = "Custom Document",
  variant = "outline",
  size = "sm",
}: EnhancedPDFSelectorProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("preset")
  const [selectedPreset, setSelectedPreset] = useState("full")
  const [selectedSections, setSelectedSections] = useState<Record<string, boolean>>({
    "project-overview": true,
    "key-benefits": true,
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
    { id: "key-benefits", label: "Key Benefits" },
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
        { id: "data-providers", label: "Data Providers" },
        { id: "wallet-integrations", label: "Wallet Integrations" },
        { id: "blockchain-integrations", label: "Blockchain Integrations" },
        { id: "risk-management", label: "Risk Management" },
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
    // Create query params based on the selected tab
    const queryParams = new URLSearchParams()

    // Add timestamp to prevent caching
    queryParams.append("t", Date.now().toString())

    if (activeTab === "preset") {
      // Handle preset options
      if (selectedPreset === "full") {
        // For full whitepaper, use a simpler approach to avoid recursion
        queryParams.append("type", "whitepaper")
        queryParams.append("includeAll", "true")
      } else if (selectedPreset === "lite") {
        queryParams.append("type", "litepaper")
        // Include key sections for the litepaper
        queryParams.append(
          "sections",
          [
            "project-overview",
            "key-benefits",
            "executive-summary",
            "protocol-overview",
            "architecture",
            "tokenomics-overview",
            "implementation-roadmap",
          ].join(","),
        )
        queryParams.append("isSingleSection", "false")
      } else if (selectedPreset === "tokenomics") {
        queryParams.append("type", "tokenomics")
        queryParams.append("isTokenomicsOnly", "true")
      } else if (selectedPreset === "executive") {
        queryParams.append("type", "executive-summary")
        // Enhanced executive summary with more sections
        queryParams.append(
          "sections",
          ["project-overview", "key-benefits", "executive-summary", "protocol-overview"].join(","),
        )
        // Not a single section anymore since we're including multiple sections
        queryParams.append("isSingleSection", "false")
      }
    } else {
      // Handle custom section selection
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

      queryParams.append("type", isTokenomicsOnly ? "tokenomics" : "custom")
      queryParams.append("sections", sectionsToInclude.join(","))

      if (isTokenomicsOnly) {
        queryParams.append("isTokenomicsOnly", "true")
      }
    }

    // Open the print preview in a new tab
    window.open(`/pdf-preview?${queryParams.toString()}`, "_blank")

    // Close the dialog
    setOpen(false)
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
        <Button variant={variant} size={size} className={className}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Download Document</DialogTitle>
          <DialogDescription>Choose which version of the document you want to download.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preset">Preset Options</TabsTrigger>
            <TabsTrigger value="custom">Custom Sections</TabsTrigger>
          </TabsList>

          <TabsContent value="preset" className="py-4">
            <RadioGroup value={selectedPreset} onValueChange={setSelectedPreset}>
              {/* Reordered from shortest to longest */}
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="executive" id="executive" />
                <Label htmlFor="executive" className="font-medium">
                  Executive Summary
                </Label>
                <span className="text-xs text-muted-foreground ml-auto">Key project highlights</span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="lite" id="lite" />
                <Label htmlFor="lite" className="font-medium">
                  Litepaper
                </Label>
                <span className="text-xs text-muted-foreground ml-auto">Concise project overview</span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="tokenomics" id="tokenomics" />
                <Label htmlFor="tokenomics" className="font-medium">
                  Tokenomics Only
                </Label>
                <span className="text-xs text-muted-foreground ml-auto">Token economics details</span>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full" className="font-medium">
                  Full Whitepaper
                </Label>
                <span className="text-xs text-muted-foreground ml-auto">All sections included</span>
              </div>
            </RadioGroup>
          </TabsContent>

          <TabsContent value="custom" className="py-4">
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
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={generatePDF}>Generate PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
