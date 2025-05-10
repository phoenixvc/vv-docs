import { verifyVersionData } from "./verify-version-data"

async function main() {
  try {
    const result = await verifyVersionData()

    if (result.success) {
      console.log("✅ Version data verification passed")
      process.exit(0)
    } else {
      console.error("❌ Version data verification failed")
      process.exit(1)
    }
  } catch (error) {
    console.error("Error running verification:", error)
    process.exit(1)
  }
}

main()
