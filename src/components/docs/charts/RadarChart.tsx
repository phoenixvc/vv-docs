"use client"

import type React from "react"
import { useMemo } from "react"
import styles from "./RadarChart.module.css"
import type { ChartOptions, RadarChartProps } from "./types"
import { getDefaultOptions } from "./utils"

/**
 * Radar Chart component for displaying multivariate data as a two-dimensional chart
 */
export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  options = {},
  height = 300,
  width = "100%",
  fillArea = true,
}) => {
  // Merge default options with user provided options
  const chartOptions: ChartOptions = useMemo(() => {
    const defaultOptions = getDefaultOptions("radar")

    return {
      ...defaultOptions,
      ...options,
      scales: {
        r: {
          beginAtZero: true,
          ...options.scales?.r,
        },
        ...options.scales,
      },
    }
  }, [options])

  // Default colors for radar chart datasets
  const defaultColors = useMemo(
    () => ["#4299e1", "#48bb78", "#ed8936", "#9f7aea", "#f56565", "#38b2ac", "#ecc94b", "#667eea"],
    [],
  )

  // Prepare the chart data with proper styling
  const chartData = useMemo(() => {
    if (!data || !data.datasets || data.datasets.length === 0) {
      return { labels: [], datasets: [] }
    }

    return {
      ...data,
      datasets: data.datasets.map((dataset, index) => {
        const color = dataset.backgroundColor || defaultColors[index % defaultColors.length]

        return {
          ...dataset,
          backgroundColor: fillArea
            ? `${color}40` // Add transparency for fill
            : "transparent",
          borderColor: dataset.borderColor || color,
          borderWidth: dataset.borderWidth || 2,
          pointBackgroundColor: dataset.pointBackgroundColor || color,
          pointBorderColor: dataset.pointBorderColor || "#fff",
          pointHoverBackgroundColor: dataset.pointHoverBackgroundColor || "#fff",
          pointHoverBorderColor: dataset.pointHoverBorderColor || color,
          fill: fillArea,
        }
      }),
    }
  }, [data, fillArea, defaultColors])

  const noData = !data || !data.datasets || data.datasets.length === 0 || !data.labels || data.labels.length === 0

  // If no data is provided, show a placeholder
  if (noData) {
    return (
      <div className={styles.placeholder} style={{ height, width }}>
        <p>No data available</p>
      </div>
    )
  }

  // Calculate the maximum value for scaling
  const maxValue = useMemo(() => {
    if (!chartData.datasets || chartData.datasets.length === 0) {
      return 0
    }

    return Math.max(...chartData.datasets.flatMap((dataset) => dataset.data))
  }, [chartData])

  // Calculate the points for the radar chart
  const calculatePoints = (dataset: any, centerX: number, centerY: number, radius: number) => {
    const angleStep = (Math.PI * 2) / chartData.labels.length

    return dataset.data.map((value: number, i: number) => {
      const ratio = value / maxValue
      const angle = angleStep * i - Math.PI / 2 // Start from top (negative PI/2)
      const x = centerX + radius * ratio * Math.cos(angle)
      const y = centerY + radius * ratio * Math.sin(angle)
      return { x, y, value, label: chartData.labels[i] }
    })
  }

  // Render the chart using SVG for better visualization
  return (
    <div className={styles.container} style={{ height, width }}>
      <svg
        viewBox="0 0 100 100"
        className={styles.radarChart}
        aria-label={`Radar chart: ${chartData.datasets.map((d) => d.label).join(", ")}`}
      >
        {/* Background grid */}
        <g className={styles.grid}>
          {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => {
            const radius = 40 * level
            const points = chartData.labels
              .map((_, j) => {
                const angle = (Math.PI * 2 * j) / chartData.labels.length - Math.PI / 2
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)
                return `${x},${y}`
              })
              .join(" ")

            return <polygon key={`grid-${i}`} points={points} className={styles.gridLevel} />
          })}

          {/* Axis lines */}
          {chartData.labels.map((_, i) => {
            const angle = (Math.PI * 2 * i) / chartData.labels.length - Math.PI / 2
            const x = 50 + 40 * Math.cos(angle)
            const y = 50 + 40 * Math.sin(angle)

            return <line key={`axis-${i}`} x1="50" y1="50" x2={x} y2={y} className={styles.axis} />
          })}
        </g>

        {/* Data polygons */}
        {chartData.datasets.map((dataset, datasetIndex) => {
          const points = calculatePoints(dataset, 50, 50, 40)
          const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ")

          return (
            <g key={`dataset-${datasetIndex}`}>
              {/* Area fill */}
              {fillArea && (
                <polygon points={polygonPoints} fill={dataset.backgroundColor} className={styles.dataArea} />
              )}

              {/* Border line */}
              <polygon
                points={polygonPoints}
                fill="none"
                stroke={dataset.borderColor}
                strokeWidth={dataset.borderWidth}
                className={styles.dataLine}
              />

              {/* Data points */}
              {points.map((point, pointIndex) => (
                <circle
                  key={`point-${datasetIndex}-${pointIndex}`}
                  cx={point.x}
                  cy={point.y}
                  r="1.5"
                  fill={dataset.pointBackgroundColor}
                  stroke={dataset.pointBorderColor}
                  strokeWidth="0.5"
                  className={styles.dataPoint}
                  data-label={point.label}
                  data-value={point.value}
                />
              ))}
            </g>
          )
        })}

        {/* Axis labels */}
        {chartData.labels.map((label, i) => {
          const angle = (Math.PI * 2 * i) / chartData.labels.length - Math.PI / 2
          const x = 50 + 45 * Math.cos(angle)
          const y = 50 + 45 * Math.sin(angle)

          // Adjust text anchor based on position
          let textAnchor = "middle"
          if (x < 45) textAnchor = "end"
          if (x > 55) textAnchor = "start"

          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className={styles.axisLabel}
            >
              {label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export default RadarChart
