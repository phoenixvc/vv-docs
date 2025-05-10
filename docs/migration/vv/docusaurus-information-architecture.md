# Docusaurus Information Architecture

This document outlines the proposed information architecture for migrating the whitepaper content to Docusaurus, including content categorization, navigation structure, and URL mapping.

## 1. Content Categories

Based on the analysis of the existing documentation structure, we've organized content into the following logical categories:

### 1.1 Primary Categories

| Category | Description | Content Types |
|----------|-------------|---------------|
| **Getting Started** | Entry point for new users | Overview, Key Benefits, Executive Summary |
| **Architecture** | System design and architecture | Architecture Overview, Layered Architecture, Diagrams, Comparisons |
| **Finance Models** | Financial modeling components | Portfolio Optimization, Yield Strategies, AI Models |
| **Technical Infrastructure** | Technical implementation details | Components, Data Processing, API Infrastructure |
| **Tokenomics** | Token economics and utility | Token Model, Distribution, Utility, Economics, Governance |
| **Security** | Security architecture and protocols | Security Architecture, Security Model, Audit Framework |
| **Integrations** | Third-party integrations | Data Providers, Wallet Integrations, Blockchain Integrations |
| **Governance** | Governance framework and processes | Governance Structure, Voting Mechanism, Communication System |
| **Gaming** | Gaming technologies and integration | Gaming Overview, Integration, Technologies |
| **Roadmap** | Implementation timeline | Phase 1, Phase 2, Phase 3 |
| **Contributing** | Documentation for contributors | Style Guide, Templates, Review Process |

### 1.2 Secondary Categories

| Category | Description | Parent Category |
|----------|-------------|----------------|
| **Portfolio Optimization** | Portfolio optimization techniques | Finance Models |
| **Token Model** | Token distribution and vesting | Tokenomics |
| **Token Utility** | Token use cases and utility | Tokenomics |
| **Token Economics** | Economic models and mechanisms | Tokenomics |
| **Security Model** | Threat modeling and security protocols | Security |
| **Data Providers** | Data provider integrations | Integrations |

## 2. Navigation Structure

### 2.1 Main Sidebar Structure

\`\`\`javascript
// docusaurus.config.js sidebar structure
{
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['introduction', 'key-benefits', 'executive-summary', 'protocol-overview'],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/layered-architecture',
        'architecture/diagrams',
        'architecture/comparison',
      ],
    },
    {
      type: 'category',
      label: 'Finance Models',
      items: [
        'finance/overview',
        {
          type: 'category',
          label: 'Portfolio Optimization',
          items: [
            'finance/portfolio/monte-carlo',
            'finance/portfolio/factor-models',
            'finance/portfolio/black-litterman',
          ],
        },
        {
          type: 'category',
          label: 'Yield Strategies',
          items: ['finance/yield/defi-optimization'],
        },
        {
          type: 'category',
          label: 'AI Models',
          items: ['finance/ai/neural-networks'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Technical Infrastructure',
      items: [
        'technical/components',
        'technical/data-processing',
        'technical/api-infrastructure',
      ],
    },
    {
      type: 'category',
      label: 'Tokenomics',
      items: [
        'tokenomics/overview',
        {
          type: 'category',
          label: 'Token Model',
          items: [
            'tokenomics/model/distribution',
            'tokenomics/model/vesting',
          ],
        },
        {
          type: 'category',
          label: 'Token Utility',
          items: ['tokenomics/utility/diagram'],
        },
        {
          type: 'category',
          label: 'Token Economics',
          items: [
            'tokenomics/economics/flow',
            'tokenomics/economics/burn',
          ],
        },
        'tokenomics/governance',
        'tokenomics/staking',
        'tokenomics/comparison',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/architecture',
        {
          type: 'category',
          label: 'Security Model',
          items: [
            'security/model/threat-modeling',
            'security/model/protocols',
          ],
        },
        'security/audit-framework',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/benefits',
        'integrations/comparison',
        {
          type: 'category',
          label: 'Data Providers',
          items: [
            'integrations/data/coingecko',
            'integrations/data/defillama',
          ],
        },
        'integrations/wallets',
        'integrations/blockchain',
        'integrations/risk-management',
      ],
    },
    {
      type: 'category',
      label: 'Governance Framework',
      items: [
        'governance/structure',
        'governance/voting',
        'governance/communication',
      ],
    },
    {
      type: 'category',
      label: 'Gaming Technologies',
      items: [
        'gaming/overview',
        'gaming/integration',
        'gaming/technologies',
      ],
    },
    {
      type: 'category',
      label: 'Implementation Roadmap',
      items: [
        'roadmap/phase-1',
        'roadmap/phase-2',
        'roadmap/phase-3',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contributing/style-guide',
        'contributing/templates',
        'contributing/review-process',
        'contributing/section-numbering',
        'contributing/visual-hierarchy',
      ],
    },
  ],
}
\`\`\`

### 2.2 Navigation Principles

1. **Progressive Disclosure**: Organize content from general to specific
2. **Logical Grouping**: Group related content together
3. **Consistent Depth**: Maintain 3-4 levels of nesting maximum
4. **Clear Labeling**: Use descriptive, concise labels
5. **Hub Pages**: Create overview pages for each major section

## 3. URL Structure

### 3.1 URL Pattern

The URL pattern for Docusaurus will follow this structure:

\`\`\`
/docs/[category]/[subcategory]/[document]
\`\`\`

Examples:
- `/docs/architecture/overview`
- `/docs/finance/portfolio/monte-carlo`
- `/docs/tokenomics/model/distribution`

### 3.2 URL Mapping

| Current Path | New Docusaurus Path |
|--------------|---------------------|
| `/project-overview-section` | `/docs/introduction` |
| `/key-benefits-section` | `/docs/key-benefits` |
| `/architecture/architecture-section` | `/docs/architecture/overview` |
| `/architecture/layered-architecture` | `/docs/architecture/layered-architecture` |
| `/architecture/architecture-diagrams` | `/docs/architecture/diagrams` |
| `/architecture/architecture-comparison` | `/docs/architecture/comparison` |
| `/finance/finance-models-overview` | `/docs/finance/overview` |
| `/finance/monte-carlo-simulation` | `/docs/finance/portfolio/monte-carlo` |
| `/finance/factor-models` | `/docs/finance/portfolio/factor-models` |
| `/finance/black-litterman-model` | `/docs/finance/portfolio/black-litterman` |
| `/finance/defi-yield-optimization` | `/docs/finance/yield/defi-optimization` |
| `/finance/neural-networks` | `/docs/finance/ai/neural-networks` |
| `/technical/technical-components` | `/docs/technical/components` |
| `/tokenomics/tokenomics-overview` | `/docs/tokenomics/overview` |
| `/tokenomics/token-distribution-chart` | `/docs/tokenomics/model/distribution` |
| `/tokenomics/token-vesting-schedule` | `/docs/tokenomics/model/vesting` |
| `/tokenomics/token-utility-diagram` | `/docs/tokenomics/utility/diagram` |
| `/tokenomics/token-economics-flowchart` | `/docs/tokenomics/economics/flow` |
| `/tokenomics/token-burn-mechanism` | `/docs/tokenomics/economics/burn` |
| `/tokenomics/token-governance-details` | `/docs/tokenomics/governance` |
| `/tokenomics/token-staking-calculator` | `/docs/tokenomics/staking` |
| `/tokenomics/token-comparison-table` | `/docs/tokenomics/comparison` |
| `/security/security-architecture-overview` | `/docs/security/architecture` |
| `/security/security-architecture-diagram` | `/docs/security/architecture` |
| `/integrations/integration-comparison` | `/docs/integrations/comparison` |
| `/integrations/data-providers` | `/docs/integrations/data` |
| `/integrations/data-providers/coingecko` | `/docs/integrations/data/coingecko` |
| `/integrations/data-providers/defillama` | `/docs/integrations/data/defillama` |
| `/integrations/wallet-integrations` | `/docs/integrations/wallets` |
| `/integrations/blockchain-integrations` | `/docs/integrations/blockchain` |
| `/integrations/risk-management` | `/docs/integrations/risk-management` |
| `/gaming/gaming-technologies` | `/docs/gaming/technologies` |
| `/gaming/market-share-chart` | `/docs/gaming/technologies` |
| `/gaming/competitor-radar-chart` | `/docs/gaming/technologies` |
| `/governance-framework` | `/docs/governance/structure` |
| `/implementation-roadmap` | `/docs/roadmap/phase-1` |

### 3.3 Redirect Configuration

\`\`\`javascript
// docusaurus.config.js redirects
{
  redirects: [
    {
      from: '/project-overview-section',
      to: '/docs/introduction',
    },
    {
      from: '/key-benefits-section',
      to: '/docs/key-benefits',
    },
    {
      from: '/architecture/architecture-section',
      to: '/docs/architecture/overview',
    },
    // ... additional redirects as per the mapping table
  ],
}
\`\`\`

## 4. Document Structure

### 4.1 Standard Document Template

Each document should follow this standard structure:

\`\`\`md
---
id: [document-id]
title: [Document Title]
sidebar_label: [Sidebar Label]
description: [Brief description for SEO]
keywords: [keyword1, keyword2, keyword3]
---

# [Document Title]

Brief introduction to the document content.

## Section 1

Content for section 1.

## Section 2

Content for section 2.

## Related Documents

- [Related Document 1](/docs/path/to/related-doc-1)
- [Related Document 2](/docs/path/to/related-doc-2)
\`\`\`

### 4.2 Hub Page Template

Hub pages (category overview pages) should follow this structure:

\`\`\`md
---
id: [category-id]
title: [Category Title] Overview
sidebar_label: Overview
description: [Brief description of the category]
---

# [Category Title] Overview

Brief introduction to this category.

## What's in this section

<DocCardList>
  <DocCard
    title="Document 1"
    description="Brief description of Document 1"
    to="/docs/path/to/document-1"
  />
  <DocCard
    title="Document 2"
    description="Brief description of Document 2"
    to="/docs/path/to/document-2"
  />
  <!-- Additional DocCards as needed -->
</DocCardList>

## Key Concepts

Brief explanation of key concepts in this category.

## Getting Started

Guidance on where to begin in this category.
\`\`\`

## 5. Cross-Reference Strategy

### 5.1 Internal Links

Use Docusaurus's built-in linking syntax for cross-references:

\`\`\`md
[Link to another document](../category/document-id.md)
\`\`\`

### 5.2 Related Content

For each document, maintain the "Related Documents" section to preserve the cross-reference relationships identified in the documentation structure analysis.

### 5.3 Next/Previous Navigation

Configure the next/previous navigation to follow the logical reading order:

\`\`\`javascript
// docusaurus.config.js
{
  docs: {
    // ...
    nextPrevious: true,
  },
}
\`\`\`

## 6. Component Migration

### 6.1 MDX Components

Create MDX versions of the most commonly reused components:

1. **Card Components**
   - Create MDX versions of Card, CardContent, CardHeader, CardTitle

2. **Navigation Components**
   - Leverage Docusaurus's built-in TOC and navigation

3. **Interactive Components**
   - Convert Tabs/TabsContent to Docusaurus Tabs
   - Create React components for calculators and charts

### 6.2 Component Library Structure

\`\`\`
/src
  /components
    /ui
      Card.js
      Tabs.js
      Chart.js
    /diagrams
      ArchitectureDiagram.js
      TokenomicsDiagram.js
    /interactive
      StakingCalculator.js
      YieldComparison.js
    /layout
      SectionHeader.js
      RelatedContent.js
\`\`\`

## 7. Implementation Plan

### 7.1 Phase 1: Core Structure

1. Set up Docusaurus project
2. Implement sidebar structure
3. Create hub pages for each category
4. Set up redirects

### 7.2 Phase 2: Content Migration

1. Migrate high-priority content first
2. Convert React components to MDX
3. Implement cross-references
4. Migrate visual elements

### 7.3 Phase 3: Enhancement

1. Implement search functionality
2. Add versioning if needed
3. Optimize for SEO
4. Add analytics

## 8. Additional Considerations

### 8.1 Versioning Strategy

If your documentation requires versioning:

\`\`\`javascript
// docusaurus.config.js
{
  docs: {
    // ...
    versions: {
      current: {
        label: 'Current',
        path: '',
      },
      '1.0.0': {
        label: '1.0.0',
        path: '1.0.0',
      },
    },
  },
}
\`\`\`

### 8.2 Multi-Language Support

If internationalization is required:

\`\`\`javascript
// docusaurus.config.js
{
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
  },
}
\`\`\`

### 8.3 Search Implementation

Implement Algolia DocSearch for optimal search functionality:

\`\`\`javascript
// docusaurus.config.js
{
  themeConfig: {
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
      contextualSearch: true,
    },
  },
}
\`\`\`

### 8.4 Analytics Integration

Add Google Analytics or other analytics:

\`\`\`javascript
// docusaurus.config.js
{
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-XXXXXXXXX-X',
    },
  },
}
\`\`\`

## 9. Migration Checklist

- [ ] Set up Docusaurus project
- [ ] Configure sidebar navigation
- [ ] Create hub pages for each category
- [ ] Set up URL redirects
- [ ] Migrate high-priority content
- [ ] Convert React components to MDX
- [ ] Implement cross-references
- [ ] Migrate visual elements
- [ ] Set up search functionality
- [ ] Configure analytics
- [ ] Test all links and navigation
- [ ] Validate cross-references
- [ ] Test interactive components
- [ ] Optimize for SEO
- [ ] Perform final review
