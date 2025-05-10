# Section Numbering System Guide

## Overview

This document explains the section numbering system implemented throughout the VeritasVault.ai documentation. The numbering system provides a consistent way to reference and organize content, improving navigation and establishing a clear content hierarchy.

## Table of Contents

1. [Numbering Scheme](#numbering-scheme)
2. [Implementation Details](#implementation-details)
3. [Usage in Components](#usage-in-components)
4. [Maintenance Guidelines](#maintenance-guidelines)
5. [Examples](#examples)
6. [Troubleshooting](#troubleshooting)

## Numbering Scheme

The documentation uses a hierarchical decimal numbering system with the following structure:

- **Level 1 (Main Sections)**: Single numbers (e.g., `1`, `2`, `3`)
- **Level 2 (Subsections)**: Two numbers separated by a decimal (e.g., `1.1`, `1.2`, `2.1`)
- **Level 3 (Components)**: Three numbers separated by decimals (e.g., `1.1.1`, `1.1.2`, `2.1.1`)
- **Level 4 (Details)**: Four numbers separated by decimals (e.g., `1.1.1.1`, `1.1.1.2`)

The system supports up to 4 levels of nesting, though we recommend limiting content to 3 levels for better readability.

### Example Structure

\`\`\`
1. Project Overview
   1.1. Vision and Mission
   1.2. Key Benefits
        1.2.1. Security Benefits
        1.2.2. Financial Benefits
   1.3. Target Audience
2. Architecture
   2.1. High-Level Architecture
        2.1.1. System Components
        2.1.2. Integration Points
   2.2. Layered Architecture
        2.2.1. Presentation Layer
        2.2.2. Business Logic Layer
        2.2.3. Data Layer
\`\`\`

## Implementation Details

The section numbering system is implemented through several key components:

### 1. Central Documentation Structure

The file `lib/documentation-structure.ts` serves as the single source of truth for the documentation structure. It defines:

- The hierarchical relationship between sections
- The order of sections and subsections
- Metadata for each section (title, description, path)

This centralized approach ensures consistency and makes it easier to reorganize content when needed.

### 2. Automatic Numbering Generation

The `lib/section-numbering.ts` utility provides functions to:

- Generate section numbers based on the hierarchical structure
- Create a flattened map of section IDs to their full paths
- Format section labels with their corresponding numbers
- Build breadcrumb trails with proper numbering

The numbering is generated automatically, so you don't need to manually assign numbers to sections.

### 3. Section Templates Integration

The section template components (`SectionLevelOne`, `SectionLevelTwo`, `SectionLevelThree`) automatically retrieve and display the correct section numbers based on the section ID.

## Usage in Components

The numbering system is integrated into several key components:

### Sidebar Navigation

The sidebar displays section numbers alongside section titles, providing a clear indication of the content hierarchy. The component automatically retrieves section numbers from the central structure.

\`\`\`tsx
// Example of sidebar navigation with numbering
<SidebarNavigation
  items={documentationStructure}
  currentPath={currentPath}
/>
\`\`\`

### Table of Contents

The table of contents component displays numbered sections and subsections for the current page, helping users understand the page structure.

\`\`\`tsx
// Example of table of contents with numbering
<TableOfContents
  headings={pageHeadings}
  currentSection={currentSection}
/>
\`\`\`

### Section Headers

Section template components automatically display the correct section number in their headers:

\`\`\`tsx
// Example of a section with automatic numbering
<SectionLevelOne
  id="architecture"
  title="Architecture"
  description="System architecture overview"
/>
\`\`\`

### Breadcrumb Navigation

The breadcrumb navigation shows the full path to the current section, including section numbers:

\`\`\`tsx
// Example of breadcrumb navigation with numbering
<BreadcrumbNavigation
  currentPath={currentPath}
/>
\`\`\`

## Maintenance Guidelines

To maintain the integrity of the section numbering system:

### Adding New Sections

1. Add the new section to the appropriate place in `lib/documentation-structure.ts`
2. Specify the section ID, title, description, and path
3. Place it in the correct position in the hierarchy
4. The numbering will be automatically generated

\`\`\`typescript
// Example of adding a new section
{
  id: "new-feature",
  title: "New Feature",
  description: "Description of the new feature",
  path: "/new-feature",
  children: [
    // Subsections if needed
  ]
}
\`\`\`

### Reorganizing Content

1. Update the structure in `lib/documentation-structure.ts`
2. Move sections to their new positions in the hierarchy
3. The numbering will automatically update to reflect the new structure
4. Update any hardcoded references to section numbers in the content

### Removing Sections

1. Remove the section from `lib/documentation-structure.ts`
2. The numbering will automatically adjust
3. Check for and update any references to the removed section

## Examples

### Basic Section Structure

\`\`\`tsx
// Main section (Level 1)
<SectionLevelOne id="tokenomics" title="Tokenomics">
  <p>Overview content...</p>
  
  // Subsection (Level 2)
  <SectionLevelTwo id="token-model" title="Token Model">
    <p>Token model details...</p>
    
    // Component (Level 3)
    <SectionLevelThree id="token-distribution" title="Token Distribution">
      <p>Distribution details...</p>
    </SectionLevelThree>
  </SectionLevelTwo>
</SectionLevelOne>
\`\`\`

This would render as:

\`\`\`
5. Tokenomics
   Overview content...
   
   5.1 Token Model
   Token model details...
   
   5.1.1 Token Distribution
   Distribution details...
\`\`\`

### Custom Section Numbers

In rare cases where you need to override the automatic numbering:

\`\`\`tsx
<SectionLevelTwo 
  id="special-case" 
  title="Special Case"
  customSectionNumber="A.1"
>
  <p>This section uses a custom numbering scheme.</p>
</SectionLevelTwo>
\`\`\`

## Troubleshooting

### Missing Section Numbers

If a section is not displaying a number:

1. Verify the section ID matches an entry in `lib/documentation-structure.ts`
2. Check that the section component is using the correct ID prop
3. Ensure the section is properly nested in the component hierarchy

### Incorrect Section Numbers

If a section displays the wrong number:

1. Check the order of sections in `lib/documentation-structure.ts`
2. Verify that the section is placed at the correct level in the hierarchy
3. Clear any browser caching that might be showing outdated content

### Numbering Inconsistencies

If numbering is inconsistent across different parts of the documentation:

1. Ensure all components are using the central numbering utilities
2. Check for hardcoded section numbers that need to be updated
3. Verify that the documentation structure is consistent

---

For additional help with the section numbering system, contact the documentation team.
