"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import clsx from "clsx"
import { useColorMode } from "@docusaurus/theme-common"
import styles from "./styles.module.css"

export interface BaseDiagramProps {
  /** Unique identifier for the diagram */
  id: string
  /** Title of the diagram */
  title: string
  /** Optional description text */
  description?: string
  /** Optional caption text */
  caption?: string
  /** Optional source attribution */
  source?: string
  /** Optional CSS class name */
  className?: string
  /** Whether the diagram is interactive */
  interactive?: boolean
  /** Whether to show a fullscreen button */
  fullscreenEnabled?: boolean
  /** Whether to show a download button */
  downloadEnabled?: boolean
  /** Optional download filename */
  downloadFilename?: string
  /** Optional download format (png, svg, pdf) */
  downloadFormat?: "png" | "svg" | "pdf"
  /** Children components */
  children: React.ReactNode
}

/**
 * Base diagram component that provides common functionality for all diagram types
 */
export function BaseDiagram({
  id,
  title,
  description,
  caption,
  source,
  className,
  interactive = false,
  fullscreenEnabled = true,
  downloadEnabled = true,
  downloadFilename,
  downloadFormat = "png",
  children,
}: BaseDiagramProps): JSX.Element {
  const { colorMode } = useColorMode()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const diagramRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Handle server-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (diagramRef.current?.requestFullscreen) {
        diagramRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`)
        })
      }
    }
  }

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    if (isClient) {
      document.addEventListener("fullscreenchange", handleFullscreenChange)
      return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange)
      }
    }
  }, [isClient])

  // Handle download functionality
  const handleDownload = async () => {
    if (!diagramRef.current) return

    try {
      // Import html-to-image dynamically to avoid SSR issues
      const htmlToImage = await import("html-to-image")

      let dataUrl
      let blob

      if (downloadFormat === "svg") {
        dataUrl = await htmlToImage.toSvg(diagramRef.current)
        blob = await (await fetch(dataUrl)).blob()
      } else if (downloadFormat === "pdf") {
        // For PDF, we first convert to PNG then would use a PDF library
        // This is simplified - in a real implementation you'd use a PDF generation library
        dataUrl = await htmlToImage.toPng(diagramRef.current)
        blob = await (await fetch(dataUrl)).blob()
        console.warn("PDF download is not fully implemented in this example")
      } else {
        // Default to PNG
        dataUrl = await htmlToImage.toPng(diagramRef.current)
        blob = await (await fetch(dataUrl)).blob()
      }

      // Create download link
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = downloadFilename || `diagram-${id}.${downloadFormat}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error generating diagram image:", error)
    }
  }

  if (!isClient) {
    // Server-side rendering placeholder
    return (
      <div className={clsx(styles.diagramContainer, className)}>
        <div className={styles.diagramHeader}>
          <h3 className={styles.diagramTitle}>{title}</h3>
          {description && <p className={styles.diagramDescription}>{description}</p>}
        </div>
        <div className={styles.diagramContent}>
          <div className={styles.diagramPlaceholder}>Diagram loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={clsx(styles.diagramContainer, className, {
        [styles.darkMode]: colorMode === "dark",
        [styles.fullscreen]: isFullscreen,
        [styles.interactive]: interactive,
      })}
      id={id}
    >
      <div className={styles.diagramHeader}>
        <h3 className={styles.diagramTitle}>{title}</h3>
        {description && <p className={styles.diagramDescription}>{description}</p>}

        <div className={styles.diagramControls}>
          {interactive && (
            <span className={styles.interactiveIndicator} title="Interactive diagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
              </svg>
              <span className={styles.srOnly}>Interactive</span>
            </span>
          )}

          {fullscreenEnabled && (
            <button
              className={styles.controlButton}
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
              title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
            >
              {isFullscreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              )}
            </button>
          )}

          {downloadEnabled && (
            <button
              className={styles.controlButton}
              onClick={handleDownload}
              aria-label={`Download diagram as ${downloadFormat.toUpperCase()}`}
              title={`Download diagram as ${downloadFormat.toUpperCase()}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className={styles.diagramContent} ref={diagramRef}>
        {children}
      </div>

      {(caption || source) && (
        <div className={styles.diagramFooter}>
          {caption && <p className={styles.caption}>{caption}</p>}
          {source && <p className={styles.source}>Source: {source}</p>}
        </div>
      )}
    </div>
  )
}

export default BaseDiagram
