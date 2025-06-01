const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directories to search for MDX files
const directories = [
  path.join(__dirname, 'veritasvault-docs/docs'),
  path.join(__dirname, 'veritasvault-docs/src'),
  path.join(__dirname, 'veritasvault-docs/blog'),
];

// Map of files with specific line numbers from error log
const specificErrors = {
  // File path: [Line numbers with errors]
  'veritasvault-docs/docs/architecture/diagrams/cloud-infrastructure.mdx': [152],
  'veritasvault-docs/docs/contributing/templates/index.mdx': [616],
  'veritasvault-docs/docs/migration/docusaurus/docsaurus-integration-guide.md': [194],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-component-migration-guide.md': [51],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-content-migration-workflow.md': [140],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-content-organization-strategy.md': [158],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-custom-theme-guide.md': [199],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-deployment-guide.md': [64],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-documentation-testing-framework.md': [343],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-internationalization-guide.md': [118],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-plugin-development-guide.md': [192],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-search-implementation-guide.md': [56],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-setup-checklist.md': [116],
  'veritasvault-docs/docs/migration/docusaurus/docusaurus-version-management-guide.md': [64],
  'veritasvault-docs/docs/migration/integration/index.mdx': [206],
  'veritasvault-docs/docs/migration/section-numbering-guide.md': [141],
  'veritasvault-docs/docs/migration/style-guide.md': [137],
  'veritasvault-docs/docs/migration/vv/docusaurus-information-architecture.md': [43],
  'veritasvault-docs/docs/migration/vv/metadata-mapping-schema.md': [34],
};

// Regular expressions for common MDX syntax issues
const fixers = [
  // Fix incomplete JSX component with dash problem (like <SectionLevel-1>)
  {
    name: 'JSX component with dash',
    regex: /<([a-zA-Z0-9_]+)-([a-zA-Z0-9_]+)([^>]*)>/g,
    fix: (content, match, p1, p2, p3) => content.replace(match, `<${p1} ${p2.toLowerCase()}${p3}>`)
  },
  
  // Fix unclosed braces in expressions
  {
    name: 'Unclosed braces in expressions',
    regex: /(\{[^{}\n]*?)($|\n)/g,
    fix: (content, match, p1, p2) => {
      // Check if the brace is already closed
      const openBraces = (p1.match(/\{/g) || []).length;
      const closeBraces = (p1.match(/\}/g) || []).length;
      if (openBraces > closeBraces) {
        return content.replace(match, `${p1}}${p2}`);
      }
      return content;
    }
  },
  
  // Fix acorn parsing issues in expressions
  {
    name: 'Acorn parsing issues in expressions',
    regex: /\{([^{}]*[''""…–—].*?)\}/g,
    fix: (content, match, p1) => {
      // Replace problematic characters
      const fixedContent = p1
        .replace(/'/g, "'") // Replace smart quotes
        .replace(/'/g, "'") // Replace other smart quotes
        .replace(/"/g, '"') // Replace smart double quotes
        .replace(/"/g, '"') // Replace other smart double quotes
        .replace(/…/g, '...') // Replace ellipsis
        .replace(/–/g, '-') // Replace en dash
        .replace(/—/g, '--'); // Replace em dash
      
      return content.replace(match, `{${fixedContent}}`);
    }
  },
  
  // Fix incomplete JSX tags
  {
    name: 'Incomplete JSX tags',
    regex: /<([a-zA-Z0-9_]+)([^>]*?)($|\n)/g,
    fix: (content, match, p1, p2, p3) => {
      // Only fix if it looks like an incomplete tag
      if (!p2.includes('>') && !p2.endsWith('/')) {
        return content.replace(match, `<${p1}${p2}>${p3}`);
      }
      return content;
    }
  },
  
  // Fix improperly closed JSX tags
  {
    name: 'Improperly closed JSX tags',
    regex: /<([a-zA-Z0-9_]+)([^>]*?)>([^<]*?)($|\n)/g,
    fix: (content, match, p1, p2, p3, p4) => {
      // Skip self-closing tags or tags with closing tags
      if (p2.endsWith('/') || p3.includes(`</${p1}>`) || p1 === 'br' || p1 === 'hr' || p1 === 'img' || p1 === 'input') {
        return content;
      }
      
      // If content after the opening tag doesn't contain closing tag, add it
      if (!content.includes(`</${p1}>`)) {
        return content.replace(match, `<${p1}${p2}>${p3}</${p1}>${p4}`);
      }
      return content;
    }
  }
];

// Function to fix specific MDX file lines based on error log
function fixSpecificMdxFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let modified = false;
    
    // Get the problematic lines for this file
    const errorLines = specificErrors[filePath] || [];
    
    errorLines.forEach(lineNum => {
      if (lineNum <= lines.length) {
        const lineIndex = lineNum - 1;
        const originalLine = lines[lineIndex];
        let fixedLine = originalLine;
        
        // Apply each fixer to the problematic line
        fixers.forEach(fixer => {
          if (fixedLine.match(fixer.regex)) {
            const result = fixer.fix(fixedLine, fixedLine.match(fixer.regex)[0]);
            if (result !== fixedLine) {
              console.log(`Applied fix "${fixer.name}" in ${filePath}:${lineNum}`);
              fixedLine = result;
              modified = true;
            }
          }
        });
        
        // Special case for SectionLevel-1 component error
        if (originalLine.includes('<SectionLevel-')) {
          fixedLine = originalLine.replace(/<SectionLevel-([a-zA-Z0-9]+)/g, '<SectionLevel level={$1}');
          console.log(`Fixed SectionLevel component in ${filePath}:${lineNum}`);
          modified = true;
        }
        
        // Fix acorn parsing errors in import/export statements
        if (originalLine.startsWith('import ') || originalLine.startsWith('export ')) {
          const fixedImport = originalLine
            .replace(/[''""]/g, '"')
            .replace(/\s{2,}/g, ' ')
            .replace(/,\s*,/g, ',')
            .replace(/}\s+from/g, '} from');
          
          if (fixedImport !== originalLine) {
            fixedLine = fixedImport;
            console.log(`Fixed import/export statement in ${filePath}:${lineNum}`);
            modified = true;
          }
        }
        
        lines[lineIndex] = fixedLine;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to fix all MDX files
function fixAllMdxFiles() {
  let mdxFiles = [];
  
  // First, process files with known errors
  let fixedFiles = 0;
  Object.keys(specificErrors).forEach(filePath => {
    const fullPath = path.resolve(filePath);
    if (fs.existsSync(fullPath)) {
      const fixed = fixSpecificMdxFile(filePath);
      if (fixed) {
        fixedFiles++;
      }
    } else {
      console.warn(`Warning: File ${filePath} not found`);
    }
  });
  
  // Then, find and process all MDX files
  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = glob.sync(`${dir}/**/*.{md,mdx}`);
      mdxFiles = [...mdxFiles, ...files];
    }
  });
  
  console.log(`Found ${mdxFiles.length} MDX files to process`);
  
  // Process each file
  mdxFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let fixedContent = content;
      let fileModified = false;
      
      // Apply each fixer
      fixers.forEach(fixer => {
        const matches = fixedContent.match(fixer.regex);
        if (matches) {
          matches.forEach(match => {
            const result = fixer.fix(fixedContent, match);
            if (result !== fixedContent) {
              console.log(`Applied fix "${fixer.name}" in ${filePath}`);
              fixedContent = result;
              fileModified = true;
            }
          });
        }
      });
      
      // Special fix for SectionLevel component error throughout the file
      if (fixedContent.includes('<SectionLevel-')) {
        fixedContent = fixedContent.replace(/<SectionLevel-([a-zA-Z0-9]+)/g, '<SectionLevel level={$1}');
        console.log(`Fixed SectionLevel component in ${filePath}`);
        fileModified = true;
      }
      
      if (fileModified) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        fixedFiles++;
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log(`\nFix complete: Fixed issues in ${fixedFiles} files`);
  console.log(`Some complex MDX syntax issues may still require manual inspection.`);
}

// Run the script
console.log('Starting MDX syntax fix script...');
fixAllMdxFiles();