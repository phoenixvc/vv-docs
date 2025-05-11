import { updateVersionMetadata, getVersionMetadata } from "../../src/utils/version-service";
import type { NextApiRequest, NextApiResponse } from 'next';
import type { VersionMetadata } from "../../src/types/version";

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<{ success: boolean; message: string; metadata: VersionMetadata } | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Verify API key
    const apiKey = req.headers['x-api-key'] as string;
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable is not configured");
      return res.status(500).json({ error: "Server configuration error" });
    }
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: "Unauthorized: Invalid API key" });
    }
    const data = req.body as Partial<VersionMetadata>;
    // Basic validation of required fields in the incoming data
    if (data.currentVersion && !data.versions?.includes(data.currentVersion)) {
      return res.status(400).json({
        error: "Invalid metadata: currentVersion must exist in versions array"
      });
    }

    const currentMetadata = await getVersionMetadata();

    // Update metadata with new values
    const updatedMetadata: VersionMetadata = {
      ...currentMetadata,
      ...data,
    };

    await updateVersionMetadata(updatedMetadata);

    return res.status(200).json({
      success: true,
      message: "Version metadata updated successfully",
      metadata: updatedMetadata,
    });
  } catch (error: any) {
    console.error("Error updating version metadata:", error);
    return res.status(500).json({ error: "Failed to update version metadata" });
  }
}