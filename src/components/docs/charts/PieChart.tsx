"use client"

import type React from "react"
import { useMemo } from "react"
import styles from "./PieChart.module.css"
import type { ChartOptions, PieChartProps } from "./types"
import { getDefaultOptions } from "./utils"

/**
 * Pie Chart component for displaying data as slices of a circle
 */
export const PieChart: React.FC<PieChartProps> = ({
  data,
  options = {},
  height = 300,
  width = "100%",
  doughnut = false,
  cutout = doughnut ? "50%" : "0%",
}) => {
  // Merge default options with user provided options
  const chartOptions: ChartOptions = useMemo(() => {
    const defaultOptions = getDefaultOptions("pie")

    return {
      ...defaultOptions,
      ...options,
      cutout,
    }
  }, [options, cutout])

  // Prepare the chart data with proper styling
  const chartData = useMemo(() => {
    if (!data || !data.datasets || data.datasets.length === 0) {
      return { labels: [], datasets: [] }
    }

    // Default colors for pie chart segments
    const defaultColors = [
      "#4299e1",
      "#48bb78",
      "#ed8936",
      "#9f7aea",
      "#f56565",
      "#38b2ac",
      "#ecc94b",
      "#667eea",
      "#fc8181",
      "#68d391",
      "#f6ad55",
      "#b794f4",
    ]

    return {
      ...data,
      datasets: data.datasets.map((dataset) => {
        // For pie charts, we need an array of colors for each data point
        const backgroundColors = Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor
          : data.labels.map((_, i) => defaultColors[i % defaultColors.length])

        return {
          ...dataset,
          backgroundColor: backgroundColors,
          borderColor: dataset.borderColor || "white",
          borderWidth: dataset.borderWidth || 1,
        }
      }),
    }
  }, [data])

  // Calculate total for percentage display
  const total = useMemo(() => {
    if (!chartData.datasets || chartData.datasets.length === 0) {
      return 0
    }
    return chartData.datasets[0].data.reduce((sum, value) => sum + value, 0)
  }, [chartData])

  // If no data is provided, show a placeholder
  if (!data || !data.datasets || data.datasets.length === 0 || !data.labels || data.labels.length === 0) {
    return (
      <div className={styles.placeholder} style={{ height, width }}>
        <p>No data available</p>
      </div>
    )
  }

  // Calculate the angles for each slice
  const slices = chartData.datasets[0].data.map((value, index) => {
    const percentage = (value / total) * 100
    const backgroundColor = Array.isArray(chartData.datasets[0].backgroundColor)
      ? chartData.datasets[0].backgroundColor[index]
      : chartData.datasets[0].backgroundColor

    return {
      value,
      percentage,
      label: chartData.labels[index],
      backgroundColor,
    }
  })

  // Render the chart using SVG for better visualization
  return (
    <div className={styles.container} style={{ height, width }}>
      <svg
        viewBox="0 0 100 100"
        className={styles.pieChart}
        aria-label={`Pie chart: ${chartData.datasets[0].label || "Data distribution"}`}
      >
        {/* Render pie slices */}
        {slices.map((slice, index) => {
          // Calculate the SVG arc path
          const startAngle = slices.slice(0, index).reduce((sum, s) => sum + s.percentage * 3.6, 0)
          const endAngle = startAngle + slice.percentage * 3.6

          // Convert angles to radians
          const startRad = ((startAngle - 90) * Math.PI) / 180
          const endRad = ((endAngle - 90) * Math.PI) / 180

          // Calculate points on the circle
          const centerX = 50
          const centerY = 50
          const radius = 40
          const innerRadius = doughnut ? 20 : 0

          const x1 = centerX + radius * Math.cos(startRad)
          const y1 = centerY + radius * Math.sin(startRad)
          const x2 = centerX + radius * Math.cos(endRad)
          const y2 = centerY + radius * Math.sin(endRad)

          const x3 = centerX + innerRadius * Math.cos(endRad)
          const y3 = centerY + innerRadius * Math.sin(endRad)
          const x4 = centerX + innerRadius * Math.cos(startRad)
          const y4 = centerY + innerRadius * Math.sin(startRad)

          // Determine if the arc should be drawn as a large arc
          const largeArcFlag = slice.percentage > 50 ? 1 : 0

          // Create the SVG path
          let path

          if (doughnut) {
            path = `
              M ${x1} ${y1}
              A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
              L ${x3} ${y3}
              A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
              Z
            `
          } else {
            path = `
              M ${centerX} ${centerY}
              L ${x1} ${y1}
              A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `
          }

          return (
            <path
              key={`slice-${index}`}
              d={path}
              fill={slice.backgroundColor}
              stroke="white"
              strokeWidth="0.5"
              className={styles.slice}
              data-label={slice.label}
              data-value={slice.value}
              data-percentage={slice.percentage.toFixed(1)}
            />
          )
        })}

        {/* Center text for doughnut chart */}
        {doughnut && (
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className={styles.centerText}>
            {total}
          </text>
        )}
      </svg>

      {/* Optional labels */}
      <div className={styles.labels}>
        {slices.map((slice, index) => (
          <div key={`label-${index}`} className={styles.labelItem}>
            <span className={styles.labelColor} style={{ backgroundColor: slice.backgroundColor }} />
            <span className={styles.labelText}>{slice.label}</span>
            <span className={styles.labelValue}>
              {slice.value} ({slice.percentage.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PieChart
