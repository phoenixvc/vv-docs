import { createDocumentVersion, getAllDocumentVersions, getDocumentVersionsByType } from "../../src/utils/version-service"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const documentType = req.query.type
      
      if (documentType) {
        const versions = await getDocumentVersionsByType(documentType)
        return res.status(200).json(versions)
      } else {
        const versions = await getAllDocumentVersions()
        return res.status(200).json(versions)
      }
    } catch (error) {
      console.error("Error fetching document versions:", error)
      return res.status(500).json({ error: "Failed to fetch document versions" })
    }
  } else if (req.method === 'POST') {
    try {
      // Verify API key
      const apiKey = req.headers['x-api-key']
      if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid API key" })
      }

      const data = req.body
      const newVersion = await createDocumentVersion(data)

      return res.status(200).json(newVersion)
    } catch (error) {
      console.error("Error creating document version:", error)
      return res.status(500).json({ error: "Failed to create document version" })
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}