import type { NextApiRequest, NextApiResponse } from 'next';
import type { VersionMetadata } from "../../src/types/version";
import { getVersionMetadataWithCache } from "../../src/utils/version";

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
  } catch (error: unknown) {
    console.error("Error fetching version metadata:", error);
    // Type guard to check if error is a VersionError
    const versionError = error as VersionError;
    const statusCode = versionError.statusCode || 500;
    return res.status(statusCode).json({ error: versionError.message });
  }
}