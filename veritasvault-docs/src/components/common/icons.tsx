import type React from "react"

export interface IconProps {
  /**
   * Size of the icon in pixels
   */
  size?: number

  /**
   * Color of the icon
   */
  color?: string

  /**
   * Optional additional CSS class
   */
  className?: string

  /**
   * Optional title for accessibility
   */
  title?: string
}

/**
 * Base icon component with common props
 */
const BaseIcon: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  color = "currentColor",
  className = "",
  title,
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? "false" : "true"}
      role={title ? "img" : undefined}
      aria-labelledby={title ? "title" : undefined}
    >
      {title && <title id="title">{title}</title>}
      {children}
    </svg>
  )
}

/**
 * Info icon
 */
export const InfoIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </BaseIcon>
)

/**
 * Alert icon
 */
export const AlertIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </BaseIcon>
)

/**
 * Success icon
 */
export const CheckIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </BaseIcon>
)

/**
 * Copy icon
 */
export const CopyIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </BaseIcon>
)

/**
 * External link icon
 */
export const ExternalLinkIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </BaseIcon>
)

/**
 * Close icon
 */
export const CloseIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </BaseIcon>
)

/**
 * Menu icon
 */
export const MenuIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </BaseIcon>
)

/**
 * Search icon
 */
export const SearchIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </BaseIcon>
)

/**
 * Document icon
 */
export const DocumentIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </BaseIcon>
)

/**
 * Code icon
 */
export const CodeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </BaseIcon>
)

/**
 * Chart icon
 */
export const ChartIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </BaseIcon>
)

/**
 * Calculator icon
 */
export const CalculatorIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" />
    <line x1="12" y1="10" x2="14" y2="10" />
    <line x1="16" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" />
    <line x1="12" y1="14" x2="14" y2="14" />
    <line x1="16" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="10" y2="18" />
    <line x1="12" y1="18" x2="14" y2="18" />
    <line x1="16" y1="18" x2="16" y2="18" />
  </BaseIcon>
)

export default {
  InfoIcon,
  AlertIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  DocumentIcon,
  CodeIcon,
  ChartIcon,
  CalculatorIcon,
}
