/**
 * Section numbering utility functions
 * Provides consistent section numbering throughout the documentation
 */

export interface SectionItem {
  id: string
  label: string
  level: number
  number?: string
  parentNumber?: string
  children?: SectionItem[]
}

export interface FlattenedSection {
  id: string
  label: string
  level: number
  number: string
  parentId?: string
}

/**
 * Generates section numbers for a hierarchical structure
 * @param sections The section tree to number
 * @returns The same tree with section numbers added
 */
export function generateSectionNumbers(sections: SectionItem[]): SectionItem[] {
  return sections.map((section, index) => {
    // Top level sections get simple numbers (1, 2, 3...)
    const sectionNumber = `${index + 1}`

    // Process children recursively if they exist
    const children = section.children
      ? section.children.map((child, childIndex) => {
          return numberChildSection(child, childIndex, sectionNumber)
        })
      : undefined

    return {
      ...section,
      number: sectionNumber,
      children,
    }
  })
}

/**
 * Recursively numbers a child section based on its parent's number
 * @param section The section to number
 * @param index The index of the section within its siblings
 * @param parentNumber The parent's section number
 * @returns The section with numbering added
 */
function numberChildSection(section: SectionItem, index: number, parentNumber: string): SectionItem {
  // Create this section's number (e.g., 1.2, 3.4.1)
  const sectionNumber = `${parentNumber}.${index + 1}`

  // Process this section's children recursively
  const children = section.children
    ? section.children.map((child, childIndex) => {
        return numberChildSection(child, childIndex, sectionNumber)
      })
    : undefined

  return {
    ...section,
    number: sectionNumber,
    parentNumber,
    children,
  }
}

/**
 * Flattens a nested section structure into a simple map for lookups
 * @param sections The section tree to flatten
 * @returns A map of section IDs to their numbering information
 */
export function flattenSectionTree(sections: SectionItem[]): Record<string, FlattenedSection> {
  const result: Record<string, FlattenedSection> = {}

  function processSection(section: SectionItem, parentId?: string) {
    result[section.id] = {
      id: section.id,
      label: section.label,
      level: section.level,
      number: section.number || "",
      parentId,
    }

    if (section.children) {
      section.children.forEach((child) => processSection(child, section.id))
    }
  }

  sections.forEach((section) => processSection(section))
  return result
}

/**
 * Gets the full section path (breadcrumb) for a given section ID
 * @param sectionId The ID of the section to get the path for
 * @param flatSections The flattened section map
 * @returns Array of sections representing the path
 */
export function getSectionPath(sectionId: string, flatSections: Record<string, FlattenedSection>): FlattenedSection[] {
  const path: FlattenedSection[] = []
  let currentId = sectionId

  while (currentId && flatSections[currentId]) {
    path.unshift(flatSections[currentId])
    currentId = flatSections[currentId].parentId || ""
  }

  return path
}

/**
 * Gets the section number for a given section ID
 * @param sectionId The ID of the section
 * @param flatSections The flattened section map
 * @returns The section number or empty string if not found
 */
export function getSectionNumber(sectionId: string, flatSections: Record<string, FlattenedSection>): string {
  return flatSections[sectionId]?.number || ""
}

/**
 * Formats a section label with its number
 * @param section The section to format
 * @returns Formatted label with number
 */
export function formatSectionLabel(section: FlattenedSection): string {
  return section.number ? `${section.number}. ${section.label}` : section.label
}
