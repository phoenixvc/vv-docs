import redis, { testRedisConnection } from "./redis"
import type { DocumentVersion, SectionVersion, VersionMetadata } from "@/types/version"
import { v4 as uuidv4 } from "uuid"

const VERSION_METADATA_KEY = "version:metadata"
const DOCUMENT_VERSIONS_KEY = "document:versions"
const SECTION_VERSIONS_KEY = "section:versions"

// Initialize default metadata if none exists
async function initializeVersionMetadata(): Promise<VersionMetadata> {
  const defaultMetadata: VersionMetadata = {
    currentVersion: "1.0.0",
    versions: ["1.0.0"],
    latestVersions: {
      whitepaper: "1.0.0",
      litepaper: "1.0.0",
      tokenomics: "1.0.0",
      executiveSummary: "1.0.0",
    },
    releaseDate: {
      "1.0.0": new Date().toISOString(),
    },
  }

  await redis.set(VERSION_METADATA_KEY, JSON.stringify(defaultMetadata))
  return defaultMetadata
}

// Get version metadata
export async function getVersionMetadata(): Promise<VersionMetadata> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const metadata = await redis.get<string>(VERSION_METADATA_KEY)
    if (!metadata) {
      return initializeVersionMetadata()
    }

    return JSON.parse(metadata) as VersionMetadata
  } catch (error) {
    console.error("Error getting version metadata:", error)
    // Return default metadata if there's an error
    return {
      currentVersion: "1.0.0",
      versions: ["1.0.0"],
      latestVersions: {
        whitepaper: "1.0.0",
        litepaper: "1.0.0",
        tokenomics: "1.0.0",
        executiveSummary: "1.0.0",
      },
      releaseDate: {
        "1.0.0": new Date().toISOString(),
      },
    }
  }
}

// Update version metadata
export async function updateVersionMetadata(metadata: VersionMetadata): Promise<void> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    await redis.set(VERSION_METADATA_KEY, JSON.stringify(metadata))
  } catch (error) {
    console.error("Error updating version metadata:", error)
    throw error
  }
}

// Get all document versions
export async function getAllDocumentVersions(): Promise<DocumentVersion[]> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const versions = await redis.get<string>(DOCUMENT_VERSIONS_KEY)
    if (!versions) {
      return []
    }

    return JSON.parse(versions) as DocumentVersion[]
  } catch (error) {
    console.error("Error getting document versions:", error)
    return []
  }
}

// Get document versions by type
export async function getDocumentVersionsByType(documentType: string): Promise<DocumentVersion[]> {
  try {
    const allVersions = await getAllDocumentVersions()
    return allVersions.filter((version) => version.documentType === documentType)
  } catch (error) {
    console.error(`Error getting ${documentType} versions:`, error)
    return []
  }
}

// Get document version by ID
export async function getDocumentVersionById(id: string): Promise<DocumentVersion | null> {
  try {
    const allVersions = await getAllDocumentVersions()
    return allVersions.find((version) => version.id === id) || null
  } catch (error) {
    console.error(`Error getting document version by ID ${id}:`, error)
    return null
  }
}

// Create a new document version
export async function createDocumentVersion(version: Omit<DocumentVersion, "id">): Promise<DocumentVersion> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const newVersion: DocumentVersion = {
      ...version,
      id: uuidv4(),
    }

    const allVersions = await getAllDocumentVersions()

    // If this is marked as latest, update other versions of the same type
    if (newVersion.isLatest) {
      allVersions.forEach((v) => {
        if (v.documentType === newVersion.documentType) {
          v.isLatest = false
        }
      })
    }

    allVersions.push(newVersion)
    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions))

    // Update metadata if needed
    const metadata = await getVersionMetadata()

    // Add version to versions array if it doesn't exist
    if (!metadata.versions.includes(newVersion.version)) {
      metadata.versions.push(newVersion.version)
      metadata.versions.sort((a, b) => {
        const aParts = a.split(".").map(Number)
        const bParts = b.split(".").map(Number)

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aPart = aParts[i] || 0
          const bPart = bParts[i] || 0

          if (aPart !== bPart) {
            return aPart - bPart
          }
        }

        return 0
      })

      metadata.releaseDate[newVersion.version] = newVersion.releaseDate
    }

    // Update latest version for document type if needed
    if (newVersion.isLatest) {
      metadata.latestVersions[newVersion.documentType] = newVersion.version
    }

    await updateVersionMetadata(metadata)

    return newVersion
  } catch (error) {
    console.error("Error creating document version:", error)
    throw error
  }
}

// Update a document version
export async function updateDocumentVersion(
  id: string,
  updates: Partial<DocumentVersion>,
): Promise<DocumentVersion | null> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const allVersions = await getAllDocumentVersions()
    const versionIndex = allVersions.findIndex((v) => v.id === id)

    if (versionIndex === -1) {
      return null
    }

    const updatedVersion = {
      ...allVersions[versionIndex],
      ...updates,
    }

    // If this is marked as latest, update other versions of the same type
    if (updates.isLatest) {
      allVersions.forEach((v, i) => {
        if (i !== versionIndex && v.documentType === updatedVersion.documentType) {
          v.isLatest = false
        }
      })
    }

    allVersions[versionIndex] = updatedVersion
    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions))

    // Update metadata if needed
    if (updates.isLatest) {
      const metadata = await getVersionMetadata()
      metadata.latestVersions[updatedVersion.documentType] = updatedVersion.version
      await updateVersionMetadata(metadata)
    }

    return updatedVersion
  } catch (error) {
    console.error(`Error updating document version ${id}:`, error)
    throw error
  }
}

// Delete a document version
export async function deleteDocumentVersion(id: string): Promise<boolean> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const allVersions = await getAllDocumentVersions()
    const versionIndex = allVersions.findIndex((v) => v.id === id)

    if (versionIndex === -1) {
      return false
    }

    const deletedVersion = allVersions[versionIndex]
    allVersions.splice(versionIndex, 1)
    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions))

    // If this was the latest version, update metadata
    if (deletedVersion.isLatest) {
      const metadata = await getVersionMetadata()

      // Find the next latest version of the same type
      const sameTypeVersions = allVersions.filter((v) => v.documentType === deletedVersion.documentType)
      if (sameTypeVersions.length > 0) {
        // Sort by version number (descending)
        sameTypeVersions.sort((a, b) => {
          const aParts = a.version.split(".").map(Number)
          const bParts = b.version.split(".").map(Number)

          for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
            const aPart = aParts[i] || 0
            const bPart = bParts[i] || 0

            if (aPart !== bPart) {
              return bPart - aPart // Descending order
            }
          }

          return 0
        })

        // Set the highest remaining version as latest
        const newLatest = sameTypeVersions[0]
        newLatest.isLatest = true
        metadata.latestVersions[deletedVersion.documentType] = newLatest.version

        // Update the version in the allVersions array
        const newLatestIndex = allVersions.findIndex((v) => v.id === newLatest.id)
        if (newLatestIndex !== -1) {
          allVersions[newLatestIndex].isLatest = true
          await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions))
        }
      } else {
        // No versions left of this type
        metadata.latestVersions[deletedVersion.documentType] = "0.0.0"
      }

      await updateVersionMetadata(metadata)
    }

    return true
  } catch (error) {
    console.error(`Error deleting document version ${id}:`, error)
    throw error
  }
}

// Get all section versions
export async function getAllSectionVersions(): Promise<SectionVersion[]> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const versions = await redis.get<string>(SECTION_VERSIONS_KEY)
    if (!versions) {
      return []
    }

    return JSON.parse(versions) as SectionVersion[]
  } catch (error) {
    console.error("Error getting section versions:", error)
    return []
  }
}

// Get section versions by version number
export async function getSectionVersionsByVersion(version: string): Promise<SectionVersion[]> {
  try {
    const allVersions = await getAllSectionVersions()
    return allVersions.filter((section) => section.version === version)
  } catch (error) {
    console.error(`Error getting section versions for version ${version}:`, error)
    return []
  }
}

// Get section version by ID
export async function getSectionVersionById(id: string): Promise<SectionVersion | null> {
  try {
    const allVersions = await getAllSectionVersions()
    return allVersions.find((section) => section.id === id) || null
  } catch (error) {
    console.error(`Error getting section version by ID ${id}:`, error)
    return null
  }
}

// Create a new section version
export async function createSectionVersion(section: Omit<SectionVersion, "id">): Promise<SectionVersion> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const newSection: SectionVersion = {
      ...section,
      id: uuidv4(),
    }

    const allSections = await getAllSectionVersions()
    allSections.push(newSection)
    await redis.set(SECTION_VERSIONS_KEY, JSON.stringify(allSections))

    return newSection
  } catch (error) {
    console.error("Error creating section version:", error)
    throw error
  }
}

// Update a section version
export async function updateSectionVersion(
  id: string,
  updates: Partial<SectionVersion>,
): Promise<SectionVersion | null> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const allSections = await getAllSectionVersions()
    const sectionIndex = allSections.findIndex((s) => s.id === id)

    if (sectionIndex === -1) {
      return null
    }

    const updatedSection = {
      ...allSections[sectionIndex],
      ...updates,
    }

    allSections[sectionIndex] = updatedSection
    await redis.set(SECTION_VERSIONS_KEY, JSON.stringify(allSections))

    return updatedSection
  } catch (error) {
    console.error(`Error updating section version ${id}:`, error)
    throw error
  }
}

// Delete a section version
export async function deleteSectionVersion(id: string): Promise<boolean> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    const allSections = await getAllSectionVersions()
    const sectionIndex = allSections.findIndex((s) => s.id === id)

    if (sectionIndex === -1) {
      return false
    }

    allSections.splice(sectionIndex, 1)
    await redis.set(SECTION_VERSIONS_KEY, JSON.stringify(allSections))

    return true
  } catch (error) {
    console.error(`Error deleting section version ${id}:`, error)
    throw error
  }
}

// Seed initial version data (for development/testing)
export async function seedVersionData(): Promise<void> {
  try {
    const isConnected = await testRedisConnection()
    if (!isConnected) {
      throw new Error("Redis connection failed")
    }

    // Check if data already exists
    const existingMetadata = await redis.get<string>(VERSION_METADATA_KEY)
    const existingDocuments = await redis.get<string>(DOCUMENT_VERSIONS_KEY)
    const existingSections = await redis.get<string>(SECTION_VERSIONS_KEY)

    if (existingMetadata && existingDocuments && existingSections) {
      console.log("Version data already exists, skipping seed")
      return
    }

    // Seed metadata
    const metadata: VersionMetadata = {
      currentVersion: "1.0.0",
      versions: ["1.0.0"],
      latestVersions: {
        whitepaper: "1.0.0",
        litepaper: "1.0.0",
        tokenomics: "1.0.0",
        executiveSummary: "1.0.0",
      },
      releaseDate: {
        "1.0.0": new Date().toISOString(),
      },
    }

    await redis.set(VERSION_METADATA_KEY, JSON.stringify(metadata))

    // Seed document versions
    const documentVersions: DocumentVersion[] = [
      {
        id: uuidv4(),
        version: "1.0.0",
        documentType: "whitepaper",
        title: "Initial Whitepaper",
        description: "The first version of the comprehensive whitepaper",
        releaseDate: new Date().toISOString(),
        isLatest: true,
        changelog: "Initial release",
        sections: ["architecture", "tokenomics", "security"],
      },
      {
        id: uuidv4(),
        version: "1.0.0",
        documentType: "litepaper",
        title: "Initial Litepaper",
        description: "The first version of the simplified litepaper",
        releaseDate: new Date().toISOString(),
        isLatest: true,
        changelog: "Initial release",
        sections: ["architecture", "tokenomics"],
      },
      {
        id: uuidv4(),
        version: "1.0.0",
        documentType: "tokenomics",
        title: "Initial Tokenomics Paper",
        description: "The first version of the tokenomics paper",
        releaseDate: new Date().toISOString(),
        isLatest: true,
        changelog: "Initial release",
        sections: ["tokenomics"],
      },
    ]

    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(documentVersions))

    // Seed section versions
    const sectionVersions: SectionVersion[] = [
      {
        id: uuidv4(),
        sectionId: "architecture",
        title: "Architecture",
        path: "/architecture",
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        documentTypes: ["whitepaper", "litepaper"],
        tags: ["technical", "infrastructure"],
      },
      {
        id: uuidv4(),
        sectionId: "tokenomics",
        title: "Tokenomics",
        path: "/tokenomics",
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        documentTypes: ["whitepaper", "litepaper", "tokenomics"],
        tags: ["economics", "token"],
      },
      {
        id: uuidv4(),
        sectionId: "security",
        title: "Security",
        path: "/security",
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        documentTypes: ["whitepaper"],
        tags: ["security", "risk"],
      },
    ]

    await redis.set(SECTION_VERSIONS_KEY, JSON.stringify(sectionVersions))

    console.log("Version data seeded successfully")
  } catch (error) {
    console.error("Error seeding version data:", error)
    throw error
  }
}
