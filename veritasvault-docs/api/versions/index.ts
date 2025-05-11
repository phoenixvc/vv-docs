import { getVersionMetadata, getVersionMetadataWithCache } from "../../src/utils/version";
import type { NextApiRequest, NextApiResponse } from 'next';
import type { VersionMetadata } from "../../src/types/version";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VersionMetadata | { error: string }>
) {
  try {
    const metadata = await getVersionMetadataWithCache();
    return res.status(200).json(metadata);
  } catch (error: any) {
    console.error("Error fetching version metadata:", error);
    return res.status(500).json({ error: "Failed to fetch version metadata" });
  }
}
