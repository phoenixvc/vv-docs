"use client"

import { useEffect, useState, useRef } from "react"
import { useColorMode } from "@docusaurus/theme-common"
import BaseDiagram, { type BaseDiagramProps } from "../BaseDiagram"
import styles from "./styles.module.css"
import type { JSX } from "react"

export interface MermaidDiagramProps extends Omit<BaseDiagramProps, "children"> {
  /** Mermaid diagram definition */
  definition: string
  /** Optional diagram type for syntax highlighting */
  diagramType?:
    | "flowchart"
    | "sequenceDiagram"
    | "classDiagram"
    | "stateDiagram"
    | "entityRelationshipDiagram"
    | "gantt"
    | "pie"
    | "journey"
}

/**
 * Mermaid diagram component for rendering various diagram types
 */
export function MermaidDiagram({
  id,
  title,
  description,
  caption,
  source,
  className,
  definition,
  diagramType,
  ...rest
}: MermaidDiagramProps): JSX.Element {
  const { colorMode } = useColorMode()
  const [svgContent, setSvgContent] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const renderDiagram = async () => {
      try {
        // Dynamically import mermaid to avoid SSR issues
        const mermaid = (await import("mermaid")).default

        // Configure mermaid based on color mode
        mermaid.initialize({
          startOnLoad: false,
          theme: colorMode === "dark" ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--ifm-font-family-base)",
          fontSize: 14,
          flowchart: {
            curve: "basis",
            htmlLabels: true,
          },
          sequence: {
            actorMargin: 50,
            showSequenceNumbers: false,
          },
        })

        // Generate SVG
        const { svg } = await mermaid.render(`mermaid-diagram-${id}`, definition)
        setSvgContent(svg)
        setError(null)
      } catch (err) {
        console.error("Error rendering Mermaid diagram:", err)
        setError(err instanceof Error ? err.message : "Failed to render diagram")
      }
    }

    renderDiagram()
  }, [isClient, definition, colorMode, id])

  return (
    <BaseDiagram
      id={id}
      title={title}
      description={description}
      caption={caption}
      source={source}
      className={className}
      interactive={false}
      {...rest}
    >
      <div className={styles.mermaidContainer} ref={containerRef}>
        {error ? (
          <div className={styles.errorContainer}>
            <h4>Error rendering diagram</h4>
            <pre className={styles.errorMessage}>{error}</pre>
            <div className={styles.codeBlock}>
              <pre>{definition}</pre>
            </div>
          </div>
        ) : svgContent ? (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        ) : (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner} />
            <span>Rendering diagram...</span>
          </div>
        )}
      </div>
    </BaseDiagram>
  )
}

export default MermaidDiagram
