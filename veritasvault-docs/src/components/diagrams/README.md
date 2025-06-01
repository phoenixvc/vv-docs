# Docusaurus Diagram Components

A collection of interactive diagram components for Docusaurus documentation sites.

## Features

- **Multiple Diagram Types**: Support for flowcharts, architecture diagrams, and more
- **Interactive Elements**: Zoom, pan, click, and hover interactions
- **Dark Mode Support**: Automatic theme switching based on Docusaurus color mode
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support
- **Export Options**: Download diagrams as PNG, SVG, or PDF

## Components

### MermaidDiagram

Renders diagrams using the Mermaid.js syntax, supporting:
- Flowcharts
- Sequence diagrams
- Class diagrams
- State diagrams
- Entity-relationship diagrams
- Gantt charts
- Pie charts
- User journey diagrams

### FlowDiagram

Interactive node-based diagrams with:
- Draggable nodes
- Connectable elements
- Customizable node types
- Automatic layout options
- Mini-map navigation

### ArchitectureDiagram

Specialized for system architecture visualization:
- Layer-based organization
- Component details on hover/click
- Multiple component types (services, databases, etc.)
- Connection types with different arrow styles
- Customizable styling

## Usage

Each diagram component is designed to be used in MDX files within your Docusaurus documentation.

### Installation

\`\`\`
npm install docusaurus-diagrams
\`\`\`

### Configuration

Add the plugin to your `docusaurus.config.js`:

\`\`\`javascript
module.exports = {}
  // ... other config
  plugins: [
    // ... other plugins
    'docusaurus-diagrams',
  ],
};
\`\`\`

### Example Usage

\`\`\`jsx
import { MermaidDiagram, FlowDiagram, ArchitectureDiagram } from "docusaurus-diagrams";

// Mermaid diagram example
<MermaidDiagram>
  id="simple-flowchart"
  title="Simple Flowchart"
  definition={`}
    graph TD
      A[Start] --> B{Is it working?}
      B -->|Yes| C[Great!]
      B -->|No| D[Debug]
      D --> B
  `}
/>

// Flow diagram example
<FlowDiagram>
  id="data-flow"
  title="Data Flow"
  nodes={[}
    { id: '1', data: { label: 'Input' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Process' }, position: { x: 300, y: 100 } },
    { id: '3', data: { label: 'Output' }, position: { x: 500, y: 100 } },
  ]}
  edges={[}
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ]}
/>

// Architecture diagram example
<ArchitectureDiagram>
  id="system-architecture"
  title="System Architecture"
  layers={[}
    { id: 'frontend', label: 'Frontend', order: 1 },
    { id: 'backend', label: 'Backend', order: 2 },
    { id: 'data', label: 'Data Layer', order: 3 },
  ]}
  components={[}
    { id: 'web', type: 'client', label: 'Web App', layer: 'frontend', position: { x: 100, y: 100 } },
    { id: 'api', type: 'service', label: 'API Service', layer: 'backend', position: { x: 100, y: 250 } },
    { id: 'db', type: 'database', label: 'Database', layer: 'data', position: { x: 100, y: 400 } },
  ]}
  connections={[}
    { id: 'conn1', source: 'web', target: 'api', arrow: 'both' },
    { id: 'conn2', source: 'api', target: 'db', arrow: 'both' },
  ]}
/>
\`\`\`

## Customization

All components accept style customization props and can be themed to match your documentation site's design.

## Accessibility

These components are designed with accessibility in mind:
- Keyboard navigation support
- ARIA attributes for screen readers
- Sufficient color contrast
- Text alternatives for visual elements

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- IE11 is not supported
\`\`\`

Finally, let's move the package.json file:
