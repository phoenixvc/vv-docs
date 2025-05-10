# Docusaurus Content Migration Workflow

This guide provides a comprehensive workflow for migrating existing documentation to Docusaurus. It covers the entire process from initial content audit to final quality assurance, ensuring a smooth transition to your new documentation system.

## Table of Contents

- [1. Content Audit Process](#1-content-audit-process)
- [2. Content Conversion Tools and Techniques](#2-content-conversion-tools-and-techniques)
- [3. Metadata Mapping Strategies](#3-metadata-mapping-strategies)
- [4. Quality Assurance Process](#4-quality-assurance-process)
- [5. Migration Checklist](#5-migration-checklist)

## 1. Content Audit Process

Before migrating content to Docusaurus, conduct a thorough audit of your existing documentation to understand its structure, identify what needs to be migrated, and plan the new information architecture.

### 1.1 Inventory Existing Content

Create a comprehensive inventory of all existing documentation:

\`\`\`markdown
| Document Name | Current Location | Format | Last Updated | Owner | Migration Priority | Target Location |
|---------------|------------------|--------|--------------|-------|-------------------|----------------|
| Getting Started | /docs/start.html | HTML | 2023-01-15 | Jane Doe | High | /docs/intro |
| API Reference | /api/v1/index.html | HTML | 2023-03-20 | John Smith | High | /docs/api |
| Troubleshooting | /support/issues.pdf | PDF | 2022-11-10 | Support Team | Medium | /docs/troubleshooting |
\`\`\`

#### Additional Considerations for Content Inventory

**Content Quality Assessment**:
- Add columns for "Content Quality" (Good/Needs Update/Outdated) and "Technical Accuracy" (Verified/Needs Review)
- This helps prioritize content that needs updating during migration

**Content Relationships**:
- Track dependencies between documents (e.g., "References Document X")
- Identify content that should be merged or split during migration

**Analytics Integration**:
- Include usage metrics like page views, time on page, and bounce rate
- This data can help prioritize high-impact content

**Automated Inventory Tools**:
- Consider using web crawlers like Screaming Frog to automatically inventory large documentation sites
- Export CMS content to CSV for easier inventory management

**Visual Content Tracking**:
- Add columns for images, diagrams, and videos that need migration
- Note any special formatting or interactive elements

### 1.2 Analyze Content Structure

Examine the structure of your existing documentation:

1. **Identify content hierarchies**: Map out how documents relate to each other
2. **Document cross-references**: Note internal links between documents
3. **Identify reused components**: List components, code samples, or diagrams used across multiple documents

Create a visual map of your content structure:

\`\`\`mermaid
graph TD
    A[Documentation Home] --> B[Getting Started]
    A --> C[User Guide]
    A --> D[API Reference]
    C --> E[Basic Features]
    C --> F[Advanced Features]
    D --> G[Endpoints]
    D --> H[Authentication]
\`\`\`

### 1.3 Define New Information Architecture

Design your new Docusaurus information architecture:

1. **Define categories**: Group related content into logical categories
2. **Plan navigation structure**: Design sidebar navigation for each section
3. **Map redirects**: Plan redirects from old URLs to new ones

Document your new structure in a spreadsheet or diagram:

\`\`\`markdown
- docs/
  - intro/
    - getting-started.md
    - installation.md
  - guides/
    - basic-features/
      - feature-a.md
      - feature-b.md
    - advanced-features/
      - feature-c.md
  - api/
    - overview.md
    - authentication.md
    - endpoints/
      - users.md
      - products.md
\`\`\`

### 1.4 Identify Content Gaps

Compare your current content with the desired state:

1. **Missing documentation**: Identify topics that need new content
2. **Outdated information**: Flag content that needs updating
3. **Redundant content**: Identify duplicate or unnecessary content

Create a gap analysis document:

\`\`\`markdown
| Topic | Current Status | Gap Description | Action Required | Owner |
|-------|---------------|----------------|----------------|-------|
| Mobile SDK | Missing | No documentation for mobile integration | Create new content | Jane Doe |
| API v1 | Outdated | References deprecated endpoints | Update content | John Smith |
| Legacy Features | Redundant | Features no longer supported | Remove content | Support Team |
\`\`\`

## 2. Content Conversion Tools and Techniques

### 2.1 Markdown Conversion

Most content will need to be converted to MDX (Markdown with JSX) for Docusaurus.

#### HTML to Markdown Conversion

For HTML content, use tools like:

1. **Turndown**: JavaScript library for converting HTML to Markdown
   
   \`\`\`bash
   npm install turndown
   \`\`\`

   \`\`\`javascript
   const TurndownService = require('turndown');
   const fs = require('fs');
   
   const turndownService = new TurndownService({
     headingStyle: 'atx',
     codeBlockStyle: 'fenced'
   });
   
   const html = fs.readFileSync('input.html', 'utf8');
   const markdown = turndownService.turndown(html);
   fs.writeFileSync('output.md', markdown);
   \`\`\`

2. **Pandoc**: Command-line tool for document conversion
   
   \`\`\`bash
   pandoc -f html -t markdown_strict input.html -o output.md
   \`\`\`

#### PDF to Markdown Conversion

For PDF documents:

1. Extract text using tools like **pdf-parse**:
   
   \`\`\`bash
   npm install pdf-parse
   \`\`\`

   \`\`\`javascript
   const pdf = require('pdf-parse');
   const fs = require('fs');
   
   const dataBuffer = fs.readFileSync('document.pdf');
   pdf(dataBuffer).then(function(data) {
     // Use data.text for further processing
     fs.writeFileSync('extracted.txt', data.text);
   });
   \`\`\`

2. Manually format the extracted text into Markdown

#### Word to Markdown Conversion

For Microsoft Word documents:

1. Use **mammoth.js**:
   
   \`\`\`bash
   npm install mammoth
   \`\`\`

   \`\`\`javascript
   const mammoth = require('mammoth');
   const fs = require('fs');
   
   mammoth.convertToMarkdown({path: "document.docx"})
     .then(function(result) {
       fs.writeFileSync('output.md', result.value);
     });
   \`\`\`

### 2.2 Batch Conversion Script

For large documentation sets, create a batch conversion script:

\`\`\`javascript
// batch-convert.js
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Configure source and destination directories
const sourceDir = './source-docs';
const destDir = './converted-docs';

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Process HTML files
function processHtmlFiles(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  files.forEach(file => {
    const sourcePath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      // Recursively process subdirectories
      const targetDir = path.join(destDir, path.relative(sourceDir, sourcePath));
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      processHtmlFiles(sourcePath);
    } else if (file.name.endsWith('.html')) {
      // Convert HTML to Markdown
      const html = fs.readFileSync(sourcePath, 'utf8');
      const markdown = turndownService.turndown(html);
      
      // Create relative path for destination
      const relativePath = path.relative(sourceDir, directory);
      const destPath = path.join(destDir, relativePath, file.name.replace('.html', '.md'));
      
      // Write converted file
      fs.writeFileSync(destPath, markdown);
      console.log(`Converted: ${sourcePath} -> ${destPath}`);
    }
  });
}

// Start processing
processHtmlFiles(sourceDir);
\`\`\`

### 2.3 Converting to MDX

After converting to Markdown, you may need to adapt content for MDX:

1. **Replace HTML components with JSX**:
   
   Before:
   \`\`\`html
   <div class="note">
     <p>This is an important note.</p>
   </div>
   \`\`\`
   
   After:
   \`\`\`jsx
   <Note>
     This is an important note.
   </Note>
   \`\`\`

2. **Create custom MDX components** for repeated patterns:
   
   \`\`\`jsx
   // components/Note.js
   export default function Note({children}) {
     return (
       <div className="note">
         {children}
       </div>
     );
   }
   \`\`\`

3. **Use the MDX Playground** to test your MDX syntax: [MDX Playground](https://mdxjs.com/playground/)

### 2.4 Handling Code Blocks

Ensure code blocks are properly formatted for Docusaurus:

1. **Add language identifiers** for syntax highlighting:
   
   \`\`\`markdown
   \`\`\`javascript
   function example() {
     return 'Hello, world!';
   }
   \`\`\`
   \`\`\`

2. **Use live code blocks** where appropriate:
   
   \`\`\`jsx
   \`\`\`jsx live
   function Button() {
     return (
       <button>Click me!</button>
     );
   }
   \`\`\`
   \`\`\`

3. **Add titles to code blocks**:
   
   \`\`\`markdown
   \`\`\`javascript title="src/example.js"
   function example() {
     return 'Hello, world!';
   }
   \`\`\`
   \`\`\`

## 3. Metadata Mapping Strategies

### 3.1 Docusaurus Frontmatter

Map your existing metadata to Docusaurus frontmatter:

\`\`\`markdown
---
id: getting-started
title: Getting Started with Our Product
description: Learn how to get started with our product in minutes
keywords: [tutorial, getting started, installation]
sidebar_label: Getting Started
sidebar_position: 1
---
\`\`\`

### 3.2 Creating a Metadata Mapping Schema

Create a schema to map your existing metadata to Docusaurus:

\`\`\`markdown
| Original Metadata | Docusaurus Frontmatter | Notes |
|-------------------|------------------------|-------|
| Title | title | Direct mapping |
| Description | description | Direct mapping |
| Keywords | keywords | Convert to array |
| Category | sidebar_category | Map to sidebar category |
| Order | sidebar_position | Convert to number |
| Author | custom_author | Custom field |
| Last Updated | custom_last_updated | Custom field, format as YYYY-MM-DD |
\`\`\`

### 3.3 Automated Frontmatter Generation

Create a script to automatically generate frontmatter:

\`\`\`javascript
// add-frontmatter.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

// Configure directory with Markdown files
const docsDir = './converted-docs';

// Map of original metadata to Docusaurus frontmatter
const metadataMap = {
  'Original-Title': 'title',
  'Original-Description': 'description',
  'Original-Keywords': 'keywords',
  'Original-Category': 'sidebar_category',
  'Original-Order': 'sidebar_position',
  // Add more mappings as needed
};

// Process Markdown files
function processMarkdownFiles(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  files.forEach(file => {
    const filePath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      // Recursively process subdirectories
      processMarkdownFiles(filePath);
    } else if (file.name.endsWith('.md')) {
      // Read file content
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Parse existing frontmatter if any
      const { data: existingFrontmatter, content: markdownContent } = matter(content);
      
      // Create new frontmatter based on mapping
      const newFrontmatter = {};
      
      // Example: Extract title from first heading if not in frontmatter
      if (!existingFrontmatter.title) {
        const titleMatch = markdownContent.match(/^# (.*)$/m);
        if (titleMatch) {
          newFrontmatter.title = titleMatch[1];
        }
      }
      
      // Example: Generate ID from filename
      newFrontmatter.id = path.basename(file.name, '.md');
      
      // Example: Set sidebar position based on filename order
      const positionMatch = file.name.match(/^(\d+)-/);
      if (positionMatch) {
        newFrontmatter.sidebar_position = parseInt(positionMatch[1], 10);
      }
      
      // Merge existing and new frontmatter
      const mergedFrontmatter = {
        ...existingFrontmatter,
        ...newFrontmatter
      };
      
      // Create new file content with updated frontmatter
      const newContent = matter.stringify(markdownContent, mergedFrontmatter);
      
      // Write updated file
      fs.writeFileSync(filePath, newContent);
      console.log(`Updated frontmatter: ${filePath}`);
    }
  });
}

// Start processing
processMarkdownFiles(docsDir);
\`\`\`

### 3.4 Custom Metadata Fields

For custom metadata needs:

1. **Define custom fields** in frontmatter:
   
   \`\`\`markdown
   ---
   title: Getting Started
   custom_author: Jane Doe
   custom_reviewed_by: John Smith
   custom_last_reviewed: 2023-04-15
   ---
   \`\`\`

2. **Access custom fields** in your Docusaurus theme:
   
   \`\`\`jsx
   // Create a custom component to display metadata
   export default function MetadataDisplay({frontMatter}) {
     return (
       <div className="doc-metadata">
         {frontMatter.custom_author && (
           <div>Author: {frontMatter.custom_author}</div>
         )}
         {frontMatter.custom_last_reviewed && (
           <div>Last reviewed: {frontMatter.custom_last_reviewed}</div>
         )}
       </div>
     );
   }
   \`\`\`

3. **Add the component** to your doc page template

## 4. Quality Assurance Process

### 4.1 Content Validation

Implement a systematic validation process:

1. **Automated checks**:
   - Run a markdown linter to check syntax
   - Validate frontmatter schema
   - Check for broken internal links

   \`\`\`bash
   # Install markdown linter
   npm install -g markdownlint-cli
   
   # Run linter on all markdown files
   markdownlint "docs/**/*.md" --config .markdownlint.json
   \`\`\`

2. **Create a custom validation script**:

   \`\`\`javascript
   // validate-docs.js
   const fs = require('fs');
   const path = require('path');
   const matter = require('gray-matter');
   
   const docsDir = './docs';
   const issues = [];
   
   function validateDocs(directory) {
     const files = fs.readdirSync(directory, { withFileTypes: true });
     
     files.forEach(file => {
       const filePath = path.join(directory, file.name);
       
       if (file.isDirectory()) {
         validateDocs(filePath);
       } else if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
         validateFile(filePath);
       }
     });
   }
   
   function validateFile(filePath) {
     const content = fs.readFileSync(filePath, 'utf8');
     const { data: frontmatter, content: markdownContent } = matter(content);
     
     // Check required frontmatter fields
     if (!frontmatter.title) {
       issues.push(`Missing title in ${filePath}`);
     }
     
     // Check for empty sections
     if (markdownContent.match(/##\s+.*\n+##\s+/)) {
       issues.push(`Empty section detected in ${filePath}`);
     }
     
     // Check for broken internal links
     const internalLinks = [...markdownContent.matchAll(/\[.*?\]$$(\.\/.*?)$$/g)];
     internalLinks.forEach(match => {
       const linkPath = match[1];
       const resolvedPath = path.resolve(path.dirname(filePath), linkPath);
       if (!fs.existsSync(resolvedPath)) {
         issues.push(`Broken internal link in ${filePath}: ${linkPath}`);
       }
     });
   }
   
   validateDocs(docsDir);
   
   if (issues.length > 0) {
     console.error('Documentation validation issues:');
     issues.forEach(issue => console.error(`- ${issue}`));
     process.exit(1);
   } else {
     console.log('Documentation validation passed!');
   }
   \`\`\`

### 4.2 Visual Comparison

Compare the visual appearance of original and migrated content:

1. **Side-by-side comparison**:
   - Take screenshots of original pages
   - Compare with Docusaurus preview
   - Document visual differences

2. **Create a visual comparison checklist**:

   \`\`\`markdown
   | Element | Original | Migrated | Status | Notes |
   |---------|----------|----------|--------|-------|
   | Headings | Screenshot | Screenshot | ✅ | Font size slightly larger |
   | Code blocks | Screenshot | Screenshot | ⚠️ | Syntax highlighting different |
   | Tables | Screenshot | Screenshot | ❌ | Formatting issues |
   | Images | Screenshot | Screenshot | ✅ | Responsive in new version |
   \`\`\`

### 4.3 Content Review Process

Implement a structured review process:

1. **Technical accuracy review**:
   - Subject matter experts verify technical content
   - Check code examples work as expected
   - Verify API references are accurate

2. **Editorial review**:
   - Check grammar and spelling
   - Ensure consistent terminology
   - Verify style guide compliance

3. **User experience review**:
   - Test navigation paths
   - Verify search functionality
   - Check cross-references and links

4. **Create a review tracking system**:

   \`\`\`markdown
   | Document | Technical Review | Editorial Review | UX Review | Ready for Publication |
   |----------|-----------------|-----------------|-----------|----------------------|
   | Getting Started | ✅ Jane (2023-05-10) | ✅ John (2023-05-12) | ✅ Sarah (2023-05-15) | ✅ |
   | API Reference | ✅ Mike (2023-05-11) | ⚠️ In Progress | ❌ Not Started | ❌ |
   \`\`\`

### 4.4 Automated Testing

Implement automated tests for your documentation:

1. **Link validation**:
   
   \`\`\`javascript
   // check-links.js
   const fs = require('fs');
   const path = require('path');
   const { exec } = require('child_process');
   
   // Run link checker on the built site
   exec('npx broken-link-checker http://localhost:3000 --recursive', (error, stdout, stderr) => {
     if (error) {
       console.error(`Link checker error: ${error}`);
       return;
     }
     console.log(stdout);
   });
   \`\`\`

2. **Accessibility testing**:
   
   \`\`\`javascript
   // check-a11y.js
   const { exec } = require('child_process');
   
   // Run accessibility checker on the built site
   exec('npx pa11y-ci http://localhost:3000', (error, stdout, stderr) => {
     if (error) {
       console.error(`Accessibility checker error: ${error}`);
       return;
     }
     console.log(stdout);
   });
   \`\`\`

3. **Add tests to CI/CD pipeline**:
   
   \`\`\`yaml
   # .github/workflows/docs-tests.yml
   name: Documentation Tests
   
   on:
     push:
       branches: [main]
     pull_request:
       branches: [main]
   
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 16
             cache: npm
   
         - name: Install dependencies
           run: npm ci
   
         - name: Build documentation
           run: npm run build
   
         - name: Start local server
           run: npm run serve &
           
         - name: Wait for server
           run: sleep 5
   
         - name: Run markdown linter
           run: npx markdownlint "docs/**/*.md" --config .markdownlint.json
   
         - name: Check links
           run: npx broken-link-checker http://localhost:3000 --recursive
   
         - name: Check accessibility
           run: npx pa11y-ci http://localhost:3000
   \`\`\`

## 5. Migration Checklist

Use this checklist to track your migration progress:

### 5.1 Pre-Migration

- [ ] Complete content inventory
- [ ] Define new information architecture
- [ ] Set up Docusaurus project
- [ ] Create content conversion scripts
- [ ] Define metadata mapping schema
- [ ] Set up quality assurance tools
- [ ] Create redirects plan

### 5.2 During Migration

- [ ] Convert content to Markdown/MDX
- [ ] Apply metadata mapping
- [ ] Migrate images and assets
- [ ] Update internal links
- [ ] Implement custom components
- [ ] Configure sidebar navigation
- [ ] Set up versioning (if needed)

### 5.3 Post-Migration

- [ ] Run automated validation tests
- [ ] Conduct visual comparison
- [ ] Complete technical review
- [ ] Complete editorial review
- [ ] Test search functionality
- [ ] Implement redirects
- [ ] Verify analytics integration
- [ ] Final user experience testing

### 5.4 Launch Preparation

- [ ] Create deployment pipeline
- [ ] Set up monitoring
- [ ] Prepare announcement
- [ ] Update documentation links in products
- [ ] Train team on new documentation system
- [ ] Create maintenance plan

## Conclusion

A successful content migration to Docusaurus requires careful planning, systematic execution, and thorough quality assurance. By following this workflow, you can ensure your documentation maintains its quality while taking advantage of Docusaurus's powerful features.

Remember that migration is an opportunity to improve your documentation, not just move it to a new platform. Use this process to enhance content organization, improve user experience, and establish sustainable documentation practices for the future.

## Additional Resources

- [Docusaurus Migration Guide](https://docusaurus.io/docs/migration)
- [MDX Documentation](https://mdxjs.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Content Strategy for Documentation](https://www.writethedocs.org/guide/docs-as-code/)
