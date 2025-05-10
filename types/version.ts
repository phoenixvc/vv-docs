// Document version types
export interface DocumentVersion {
  id: string
  version: string
  documentType: "whitepaper" | "litepaper" | "tokenomics" | "executiveSummary"
  title: string
  description: string
  releaseDate: string
  isLatest: boolean
  changelog?: string
  sections: string[] // Array of section IDs included in this document version
}

// Section version types
export interface SectionVersion {
  id: string
  sectionId: string
  title: string
  path: string
  version: string
  lastUpdated: string
  documentTypes: string[] // Which document types include this section
  tags: string[]
}

// Version metadata
export interface VersionMetadata {
  currentVersion: string
  versions: string[] // All available versions
  latestVersions: {
    whitepaper: string
    litepaper: string
    tokenomics: string
    executiveSummary: string
  }
  releaseDate: Record<string, string> // Map of version to release date
}
