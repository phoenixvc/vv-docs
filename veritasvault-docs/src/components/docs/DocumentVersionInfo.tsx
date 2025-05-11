import { VersionBadge } from "../common/VersionBadge"

export interface DocumentVersionMetadata {
  id: string
  title: string
  description: string
  version: {
    introduced: string
    lastUpdated: string
  }
  documentTypes: {
    whitepaper?: string // version when included in whitepaper
    litepaper?: string // version when included in litepaper
    tokenomics?: string // version when included in tokenomics paper
    executiveSummary?: string // version when included in executive summary
  }
  authors: string[]
  reviewers?: string[]
  tags?: string[]
}

interface DocumentVersionInfoProps {
  metadata: DocumentVersionMetadata
  showFullMetadata?: boolean
}

export function DocumentVersionInfo({ metadata, showFullMetadata = false }: DocumentVersionInfoProps) {
  return (
    <div className="document-version-info">
      <div className="version-badges">
        <VersionBadge version={metadata.version.introduced} type="added" className="mr-2" />
        {metadata.version.lastUpdated !== metadata.version.introduced && (
          <VersionBadge version={metadata.version.lastUpdated} type="changed" className="mr-2" />
        )}

        {/* Document type badges */}
        {Object.entries(metadata.documentTypes).map(
          ([type, version]) =>
            version && (
              <VersionBadge
                key={type}
                version={version}
                type="included"
                documentType={type as any}
                className="mr-2 mt-2"
              />
            ),
        )}
      </div>

      {showFullMetadata && (
        <div className="document-full-metadata mt-4">
          <h4>Document Metadata</h4>
          <table className="metadata-table">
            <tbody>
              <tr>
                <td className="font-medium">ID:</td>
                <td>{metadata.id}</td>
              </tr>
              <tr>
                <td className="font-medium">Title:</td>
                <td>{metadata.title}</td>
              </tr>
              <tr>
                <td className="font-medium">Description:</td>
                <td>{metadata.description}</td>
              </tr>
              <tr>
                <td className="font-medium">Authors:</td>
                <td>{metadata.authors.join(", ")}</td>
              </tr>
              {metadata.reviewers && (
                <tr>
                  <td className="font-medium">Reviewers:</td>
                  <td>{metadata.reviewers.join(", ")}</td>
                </tr>
              )}
              {metadata.tags && (
                <tr>
                  <td className="font-medium">Tags:</td>
                  <td>
                    {metadata.tags.map((tag) => (
                      <span key={tag} className="badge badge--secondary mr-1">
                        {tag}
                      </span>
                    ))}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
