import { v4 as uuidv4 } from "uuid";
import redis, { testRedisConnection } from "../redis";
import { DocumentVersion, DOCUMENT_VERSIONS_KEY } from "./types";
import { getVersionMetadata, updateVersionMetadata } from "./metadata-service";

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

    const allVersions = await getAllDocumentVersions();

    // If this is marked as latest, update other versions of the same type
    if (newVersion.isLatest) {
      allVersions.forEach((v) => {
        if (v.documentType === newVersion.documentType) {
          v.isLatest = false;
        }
      });
    }

    allVersions.push(newVersion);
    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions));

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

    const updatedVersion = {
      ...allVersions[versionIndex],
      ...updates,
    };

    // If this is marked as latest, update other versions of the same type
    if (updates.isLatest) {
      allVersions.forEach((v, i) => {
        if (i !== versionIndex && v.documentType === updatedVersion.documentType) {
          v.isLatest = false;
        }
      });
    }

    allVersions[versionIndex] = updatedVersion;
    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions));

    // Update metadata if needed
    if (updates.isLatest) {
      const metadata = await getVersionMetadata();
      metadata.latestVersions[updatedVersion.documentType] = updatedVersion.version;
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
    allVersions.splice(versionIndex, 1);
    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions));

    // If this was the latest version, update metadata
    if (deletedVersion.isLatest) {
      const metadata = await getVersionMetadata();

      // Find the next latest version of the same type
      const sameTypeVersions = allVersions.filter((v) => v.documentType === deletedVersion.documentType);
      if (sameTypeVersions.length > 0) {
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

        // Set the highest remaining version as latest
        const newLatest = sameTypeVersions[0];
        newLatest.isLatest = true;
        metadata.latestVersions[deletedVersion.documentType] = newLatest.version;

        // Update the version in the allVersions array
        const newLatestIndex = allVersions.findIndex((v) => v.id === newLatest.id);
        if (newLatestIndex !== -1) {
          allVersions[newLatestIndex].isLatest = true;
          await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(allVersions));
        }
      } else {
        // No versions left of this type
        metadata.latestVersions[deletedVersion.documentType] = "0.0.0";
      }

      await updateVersionMetadata(metadata);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting document version ${id}:`, error);
    throw error;
  }
}