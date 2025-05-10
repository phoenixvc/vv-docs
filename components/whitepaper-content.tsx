"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TechnicalComponents } from "@/components/technical/technical-components"
import { FinanceModelsOverview } from "@/components/finance/finance-models-overview"
import { GamingTechnologies } from "@/components/gaming/gaming-technologies"
import { ArchitectureSection } from "@/components/architecture/architecture-section"
import { SecurityArchitectureOverview } from "@/components/security/security-architecture-overview"
import { TokenomicsOverview } from "@/components/tokenomics/tokenomics-overview"
import { ProjectOverviewSection } from "@/components/project-overview-section"
import { KeyBenefitsSection } from "@/components/key-benefits-section"
import { useEffect } from "react"

interface WhitepaperContentProps {
  activeSection?: string
  selectedSections?: string[]
  includeAll?: boolean
  isPrintMode?: boolean
  isTokenomicsOnly?: boolean
  isSingleSection?: boolean
}

export function WhitepaperContent({
  activeSection = "",
  selectedSections = [],
  includeAll = false,
  isPrintMode = false,
  isTokenomicsOnly = false,
  isSingleSection = false,
}: WhitepaperContentProps) {
  // Log props for debugging
  useEffect(() => {
    if (isPrintMode) {
      console.log("WhitepaperContent props:", {
        selectedSections,
        includeAll,
        isPrintMode,
        isTokenomicsOnly,
        isSingleSection,
      })
    }
  }, [selectedSections, includeAll, isPrintMode, isTokenomicsOnly, isSingleSection])

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

  // If we're on the main page (not PDF preview), show content based on activeSection
  if (!isPrintMode && !selectedSections.length) {
    // ... (existing code for main page view)
    return <div>Main page content</div>
  }

  // For PDF preview or specific section selection
  return (
    <div className={`space-y-8 ${isPrintMode ? "print-content" : ""}`}>
      {shouldDisplaySection("project-overview") && <ProjectOverviewSection />}

      {shouldDisplaySection("key-benefits") && <KeyBenefitsSection />}

      {shouldDisplaySection("executive-summary") && (
        <section id="executive-summary">
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
        </section>
      )}

      {shouldDisplaySection("protocol-overview") && (
        <section id="protocol-overview">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Protocol Overview</h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai is built on a modular, multi-chain architecture that enables seamless interaction with
                various blockchain networks. The protocol consists of several key components:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Core Protocol:</strong> The central business logic that implements portfolio optimization
                  algorithms and risk management strategies.
                </li>
                <li className="text-base font-normal">
                  <strong>Blockchain Connectors:</strong> Specialized modules that connect the core protocol to various
                  blockchain networks, enabling cross-chain operations.
                </li>
                <li className="text-base font-normal">
                  <strong>Data Processing Layer:</strong> Responsible for collecting, cleaning, and processing data from
                  various sources before feeding it into the core protocol.
                </li>
                <li className="text-base font-normal">
                  <strong>Governance Module:</strong> Implements the decentralized governance mechanisms of the
                  platform, allowing stakeholders to participate in decision-making.
                </li>
                <li className="text-base font-normal">
                  <strong>Security Layer:</strong> Comprehensive security infrastructure that protects the platform from
                  various threats and ensures the integrity of operations.
                </li>
              </ul>
              <p className="text-base font-normal">
                These components work together to provide a secure, efficient, and user-friendly platform for
                decentralized asset management across multiple blockchain networks.
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldDisplaySection("architecture") && <ArchitectureSection />}

      {shouldDisplaySection("finance-models") && <FinanceModelsOverview />}

      {shouldDisplaySection("tokenomics") && (
        <TokenomicsOverview isPrintMode={isPrintMode} isTokenomicsOnly={isTokenomicsOnly} />
      )}

      {shouldDisplaySection("integrations") && (
        <section id="integrations">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Integrations</h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai's multi-chain architecture leverages strategic integrations to provide a comprehensive,
                secure, and efficient portfolio management solution. These integrations are organized into four main
                categories:
              </p>
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold">Data Providers</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Integrations with CoinGecko, DeFiLlama, Pinax, and Goldsky for comprehensive market data and
                    analytics.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold">Wallet Integrations</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Integrations with EtherMail and Plurality for secure, user-friendly access to multi-chain portfolio
                    management.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold">Blockchain Integrations</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Integrations with EigenLayer and EtherLink for enhanced security and cross-chain communication.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-lg font-semibold">Risk Management</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Integration with Risk Bot for comprehensive risk assessment and mitigation across multiple
                    blockchain networks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldDisplaySection("technical") && <TechnicalComponents />}

      {shouldDisplaySection("security") && <SecurityArchitectureOverview />}

      {shouldDisplaySection("gaming") && <GamingTechnologies />}

      {shouldDisplaySection("governance-framework") && (
        <section id="governance-framework">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Governance Framework</h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai implements a decentralized governance framework that enables stakeholders to participate
                in decision-making processes. This framework ensures transparency, accountability, and community
                involvement in the platform's development and operation.
              </p>
              <h3 className="text-xl font-semibold mb-2">Governance Structure</h3>
              <p className="mb-4 text-base font-normal">The governance framework consists of several key components:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Governance Token:</strong> A utility token that grants voting rights and represents ownership
                  in the platform.
                </li>
                <li className="text-base font-normal">
                  <strong>Proposal System:</strong> A mechanism for submitting, discussing, and voting on proposals for
                  platform changes.
                </li>
                <li className="text-base font-normal">
                  <strong>Voting Mechanism:</strong> A secure and transparent system for casting and counting votes on
                  governance proposals.
                </li>
                <li className="text-base font-normal">
                  <strong>Execution Framework:</strong> A process for implementing approved proposals in a timely and
                  secure manner.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldDisplaySection("implementation-roadmap") && (
        <section id="implementation-roadmap">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Implementation Roadmap</h2>
              <p className="mb-4 text-base font-normal">
                VeritasVault.ai will be developed and deployed in phases to ensure stability, security, and
                functionality. The implementation roadmap outlines the key milestones and timelines for the platform's
                development.
              </p>
              <h3 className="text-xl font-semibold mb-2">Phase 1: Foundation (Q3 2025)</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">Development of core protocol architecture</li>
                <li className="text-base font-normal">Implementation of basic data processing capabilities</li>
                <li className="text-base font-normal">Integration with primary blockchain networks</li>
                <li className="text-base font-normal">Development of security infrastructure</li>
              </ul>
              <h3 className="text-xl font-semibold mb-2">Phase 2: Expansion (Q1 2026)</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">Integration with additional blockchain networks</li>
                <li className="text-base font-normal">Implementation of advanced portfolio optimization algorithms</li>
                <li className="text-base font-normal">Development of user interface and experience</li>
                <li className="text-base font-normal">Deployment of governance framework</li>
              </ul>
              <h3 className="text-xl font-semibold mb-2">Phase 3: Maturation (Q3 2026)</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">Implementation of advanced risk management features</li>
                <li className="text-base font-normal">Integration with additional data providers</li>
                <li className="text-base font-normal">Optimization of cross-chain operations</li>
                <li className="text-base font-normal">Expansion of governance capabilities</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}
