const fs = require('fs');
const path = require('path');

// List of files with MDX syntax issues
const filesToFix = [
  'veritasvault-docs/docs/migration/integration/index.mdx',
  'veritasvault-docs/docs/migration/section-numbering-guide.md',
  'veritasvault-docs/docs/migration/style-guide.md',
  'veritasvault-docs/docs/migration/vv/docusaurus-information-architecture.md',
  'veritasvault-docs/docs/migration/vv/metadata-mapping-schema.md'
];

function fixMdxSyntax(filePath) {
  console.log(`Fixing MDX syntax in: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace escaped backticks with proper MDX code blocks
    content = content.replace(/\\`\\`\\`(.*?)\\n([\s\S]*?)\\`\\`\\`/g, (match, language, code) => {
      return '```' + language + '\n' + code + '\n```';
    });
    
    // Fix nested code blocks with template literals
    content = content.replace(/{`([\s\S]*?)<CodeBlock([\s\S]*?){\`([\s\S]*?)}\`}/g, (match, beforeNested, codeBlockProps, codeContent) => {
      return `{
\`${beforeNested}\`
}

<CodeBlock${codeBlockProps}{\`${codeContent}\`}</CodeBlock>`;
    });
    
    // Fix unclosed braces
    content = content.replace(/{([^{}]*$)/g, '{$1}');
    
    // Write fixed content back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    
    return true;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
    return false;
  }
}

// Fix each file
filesToFix.forEach(file => fixMdxSyntax(file));
console.log('MDX syntax fix complete!');