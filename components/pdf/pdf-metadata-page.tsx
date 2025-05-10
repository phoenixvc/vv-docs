import { documentMetadata } from "@/lib/migration/document-metadata"

export function PDFMetadataPage() {
  return (
    <div className="pdf-metadata-page">
      <h2 className="text-2xl font-bold mb-6">Document Information</h2>

      <div className="metadata-section mb-6">
        <h3 className="text-xl font-semibold mb-2">Document Details</h3>
        <table className="w-full metadata-table">
          <tbody>
            <tr>
              <td className="font-medium">Title:</td>
              <td>{documentMetadata.title}</td>
            </tr>
            <tr>
              <td className="font-medium">Subtitle:</td>
              <td>{documentMetadata.subtitle}</td>
            </tr>
            <tr>
              <td className="font-medium">Version:</td>
              <td>{documentMetadata.version}</td>
            </tr>
            <tr>
              <td className="font-medium">Date:</td>
              <td>{documentMetadata.date}</td>
            </tr>
            <tr>
              <td className="font-medium">Document Type:</td>
              <td>{documentMetadata.documentType}</td>
            </tr>
            <tr>
              <td className="font-medium">Classification:</td>
              <td>{documentMetadata.classification}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="metadata-section mb-6">
        <h3 className="text-xl font-semibold mb-2">Authors</h3>
        <table className="w-full metadata-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {documentMetadata.authors.map((author, index) => (
              <tr key={index}>
                <td>{author.name}</td>
                <td>{author.title}</td>
                <td>{author.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="metadata-section mb-6">
        <h3 className="text-xl font-semibold mb-2">Contributors</h3>
        <ul className="list-disc pl-5">
          {documentMetadata.contributors.map((contributor, index) => (
            <li key={index}>{contributor}</li>
          ))}
        </ul>
      </div>

      <div className="metadata-section mb-6">
        <h3 className="text-xl font-semibold mb-2">Abstract</h3>
        <p>{documentMetadata.abstract}</p>
      </div>

      <div className="metadata-section">
        <h3 className="text-xl font-semibold mb-2">Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {documentMetadata.keywords.map((keyword, index) => (
            <span key={index} className="px-2 py-1 bg-muted rounded-md text-sm">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
