import type React from "react"
import styles from "./DocVersionBanner.module.css"
import { AlertTriangleIcon } from "../common/icons"

export interface DocVersionBannerProps {
  /**
   * The current version being viewed
   */
  currentVersion: string
  /**
   * The latest stable version
   */
  latestVersion: string
  /**
   * URL to the latest version of the current page
   */
  latestUrl: string
  /**
   * Optional flag to indicate if the current version is unreleased
   */
  isUnreleased?: boolean
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
}

/**
 * DocVersionBanner component for displaying version information and warnings
 * when viewing outdated or unreleased documentation.
 */
export const DocVersionBanner: React.FC<DocVersionBannerProps> = ({
  currentVersion,
  latestVersion,
  latestUrl,
  isUnreleased = false,
  className = "",
}) => {
  // Don't show banner if viewing the latest version
  if (currentVersion === latestVersion && !isUnreleased) {
    return null
  }

  return (
    <div className={`${styles.versionBanner} ${isUnreleased ? styles.unreleased : styles.outdated} ${className}`}>
      <div className={styles.versionBannerIcon}>
        <AlertTriangleIcon className={styles.icon} />
      </div>
      <div className={styles.versionBannerContent}>
        {isUnreleased ? (
          <p className={styles.versionBannerText}>
            This is documentation for an <strong>unreleased version</strong> ({currentVersion}). Features described here
            may change or be removed before the final release.
          </p>
        ) : (
          <p className={styles.versionBannerText}>
            This is documentation for version <strong>{currentVersion}</strong>, which is no longer actively maintained.
            For up-to-date documentation, see the{" "}
            <a href={latestUrl} className={styles.versionBannerLink}>
              latest version ({latestVersion})
            </a>
            .
          </p>
        )}
      </div>
    </div>
  )
}

export default DocVersionBanner
