#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const VV_DOCS_SOURCE = '/home/ubuntu/repos/vv/src/vv.Domain/Docs';
const VV_DOCS_TARGET = '/home/ubuntu/repos/vv-docs/veritasvault-docs/docs/domains';

function convertFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return content;
  }
  
  const [, frontmatter, body] = match;
  const lines = frontmatter.split('\n');
  const converted = [];
  
  converted.push('---');
  
  for (const line of lines) {
    if (line.includes('document_type:')) {
      const type = line.split(':')[1].trim().replace(/"/g, '');
      converted.push(`sidebar_position: 1`);
      converted.push(`custom_doc_type: "${type}"`);
    } else if (line.includes('classification:')) {
      const classification = line.split(':')[1].trim().replace(/"/g, '');
      converted.push(`tags: ["${classification}"]`);
    } else if (line.includes('status:')) {
      const status = line.split(':')[1].trim().replace(/"/g, '');
      converted.push(`draft: ${status === 'draft'}`);
    } else if (line.includes('version:')) {
      converted.push(line);
    } else if (line.includes('last_updated:')) {
      converted.push(line);
    }
  }
  
  converted.push('---');
  converted.push('');
  
  return converted.join('\n') + body;
}

function copyDomainDocs() {
  if (!fs.existsSync(VV_DOCS_SOURCE)) {
    console.log('VV domain docs source not found, skipping integration');
    return;
  }
  
  if (!fs.existsSync(VV_DOCS_TARGET)) {
    fs.mkdirSync(VV_DOCS_TARGET, { recursive: true });
  }
  
  const domains = ['Core', 'Risk', 'Asset', 'Integration', 'Governance', 'AI', 'Gateway', 'Crosscutting'];
  
  for (const domain of domains) {
    const sourcePath = path.join(VV_DOCS_SOURCE, 'Domains', domain);
    const targetPath = path.join(VV_DOCS_TARGET, domain.toLowerCase());
    
    if (fs.existsSync(sourcePath)) {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      
      const files = fs.readdirSync(sourcePath, { recursive: true });
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const sourceFile = path.join(sourcePath, file);
          const targetFile = path.join(targetPath, file);
          
          const content = fs.readFileSync(sourceFile, 'utf8');
          const convertedContent = convertFrontmatter(content);
          
          const targetDir = path.dirname(targetFile);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          
          fs.writeFileSync(targetFile, convertedContent);
          console.log(`Copied: ${file} to ${domain.toLowerCase()}`);
        }
      }
    }
  }
  
  const architectureSource = path.join(VV_DOCS_SOURCE, 'ARCHITECTURE.md');
  const securitySource = path.join(VV_DOCS_SOURCE, 'SECURITY.md');
  
  if (fs.existsSync(architectureSource)) {
    const content = fs.readFileSync(architectureSource, 'utf8');
    const converted = convertFrontmatter(content);
    fs.writeFileSync(path.join(VV_DOCS_TARGET, 'architecture.md'), converted);
    console.log('Copied: ARCHITECTURE.md');
  }
  
  if (fs.existsSync(securitySource)) {
    const content = fs.readFileSync(securitySource, 'utf8');
    const converted = convertFrontmatter(content);
    fs.writeFileSync(path.join(VV_DOCS_TARGET, 'security.md'), converted);
    console.log('Copied: SECURITY.md');
  }
}

if (require.main === module) {
  copyDomainDocs();
}

module.exports = { copyDomainDocs, convertFrontmatter };
