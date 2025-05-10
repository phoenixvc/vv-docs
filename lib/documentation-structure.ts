import type { SectionItem } from "./section-numbering"

/**
 * Complete documentation structure with hierarchical organization
 * This serves as the single source of truth for section organization
 */
export const documentationStructure: SectionItem[] = [
  {
    id: "project-overview",
    label: "Project Overview",
    level: 1,
    children: [
      { id: "executive-summary", label: "Executive Summary", level: 2 },
      { id: "protocol-overview", label: "Protocol Overview", level: 2 },
      { id: "key-benefits", label: "Key Benefits", level: 2 },
    ],
  },
  {
    id: "architecture",
    label: "System Architecture",
    level: 1,
    children: [
      { id: "architecture-overview", label: "Architecture Overview", level: 2 },
      { id: "layered-architecture", label: "Layered Architecture", level: 2 },
      { id: "architecture-diagrams", label: "Architecture Diagrams", level: 2 },
      { id: "architecture-comparison", label: "Architecture Comparison", level: 2 },
    ],
  },
  {
    id: "finance-models",
    label: "Finance Models",
    level: 1,
    children: [
      { id: "finance-models-overview", label: "Finance Models Overview", level: 2 },
      {
        id: "portfolio-optimization",
        label: "Portfolio Optimization",
        level: 2,
        children: [
          { id: "monte-carlo-simulation", label: "Monte Carlo Simulation", level: 3 },
          { id: "factor-models", label: "Factor Models", level: 3 },
          { id: "black-litterman", label: "Black-Litterman Model", level: 3 },
        ],
      },
      {
        id: "yield-strategies",
        label: "Yield Strategies",
        level: 2,
        children: [{ id: "defi-yield-optimization", label: "DeFi Yield Optimization", level: 3 }],
      },
      {
        id: "ai-models",
        label: "AI Models",
        level: 2,
        children: [{ id: "neural-networks", label: "Neural Networks", level: 3 }],
      },
    ],
  },
  {
    id: "technical-infrastructure",
    label: "Technical Infrastructure",
    level: 1,
    children: [
      { id: "technical-components", label: "Technical Components", level: 2 },
      { id: "data-processing", label: "Data Processing", level: 2 },
      { id: "api-infrastructure", label: "API Infrastructure", level: 2 },
    ],
  },
  {
    id: "tokenomics",
    label: "Tokenomics",
    level: 1,
    children: [
      { id: "tokenomics-overview", label: "Tokenomics Overview", level: 2 },
      {
        id: "token-model",
        label: "Token Model",
        level: 2,
        children: [
          { id: "token-distribution", label: "Token Distribution", level: 3 },
          { id: "token-vesting", label: "Token Vesting Schedule", level: 3 },
        ],
      },
      {
        id: "token-utility",
        label: "Token Utility",
        level: 2,
        children: [{ id: "token-utility-diagram", label: "Token Utility Diagram", level: 3 }],
      },
      {
        id: "token-economics",
        label: "Token Economics",
        level: 2,
        children: [
          { id: "token-economics-flow", label: "Token Economics Flow", level: 3 },
          { id: "token-burn", label: "Token Burn Mechanism", level: 3 },
        ],
      },
      { id: "token-governance", label: "Token Governance", level: 2 },
      { id: "token-staking", label: "Token Staking Calculator", level: 2 },
      { id: "token-comparison", label: "Token Comparison", level: 2 },
    ],
  },
  {
    id: "security",
    label: "Security",
    level: 1,
    children: [
      { id: "security-architecture", label: "Security Architecture", level: 2 },
      {
        id: "security-model",
        label: "Security Model",
        level: 2,
        children: [
          { id: "threat-modeling", label: "Threat Modeling", level: 3 },
          { id: "security-protocols", label: "Security Protocols", level: 3 },
        ],
      },
      { id: "audit-framework", label: "Audit Framework", level: 2 },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    level: 1,
    children: [
      { id: "integration-benefits", label: "Integration Benefits", level: 2 },
      { id: "integration-comparison", label: "Integration Comparison", level: 2 },
      {
        id: "data-providers",
        label: "Data Providers",
        level: 2,
        children: [
          { id: "coingecko-integration", label: "CoinGecko", level: 3 },
          { id: "defillama-integration", label: "DeFiLlama", level: 3 },
        ],
      },
      { id: "wallet-integrations", label: "Wallet Integrations", level: 2 },
      { id: "blockchain-integrations", label: "Blockchain Integrations", level: 2 },
      { id: "risk-management", label: "Risk Management", level: 2 },
    ],
  },
  {
    id: "governance-framework",
    label: "Governance Framework",
    level: 1,
    children: [
      { id: "governance-structure", label: "Governance Structure", level: 2 },
      { id: "voting-mechanism", label: "Voting Mechanism", level: 2 },
      { id: "communication-system", label: "Communication System", level: 2 },
    ],
  },
  {
    id: "gaming-technologies",
    label: "Gaming Technologies",
    level: 1,
    children: [
      { id: "gaming-overview", label: "Gaming Overview", level: 2 },
      { id: "gaming-integration", label: "Gaming Integration", level: 2 },
      { id: "gaming-technologies-detail", label: "Gaming Technologies Detail", level: 2 },
    ],
  },
  {
    id: "implementation-roadmap",
    label: "Implementation Roadmap",
    level: 1,
    children: [
      { id: "phase-1", label: "Phase 1: Foundation", level: 2 },
      { id: "phase-2", label: "Phase 2: Expansion", level: 2 },
      { id: "phase-3", label: "Phase 3: Maturation", level: 2 },
    ],
  },
]

/**
 * Initialize the documentation structure with section numbers
 */
export function getNumberedDocumentationStructure() {
  return generateSectionNumbers(documentationStructure)
}

// Import the numbering functions
import { generateSectionNumbers, flattenSectionTree, getSectionPath } from "./section-numbering"

/**
 * Get a flattened map of all sections with their numbering
 */
export function getFlattenedDocumentationStructure() {
  const numberedStructure = getNumberedDocumentationStructure()
  return flattenSectionTree(numberedStructure)
}

/**
 * Get section information by ID
 * @param sectionId The section ID to look up
 * @returns The section information or undefined if not found
 */
export function getSectionById(sectionId: string) {
  const flattenedStructure = getFlattenedDocumentationStructure()
  return flattenedStructure[sectionId]
}

/**
 * Get the full path to a section (for breadcrumbs)
 * @param sectionId The section ID to get the path for
 * @returns Array of sections representing the path
 */
export function getSectionPathById(sectionId: string) {
  const flattenedStructure = getFlattenedDocumentationStructure()
  return getSectionPath(sectionId, flattenedStructure)
}
