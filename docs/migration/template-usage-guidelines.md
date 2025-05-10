# Template Usage Guidelines

## Introduction

This document provides comprehensive guidelines for using the documentation templates in the VeritasVault.ai project. Following these guidelines ensures consistent structure and presentation across all documentation sections.

## Table of Contents

1. [Template Overview](#template-overview)
2. [Section Level Templates](#section-level-templates)
3. [Content Block Templates](#content-block-templates)
4. [Navigation Templates](#navigation-templates)
5. [Template Customization](#template-customization)
6. [Common Implementation Patterns](#common-implementation-patterns)
7. [Troubleshooting](#troubleshooting)

## Template Overview

The documentation system uses a hierarchical template structure:

- **Section Level Templates**: Define the overall structure of content sections
- **Content Block Templates**: Format specific types of content within sections
- **Navigation Templates**: Provide navigation aids within and between sections

All templates are React components that accept standardized props for consistency.

## Section Level Templates

### SectionLevelOne

**Purpose**: Main section container for top-level documentation sections

**Required Props**:
- `id`: Unique identifier for the section (used for navigation)
- `title`: Section title
- `sectionNumber`: Numerical identifier (e.g., "5")

**Optional Props**:
- `description`: Brief description of the section
- `icon`: Icon component to display with the title
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<SectionLevelOne
  id="tokenomics"
  title="Tokenomics"
  description="VVAI Token Economics and Governance"
  sectionNumber="5"
>
  {/* Section content */}
</SectionLevelOne>
\`\`\`

**When to Use**:
- For main documentation sections (e.g., Tokenomics, Security, Architecture)
- As the root container for a documentation page
- When creating a new major topic area

### SectionLevelTwo

**Purpose**: Container for subsections within a main section

**Required Props**:
- `id`: Unique identifier for the subsection
- `title`: Subsection title
- `sectionNumber`: Numerical identifier (e.g., "5.2")

**Optional Props**:
- `description`: Brief description of the subsection
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<SectionLevelTwo
  id="token-model"
  title="Token Model"
  description="Dual-token system design and distribution"
  sectionNumber="5.2"
>
  {/* Subsection content */}
</SectionLevelTwo>
\`\`\`

**When to Use**:
- For major subdivisions within a main section
- When grouping related concepts under a common theme
- For sections that appear in the sidebar navigation

### SectionLevelThree

**Purpose**: Container for detailed components within a subsection

**Required Props**:
- `id`: Unique identifier for the component
- `title`: Component title
- `sectionNumber`: Numerical identifier (e.g., "5.2.1")

**Optional Props**:
- `description`: Brief description of the component
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<SectionLevelThree
  id="token-distribution"
  title="Token Distribution"
  description="Allocation of tokens across stakeholders"
  sectionNumber="5.2.1"
>
  {/* Detailed content */}
</SectionLevelThree>
\`\`\`

**When to Use**:
- For detailed topics within a subsection
- When content needs further organization beyond subsections
- For complex topics that require their own heading and anchor

## Content Block Templates

### ContentBlock

**Purpose**: Container for text-based content

**Required Props**:
- `title`: Block title

**Optional Props**:
- `variant`: Visual style variant ("default", "info", "warning", "success")
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<ContentBlock
  title="Overview"
  variant="info"
>
  <p>VeritasVault.ai implements a dual-token economic model...</p>
</ContentBlock>
\`\`\`

**When to Use**:
- For explanatory text content
- When introducing a concept before detailed components
- For general information that doesn't fit other specialized blocks

### DiagramBlock

**Purpose**: Container for diagrams and visual content

**Required Props**:
- `title`: Block title
- `imageSrc`: Path to the diagram image
- `imageAlt`: Accessible description of the image

**Optional Props**:
- `description`: Additional context for the diagram
- `caption`: Figure caption text
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<DiagramBlock
  title="Token Distribution"
  description="Allocation of VVAI tokens across stakeholders"
  imageSrc="/token-distribution-pie-chart.png"
  imageAlt="VVAI Token Distribution Chart"
  caption="Figure 5.2: Distribution of VVAI tokens by stakeholder category"
/>
\`\`\`

**When to Use**:
- For displaying diagrams, charts, or other visual content
- When visual representation enhances understanding
- For complex concepts that benefit from visualization

### CodeExampleBlock

**Purpose**: Container for code examples with syntax highlighting

**Required Props**:
- `title`: Block title
- `language`: Programming language for syntax highlighting

**Optional Props**:
- `description`: Context for the code example
- `fileName`: Name of the file containing the code
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<CodeExampleBlock
  title="Smart Contract Example"
  description="Implementation of token vesting logic"
  language="solidity"
  fileName="VestingContract.sol"
>
  {`
  contract TokenVesting {
    // Contract code here
  }
  `}
</CodeExampleBlock>
\`\`\`

**When to Use**:
- For displaying code examples
- When implementation details are relevant
- For technical documentation sections

### TableBlock

**Purpose**: Container for tabular data

**Required Props**:
- `title`: Block title
- `columns`: Array of column definitions
- `data`: Array of data objects

**Optional Props**:
- `description`: Context for the table
- `caption`: Table caption text
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<TableBlock
  title="Token Allocation Details"
  description="Detailed breakdown of token allocations"
  columns={[
    { header: "Stakeholder", accessorKey: "stakeholder" },
    { header: "Allocation (%)", accessorKey: "percentage" },
    { header: "Vesting Period", accessorKey: "vesting" }
  ]}
  data={[
    { stakeholder: "Community", percentage: "40%", vesting: "4 years" },
    { stakeholder: "Team", percentage: "15%", vesting: "3 years" },
    // More data...
  ]}
/>
\`\`\`

**When to Use**:
- For presenting structured data
- When comparing multiple items across common attributes
- For detailed specifications or parameters

### InteractiveBlock

**Purpose**: Container for interactive components

**Required Props**:
- `title`: Block title

**Optional Props**:
- `description`: Context for the interactive component
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<InteractiveBlock
  title="Token Staking Calculator"
  description="Calculate potential returns from staking VVAI tokens"
>
  <TokenStakingCalculator />
</InteractiveBlock>
\`\`\`

**When to Use**:
- For embedding interactive components
- When user input enhances understanding
- For demonstrations or simulations

### CalloutBlock

**Purpose**: Highlighted content for important information

**Required Props**:
- `title`: Block title
- `type`: Callout type ("info", "warning", "note", "important")

**Optional Props**:
- `icon`: Custom icon component
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<CalloutBlock
  title="Security Notice"
  type="warning"
>
  <p>Always verify smart contract addresses before interacting with them.</p>
</CalloutBlock>
\`\`\`

**When to Use**:
- For highlighting important information
- When warning users about potential issues
- For tips or best practices

## Navigation Templates

### SectionNavigation

**Purpose**: Provides navigation between related sections

**Required Props**:
- `prevSection`: Object with previous section details
- `nextSection`: Object with next section details

**Optional Props**:
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<SectionNavigation
  prevSection={{
    title: "Token Model",
    href: "/tokenomics#token-model"
  }}
  nextSection={{
    title: "Governance",
    href: "/tokenomics#governance"
  }}
/>
\`\`\`

**When to Use**:
- At the end of each section
- When linear navigation between sections is helpful
- For guiding users through a sequence of content

### SectionToc

**Purpose**: Provides table of contents for the current section

**Required Props**:
- `items`: Array of TOC items with titles and IDs

**Optional Props**:
- `title`: TOC title
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<SectionToc
  title="In This Section"
  items={[
    { title: "Token Model", id: "token-model" },
    { title: "Token Distribution", id: "token-distribution" },
    { title: "Governance", id: "governance" }
  ]}
/>
\`\`\`

**When to Use**:
- At the beginning of complex sections
- When a section has multiple subsections
- For helping users navigate within a long page

### SectionProgress

**Purpose**: Indicates reading progress within a section

**Required Props**:
- `sectionId`: ID of the section to track

**Optional Props**:
- `showPercentage`: Whether to display percentage (default: true)
- `className`: Additional CSS classes

**Example Usage**:

\`\`\`jsx
<SectionProgress
  sectionId="tokenomics"
  showPercentage={true}
/>
\`\`\`

**When to Use**:
- For long sections with substantial content
- When providing reading progress feedback is helpful
- At the top of main section pages

## Template Customization

### CSS Customization

All templates accept a `className` prop for additional styling:

\`\`\`jsx
<SectionLevelOne
  id="tokenomics"
  title="Tokenomics"
  className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
>
  {/* Content */}
</SectionLevelOne>
\`\`\`

### Component Composition

Templates can be nested to create complex layouts:

\`\`\`jsx
<SectionLevelOne id="tokenomics" title="Tokenomics" sectionNumber="5">
  <SectionToc items={tocItems} />
  
  <ContentBlock title="Overview">
    {/* Overview content */}
  </ContentBlock>
  
  <SectionLevelTwo id="token-model" title="Token Model" sectionNumber="5.2">
    <DiagramBlock
      title="Token Distribution"
      imageSrc="/token-distribution-pie-chart.png"
      imageAlt="Token distribution chart"
    />
    
    <TableBlock
      title="Allocation Details"
      columns={columns}
      data={allocationData}
    />
  </SectionLevelTwo>
  
  <SectionNavigation
    prevSection={prevSection}
    nextSection={nextSection}
  />
</SectionLevelOne>
\`\`\`

## Common Implementation Patterns

### Standard Section Structure

\`\`\`jsx
<SectionLevelOne id="section-id" title="Section Title" sectionNumber="X">
  {/* Brief introduction */}
  <ContentBlock title="Overview">
    <p>Introduction text...</p>
  </ContentBlock>
  
  {/* Table of contents for the section */}
  <SectionToc items={tocItems} />
  
  {/* First subsection */}
  <SectionLevelTwo id="subsection-1" title="Subsection 1" sectionNumber="X.1">
    {/* Subsection content */}
  </SectionLevelTwo>
  
  {/* Second subsection */}
  <SectionLevelTwo id="subsection-2" title="Subsection 2" sectionNumber="X.2">
    {/* Subsection content */}
  </SectionLevelTwo>
  
  {/* Navigation between sections */}
  <SectionNavigation
    prevSection={prevSection}
    nextSection={nextSection}
  />
</SectionLevelOne>
\`\`\`

### Technical Documentation Pattern

\`\`\`jsx
<SectionLevelTwo id="technical-component" title="Technical Component" sectionNumber="X.Y">
  {/* Conceptual overview */}
  <ContentBlock title="Concept">
    <p>Explanation of the concept...</p>
  </ContentBlock>
  
  {/* Visual representation */}
  <DiagramBlock
    title="Component Architecture"
    imageSrc="/path/to/diagram.png"
    imageAlt="Architecture diagram"
  />
  
  {/* Implementation details */}
  <CodeExampleBlock
    title="Implementation"
    language="typescript"
    fileName="component.ts"
  >
    {`// Code example`}
  </CodeExampleBlock>
  
  {/* Configuration options */}
  <TableBlock
    title="Configuration Options"
    columns={configColumns}
    data={configOptions}
  />
  
  {/* Important notes */}
  <CalloutBlock title="Important Considerations" type="important">
    <p>Critical information...</p>
  </CalloutBlock>
</SectionLevelTwo>
\`\`\`

## Troubleshooting

### Common Issues

#### Issue: Section not appearing in navigation
**Solution**: Ensure the section has a unique `id` prop and is properly registered in the sidebar navigation configuration.

#### Issue: Inconsistent visual hierarchy
**Solution**: Verify that you're using the correct template level (SectionLevelOne, SectionLevelTwo, SectionLevelThree) for the content's position in the hierarchy.

#### Issue: Content blocks not rendering properly
**Solution**: Check that all required props are provided and that child content is properly formatted.

#### Issue: Navigation links not working
**Solution**: Verify that section IDs match the href values in navigation components and that the IDs exist in the document.

### Getting Help

If you encounter issues not covered in this guide, please:

1. Check the component documentation in the codebase
2. Review existing implementations for similar patterns
3. Contact the documentation team for assistance

---

These guidelines are maintained by the VeritasVault.ai documentation team and will be updated as the template system evolves.
