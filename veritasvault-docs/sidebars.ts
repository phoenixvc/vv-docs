import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'getting-started/installation', 'getting-started/configuration', 'getting-started/quickstart'],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture/overview', 'architecture/components', 'architecture/security-model'],
    },
    {
      type: 'category',
      label: 'Chain Services',
      items: ['chain-services/overview', 'chain-services/event-processing', 'chain-services/integrations'],
    },
    {
      type: 'category',
      label: 'Frontend',
      items: ['frontend/overview', 'frontend/components', 'frontend/theming'],
    },
    {
      type: 'category',
      label: 'Infrastructure',
      items: ['infrastructure/overview', 'infrastructure/deployment', 'infrastructure/monitoring'],
    },
    {
      type: 'category',
      label: 'Whitepaper',
      items: [
        'whitepaper/overview',
        {
          type: 'category',
          label: 'Tokenomics',
          items: ['tokenomics/overview', 'tokenomics/token-distribution', 'tokenomics/utility'],
        },
        {
          type: 'category',
          label: 'Security',
          items: ['security/overview', 'security/model', 'security/audits'],
        },
        {
          type: 'category',
          label: 'Finance Models',
          items: ['finance-models/overview', 'finance-models/algorithms'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: ['integration/overview', 'integration/api-usage'],
    },
    {
      type: 'category',
      label: 'Operations',
      items: ['operations/deployment', 'operations/monitoring', 'operations/troubleshooting'],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api-reference/overview', 'api-reference/endpoints', 'api-reference/models'],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: ['contributing/guidelines', 'contributing/code', 'contributing/documentation'],
    },
  ],
};

export default sidebars;
