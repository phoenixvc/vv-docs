import { runSeedVersionData } from "./seed-version-data"

async function main() {
  try {
    const success = await runSeedVersionData()

    if (success) {
      console.log("✅ Version data seeded successfully")
      process.exit(0)
    } else {
      console.error("❌ Version data seeding failed")
      process.exit(1)
    }
  } catch (error) {
    console.error("Error running seed:", error)
    process.exit(1)
  }
}

main()
