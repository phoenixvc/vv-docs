import clsx from "clsx"

type VersionBadgeType = "added" | "changed" | "deprecated" | "removed" | "fixed" | "included"

interface VersionBadgeProps {
  version: string
  type: VersionBadgeType
  className?: string
  documentType?: "whitepaper" | "litepaper" | "tokenomics" | "executive-summary"
}

const typeToVariant = {
  added: "success",
  changed: "info",
  deprecated: "warning",
  removed: "danger",
  fixed: "secondary",
  included: "primary",
}

const typeToLabel = {
  added: "Added in",
  changed: "Changed in",
  deprecated: "Deprecated in",
  removed: "Removed in",
  fixed: "Fixed in",
  included: "Included in",
}

export function VersionBadge({ version, type, className, documentType }: VersionBadgeProps) {
  const variant = typeToVariant[type]
  const label = typeToLabel[type]

  let displayText = `${label} v${version}`

  if (documentType) {
    displayText = `${documentType.charAt(0).toUpperCase() + documentType.slice(1)} ${label.toLowerCase()} v${version}`
  }

  return <span className={clsx(`badge badge--${variant}`, className)}>{displayText}</span>
}
