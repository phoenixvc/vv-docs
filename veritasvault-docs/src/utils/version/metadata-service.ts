import redis, { testRedisConnection } from "../redis";
import { VersionMetadata, VERSION_METADATA_KEY } from "./types";

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
  };

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

// Update version metadata
export async function updateVersionMetadata(metadata: VersionMetadata): Promise<void> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    await redis.set(VERSION_METADATA_KEY, JSON.stringify(metadata));
  } catch (error) {
    console.error("Error updating version metadata:", error);
    throw error;
  }
}