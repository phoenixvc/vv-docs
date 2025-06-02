#!/usr/bin/env node

/**
 * Script to fix image paths for Docusaurus migration
 * This script:
 * 1. Moves images from /public to /static
 * 2. Updates all references in MDX and TSX files
 */

import fs from "fs"
import path from "path"
import glob from "glob"
import chalk from "chalk"

// Configuration
const PUBLIC_DIR = path.join(process.cwd(), "public")
const STATIC_DIR = path.join(process.cwd(), "static")
const DOCS_DIR = path.join(process.cwd(), "docs")
const SRC_DIR = path.join(process.cwd(), "src")

// Ensure static directory exists
if (!fs.existsSync(STATIC_DIR)) {
  fs.mkdirSync(STATIC_DIR, { recursive: true })
  console.log(chalk.green("Created static directory"))
}

// Function to move files from public to static
function movePublicToStatic() {
  console.log(chalk.blue("Moving files from public to static..."))

  // Get all files in public directory
  const files = glob.sync("**/*", {
    cwd: PUBLIC_DIR,
    nodir: true,
    absolute: false,
  })

  let movedCount = 0

  for (const file of files) {
    const sourcePath = path.join(PUBLIC_DIR, file)
    const targetPath = path.join(STATIC_DIR, file)

    // Create directory if it doesn't exist
    const targetDir = path.dirname(targetPath)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Copy file
    try {
      fs.copyFileSync(sourcePath, targetPath)
      movedCount++
      console.log(chalk.green(`Moved: ${file}`))
    } catch (error) {
      console.error(chalk.red(`Error moving ${file}:`), error)
    }
  }

  console.log(chalk.green(`Moved ${movedCount} files from public to static`))
}

// Function to update image references in files
function updateImageReferences() {
  console.log(chalk.blue("Updating image references..."))

  // Patterns to find image references
  const patterns = [
    // Find all MDX and TSX files
    path.join(DOCS_DIR, "**/*.{mdx,md}"),
    path.join(SRC_DIR, "**/*.{tsx,ts,jsx,js}"),
  ]

  let updatedCount = 0
  let fileCount = 0

  // Process each file pattern
  for (const pattern of patterns) {
    const files = glob.sync(pattern)

    for (const file of files) {
      let content = fs.readFileSync(file, "utf8")
      const originalContent = content

      // Replace /public/ references with / (root)
      content = content.replace(/['"]\/public\//g, '"/')

      // Replace direct /image.png references
      content = content.replace(/['"]\/(diagrams|images)\/([^'"]+)['"]/g, '"/$1/$2"')

      // Replace references to specific image files we know about
      const knownImages = [
        "token-distribution-pie-chart.png",
        "governance-workflow-flowchart.png",
        "network-topology.png",
        "token-vesting-timeline.png",
        "token-burn-rate-graph.png",
        "blockchain-token-circulation.png",
      ]

      for (const img of knownImages) {
        content = content.replace(new RegExp(`['"]\\/${img}['"]`, "g"), `"/${img}"`)
      }

      // For Docusaurus, we need to use the @site alias for static content in MDX
      if (file.endsWith(".mdx") || file.endsWith(".md")) {
        content = content.replace(/["']\/(diagrams|images)\/([^"']+)["']/g, '"@site/static/$1/$2"')
        content = content.replace(/["']\/([\w-]+\.png)["']/g, '"@site/static/$1"')
      }

      // Write changes if content was modified
      if (content !== originalContent) {
        fs.writeFileSync(file, content, "utf8")
        updatedCount++
        console.log(chalk.green(`Updated references in: ${path.relative(process.cwd(), file)}`))
      }

      fileCount++
    }
  }

  console.log(chalk.green(`Updated ${updatedCount} files out of ${fileCount} processed`))
}

// Main function
async function main() {
  console.log(chalk.yellow("Starting image path fix process..."))

  // Move files from public to static
  movePublicToStatic()

  // Update references in files
  updateImageReferences()

  console.log(chalk.green("Image path fix process completed!"))
}

// Run the script
main().catch((error) => {
  console.error(chalk.red("Error:"), error)
  process.exit(1)
})
