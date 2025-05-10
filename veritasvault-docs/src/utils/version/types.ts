// Export all types that were previously in ../types/version
export interface VersionMetadata {
  currentVersion: string;
  versions: string[];
  latestVersions: {
    whitepaper: string;
    litepaper: string;
    tokenomics: string;
    executiveSummary: string;
  };
  releaseDate: {
    [version: string]: string;
  };
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