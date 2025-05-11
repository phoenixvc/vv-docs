import type React from "react"
import styles from "./Admonition.module.css"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon, HelpCircleIcon } from "../common/icons"

export type AdmonitionType = "info" | "warning" | "success" | "error" | "note" | "tip"

export interface AdmonitionProps {
  /**
   * The type of admonition
   */
  type: AdmonitionType
  /**
   * Optional title for the admonition
   */
  title?: string
  /**
   * The content of the admonition
   */
  children: React.ReactNode
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
}

/**
 * Admonition component for displaying callouts, warnings, notes, and other
 * highlighted information blocks.
 */
export const Admonition: React.FC<AdmonitionProps> = ({ type, title, children, className = "" }) => {
  const getIcon = () => {
    switch (type) {
      case "info":
      case "note":
        return <InfoIcon className={styles.icon} />
      case "warning":
        return <AlertTriangleIcon className={styles.icon} />
      case "success":
      case "tip":
        return <CheckCircleIcon className={styles.icon} />
      case "error":
        return <XCircleIcon className={styles.icon} />
      default:
        return <HelpCircleIcon className={styles.icon} />
    }
  }

  const getDefaultTitle = () => {
    switch (type) {
      case "info":
        return "Info"
      case "warning":
        return "Warning"
      case "success":
        return "Success"
      case "error":
        return "Error"
      case "note":
        return "Note"
      case "tip":
        return "Tip"
      default:
        return "Info"
    }
  }

  return (
    <div className={`${styles.admonition} ${styles[type]} ${className}`}>
      <div className={styles.admonitionHeader}>
        {getIcon()}
        <h4 className={styles.admonitionTitle}>{title || getDefaultTitle()}</h4>
      </div>
      <div className={styles.admonitionContent}>{children}</div>
    </div>
  )
}

export default Admonition
