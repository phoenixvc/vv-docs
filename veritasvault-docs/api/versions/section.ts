import { getAllSectionVersions, getSectionVersionsByVersion, createSectionVersion } from "../../src/utils/version/section-service";
import type { NextApiRequest, NextApiResponse } from 'next';
import type { SectionVersion } from "../../src/types/version";
import { timingSafeEqual } from 'crypto';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<SectionVersion | SectionVersion[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const version = req.query.version as string | undefined;
      
      if (version && !version.match(/^\d+\.\d+\.\d+$/)) {
        return res.status(400).json({ error: 'Invalid version format. Expected: x.y.z' });
      }
      if (version) {
        const sections = await getSectionVersionsByVersion(version);
        return res.status(200).json(sections);
      } else {
        const sections = await getAllSectionVersions();
        return res.status(200).json(sections);
      }
    } catch (error: any) {
      console.error("Error fetching section versions:", error);
      return res.status(500).json({ error: "Failed to fetch section versions" });
    }
  } else if (req.method === 'POST') {
    try {
       if (!apiKey || !process.env.API_KEY || 
           !timingSafeEqual(
             Buffer.from(apiKey), 
             Buffer.from(process.env.API_KEY)
           )) {
        return res.status(401).json({ error: "Unauthorized: Invalid API key" });
      }

      const data = req.body as Omit<SectionVersion, "id">;
      
      // Validate required fields
      const requiredFields = ['sectionId', 'title', 'path', 'version', 'lastUpdated', 'documentTypes', 'tags'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
      }
      
      const newSection = await createSectionVersion(data);

      return res.status(200).json(newSection);
    } catch (error: any) {
      console.error("Error creating section version:", error);
      return res.status(500).json({ error: "Failed to create section version" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
