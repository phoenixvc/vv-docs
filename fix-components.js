const path = require('path');
const fs = require('fs');

// All components that need to be created, including the missing ones from error logs
const componentsToCreate = [
  // Original components
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
  'SiteMetadata',
  
  // Additional components from error logs
  'DocTagsListPage',
  'DocsRoot',
  'BlogTagsPostsPage',
  'BlogArchivePage',
  'DocVersionRoot',
  'DocRoot',
  'DocTagDocListPage'
];

// Nested components including those from error logs
const nestedComponents = [
  'Blog/BlogAuthorsListPage',
  'Blog/BlogAuthorsPostsPage',
  'Blog/Pages/BlogAuthorsListPage',
  'Blog/Pages/BlogAuthorsPostsPage'
];

// Function to check if component already exists
function componentExists(componentPath) {
  const fullPath = path.join('veritasvault-docs/src/theme', componentPath, 'index.js');
  return fs.existsSync(fullPath);
}

// Create a component file if it doesn't already exist
function createComponentFile(componentName) {
  try {
    const fullPath = path.join('veritasvault-docs/src/theme', componentName);
    
    // Check if component already exists
    if (componentExists(componentName)) {
      console.log(`Component ${componentName} already exists, skipping...`);
      return true;
    }
    
    console.log(`Creating component ${componentName}...`);
    const dirPath = path.dirname(fullPath);
    
    // Create directories if they don't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Create index.js file - simple wrapper component
    const componentContent = `import React from 'react';
// Try to import original component, but have a fallback if it doesn't exist
let Original${componentName};
try {
  Original${componentName} = require('@theme-original/${componentName}').default;
} catch (e) {
  // Fallback implementation if original component doesn't exist
  Original${componentName} = (props) => <div>Placeholder for ${componentName}</div>;
}

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

// Create nested component if it doesn't already exist
function createNestedComponent(componentPath) {
  try {
    const fullPath = path.join('veritasvault-docs/src/theme', componentPath);
    
    // Check if component already exists
    if (componentExists(componentPath)) {
      console.log(`Component ${componentPath} already exists, skipping...`);
      return true;
    }
    
    console.log(`Creating nested component ${componentPath}...`);
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
    const fullPath = 'veritasvault-docs/src/theme/prism-include-languages.js';
    
    // Check if file already exists
    if (fs.existsSync(fullPath)) {
      console.log('prism-include-languages.js already exists, skipping...');
      return true;
    }
    
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
    
    fs.writeFileSync(fullPath, content);
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
  let skippedCount = 0;
  
  // First create regular components
  for (const component of componentsToCreate) {
    const result = createComponentFile(component);
    if (result === true) {
      if (componentExists(component)) {
        skippedCount++;
      } else {
        successCount++;
      }
    } else {
      failCount++;
    }
  }
  
  // Then create nested components
  for (const component of nestedComponents) {
    const result = createNestedComponent(component);
    if (result === true) {
      if (componentExists(component)) {
        skippedCount++;
      } else {
        successCount++;
      }
    } else {
      failCount++;
    }
  }
  
  // Create special files
  if (createPrismIncludeLanguages()) {
    if (fs.existsSync('veritasvault-docs/src/theme/prism-include-languages.js')) {
      skippedCount++;
    } else {
      successCount++;
    }
  } else {
    failCount++;
  }
  
  console.log(`\nComponent creation complete. ${successCount} created, ${skippedCount} skipped, ${failCount} failed.`);
  console.log('\nNow run: cd veritasvault-docs && npm install @tailwindcss/postcss --save-dev && npm run build');
}

// Run the main function
main().catch(error => {
  console.error('An unexpected error occurred:', error);
  process.exit(1);
});