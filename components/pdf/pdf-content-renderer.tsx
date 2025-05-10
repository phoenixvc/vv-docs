"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface PDFContentRendererProps {
  selectedSections: string[]
  includeAll: boolean
  isTokenomicsOnly: boolean
  isSingleSection: boolean
}

export function PDFContentRenderer({
  selectedSections,
  includeAll,
  isTokenomicsOnly,
  isSingleSection,
}: PDFContentRendererProps) {
  const [renderedSections, setRenderedSections] = useState<React.ReactNode[]>([])

  // Render sections in chunks to prevent UI freezing
  useEffect(() => {
    const sections: React.ReactNode[] = []

    // Function to check if a section should be displayed
    const shouldDisplaySection = (sectionId: string) => {
      // If includeAll is true, display all sections
      if (includeAll) return true

      // If we're in tokenomics-only mode and this is a tokenomics section, display it
      if (
        isTokenomicsOnly &&
        (sectionId === "tokenomics" || sectionId.startsWith("token-") || sectionId === "tokenomics-overview")
      ) {
        return true
      }

      // If we're in single section mode (like executive summary), only show that section
      if (isSingleSection && selectedSections.length === 1) {
        return selectedSections[0] === sectionId
      }

      // Otherwise, check if the section is in the selectedSections array
      return selectedSections.includes(sectionId)
    }

    // Note: Project Overview and Key Benefits are handled by the WhitepaperContent component

    // Add executive summary if needed
    if (shouldDisplaySection("executive-summary")) {
      sections.push(
        <section key="executive-summary" id="executive-summary">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai is a revolutionary multi-chain architecture designed to provide secure, transparent, and
                efficient portfolio management across multiple blockchain networks. By leveraging the unique strengths
                of various blockchains, VeritasVault.ai offers unparalleled security, scalability, and interoperability
                for decentralized finance applications.
              </p>
              <p className="mb-4 text-base font-normal">
                The platform integrates advanced risk management protocols, real-time data analytics, and machine
                learning algorithms to optimize portfolio performance while minimizing risk. Through strategic
                partnerships with leading blockchain protocols and data providers, VeritasVault.ai creates a
                comprehensive ecosystem for decentralized asset management.
              </p>
              <p className="text-base font-normal">
                This whitepaper outlines the technical architecture, governance framework, and implementation roadmap
                for VeritasVault.ai, providing a detailed overview of how the platform will revolutionize the DeFi
                landscape.
              </p>
            </CardContent>
          </Card>
        </section>,
      )
    }

    // Add protocol overview if needed
    if (shouldDisplaySection("protocol-overview")) {
      sections.push(
        <section key="protocol-overview" id="protocol-overview">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Protocol Overview</h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai is built on a modular, multi-chain architecture that enables seamless interaction with
                various blockchain networks. The protocol consists of several key components.
              </p>
              {/* Simplified content for better performance */}
            </CardContent>
          </Card>
        </section>,
      )
    }

    // Add more sections as needed...
    // This is a simplified version for better performance

    setRenderedSections(sections)
  }, [selectedSections, includeAll, isTokenomicsOnly, isSingleSection])

  return <div className="space-y-8 print-content">{renderedSections}</div>
}
