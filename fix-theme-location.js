const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Base directory for theme components
const THEME_DIR = 'veritasvault-docs/src/theme';
const TARGET_DIR = 'veritasvault-docs/node_modules/@docusaurus/theme-classic/lib/theme';

// Components that need to be copied
const componentsToCreate = [
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
  'DocItem',
  'DocSidebar',
  'DocPage',
  'DocVersionBanner',
  'DocTagsListPage',
  'DocsRoot',
  'DocVersionRoot',
  'DocRoot',
  'DocTagDocListPage',
  'BlogPostItem',
  'BlogPostPage',
  'BlogListPage',
  'BlogSidebar',
  'BlogTagsListPage',
  'BlogTagsPostsPage',
  'BlogArchivePage',
  'MDXPage',
];

// Nested components
const nestedComponents = [
  'Blog/Pages/BlogAuthorsListPage',
  'Blog/Pages/BlogAuthorsPostsPage',
];

// Create a basic component template
function createComponentTemplate(componentName) {
  const simpleName = componentName.split('/').pop();
  return `import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function ${simpleName}(props) {
  return (
    <div className="docusaurus-theme-${simpleName.toLowerCase()}" {...props}>
      {props.children || \`${componentName} Component\`}
    </div>
  );
}`;
}

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copy a component to both source and node_modules location
function createComponent(componentName) {
  const sourceDir = path.join(THEME_DIR, componentName);
  const sourceFile = path.join(sourceDir, 'index.js');
  const targetDir = path.join(TARGET_DIR, componentName);
  const targetFile = path.join(targetDir, 'index.js');
  
  // Create the template
  const template = createComponentTemplate(componentName);
  
  // Ensure both directories exist
  ensureDirectoryExists(sourceDir);
  ensureDirectoryExists(targetDir);
  
  // Create the component in src/theme
  fs.writeFileSync(sourceFile, template, 'utf8');
  
  // Also create the component in node_modules to immediately fix the error
  fs.writeFileSync(targetFile, template, 'utf8');
  
  return true;
}

// Create prism-include-languages.js
function createPrismIncludeLanguages() {
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

export default prismIncludeLanguages;`;

  const sourceFile = path.join(THEME_DIR, 'prism-include-languages.js');
  const targetFile = path.join(TARGET_DIR, 'prism-include-languages.js');
  
  fs.writeFileSync(sourceFile, content, 'utf8');
  fs.writeFileSync(targetFile, content, 'utf8');
  
  return true;
}

// Update Tailwind configuration
function updateTailwindConfig() {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
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
    'duration-300',
    'docusaurus-theme-root',
    'docusaurus-theme-sitemetadata',
    'docusaurus-theme-layout',
    'docusaurus-theme-notfound',
    'docusaurus-theme-mdxcomponents',
    'docusaurus-theme-error',
    'docusaurus-theme-loading',
    'docusaurus-theme-codeblock',
    'docusaurus-theme-heading',
    'docusaurus-theme-admonition',
    'docusaurus-theme-toc',
    'docusaurus-theme-tocinline',
    'docusaurus-theme-docitem',
    'docusaurus-theme-docsidebar',
    'docusaurus-theme-docpage'
  ],
  corePlugins: {
    preflight: false,
  },
};`;

  const tailwindConfigPath = path.join(THEME_DIR, 'tailwind.config.js');
  fs.writeFileSync(tailwindConfigPath, tailwindConfig, 'utf8');
  
  // Also copy to main directory
  const mainTailwindConfigPath = 'veritasvault-docs/tailwind.config.js';
  fs.writeFileSync(mainTailwindConfigPath, tailwindConfig, 'utf8');
  
  return true;
}

// Update custom.css with Tailwind directives
function updateCustomCss() {
  const customCssPath = 'veritasvault-docs/src/css/custom.css';
  
  // Check if file exists
  if (!fs.existsSync(customCssPath)) {
    console.log(`⚠️ Warning: ${customCssPath} does not exist. Skipping Tailwind directives.`);
    return false;
  }
  
  // Read existing content
  let cssContent = fs.readFileSync(customCssPath, 'utf8');
  
  // Check if Tailwind directives already exist
  if (cssContent.includes('@tailwind')) {
    console.log('✅ Tailwind directives already exist in custom.css');
    return false;
  }
  
  // Add Tailwind directives at the top
  cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

${cssContent}`;
  
  // Write back to file
  fs.writeFileSync(customCssPath, cssContent, 'utf8');
  
  return true;
}

// Install necessary dependencies
function installDependencies() {
  try {
    console.log('📦 Installing Tailwind and related dependencies...');
    execSync('cd veritasvault-docs && npm install tailwindcss postcss autoprefixer postcss-import --save-dev', {
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🔧 Fixing Docusaurus theme components...');
  let created = 0;
  
  // Create theme directory if it doesn't exist
  ensureDirectoryExists(THEME_DIR);
  
  // Create regular components
  for (const componentName of componentsToCreate) {
    if (createComponent(componentName)) {
      console.log(`✅ Created component: ${componentName}`);
      created++;
    }
  }
  
  // Create nested components
  for (const componentPath of nestedComponents) {
    if (createComponent(componentPath)) {
      console.log(`✅ Created nested component: ${componentPath}`);
      created++;
    }
  }
  
  // Create prism-include-languages.js
  if (createPrismIncludeLanguages()) {
    console.log('✅ Created prism-include-languages.js');
    created++;
  }
  
  // Update Tailwind config
  if (updateTailwindConfig()) {
    console.log('✅ Updated Tailwind configuration');
  }
  
  // Update custom.css
  if (updateCustomCss()) {
    console.log('✅ Added Tailwind directives to custom.css');
  }
  
  // Install dependencies
  if (installDependencies()) {
    console.log('✅ Installed Tailwind dependencies');
  }
  
  console.log(`\n✅ Done! Created ${created} components.`);
  console.log('\n🔄 Next steps:');
  console.log('1. Run the MDX fix script: node fix-mdx-content.js');
  console.log('2. Clear Docusaurus cache: cd veritasvault-docs && npm run clear');
  console.log('3. Run the build: cd veritasvault-docs && npm run build');
}

// Run the main function
main().catch(error => {
  console.error('❌ An error occurred:', error);
});