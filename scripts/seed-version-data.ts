import { seedVersionData } from "../lib/version-service"

export async function runSeedVersionData() {
  try {
    console.log("Seeding version data...")
    await seedVersionData()
    console.log("Version data seeded successfully")
    return true
  } catch (error) {
    console.error("Error seeding version data:", error)
    return false
  }
}
