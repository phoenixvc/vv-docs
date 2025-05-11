import type React from "react"
import styles from "./DiagramBlock.module.css"
import { Card } from "../common/Card"

export interface DiagramBlockProps {
  /**
   * The title of the diagram
   */
  title: string
  /**
   * Optional description text for the diagram
   */
  description?: string
  /**
   * The diagram content (SVG, image, or other visual element)
   */
  children: React.ReactNode
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
  /**
   * Optional caption for the diagram
   */
  caption?: string
  /**
   * Optional source attribution for the diagram
   */
  source?: string
  /**
   * Optional ID for linking to this diagram
   */
  id?: string
}

/**
 * DiagramBlock component for displaying diagrams, charts, and other visual elements
 * with consistent styling and optional metadata.
 */
export const DiagramBlock: React.FC<DiagramBlockProps> = ({
  title,
  description,
  children,
  className = "",
  caption,
  source,
  id,
}) => {
  return (
    <div className={`${styles.diagramBlock} ${className}`} id={id}>
      <Card>
        <div className={styles.diagramHeader}>
          <h3 className={styles.diagramTitle}>{title}</h3>
          {description && <p className={styles.diagramDescription}>{description}</p>}
        </div>

        <div className={styles.diagramContent}>{children}</div>

        {(caption || source) && (
          <div className={styles.diagramFooter}>
            {caption && <p className={styles.caption}>{caption}</p>}
            {source && <p className={styles.source}>Source: {source}</p>}
          </div>
        )}
      </Card>
    </div>
  )
}

export default DiagramBlock
