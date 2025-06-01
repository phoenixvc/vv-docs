import SectionLevelOne from "@site/src/components/section-templates/section-level-one";
import { SectionLevelTwo } from "@site/src/components/section-templates/section-level-two";
import { SectionLevelThree } from "@site/src/components/section-templates/section-level-three";

# Visual Hierarchy Requirements

## Introduction

This document outlines the visual hierarchy requirements for the VeritasVault.ai documentation. A well-defined visual hierarchy helps users understand the structure of content, improves navigation, and enhances overall readability. These requirements ensure consistency across all documentation sections while providing clear visual cues about content organization and importance.

## Table of Contents

1. [Visual Hierarchy Principles](#visual-hierarchy-principles)
2. [Section Level Indicators](#section-level-indicators)
3. [Typography Hierarchy](#typography-hierarchy)
4. [Color System](#color-system)
5. [Spacing and Layout](#spacing-and-layout)
6. [Visual Components](#visual-components)
7. [Implementation Guidelines](#implementation-guidelines)
8. [Accessibility Considerations](#accessibility-considerations)

## Visual Hierarchy Principles

Our documentation follows these core principles for visual hierarchy:

1. **Clarity**: Visual elements clearly communicate the structure and relationships between content sections.
2. **Consistency**: Visual patterns are applied consistently throughout the documentation.
3. **Progressive Disclosure**: Complex information is organized in layers, with the ability to expand and collapse sections.
4. **Focus**: Visual emphasis guides users to the most important information first.
5. **Accessibility**: Visual hierarchy supports all users, including those with visual impairments.

## Section Level Indicators

### Level 1 (Main Sections)

Main sections (e.g., "5. Tokenomics") use these visual indicators:

- **Numbering**: Primary number (e.g., "5.")
- **Badge**: Prominent badge with primary color border
- **Typography**: Largest heading size (text-4xl)
- **Font Weight**: Bold (font-bold)
- **Color**: Primary color for heading text
- **Border**: Left border (4px) in primary color
- **Spacing**: Largest top and bottom margins (mb-10)

### Level 2 (Subsections)

Subsections (e.g., "5.2 Token Model") use these visual indicators:

- **Numbering**: Two-level number (e.g., "5.2")
- **Badge**: Medium-sized badge with secondary color border
- **Typography**: Medium heading size (text-2xl)
- **Font Weight**: Bold (font-bold)
- **Border**: Left border (2px) in secondary color
- **Spacing**: Medium top and bottom margins (mb-8)

### Level 3 (Detailed Components)

Detailed components (e.g., "5.2.1 Token Distribution") use these visual indicators:

- **Numbering**: Three-level number (e.g., "5.2.1")
- **Badge**: Small badge with muted border
- **Typography**: Smaller heading size (text-xl)
- **Font Weight**: Semi-bold (font-semibold)
- **Border**: Thin left border (1px) in muted color
- **Spacing**: Smaller top and bottom margins (mb-6)
- **Indentation**: Left margin (ml-4) to indicate nesting

## Typography Hierarchy

| Element | Font Size | Weight | Line Height | Color |
|---------|-----------|--------|------------|-------|
| Level 1 Heading | text-4xl (36px) | font-bold (700) | 1.1 | text-primary |
| Level 2 Heading | text-2xl (24px) | font-bold (700) | 1.2 | text-foreground |
| Level 3 Heading | text-xl (20px) | font-semibold (600) | 1.3 | text-foreground |
| Section Description | text-xl/text-lg/text-base | font-normal (400) | 1.5 | text-muted-foreground |
| Body Text | text-base (16px) | font-normal (400) | 1.6 | text-foreground |
| Caption/Note | text-sm (14px) | font-normal (400) | 1.5 | text-muted-foreground |

## Color System

The visual hierarchy uses a consistent color system to indicate section levels and importance:

### Primary Elements (Level 1)
- **Border**: `border-primary` (hsl(var(--primary)))
- **Background**: `bg-primary/10` (10% opacity primary color)
- **Text**: `text-primary` for headings, links, and active elements

### Secondary Elements (Level 2)
- **Border**: `border-secondary` (hsl(var(--secondary)))
- **Background**: `bg-secondary/10` (10% opacity secondary color)
- **Text**: `text-foreground` with `font-bold` for emphasis

### Tertiary Elements (Level 3)
- **Border**: `border-muted-foreground/30` (30% opacity muted foreground)
- **Background**: `bg-muted/20` (20% opacity muted color)
- **Text**: `text-foreground` with `font-semibold` for mild emphasis

### Active/Selected States
- **Background**: `bg-primary/10` (10% opacity primary color)
- **Border**: `border-primary` (primary color)
- **Text**: `text-primary` (primary color)

## Spacing and Layout

Consistent spacing reinforces the visual hierarchy:

### Vertical Spacing
- **Between Level 1 sections**: 2.5rem (40px)
- **Between Level 2 sections**: 2rem (32px)
- **Between Level 3 sections**: 1.5rem (24px)
- **Between paragraphs**: 1rem (16px)
- **Between heading and content**: 0.75rem (12px)

### Horizontal Spacing
- **Level 1 content**: No indentation
- **Level 2 content**: No indentation, but contained within card
- **Level 3 content**: 1rem (16px) indentation
- **Level 4+ content**: Additional 1rem indentation per level

### Container Styling
- **Level 1 sections**: Full-width card with prominent left border
- **Level 2 sections**: Full-width card with medium left border
- **Level 3 sections**: Full-width card with subtle left border
- **Content blocks**: Subtle background differentiation for different content types

## Visual Components

### Section Badges
- **Level 1**: Larger badge with primary border
- **Level 2**: Medium badge with secondary border
- **Level 3**: Small badge with muted border

### Cards and Containers
- **Primary cards**: `border-l-4 border-l-primary`
- **Secondary cards**: `border-l-2 border-l-secondary`
- **Tertiary cards**: `border-l border-l-muted-foreground/30`

### Navigation Indicators
- **Active item**: Left border highlight, background tint, text in primary color
- **Parent of active item**: Subtle highlight, semi-bold text
- **Expanded section**: Different chevron icon (down vs. right)

### Content Type Indicators
- **Text content**: Default styling
- **Code blocks**: Syntax highlighting, monospace font, subtle background
- **Diagrams/Images**: Subtle border, optional caption in muted text
- **Tables**: Alternating row colors, header styling
- **Interactive elements**: Distinct border and background

## Implementation Guidelines

### Component Usage

Use the appropriate section template components based on content level:

\`\`\`tsx
// Level 1 (Main Section)
<SectionLevelOne>
  id="tokenomics"
  title="Tokenomics"
  description="VVAI Token Economics and Governance"
  sectionNumber="5"
>
  {/* Content */}
</SectionLevelOne>

// Level 2 (Subsection)
<SectionLevelTwo>
  id="token-model"
  title="Token Model"
  description="Dual-token system design and distribution"
  sectionNumber="5.2"
>
  {/* Content */}
</SectionLevelTwo>

// Level 3 (Detailed Component)
<SectionLevelThree>
  id="token-distribution"
  title="Token Distribution"
  description="Allocation of tokens across stakeholders"
  sectionNumber="5.2.1"
>
  {/* Content */}
</SectionLevelThree>
\`\`\`

### CSS Classes

Apply these CSS utility classes consistently:

- **Section containers**: `scroll-mt-20` (for anchor link scrolling)
- **Active navigation items**: `bg-primary/10 text-primary font-medium`
- **Parent of active items**: `bg-primary/5 text-primary/80`
- **Nested content**: Appropriate `ml-4`, `ml-8`, etc. based on nesting level

### Maintaining Visual Consistency

1. Always use the provided section template components
2. Don't override the default styling without a compelling reason
3. Maintain consistent spacing between sections
4. Use the appropriate heading level for the content's hierarchy
5. Follow the color system for all custom components

## Accessibility Considerations

The visual hierarchy is designed with accessibility in mind:

1. **Color is not the only differentiator**: Shape, size, and typography also indicate hierarchy
2. **Sufficient contrast**: All text meets WCAG AA standards (minimum 4.5:1 for normal text)
3. **Semantic HTML**: Proper heading levels (`h1`, `h2`, `h3`) match the visual hierarchy
4. **Focus indicators**: Visible focus states for keyboard navigation
5. **Screen reader support**: Proper ARIA attributes and landmark regions

### Color Contrast Requirements

| Element | Minimum Contrast Ratio |
|---------|------------------------|
| Normal text | 4.5:1 |
| Large text (18pt+) | 3:1 |
| UI components and graphical objects | 3:1 |

## Conclusion

Following these visual hierarchy requirements ensures a consistent, accessible, and intuitive documentation experience. The system is designed to scale with the documentation's complexity while maintaining clarity and usability.

For implementation questions or special cases, consult the documentation team or refer to the component library documentation.
