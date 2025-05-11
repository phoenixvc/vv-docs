import type { NextApiRequest, NextApiResponse } from 'next';
import type { DocumentVersion } from "../../src/types/version";
import { createDocumentVersion, getAllDocumentVersions, getDocumentVersionsByType } from "../../src/utils/version-service";

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<DocumentVersion | DocumentVersion[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const documentType = req.query.type as string | undefined;
      
      if (documentType) {
        const versions = await getDocumentVersionsByType(documentType);
        return res.status(200).json(versions);
      } else {
        const versions = await getAllDocumentVersions();
        return res.status(200).json(versions);
      }
    } catch (error: any) {
      console.error("Error fetching document versions:", error);
      return res.status(500).json({ error: "Failed to fetch document versions" });
    }
  } else if (req.method === 'POST') {
    try {
      // Verify API key
      const apiKey = req.headers['x-api-key'] as string;
      if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid API key" });
      }

      const data = req.body as Omit<DocumentVersion, "id">;
      const newVersion = await createDocumentVersion(data);

      return res.status(200).json(newVersion);
    } catch (error: any) {
      console.error("Error creating document version:", error);
      return res.status(500).json({ error: "Failed to create document version" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}