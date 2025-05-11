// Export all types that were previously in ../types/version
// Document type enum for improved type safety
export enum DocumentType {
  WHITEPAPER = "whitepaper",
  LITEPAPER = "litepaper",
  TOKENOMICS = "tokenomics",
  EXECUTIVE_SUMMARY = "executiveSummary"
}

export interface VersionMetadata {
  currentVersion: string;
  versions: string[];
  latestVersions: {
    [DocumentType.WHITEPAPER]: string;
    [DocumentType.LITEPAPER]: string;
    [DocumentType.TOKENOMICS]: string;
    [DocumentType.EXECUTIVE_SUMMARY]: string;
  };
  releaseDate: {
    [version: string]: string;
  };
}

export interface DocumentVersion {
  id: string;
  version: string;
  documentType: DocumentType;
  // ...other properties
}

export interface DocumentVersion {
  id: string;
  version: string;
  documentType: string;
  title: string;
  description: string;
  releaseDate: string;
  isLatest: boolean;
  changelog: string;
  sections: string[];
}

export interface SectionVersion {
  id: string;
  sectionId: string;
  title: string;
  path: string;
  version: string;
  lastUpdated: string;
  documentTypes: string[];
  tags: string[];
}

// Constants
export const VERSION_METADATA_KEY = "version:metadata";
export const DOCUMENT_VERSIONS_KEY = "document:versions";
export const SECTION_VERSIONS_KEY = "section:versions";