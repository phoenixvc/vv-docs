"use client"

import type React from "react"
import { useState } from "react"
import styles from "./CodeBlock.module.css"
import { CopyButton } from "../common/CopyButton"

export interface CodeBlockProps {
  /**
   * The code content to display
   */
  code: string
  /**
   * The programming language for syntax highlighting
   */
  language: string
  /**
   * Optional title for the code block
   */
  title?: string
  /**
   * Optional flag to show line numbers
   */
  showLineNumbers?: boolean
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
  /**
   * Optional highlighted lines (comma-separated line numbers)
   */
  highlightedLines?: string
  /**
   * Optional flag to enable/disable the copy button
   */
  showCopyButton?: boolean
}

/**
 * CodeBlock component for displaying code snippets with syntax highlighting,
 * line numbers, and a copy button.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
  showLineNumbers = true,
  className = "",
  highlightedLines = "",
  showCopyButton = true,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  // Parse highlighted lines
  const highlightedLineNumbers = highlightedLines
    ? highlightedLines.split(",").map((line) => Number.parseInt(line.trim(), 10))
    : []

  // Split code into lines for rendering with line numbers
  const codeLines = code.split("\n")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className={`${styles.codeBlockWrapper} ${className}`}>
      {title && (
        <div className={styles.codeBlockHeader}>
          <span className={styles.codeBlockTitle}>{title}</span>
          <span className={styles.codeBlockLanguage}>{language}</span>
        </div>
      )}

      <div className={styles.codeBlockContent}>
        {showLineNumbers && (
          <div className={styles.lineNumbers}>
            {codeLines.map((_, index) => (
              <span key={`line-${index}`} className={styles.lineNumber}>
                {index + 1}
              </span>
            ))}
          </div>
        )}

        <pre className={styles.codeContent}>
          <code className={`language-${language}`}>
            {codeLines.map((line, index) => (
              <div
                key={`code-line-${index}`}
                className={`${styles.codeLine} ${
                  highlightedLineNumbers.includes(index + 1) ? styles.highlightedLine : ""
                }`}
              >
                {line || " "}
              </div>
            ))}
          </code>
        </pre>

        {showCopyButton && (
          <div className={styles.copyButtonWrapper}>
            <CopyButton text={code} successText="Copied!" className={styles.copyButton} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeBlock
