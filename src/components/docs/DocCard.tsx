import type React from "react"
import styles from "./DocCard.module.css"
import { ArrowRightIcon } from "../common/icons"

export interface DocCardProps {
  /**
   * The title of the card
   */
  title: string
  /**
   * The URL the card links to
   */
  href: string
  /**
   * Optional description text
   */
  description?: string
  /**
   * Optional icon component
   */
  icon?: React.ReactNode
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
  /**
   * Optional flag to indicate if the card is featured
   */
  featured?: boolean
}

/**
 * DocCard component for displaying links to documentation pages in a card format.
 */
export const DocCard: React.FC<DocCardProps> = ({
  title,
  href,
  description,
  icon,
  className = "",
  featured = false,
}) => {
  return (
    <a href={href} className={`${styles.docCard} ${featured ? styles.featured : ""} ${className}`}>
      <div className={styles.docCardContent}>
        {icon && <div className={styles.docCardIcon}>{icon}</div>}
        <div className={styles.docCardText}>
          <h3 className={styles.docCardTitle}>{title}</h3>
          {description && <p className={styles.docCardDescription}>{description}</p>}
        </div>
        <div className={styles.docCardArrow}>
          <ArrowRightIcon className={styles.arrowIcon} />
        </div>
      </div>
    </a>
  )
}

export default DocCard
