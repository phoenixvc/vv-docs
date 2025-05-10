"use client"

import React, { useRef, useEffect } from "react"
import styles from "./ChartTooltip.module.css"
import type { ChartTooltipItem, ChartTooltipProps } from "./types"

/**
 * Chart tooltip component for displaying data point information on hover
 */
export const ChartTooltip: React.FC<ChartTooltipProps> = ({ title, items = [], className = "", position, visible }) => {
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Adjust tooltip position to ensure it stays within viewport
  useEffect(() => {
    if (!tooltipRef.current || !visible || !position) return

    const tooltip = tooltipRef.current
    const rect = tooltip.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Calculate initial position
    let left = position.x
    let top = position.y

    // Adjust horizontal position if needed
    if (left + rect.width > viewportWidth) {
      left = left - rect.width - 10 // Position to the left of the point
    }

    // Adjust vertical position if needed
    if (top + rect.height > viewportHeight) {
      top = top - rect.height - 10 // Position above the point
    }

    // Apply the adjusted position
    tooltip.style.left = `${left}px`
    tooltip.style.top = `${top}px`
  }, [position, visible])

  if (!visible || !items.length) {
    return null
  }

  const tooltipClasses = [styles.tooltip, className].filter(Boolean).join(" ")

  return (
    <div
      ref={tooltipRef}
      className={tooltipClasses}
      style={{
        left: position?.x,
        top: position?.y,
      }}
      role="tooltip"
    >
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>
        {items.map((item, index) => (
          <div key={`tooltip-item-${index}`} className={styles.item}>
            <div className={styles.colorIndicator} style={{ backgroundColor: item.color }} />
            <div className={styles.label}>{item.label}</div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Hook to manage chart tooltip state
 */
export const useChartTooltip = () => {
  const [tooltipState, setTooltipState] = React.useState<{
    visible: boolean
    position: { x: number; y: number } | null
    title: string | null
    items: ChartTooltipItem[]
  }>({
    visible: false,
    position: null,
    title: null,
    items: [],
  })

  const showTooltip = (position: { x: number; y: number }, title: string | null, items: ChartTooltipItem[]) => {
    setTooltipState({
      visible: true,
      position,
      title,
      items,
    })
  }

  const hideTooltip = () => {
    setTooltipState((prev) => ({
      ...prev,
      visible: false,
    }))
  }

  return {
    tooltipState,
    showTooltip,
    hideTooltip,
    TooltipComponent: (
      <ChartTooltip
        visible={tooltipState.visible}
        position={tooltipState.position || { x: 0, y: 0 }}
        title={tooltipState.title || undefined}
        items={tooltipState.items}
      />
    ),
  }
}

export default ChartTooltip
