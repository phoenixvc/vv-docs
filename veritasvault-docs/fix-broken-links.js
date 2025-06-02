// fix-broken-links.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directory containing the docs
const docsDir = path.join(__dirname, 'docs');

// Get all Markdown and MDX files in the docs directory
const findFiles = () => {
  return glob.sync(path.join(docsDir, '**/*.{md,mdx}'));
};

// Pattern to find links to /architecture/* without the /docs/ prefix
const linkPattern = /\[([^\]]+)\]\(\/architecture\/([^\)]+)\)/g;

// Fix links in a file
const fixLinksInFile = (filePath) => {
  console.log(`Processing ${filePath}...`);
  
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if there are any links to fix and replace them
  const originalContent = content;
  content = content.replace(linkPattern, (match, linkText, linkPath) => {
    console.log(`  Fixing link: ${match} -> [${linkText}](/docs/architecture/${linkPath})`);
    return `[${linkText}](/docs/architecture/${linkPath})`;
  });
  
  // Only consider it fixed if content actually changed
  if (content !== originalContent) {
    // Replace all instances of the pattern
    content = content.replace(linkPattern, (match, linkText, linkPath) => {
      console.log(`  Fixing link: ${match} -> [${linkText}](/docs/architecture/${linkPath})`);
      return `[${linkText}](/docs/architecture/${linkPath})`;
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  Updated ${filePath}`);
    return true;
  }
  
  return false;
};

// Main function to fix all broken links
const fixBrokenLinks = () => {
  const files = findFiles();
  console.log(`Found ${files.length} files to process`);
  
  let totalFixed = 0;
  
  for (const file of files) {
    if (fixLinksInFile(file)) {
      totalFixed++;
    }
  }
  
  console.log(`\nCompleted! Fixed links in ${totalFixed} files.`);
};

// Run the script
fixBrokenLinks();