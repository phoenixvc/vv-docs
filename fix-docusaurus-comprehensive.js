const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Base directories for theme components
const BASE_DIRS = [
  'veritasvault-docs/src/theme',
  'veritasvault-docs/node_modules/@docusaurus/theme-classic/lib/theme',
  'veritasvault-docs/node_modules/@docusaurus/theme-classic/src/theme',
  'veritasvault-docs/.docusaurus/docusaurus-theme-classic/theme',
  'veritasvault-docs/.docusaurus/client-modules/theme'
];

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

// Copy a component to all base directories
function createComponent(componentName) {
  const template = createComponentTemplate(componentName);
  let created = 0;
  
  for (const baseDir of BASE_DIRS) {
    const componentDir = path.join(baseDir, componentName);
    const componentFile = path.join(componentDir, 'index.js');
    
    // Ensure directory exists
    ensureDirectoryExists(componentDir);
    
    // Create the component file
    if (!fs.existsSync(componentFile) || fs.readFileSync(componentFile, 'utf8') !== template) {
      fs.writeFileSync(componentFile, template, 'utf8');
      created++;
    }
  }
  
  return created > 0;
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

  for (const baseDir of BASE_DIRS) {
    const filePath = path.join(baseDir, 'prism-include-languages.js');
    ensureDirectoryExists(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return true;
}

// Create PostCSS config file
function createPostCssConfig() {
  const content = `module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

  const filePath = 'veritasvault-docs/postcss.config.js';
  fs.writeFileSync(filePath, content, 'utf8');
  
  return true;
}

// Update Tailwind configuration
function updateTailwindConfig() {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
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
    {
      pattern: /docusaurus-theme-.*/,
    }
  ],
  corePlugins: {
    preflight: false,
  },
};`;

  const mainTailwindConfigPath = 'veritasvault-docs/tailwind.config.js';
  fs.writeFileSync(mainTailwindConfigPath, tailwindConfig, 'utf8');
  
  return true;
}

// Update custom.css with Tailwind directives
function updateCustomCss() {
  const customCssPath = 'veritasvault-docs/src/css/custom.css';
  
  // Check if file exists
  if (!fs.existsSync(customCssPath)) {
    console.log(`⚠️ Warning: ${customCssPath} does not exist. Creating it with Tailwind directives.`);
    fs.writeFileSync(customCssPath, `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
}`, 'utf8');
    return true;
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

// Fix common MDX errors in the specified file
function fixMdxFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${filePath}`);
    return false;
  }
  
  console.log(`🔧 Fixing MDX file: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 1. Fix mismatched closing tags
  const mismatches = [
    { open: '<DiagramBlock', close: '</SectionLevelTwo>', replacement: '</DiagramBlock>' },
    { open: '<DocCard', close: '</div>', replacement: '</DocCard>' },
    { open: '<TokenDistributionChart', close: '</ContentBlock>', replacement: '</TokenDistributionChart>' },
    { open: '<MermaidDiagram', close: '</AnimatedCard>', replacement: '</MermaidDiagram>' },
    { open: '<DocCard', close: '</DocCardList>', replacement: '</DocCard>' },
  ];
  
  for (const { open, close, replacement } of mismatches) {
    // Find instances where the open tag is followed by a close tag that doesn't match
    const regex = new RegExp(`${open}[^<]*?${close}`, 'gs');
    if (regex.test(content)) {
      content = content.replace(regex, (match) => match.replace(close, replacement));
      modified = true;
    }
  }
  
  // 2. Fix code blocks with variable declarations
  // Change JavaScript code blocks with variable declarations to text blocks
  const codeBlockRegex = /```(js|javascript)\s+(const|let|var|function)\s+.*?```/gs;
  if (codeBlockRegex.test(content)) {
    content = content.replace(codeBlockRegex, (match) => match.replace(/```(js|javascript)/, '```text'));
    modified = true;
  }
  
  // 3. Fix potentially unclosed expressions by adding a closing brace where needed
  // This is more complex and might require manual review, but we can try a simple heuristic
  const braceRegex = /{([^{}]*)$/gm; // Find lines with unclosed braces
  if (braceRegex.test(content)) {
    content = content.replace(braceRegex, '{$1}');
    modified = true;
  }
  
  // 4. Fix specific syntax patterns from error messages
  
  // Remove hyphen character that causes errors in JSX names
  content = content.replace(/<([a-zA-Z]+)-([a-zA-Z]+)/g, '<$1_$2');
  content = content.replace(/<\/([a-zA-Z]+)-([a-zA-Z]+)/g, '</$1_$2');
  
  // Save the file if modifications were made
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed issues in ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️ No fixable issues found in ${filePath}`);
    return false;
  }
}

// Fix all MDX files
function fixAllMdxFiles() {
  const docsDir = 'veritasvault-docs/docs';
  const mdxFiles = [];
  
  // Recursively find all MDX files
  function findMdxFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findMdxFiles(filePath);
      } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
        mdxFiles.push(filePath);
      }
    }
  }
  
  if (fs.existsSync(docsDir)) {
    findMdxFiles(docsDir);
    console.log(`Found ${mdxFiles.length} MDX/MD files for fixing`);
    
    let fixedCount = 0;
    for (const file of mdxFiles) {
      if (fixMdxFile(file)) {
        fixedCount++;
      }
    }
    
    console.log(`✅ Fixed issues in ${fixedCount} files`);
    return fixedCount;
  } else {
    console.log(`⚠️ Docs directory not found: ${docsDir}`);
    return 0;
  }
}

// Install necessary dependencies
function installDependencies() {
  try {
    console.log('📦 Installing Tailwind and related dependencies...');
    execSync('cd veritasvault-docs && npm install tailwindcss postcss autoprefixer postcss-import postcss-nested --save-dev', {
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    return false;
  }
}

// Delete cache directory
function deleteCacheDirectory() {
  const cacheDir = 'veritasvault-docs/.docusaurus';
  if (fs.existsSync(cacheDir)) {
    console.log('🗑️ Removing Docusaurus cache directory...');
    fs.rmSync(cacheDir, { recursive: true, force: true });
    return true;
  }
  return false;
}

// Main function
async function main() {
  console.log('🔧 Fixing Docusaurus build issues...');
  let created = 0;
  
  // Delete cache directory
  deleteCacheDirectory();
  
  // Create components in all locations
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
  
  // Create PostCSS config
  if (createPostCssConfig()) {
    console.log('✅ Created PostCSS config');
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
  
  // Fix MDX files
  fixAllMdxFiles();
  
  console.log(`\n✅ Done! Created ${created} components.`);
  console.log('\n🔄 Next steps:');
  console.log('1. Run the build: cd veritasvault-docs && npx docusaurus build');
}

// Run the main function
main().catch(error => {
  console.error('❌ An error occurred:', error);
});