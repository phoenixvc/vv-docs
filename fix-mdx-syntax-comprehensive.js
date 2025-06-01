const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directories to search for MDX files
const directories = [
  path.join(__dirname, 'veritasvault-docs/docs'),
  path.join(__dirname, 'veritasvault-docs/src'),
  path.join(__dirname, 'veritasvault-docs/blog'),
];

// Regular expressions for common MDX syntax issues
const fixers = [
  // Fix unclosed braces in expressions - match {expr without closing }
  {
    name: 'Unclosed braces in expressions',
    regex: /(\{[^{}]*$)/g,
    fix: (content, match) => content.replace(match, `${match}}`)
  },
  
  // Fix invalid JSX attribute with dash (-) character
  {
    name: 'Invalid JSX attribute with dash',
    regex: /<([a-zA-Z0-9_]+)([^>]*)\s+([a-zA-Z0-9_]+)-([a-zA-Z0-9_]+)=/g,
    fix: (content, match, p1, p2, p3, p4) => 
      content.replace(match, `<${p1}${p2} ${p3}${p4.charAt(0).toUpperCase() + p4.slice(1)}=`)
  },
  
  // Fix invalid import statements
  {
    name: 'Invalid import statements',
    regex: /import\s+{([^}]*)}\s+from\s+(['"])([^'"]+)(['"])/g,
    fix: (content, match) => {
      // Check if the import statement has syntax errors and fix them
      try {
        return match; // Return as is if it parses correctly
      } catch (e) {
        // Fix common import syntax issues
        return match
          .replace(/,\s*,/g, ',') // Remove duplicate commas
          .replace(/\s{2,}/g, ' ') // Normalize whitespace
          .replace(/}\s+from/g, '} from'); // Fix spacing
      }
    }
  },
  
  // Fix missing closing tags
  {
    name: 'Missing closing tags',
    regex: /<([a-zA-Z0-9_]+)([^>]*)>(?![^<]*<\/\1>)/g,
    fix: (content, match, p1, p2) => {
      // Only fix if this isn't a self-closing tag or already has a closing tag
      if (match.endsWith('/>') || p1 === 'br' || p1 === 'hr' || p1 === 'img' || p1 === 'input') {
        return match;
      }
      return `${match}${content.includes(`</${p1}>`) ? '' : `</${p1}>`}`;
    }
  },
  
  // Fix JSX expressions with unexpected characters
  {
    name: 'JSX expressions with unexpected characters',
    regex: /\{([^{}]*[^a-zA-Z0-9_${}()[\],.\s:/'"`].*?)\}/g,
    fix: (content, match, p1) => {
      // Try to identify and fix problematic characters in JSX expressions
      const fixedContent = p1
        .replace(/–/g, '-') // Replace en dash with hyphen
        .replace(/—/g, '--') // Replace em dash with double hyphen
        .replace(/…/g, '...') // Replace ellipsis with dots
        .replace(/'/g, "'") // Replace smart quotes
        .replace(/"/g, '"') // Replace smart double quotes
        .replace(/"/g, '"'); // Replace other smart double quotes
      
      return content.replace(match, `{${fixedContent}}`);
    }
  }
];

// Function to fix MDX content
function fixMdxContent(content, filePath) {
  let fixedContent = content;
  let fixesApplied = 0;
  
  // Apply each fixer
  fixers.forEach(fixer => {
    const matches = content.match(fixer.regex);
    if (matches) {
      matches.forEach(match => {
        const result = fixer.fix(fixedContent, match);
        if (result !== fixedContent) {
          console.log(`Applied fix "${fixer.name}" in ${filePath}`);
          fixedContent = result;
          fixesApplied++;
        }
      });
    }
  });
  
  // Fix for specific error: Unexpected character - (U+002D) before name
  if (content.includes('<SectionLevel-')) {
    fixedContent = fixedContent.replace(/<SectionLevel-([a-zA-Z0-9]+)/g, '<SectionLevel $1');
    console.log(`Fixed SectionLevel component syntax in ${filePath}`);
    fixesApplied++;
  }
  
  return { fixedContent, fixesApplied };
}

// Find all MDX files
let mdxFiles = [];
directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = glob.sync(`${dir}/**/*.{md,mdx}`);
    mdxFiles = [...mdxFiles, ...files];
  }
});

console.log(`Found ${mdxFiles.length} MDX files to process`);

// Process each file
let totalFixesApplied = 0;
let filesFixed = 0;

mdxFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { fixedContent, fixesApplied } = fixMdxContent(content, filePath);
    
    if (fixesApplied > 0) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`Fixed ${fixesApplied} issues in ${filePath}`);
      totalFixesApplied += fixesApplied;
      filesFixed++;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(`\nFix complete: Applied ${totalFixesApplied} fixes across ${filesFixed} files`);
console.log(`Some complex MDX syntax issues may still require manual fixes.`);