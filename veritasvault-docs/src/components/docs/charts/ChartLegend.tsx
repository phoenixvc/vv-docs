"use client"

import type React from "react"
import styles from "./ChartLegend.module.css"
import type { LegendProps } from "./types"

/**
 * Chart legend component for displaying dataset information
 */
export const ChartLegend: React.FC<LegendProps> = ({
  items = [],
  position = "bottom",
  className = "",
  onItemClick,
}) => {
  // If no items, return null
  if (!items || items.length === 0) {
    return null
  }

  const legendClasses = [styles.legend, styles[position], className].filter(Boolean).join(" ")

  const isHorizontal = position === "top" || position === "bottom"

  return (
    <div className={legendClasses} aria-label="Chart legend">
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li
            key={`legend-item-${index}`}
            className={`${styles.item} ${item.hidden ? styles.hidden : ""}`}
            onClick={() => onItemClick && onItemClick(item, index)}
          >
            <span
              className={styles.indicator}
              style={{
                backgroundColor: item.color,
                borderRadius: item.shape === "circle" ? "50%" : item.shape === "line" ? "0" : "2px",
              }}
            />
            <span className={styles.label}>{item.label}</span>
            {item.value && <span className={styles.value}>{item.value}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChartLegend
