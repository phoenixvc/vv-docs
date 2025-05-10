"use client"
import { Select } from "@/components/ui/select"
import { getLatestVersions } from "@/lib/document-metadata"

interface VersionSelectorProps {
  documentType: string
  selectedVersion: string
  onVersionChange: (version: string) => void
}

export function VersionSelector({ documentType, selectedVersion, onVersionChange }: VersionSelectorProps) {
  const latestVersions = getLatestVersions()
  const currentLatestVersion = latestVersions[documentType as keyof typeof latestVersions] || "1.0.0"

  // Generate available versions (assuming we keep all versions from 1.0.0 to latest)
  const availableVersions = []
  const [major, minor] = currentLatestVersion.split(".").map(Number)

  for (let i = 1; i <= major; i++) {
    for (let j = 0; j <= (i === major ? minor : 3); j++) {
      availableVersions.push(`${i}.${j}.0`)
    }
  }

  // Sort versions in descending order (newest first)
  availableVersions.sort((a, b) => {
    const [aMajor, aMinor] = a.split(".").map(Number)
    const [bMajor, bMinor] = b.split(".").map(Number)

    if (aMajor !== bMajor) return bMajor - aMajor
    return bMinor - aMinor
  })

  return (
    <div className="version-selector">
      <label className="block text-sm font-medium mb-1">Document Version</label>
      <Select value={selectedVersion} onValueChange={onVersionChange}>
        {availableVersions.map((version) => (
          <option key={version} value={version}>
            v{version} {version === currentLatestVersion ? "(Latest)" : ""}
          </option>
        ))}
      </Select>

      {selectedVersion !== currentLatestVersion && (
        <p className="text-sm text-amber-500 mt-1">
          You are viewing an older version of this document. The latest version is v{currentLatestVersion}.
        </p>
      )}
    </div>
  )
}
