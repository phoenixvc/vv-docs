/**
 * PDF Download Service
 * Provides consistent functionality for downloading different document types
 */

export type DocumentType = "whitepaper" | "litepaper" | "tokenomics" | "executive-summary"

/**
 * Creates URL parameters for the specified document type
 */
export function createDocumentParams(type: DocumentType): URLSearchParams {
  const params = new URLSearchParams()

  // Add timestamp to prevent caching issues
  params.append("t", Date.now().toString())

  // Add metadata flag
  params.append("includeMetadata", "true")

  // Configure sections based on document type
  if (type === "whitepaper") {
    // Include all sections for the full whitepaper
    params.append("includeAll", "true")
  } else if (type === "litepaper") {
    // Include only key sections for the litepaper
    params.append("section", "project-overview")
    params.append("section", "executive-summary")
    params.append("section", "protocol-overview")
    params.append("section", "architecture")
    params.append("section", "tokenomics")
    params.append("section", "implementation-roadmap")
  } else if (type === "tokenomics") {
    // Include only tokenomics section
    params.append("section", "tokenomics")
    params.append("isTokenomicsOnly", "true")
  } else if (type === "executive-summary") {
    // Include only executive summary section
    params.append("section", "executive-summary")
    params.append("isSingleSection", "true")
  }

  return params
}

/**
 * Opens the document in a new tab
 */
export function openDocument(type: DocumentType): void {
  const params = createDocumentParams(type)
  const url = `/pdf-preview?${params.toString()}`

  // Use window.open with specific features for better compatibility
  window.open(url, "_blank", "noopener,noreferrer")
}

/**
 * Navigates directly to the document (for use in landing page)
 */
export function navigateToDocument(type: DocumentType): void {
  const params = createDocumentParams(type)
  const url = `/pdf-preview?${params.toString()}`

  // Direct navigation
  window.location.href = url
}
