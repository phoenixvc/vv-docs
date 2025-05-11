import redis, { testRedisConnection } from "../redis";
import { VERSION_METADATA_KEY, VersionMetadata } from "./types";

// Define default metadata constant to avoid duplication
const DEFAULT_VERSION_METADATA: VersionMetadata = {
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
};

// In-memory cache for version metadata
let metadataCache: VersionMetadata | null = null;
let lastCacheTime: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Initialize default metadata if none exists
async function initializeVersionMetadata(): Promise<VersionMetadata> {
  // Create a deep copy to avoid sharing the object reference
  const defaultMetadata: VersionMetadata = JSON.parse(JSON.stringify(DEFAULT_VERSION_METADATA));
  // Update timestamp to current time
  defaultMetadata.releaseDate["1.0.0"] = new Date().toISOString();

  await redis.set(VERSION_METADATA_KEY, JSON.stringify(defaultMetadata));
  return defaultMetadata;
}

// Get version metadata
export async function getVersionMetadata(): Promise<VersionMetadata> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const metadata = await redis.get<string>(VERSION_METADATA_KEY);
    if (!metadata) {
      return initializeVersionMetadata();
    }

    return JSON.parse(metadata) as VersionMetadata;
  } catch (error) {
    console.error("Error getting version metadata:", error);
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
    };
  }
}

// Get version metadata with in-memory cache
export async function getVersionMetadataWithCache(): Promise<VersionMetadata> {
  try {
    const currentTime = Date.now();
    
    // Return cached data if it's still valid
    if (metadataCache && (currentTime - lastCacheTime < CACHE_TTL)) {
      return metadataCache;
    }
    
    // Cache miss or expired, fetch fresh data
    const metadata = await getVersionMetadata();
    
    // Update cache
    metadataCache = metadata;
    lastCacheTime = currentTime;
    
    return metadata;
  } catch (error) {
    console.error("Error getting version metadata with cache:", error);
    
    // If we have cached data, return it even if expired in case of error
    if (metadataCache) {
      return metadataCache;
    }
    
    // Otherwise, throw the error to be handled by the caller
    throw error;
  }
}

// Update version metadata
export async function updateVersionMetadata(metadata: VersionMetadata): Promise<void> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    await redis.set(VERSION_METADATA_KEY, JSON.stringify(metadata));
    
    // Update the cache when metadata is updated
    metadataCache = metadata;
    lastCacheTime = Date.now();
  } catch (error) {
    console.error("Error updating version metadata:", error);
    throw error;
  }
}