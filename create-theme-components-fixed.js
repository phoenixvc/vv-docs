const fs = require('fs');
const path = require('path');

// Ensure we're working with absolute paths from the project root
const projectRoot = path.resolve(__dirname);
const docusaurusRoot = path.join(projectRoot, 'veritasvault-docs');

// Create directory for theme components if it doesn't exist
const themeDir = path.join(docusaurusRoot, 'src/theme');
console.log(`Using theme directory: ${themeDir}`);

if (!fs.existsSync(themeDir)) {
  console.log(`Creating theme directory: ${themeDir}`);
  fs.mkdirSync(themeDir, { recursive: true });
}

// List of essential theme components to create
const componentsToCreate = [
  {
    name: 'Root',
    content: `import React from 'react';
import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

// Root component wrapping the entire Docusaurus application
export default function Root({ children }: RootProps): JSX.Element {
  return <>{children}</>;
}
`
  },
  {
    name: 'SiteMetadata',
    content: `import React from 'react';
import { PageMetadata } from '@docusaurus/theme-common';

export default function SiteMetadata(): JSX.Element {
  return (
    <PageMetadata
      title="VeritasVault Documentation"
      description="Comprehensive documentation for the VeritasVault platform"
    />
  );
}
`
  },
  {
    name: 'Loading',
    content: `import React from 'react';
import clsx from 'clsx';

export default function Loading({ className }) {
  return (
    <div className={clsx('loading', className)}>
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
`
  },
  {
    name: 'NotFound',
    content: `import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';

export default function NotFound(): JSX.Element {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">
                <Translate
                  id="theme.NotFound.title"
                  description="The title of the 404 page">
                  Page Not Found
                </Translate>
              </h1>
              <p>
                <Translate
                  id="theme.NotFound.p1"
                  description="The first paragraph of the 404 page">
                  We could not find what you were looking for.
                </Translate>
              </p>
              <p>
                <Translate
                  id="theme.NotFound.p2"
                  description="The 2nd paragraph of the 404 page">
                  Please contact the owner of the site that linked you to the
                  original URL and let them know their link is broken.
                </Translate>
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
`
  },
  {
    name: 'Error',
    content: `import React from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';

export default function ErrorPage({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}): JSX.Element {
  return (
    <>
      <PageMetadata title={\`Error \${statusCode}\`} />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1>Error {statusCode}</h1>
              <p>{message}</p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
`
  },
  {
    name: 'MDXComponents',
    content: `import React from 'react';
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';

const MDXComponents = {
  a: (props) => <Link {...props} />,
  Tabs,
  TabItem,
  CodeBlock,
  Admonition,
};

export default MDXComponents;
`
  }
];

// Create each component
componentsToCreate.forEach(component => {
  const componentDir = path.join(themeDir, component.name);
  const componentFile = path.join(componentDir, 'index.tsx');
  
  try {
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }
    
    fs.writeFileSync(componentFile, component.content);
    console.log(`✓ Created theme component: ${component.name}`);
  } catch (error) {
    console.error(`Error creating component ${component.name}:`, error.message);
  }
});

console.log('Creating necessary component directories...');

// Create directories for UI components if they don't exist
const uiDir = path.join(docusaurusRoot, 'src/components/ui');
if (!fs.existsSync(uiDir)) {
  fs.mkdirSync(uiDir, { recursive: true });
  console.log(`✓ Created UI components directory: ${uiDir}`);
}

// Create directories for docs components if they don't exist
const docsDir = path.join(docusaurusRoot, 'src/components/docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
  console.log(`✓ Created docs components directory: ${docsDir}`);
}

console.log('Component creation complete! Please check that all necessary components have been created.');
console.log('Now create any additional UI components needed based on your project imports.');