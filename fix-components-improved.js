const fs = require('fs');
const path = require('path');

// Base directory for theme components
const THEME_DIR = 'veritasvault-docs/src/theme';

// Components that need to be created based on error messages
const componentsToCreate = [
  // Core components
  'Root',
  'SiteMetadata',
  'Layout',
  'NotFound',
  'MDXComponents',
  'Error',
  'Loading',
  'CodeBlock',
  'Heading',
  'Admonition',
  'TOC',
  'TOCInline',
  
  // Document components
  'DocItem',
  'DocSidebar',
  'DocPage',
  'DocVersionBanner',
  'DocTagsListPage',
  'DocsRoot',
  'DocVersionRoot',
  'DocRoot',
  'DocTagDocListPage',
  
  // Blog components
  'BlogPostItem',
  'BlogPostPage',
  'BlogListPage',
  'BlogSidebar',
  'BlogTagsListPage',
  'BlogTagsPostsPage',
  'BlogArchivePage',
  
  // MDX page component
  'MDXPage',
];

// Nested components based on error logs
const nestedComponents = [
  'Blog/Pages/BlogAuthorsListPage',
  'Blog/Pages/BlogAuthorsPostsPage',
];

// Special files that need to be created
const specialFiles = [
  {
    path: 'prism-include-languages.js',
    content: `/**
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

  // Additional commonly used languages
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

export default prismIncludeLanguages;`
  },
  {
    path: 'tailwind.config.js',
    content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'rounded-lg',
    'bg-gray-100',
    'dark:bg-gray-800',
    'p-4',
    'shadow-md',
    'hover:shadow-lg',
    'transition-shadow',
    'duration-300'
  ],
  corePlugins: {
    preflight: false,
  },
};`
  },
  {
    path: 'docusaurus.config.js',
    targetPath: 'veritasvault-docs/docusaurus.config.js',
    mode: 'update',
    update: (content) => {
      // Add PostCSS config if not already present
      if (!content.includes('postcss')) {
        return content.replace(
          'const config = {',
          `const config = {
  // Add postcss configuration
  webpack: {
    plugins: {
      add: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },`
        );
      }
      return content;
    }
  }
];

// Creates a simple wrapper for a theme component
function createComponentTemplate(componentName) {
  const safeName = componentName.split('/').pop();
  return `import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Try to import original theme component
let Original${safeName};
try {
  Original${safeName} = require('@theme-original/${componentName}').default;
} catch (e) {
  // If the original component doesn't exist, use a placeholder
  Original${safeName} = (props) => {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Placeholder for ${componentName}</h2>
        <div className="mt-2">
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
      </div>
    );
  };
}

// Export a wrapper component that includes the original functionality
export default function ${safeName}(props) {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <>
      <Original${safeName} {...props} />
    </>
  );
}`;
}

// Create special page components like BlogAuthorsListPage
function createPageComponentTemplate(componentPath) {
  const componentName = componentPath.split('/').pop();
  return `import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function ${componentName}(props) {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout title="${componentName}" description="${componentName} page">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h1>${componentName}</h1>
              <p>This is a placeholder for the ${componentName} component.</p>
            </div>
            <div className="mt-4">
              <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">{JSON.stringify(props, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}`;
}

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Create or update a file
function createOrUpdateFile(filePath, content, update = null) {
  ensureDirectoryExists(path.dirname(filePath));
  
  if (update && fs.existsSync(filePath)) {
    // Update existing file
    const currentContent = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(filePath, update(currentContent), 'utf-8');
    return 'updated';
  } else if (!fs.existsSync(filePath)) {
    // Create new file
    fs.writeFileSync(filePath, content, 'utf-8');
    return 'created';
  }
  return 'skipped';
}

// Main function to create all theme components
async function main() {
  console.log('🚀 Creating Docusaurus theme components...');
  
  let created = 0;
  let updated = 0;
  let skipped = 0;
  
  // Create regular components
  for (const componentName of componentsToCreate) {
    const componentDir = path.join(THEME_DIR, componentName);
    const componentFile = path.join(componentDir, 'index.js');
    const template = createComponentTemplate(componentName);
    
    ensureDirectoryExists(componentDir);
    const status = createOrUpdateFile(componentFile, template);
    
    console.log(`Component ${componentName}: ${status}`);
    if (status === 'created') created++;
    else if (status === 'updated') updated++;
    else skipped++;
  }
  
  // Create nested components
  for (const componentPath of nestedComponents) {
    const componentDir = path.join(THEME_DIR, componentPath);
    const componentFile = path.join(componentDir, 'index.js');
    const template = createPageComponentTemplate(componentPath);
    
    ensureDirectoryExists(componentDir);
    const status = createOrUpdateFile(componentFile, template);
    
    console.log(`Component ${componentPath}: ${status}`);
    if (status === 'created') created++;
    else if (status === 'updated') updated++;
    else skipped++;
  }
  
  // Create special files
  for (const file of specialFiles) {
    const targetPath = file.targetPath || path.join(THEME_DIR, file.path);
    
    if (file.mode === 'update') {
      const status = createOrUpdateFile(targetPath, file.content, file.update);
      console.log(`File ${targetPath}: ${status}`);
      if (status === 'created') created++;
      else if (status === 'updated') updated++;
      else skipped++;
    } else {
      const status = createOrUpdateFile(targetPath, file.content);
      console.log(`File ${targetPath}: ${status}`);
      if (status === 'created') created++;
      else if (status === 'updated') updated++;
      else skipped++;
    }
  }
  
  console.log(`\n✅ Done: ${created} created, ${updated} updated, ${skipped} skipped.`);
  console.log('\n🔄 Next steps:');
  console.log('1. cd veritasvault-docs && npm install tailwindcss postcss autoprefixer postcss-import --save-dev');
  console.log('2. Add the following to veritasvault-docs/src/css/custom.css:');
  console.log('\n@tailwind base;');
  console.log('@tailwind components;');
  console.log('@tailwind utilities;\n');
  console.log('3. Run the build: npm run build\n');
}

// Run the main function
main().catch(error => {
  console.error('❌ An error occurred:', error);
  process.exit(1);
});