// fix-broken-links-debug.js
const fs = require('fs');
const path = require('path');

// Directory containing the docs
const docsDir = path.join(__dirname, 'docs');
console.log(`Looking for files in: ${docsDir}`);

// Check if directory exists
if (!fs.existsSync(docsDir)) {
  console.error(`ERROR: Directory does not exist: ${docsDir}`);
  process.exit(1);
}

// Get all Markdown and MDX files in the docs directory without using glob
const findFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
};

// Pattern to find links to /architecture/* without the /docs/ prefix
const linkPattern = /\[([^\]]+)\]\(\/architecture\/([^\)]+)\)/g;

// Fix links in a file
const fixLinksInFile = (filePath) => {
  console.log(`Processing ${filePath}...`);
  
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if there are any links to fix
  let hasMatches = false;
  let match;
  
  // Use the regex pattern to find all matches
  while ((match = linkPattern.exec(content)) !== null) {
    hasMatches = true;
    console.log(`  Found link: ${match[0]} in ${filePath}`);
  }
  
  if (hasMatches) {
    // Reset the regex lastIndex
    linkPattern.lastIndex = 0;
    
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
  const files = findFiles(docsDir);
  console.log(`Found ${files.length} files to process`);
  
  // Print the first few files to verify
  console.log('Sample files:');
  files.slice(0, 5).forEach(file => console.log(`  ${file}`));
  
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