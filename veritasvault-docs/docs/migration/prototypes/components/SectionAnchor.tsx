import clsx from "clsx"
import Link from "@docusaurus/Link"
import { LinkIcon } from "./icons"

interface SectionAnchorProps {
  id: string
  className?: string
}

/**
 * Section anchor component for creating linkable section headers
 */
export function SectionAnchor({ id, className }: SectionAnchorProps): JSX.Element {
  return (
    <Link
      to={`#${id}`}
      className={clsx("ml-2 opacity-0 group-hover:opacity-100 transition-opacity", className)}
      aria-label={`Link to section ${id}`}
    >
      <LinkIcon className="h-4 w-4" />
      <span className="sr-only">Link to this section</span>
    </Link>
  )
}
