"use client"

import type React from "react"
import styles from "./Alert.module.css"

export type AlertType = "info" | "success" | "warning" | "error"

export interface AlertProps {
  /**
   * The type of alert to display
   */
  type: AlertType

  /**
   * The title of the alert
   */
  title?: string

  /**
   * The content of the alert
   */
  children: React.ReactNode

  /**
   * Optional additional CSS class
   */
  className?: string

  /**
   * Whether the alert is dismissible
   */
  dismissible?: boolean

  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void
}

/**
 * Alert component for displaying important messages
 */
export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  children,
  className = "",
  dismissible = false,
  onDismiss,
}) => {
  const alertClasses = `${styles.alert} ${styles[type]} ${className}`

  const iconMap: Record<AlertType, string> = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  }

  return (
    <div className={alertClasses} role="alert">
      <div className={styles.alertIcon}>{iconMap[type]}</div>
      <div className={styles.alertContent}>
        {title && <h4 className={styles.alertTitle}>{title}</h4>}
        <div className={styles.alertMessage}>{children}</div>
      </div>
      {dismissible && (
        <button className={styles.alertDismiss} onClick={onDismiss} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  )
}

export default Alert
