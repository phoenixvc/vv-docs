#!/usr/bin/env node

/**
 * Metadata Extraction Script for Markdown Files
 *
 * This script extracts frontmatter metadata from markdown files and outputs
 * it in a structured JSON format. It can process individual files or entire
 * directories recursively.
 *
 * Usage:
 *   node extract-metadata.js <path> [--output=<output-file>] [--format=json|csv|yaml]
 *
 * Examples:
 *   node extract-metadata.js ./docs
 *   node extract-metadata.js ./docs/architecture --output=metadata.json
 *   node extract-metadata.js ./docs/tokenomics --format=csv --output=tokenomics-metadata.csv
 */

const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")
const yaml = require("js-yaml")
const { Parser } = require("json2csv")

// Configuration
const DEFAULT_OUTPUT_FORMAT = "json"
const DEFAULT_OUTPUT_FILE = "metadata-output.json"

// Parse command line arguments
const args = process.argv.slice(2)
if (args.length === 0) {
  console.error("Error: Please provide a path to markdown files")
  process.exit(1)
}

const inputPath = args[0]
let outputFormat = DEFAULT_OUTPUT_FORMAT
let outputFile = DEFAULT_OUTPUT_FILE

// Parse optional arguments
args.slice(1).forEach((arg) => {
  if (arg.startsWith("--output=")) {
    outputFile = arg.split("=")[1]
  } else if (arg.startsWith("--format=")) {
    outputFormat = arg.split("=")[1].toLowerCase()
    if (!["json", "csv", "yaml"].includes(outputFormat)) {
      console.error(`Error: Unsupported output format: ${outputFormat}`)
      process.exit(1)
    }
  }
})

// Ensure output file extension matches format
if (outputFormat === "json" && !outputFile.endsWith(".json")) {
  outputFile += ".json"
} else if (outputFormat === "csv" && !outputFile.endsWith(".csv")) {
  outputFile += ".csv"
} else if (outputFormat === "yaml" && !outputFile.endsWith(".yml") && !outputFile.endsWith(".yaml")) {
  outputFile += ".yaml"
}

/**
 * Extract metadata from a markdown file
 * @param {string} filePath - Path to the markdown file
 * @returns {Object} - Extracted metadata with file path
 */
function extractMetadataFromFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    // Calculate additional metadata
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200) // Assuming 200 words per minute

    // Add file information
    const result = {
      filePath: filePath,
      fileName: path.basename(filePath),
      directory: path.dirname(filePath),
      ...data,
      wordCount,
      readingTime,
    }

    return result
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message)
    return {
      filePath,
      error: error.message,
    }
  }
}

/**
 * Process a directory recursively to find all markdown files
 * @param {string} dirPath - Path to the directory
 * @returns {Array} - Array of metadata objects
 */
function processDirectory(dirPath) {
  const results = []

  const items = fs.readdirSync(dirPath)

  for (const item of items) {
    const itemPath = path.join(dirPath, item)
    const stats = fs.statSync(itemPath)

    if (stats.isDirectory()) {
      // Recursively process subdirectories
      results.push(...processDirectory(itemPath))
    } else if (stats.isFile() && (item.endsWith(".md") || item.endsWith(".mdx"))) {
      // Process markdown files
      const metadata = extractMetadataFromFile(itemPath)
      results.push(metadata)
    }
  }

  return results
}

/**
 * Main function to extract metadata and save to output file
 */
function main() {
  console.log(`Processing ${inputPath}...`)

  let allMetadata = []

  try {
    const stats = fs.statSync(inputPath)

    if (stats.isDirectory()) {
      allMetadata = processDirectory(inputPath)
    } else if (stats.isFile() && (inputPath.endsWith(".md") || inputPath.endsWith(".mdx"))) {
      allMetadata = [extractMetadataFromFile(inputPath)]
    } else {
      console.error("Error: Input path must be a markdown file or directory")
      process.exit(1)
    }

    // Output the results
    if (allMetadata.length === 0) {
      console.log("No markdown files found.")
      return
    }

    console.log(`Found ${allMetadata.length} markdown files.`)

    // Format and save the output
    let outputContent = ""

    if (outputFormat === "json") {
      outputContent = JSON.stringify(allMetadata, null, 2)
    } else if (outputFormat === "csv") {
      const fields = Object.keys(allMetadata[0])
      const parser = new Parser({ fields })
      outputContent = parser.parse(allMetadata)
    } else if (outputFormat === "yaml") {
      outputContent = yaml.dump(allMetadata)
    }

    fs.writeFileSync(outputFile, outputContent)
    console.log(`Metadata saved to ${outputFile}`)

    // Print summary of metadata fields
    const metadataFields = new Set()
    allMetadata.forEach((item) => {
      Object.keys(item).forEach((key) => metadataFields.add(key))
    })

    console.log("\nMetadata fields found:")
    console.log(Array.from(metadataFields).join(", "))
  } catch (error) {
    console.error("Error:", error.message)
    process.exit(1)
  }
}

// Run the script
main()
