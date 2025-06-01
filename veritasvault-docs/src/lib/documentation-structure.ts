/**
 * Simple structure for documentation sections
 */
interface Section {
  id: string;
  title: string;
  number?: string;
  parent?: string;
  children?: string[];
}

/**
 * Placeholder for documentation structure
 * This would typically be populated with actual section data
 */
const documentationSections: Record<string, Section> = {};

/**
 * Get a section by its ID
 */
export function getSectionById(id: string): Section | undefined {
  return documentationSections[id];
}

/**
 * Register a section in the documentation structure
 */
export function registerSection(section: Section): void {
  documentationSections[section.id] = section;
}