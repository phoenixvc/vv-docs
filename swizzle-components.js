const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// List of components that need to be created
const componentsToCreate = [
  'Root',
  'Layout',
  'MDXComponents',
  'NotFound',
  'CodeBlock',
  'Heading',
  'Admonition',
  'BlogPostItem',
  'BlogPostPage',
  'BlogListPage',
  'BlogSidebar',
  'BlogTagsListPage',
  'DocItem',
  'DocSidebar',
  'DocPage',
  'DocVersionBanner',
  'MDXPage',
  'Error',
  'Loading',
  'TOC',
  'TOCInline',
  'SiteMetadata'
];

// Path to components in Blog/Pages subfolders
const nestedComponents = [
  'Blog/BlogAuthorsListPage',
  'Blog/BlogAuthorsPostsPage'
];

// Special function to create a component file
function createComponentFile(componentName) {
  try {
    console.log(`Creating component ${componentName}...`);
    const fullPath = path.join('veritasvault-docs/src/theme', componentName);
    const dirPath = path.dirname(fullPath);
    
    // Create directories if they don't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Create index.js file - simple wrapper component
    const componentContent = `import React from 'react';
import Original${componentName} from '@theme-original/${componentName}';
export default function ${componentName}(props) {
  return (
    <>
      <Original${componentName} {...props} />
    </>
  );
}`;
    
    fs.writeFileSync(`${fullPath}/index.js`, componentContent);
    console.log(`Successfully created ${componentName}`);
    return true;
  } catch (error) {
    console.error(`Failed to create ${componentName}: ${error.message}`);
    return false;
  }
}

// Special function to create nested components
function createNestedComponent(componentPath) {
  try {
    console.log(`Creating nested component ${componentPath}...`);
    const fullPath = path.join('veritasvault-docs/src/theme', componentPath);
    const dirPath = path.dirname(fullPath);
    
    // Create directories if they don't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Create index.js file - simple wrapper component
    const componentName = path.basename(componentPath);
    const componentContent = `import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function ${componentName}(props) {
  return (
    <Layout title="${componentName}" description="${componentName} component">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>${componentName}</h1>
            <p>This is a placeholder for the ${componentName} component.</p>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        </div>
      </div>
    </Layout>
  );
}`;
    
    fs.writeFileSync(`${fullPath}/index.js`, componentContent);
    console.log(`Successfully created ${componentPath}`);
    return true;
  } catch (error) {
    console.error(`Failed to create ${componentPath}: ${error.message}`);
    return false;
  }
}

// Create prism-include-languages.js which is special
function createPrismIncludeLanguages() {
  try {
    console.log('Creating prism-include-languages.js...');
    const content = `/**
 * This file is used to configure additional Prism syntax highlighting languages
 */

import siteConfig from '@generated/docusaurus.config';

const prismIncludeLanguages = (PrismObject) => {
  const {
    themeConfig: { prism },
  } = siteConfig;
  const { additionalLanguages = [] } = prism || {};

  // Prism components work on the Prism instance on the window, while prism-react-renderer
  // uses its own Prism instance. We temporarily mount the instance on window to support
  // the prism extensions and plugins.
  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    require(\`prismjs/components/prism-\${lang}\`);
  });

  // Additional commonly used languages that might be used in code examples
  require('prismjs/components/prism-bash');
  require('prismjs/components/prism-json');
  require('prismjs/components/prism-yaml');
  require('prismjs/components/prism-typescript');
  require('prismjs/components/prism-jsx');
  require('prismjs/components/prism-tsx');
  require('prismjs/components/prism-graphql');
  require('prismjs/components/prism-markdown');

  delete globalThis.Prism;
};

export default prismIncludeLanguages;`;
    
    fs.writeFileSync('veritasvault-docs/src/theme/prism-include-languages.js', content);
    console.log('Successfully created prism-include-languages.js');
    return true;
  } catch (error) {
    console.error(`Failed to create prism-include-languages.js: ${error.message}`);
    return false;
  }
}

// Main function to run everything
async function main() {
  console.log('Starting component creation...');
  
  let successCount = 0;
  let failCount = 0;
  
  // First create regular components
  for (const component of componentsToCreate) {
    if (createComponentFile(component)) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  // Then create nested components
  for (const component of nestedComponents) {
    if (createNestedComponent(component)) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  // Create special files
  if (createPrismIncludeLanguages()) {
    successCount++;
  } else {
    failCount++;
  }
  
  console.log(`\nComponent creation complete. ${successCount} successful, ${failCount} failed.`);
  console.log('\nNow run: cd veritasvault-docs && npm install @tailwindcss/postcss --save-dev && npm run build');
}

// Run the main function
main().catch(error => {
  console.error('An unexpected error occurred:', error);
  process.exit(1);
});