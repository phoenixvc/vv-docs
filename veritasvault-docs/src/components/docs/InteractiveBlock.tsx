"use client"

import type React from "react"
import { useState } from "react"
import styles from "./InteractiveBlock.module.css"
import { Card } from "../common/Card"

export interface InteractiveBlockProps {
  /**
   * The title of the interactive block
   */
  title: string
  /**
   * Optional description text
   */
  description?: string
  /**
   * The interactive content (form, calculator, etc.)
   */
  children: React.ReactNode
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
  /**
   * Optional ID for linking to this block
   */
  id?: string
  /**
   * Optional flag to make the block collapsible
   */
  collapsible?: boolean
  /**
   * Optional initial collapsed state (if collapsible is true)
   */
  initialCollapsed?: boolean
}

/**
 * InteractiveBlock component for displaying interactive elements like
 * calculators, forms, and other user-interactive content.
 */
export const InteractiveBlock: React.FC<InteractiveBlockProps> = ({
  title,
  description,
  children,
  className = "",
  id,
  collapsible = false,
  initialCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed && collapsible)

  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div className={`${styles.interactiveBlock} ${className}`} id={id}>
      <Card>
        <div
          className={`${styles.interactiveHeader} ${collapsible ? styles.collapsible : ""}`}
          onClick={toggleCollapse}
        >
          <h3 className={styles.interactiveTitle}>
            {title}
            {collapsible && (
              <span className={`${styles.collapseIcon} ${isCollapsed ? styles.collapsed : ""}`}>
                {isCollapsed ? "▶" : "▼"}
              </span>
            )}
          </h3>
          {description && !isCollapsed && <p className={styles.interactiveDescription}>{description}</p>}
        </div>

        {!isCollapsed && <div className={styles.interactiveContent}>{children}</div>}
      </Card>
    </div>
  )
}

export default InteractiveBlock
