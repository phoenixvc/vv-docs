const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directories to search for MDX files
const directories = [
  path.join(__dirname, 'veritasvault-docs/docs'),
  path.join(__dirname, 'veritasvault-docs/src'),
  path.join(__dirname, 'veritasvault-docs/blog'),
];

// Helper function to safely apply regex and handle null matches
function safeRegexReplace(content, regex, replaceFn) {
  if (!content) return content;
  
  try {
    const matches = content.match(regex);
    if (!matches) return content;
    
    let result = content;
    for (const match of matches) {
      try {
        const replacement = replaceFn(result, match);
        if (replacement && replacement !== result) {
          result = replacement;
        }
      } catch (err) {
        // Skip this match if there's an error
        console.log(`Error processing match: ${err.message}`);
      }
    }
    return result;
  } catch (err) {
    console.log(`Error in regex replace: ${err.message}`);
    return content;
  }
}

// Regular expressions for common MDX syntax issues
const fixers = [
  // Fix incomplete JSX component with dash problem (like <SectionLevel-1>)
  {
    name: 'JSX component with dash',
    apply: (content) => {
      if (!content) return content;
      try {
        return content.replace(/<([a-zA-Z0-9_]+)-([a-zA-Z0-9_]+)([^>]*)>/g, 
          (match, p1, p2, p3) => `<${p1} ${p2.toLowerCase()}${p3}>`);
      } catch (err) {
        console.log(`Error in JSX component dash fixer: ${err.message}`);
        return content;
      }
    }
  },
  
  // Fix unclosed braces in expressions
  {
    name: 'Unclosed braces in expressions',
    apply: (content) => {
      if (!content) return content;
      try {
        // Split by lines to process each line individually
        const lines = content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const openBraces = (line.match(/\{/g) || []).length;
          const closeBraces = (line.match(/\}/g) || []).length;
          
          if (openBraces > closeBraces) {
            // Add missing closing braces
            lines[i] = line + '}'.repeat(openBraces - closeBraces);
          }
        }
        
        return lines.join('\n');
      } catch (err) {
        console.log(`Error in unclosed braces fixer: ${err.message}`);
        return content;
      }
    }
  },
  
  // Fix problematic characters in expressions
  {
    name: 'Problematic characters in expressions',
    apply: (content) => {
      if (!content) return content;
      try {
        // Replace problematic characters inside JSX expressions
        return content.replace(/\{([^{}]*[''""…–—].*?)\}/g, (match, p1) => {
          if (!p1) return match;
          
          const fixedContent = p1
            .replace(/'/g, "'") // Replace smart quotes
            .replace(/'/g, "'") // Replace other smart quotes
            .replace(/"/g, '"') // Replace smart double quotes
            .replace(/"/g, '"') // Replace other smart double quotes
            .replace(/…/g, '...') // Replace ellipsis
            .replace(/–/g, '-') // Replace en dash
            .replace(/—/g, '--'); // Replace em dash
          
          return `{${fixedContent}}`;
        });
      } catch (err) {
        console.log(`Error in problematic characters fixer: ${err.message}`);
        return content;
      }
    }
  },
  
  // Fix SectionLevel component
  {
    name: 'SectionLevel component',
    apply: (content) => {
      if (!content) return content;
      try {
        if (content.includes('<SectionLevel-')) {
          return content.replace(/<SectionLevel-([a-zA-Z0-9]+)/g, 
            (match, p1) => `<SectionLevel level={${p1}}`);
        }
        return content;
      } catch (err) {
        console.log(`Error in SectionLevel fixer: ${err.message}`);
        return content;
      }
    }
  },
  
  // Fix import/export statements
  {
    name: 'Import/export statements',
    apply: (content) => {
      if (!content) return content;
      try {
        const lines = content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('import ') || line.startsWith('export ')) {
            lines[i] = line
              .replace(/[''""]/g, '"')
              .replace(/\s{2,}/g, ' ')
              .replace(/,\s*,/g, ',')
              .replace(/}\s+from/g, '} from');
          }
        }
        
        return lines.join('\n');
      } catch (err) {
        console.log(`Error in import/export fixer: ${err.message}`);
        return content;
      }
    }
  },
  
  // Fix incomplete JSX tags
  {
    name: 'Incomplete JSX tags',
    apply: (content) => {
      if (!content) return content;
      try {
        // Look for tags that don't have closing >
        const lines = content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const openTagMatch = line.match(/<([a-zA-Z0-9_]+)([^>]*?)$/);
          
          if (openTagMatch && !openTagMatch[2].includes('>') && !openTagMatch[2].endsWith('/')) {
            // This is an incomplete tag
            lines[i] = line + '>';
          }
        }
        
        return lines.join('\n');
      } catch (err) {
        console.log(`Error in incomplete JSX tags fixer: ${err.message}`);
        return content;
      }
    }
  }
];

// Process a single file with all fixers
function processFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return false;
    }
    
    console.log(`Processing: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply each fixer
    for (const fixer of fixers) {
      const originalContent = content;
      content = fixer.apply(content);
      
      if (content !== originalContent) {
        console.log(`Applied fix "${fixer.name}" in ${filePath}`);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

// Process all files in specific directories
function processAllFiles() {
  let mdxFiles = [];
  let fixedFiles = 0;
  
  // Find all MDX files
  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      try {
        const files = glob.sync(`${dir}/**/*.{md,mdx}`);
        mdxFiles = [...mdxFiles, ...files];
      } catch (err) {
        console.error(`Error finding files in ${dir}: ${err.message}`);
      }
    } else {
      console.warn(`Directory not found: ${dir}`);
    }
  });
  
  console.log(`Found ${mdxFiles.length} MDX files to process`);
  
  // Process each file
  mdxFiles.forEach(filePath => {
    try {
      const fixed = processFile(filePath);
      if (fixed) {
        fixedFiles++;
      }
    } catch (err) {
      console.error(`Error processing ${filePath}: ${err.message}`);
    }
  });
  
  console.log(`\nFix complete: Fixed issues in ${fixedFiles} files`);
  console.log(`Some complex MDX syntax issues may still require manual inspection.`);
}

// Run the script
console.log('Starting improved MDX syntax fix script...');
processAllFiles();