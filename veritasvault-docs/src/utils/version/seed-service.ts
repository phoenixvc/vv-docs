import { v4 as uuidv4 } from "uuid";
import redis, { testRedisConnection } from "../redis";
import { 
  DocumentVersion, 
  SectionVersion, 
  VERSION_METADATA_KEY,
  DOCUMENT_VERSIONS_KEY,
  SECTION_VERSIONS_KEY
} from "./types";
import { updateVersionMetadata } from "./metadata-service";

// Seed initial version data (for development/testing)
export async function seedVersionData(): Promise<void> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    // Check if data already exists
    const existingMetadata = await redis.get<string>(VERSION_METADATA_KEY);
    const existingDocuments = await redis.get<string>(DOCUMENT_VERSIONS_KEY);
    const existingSections = await redis.get<string>(SECTION_VERSIONS_KEY);

    if (existingMetadata && existingDocuments && existingSections) {
      console.log("Version data already exists, skipping seed");
      return;
    }

    // Seed metadata
    const metadata = {
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

    await redis.set(VERSION_METADATA_KEY, JSON.stringify(metadata));

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
    ];

    await redis.set(DOCUMENT_VERSIONS_KEY, JSON.stringify(documentVersions));

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
    ];

    await redis.set(SECTION_VERSIONS_KEY, JSON.stringify(sectionVersions));

    console.log("Version data seeded successfully");
  } catch (error) {
    console.error("Error seeding version data:", error);
    throw error;
  }
}