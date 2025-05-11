import type React from "react"
import styles from "./Pagination.module.css"
import { ArrowLeftIcon, ArrowRightIcon } from "../common/icons"

export interface PaginationLink {
  /**
   * The title of the linked page
   */
  title: string
  /**
   * The URL of the linked page
   */
  url: string
  /**
   * Optional description or subtitle
   */
  description?: string
}

export interface PaginationProps {
  /**
   * Optional previous page link
   */
  prev?: PaginationLink
  /**
   * Optional next page link
   */
  next?: PaginationLink
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
}

/**
 * Pagination component for navigating between documentation pages.
 */
export const Pagination: React.FC<PaginationProps> = ({ prev, next, className = "" }) => {
  if (!prev && !next) {
    return null
  }

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="Pagination">
      <div className={styles.paginationLinks}>
        {prev && (
          <a href={prev.url} className={`${styles.paginationLink} ${styles.prevLink}`}>
            <div className={styles.paginationLinkContent}>
              <div className={styles.paginationLinkIcon}>
                <ArrowLeftIcon className={styles.icon} />
              </div>
              <div className={styles.paginationLinkText}>
                <span className={styles.paginationLinkLabel}>Previous</span>
                <span className={styles.paginationLinkTitle}>{prev.title}</span>
                {prev.description && <span className={styles.paginationLinkDescription}>{prev.description}</span>}
              </div>
            </div>
          </a>
        )}

        {next && (
          <a href={next.url} className={`${styles.paginationLink} ${styles.nextLink}`}>
            <div className={styles.paginationLinkContent}>
              <div className={styles.paginationLinkText}>
                <span className={styles.paginationLinkLabel}>Next</span>
                <span className={styles.paginationLinkTitle}>{next.title}</span>
                {next.description && <span className={styles.paginationLinkDescription}>{next.description}</span>}
              </div>
              <div className={styles.paginationLinkIcon}>
                <ArrowRightIcon className={styles.icon} />
              </div>
            </div>
          </a>
        )}
      </div>
    </nav>
  )
}

export default Pagination
