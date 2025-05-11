import { v4 as uuidv4 } from "uuid";
import redis, { testRedisConnection } from "../redis";
import { getVersionMetadata, updateVersionMetadata } from "./metadata-service";
import { DOCUMENT_VERSIONS_KEY, DocumentVersion } from "./types";

// Get all document versions
export async function getAllDocumentVersions(): Promise<DocumentVersion[]> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const versions = await redis.get<string>(DOCUMENT_VERSIONS_KEY);
    if (!versions) {
      return [];
    }

    return JSON.parse(versions) as DocumentVersion[];
  } catch (error) {
    console.error("Error getting document versions:", error);
    return [];
  }
}

// Get document versions by type
export async function getDocumentVersionsByType(documentType: string): Promise<DocumentVersion[]> {
  try {
    const allVersions = await getAllDocumentVersions();
    return allVersions.filter((version) => version.documentType === documentType);
  } catch (error) {
    console.error(`Error getting ${documentType} versions:`, error);
    return [];
  }
}

// Get document version by ID
export async function getDocumentVersionById(id: string): Promise<DocumentVersion | null> {
  try {
    const allVersions = await getAllDocumentVersions();
    return allVersions.find((version) => version.id === id) || null;
  } catch (error) {
    console.error(`Error getting document version by ID ${id}:`, error);
    return null;
  }
}

// Create a new document version
export async function createDocumentVersion(version: Omit<DocumentVersion, "id">): Promise<DocumentVersion> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const newVersion: DocumentVersion = {
      ...version,
      id: uuidv4(),
    };

    await redis.watch(DOCUMENT_VERSIONS_KEY);
    const allVersions = JSON.parse((await redis.get(DOCUMENT_VERSIONS_KEY)) ?? "[]");

    // If this is marked as latest, update other versions of the same type
    if (newVersion.isLatest) {
      allVersions.forEach((v) => {
        if (v.documentType === newVersion.documentType) {
          v.isLatest = false;
        }
      });
    }
    else if (!allVersions.some(v => v.documentType === newVersion.documentType && v.isLatest)) {
      newVersion.isLatest = true // promote this one or pick highest semver
    }

    allVersions.push(newVersion);
    await redis
      .multi()
      .set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions))
      .exec();

    // Update metadata if needed
    const metadata = await getVersionMetadata();

    // Add version to versions array if it doesn't exist
    if (!metadata.versions.includes(newVersion.version)) {
      metadata.versions.push(newVersion.version);
      metadata.versions.sort((a, b) => {
        const aParts = a.split(".").map(Number);
        const bParts = b.split(".").map(Number);

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aPart = aParts[i] || 0;
          const bPart = bParts[i] || 0;

          if (aPart !== bPart) {
            return aPart - bPart;
          }
        }

        return 0;
      });

      metadata.releaseDate[newVersion.version] = newVersion.releaseDate;
    }

    // Update latest version for document type if needed
    if (newVersion.isLatest) {
      metadata.latestVersions[newVersion.documentType] = newVersion.version;
    }

    await updateVersionMetadata(metadata);

    return newVersion;
  } catch (error) {
    console.error("Error creating document version:", error);
    throw error;
  }
}

// Helper function to find the highest version of a document type
function findHighestVersion(versions: DocumentVersion[], documentType: string): DocumentVersion | null {
  const sameTypeVersions = versions.filter((v) => v.documentType === documentType);
  if (sameTypeVersions.length === 0) {
    return null;
  }

  // Sort by version number (descending)
  sameTypeVersions.sort((a, b) => {
    const aParts = a.version.split(".").map(Number);
    const bParts = b.version.split(".").map(Number);

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aPart = aParts[i] || 0;
      const bPart = bParts[i] || 0;

      if (aPart !== bPart) {
        return bPart - aPart; // Descending order
      }
    }

    return 0;
  });

  return sameTypeVersions[0];
}

// Update a document version
export async function updateDocumentVersion(
  id: string,
  updates: Partial<DocumentVersion>,
): Promise<DocumentVersion | null> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const allVersions = await getAllDocumentVersions();
    const versionIndex = allVersions.findIndex((v) => v.id === id);

    if (versionIndex === -1) {
      return null;
    }

    const originalVersion = allVersions[versionIndex];
    const wasLatest = originalVersion.isLatest;
    const documentType = originalVersion.documentType;

    const { id: _ignoredId, documentType: _ignoredType, ...mutable } = updates;
    const updatedVersion = { ...originalVersion, ...mutable };

    // Handle isLatest changes
    if (updates.isLatest !== undefined) {
      if (updates.isLatest) {
        // This version is being promoted to latest
        allVersions.forEach((v, i) => {
          if (i !== versionIndex && v.documentType === documentType) {
            v.isLatest = false;
          }
        });
      } else if (wasLatest) {
        // This version was latest but is being demoted
        // Find the highest remaining version of the same type to promote
        const highestVersion = findHighestVersion(
          allVersions.filter((v, i) => i !== versionIndex && v.documentType === documentType),
          documentType
        );

        if (highestVersion) {
          // Promote the highest version
          const highestIndex = allVersions.findIndex((v) => v.id === highestVersion.id);
          allVersions[highestIndex].isLatest = true;
        }
      }
    }

    allVersions[versionIndex] = updatedVersion;
    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions));

    // Update metadata
    const metadata = await getVersionMetadata();
    
    // If isLatest status changed, update metadata
    if (updates.isLatest !== undefined) {
      if (updates.isLatest) {
        // This version became latest
        metadata.latestVersions[documentType] = updatedVersion.version;
      } else if (wasLatest) {
        // This version was demoted from latest
        const highestVersion = findHighestVersion(
          allVersions.filter((v) => v.documentType === documentType && v.isLatest),
          documentType
        );

        if (highestVersion) {
          metadata.latestVersions[documentType] = highestVersion.version;
        } else {
          metadata.latestVersions[documentType] = "0.0.0"; // No latest version
        }
      }
      
      await updateVersionMetadata(metadata);
    }

    return updatedVersion;
  } catch (error) {
    console.error(`Error updating document version ${id}:`, error);
    throw error;
  }
}

// Delete a document version
export async function deleteDocumentVersion(id: string): Promise<boolean> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const allVersions = await getAllDocumentVersions();
    const versionIndex = allVersions.findIndex((v) => v.id === id);

    if (versionIndex === -1) {
      return false;
    }

    const deletedVersion = allVersions[versionIndex];
    const wasLatest = deletedVersion.isLatest;
    const documentType = deletedVersion.documentType;
    const versionString = deletedVersion.version;
    
    // Remove the version from the array
    allVersions.splice(versionIndex, 1);
    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions));

    // Update metadata
    const metadata = await getVersionMetadata();
    let metadataChanged = false;

    // If this was the latest version, update metadata.latestVersions
    if (wasLatest) {
      // Find the next latest version of the same type
      const highestVersion = findHighestVersion(
        allVersions.filter((v) => v.documentType === documentType),
        documentType
      );

      if (highestVersion) {
        // Set the highest remaining version as latest
        const newLatestIndex = allVersions.findIndex((v) => v.id === highestVersion.id);
        if (newLatestIndex !== -1) {
          allVersions[newLatestIndex].isLatest = true;
          await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions));
          metadata.latestVersions[documentType] = highestVersion.version;
        }
      } else {
        // No versions left of this type
        metadata.latestVersions[documentType] = "0.0.0";
      }
      
      metadataChanged = true;
    }

    // Check if this version string is still used by any other document
    const versionStillInUse = allVersions.some(v => v.version === versionString);
    
    if (!versionStillInUse) {
      // Remove the version from metadata.versions and metadata.releaseDate
      metadata.versions = metadata.versions.filter(v => v !== versionString);
      delete metadata.releaseDate[versionString];
      metadataChanged = true;
    }

    if (metadataChanged) {
      await updateVersionMetadata(metadata);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting document version ${id}:`, error);
    throw error;
  }
}