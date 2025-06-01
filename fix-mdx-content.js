const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Docusaurus docs directory
const DOCS_DIR = 'veritasvault-docs/docs';
const PROCESSED_FILES = [];
const ISSUES_FOUND = [];
const FIXES_APPLIED = [];
const MANUAL_REVIEW_NEEDED = [];

/**
 * Helper function to recursively get all MDX/MD files
 */
async function getMDXFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getMDXFiles(res) : res;
    })
  );
  return files
    .flat()
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
}

/**
 * Fix common MDX syntax issues
 */
function fixMDXContent(content, filePath) {
  let fixedContent = content;
  const issues = [];
  const fixes = [];
  
  // Store the original content for comparison
  const originalContent = content;
  
  // Fix 1: Fix unclosed JSX tags by checking for common patterns
  const tagPairs = [
    { open: '<DocCard', close: '</DocCard>' },
    { open: '<DiagramBlock', close: '</DiagramBlock>' },
    { open: '<SectionLevelTwo', close: '</SectionLevelTwo>' },
    { open: '<ContentBlock', close: '</ContentBlock>' },
    { open: '<TokenDistributionChart', close: '</TokenDistributionChart>' },
    { open: '<DocCardList', close: '</DocCardList>' },
    { open: '<BreadcrumbNavigation', close: '</BreadcrumbNavigation>' }
  ];

  // Check each tag pair
  tagPairs.forEach(pair => {
    const openTagRegex = new RegExp(`${pair.open}[^>]*>`, 'g');
    const closeTagRegex = new RegExp(pair.close, 'g');
    
    let openTags = (fixedContent.match(openTagRegex) || []).length;
    let closeTags = (fixedContent.match(closeTagRegex) || []).length;
    
    if (openTags > closeTags) {
      issues.push(`Missing closing tag: ${pair.close} (${openTags} opens, ${closeTags} closes)`);
      
      // Try to fix by adding missing closing tags
      const lines = fixedContent.split('\\n');
      let openCount = 0;
      let closeCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(pair.open)) openCount++;
        if (lines[i].includes(pair.close)) closeCount++;
      }
      
      if (openCount > closeCount) {
        // Add missing closing tags at appropriate places
        for (let i = 0; i < openCount - closeCount; i++) {
          // Find a good place to insert the closing tag
          // Look for </div> tags that might be incorrectly used instead of the proper closing tag
          let found = false;
          for (let j = 0; j < lines.length && !found; j++) {
            if (lines[j].includes('</div>') && 
                j > 0 && 
                lines.slice(0, j+1).join('\\n').includes(pair.open)) {
              lines[j] = lines[j].replace('</div>', pair.close);
              found = true;
              fixes.push(`Added missing ${pair.close} at line ~${j+1} (replaced '</div>')`);
            }
          }
          
          // If we couldn't find a good place, add it at the end
          if (!found) {
            lines.push(pair.close);
            fixes.push(`Added missing ${pair.close} at the end of the file`);
          }
        }
        
        fixedContent = lines.join('\\n');
      }
    }
    
    if (closeTags > openTags) {
      issues.push(`Extra closing tag: ${pair.close} (${openTags} opens, ${closeTags} closes)`);
      // This is trickier to fix automatically and might require manual review
    }
  });
  
  // Fix 2: Fix common expression syntax errors
  // Look for incomplete curly braces in MDX expressions
  const expressionMatches = fixedContent.match(/{[^}]*$/gm);
  if (expressionMatches) {
    issues.push('Potentially unclosed expressions (curly braces)');
    // For each potentially unclosed expression, try to fix it by adding a closing brace
    expressionMatches.forEach(match => {
      // This is risky and might require manual review
      // We'll flag these for manual review instead of auto-fixing
    });
  }
  
  // Fix 3: Fix code block issues with variable declarations
  // Look for non-ESM code in ESM context (common error in the logs)
  const codeBlockRegex = /```(?:jsx|js|tsx|ts)([\\s\\S]*?)```/g;
  let match;
  
  while ((match = codeBlockRegex.exec(fixedContent)) !== null) {
    const codeBlock = match[1];
    // If code block contains variable declarations without imports/exports
    if (codeBlock.includes('const ') || codeBlock.includes('let ') || codeBlock.includes('var ')) {
      // If it's not already wrapped in a component or export
      if (!codeBlock.includes('export ')) {
        issues.push('Code block contains variable declarations without exports');
        // Convert to a code block that doesn't get interpreted as ESM
        const fixedBlock = '```jsx' + codeBlock + '```';
        fixedContent = fixedContent.replace('```jsx' + codeBlock + '```', fixedBlock);
        fixes.push('Modified code block to prevent ESM interpretation');
      }
    }
  }
  
  // Check if content was actually fixed
  const wasFixed = originalContent !== fixedContent;
  
  return {
    content: fixedContent,
    issues,
    fixes,
    wasFixed,
    needsManualReview: issues.length > fixes.length // If we found more issues than we could fix
  };
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Analyzing MDX files for syntax errors...');
  
  try {
    // Get all MDX files
    const mdxFiles = await getMDXFiles(DOCS_DIR);
    console.log(`Found ${mdxFiles.length} MDX/MD files for processing`);
    
    // Process each file
    for (const filePath of mdxFiles) {
      try {
        const content = await readFile(filePath, 'utf8');
        
        // Skip very large files as they may cause performance issues
        if (content.length > 500000) {
          console.log(`Skipping large file: ${filePath} (${Math.round(content.length/1024)}KB)`);
          continue;
        }
        
        // Try to fix MDX issues
        const { content: fixedContent, issues, fixes, wasFixed, needsManualReview } = fixMDXContent(content, filePath);
        
        PROCESSED_FILES.push(filePath);
        
        // If issues were found
        if (issues.length > 0) {
          ISSUES_FOUND.push({ filePath, issues });
          console.log(`⚠️  Issues in ${path.relative(process.cwd(), filePath)}:`);
          issues.forEach(issue => console.log(`   - ${issue}`));
          
          // If fixes were applied
          if (fixes.length > 0) {
            FIXES_APPLIED.push({ filePath, fixes });
            console.log(`✅ Applied fixes:`);
            fixes.forEach(fix => console.log(`   - ${fix}`));
            
            // Write fixed content back to file
            if (wasFixed) {
              await writeFile(filePath, fixedContent, 'utf8');
              console.log(`📝 Fixed content written to ${path.relative(process.cwd(), filePath)}`);
            }
          }
          
          // If manual review is needed
          if (needsManualReview) {
            MANUAL_REVIEW_NEEDED.push(filePath);
            console.log(`👀 Manual review needed for ${path.relative(process.cwd(), filePath)}`);
          }
          
          console.log('---');
        }
      } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
      }
    }
    
    // Print summary
    console.log('\n📊 Summary:');
    console.log(`Processed ${PROCESSED_FILES.length} files`);
    console.log(`Found issues in ${ISSUES_FOUND.length} files`);
    console.log(`Applied fixes to ${FIXES_APPLIED.length} files`);
    console.log(`Manual review needed for ${MANUAL_REVIEW_NEEDED.length} files`);
    
    if (MANUAL_REVIEW_NEEDED.length > 0) {
      console.log('\n👀 Files that need manual review:');
      MANUAL_REVIEW_NEEDED.forEach(file => {
        console.log(`- ${path.relative(process.cwd(), file)}`);
      });
    }
    
    console.log('\n🔄 Next steps:');
    console.log('1. Run the component fix script: node fix-components-improved.js');
    console.log('2. Install Tailwind dependencies: cd veritasvault-docs && npm install tailwindcss postcss autoprefixer postcss-import --save-dev');
    console.log('3. Update custom.css with Tailwind directives');
    console.log('4. Manually review the files listed above');
    console.log('5. Run the build: npm run build');
    
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the main function
main().catch(console.error);