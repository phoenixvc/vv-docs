import { getVersionMetadata } from "../../src/utils/version"

export default async function handler(req, res) {
  try {
    const metadata = await getVersionMetadata()
    return res.status(200).json(metadata)
  } catch (error) {
    console.error("Error fetching version metadata:", error)
    return res.status(500).json({ error: "Failed to fetch version metadata" })
  }
}