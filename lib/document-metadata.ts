import type { DocumentVersionMetadata } from "@/src/components/docs/DocumentVersionInfo"

// Document metadata for the architecture section
export const architectureMetadata: DocumentVersionMetadata = {
  id: "architecture",
  title: "Multi-Chain Architecture",
  description: "Comprehensive overview of the multi-chain architecture design and implementation",
  version: {
    introduced: "1.0.0",
    lastUpdated: "1.2.0",
  },
  documentTypes: {
    whitepaper: "1.0.0",
    litepaper: "1.0.0",
    executiveSummary: "1.0.0",
  },
  authors: ["Jurie Smit", "Eben Mare"],
  reviewers: ["Technical Review Board"],
  tags: ["architecture", "design", "infrastructure", "multi-chain"],
}

// Document metadata for the tokenomics section
export const tokenomicsMetadata: DocumentVersionMetadata = {
  id: "tokenomics",
  title: "Tokenomics Model",
  description: "Detailed explanation of the token economics, distribution, and utility",
  version: {
    introduced: "1.0.0",
    lastUpdated: "1.3.0",
  },
  documentTypes: {
    whitepaper: "1.0.0",
    litepaper: "1.1.0",
    tokenomics: "1.0.0",
    executiveSummary: "1.0.0",
  },
  authors: ["Eben Mare", "Financial Team"],
  reviewers: ["Economics Advisory Board"],
  tags: ["tokenomics", "economics", "distribution", "utility", "governance"],
}

// Document metadata for the security section
export const securityMetadata: DocumentVersionMetadata = {
  id: "security",
  title: "Security Architecture",
  description: "Security measures, protocols, and risk management strategies",
  version: {
    introduced: "1.0.0",
    lastUpdated: "1.2.0",
  },
  documentTypes: {
    whitepaper: "1.0.0",
    litepaper: "1.2.0",
  },
  authors: ["Jurie Smit", "Security Team"],
  reviewers: ["Security Audit Partners"],
  tags: ["security", "risk management", "protocols", "encryption"],
}

// Document metadata for the finance models section
export const financeModelsMetadata: DocumentVersionMetadata = {
  id: "finance-models",
  title: "Financial Models",
  description: "Advanced financial models and algorithms for portfolio optimization",
  version: {
    introduced: "1.1.0",
    lastUpdated: "1.3.0",
  },
  documentTypes: {
    whitepaper: "1.1.0",
    tokenomics: "1.2.0",
  },
  authors: ["Eben Mare", "Quantitative Analysis Team"],
  reviewers: ["Financial Advisory Board"],
  tags: ["finance", "models", "algorithms", "optimization", "portfolio"],
}

// Document metadata for the integration section
export const integrationsMetadata: DocumentVersionMetadata = {
  id: "integrations",
  title: "Platform Integrations",
  description: "Overview of all platform integrations with external services and protocols",
  version: {
    introduced: "1.0.0",
    lastUpdated: "1.3.0",
  },
  documentTypes: {
    whitepaper: "1.0.0",
    litepaper: "1.1.0",
  },
  authors: ["Integration Team"],
  reviewers: ["Technical Review Board", "Partner Relations"],
  tags: ["integrations", "protocols", "services", "APIs", "data providers"],
}

// Document metadata for the governance framework
export const governanceMetadata: DocumentVersionMetadata = {
  id: "governance-framework",
  title: "Governance Framework",
  description: "Decentralized governance structure, voting mechanisms, and proposal systems",
  version: {
    introduced: "1.2.0",
    lastUpdated: "1.3.0",
  },
  documentTypes: {
    whitepaper: "1.2.0",
    tokenomics: "1.2.0",
  },
  authors: ["Governance Team", "Eben Mare"],
  reviewers: ["Legal Advisors", "Community Representatives"],
  tags: ["governance", "voting", "proposals", "DAO", "decentralization"],
}

// Document metadata for the implementation roadmap
export const roadmapMetadata: DocumentVersionMetadata = {
  id: "implementation-roadmap",
  title: "Implementation Roadmap",
  description: "Development timeline, milestones, and future plans",
  version: {
    introduced: "1.0.0",
    lastUpdated: "1.3.0",
  },
  documentTypes: {
    whitepaper: "1.0.0",
    litepaper: "1.0.0",
    executiveSummary: "1.0.0",
  },
  authors: ["Project Management Team"],
  reviewers: ["Executive Team"],
  tags: ["roadmap", "timeline", "milestones", "development", "future"],
}

// Collection of all document metadata
export const documentMetadataCollection = {
  architecture: architectureMetadata,
  tokenomics: tokenomicsMetadata,
  security: securityMetadata,
  "finance-models": financeModelsMetadata,
  integrations: integrationsMetadata,
  "governance-framework": governanceMetadata,
  "implementation-roadmap": roadmapMetadata,
}

// Function to get metadata by section ID
export function getDocumentMetadata(sectionId: string): DocumentVersionMetadata | undefined {
  return documentMetadataCollection[sectionId as keyof typeof documentMetadataCollection]
}

// Function to get all sections included in a specific document type
export function getSectionsForDocumentType(documentType: string, version?: string): DocumentVersionMetadata[] {
  return Object.values(documentMetadataCollection).filter((metadata) => {
    const docTypeVersion = metadata.documentTypes[documentType as keyof typeof metadata.documentTypes]
    if (!docTypeVersion) return false
    if (version) {
      // Check if the section was included in this specific version or earlier
      return docTypeVersion <= version
    }
    return true
  })
}

// Function to get the latest version for each document type
export function getLatestVersions() {
  const versions = {
    whitepaper: "1.0.0",
    litepaper: "1.0.0",
    tokenomics: "1.0.0",
    executiveSummary: "1.0.0",
  }

  Object.values(documentMetadataCollection).forEach((metadata) => {
    Object.entries(metadata.documentTypes).forEach(([type, version]) => {
      if (version && version > versions[type as keyof typeof versions]) {
        versions[type as keyof typeof versions] = version
      }
    })
  })

  return versions
}
