import type React from "react"
import styles from "./ChartContainer.module.css"
import { ChartLegend } from "./ChartLegend"
import type { LegendItem } from "./types"

export interface ChartContainerProps {
  /**
   * The title of the chart
   */
  title?: string

  /**
   * Optional description text for the chart
   */
  description?: string

  /**
   * The chart component to render
   */
  children: React.ReactNode

  /**
   * Optional CSS class name
   */
  className?: string

  /**
   * Optional legend items to display
   */
  legendItems?: LegendItem[]

  /**
   * Position of the legend
   * @default "bottom"
   */
  legendPosition?: "top" | "bottom" | "left" | "right"

  /**
   * Optional source attribution
   */
  source?: string

  /**
   * Optional footnote text
   */
  footnote?: string

  /**
   * Whether to show a border around the chart
   * @default false
   */
  bordered?: boolean

  /**
   * Whether to show a shadow effect
   * @default false
   */
  shadowed?: boolean
}

/**
 * A container component for charts with title, description, and legend
 */
export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  children,
  className = "",
  legendItems,
  legendPosition = "bottom",
  source,
  footnote,
  bordered = false,
  shadowed = false,
}) => {
  const containerClasses = [
    styles.container,
    bordered ? styles.bordered : "",
    shadowed ? styles.shadowed : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const hasLegend = legendItems && legendItems.length > 0
  const hasFooter = source || footnote

  return (
    <div className={containerClasses} data-testid="chart-container">
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}

      <div className={styles.chartWrapper}>
        {hasLegend && legendPosition === "top" && (
          <ChartLegend items={legendItems} position={legendPosition} className={styles.topLegend} />
        )}

        {hasLegend && legendPosition === "left" && (
          <div className={styles.sideContainer}>
            <ChartLegend items={legendItems} position={legendPosition} className={styles.leftLegend} />
            <div className={styles.chartContent}>{children}</div>
          </div>
        )}

        {(!hasLegend || (legendPosition !== "left" && legendPosition !== "right")) && (
          <div className={styles.chartContent}>{children}</div>
        )}

        {hasLegend && legendPosition === "right" && (
          <div className={styles.sideContainer}>
            <div className={styles.chartContent}>{children}</div>
            <ChartLegend items={legendItems} position={legendPosition} className={styles.rightLegend} />
          </div>
        )}

        {hasLegend && legendPosition === "bottom" && (
          <ChartLegend items={legendItems} position={legendPosition} className={styles.bottomLegend} />
        )}
      </div>

      {hasFooter && (
        <div className={styles.footer}>
          {source && <div className={styles.source}>Source: {source}</div>}
          {footnote && <div className={styles.footnote}>{footnote}</div>}
        </div>
      )}
    </div>
  )
}

export default ChartContainer
