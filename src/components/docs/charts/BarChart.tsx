"use client"

import type React from "react"
import { useMemo } from "react"
import styles from "./BarChart.module.css"
import type { ChartOptions, BarChartProps } from "./types"
import { getDefaultOptions } from "./utils"

/**
 * Bar Chart component for displaying categorical data with rectangular bars
 */
export const BarChart: React.FC<BarChartProps> = ({
  data,
  options = {},
  height = 300,
  width = "100%",
  horizontal = false,
  stacked = false,
  grouped = false,
}) => {
  // Merge default options with user provided options
  const chartOptions: ChartOptions = useMemo(() => {
    const defaultOptions = getDefaultOptions("bar")

    // Configure scales based on chart orientation and stacking
    const scales = {
      x: {
        stacked: stacked,
        grid: {
          display: !horizontal,
        },
        ...options.scales?.x,
      },
      y: {
        stacked: stacked,
        beginAtZero: true,
        grid: {
          display: horizontal,
        },
        ...options.scales?.y,
      },
    }

    return {
      ...defaultOptions,
      ...options,
      indexAxis: horizontal ? "y" : "x",
      scales,
    }
  }, [options, horizontal, stacked])

  // Calculate the maximum value for proper scaling
  const maxValue = useMemo(() => {
    if (!data || !data.datasets || data.datasets.length === 0) {
      return 0
    }

    if (stacked) {
      // For stacked charts, sum values at each index
      const sums = data.labels.map((_, i) => {
        return data.datasets.reduce((sum, dataset) => {
          return sum + (dataset.data[i] || 0)
        }, 0)
      })
      return Math.max(...sums)
    } else {
      // For regular charts, find the max value across all datasets
      return Math.max(...data.datasets.flatMap((dataset) => dataset.data))
    }
  }, [data, stacked])

  // Prepare the chart data with proper styling
  const chartData = useMemo(() => {
    if (!data || !data.datasets) {
      return { labels: [], datasets: [] }
    }

    // Apply default colors if not provided
    const defaultColors = ["#4299e1", "#48bb78", "#ed8936", "#9f7aea", "#f56565", "#38b2ac", "#ecc94b", "#667eea"]

    return {
      ...data,
      datasets: data.datasets.map((dataset, index) => {
        const color = dataset.backgroundColor || defaultColors[index % defaultColors.length]

        return {
          ...dataset,
          backgroundColor: dataset.backgroundColor || color,
          borderColor: dataset.borderColor || color,
          borderWidth: dataset.borderWidth || 1,
        }
      }),
    }
  }, [data])

  // If no data is provided, show a placeholder
  if (!data || !data.datasets || data.datasets.length === 0 || !data.labels || data.labels.length === 0) {
    return (
      <div className={styles.placeholder} style={{ height, width }}>
        <p>No data available</p>
      </div>
    )
  }

  // Render the chart using a canvas element
  // In a real implementation, this would use a charting library like Chart.js
  return (
    <div className={styles.container} style={{ height, width }}>
      <div className={styles.chartCanvas}>
        {/* This is a simplified representation of a bar chart */}
        <div className={styles.chartArea}>
          {chartData.labels.map((label, labelIndex) => (
            <div key={`bar-group-${labelIndex}`} className={styles.barGroup}>
              <div className={styles.barLabel}>{label}</div>
              <div className={styles.barsContainer}>
                {chartData.datasets.map((dataset, datasetIndex) => {
                  const value = dataset.data[labelIndex] || 0
                  const percentage = maxValue ? (value / maxValue) * 100 : 0
                  const barStyle = {
                    [horizontal ? "width" : "height"]: `${percentage}%`,
                    backgroundColor: Array.isArray(dataset.backgroundColor)
                      ? dataset.backgroundColor[labelIndex]
                      : dataset.backgroundColor,
                  }

                  return (
                    <div
                      key={`bar-${labelIndex}-${datasetIndex}`}
                      className={styles.bar}
                      style={barStyle}
                      title={`${dataset.label}: ${value}`}
                    >
                      {value > maxValue * 0.1 && <span className={styles.barValue}>{value}</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarChart
