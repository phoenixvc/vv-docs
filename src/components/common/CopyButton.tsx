"use client"

import type React from "react"
import { useState } from "react"
import styles from "./CopyButton.module.css"

interface CopyButtonProps {
  text: string
  className?: string
  successMessage?: string
  timeout?: number
}

/**
 * CopyButton component for copying text to clipboard
 *
 * @param text - The text to copy to clipboard
 * @param className - Optional additional CSS class
 * @param successMessage - Optional custom success message (default: "Copied!")
 * @param timeout - Optional timeout in ms to show success message (default: 2000)
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = "",
  successMessage = "Copied!",
  timeout = 2000,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <button
      className={`${styles.copyButton} ${copied ? styles.copied : ""} ${className}`}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <span className={styles.icon}>✓</span>
          <span className={styles.text}>{successMessage}</span>
        </>
      ) : (
        <>
          <span className={styles.icon}>📋</span>
          <span className={styles.text}>Copy</span>
        </>
      )}
    </button>
  )
}

export default CopyButton
