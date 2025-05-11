import { getVersionMetadata, getVersionMetadataWithCache } from "../../src/utils/version";
import type { NextApiRequest, NextApiResponse } from 'next';
import type { VersionMetadata } from "../../src/types/version";

interface VersionError extends Error {
  code?: string;
  statusCode?: number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VersionMetadata | { error: string }>
) {
  try {
    const metadata = await getVersionMetadataWithCache();
    return res.status(200).json(metadata);
  } catch (error: VersionError) {
    console.error("Error fetching version metadata:", error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: error.message });
  }
}
