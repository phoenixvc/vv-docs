# Docusaurus MDX Components

This directory contains React components designed for use with Docusaurus MDX files. These components provide enhanced functionality and consistent styling for your documentation.

## Directory Structure

\`\`\`
src/
├── components/         # Main components directory
│   ├── common/         # Shared/reusable components
│   ├── layout/         # Layout components
│   ├── docs/           # Documentation-specific components
│   │   ├── charts/     # Chart components
│   │   └── calculators/ # Calculator components
│   └── blog/           # Blog-specific components
\`\`\`

## Usage

Import components in your MDX files:

\`\`\`jsx
import { ContentBlock, LineChart, TokenStakingCalculator } from '@site/src/components';

<ContentBlock variant="info" title="Important Information">
  This is an important note about the documentation.
</ContentBlock>

<LineChart 
  data={{
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Token Price',
      data: [10, 15, 13, 20, 25],
      borderColor: '#3b82f6'
    }]
  }}
/>

<TokenStakingCalculator tokenSymbol="ETH" defaultAmount={10} />
\`\`\`

## Component Categories

### Common Components
Basic UI components that can be used throughout the documentation.

### Layout Components
Components for structuring and organizing content.

### Documentation Components
Specialized components for documentation pages, including:
- Content blocks
- Code examples
- API references
- Interactive diagrams
- Charts and data visualization
- Financial calculators

### Blog Components
Components specifically designed for blog posts.

## Customization

These components are designed to work with Docusaurus's theming system. They automatically adapt to light and dark mode based on the user's preference.

For custom styling, you can pass className props to most components.
