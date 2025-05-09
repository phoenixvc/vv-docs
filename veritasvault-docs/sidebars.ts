import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quickstart',
        'getting-started/installation',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/components',
        'architecture/security-model',
      ],
    },
    {
      type: 'category',
      label: 'Chain Services',
      items: [
        'chain-services/overview',
        'chain-services/event-processing',
        'chain-services/integrations',
      ],
    },
    {
      type: 'category',
      label: 'Infrastructure',
      items: [
        'infrastructure/overview',
        'infrastructure/deployment',
        'infrastructure/monitoring',
      ],
    },
    {
      type: 'category',
      label: 'Gamification',
      items: [
        'gamification/overview',
        'gamification/mechanisms',
      ],
    },
    {
      type: 'category',
      label: 'Frontend',
      items: [
        'frontend/overview',
        'frontend/components',
        'frontend/theming',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        'integration/overview',
        'integration/api-usage',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/overview',
        'api-reference/endpoints',
        'api-reference/models',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: [
        'operations/deployment',
        'operations/monitoring',
        'operations/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'tutorials/first-steps',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contributing/guidelines',
        'contributing/documentation',
        'contributing/code',
      ],
    },
  ],
};

export default sidebars;
