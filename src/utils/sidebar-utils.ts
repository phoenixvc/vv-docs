/**
 * Utility functions for sidebar enhancements
 */

interface ProgressData {
  [docId: string]: boolean
}

interface SidebarItem {
  type: string
  id?: string
  items?: SidebarItem[]
  [key: string]: any
}

// Get reading progress from local storage
export function getReadingProgress(): ProgressData {
  try {
    const progressData = localStorage.getItem("docusaurus-reading-progress")
    return progressData ? JSON.parse(progressData) : {}
  } catch (error) {
    console.error("Error retrieving reading progress:", error)
    return {}
  }
}

// Track reading progress for a document
export function trackReadingProgress(docId: string): void {
  try {
    const progressData = getReadingProgress()
    progressData[docId] = true
    localStorage.setItem("docusaurus-reading-progress", JSON.stringify(progressData))

    // Dispatch storage event for multi-tab support
    window.dispatchEvent(new Event("storage"))
  } catch (error) {
    console.error("Error tracking reading progress:", error)
  }
}

// Calculate overall reading progress
export function calculateOverallProgress(sidebar: SidebarItem[], progressData: ProgressData): number {
  let totalItems = 0
  let readItems = 0

  // Recursive function to count items in the sidebar
  function countItems(items: SidebarItem[]): void {
    items.forEach((item) => {
      if (item.type === "doc") {
        totalItems++
        if (item.id && progressData[item.id]) {
          readItems++
        }
      } else if (item.type === "category" && item.items) {
        countItems(item.items)
      }
    })
  }

  countItems(sidebar)

  return totalItems > 0 ? (readItems / totalItems) * 100 : 0
}

// Add section numbers to sidebar items
export function addSectionNumbers(sidebar: SidebarItem[]): SidebarItem[] {
  let sectionCounter = 1

  // Recursive function to add section numbers
  function processSidebarItems(items: SidebarItem[], prefix = ""): SidebarItem[] {
    return items.map((item) => {
      if (item.type === "category") {
        const categoryNumber = prefix ? `${prefix}.${sectionCounter}` : `${sectionCounter}`
        sectionCounter++

        return {
          ...item,
          sectionNumber: categoryNumber,
          items: processSidebarItems(item.items || [], categoryNumber),
        }
      } else if (item.type === "doc") {
        const docNumber = prefix ? `${prefix}.${sectionCounter}` : `${sectionCounter}`
        sectionCounter++

        return {
          ...item,
          sectionNumber: docNumber,
        }
      }

      return item
    })
  }

  return processSidebarItems(sidebar)
}
