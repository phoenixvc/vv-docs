#!/usr/bin/env node

/**
 * Script to update internal links across all documentation files
 * This script scans all markdown and MDX files in the docs directory
 * and updates internal links to match the Docusaurus URL structure
 */

import fs from "fs"
import path from "path"
import glob from "glob"
import chalk from "chalk"

// Configuration
const DOCS_DIR = path.join(process.cwd(), "docs")
const LINK_PATTERNS = [
  // Regex patterns to match different types of internal links
  /\[([^\]]+)\]$$\/([^)]+)$$/g, // Markdown links with absolute paths: [Text](/path/to/page)
  /\[([^\]]+)\]$$\.\.\/([^)]+)$$/g, // Markdown links with relative paths: [Text](../path/to/page)
  /\[([^\]]+)\]$$\.\/([^)]+)$$/g, // Markdown links with relative paths: [Text](./path/to/page)
  /href="\/([^"]+)"/g, // HTML links with absolute paths: href="/path/to/page"
  /href="\.\.\/([^"]+)"/g, // HTML links with relative paths: href="../path/to/page"
  /href="\.\/([^"]+)"/g, // HTML links with relative paths: href="./path/to/page"
  /to="\/([^"]+)"/g, // React Router links: to="/path/to/page"
  /to="\.\.\/([^"]+)"/g, // React Router links: to="../path/to/page"
  /to="\.\/([^"]+)"/g, // React Router links: to="./path/to/page"
]

// URL mapping from Next.js to Docusaurus
const URL_MAPPING = {
  // Root pages
  page: "docs",
  architecture: "docs/architecture",
  tokenomics: "docs/tokenomics",
  security: "docs/security",
  "finance-models": "docs/finance",
  "technical-infrastructure": "docs/technical",
  "governance-framework": "docs/governance",
  "implementation-roadmap": "docs/roadmap",
  "gaming-technologies": "docs/gaming",

  // Nested pages
  "architecture/overview": "docs/architecture/overview",
  "architecture/layers": "docs/architecture/layers",
  "architecture/diagrams": "docs/architecture/diagrams",
  "tokenomics/distribution": "docs/tokenomics/distribution",
  "tokenomics/utility": "docs/tokenomics/utility",
  "tokenomics/economics": "docs/tokenomics/economics",
  "tokenomics/governance": "docs/tokenomics/governance",
  "finance-models/monte-carlo": "docs/finance/monte-carlo",
  "finance-models/factors": "docs/finance/factors",
  "finance-models/black-litterman": "docs/finance/black-litterman",
  "finance-models/yield": "docs/finance/yield",
  "security/threat-modeling": "docs/security/threat-modeling",
  "security/protocols": "docs/security/protocols",
  "security/audit-framework": "docs/security/audit-framework",
  "security/diagram": "docs/security/diagram",

  // Special cases
  "pdf-preview": "docs/pdf",
  "tokenomics-download": "docs/tokenomics/download",
  "admin/versions": "docs/admin/versions",
  "document-versions": "docs/versions",

  // Integration pages
  integrations: "docs/integrations",
  "integrations/data-providers": "docs/integrations/data",
  "integrations/wallet-integrations": "docs/integrations/wallets",
  "integrations/blockchain-integrations": "docs/integrations/blockchain",
  "integrations/risk-management": "docs/integrations/risk",

  // Contributing pages
  "contributing/style": "docs/contributing/style",
  "contributing/templates": "docs/contributing/templates",
  "contributing/review": "docs/contributing/review",
  "contributing/numbering": "docs/contributing/numbering",
  "contributing/hierarchy": "docs/contributing/hierarchy",

  // Migration pages
  "migration/integration": "docs/migration/integration",
  "migration/checklist": "docs/migration/checklist",
  "migration/setup": "docs/migration/setup",
  "migration/theme": "docs/migration/theme",
  "migration/organization": "docs/migration/organization",
  "migration/audit": "docs/migration/audit",
  "migration/deployment": "docs/migration/deployment",
  "migration/workflow": "docs/migration/workflow",
  "migration/components": "docs/migration/components",
}

// Function to update links in a file
function updateLinksInFile(filePath: string): { updated: boolean; changes: number } {
  let content = fs.readFileSync(filePath, "utf8")
  const originalContent = content
  let changes = 0

  // Process each link pattern
  LINK_PATTERNS.forEach((pattern) => {
    content = content.replace(pattern, (match, text, url) => {
      // Skip external links and anchor links
      if (url.startsWith("http") || url.startsWith("#")) {
        return match
      }

      // Remove file extension and trailing slash if present
      const cleanUrl = url.replace(/\.(md|mdx)$/, "").replace(/\/$/, "")

      // Check if we have a mapping for this URL
      for (const [oldPath, newPath] of Object.entries(URL_MAPPING)) {
        if (cleanUrl === oldPath || cleanUrl.startsWith(`${oldPath}/`)) {
          // Replace the old path with the new path
          const updatedUrl = cleanUrl.replace(oldPath, newPath)
          changes++

          // Reconstruct the link based on the original pattern
          if (match.startsWith("[")) {
            return `[${text}](/${updatedUrl})`
          } else if (match.includes("href=")) {
            return `href="/${updatedUrl}"`
          } else if (match.includes("to=")) {
            return `to="/${updatedUrl}"`
          }
        }
      }

      return match
    })
  })

  // Write the updated content back to the file if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf8")
    return { updated: true, changes }
  }

  return { updated: false, changes: 0 }
}

// Main function to process all files
async function updateAllLinks() {
  console.log(chalk.blue("Starting internal link update process..."))

  // Find all markdown and MDX files
  const files = glob.sync("**/*.{md,mdx}", { cwd: DOCS_DIR, absolute: true })

  console.log(chalk.yellow(`Found ${files.length} documentation files to process`))

  let totalUpdatedFiles = 0
  let totalChanges = 0

  // Process each file
  for (const file of files) {
    const relativePath = path.relative(DOCS_DIR, file)
    process.stdout.write(`Processing ${chalk.cyan(relativePath)}... `)

    const { updated, changes } = updateLinksInFile(file)

    if (updated) {
      totalUpdatedFiles++
      totalChanges += changes
      console.log(chalk.green(`Updated ${changes} links`))
    } else {
      console.log(chalk.gray("No changes needed"))
    }
  }

  console.log(chalk.green(`\nCompleted link updates!`))
  console.log(chalk.blue(`Updated ${totalUpdatedFiles} files with ${totalChanges} link changes`))
}

// Run the update process
updateAllLinks().catch((error) => {
  console.error(chalk.red("Error updating links:"), error)
  process.exit(1)
})
