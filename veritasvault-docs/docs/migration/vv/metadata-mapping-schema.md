# Metadata Mapping Schema for Docusaurus Migration

This document outlines how metadata from our current whitepaper TSX components will map to Docusaurus frontmatter fields, ensuring consistent information architecture and SEO optimization.

## Metadata Mapping Table

| Original Metadata | Docusaurus Frontmatter | Transformation | Notes |
|-------------------|------------------------|----------------|-------|
| Component Title/Heading | `title` | Extract from main heading | Primary document title |
| Section Description | `description` | Extract from intro paragraph | Keep under 160 characters for SEO |
| Section Tags | `keywords` | Convert to array | `['tokenomics', 'distribution', 'vesting']` |
| Section Category | `sidebar_label` | Use shortened title | For sidebar navigation |
| Document Order | `sidebar_position` | Extract from file name or structure | Controls order in sidebar |
| Last Updated Date | `last_update` | Extract from component metadata | Format as YYYY-MM-DD |
| Author/Team | `authors` | Map from component or structure | Array of author objects |
| Related Documents | `custom_related_docs` | Extract from cross-references | Array of related document IDs |
| Document Status | `custom_status` | Map from quality assessment | 'draft', 'review', 'published' |
| Technical Complexity | `custom_complexity` | Assign based on content | 'beginner', 'intermediate', 'advanced' |
| Required Knowledge | `custom_prerequisites` | Extract from content relationships | Array of prerequisite document IDs |
| Visual Assets | `custom_assets` | Track associated diagrams/charts | Array of asset references |
| Interactive Elements | `custom_interactive` | Track interactive components | Boolean or component references |
| Estimated Reading Time | `custom_reading_time` | Calculate based on content | In minutes |
| Target Audience | `custom_audience` | Assign based on content | Array of audience types |
| Document Type | `custom_doc_type` | Assign based on content | 'concept', 'guide', 'reference', 'tutorial' |

## Example Transformations

### Original Component Metadata (Extracted from TSX)

\`\`\`tsx
// From components/tokenomics/token-distribution-chart.tsx
export function TokenDistributionChart() {
  // Component metadata is implicit in the structure and content
  return (
    <div>
      <h2>Token Distribution</h2>
      <p>This diagram illustrates the allocation of tokens across different stakeholders and use cases.</p>
      {/* Component content */}
    </div>
  );
}
\`\`\`

### Transformed Docusaurus Frontmatter

\`\`\`md
---
title: Token Distribution
description: This diagram illustrates the allocation of tokens across different stakeholders and use cases.
sidebar_label: Distribution
sidebar_position: 2
keywords: ['tokenomics', 'distribution', 'allocation', 'supply']
last_update: '2025-05-06'
authors: [{ name: 'Eben Mare', title: 'Tokenomics Team' }]
custom_related_docs: ['tokenomics-overview', 'token-vesting-schedule', 'token-economics-flowchart']
custom_status: 'published'
custom_complexity: 'intermediate'
custom_prerequisites: ['tokenomics-overview']
custom_assets: ['token-distribution-pie-chart.png']
custom_interactive: true
custom_reading_time: 5
custom_audience: ['investors', 'developers', 'governance participants']
custom_doc_type: 'reference'
---
\`\`\`

## Metadata Extraction Process

1. **Title Extraction**:
   - Extract from main `<h1>` or `<h2>` element in the component
   - Fall back to component name if no heading is found

2. **Description Extraction**:
   - Extract from first `<p>` element following the title
   - Truncate to 160 characters if necessary
   - Ensure it provides a meaningful summary

3. **Keywords Extraction**:
   - Extract from component name, headings, and prominent terms
   - Add category and subcategory terms
   - Include technical terms specific to the document

4. **Sidebar Position**:
   - Derive from current document order in `documentationStructure.ts`
   - Adjust based on logical reading order

5. **Related Documents**:
   - Extract from explicit cross-references in the component
   - Add implicit relationships based on content analysis
   - Include parent-child relationships from structure

## Custom Fields Implementation

To support our custom fields in Docusaurus, we'll need to:

1. **Update the Document Type**:
   \`\`\`js
   // @docusaurus/plugin-content-docs/src/types.ts
   export type DocFrontMatter = {
     // ... default fields
     custom_status?: 'draft' | 'review' | 'published';
     custom_complexity?: 'beginner' | 'intermediate' | 'advanced';
     custom_prerequisites?: string[];
     custom_assets?: string[];
     custom_interactive?: boolean;
     custom_reading_time?: number;
     custom_audience?: string[];
     custom_doc_type?: 'concept' | 'guide' | 'reference' | 'tutorial';
     custom_related_docs?: string[];
   };
   \`\`\`

2. **Create Custom Components**:
   - Develop components to display custom metadata
   - Integrate with Docusaurus theme

3. **Implement Swizzled Theme Components**:
   - Customize DocItem to display additional metadata
   - Add metadata visualization to document headers

## Metadata Migration Script

We'll develop a script to automate the extraction and transformation of metadata:

\`\`\`js
// Example pseudocode for metadata extraction
function extractMetadata(componentPath) {
  const content = fs.readFileSync(componentPath, 'utf8');
  
  // Extract title
  const titleMatch = content.match(/<h[12][^>]*>(.*?)<\/h[12]>/);
  const title = titleMatch ? titleMatch[1] : path.basename(componentPath, '.tsx');
  
  // Extract description
  const descMatch = content.match(/<p[^>]*>(.*?)<\/p>/);
  const description = descMatch ? descMatch[1].substring(0, 160) : '';
  
  // Extract other metadata...
  
  return {
    title,
    description,
    // Other metadata fields
  };
}
\`\`\`

## Next Steps

1. **Validate Mapping Schema**:
   - Test extraction on sample components
   - Verify accuracy of transformations
   - Adjust rules as needed

2. **Develop Extraction Tools**:
   - Create scripts for automated extraction
   - Implement validation for extracted metadata
   - Build integration with migration workflow

3. **Document Custom Fields**:
   - Create documentation for custom frontmatter fields
   - Provide usage examples for content authors
   - Develop style guide for metadata consistency

4. **Implement Theme Customizations**:
   - Develop components for displaying custom metadata
   - Integrate with Docusaurus theme
   - Test rendering of all metadata fields
