#!/usr/bin/env node

/**
 * Script to run the internal link update process
 */

import { spawn } from "child_process"
import path from "path"

// Path to the update script
const scriptPath = path.join(process.cwd(), "scripts", "update-internal-links.ts")

// Run the script with ts-node
const child = spawn("npx", ["ts-node", scriptPath], {
  stdio: "inherit",
  shell: true,
})

// Handle process exit
child.on("exit", (code) => {
  if (code === 0) {
    console.log("Link update process completed successfully!")
  } else {
    console.error(`Link update process failed with code ${code}`)
    process.exit(code || 1)
  }
})
