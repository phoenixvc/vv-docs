#!/usr/bin/env node

/**
 * Script to run the image path fix process
 */

import { spawn } from "child_process"
import path from "path"

// Path to the fix script
const scriptPath = path.join(process.cwd(), "scripts", "fix-image-paths.ts")

// Run the script with ts-node
const child = spawn("npx", ["ts-node", scriptPath], {
  stdio: "inherit",
  shell: true,
})

// Handle process exit
child.on("exit", (code) => {
  if (code === 0) {
    console.log("Image path fix process completed successfully!")
  } else {
    console.error(`Image path fix process failed with code ${code}`)
    process.exit(code || 1)
  }
})
