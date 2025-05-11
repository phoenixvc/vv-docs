import { v4 as uuidv4 } from "uuid";
import redis, { testRedisConnection } from "../redis";
import { SectionVersion, SECTION_VERSIONS_KEY } from "./types";

// Get all section versions
export async function getAllSectionVersions(): Promise<SectionVersion[]> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const versions = await redis.get<string>(SECTION_VERSIONS_KEY);
    if (!versions) {
      return [];
    }

    return JSON.parse(versions) as SectionVersion[];
  } catch (error) {
    console.error("Error getting section versions:", error);
    return [];
  }
}

// Get section versions by version number
export async function getSectionVersionsByVersion(version: string): Promise<SectionVersion[]> {
  try {
    const allVersions = await getAllSectionVersions();
    return allVersions.filter((section) => section.version === version);
  } catch (error) {
    console.error(`Error getting section versions for version ${version}:`, error);
    return [];
  }
}

// Get section version by ID
export async function getSectionVersionById(id: string): Promise<SectionVersion | null> {
  try {
    const allVersions = await getAllSectionVersions();
    return allVersions.find((section) => section.id === id) || null;
  } catch (error) {
    console.error(`Error getting section version by ID ${id}:`, error);
    return null;
  }
}

// Create a new section version
export async function createSectionVersion(section: Omit<SectionVersion, "id">): Promise<SectionVersion> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const newSection: SectionVersion = {
      ...section,
      id: uuidv4(),
    };

    await redis.multi()
      .json_arrappend(SECTION_VERSIONS_KEY, '$', JSON.stringify(newSection)) // RedisJSON example
      .exec();

    return newSection;
  } catch (error) {
    console.error("Error creating section version:", error);
    throw error;
  }
}

// Update a section version
export async function updateSectionVersion(
  id: string,
  updates: Partial<SectionVersion>,
): Promise<SectionVersion | null> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const allSections = await getAllSectionVersions();
    const sectionIndex = allSections.findIndex((s) => s.id === id);

    if (sectionIndex === -1) {
      return null;
    }

    const { id: _ignoredId, sectionId: _ignoredSectionId, ...mutable } = updates; // protect invariants
    const updatedSection: SectionVersion = {
      ...allSections[sectionIndex],
      ...mutable,
    };

    allSections[sectionIndex] = updatedSection;
    await redis.set(SECTION_VERSIONS_KEY, JSON.stringify(allSections));

    return updatedSection;
  } catch (error) {
    console.error(`Error updating section version ${id}:`, error);
    throw error;
  }
}

// Delete a section version
export async function deleteSectionVersion(id: string): Promise<boolean> {
  try {
    const isConnected = await testRedisConnection();
    if (!isConnected) {
      throw new Error("Redis connection failed");
    }

    const allSections = await getAllSectionVersions();
    const sectionIndex = allSections.findIndex((s) => s.id === id);

    if (sectionIndex === -1) {
      return false;
    }

    allSections.splice(sectionIndex, 1);
    await redis.set(SECTION_VERSIONS_KEY, JSON.stringify(allSections));

    return true;
  } catch (error) {
    console.error(`Error deleting section version ${id}:`, error);
    throw error;
  }
}
