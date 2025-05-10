import { getVersionMetadata, getAllDocumentVersions, getAllSectionVersions } from "../lib/version-service"

export async function verifyVersionData() {
  try {
    console.log("Verifying version data...")

    // Check metadata
    const metadata = await getVersionMetadata()
    console.log("Version metadata:", metadata)

    // Check document versions
    const documentVersions = await getAllDocumentVersions()
    console.log(`Found ${documentVersions.length} document versions`)

    // Check section versions
    const sectionVersions = await getAllSectionVersions()
    console.log(`Found ${sectionVersions.length} section versions`)

    // Verify integrity
    const issues = []

    // Check that all versions in metadata exist in document versions
    const documentVersionNumbers = new Set(documentVersions.map((v) => v.version))
    for (const version of metadata.versions) {
      if (!documentVersionNumbers.has(version)) {
        issues.push(`Version ${version} in metadata not found in document versions`)
      }
    }

    // Check that latest versions are marked correctly
    for (const [docType, latestVersion] of Object.entries(metadata.latestVersions)) {
      const latestDoc = documentVersions.find((v) => v.documentType === docType && v.version === latestVersion)

      if (!latestDoc) {
        issues.push(`Latest ${docType} version ${latestVersion} not found in document versions`)
      } else if (!latestDoc.isLatest) {
        issues.push(`Latest ${docType} version ${latestVersion} not marked as latest`)
      }

      // Check that no other document of this type is marked as latest
      const otherLatest = documentVersions.filter(
        (v) => v.documentType === docType && v.version !== latestVersion && v.isLatest,
      )

      if (otherLatest.length > 0) {
        issues.push(`Multiple ${docType} versions marked as latest: ${otherLatest.map((v) => v.version).join(", ")}`)
      }
    }

    // Check that all section versions have valid document types
    for (const section of sectionVersions) {
      for (const docType of section.documentTypes) {
        const validDocType = ["whitepaper", "litepaper", "tokenomics", "executiveSummary"].includes(docType)
        if (!validDocType) {
          issues.push(`Section ${section.title} has invalid document type: ${docType}`)
        }
      }
    }

    if (issues.length > 0) {
      console.error("Found issues with version data:")
      issues.forEach((issue) => console.error(`- ${issue}`))
    } else {
      console.log("Version data verification completed successfully")
    }

    return {
      success: issues.length === 0,
      issues,
      metadata,
      documentVersions,
      sectionVersions,
    }
  } catch (error) {
    console.error("Error verifying version data:", error)
    throw error
  }
}
